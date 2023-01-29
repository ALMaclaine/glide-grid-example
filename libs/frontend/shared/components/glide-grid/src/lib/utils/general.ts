import { v4 as uuid } from 'uuid';
import type { IdColumn, IdRow, WrappedGridColumn } from '../types/grid';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOpObj = () => ({});

const addIdsToRows = <T>(rows: T[]): IdRow<T>[] => {
  // mutate directly to avoid performance issues on large tables
  for (const row of rows) {
    const changeType = row as IdRow<T>;
    changeType.rowUuid = uuid();
  }
  return rows as IdRow<T>[];
};

const addIdsToColumns = <T>(
  columns: WrappedGridColumn<T>[]
): IdColumn<WrappedGridColumn<T>>[] => {
  // mutate directly to avoid performance issues on large tables
  for (const column of columns) {
    const changeType = column as IdColumn<WrappedGridColumn<T>>;
    changeType.columnUuid = uuid();
  }
  return columns as IdColumn<WrappedGridColumn<T>>[];
};

export { noOp, noOpObj, uuid, addIdsToRows, addIdsToColumns };
