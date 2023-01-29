import { IdRow } from './types/grid';
import { RowCache } from './utils/caches/row-cache';
import { addIdsToRows } from './utils/general';
import { SortStateMachine } from './utils/sort/sort-state-machine';
import { TableSorter } from './utils/sort/table-sorter';
import { Columns } from './utils/columns';
import { STATE_HISTORY_STEPS } from './constants';
import { StringKeys } from './types/general';
import { CellCache } from './utils/caches/cell-cache';
import { Item } from '@glideapps/glide-data-grid';

class RowsManager<T> {
  private readonly _rows: IdRow<T>[];
  private readonly cache: RowCache<T>;
  readonly stateMachine: SortStateMachine<T>;
  readonly sorter: TableSorter<T>;
  readonly columns: Columns<T>;
  readonly cellCache: CellCache<T>;
  private sorted: IdRow<T>[];

  get rows() {
    return this._rows;
  }
  constructor(data: T[], columns: Columns<T>) {
    this.columns = columns;
    this._rows = addIdsToRows(data);
    this.sorted = this._rows;
    this.cache = new RowCache<T>(this.rows);
    this.stateMachine = new SortStateMachine<T>();
    this.sorter = new TableSorter({ originalData: this._rows, columns });

    this.cellCache = new CellCache({
      columns: this.columns,
    });

    for (let row = 0; row < this.length; row++) {
      const item = this.getRowByIndex(row);
      const { rowUuid } = item;
      for (let col = 0; col < columns.length; col++) {
        const cell = this.columns.genCell(item, col);
        this.cellCache.set(rowUuid, col, cell);
      }
    }
  }

  itemToCell([col, row]: Item) {
    const { rowUuid } = this.sorted[row];
    return this.cellCache.get(rowUuid, col);
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
    const sorted = this.sorter.stateSort(stateHistory);
    this.sorted = sorted;
    return sorted;
  }
}
export { RowsManager };
