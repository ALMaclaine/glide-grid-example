import { Indexable, StringKeys } from '../types/general';
import { useCallback, useRef, useState } from 'react';
import { TableSorter, TableSorterProps } from '../utils/sort/table-sorter';
import { useSortStateMachine } from './use-sort-state-machine';

const useSort = <T extends Indexable>({
  originalData,
  columns,
}: TableSorterProps<T>) => {
  const sorter = useRef(new TableSorter({ originalData, columns }));
  const { sortMachineNextToken } = useSortStateMachine<T>();
  const [sorted, setSorted] = useState(originalData);
  const onHeaderClickSort = useCallback(
    (headerVal: StringKeys<T>) => {
      const { currentStateSet, previousStateSet } =
        sortMachineNextToken(headerVal);

      const nextSorted = sorter.current.stateSort(
        currentStateSet,
        previousStateSet
      );
      setSorted(nextSorted);
    },
    [sortMachineNextToken]
  );

  return { sorted, onHeaderClickSort };
};

export { useSort };
