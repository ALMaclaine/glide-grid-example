import { useCallback, useRef } from 'react';
import { SortStateMachine } from '../utils/sort/sort-state-machine';
import { Indexable, StringKeys } from '../types/general';

const useSortStateMachine = <T extends Indexable>() => {
  const stateMachine = useRef(new SortStateMachine<T>());
  const sortMachineNextToken = useCallback((value: StringKeys<T>) => {
    return stateMachine.current.nextValue(value);
  }, []);

  return { sortMachineNextToken };
};

export { useSortStateMachine };
