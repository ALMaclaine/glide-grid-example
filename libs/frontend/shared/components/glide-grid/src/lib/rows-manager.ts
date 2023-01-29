import { IdRow } from './types/grid';
import { RowCache } from './utils/caches/row-cache';
import { addIdsToRows } from './utils/general';
import { SortStateMachine } from './utils/sort/sort-state-machine';
import { TableSorter } from './utils/sort/table-sorter';
import { Columns } from './utils/columns';
import { STATE_HISTORY_STEPS } from './constants';
import { StringKeys } from './types/general';
import { SortMap } from './utils/sort/sort-map';

class RowsManager<T> {
  private readonly _rows: IdRow<T>[];
  private readonly rowCache: RowCache<T>;
  readonly stateMachine: SortStateMachine<T> = new SortStateMachine<T>();
  readonly sorter: TableSorter<T>;
  private _sorted: IdRow<T>[];

  get rows() {
    return this._rows;
  }

  get sorted() {
    return this._sorted;
  }
  constructor(data: T[], sortMap: SortMap<T>) {
    this._rows = addIdsToRows(data);
    this._sorted = this._rows;
    this.rowCache = new RowCache<T>(this.rows);
    this.sorter = new TableSorter({
      originalData: this._rows,
      sortMap,
    });
  }

  get length() {
    return this._rows.length;
  }

  getRowByIndex(index: number) {
    return this.rowCache.getRowByIndex(index);
  }

  nextSortKey(key: StringKeys<T>) {
    const stateHistory = this.stateMachine.nextValue(key, STATE_HISTORY_STEPS);
    const sorted = this.sorter.stateSort(stateHistory);
    this._sorted = sorted;
    return sorted;
  }
}
export { RowsManager };
