import type { Indexable } from '../types';
import { useMemo } from 'react';
import { addIdsToRows } from '../utils';

const useAddIds = <T extends Indexable>(data: T[]) => {
  const dataWithIds = useMemo(() => addIdsToRows(data), [data]);
  return { dataWithIds };
};

export { useAddIds };
