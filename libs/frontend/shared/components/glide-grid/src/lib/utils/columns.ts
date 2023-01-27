import type { ColumnsProps } from '../types/props';
import type { Indexable, StringKeys } from '../types/general';
import type { WrappedGridColumn } from '../types/grid';
import { uuid } from './general';
import { SORT_TYPES, SortTypes } from './sort/object-sort';

class Columns<T extends Indexable> {
  private readonly columns: WrappedGridColumn<T>[];
  private readonly columnMap = new Map<string, WrappedGridColumn<T>>();
  private readonly uuidOrder: string[] = [];
  private readonly sortMap: Map<StringKeys<T>, SortTypes>;

  constructor(columns: WrappedGridColumn<T>[]) {
    this.columns = columns;
    this.addColumnsToMap();
    this.sortMap = this.processColumns(columns);
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
    for (const uuid of this.uuidOrder) {
      const val = this.columnMap.get(uuid);
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
    const id = this.uuidOrder[colPos];
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
    [this.uuidOrder[col1], this.uuidOrder[col2]] = [
      this.uuidOrder[col2],
      this.uuidOrder[col1],
    ];
  }

  private addColumnsToMap() {
    for (const column of this.columns) {
      const id = uuid();
      this.uuidOrder.push(id);
      this.columnMap.set(id, column);
    }
  }
}

export { Columns };
