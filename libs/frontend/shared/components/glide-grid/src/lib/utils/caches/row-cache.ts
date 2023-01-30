import type { IdRow } from '../../types/grid';
import { addIdToRow } from '../general';

class RowCache<T> {
  private rowIdArray: string[] = [];
  private _rows: IdRow<T>[] = [];
  private cache = new Map<string, IdRow<T>>();
  private idRowMap = new Map<string, number>();
  // column -> row -> value
  constructor(data: T[] = []) {
    for (const row of data) {
      const idRow = addIdToRow(row);
      const { rowUuid } = idRow;
      this.idRowMap.set(rowUuid, this.rowIdArray.length);
      this.rowIdArray.push(rowUuid);
      this.cache.set(rowUuid, idRow);
    }
    this._rows = data as IdRow<T>[];
  }

  get rows() {
    return this._rows;
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
