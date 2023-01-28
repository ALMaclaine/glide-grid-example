import { StringKeys } from '../types/general';
import { useCallback, useMemo, useState } from 'react';
import { TableSorter, TableSorterProps } from '../utils/sort/table-sorter';
import { useSortStateMachine } from './use-sort-state-machine';
import { STATE_HISTORY_STEPS } from '../constants';

const useSort = <T>({ originalData, columns }: TableSorterProps<T>) => {
  const sorter = useMemo(
    () => new TableSorter({ originalData, columns }),
    [columns, originalData]
  );

  const { sortMachineNextToken, getSortState } = useSortStateMachine<T>();
  const [sorted, setSorted] = useState(originalData);
  const onHeaderClickSort = useCallback(
    (headerVal: StringKeys<T>) => {
      const stateHistory = sortMachineNextToken(headerVal, STATE_HISTORY_STEPS);

      const nextSorted = sorter.stateSort(stateHistory);
      setSorted(nextSorted);
    },
    [sortMachineNextToken, sorter]
  );

  const refreshSort = useCallback(() => setSorted((sorted) => [...sorted]), []);

  return { sorted, onHeaderClickSort, getSortState, refreshSort };
};

export { useSort };
