import { RowCache } from '../utils/cache/row-cache';
import { useCallback, useMemo } from 'react';
import type { Indexable } from '../types/general';
import { IdRow } from '../types/grid';

const useRowCache = <T extends Indexable>(data: IdRow<T>[]) => {
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
