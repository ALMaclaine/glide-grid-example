import type { StringKeys } from '../types/general';
import type { WrappedGridColumn } from '../types/grid';
import { uuid } from './general';
import { SORT_TYPES, SortTypes } from './sort/object-sort';

class Columns<T> {
  private readonly columns: WrappedGridColumn<T>[];
  private readonly columnMap = new Map<string, WrappedGridColumn<T>>();
  private readonly uuidOrder: string[] = [];
  private readonly translate: number[] = [];
  private readonly sortMap: Map<StringKeys<T>, SortTypes>;

  constructor(columns: WrappedGridColumn<T>[]) {
    this.columns = columns;
    this.addColumnsToMap();
    this.sortMap = this.processColumns(columns);
  }

  private addColumnsToMap() {
    let i = 0;
    for (const column of this.columns) {
      const id = uuid();
      this.uuidOrder.push(id);
      this.columnMap.set(id, column);
      this.translate.push(i++);
    }
  }

  getTranslation(pos: number) {
    if (pos > this.translate.length || pos < 0) {
      throw new Error('Out of bounds access');
    }
    return this.translate[pos];
  }

  private processColumns(columns: WrappedGridColumn<T>[]) {
    const sortMap = new Map<StringKeys<T>, SortTypes>();
    for (const column of columns) {
      const { sortType, displayData } = column.cell;
      sortMap.set(displayData, sortType);
    }
    return sortMap;
  }

  get length() {
    return this.uuidOrder.length;
  }

  getDisplayData(colPos: number) {
    return this.getCell(colPos).displayData;
  }

  getType(key: StringKeys<T>) {
    return this.sortMap.get(key) || SORT_TYPES.natural;
  }

  private dirty = true;
  private columnsCache: WrappedGridColumn<T>[] = [];
  getColumns() {
    if (!this.dirty) {
      return this.columnsCache;
    }

    const out = [];
    for (const colPos of this.translate) {
      const uuid = this.uuidOrder[colPos];
      const val = this.columnMap.get(uuid);
      if (val) {
        out.push(val);
      }
    }
    this.dirty = false;
    this.columnsCache = out;
    return out;
  }

  getCell(colPos: number) {
    if (colPos > this.uuidOrder.length || colPos < 0) {
      throw new Error('Out of bounds access');
    }
    const pos = this.translate[colPos];
    const id = this.uuidOrder[pos];
    const column = this.columnMap.get(id);
    if (column) {
      return column.cell;
    }
    throw new Error('Column does not exist');
  }

  swap(col1: number, col2: number) {
    if (col1 > this.uuidOrder.length || col1 < 0) {
      throw new Error('col1 Out of bounds access');
    }

    if (col2 > this.uuidOrder.length || col2 < 0) {
      throw new Error('col2 Out of bounds access');
    }
    if (col1 > col2) {
      const max = col1;
      const min = col2;

      for (let i = max - 1; i >= min; i--) {
        [this.translate[i], this.translate[i + 1]] = [
          this.translate[i + 1],
          this.translate[i],
        ];
      }
    } else {
      const max = col2;
      const min = col1;

      for (let i = min; i < max; i++) {
        [this.translate[i], this.translate[i + 1]] = [
          this.translate[i + 1],
          this.translate[i],
        ];
      }
    }
    this.dirty = true;
  }
}

export { Columns };
