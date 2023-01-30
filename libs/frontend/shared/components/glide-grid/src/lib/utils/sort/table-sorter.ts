import type { StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import type { StateSet } from './sort-state-machine';
import type { SortMap } from './sort-map';
import { objectSort, SORT_TYPES } from './object-sort';

type TableSorterProps<T> = {
  sortMap: SortMap<T>;
};

class TableSorter<T> {
  private readonly sortMap: SortMap<T>;
  private _sorted: IdRow<T>[] = [];
  private stateHistory: StateSet<T>[] = [];

  constructor({ sortMap }: TableSorterProps<T>) {
    this.sortMap = sortMap;
  }

  clear() {
    this._sorted = [];
  }

  addData(data: IdRow<T>[]) {
    this._sorted = [...this._sorted, ...data];
    if (this.stateHistory.length > 0) {
      this.sort();
    }
  }

  get sorted() {
    return this._sorted;
  }

  get length() {
    return this._sorted.length;
  }

  private getType(key: StringKeys<T> | '') {
    if (key === '') {
      return SORT_TYPES.natural;
    }
    return this.sortMap.getType(key);
  }

  private sort() {
    this._sorted = objectSort(
      this._sorted,
      this.stateHistory.map(({ state, key }) => ({
        state,
        type: this.getType(key),
        key,
      }))
    );
    return this._sorted;
  }

  stateSort(stateHistory: StateSet<T>[]) {
    this.stateHistory = stateHistory;
    return this.sort();
  }
}

export { TableSorter };
export type { TableSorterProps };
