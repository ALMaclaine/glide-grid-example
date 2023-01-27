import { Indexable, StringKeys } from '../types/general';
import { useCallback, useMemo, useState } from 'react';
import { TableSorter, TableSorterProps } from '../utils/sort/table-sorter';
import { useSortStateMachine } from './use-sort-state-machine';

const useSort = <T extends Indexable>({
  originalData,
  columns,
}: TableSorterProps<T>) => {
  const sorter = useMemo(
    () => new TableSorter({ originalData, columns }),
    [columns, originalData]
  );

  const { sortMachineNextToken, getSortState } = useSortStateMachine<T>();
  const [sorted, setSorted] = useState(originalData);
  const onHeaderClickSort = useCallback(
    (headerVal: StringKeys<T>) => {
      const { currentStateSet, previousStateSet } =
        sortMachineNextToken(headerVal);

      const nextSorted = sorter.stateSort(currentStateSet, previousStateSet);
      setSorted(nextSorted);
    },
    [sortMachineNextToken]
  );

  const refreshSort = useCallback(() => setSorted((sorted) => [...sorted]), []);

  return { sorted, onHeaderClickSort, getSortState, refreshSort };
};

export { useSort };
