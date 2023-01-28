import { useCallback, useMemo } from 'react';
import { Item } from '@glideapps/glide-data-grid';
import type { ColumnsProps, RowsProps } from '../types/props';
import type { IdRow } from '../types/grid';
import type { ItemToGridCell } from '../types/func';
import { RowsManager } from '../rows-manager';
import { CellCache } from '../utils/caches/cell-cache';

type UseGenGetCellContentProps<T> = {
  sorted: IdRow<T>[];
  rowManager: RowsManager<T>;
};

const useGenGetCellContent = <T,>({
  rowManager,
  sorted,
}: UseGenGetCellContentProps<T>) => {
  const cache = useMemo(() => {
    return new CellCache({
      columns: rowManager.columns,
      rows: rowManager.length,
      getRowByIndex: (row: number) => rowManager.getRowByIndex(row),
    });
  }, [rowManager]);

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
