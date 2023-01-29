import { ColumnsProps } from '../types/props';
import { Columns } from './columns';

type GridManagerProps<T> = ColumnsProps<T>;
class GridManager<T> {
  private readonly _columns: Columns<T>;
  constructor({ columns }: GridManagerProps<T>) {
    this._columns = columns;
  }

  get columns() {
    return this._columns;
  }
}

export { GridManager };
export type { GridManagerProps };
