import { useCallback } from 'react';
import { Item } from '@glideapps/glide-data-grid';
import { useCellCache } from './use-cell-cache';
import type { Indexable } from '../types/general';
import type {
  ColumnsProps,
  RowIndexGetterProps,
  RowsProps,
} from '../types/props';
import type { IdRow } from '../types/grid';
import type { ItemToGridCell } from '../types/func';

type UseGenGetCellContentProps<T extends Indexable> = ColumnsProps<T> &
  RowIndexGetterProps<T> &
  RowsProps & {
    sorted: IdRow<T>[];
  };

const useGenGetCellContent = <T extends Indexable>({
  columns,
  getRowByIndex,
  sorted,
  rows,
}: UseGenGetCellContentProps<T>) => {
  const { cacheGetRow } = useCellCache({
    columns,
    getRowByIndex,
    rows,
  });

  const getCellContent = useCallback<ItemToGridCell>(
    ([col, row]: Item) => {
      const { rowUuid } = sorted[row];
      return cacheGetRow(rowUuid, col);
    },
    [cacheGetRow, sorted]
  );

  return { getCellContent };
};

export { useGenGetCellContent };
export type { UseGenGetCellContentProps };
