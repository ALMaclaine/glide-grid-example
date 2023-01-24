import {
  ColumnsProps,
  IdRow,
  Indexable,
  ItemToGridCell,
  RowIndexGetter,
  RowIndexGetterProps,
} from '../types';
import { useCallback, useMemo } from 'react';
import { genGetCellContent } from '../utils';
import { Item } from '@glideapps/glide-data-grid';
import { useCellCache } from './use-cell-cache';

const useGenGetCellContent = <T extends Indexable>({
  columns,
  getRowByIndex,
  sorted,
  rows,
}: ColumnsProps<T> &
  RowIndexGetterProps<T> & {
    sorted: IdRow<T>[];
    rows: number;
  }) => {
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
