import type { StringKeys } from '../types/general';
import type { Cell, IdColumn, WrappedGridColumn } from '../types/grid';
import { IdRow } from '../types/grid';
import { SortMap } from './sort/sort-map';
import { MiniCache } from './mini-cache';

type ColumnsProps<T> = {
  columns: WrappedGridColumn<T>[];
  hiddenColumns?: StringKeys<T>[];
};

type Translation<T> = {
  uuid: string;
  id: StringKeys<T>;
  originalColumn: number;
};

class SortTranslator<T> {
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

  private updateIdMap(translation: Translation<T>, pos: number) {
    const { id } = translation;
    this.idMap.set(id, pos);
  }

  private shiftRight(pos1: number, pos2: number): void {
    const translateTmp = this._translate[pos2];
    for (let i = pos2; i > pos1; i--) {
      const translation = this._translate[i - 1];
      this.updateIdMap(translation, i);
      this._translate[i] = translation;
    }
    this.updateIdMap(translateTmp, pos1);
    this._translate[pos1] = translateTmp;
  }

  private shiftLeft(pos1: number, pos2: number): void {
    const translateTmp = this._translate[pos1];
    for (let i = pos1; i < pos2; i++) {
      const translation = this._translate[i + 1];
      this.updateIdMap(translation, i);
      this._translate[i] = translation;
    }
    this.updateIdMap(translateTmp, pos2);

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

class HiddenColumnTranslator<T> {
  private readonly hiddenTranslatorMap = new Map<number, number>();
  private readonly hiddenColumnsSet = new Set<StringKeys<T>>();
  private readonly columnMap = new Map<string, WrappedGridColumn<T>>();
  private columnsCache = new MiniCache<WrappedGridColumn<T>[]>();

  getColumns(sortTranslations: Translation<T>[]) {
    if (this.columnsCache.isClean) {
      return this.columnsCache.getCache();
    }
    this.clear();

    const out = [];
    let i = 0;
    let j = 0;
    for (const { uuid } of sortTranslations) {
      const val = this.getColumn(uuid);
      if (val && !this.isHidden(val.id)) {
        this.hiddenTranslatorMap.set(i++, j);
        out.push(val);
      }
      j++;
    }
    return this.columnsCache.cache(out);
  }

  clear() {
    this.hiddenTranslatorMap.clear();
  }

  dirty() {
    this.columnsCache.dirty();
  }

  setHiddenColumns<T>(hiddenColumns: StringKeys<T>[]) {
    this.hiddenColumnsSet.clear();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    hiddenColumns.forEach((key) => this.hiddenColumnsSet.add(key));
  }

  isHidden(key: StringKeys<T>) {
    return this.hiddenColumnsSet.has(key);
  }

  setColumn(columnUuid: string, column: WrappedGridColumn<T>) {
    this.columnMap.set(columnUuid, column);
  }

  getColumn(columnUuid: string) {
    const column = this.columnMap.get(columnUuid);
    if (column) {
      return column;
    }
    throw new Error('Column does not exist');
  }

  getHiddenTranslation(colPos: number) {
    const translatedPosition = this.hiddenTranslatorMap.get(colPos);
    if (translatedPosition === undefined) {
      throw new Error('Should not occur');
    }
    return translatedPosition;
  }
}

class Columns<T> {
  private readonly sortTranslator = new SortTranslator<T>();
  private readonly hiddenTranslator = new HiddenColumnTranslator<T>();

  constructor({ columns, hiddenColumns = [] }: ColumnsProps<T>) {
    for (const column of columns) {
      const { columnUuid, id } = column;
      this.hiddenTranslator.setColumn(columnUuid, column);
      this.sortTranslator.addUuid(columnUuid, id);
    }
    this.hiddenTranslator.setHiddenColumns(hiddenColumns);
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.hiddenTranslator.setHiddenColumns(hiddenColumns);
  }

  getTranslation(colPos: number): string {
    const translatedPosition = this.getTranslatedPosition(colPos);
    return this.sortTranslator.getTranslation(translatedPosition).uuid;
  }

  get length() {
    return this.getColumns().length;
  }

  private getTranslatedPosition(colPos: number) {
    return this.hiddenTranslator.getHiddenTranslation(colPos);
  }

  getHeaderKey(colPos: number) {
    const { id } = this.getColumns()[colPos];
    const { uuid } = this.sortTranslator.getTranslationById(id);
    return this.getCell(uuid).displayData;
  }

  getColumns() {
    const translations = this.sortTranslator.translate;
    return this.hiddenTranslator.getColumns(translations);
  }

  genCell(item: IdRow<T>, colUuid: string): Cell<T> {
    const { data, displayData, ...rest } = this.getCell(colUuid);
    return {
      ...rest,
      data: item[data],
      displayData: item[displayData],
    } as Cell<T>;
  }

  private getCell(colUuid: string) {
    const column = this.hiddenTranslator.getColumn(colUuid);
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
    const translatedPosition1 = this.getTranslatedPosition(col1);
    const translatedPosition2 = this.getTranslatedPosition(col2);
    this.sortTranslator.swap(translatedPosition1, translatedPosition2);
    this.hiddenTranslator.dirty();
  }
}

export { Columns };
