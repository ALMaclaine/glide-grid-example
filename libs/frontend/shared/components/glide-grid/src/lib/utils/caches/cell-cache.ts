import type { Cell } from '../../types/grid';

class CellCache<T> {
  // column -> row -> value
  private cachedContent: Map<string, Map<string, Cell<T>>> = new Map();

  get(rowUuid: string, columnUuid: string): Cell<T> {
    const rowCache = this.cachedContent.get(rowUuid);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }
    return rowCache.get(columnUuid) as Cell<T>;
  }

  hasRow(rowUuid: string) {
    return this.cachedContent.has(rowUuid);
  }

  has(rowUuid: string, columnUuid: string) {
    return (
      this.hasRow(rowUuid) && this.cachedContent.get(rowUuid)?.has(columnUuid)
    );
  }

  clear() {
    this.cachedContent = new Map();
  }

  set(rowUuid: string, columnUuid: string, cell: Cell<T>) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map<string, Cell<T>>());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<string, Cell<T>>;
    rowCache.set(columnUuid, cell);
  }
}

export { CellCache };
