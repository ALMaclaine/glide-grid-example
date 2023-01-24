import { RowCache } from '../cache/RowCache';
import { useCallback, useRef } from 'react';
import type { Indexable } from '../types/general';

const useRowCache = <T extends Indexable, U extends RowCache<T>>(
  cacheStore: U
) => {
  const cache = useRef<U>(cacheStore);

  const cacheGetRowByIndex = useCallback((n: number) => {
    return cache.current?.getRowByIndex(n);
  }, []);

  return {
    cacheGetRowByIndex,
  };
};

export { useRowCache };
