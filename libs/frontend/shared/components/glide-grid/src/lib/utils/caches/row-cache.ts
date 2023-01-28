import type { IdRow } from '../../types/grid';

class RowCache<T> {
  private rowIdArray: string[] = [];
  private cache = new Map<string, IdRow<T>>();
  // column -> row -> value
  constructor(data: IdRow<T>[] = []) {
    for (const row of data) {
      const { rowUuid } = row;
      this.rowIdArray.push(rowUuid);
      this.cache.set(rowUuid, row);
    }
  }

  getRowId(n: number) {
    if (!this.hasIndex(n)) {
      throw new Error('Attempting to grab row id outside of range.');
    }
    return this.rowIdArray[n];
  }

  getRowByIndex(n: number) {
    const uuid = this.getRowId(n);
    const row = this.cache.get(uuid);
    if (!row) {
      throw new Error('Cache should be set before accessing');
    }
    return row;
  }

  hasIndex(n: number) {
    return n >= 0 || n < this.rowIdArray.length;
  }

  set(uuid: string, value: IdRow<T>) {
    this.cache.set(uuid, value);
  }
}

export { RowCache };
