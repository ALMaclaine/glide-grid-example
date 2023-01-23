import { GlideGridProps, Indexable, RowGetter } from '../types';
import { useCallback, useMemo, useRef } from 'react';
import { ContentCache, genGetCellContent } from '../utils';
import { GridCell, Item } from '@glideapps/glide-data-grid';

const useGenGetCellContent = <T extends Indexable>({
  columns,
  getRow,
}: Pick<GlideGridProps<T>, 'columns'> & { getRow: RowGetter<T> }) => {
  const cache = useRef(new ContentCache());
  // useCallback can't be used for generating functions because it expects an inline function definition
  // https://kyleshevlin.com/debounce-and-throttle-callbacks-with-react-hooks
  // https://stackoverflow.com/questions/69830440/react-hook-usecallback-received-a-function-whose-dependencies-are-unknown-pass
  const getCellContentInner = useMemo(
    () => genGetCellContent(columns, getRow),
    [columns, getRow]
  );

  const getCellContent: (item: Item) => GridCell = useCallback<
    (item: Item) => GridCell
  >(
    ([row, col]: Item) => {
      const rowItem = getRow(row);
      const { rowUuid } = rowItem;
      if (!cache.current?.has(rowItem.rowUuid, col)) {
        console.log('cache miss');
        const cell = getCellContentInner([row, col]);
        cache?.current?.set(rowUuid, col, cell);
      }
      return cache.current?.get(rowUuid, col) as GridCell;
    },
    [getCellContentInner, getRow]
  );
  return { getCellContent };
};

export { useGenGetCellContent };
