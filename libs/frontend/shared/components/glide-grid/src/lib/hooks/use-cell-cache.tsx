import { CellCache } from '../Cache';
import { useCallback, useRef } from 'react';
import { genGetCellContent } from '../utils';
import { ColumnsProps, Indexable, RowIndexGetterProps } from '../types';

const useCellCache = <T extends Indexable>({
  columns,
  getRowByIndex,
  rows,
}: ColumnsProps<T> & RowIndexGetterProps<T> & { rows: number }) => {
  const cache = useRef<CellCache<T>>(
    new CellCache({
      cellGen: genGetCellContent(columns, getRowByIndex),
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
