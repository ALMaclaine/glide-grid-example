import { sort } from 'fast-sort';
import type { Indexable, StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import { SORT_STATES } from '../../types/sort';
import { StateSet } from './sort-state-machine';
const { initial, ascending, descending } = SORT_STATES;

class TableSorter<T extends Indexable> {
  constructor(private originalData: IdRow<T>[]) {}
  private asc(key: StringKeys<T>) {
    return sort(this.originalData).asc(key);
  }

  private desc(key: StringKeys<T>) {
    return sort(this.originalData).desc(key);
  }

  stateSort(currentStateSet: StateSet<T>, previousStateSet: StateSet<T>) {
    const { state: currentState, value: currentValue } = currentStateSet;
    const { state: previousState, value: previousValue } = previousStateSet;
    if (currentState === initial && previousState === initial) {
      return this.originalData;
    }

    console.log(currentStateSet, previousStateSet);
    const sortBy = [];
    if (currentState !== initial) {
      const handler = (u: T) => u[currentValue];
      if (currentState === ascending) {
        sortBy.push({ asc: handler });
      } else {
        sortBy.push({ desc: handler });
      }
    }

    if (previousState !== initial) {
      const handler = (u: T) => u[previousValue];
      if (previousState === ascending) {
        sortBy.push({ asc: handler });
      } else {
        sortBy.push({ desc: handler });
      }
    }

    return sort(this.originalData).by(sortBy);
  }
}

export { TableSorter };
