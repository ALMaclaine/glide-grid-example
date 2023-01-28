import { IdRow } from './types/grid';
import { RowCache } from './utils/caches/row-cache';
import { addIdsToRows } from './utils/general';
import { SortStateMachine } from './utils/sort/sort-state-machine';
import { TableSorter } from './utils/sort/table-sorter';
import { Columns } from './utils/columns';
import { STATE_HISTORY_STEPS } from './constants';
import { StringKeys } from './types/general';

class RowsManager<T> {
  private readonly _rows: IdRow<T>[];
  private readonly cache: RowCache<T>;
  readonly stateMachine: SortStateMachine<T>;
  readonly sorter: TableSorter<T>;

  get rows() {
    return this._rows;
  }
  constructor(data: T[], columns: Columns<T>) {
    this._rows = addIdsToRows(data);
    this.cache = new RowCache<T>(this.rows);
    this.stateMachine = new SortStateMachine<T>();
    this.sorter = new TableSorter({ originalData: this._rows, columns });
  }

  get length() {
    return this._rows.length;
  }

  getRowById(id: string) {
    return this.cache.getRowById(id);
  }

  getRowByIndex(index: number) {
    return this.cache.getRowByIndex(index);
  }

  nextSortKey(key: StringKeys<T>) {
    const stateHistory = this.stateMachine.nextValue(key, STATE_HISTORY_STEPS);
    return this.sorter.stateSort(stateHistory);
  }
}
export { RowsManager };
