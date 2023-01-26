import type { Indexable, StringKeys } from '../../types/general';
import type { SortStates } from './object-sort';
import { SORT_STATES } from './object-sort';

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

type StateSet<T extends Indexable> = {
  state: SortStates;
  value: StringKeys<T> | '';
};

type StateSetHistory<T extends Indexable> = {
  currentStateSet: StateSet<T>;
  previousStateSet: StateSet<T>;
};

const initialStateSet = {
  state: SORT_STATES.initial,
  value: '',
} as const;

class SortStateMachine<T extends Indexable> {
  private currentStateSet: StateSet<T> = { ...initialStateSet };
  private previousStateSet: StateSet<T> = { ...initialStateSet };

  private stateCycler = genCycleStates(sortStatesArray[1]);

  constructor(stateSet: Partial<StateSet<T>> = {}) {
    if (stateSet.state) {
      this.currentStateSet.state = stateSet.state;
    }

    if (stateSet.value) {
      this.currentStateSet.value = stateSet.value;
    }
  }

  get previousState() {
    return { ...this.previousStateSet };
  }

  get state() {
    return { ...this.currentStateSet };
  }

  resetCycler() {
    // value passed to genCycleStates is the starting value of the NEXT state update
    // start at first state after initial
    this.stateCycler = genCycleStates(sortStatesArray[1]);
  }

  reset() {
    this.previousStateSet = this.currentStateSet;
    this.currentStateSet = { ...initialStateSet };
    this.resetCycler();
    this.nextState();
  }

  nextState() {
    this.currentStateSet.state = this.stateCycler();
  }

  nextValue(val: StringKeys<T>): StateSetHistory<T> {
    if (this.currentStateSet.value === '') {
      this.currentStateSet.value = val;
      this.nextState();
    } else if (this.currentStateSet.value === val) {
      this.nextState();
    } else {
      this.reset();
      this.currentStateSet.value = val;
    }
    return {
      currentStateSet: this.currentStateSet,
      previousStateSet: this.previousStateSet,
    };
  }
}

export type { StateSet, StateSetHistory };
export { SortStateMachine };
