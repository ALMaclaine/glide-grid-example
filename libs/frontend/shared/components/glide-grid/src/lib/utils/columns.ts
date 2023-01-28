import type { StringKeys } from '../types/general';
import type { WrappedGridColumn } from '../types/grid';
import { uuid } from './general';
import { SORT_TYPES, SortTypes } from './sort/object-sort';

type ColumnsProps<T> = {
  columns: WrappedGridColumn<T>[];
  hiddenColumns?: StringKeys<T>[];
};

class ColumnsTranslation {
  private readonly uuidOrder: string[] = [];
  private readonly translate: number[] = [];

  addUuid(uuid: string) {
    this.uuidOrder.push(uuid);
    this.translate.push(this.translate.length + 1);
  }
}

class Columns<T> {
  private readonly columns: WrappedGridColumn<T>[];
  private readonly columnMap = new Map<string, WrappedGridColumn<T>>();
  private readonly uuidOrder: string[] = [];
  private readonly translate: number[] = [];
  private hiddenColumnsSet: Set<StringKeys<T>> = new Set();
  private readonly sortMap: Map<StringKeys<T>, SortTypes>;
  private readonly columnTranslation: ColumnsTranslation =
    new ColumnsTranslation();

  constructor({ columns, hiddenColumns = [] }: ColumnsProps<T>) {
    this.columns = columns;
    this.addColumnsToMap();
    this.sortMap = this.processColumns(columns);
    this.fillSet(hiddenColumns);
  }

  private fillSet(hiddenColumns: StringKeys<T>[]) {
    this.hiddenColumnsSet = new Set(hiddenColumns);
  }

  private addColumnsToMap() {
    let i = 0;
    for (const column of this.columns) {
      const id = uuid();
      this.columnMap.set(id, column);
      this.uuidOrder.push(id);
      this.translate.push(i++);
    }
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.fillSet(hiddenColumns);
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
    for (const uuid of this.uuidOrder) {
      const val = this.columnMap.get(uuid);
      if (val && !this.hiddenColumnsSet.has(val.id)) {
        out.push(val);
      }
    }
    this.dirty = false;
    this.columnsCache = out;
    return out;
  }

  getCell(colPos: number) {
    this.validateBounds(colPos);
    const id = this.uuidOrder[colPos];
    const column = this.columnMap.get(id);
    if (column) {
      return column.cell;
    }
    throw new Error('Column does not exist');
  }

  private shiftRight(pos1: number, pos2: number) {
    const translateTmp = this.translate[pos2];
    const uuidTmp = this.uuidOrder[pos2];
    for (let i = pos2; i >= pos1; i--) {
      this.translate[i] = this.translate[i - 1];
      this.uuidOrder[i] = this.uuidOrder[i - 1];
    }
    this.translate[pos1] = translateTmp;
    this.uuidOrder[pos1] = uuidTmp;
  }

  private shiftLeft(pos1: number, pos2: number) {
    const translateTmp = this.translate[pos1];
    const uuidTmp = this.uuidOrder[pos1];
    for (let i = pos1; i < pos2; i++) {
      this.translate[i] = this.translate[i + 1];
      this.uuidOrder[i] = this.uuidOrder[i + 1];
    }
    this.translate[pos2] = translateTmp;
    this.uuidOrder[pos2] = uuidTmp;
  }

  private validateBounds(col: number) {
    const columns = this.getColumns();
    if (col > columns.length || col < 0) {
      throw new Error('Out of bounds access');
    }
  }

  swap(col1: number, col2: number) {
    this.validateBounds(col1);
    this.validateBounds(col2);
    const columns = this.getColumns();
    console.log(columns);

    if (col1 > col2) {
      this.shiftRight(col2, col1);
    } else {
      this.shiftLeft(col1, col2);
    }
    this.dirty = true;
  }
}

export { Columns };
