import { PageManager } from './page-manager';
import type { IdRow } from './grid-manager/types';
import { CellCache } from '../caches/cell-cache';
import type { ColumnsManager } from './columns-manager/columns-manager';
import type { CellInstance } from './grid-manager/types';

type DataManagerProps<T extends object> = {
  pageSize?: number;
  columnsManager: ColumnsManager<T>;
};

class DataManager<T extends object> {
  private readonly pageManager: PageManager<IdRow<T>>;
  private readonly cellCache: CellCache<T>;

  constructor({ pageSize, columnsManager }: DataManagerProps<T>) {
    this.pageManager = new PageManager<IdRow<T>>({ pageSize });
    this.cellCache = new CellCache<T>(columnsManager);
  }

  clear() {
    this.pageManager.clear();
    this.cellCache.clear();
  }

  // cell cache only
  getCell(rowUuid: string, col: number): CellInstance<T> {
    return this.cellCache.get(rowUuid, col);
  }

  addData(data: IdRow<T>[]): void {
    this.cellCache.addData(data);
  }

  //
  // page manager only
  //
  getRow(row: number) {
    return this.pageManager.getRow(row);
  }

  setData(data: IdRow<T>[]) {
    this.pageManager.setData(data);
  }

  get length() {
    return this.pageManager.length;
  }

  setPage(page = 0) {
    this.pageManager.setPage(page);
  }

  get page() {
    return this.pageManager.page;
  }

  get pageSize() {
    return this.pageManager.pageSize;
  }

  get pageCount() {
    return this.pageManager.pageCount;
  }

  setPageSize(pageSize: number | undefined) {
    this.pageManager.setPageSize(pageSize);
  }
}

export { DataManager };
export type { DataManagerProps };
