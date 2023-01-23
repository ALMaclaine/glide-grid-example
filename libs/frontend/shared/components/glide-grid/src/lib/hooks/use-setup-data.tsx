import { Indexable } from '../types';
import { useCallback, useMemo } from 'react';
import { addIdsToRows } from '../utils';

const useSetupData = <T extends Indexable>(data: T[]) => {
  const dataWithIds = useMemo(() => addIdsToRows(data), [data]);
  const getRow = useCallback(
    (row: number) => dataWithIds[row] ?? {},
    [dataWithIds]
  );
  return { getRow };
};
export { useSetupData };
