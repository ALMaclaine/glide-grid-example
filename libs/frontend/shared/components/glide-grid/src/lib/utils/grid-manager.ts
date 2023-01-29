import { Columns } from './columns';
import { RowsManager } from '../rows-manager';
import { WrappedGridColumn } from '../types/grid';
import { StringKeys } from '../types/general';
import { CellCache } from './caches/cell-cache';
import { RowCache } from './caches/row-cache';
import { GridCell, Item } from '@glideapps/glide-data-grid';

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
    this._rowManager = new RowsManager<T>(data, this._columns);
    this.rowCache = new RowCache<T>(this._rowManager.rows);

    this.cellCache = new CellCache<T>();

    for (let row = 0; row < this.length; row++) {
      const item = this.rowCache.getRowByIndex(row);
      const { rowUuid } = item;
      for (let col = 0; col < columns.length; col++) {
        const { columnUuid } = columns[col];
        const cell = this._columns.genCell(item, columnUuid);
        this.cellCache.set(rowUuid, columnUuid, cell);
      }
    }
  }

  itemToCell([col, row]: Item): GridCell {
    const { rowUuid } = this._rowManager.sorted[row];
    const translatedCol = this.columns.getTranslation(col);
    return this.cellCache.get(rowUuid, translatedCol) as GridCell;
  }

  get length() {
    return this.rowManager.length;
  }

  get columns() {
    return this._columns;
  }

  get sorted() {
    return this._rowManager.sorted;
  }

  get rowManager() {
    return this._rowManager;
  }
}

export { GridManager };
export type { GridManagerProps };
