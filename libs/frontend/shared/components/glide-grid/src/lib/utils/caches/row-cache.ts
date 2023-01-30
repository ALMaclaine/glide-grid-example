import type { IdRow } from '../../types/grid';
import { v4 as uuid } from 'uuid';

const addIdToRow = <T>(row: T): IdRow<T> => {
  // mutate directly to avoid performance issues on large tables
  const changeType = row as IdRow<T>;
  changeType.rowUuid = uuid();
  return changeType;
};

class RowCache<T> {
  private rowIdArray: IdRow<T>[] = [];

  addDataItem(item: T): IdRow<T> {
    const idRow = addIdToRow(item);
    this.rowIdArray.push(idRow);
    return item as IdRow<T>;
  }

  getRowByIndex(n: number) {
    const row = this.rowIdArray[n];
    if (!row) {
      throw new Error('Cache should be set before accessing');
    }
    return row;
  }

  hasIndex(n: number) {
    return n >= 0 || n < this.rowIdArray.length;
  }
}

export { RowCache };
