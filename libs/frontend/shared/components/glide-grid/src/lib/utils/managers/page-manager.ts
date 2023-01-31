import { IdRow } from '../../types/grid';

type PageManagerProps = {
  pageSize?: number;
};

class PageManager<T> {
  private _pageSize?: number;
  private data: IdRow<T>[] = [];
  private windowedData: IdRow<T>[] = [];
  private page = 0;
  constructor({ pageSize }: PageManagerProps = {}) {
    this._pageSize = pageSize;
  }

  setData(data: IdRow<T>[]) {
    this.data = data;
    this.getData();
  }

  clear() {
    this.setData([]);
    this.setPage(0);
  }

  get length(): number {
    if (!this._pageSize) {
      return this.data.length;
    }
    return this.windowedData.length;
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

  setPageSize(pageSize: number | undefined) {
    this._pageSize = pageSize;
  }

  getData() {
    if (!this._pageSize) {
      return this.data;
    }
    this.windowedData = this.data.slice(
      this.page * this._pageSize,
      (this.page + 1) * this._pageSize
    );
    return this.windowedData;
  }
}

export { PageManager };
