import type { StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import type { StateSet } from './sort-state-machine';
import type { SortMap } from './sort-map';
import { objectSort, SORT_TYPES } from './object-sort';

type TableSorterProps<T> = {
  originalData: IdRow<T>[];
  sortMap: SortMap<T>;
};

class TableSorter<T> {
  private readonly originalData: IdRow<T>[];
  private readonly sortMap: SortMap<T>;
  constructor({ originalData, sortMap }: TableSorterProps<T>) {
    this.originalData = originalData;
    this.sortMap = sortMap;
  }

  private cloneOriginal() {
    return [...this.originalData];
  }

  private getType(key: StringKeys<T> | '') {
    if (key === '') {
      return SORT_TYPES.natural;
    }
    return this.sortMap.getType(key);
  }

  stateSort(stateHistory: StateSet<T>[]) {
    return objectSort(this.cloneOriginal(), [
      ...stateHistory.map(({ state, key }) => ({
        state,
        type: this.getType(key),
        key,
      })),
    ]);
  }
}

export { TableSorter };
export type { TableSorterProps };
