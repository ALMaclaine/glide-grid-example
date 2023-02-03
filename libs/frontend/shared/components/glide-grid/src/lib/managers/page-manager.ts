import { MiniCache } from '../utils/caches/mini-cache';
import { IdRow } from './grid-manager/types';

type PageManagerProps = {
  pageSize?: number;
};

class PageManager<T extends object> {
  private _pageSize?: number;
  private data: IdRow<T>[] = [];
  private windowedDataCache = new MiniCache<IdRow<T>[]>();
  private _page = 0;
  constructor({ pageSize }: PageManagerProps = {}) {
    this._pageSize = pageSize;
    this.windowedDataCache.cache([]);
  }

  setData(data: IdRow<T>[]) {
    this.data = data;
    this.getData();
  }

  clear() {
    this.setData([]);
    this.setPage(0);
    this.windowedDataCache.dirty();
  }

  get page() {
    return this._page;
  }

  get length(): number {
    return this.windowedDataCache.getCache().length;
  }

  get pageSize() {
    return this._pageSize ?? 0;
  }

  get pageCount() {
    if (this._pageSize) {
      return Math.ceil(this.data.length / this._pageSize);
    } else {
      return 1;
    }
  }

  getRow(row: number) {
    if (row < 0 || row >= this.length) {
      throw new Error(
        `Out of bounds access. Data Length: ${this.length}, Row Accessed: ${row}`
      );
    }
    return this.getData()[row];
  }

  setPage(page = 0) {
    if (page < 0) {
      return;
    }
    this._page = page;
    this.calculateWindow();
  }

  setPageSize(pageSize = 1) {
    if (pageSize > this.data.length) {
      return;
    }
    this._pageSize = pageSize;
    this.setPage(0);
  }

  private calculateWindow() {
    if (!this._pageSize) {
      return this.windowedDataCache.cache(this.data);
    }
    const windowedData: IdRow<T>[] = [];
    const start = this._page * this._pageSize;
    const end = Math.min(this.data.length, (this._page + 1) * this._pageSize);
    for (let i = start; i < end; i++) {
      if (this.data[i]) {
        windowedData.push(this.data[i]);
      }
    }
    return this.windowedDataCache.cache(windowedData);
  }

  getData() {
    return this.calculateWindow();
  }
}

export { PageManager };
