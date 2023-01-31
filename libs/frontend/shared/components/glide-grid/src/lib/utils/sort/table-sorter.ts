import type { StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import type { StateSet } from './sort-state-machine';
import { SortMap } from './sort-map';
import { objectSort } from './object-sort';
import { MiniCache } from '../mini-cache';
import { SortStateMachine } from './sort-state-machine';
import { STATE_HISTORY_STEPS } from '../../constants';

type TableSorterProps<T> = {
  sortMap: SortMap<T>;
};

class TableSorter<T> {
  private stateHistory: StateSet<T>[] = [];
  private readonly sortCache = new MiniCache<IdRow<T>[]>();
  private readonly sortStateMachine: SortStateMachine<T> =
    new SortStateMachine<T>();
  private readonly sortMap: SortMap<T>;

  constructor({ sortMap }: TableSorterProps<T>) {
    this.sortMap = sortMap;
    this.sortCache.cache([]);
  }

  getSortHistory(steps: number) {
    return this.sortStateMachine.getHistory(steps);
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

  private sort(cache: IdRow<T>[]) {
    const sorted = objectSort(
      cache,
      this.stateHistory.map(({ state, key }) => ({
        state,
        type: this.sortMap.getType(key),
        key,
      }))
    );
    return this.sortCache.cache(sorted);
  }

  stateSort(key: StringKeys<T>) {
    this.stateHistory = this.sortStateMachine.nextValue(
      key,
      STATE_HISTORY_STEPS
    );
    return this.sort(this.sorted);
  }
}

export { TableSorter };
export type { TableSorterProps };
