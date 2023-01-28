import { useCallback, useMemo } from 'react';
import { Item } from '@glideapps/glide-data-grid';
import type { ColumnsProps, RowsProps } from '../types/props';
import type { IdRow } from '../types/grid';
import type { ItemToGridCell } from '../types/func';
import { RowsManager } from '../rows-manager';
import { CellCache } from '../utils/caches/cell-cache';

type UseGenGetCellContentProps<T> = ColumnsProps<T> &
  RowsProps & {
    sorted: IdRow<T>[];
    rowManager: RowsManager<T>;
  };

const useGenGetCellContent = <T,>({
  columns,
  rowManager,
  sorted,
  rows,
}: UseGenGetCellContentProps<T>) => {
  const cache = useMemo(() => {
    return new CellCache({
      columns,
      rows,
      getRowByIndex: (row: number) => rowManager.getRowByIndex(row),
    });
  }, [columns, rowManager, rows]);

  const getCellContent = useCallback<ItemToGridCell>(
    ([col, row]: Item) => {
      const { rowUuid } = sorted[row];
      return cache.get(rowUuid, col);
    },
    [cache, sorted]
  );

  return { getCellContent };
};

export { useGenGetCellContent };
export type { UseGenGetCellContentProps };
