import { GridCell } from '@glideapps/glide-data-grid';
import type { ColumnsProps } from '../../types/props';
import type { Columns } from '../columns';
import { IdRow } from '../../types/grid';

type CellCacheProps<T> = ColumnsProps<T>;

class CellCache<T> {
  // column -> row -> value
  private cachedContent: Map<string, Map<number, GridCell>> = new Map();
  private columns: Columns<T>;

  constructor({ columns }: CellCacheProps<T>) {
    this.columns = columns;
  }

  get(rowUuid: string, col: number): GridCell {
    const rowCache = this.cachedContent.get(rowUuid);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }

    const translatedCol = this.columns.getTranslation(col);

    return rowCache.get(translatedCol) as GridCell;
  }

  hasRow(rowUuid: string) {
    return this.cachedContent.has(rowUuid);
  }

  has(rowUuid: string, col: number) {
    return this.hasRow(rowUuid) && this.cachedContent.get(rowUuid)?.has(col);
  }

  set(rowUuid: string, col: number, cell: GridCell) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<number, GridCell>;
    rowCache.set(col, cell);
  }
}

export { CellCache };
export type { CellCacheProps };
