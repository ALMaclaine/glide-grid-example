import type { ColumnsProps } from '../types/props';
import type { Indexable, StringKeys } from '../types/general';
import type { WrappedGridColumn } from '../types/grid';
import { uuid } from './general';
import { SORT_TYPES, SortTypes } from './sort/object-sort';

class Columns<T extends Indexable> {
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

  getColumns() {
    const out = [];
    for (const colPos of this.translate) {
      const uuid = this.getTranslatedId(colPos);
      const val = this.columnMap.get(this.uuidOrder[colPos]);
      if (val) {
        out.push(val);
      }
    }
    return out;
  }

  getCell(colPos: number) {
    if (colPos > this.uuidOrder.length || colPos < 0) {
      throw new Error('Out of bounds access');
    }
    const id = this.getTranslatedId(colPos);
    const column = this.columnMap.get(id);
    if (column) {
      return column.cell;
    }
    throw new Error('Column does not exist');
  }

  private getTranslatedId(colPos: number) {
    const pos = this.translate[colPos];
    return this.uuidOrder[pos];
  }

  swap(col1: number, col2: number) {
    if (col1 > this.uuidOrder.length || col1 < 0) {
      throw new Error('col1 Out of bounds access');
    }

    if (col2 > this.uuidOrder.length || col2 < 0) {
      throw new Error('col2 Out of bounds access');
    }
    const max = Math.max(col1, col2);
    const min = Math.min(col1, col2);

    for (let i = max - 1; i >= min; i--) {
      [this.translate[i], this.translate[i + 1]] = [
        this.translate[i + 1],
        this.translate[i],
      ];
    }
  }
}

export { Columns };
