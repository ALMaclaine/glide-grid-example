import type { Cell } from '../../types/grid';
import { ColumnsManager } from '../managers/columns-manager';
import { IdRow } from '../../types/grid';

class CellCache<T> {
  private cachedContent: Map<string, Map<string, Cell<T>>> = new Map();
  private readonly columnsManager: ColumnsManager<T>;

  constructor(columnsManager: ColumnsManager<T>) {
    this.columnsManager = columnsManager;
  }

  private genCell(item: IdRow<T>, colUuid: string): Cell<T> {
    const { data, displayData, ...rest } = this.columnsManager.getCell(colUuid);
    return {
      ...rest,
      data: item[data],
      displayData: item[displayData],
    } as Cell<T>;
  }

  addData(data: IdRow<T>[]) {
    for (let row = 0; row < data.length; row++) {
      const item = data[row];
      const { rowUuid } = item;
      for (const columnUuid of this.columnsManager.columnsUuids) {
        const cell = this.genCell(item, columnUuid);
        this.set(rowUuid, columnUuid, cell);
      }
    }
  }

  get(rowUuid: string, col: number): Cell<T> {
    const rowCache = this.cachedContent.get(rowUuid);
    const columnUuid = this.columnsManager.getTranslation(col);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }
    return rowCache.get(columnUuid) as Cell<T>;
  }

  clear() {
    this.cachedContent = new Map();
  }

  set(rowUuid: string, columnUuid: string, cell: Cell<T>) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map<string, Cell<T>>());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<string, Cell<T>>;
    rowCache.set(columnUuid, cell);
  }
}

export { CellCache };
