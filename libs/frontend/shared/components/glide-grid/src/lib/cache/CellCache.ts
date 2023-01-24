import { GridCell, Item } from '@glideapps/glide-data-grid';
import type { Indexable } from '../types/general';
import { GlideGridCellGenerator } from '../cells/generators';
import type { WrappedGridColumn } from '../types/grid';
import type {
  ColumnsProps,
  RowIndexGetterProps,
  RowsProps,
} from '../types/props';
import type { RowIndexGetter } from '../types/func';

const genGetCellContent = <T extends Indexable>(
  columns: WrappedGridColumn<T>[],
  getDataByIndex: RowIndexGetter<T>
): GlideGridCellGenerator => {
  return ([col, row]: Item): GridCell => {
    const item = getDataByIndex(row);
    if (col < columns.length) {
      const {
        cell: { data, displayData, ...rest },
      } = columns[col];

      return {
        ...rest,
        data: item[data],
        displayData: item[data],
      } as GridCell;
    } else {
      throw new Error("Attempting to access a column that doesn't exist");
    }
  };
};

type CellCacheProps<T extends Indexable> = ColumnsProps<T> &
  RowIndexGetterProps<T> &
  RowsProps;

class CellCache<T extends Indexable> {
  // column -> row -> value
  private cachedContent: Map<string, Map<number, GridCell>> = new Map();
  constructor({ columns, rows, getRowByIndex }: CellCacheProps<T>) {
    const cellGen = genGetCellContent(columns, getRowByIndex);
    for (let row = 0; row < rows; row++) {
      const { rowUuid } = getRowByIndex(row);
      for (let col = 0; col < columns.length; col++) {
        this.set(rowUuid, col, cellGen([col, row]));
      }
    }
  }

  get(rowUuid: string, col: number): GridCell {
    const rowCache = this.cachedContent.get(rowUuid);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }

    return rowCache.get(col) as GridCell;
  }

  hasRow(rowUuid: string) {
    return this.cachedContent.has(rowUuid);
  }

  has(rowUuid: string, col: number) {
    return this.hasRow(rowUuid) && this.cachedContent.get(rowUuid)?.has(col);
  }

  set(rowUuid: string, col: number, value: GridCell) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<number, GridCell>;
    rowCache.set(col, value);
  }
}

export { CellCache };
export type { CellCacheProps };
