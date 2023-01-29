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
    this.addColumnsToMap();
    this._sortMap = new SortMap<T>({ columns });
    this.fillSet(hiddenColumns);
  }

  private fillSet(hiddenColumns: StringKeys<T>[]) {
    this.hiddenColumnsSet = new Set(hiddenColumns);
  }

  private addColumnsToMap() {
    for (const column of this.columns) {
      const _uuid = uuid();
      this.columnMap.set(_uuid, column);
      this.translator.addUuid(_uuid, column.id);
    }
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.fillSet(hiddenColumns);
  }

  getTranslation(pos: number): number {
    return this.translator.getTranslation(pos).originalColumn;
  }

  get length() {
    return this.originalColumns().length;
  }

  getDisplayData(colPos: number) {
    return this.getCell(colPos).displayData;
  }

  get sortMap() {
    return this._sortMap;
  }

  originalColumns() {
    return [...this.columns];
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
    const { id } = this.columns[colPos];
    const { uuid } = this.translator.getTranslationById(id);
    const column = this.columnMap.get(uuid);
    if (column) {
      return column.cell;
    }
    throw new Error('Column does not exist');
  }

  private validateBounds(col: number) {
    const columns = this.columns;
    if (col > columns.length || col < 0) {
      throw new Error('Out of bounds access');
    }
  }

  swap(col1: number, col2: number) {
    this.validateBounds(col1);
    this.validateBounds(col2);
    this.translator.swap(col1, col2);
  }
}

export { Columns };
