import { IdRow, Indexable } from '../types';
import { RowCache } from '../Cache';
import { useRowCache } from './use-row-cache';

const useSetupData = <T extends Indexable>(data: IdRow<T>[]) => {
  const {
    cacheHasId,
    cacheHasIndex,
    cacheGetRowById,
    cacheGetRowId,
    cacheGetRowByIndex,
  } = useRowCache<T, RowCache<T>>(new RowCache<T>(data));

  return {
    hasId: cacheHasId,
    hasIndex: cacheHasIndex,
    getRowById: cacheGetRowById,
    getRowByIndex: cacheGetRowByIndex,
    getRowId: cacheGetRowId,
  };
};

export { useSetupData };
