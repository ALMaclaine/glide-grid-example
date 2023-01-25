import { RowCache } from '../utils/cache/row-cache';
import { useCallback, useRef } from 'react';
import type { Indexable } from '../types/general';

const useRowCache = <T extends Indexable, U extends RowCache<T>>(
  cacheStore: U
) => {
  const cache = useRef<U>(cacheStore);

  const cacheGetRowByIndex = useCallback((row: number) => {
    return cache.current?.getRowByIndex(row);
  }, []);

  return {
    cacheGetRowByIndex,
  };
};

export { useRowCache };
