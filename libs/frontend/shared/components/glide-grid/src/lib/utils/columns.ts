import type { StringKeys } from '../types/general';
import type { WrappedGridColumn } from '../types/grid';
import { uuid } from './general';
import { SORT_TYPES, SortTypes } from './sort/object-sort';

type ColumnsProps<T> = {
  columns: WrappedGridColumn<T>[];
  hiddenColumns?: StringKeys<T>[];
};

class ColumnsTranslation {
  private readonly _uuidOrder: string[] = [];
  private readonly _translate: number[] = [];

  addUuid(uuid: string) {
    this._uuidOrder.push(uuid);
    this._translate.push(this._translate.length);
  }

  getTranslation(pos: number) {
    if (pos > this._translate.length || pos < 0) {
      throw new Error('Out of bounds access');
    }
    return this._translate[pos];
  }

  get length() {
    return this._uuidOrder.length;
  }

  private shiftRight(pos1: number, pos2: number) {
    const translateTmp = this._translate[pos2];
    const uuidTmp = this._uuidOrder[pos2];
    for (let i = pos2; i >= pos1; i--) {
      this._translate[i] = this._translate[i - 1];
      this._uuidOrder[i] = this._uuidOrder[i - 1];
    }
    this._translate[pos1] = translateTmp;
    this._uuidOrder[pos1] = uuidTmp;
  }

  private shiftLeft(pos1: number, pos2: number) {
    const translateTmp = this._translate[pos1];
    const uuidTmp = this._uuidOrder[pos1];
    for (let i = pos1; i < pos2; i++) {
      this._translate[i] = this._translate[i + 1];
      this._uuidOrder[i] = this._uuidOrder[i + 1];
    }
    this._translate[pos2] = translateTmp;
    this._uuidOrder[pos2] = uuidTmp;
  }

  swap(col1: number, col2: number) {
    if (col1 > col2) {
      this.shiftRight(col2, col1);
    } else {
      this.shiftLeft(col1, col2);
    }
  }

  get uuidOrder() {
    return this._uuidOrder;
  }
}

class Columns<T> {
  private readonly columns: WrappedGridColumn<T>[];
  private readonly columnMap = new Map<string, WrappedGridColumn<T>>();
  private hiddenColumnsSet: Set<StringKeys<T>> = new Set();
  private readonly sortMap: Map<StringKeys<T>, SortTypes>;
  private readonly translator: ColumnsTranslation = new ColumnsTranslation();

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
    for (const column of this.columns) {
      const id = uuid();
      this.columnMap.set(id, column);
      this.translator.addUuid(id);
    }
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.fillSet(hiddenColumns);
  }

  getTranslation(pos: number) {
    return this.translator.getTranslation(pos);
  }

  private processColumns(columns: WrappedGridColumn<T>[]) {
    return new Map(
      columns.map(({ cell: { displayData, sortType } }) => [
        displayData,
        sortType,
      ])
    );
    const sortMap = new Map<StringKeys<T>, SortTypes>();
    for (const column of columns) {
      const { sortType, displayData } = column.cell;
      sortMap.set(displayData, sortType);
    }
    return sortMap;
  }

  get length() {
    return this.translator.length;
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
    for (const uuid of this.translator.uuidOrder) {
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
    const id = this.translator.uuidOrder[colPos];
    const column = this.columnMap.get(id);
    if (column) {
      return column.cell;
    }
    throw new Error('Column does not exist');
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
    this.translator.swap(col1, col2);
    this.dirty = true;
  }
}

export { Columns };
