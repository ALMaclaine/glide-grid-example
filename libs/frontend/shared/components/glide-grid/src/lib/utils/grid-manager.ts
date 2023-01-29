import { Columns } from './columns';
import { RowsManager } from '../rows-manager';
import { WrappedGridColumn } from '../types/grid';
import { StringKeys } from '../types/general';

type GridManagerProps<T> = {
  columns: WrappedGridColumn<T>[];
  data: T[];
  hiddenColumns?: StringKeys<T>[];
};

class GridManager<T> {
  private readonly _columns: Columns<T>;
  private readonly _rowManager: RowsManager<T>;
  constructor({ columns, data, hiddenColumns }: GridManagerProps<T>) {
    this._columns = new Columns<T>({ columns, hiddenColumns });
    this._rowManager = new RowsManager<T>(data, this._columns);
  }

  get length() {
    return this.rowManager.length;
  }

  get columns() {
    return this._columns;
  }

  get rowManager() {
    return this._rowManager;
  }
}

export { GridManager };
export type { GridManagerProps };
