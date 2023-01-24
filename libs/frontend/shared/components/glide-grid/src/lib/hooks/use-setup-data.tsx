import { useRowCache } from './use-row-cache';
import type { Indexable } from '../types/general';
import { RowCache } from '../utils/cache/RowCache';
import type { IdRow } from '../types/grid';

const useSetupData = <T extends Indexable>(data: IdRow<T>[]) => {
  const { cacheGetRowByIndex } = useRowCache<T, RowCache<T>>(
    new RowCache<T>(data)
  );

  return {
    getRowByIndex: cacheGetRowByIndex,
  };
};

export { useSetupData };
