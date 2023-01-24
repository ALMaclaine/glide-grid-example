import { IdRow, Indexable } from './types';
import { addIdToRow } from './utils';
import { GridCell } from '@glideapps/glide-data-grid';

class BaseCache<T> extends Map<string, T> {
  get(elm: string): T {
    if (!super.has(elm)) {
      throw new Error('Cache should be set before accessing');
    }
    return super.get(elm) as T;
  }
}

class RowCache<T extends Indexable> {
  private rowIdArray: string[] = [];
  private cache: BaseCache<T> = new BaseCache<IdRow<T>>();
  // column -> row -> value
  constructor(data: T[] = []) {
    for (const row of data) {
      const idRow = addIdToRow<T>(row);
      const { rowUuid } = idRow;
      this.rowIdArray.push(rowUuid);
      this.cache.set(rowUuid, idRow);
    }
  }

  getRowId(n: number) {
    if (!this.hasIndex(n)) {
      throw new Error('Attempting to grab row id outside of range.');
    }
    return this.rowIdArray[n];
  }

  getRowByIndex(n: number) {
    const uuid = this.getRowId(n);
    return this.cache.get(uuid) as IdRow<T>;
  }

  getRowById(uuid: string) {
    return this.cache.get(uuid) as IdRow<T>;
  }

  hasIndex(n: number) {
    return n >= 0 || n < this.rowIdArray.length;
  }

  hasId(uuid: string) {
    return this.cache.has(uuid);
  }

  set(uuid: string, value: T) {
    this.cache.set(uuid, value);
  }
}

class CellCache {
  // column -> row -> value
  private cachedContent: Map<string, Map<number, GridCell>> = new Map();

  get(rowUuid: string, col: number): GridCell {
    const rowCache = this.cachedContent.get(rowUuid);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }

    return rowCache.get(col) as GridCell;
  }

  hasRow(rowUuid: string) {
    return this.cachedContent.has(rowUuid);
  }

  has(rowUuid: string, col: number) {
    return this.hasRow(rowUuid) && this.cachedContent.get(rowUuid)?.has(col);
  }

  set(rowUuid: string, col: number, value: GridCell) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<number, GridCell>;
    rowCache.set(col, value);
  }
}

export { RowCache, CellCache };
