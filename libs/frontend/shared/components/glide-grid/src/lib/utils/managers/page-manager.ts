import { IdRow } from '../../types/grid';
import { MiniCache } from '../caches/mini-cache';

type PageManagerProps = {
  pageSize?: number;
};

class PageManager<T> {
  private _pageSize?: number;
  private data: IdRow<T>[] = [];
  private windowedDataCache = new MiniCache<IdRow<T>[]>();
  private page = 0;
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

  get length(): number {
    return this.windowedDataCache.getCache().length;
  }

  get pageSize() {
    return this._pageSize ?? this.data.length;
  }

  get pageCount() {
    if (this._pageSize) {
      return Math.ceil(this.data.length / this._pageSize);
    } else {
      return this.data.length;
    }
  }

  setPage(page = 0) {
    if (page < 0) {
      return;
    }
    this.page = page;
  }

  setPageSize(pageSize?: number) {
    this._pageSize = pageSize;
  }

  private calculateWindow() {
    if (!this._pageSize) {
      return this.windowedDataCache.cache(this.data);
    }
    const windowedData = this.data.slice(
      this.page * this._pageSize,
      (this.page + 1) * this._pageSize
    );
    return this.windowedDataCache.cache(windowedData);
  }

  getData() {
    return this.calculateWindow();
  }
}

export { PageManager };
