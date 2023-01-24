import type { SortStates } from '../types/sort';
import { SORT_STATES } from '../types/sort';

const sortStatesArray: SortStates[] = [
  SORT_STATES.initial,
  SORT_STATES.ascending,
  SORT_STATES.descending,
];

function* cycleStates() {
  let i = 0;
  const len = sortStatesArray.length;
  while (true) {
    yield sortStatesArray[i++ % len];
  }
}

const genCycleStates = () => {
  const generator = cycleStates();
  return () => generator.next().value as SortStates;
};

class SortStateMachine {
  private _state: SortStates = SORT_STATES.initial;
  private lastValue = '';
  private stateCycler = genCycleStates();

  get state() {
    return this._state;
  }

  resetCycler() {
    this.stateCycler = genCycleStates();
    // resets to initial and prevents double click
    this.nextState();
  }

  nextState() {
    this._state = this.stateCycler();
  }

  nextValue(val: string) {
    if (val === '') {
      this.lastValue = '';
      this.resetCycler();
    } else if (this.lastValue === '') {
      this.lastValue = val;
      this.nextState();
    } else if (this.lastValue === val) {
      this.nextState();
    } else {
      this.lastValue = val;
      this.resetCycler();
    }
    return this.state;
  }
}

export { SortStateMachine };
