import { useCallback, useState } from 'react';
import type { Indexable } from '../types/general';
import type { ColumnsProps, HeaderClickProps } from '../types/props';

type UseHeaderClickedProps<T extends Indexable> = ColumnsProps<T> &
  HeaderClickProps;

const useHeaderClicked = <T extends Indexable>({
  columns,
  onHeaderClicked,
}: UseHeaderClickedProps<T>) => {
  const [selectedHeader, setSelectedHeader] = useState('');
  const _onHeaderClicked = useCallback(
    (col: number) => {
      const selectedHeader = columns[col].cell.displayData;
      onHeaderClicked(selectedHeader, col);
      setSelectedHeader(selectedHeader);
    },
    [columns, onHeaderClicked]
  );

  return { onHeaderClicked: _onHeaderClicked, selectedHeader };
};

export type { UseHeaderClickedProps };
export { useHeaderClicked };
