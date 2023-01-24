import { useCallback, useRef } from 'react';
import { SortStateMachine } from '../utils/sort-state-machine';

const useSortStateMachine = () => {
  const stateMachine = useRef(new SortStateMachine());
  const sortMachineNextToken = useCallback((value: string) => {
    const nextState = stateMachine.current.nextValue(value);
    return { nextState };
  }, []);

  return { sortMachineNextToken };
};

export { useSortStateMachine };
