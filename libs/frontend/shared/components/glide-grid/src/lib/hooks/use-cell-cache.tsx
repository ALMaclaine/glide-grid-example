import { useCallback, useEffect, useMemo, useRef } from 'react';
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
