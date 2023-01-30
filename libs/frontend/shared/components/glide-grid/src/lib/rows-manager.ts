import { RowCache } from './utils/caches/row-cache';
import { SortStateMachine } from './utils/sort/sort-state-machine';
import { TableSorter } from './utils/sort/table-sorter';
import { STATE_HISTORY_STEPS } from './constants';
import type { StringKeys } from './types/general';
import { SortMap } from './utils/sort/sort-map';

class RowsManager<T> {
  private readonly rowCache: RowCache<T>;

  readonly stateMachine: SortStateMachine<T> = new SortStateMachine<T>();
  readonly sorter: TableSorter<T>;

  get sorted() {
    return this.sorter.sorted;
  }
  constructor(data: T[], sortMap: SortMap<T>) {
    this.rowCache = new RowCache<T>(data);
    this.sorter = new TableSorter({
      originalData: this.rowCache.rows,
      sortMap,
    });
  }

  get length() {
    return this.sorter.length;
  }

  getRowByIndex(index: number) {
    return this.rowCache.getRowByIndex(index);
  }

  nextSortKey(key: StringKeys<T>) {
    const stateHistory = this.stateMachine.nextValue(key, STATE_HISTORY_STEPS);
    return this.sorter.stateSort(stateHistory);
  }
}
export { RowsManager };
