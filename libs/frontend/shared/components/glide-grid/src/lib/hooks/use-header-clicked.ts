import { useCallback } from 'react';
import type { ColumnsProps, HeaderClickProps } from '../types/props';

type UseHeaderClickedProps<T> = ColumnsProps<T> & HeaderClickProps;

const useHeaderClicked = <T>({
  columns,
  onHeaderClicked,
}: UseHeaderClickedProps<T>) => {
  const _onHeaderClicked = useCallback(
    (col: number) => {
      const selectedHeader = columns.getHeaderKey(col);
      onHeaderClicked(selectedHeader, col);
    },
    [columns, onHeaderClicked]
  );

  return { onHeaderClicked: _onHeaderClicked };
};

export type { UseHeaderClickedProps };
export { useHeaderClicked };
