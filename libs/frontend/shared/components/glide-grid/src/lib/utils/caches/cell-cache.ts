import { GridCell } from '@glideapps/glide-data-grid';

class CellCache {
  // column -> row -> value
  private cachedContent: Map<string, Map<number, GridCell>> = new Map();

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

  set(rowUuid: string, col: number, cell: GridCell) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<number, GridCell>;
    rowCache.set(col, cell);
  }
}

export { CellCache };
