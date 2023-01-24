import { GlideGridProps, IdRow, Indexable } from '../types';
import { useCallback, useMemo } from 'react';
import { genGetCellContent } from '../utils';
import { GridCell, Item } from '@glideapps/glide-data-grid';
import { useCellCache } from './use-cell-cache';

const useGenGetCellContent = <T extends Indexable>({
  columns,
  getRowByIndex,
}: Pick<GlideGridProps<T>, 'columns'> & {
  getRowByIndex: (n: number) => IdRow<T>;
}) => {
  const { cacheGetRow, cacheSetRow, cacheHas } = useCellCache();

  // useCallback can't be used for generating functions because it expects an inline function definition
  // https://kyleshevlin.com/debounce-and-throttle-callbacks-with-react-hooks
  // https://stackoverflow.com/questions/69830440/react-hook-usecallback-received-a-function-whose-dependencies-are-unknown-pass
  const getCellContentInner = useMemo(
    () => genGetCellContent(columns, getRowByIndex),
    [columns, getRowByIndex]
  );

  const getCellContent: (item: Item) => GridCell = useCallback<
    (item: Item) => GridCell
  >(
    ([col, row]: Item) => {
      const rowItem = getRowByIndex(row);
      const { rowUuid } = rowItem;
      if (!cacheHas(rowUuid, col)) {
        const cell = getCellContentInner([col, row]);
        cacheSetRow(rowUuid, col, cell);
      }
      return cacheGetRow(rowUuid, col);
    },
    [cacheGetRow, cacheHas, cacheSetRow, getCellContentInner, getRowByIndex]
  );

  return { getCellContent };
};

export { useGenGetCellContent };
