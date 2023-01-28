import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import type { IdRow } from '../types/grid';

const addIdToRow = <T>(row: T): IdRow<T> => {
  // mutate directly to avoid performance issues on large tables
  const changeType = row as IdRow<T>;
  changeType.rowUuid = uuid();
  return changeType;
};

const addIdsToRows = <T>(rows: T[]): IdRow<T>[] => {
  // mutate directly to avoid performance issues on large tables
  rows.forEach(addIdToRow);
  return rows as IdRow<T>[];
};

const useAddIds = <T>(data: T[]) => {
  const dataWithIds = useMemo(() => addIdsToRows(data), [data]);
  return { dataWithIds };
};

export { useAddIds };
