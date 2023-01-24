import { useCallback, useState } from 'react';
import type { Indexable } from '../types/general';
import type { ColumnsProps, HeaderClickProps } from '../types/props';

type UseHeaderClickedProps<T extends Indexable> = ColumnsProps<T> &
  HeaderClickProps;

const useHeaderClicked = <T extends Indexable>({
  columns,
  onHeaderClicked,
}: UseHeaderClickedProps<T>) => {
  const _onHeaderClicked = useCallback(
    (col: number) => {
      const selectedHeader = columns[col].cell.displayData;
      onHeaderClicked(selectedHeader, col);
    },
    [columns, onHeaderClicked]
  );

  return { onHeaderClicked: _onHeaderClicked };
};

export type { UseHeaderClickedProps };
export { useHeaderClicked };
