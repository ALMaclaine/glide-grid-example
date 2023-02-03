import { PageManager } from './page-manager';
import type { IdRow } from './grid-manager/types';

type DataManagerProps<T extends object> = {
  pageSize?: number;
};

class DataManager<T extends object> {
  private readonly pageManager: PageManager<IdRow<T>>;

  constructor({ pageSize }: DataManagerProps<T>) {
    this.pageManager = new PageManager<IdRow<T>>({ pageSize });
  }

  clear() {
    this.pageManager.clear();
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
