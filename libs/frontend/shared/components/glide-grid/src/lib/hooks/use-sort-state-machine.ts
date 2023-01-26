import { useCallback, useRef } from 'react';
import { SortStateMachine } from '../utils/sort/sort-state-machine';
import type { StateSetHistory } from '../utils/sort/sort-state-machine';
import { Indexable, StringKeys } from '../types/general';

const useSortStateMachine = <T extends Indexable>() => {
  const stateMachine = useRef(new SortStateMachine<T>());
  const sortMachineNextToken = useCallback((value: StringKeys<T>) => {
    return stateMachine.current.nextValue(value);
  }, []);

  const getSortState: () => StateSetHistory<T> = useCallback(() => {
    const currentStateSet = stateMachine.current.state;
    const previousStateSet = stateMachine.current.previousState;
    return { currentStateSet, previousStateSet };
  }, []);

  return { sortMachineNextToken, getSortState };
};

export { useSortStateMachine };
