import type { IdRow } from '../../types/grid';
import { uuid } from '../general';

const addIdToRow = <T>(row: T): IdRow<T> => {
  // mutate directly to avoid performance issues on large tables
  const changeType = row as IdRow<T>;
  changeType.rowUuid = uuid();
  return changeType;
};

class RowCache<T> {
  private rowCache = new Map<string, IdRow<T>>();

  addRow(row: T): IdRow<T> {
    const idRow = addIdToRow(row);
    this.rowCache.set(idRow.rowUuid, idRow);
    return row as IdRow<T>;
  }

  getRowById(rowUuid: string) {
    const row = this.rowCache.get(rowUuid);
    if (!row) {
      throw new Error('Cache does not have rowUuid: ' + rowUuid);
    }
    return row;
  }

  hasRow(rowUuid: string) {
    return this.rowCache.has(rowUuid);
  }

  clear() {
    this.rowCache = new Map();
  }
}

export { RowCache };
