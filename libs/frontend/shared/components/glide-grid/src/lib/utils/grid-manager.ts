import { Columns } from './columns';
import { RowsManager } from '../rows-manager';
import { WrappedGridColumn } from '../types/grid';
import { StringKeys } from '../types/general';
import { CellCache } from './caches/cell-cache';
import { RowCache } from './caches/row-cache';
import { GridCell, Item } from '@glideapps/glide-data-grid';
import { SortMap } from './sort/sort-map';

type GridManagerProps<T> = {
  columns: WrappedGridColumn<T>[];
  data: T[];
  hiddenColumns?: StringKeys<T>[];
};

class GridManager<T> {
  private readonly _columns: Columns<T>;
  private readonly _rowManager: RowsManager<T>;
  private readonly rowCache: RowCache<T>;
  readonly cellCache: CellCache<T>;

  constructor({ columns, data, hiddenColumns }: GridManagerProps<T>) {
    this._columns = new Columns<T>({ columns, hiddenColumns });
    const sortMap = new SortMap({ columns });
    this._rowManager = new RowsManager<T>(data, sortMap);
    this.rowCache = new RowCache<T>(this._rowManager.rows);
    this.cellCache = this.setupCellCache(columns);
  }

  private setupCellCache(columns: WrappedGridColumn<T>[]) {
    const cellCache = new CellCache<T>();
    for (let row = 0; row < this.length; row++) {
      const item = this.rowCache.getRowByIndex(row);
      const { rowUuid } = item;
      for (let col = 0; col < columns.length; col++) {
        const { columnUuid } = columns[col];
        const cell = this._columns.genCell(item, columnUuid);
        cellCache.set(rowUuid, columnUuid, cell);
      }
    }
    return cellCache;
  }

  itemToCell([col, row]: Item): GridCell {
    const { rowUuid } = this._rowManager.sorted[row];
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
    return this._rowManager.length;
  }

  getHistory(steps: number) {
    return this._rowManager.stateMachine.getHistory(steps);
  }

  nextSortKey(key: StringKeys<T>) {
    this._rowManager.nextSortKey(key);
  }
}

export { GridManager };
export type { GridManagerProps };
