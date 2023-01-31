import type { StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import type { StateSet } from './sort-state-machine';
import type { SortMap } from './sort-map';
import { objectSort, SORT_TYPES } from './object-sort';
import { MiniCache } from '../mini-cache';

type TableSorterProps<T> = {
  sortMap: SortMap<T>;
};

class TableSorter<T> {
  private readonly sortMap: SortMap<T>;
  private stateHistory: StateSet<T>[] = [];
  private readonly sortCache = new MiniCache<IdRow<T>[]>();

  constructor({ sortMap }: TableSorterProps<T>) {
    this.sortMap = sortMap;
    this.sortCache.cache([]);
  }

  clear() {
    this.sortCache.dirty();
  }

  addData(data: IdRow<T>[]) {
    this.sort([...this.sorted, ...data]);
  }

  get sorted() {
    return this.sortCache.getCache();
  }

  get length() {
    return this.sortCache.getCache().length;
  }

  private getType(key: StringKeys<T> | '') {
    return key === '' ? SORT_TYPES.natural : this.sortMap.getType(key);
  }

  private sort(cache: IdRow<T>[]) {
    const sorted = objectSort(
      cache,
      this.stateHistory.map(({ state, key }) => ({
        state,
        type: this.getType(key),
        key,
      }))
    );
    return this.sortCache.cache(sorted);
  }

  stateSort(stateHistory: StateSet<T>[]) {
    this.stateHistory = stateHistory;
    return this.sort(this.sorted);
  }
}

export { TableSorter };
export type { TableSorterProps };
