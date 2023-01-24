import { Indexable } from '../types/general';
import { IdRow } from '../types/grid';
import { sort } from 'fast-sort';
import { SORT_STATES, SortStates } from '../types/sort';

class Sorter<T extends Indexable> {
  constructor(private originalData: IdRow<T>[]) {}
  private asc(key: string) {
    return sort(this.originalData).asc(key);
  }

  private desc(key: string) {
    return sort(this.originalData).desc(key);
  }

  stateSort(state: SortStates, key: string) {
    switch (state) {
      case SORT_STATES.initial:
        return this.originalData;
      case SORT_STATES.ascending:
        return this.asc(key);
      case SORT_STATES.descending:
        return this.desc(key);
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = state;
        return this.originalData;
      }
    }
  }
}

export { Sorter };
