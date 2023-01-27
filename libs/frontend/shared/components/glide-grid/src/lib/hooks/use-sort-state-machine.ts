import { useCallback, useMemo, useRef } from 'react';
import { SortStateMachine } from '../utils/sort/sort-state-machine';
import type { StateSetHistory } from '../utils/sort/sort-state-machine';
import { Indexable, StringKeys } from '../types/general';

const useSortStateMachine = <T extends Indexable>() => {
  const stateMachine = useMemo(() => new SortStateMachine<T>(), []);
  const sortMachineNextToken = useCallback(
    (value: StringKeys<T>) => {
      return stateMachine.nextValue(value);
    },
    [stateMachine]
  );

  const getSortState: () => StateSetHistory<T> = useCallback(() => {
    const currentStateSet = stateMachine.state;
    const previousStateSet = stateMachine.previousState;
    return { currentStateSet, previousStateSet };
  }, [stateMachine.previousState, stateMachine.state]);

  return { sortMachineNextToken, getSortState };
};

export { useSortStateMachine };
