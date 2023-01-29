import type { StringKeys } from '../types/general';
import type { IdColumn, WrappedGridColumn } from '../types/grid';
import { addIdsToColumns, uuid } from './general';
import { SORT_TYPES, SortTypes } from './sort/object-sort';
import { IdRow } from '../types/grid';
import { GridCell } from '@glideapps/glide-data-grid';
import { SortMap } from './sort/sort-map';

type ColumnsProps<T> = {
  columns: WrappedGridColumn<T>[];
  hiddenColumns?: StringKeys<T>[];
};

type Translation<T> = {
  uuid: string;
  id: StringKeys<T>;
  originalColumn: number;
};

class ColumnsTranslation<T> {
  private readonly _translate: Translation<T>[] = [];
  private readonly idMap = new Map<string, number>();

  addUuid(uuid: string, id: StringKeys<T>): void {
    const length = this._translate.length;
    this.idMap.set(id, length);
    this._translate.push({ originalColumn: length, id, uuid });
  }

  getTranslation(pos: number): Translation<T> {
    if (pos > this._translate.length || pos < 0) {
      throw new Error('Out of bounds access');
    }
    return this._translate[pos];
  }

  getTranslationById(id: StringKeys<T>): Translation<T> {
    const pos = this.idMap.get(id);
    if (pos === undefined) {
      throw new Error('Invalid id');
    }
    return this.getTranslation(pos);
  }

  get length(): number {
    return this._translate.length;
  }

  private shiftRight(pos1: number, pos2: number): void {
    const translateTmp = this._translate[pos2];
    for (let i = pos2; i >= pos1; i--) {
      const translation = this._translate[i - 1];
      const { id } = translation;
      this.idMap.set(id, i);
      this._translate[i] = translation;
    }
    const { id } = translateTmp;
    this.idMap.set(id, pos1);
    this._translate[pos1] = translateTmp;
  }

  private shiftLeft(pos1: number, pos2: number): void {
    const translateTmp = this._translate[pos1];
    for (let i = pos1; i < pos2; i++) {
      const translation = this._translate[i + 1];
      const { id } = translation;
      this.idMap.set(id, i);
      this._translate[i] = translation;
    }
    const { id } = translateTmp;
    this.idMap.set(id, pos2);
    this._translate[pos2] = translateTmp;
  }

  swap(col1: number, col2: number) {
    if (col1 > col2) {
      this.shiftRight(col2, col1);
    } else {
      this.shiftLeft(col1, col2);
    }
  }

  get translate() {
    return [...this._translate];
  }
}

class Columns<T> {
  private readonly columns: IdColumn<WrappedGridColumn<T>>[];
  private readonly columnMap = new Map<string, WrappedGridColumn<T>>();
  private hiddenColumnsSet: Set<StringKeys<T>> = new Set();
  private readonly _sortMap: SortMap<T>;
  private readonly translator: ColumnsTranslation<T> =
    new ColumnsTranslation<T>();

  constructor({ columns, hiddenColumns = [] }: ColumnsProps<T>) {
    this.columns = addIdsToColumns(columns);
    for (const column of this.columns) {
      const { columnUuid } = column;
      this.columnMap.set(columnUuid, column);
      this.translator.addUuid(columnUuid, column.id);
    }
    this._sortMap = new SortMap<T>({ columns });
    this.fillSet(hiddenColumns);
  }

  originalColumns() {
    return [...this.columns];
  }

  private fillSet(hiddenColumns: StringKeys<T>[]) {
    this.hiddenColumnsSet = new Set(hiddenColumns);
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.fillSet(hiddenColumns);
  }

  getTranslation(pos: number): string {
    return this.translator.getTranslation(pos).uuid;
  }

  get length() {
    return this.getColumns().length;
  }

  getDisplayData(colPos: number) {
    return this.getCell(colPos).displayData;
  }

  get sortMap() {
    return this._sortMap;
  }

  private dirty = true;
  private columnsCache: WrappedGridColumn<T>[] = [];
  getColumns() {
    if (!this.dirty) {
      return this.columnsCache;
    }

    const out = [];
    for (const { uuid } of this.translator.translate) {
      const val = this.columnMap.get(uuid);
      if (val && !this.hiddenColumnsSet.has(val.id)) {
        out.push(val);
      }
    }
    this.dirty = false;
    this.columnsCache = out;
    console.log(out);
    return out;
  }

  genCell(item: IdRow<T>, col: number): GridCell {
    if (col < this.length) {
      const { data, displayData, ...rest } = this.getCell(col);
      return {
        ...rest,
        data: item[data],
        displayData: item[displayData],
      } as GridCell;
    } else {
      throw new Error("Attempting to access a column that doesn't exist");
    }
  }

  private getCell(colPos: number) {
    this.validateBounds(colPos);
    const { id } = this.getColumns()[colPos];
    const { uuid } = this.translator.getTranslationById(id);
    const column = this.columnMap.get(uuid);
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
    const { id: id1 } = this.getColumns()[col1];
    const { id: id2 } = this.getColumns()[col2];
    const translatedCol1 = this.translator.getTranslationById(id1);
    const translatedCol2 = this.translator.getTranslationById(id2);
    console.log(col1, translatedCol1);
    console.log(col2, translatedCol2);
    this.translator.swap(col1, col2);
    this.dirty = true;
  }
}

export { Columns };
