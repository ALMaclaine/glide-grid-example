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

  constructor({ sortMap }: TableSorterProps<T>) {
    this.sortMap = sortMap;
  }

  addData(data: IdRow<T>[]) {
    this._sorted = [...this._sorted, ...data];
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

  stateSort(stateHistory: StateSet<T>[]) {
    this._sorted = objectSort(this._sorted, [
      ...stateHistory.map(({ state, key }) => ({
        state,
        type: this.getType(key),
        key,
      })),
    ]);
    return this._sorted;
  }
}

export { TableSorter };
export type { TableSorterProps };
