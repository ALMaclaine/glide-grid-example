import { useCallback, useMemo } from 'react';
import { SortStateMachine, StateSet } from '../utils/sort/sort-state-machine';
import { StringKeys } from '../types/general';

const useSortStateMachine = <T>() => {
  const stateMachine = useMemo(() => new SortStateMachine<T>(), []);
  const sortMachineNextToken = useCallback(
    (value: StringKeys<T>, steps: number) => {
      return stateMachine.nextValue(value, steps);
    },
    [stateMachine]
  );

  const getSortState: (steps: number) => StateSet<T>[] = useCallback(
    (steps: number) => {
      return stateMachine.getHistory(steps);
    },
    [stateMachine]
  );

  return { sortMachineNextToken, getSortState };
};

export { useSortStateMachine };
