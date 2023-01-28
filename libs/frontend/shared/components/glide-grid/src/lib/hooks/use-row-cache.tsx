import { RowCache } from '../utils/cache/row-cache';
import { useCallback, useMemo } from 'react';
import { IdRow } from '../types/grid';

const useRowCache = <T,>(data: IdRow<T>[]) => {
  const cache = useMemo(() => new RowCache(data), [data]);

  const cacheGetRowByIndex = useCallback(
    (row: number) => {
      return cache.getRowByIndex(row);
    },
    [cache]
  );

  return {
    getRowByIndex: cacheGetRowByIndex,
  };
};

export { useRowCache };
