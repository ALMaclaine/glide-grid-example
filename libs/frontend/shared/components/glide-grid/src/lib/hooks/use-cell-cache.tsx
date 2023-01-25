import { useCallback, useRef } from 'react';
import { CellCache } from '../utils/cache/cell-cache';
import type { Indexable } from '../types/general';
import type {
  ColumnsProps,
  RowIndexGetterProps,
  RowsProps,
} from '../types/props';

type UseCellCacheProps<T extends Indexable> = ColumnsProps<T> &
  RowIndexGetterProps<T> &
  RowsProps;

const useCellCache = <T extends Indexable>({
  columns,
  getRowByIndex,
  rows,
}: UseCellCacheProps<T>) => {
  const cache = useRef<CellCache<T>>(
    new CellCache({
      columns,
      rows,
      getRowByIndex,
    })
  );

  const cacheGetRow = useCallback((uuid: string, col: number) => {
    return cache.current?.get(uuid, col);
  }, []);

  return {
    cacheGetRow,
  };
};

export { useCellCache };
export type { UseCellCacheProps };
