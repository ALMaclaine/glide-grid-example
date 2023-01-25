import { v4 as uuid } from 'uuid';
import type { Indexable } from '../types/general';
import type { IdRow } from '../types/grid';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOpObj = () => ({});

const addIdToRow = <T extends Indexable>(row: T): IdRow<T> => {
  // mutate directly to avoid performance issues on large tables
  const changeType = row as IdRow<T>;
  changeType.rowUuid = uuid();
  return changeType;
};

const addIdsToRows = <T extends Indexable>(rows: T[]): IdRow<T>[] => {
  // mutate directly to avoid performance issues on large tables
  rows.forEach(addIdToRow);
  return rows as IdRow<T>[];
};

export { noOp, noOpObj, addIdToRow, addIdsToRows };
