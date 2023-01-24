import { Indexable } from '../types';
import { RowCache } from '../Cache';
import { useCallback, useRef } from 'react';

const useRowCache = <T extends Indexable, U extends RowCache<T>>(
  cacheStore: U
) => {
  const cache = useRef<U>(cacheStore);
  const cacheHasId = useCallback((uuid: string) => {
    return cache.current?.hasId(uuid);
  }, []);

  const cacheHasIndex = useCallback((n: number) => {
    return cache.current?.hasIndex(n);
  }, []);

  const cacheGetRowById = useCallback((uuid: string) => {
    return cache.current?.getRowById(uuid);
  }, []);

  const cacheGetRowId = useCallback((n: number) => {
    return cache.current?.getRowId(n);
  }, []);

  const cacheGetRowByIndex = useCallback((n: number) => {
    return cache.current?.getRowByIndex(n);
  }, []);

  const cacheSet = useCallback((uuid: string, value: T) => {
    return cache.current?.set(uuid, value);
  }, []);

  return {
    cacheHasId,
    cacheHasIndex,
    cacheGetRowById,
    cacheGetRowId,
    cacheGetRowByIndex,
    cacheSet,
  };
};

export { useRowCache };
