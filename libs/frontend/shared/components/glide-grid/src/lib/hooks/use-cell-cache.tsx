import { Indexable } from '../types';
import { CellCache, RowCache } from '../Cache';
import { useCallback, useRef } from 'react';
import { GridCell } from '@glideapps/glide-data-grid';

const useCellCache = () => {
  const cache = useRef<CellCache>(new CellCache());

  const cacheHas = useCallback((uuid: string, col: number) => {
    return cache.current?.has(uuid, col);
  }, []);

  const cacheHasRow = useCallback((rowUuid: string) => {
    return cache.current?.hasRow(rowUuid);
  }, []);

  const cacheSetRow = useCallback(
    (uuid: string, col: number, value: GridCell) => {
      return cache.current?.set(uuid, col, value);
    },
    []
  );

  const cacheGetRow = useCallback((uuid: string, col: number) => {
    return cache.current?.get(uuid, col);
  }, []);

  return {
    cacheHas,
    cacheHasRow,
    cacheSetRow,
    cacheGetRow,
  };
};

export { useCellCache };
