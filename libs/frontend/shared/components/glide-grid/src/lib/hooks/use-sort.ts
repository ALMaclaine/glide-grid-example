import { Indexable } from '../types/general';
import { IdRow } from '../types/grid';
import { useCallback, useRef, useState } from 'react';
import { Sorter } from '../utils/sorter';
import { useSortStateMachine } from './use-sort-state-machine';

const useSort = <T extends Indexable>(originalData: IdRow<T>[]) => {
  const sorter = useRef(new Sorter(originalData));
  const { sortMachineNextToken } = useSortStateMachine();
  const [sorted, setSorted] = useState(originalData);
  const onHeaderClickSort = useCallback(
    (headerVal: string) => {
      const { nextState } = sortMachineNextToken(headerVal);
      setSorted(sorter.current.stateSort(nextState, headerVal));
    },
    [sortMachineNextToken]
  );

  return { sorted, onHeaderClickSort };
};

export { useSort };
