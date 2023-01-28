import { IdRow } from './types/grid';
import { RowCache } from './utils/caches/row-cache';
import { addIdsToRows } from './utils/general';
import { SortStateMachine } from './utils/sort/sort-state-machine';

class RowsManager<T> {
  private readonly _rows: IdRow<T>[];
  private readonly cache: RowCache<T>;
  readonly stateMachine: SortStateMachine<T>;

  get rows() {
    return this._rows;
  }
  constructor(data: T[]) {
    this._rows = addIdsToRows(data);
    this.cache = new RowCache<T>(this.rows);
    this.stateMachine = new SortStateMachine<T>();
  }

  getRowById(id: string) {
    return this.cache.getRowById(id);
  }

  getRowByIndex(index: number) {
    return this.cache.getRowByIndex(index);
  }
}
export { RowsManager };
