import { useCallback, useMemo } from 'react';
import { CellCache } from '../utils/caches/cell-cache';
import type {
  ColumnsProps,
  RowIndexGetterProps,
  RowsProps,
} from '../types/props';

type UseCellCacheProps<T> = ColumnsProps<T> &
  RowIndexGetterProps<T> &
  RowsProps;

const useCellCache = <T,>({
  columns,
  getRowByIndex,
  rows,
}: UseCellCacheProps<T>) => {
  const cache = useMemo(() => {
    return new CellCache({
      columns,
      rows,
      getRowByIndex,
    });
  }, [columns, getRowByIndex, rows]);

  const cacheGetRow = useCallback(
    (uuid: string, col: number) => {
      return cache.get(uuid, col);
    },
    [cache]
  );

  return {
    cacheGetRow,
  };
};

export { useCellCache };
export type { UseCellCacheProps };
