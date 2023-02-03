import type { ColumnsManager } from '../managers/columns-manager/columns-manager';
import type { CellInstance, IdRow } from '../managers/grid-manager/types';

class CellCache<T extends object> {
  private cachedContent: Map<string, Map<string, CellInstance<T>>> = new Map();
  private readonly columnsManager: ColumnsManager<T>;

  constructor(columnsManager: ColumnsManager<T>) {
    this.columnsManager = columnsManager;
  }

  private genCell(item: IdRow<T>, colUuid: string): CellInstance<T> {
    const { dataId, displayDataId, ...rest } =
      this.columnsManager.getCell(colUuid);
    return {
      ...rest,
      dataId,
      displayDataId,
      data: item[dataId],
      displayData: item[displayDataId],
    } as CellInstance<T>;
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

  get(rowUuid: string, col: number): CellInstance<T> {
    const rowCache = this.cachedContent.get(rowUuid);
    const columnUuid = this.columnsManager.getTranslation(col);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }
    return rowCache.get(columnUuid) ;
  }

  clear() {
    this.cachedContent = new Map();
  }

  set(rowUuid: string, columnUuid: string, cell: CellInstance<T>) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map<string, CellInstance<T>>());
    }

    const rowCache = this.cachedContent.get(rowUuid) ;
    rowCache.set(columnUuid, cell);
  }
}

export { CellCache };
