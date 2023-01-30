import { Columns } from './columns';
import { Cell, IdRow, WrappedGridColumn } from '../types/grid';
import { StringKeys } from '../types/general';
import { CellCache } from './caches/cell-cache';
import { GridCell, Item } from '@glideapps/glide-data-grid';
import { SortMap } from './sort/sort-map';
import { TableSorter } from './sort/table-sorter';
import { SortStateMachine } from './sort/sort-state-machine';
import { STATE_HISTORY_STEPS } from '../constants';
import { uuid } from './general';

type GridManagerProps<T> = {
  columns: WrappedGridColumn<T>[];
  data: T[];
  hiddenColumns?: StringKeys<T>[];
};

const addIdsToRows = <T>(rows: T[]): IdRow<T>[] => {
  // mutate directly to avoid performance issues on large tables
  for (const row of rows) {
    const changeType = row as IdRow<T>;
    changeType.rowUuid = uuid();
  }
  return rows as IdRow<T>[];
};

class GridManager<T> {
  private readonly _columns: Columns<T>;
  readonly cellCache: CellCache<T>;
  private readonly rows: IdRow<T>[];

  readonly stateMachine: SortStateMachine<T> = new SortStateMachine<T>();
  readonly sorter: TableSorter<T>;

  constructor({ columns, data, hiddenColumns }: GridManagerProps<T>) {
    this._columns = new Columns<T>({ columns, hiddenColumns });
    const sortMap = new SortMap({ columns });
    this.rows = addIdsToRows(data);
    this.sorter = new TableSorter({
      sortMap,
    });
    this.sorter.addData(this.rows);
    this.cellCache = this.setupCellCache(columns);
  }

  private genCell(item: IdRow<T>, colUuid: string): Cell<T> {
    const { data, displayData, ...rest } = this._columns.getCell(colUuid);
    return {
      ...rest,
      data: item[data],
      displayData: item[displayData],
    } as Cell<T>;
  }

  private setupCellCache(columns: WrappedGridColumn<T>[]) {
    const cellCache = new CellCache<T>();
    for (let row = 0; row < this.length; row++) {
      const item = this.rows[row];
      const { rowUuid } = item;
      for (let col = 0; col < columns.length; col++) {
        const { columnUuid } = columns[col];
        const cell = this.genCell(item, columnUuid);
        cellCache.set(rowUuid, columnUuid, cell);
      }
    }
    return cellCache;
  }

  itemToCell([col, row]: Item): GridCell {
    const { rowUuid } = this.sorter.sorted[row];
    const translatedCol = this._columns.getTranslation(col);
    return this.cellCache.get(rowUuid, translatedCol) as GridCell;
  }

  getColumns() {
    return this._columns.getColumns();
  }

  swap(col1: number, col2: number) {
    this._columns.swap(col1, col2);
  }

  getHeaderKey(col: number) {
    return this._columns.getHeaderKey(col);
  }

  get length() {
    return this.sorter.length;
  }

  getHistory(steps: number) {
    return this.stateMachine.getHistory(steps);
  }

  nextSortKey(key: StringKeys<T>) {
    const stateHistory = this.stateMachine.nextValue(key, STATE_HISTORY_STEPS);
    return this.sorter.stateSort(stateHistory);
  }
}

export { GridManager };
export type { GridManagerProps };
