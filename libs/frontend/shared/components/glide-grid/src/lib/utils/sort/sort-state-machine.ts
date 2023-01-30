import type { StringKeys } from '../../types/general';
import type { SortStates } from './object-sort';
import { SORT_STATES } from './object-sort';
import { STATE_HISTORY_STEPS } from '../../constants';

const sortStatesArray: SortStates[] = [
  SORT_STATES.initial,
  SORT_STATES.ascending,
  SORT_STATES.descending,
];

// value passed to cycleStates is the starting value of the NEXT state update
function* cycleStates(startingPos: number) {
  let i = startingPos;
  const len = sortStatesArray.length;
  while (true) {
    yield sortStatesArray[i++ % len];
  }
}

// value passed to genCycleStates is the starting value of the NEXT state update
const genCycleStates = (initial: SortStates = SORT_STATES.initial) => {
  const startingPos = sortStatesArray.indexOf(initial);
  const generator = cycleStates(startingPos);
  return () => generator.next().value as SortStates;
};

type StateSet<T> = {
  state: SortStates;
  key: StringKeys<T> | '';
};

type StateSetHistory<T> = {
  currentStateSet: StateSet<T>;
  previousStateSet: StateSet<T>;
};

const initialStateSet = {
  state: SORT_STATES.initial,
  key: '',
} as const;

class SortStateMachine<T> {
  private keySet = new Set<StringKeys<T>>();

  private stateHistory: StateSet<T>[] = [];

  // value passed to genCycleStates is the starting value of the NEXT state update
  // start at first state after initial
  private stateCycler = genCycleStates(sortStatesArray[1]);

  constructor(stateSet: StateSet<T>[] = []) {
    this.stateHistory = stateSet;
  }

  get previousState(): StateSet<T> {
    if (this.stateHistory[1]) {
      return { ...this.stateHistory[1] };
    } else {
      return { ...initialStateSet };
    }
  }

  get state() {
    return { ...this.stateHistory[0] };
  }

  resetCycler() {
    // value passed to genCycleStates is the starting value of the NEXT state update
    // start at first state after initial
    this.stateCycler = genCycleStates(sortStatesArray[1]);
  }

  private get currentKey() {
    return this.stateHistory[0].key as StringKeys<T>;
  }

  private set currentKey(newKey: StringKeys<T>) {
    this.stateHistory[0].key = newKey;
  }

  reset() {
    this.stateHistory.unshift({
      state: SORT_STATES.initial,
      key: '',
    });
    this.resetCycler();
    this.nextState();
  }

  nextState() {
    this.stateHistory[0].state = this.stateCycler();
  }

  getHistory(steps: number): StateSet<T>[] {
    if (steps < 2) {
      return [];
    }

    if (this.stateHistory.length < 2) {
      this.stateHistory.push({ ...initialStateSet });
    }

    return this.stateHistory.slice(0, steps);
  }

  private removeKeyFromHistory(key: StringKeys<T>) {
    const index = this.stateHistory.findIndex(
      (e: StateSet<T>) => e.key === key
    );
    this.stateHistory = this.stateHistory.filter((_, i) => i !== index);
  }

  nextValue(key: StringKeys<T>, steps = STATE_HISTORY_STEPS): StateSet<T>[] {
    const isSameKey = this.currentKey === key;
    if (this.keySet.has(key) && !isSameKey) {
      this.removeKeyFromHistory(key);
    } else {
      this.keySet.add(key);
    }

    if (this.currentKey === '') {
      this.currentKey = key;
      this.nextState();
    } else if (isSameKey) {
      this.nextState();
    } else {
      this.reset();
      this.currentKey = key;
    }

    return this.getHistory(steps);
  }
}

export type { StateSet, StateSetHistory };
export { SortStateMachine };
