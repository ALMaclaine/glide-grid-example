import { GridCell } from '@glideapps/glide-data-grid';

class CellCache {
  // column -> row -> value
  private cachedContent: Map<string, Map<string, GridCell>> = new Map();

  get(rowUuid: string, columnUuid: string): GridCell {
    const rowCache = this.cachedContent.get(rowUuid);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }

    return rowCache.get(columnUuid) as GridCell;
  }

  hasRow(rowUuid: string) {
    return this.cachedContent.has(rowUuid);
  }

  has(rowUuid: string, columnUuid: string) {
    return (
      this.hasRow(rowUuid) && this.cachedContent.get(rowUuid)?.has(columnUuid)
    );
  }

  set(rowUuid: string, columnUuid: string, cell: GridCell) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map<string, GridCell>());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<string, GridCell>;
    rowCache.set(columnUuid, cell);
  }
}

export { CellCache };
