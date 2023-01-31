import type { StringKeys } from './types/general';
import type { WrappedGridColumn } from './types/grid';
import { MiniCache } from './utils/caches/mini-cache';

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
  private readonly columnMap = new Map<string, WrappedGridColumn<T>>();
  private readonly columnsCache = new MiniCache<WrappedGridColumn<T>[]>();
  private readonly columnIsShowing = new Map<StringKeys<T>, boolean>();

  constructor({ columns, hiddenColumns = [] }: ColumnsProps<T>) {
    for (const { id } of columns) {
      this.columnIsShowing.set(id, true);
    }
    hiddenColumns.map((column) => this.columnIsShowing.set(column, false));
  }

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
      if (val && this.isShowing(val.id)) {
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

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    Array.from(this.columnIsShowing.keys()).forEach((column) => {
      this.toggleColumnVisibility(column, true);
    });

    hiddenColumns.forEach((key) => this.toggleColumnVisibility(key, false));
  }

  toggleColumnVisibility(hiddenColumn: StringKeys<T>, visibility?: boolean) {
    if (this.columnIsShowing.has(hiddenColumn)) {
      this.columnIsShowing.set(
        hiddenColumn,
        visibility ?? !this.columnIsShowing.get(hiddenColumn) ?? true
      );
    } else {
      throw new Error('Invalid column provided: ' + hiddenColumn);
    }
    this.dirty();
  }

  isShowing(key: StringKeys<T>) {
    return this.columnIsShowing.get(key);
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

class ColumnsManager<T> {
  private readonly sortTranslator = new SortTranslator<T>();
  private readonly hiddenTranslator;
  private readonly _columnTitleIdMap: Record<string, StringKeys<T>> = {};
  private readonly _columnsUuids: string[] = [];

  constructor({ columns, hiddenColumns = [] }: ColumnsProps<T>) {
    this.hiddenTranslator = new HiddenColumnTranslator({
      columns,
      hiddenColumns,
    });

    for (const column of columns) {
      const { columnUuid, id, title } = column;
      this._columnsUuids.push(columnUuid);
      this._columnTitleIdMap[title] = id;
      this.hiddenTranslator.setColumn(columnUuid, column);
      this.sortTranslator.addUuid(columnUuid, id);
    }
  }

  get columnTitleIdMap() {
    return this._columnTitleIdMap;
  }

  get columnsUuids() {
    return this._columnsUuids;
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.hiddenTranslator.setHiddenColumns(hiddenColumns);
  }

  toggleColumnVisibility(hiddenColumn: StringKeys<T>, visibility?: boolean) {
    this.hiddenTranslator.toggleColumnVisibility(hiddenColumn, visibility);
  }

  isShowing(key: StringKeys<T>) {
    return this.hiddenTranslator.isShowing(key);
  }

  getTranslation(colPos: number): string {
    const translatedPosition = this.getTranslatedPosition(colPos);
    return this.sortTranslator.getTranslation(translatedPosition).uuid;
  }

  get length() {
    return this.getColumns().length;
  }

  private getTranslatedPosition(colPos: number) {
    this.validateBounds(colPos);
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

  getCell(colUuid: string) {
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
    const translatedPosition1 = this.getTranslatedPosition(col1);
    const translatedPosition2 = this.getTranslatedPosition(col2);
    this.sortTranslator.swap(translatedPosition1, translatedPosition2);
    this.hiddenTranslator.dirty();
  }
}

export { ColumnsManager };
