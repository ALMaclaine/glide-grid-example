import type { StringKeys } from '../../types/general';
import type { CellPrototype, WrappedGridColumn } from '../../types/grid';
import { MiniCache } from '../caches/mini-cache';

type ColumnsProps<T extends object> = {
  columns: WrappedGridColumn<T>[];
  hiddenColumns?: StringKeys<T>[];
};

type Translation<T extends object> = {
  uuid: string;
  id: StringKeys<T>;
  originalColumn: number;
};

class SortTranslator<T extends object> {
  private readonly _translations: Translation<T>[] = [];
  private readonly idMap = new Map<string, number>();

  addUuid(uuid: string, id: StringKeys<T>): void {
    const length = this._translations.length;
    this.idMap.set(id, length);
    this._translations.push({ originalColumn: length, id, uuid });
  }

  getTranslation(pos: number): Translation<T> {
    if (pos > this._translations.length || pos < 0) {
      throw new Error('Out of bounds access');
    }
    return this._translations[pos];
  }

  getTranslationById(id: StringKeys<T>): Translation<T> {
    const pos = this.idMap.get(id);
    if (pos === undefined) {
      throw new Error('Invalid id');
    }
    return this.getTranslation(pos);
  }

  get length(): number {
    return this._translations.length;
  }

  private updateIdMap(translation: Translation<T>, pos: number): void {
    const { id } = translation;
    this.idMap.set(id, pos);
  }

  private shiftRight(pos1: number, pos2: number): void {
    const translateTmp = this._translations[pos2];
    for (let i = pos2; i > pos1; i--) {
      const translation = this._translations[i - 1];
      this.updateIdMap(translation, i);
      this._translations[i] = translation;
    }
    this.updateIdMap(translateTmp, pos1);
    this._translations[pos1] = translateTmp;
  }

  private shiftLeft(pos1: number, pos2: number): void {
    const translateTmp = this._translations[pos1];
    for (let i = pos1; i < pos2; i++) {
      const translation = this._translations[i + 1];
      this.updateIdMap(translation, i);
      this._translations[i] = translation;
    }
    this.updateIdMap(translateTmp, pos2);

    this._translations[pos2] = translateTmp;
  }

  swap(col1: number, col2: number): void {
    if (col1 > col2) {
      this.shiftRight(col2, col1);
    } else {
      this.shiftLeft(col1, col2);
    }
  }

  get translations(): Translation<T>[] {
    return this._translations;
  }
}

class HiddenColumnTranslator<T extends object> {
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

  getColumns(sortTranslations: Translation<T>[]): WrappedGridColumn<T>[] {
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

  clear(): void {
    this.hiddenTranslatorMap.clear();
  }

  dirty(): void {
    this.columnsCache.dirty();
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]): void {
    Array.from(this.columnIsShowing.keys()).forEach((column) => {
      this.toggleColumnVisibility(column, true);
    });

    hiddenColumns.forEach((key) => this.toggleColumnVisibility(key, false));
  }

  toggleColumnVisibility(
    hiddenColumn: StringKeys<T>,
    visibility?: boolean
  ): void {
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

  isShowing(key: StringKeys<T>): boolean {
    return !!this.columnIsShowing.get(key);
  }

  setColumn(columnUuid: string, column: WrappedGridColumn<T>): void {
    this.columnMap.set(columnUuid, column);
  }

  getColumn(columnUuid: string): WrappedGridColumn<T> {
    const column = this.columnMap.get(columnUuid);
    if (column) {
      return column;
    }
    throw new Error('Column does not exist');
  }

  getHiddenTranslation(colPos: number): number {
    const translatedPosition = this.hiddenTranslatorMap.get(colPos);
    if (translatedPosition === undefined) {
      throw new Error('Should not occur');
    }
    return translatedPosition;
  }
}

class ColumnsManager<T extends object> {
  private readonly sortTranslator = new SortTranslator<T>();
  private readonly hiddenTranslator;
  private readonly _columnTitleIdMap: Record<string, StringKeys<T>> = {};
  private readonly _columnsUuids: string[] = [];
  private readonly sortColumns = new Set<StringKeys<T>>();

  constructor({ columns, hiddenColumns = [] }: ColumnsProps<T>) {
    this.hiddenTranslator = new HiddenColumnTranslator({
      columns,
      hiddenColumns,
    });

    for (const column of columns) {
      const { columnUuid, id, title, shouldSort } = column;
      if (shouldSort) {
        this.sortColumns.add(id);
      }
      this._columnsUuids.push(columnUuid);
      this._columnTitleIdMap[title] = id;
      this.hiddenTranslator.setColumn(columnUuid, column);
      this.sortTranslator.addUuid(columnUuid, id);
    }
  }

  isSortColumn(key: StringKeys<T>): boolean {
    return this.sortColumns.has(key);
  }

  get columnTitleIdMap(): Record<string, StringKeys<T>> {
    return this._columnTitleIdMap;
  }

  get columnsUuids(): string[] {
    return this._columnsUuids;
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]): void {
    this.hiddenTranslator.setHiddenColumns(hiddenColumns);
  }

  toggleColumnVisibility(
    hiddenColumn: StringKeys<T>,
    visibility?: boolean
  ): void {
    this.hiddenTranslator.toggleColumnVisibility(hiddenColumn, visibility);
  }

  isShowing(key: StringKeys<T>): boolean {
    return this.hiddenTranslator.isShowing(key);
  }

  getTranslation(colPos: number): string {
    const translatedPosition = this.getTranslatedPosition(colPos);
    return this.sortTranslator.getTranslation(translatedPosition).uuid;
  }

  get length(): number {
    return this.getColumns().length;
  }

  private getTranslatedPosition(colPos: number): number {
    this.validateBounds(colPos);
    return this.hiddenTranslator.getHiddenTranslation(colPos);
  }

  getHeaderKey(colPos: number): StringKeys<T> {
    const { id } = this.getColumns()[colPos];
    const { uuid } = this.sortTranslator.getTranslationById(id);
    return this.getCell(uuid).displayDataId;
  }

  getColumns(): WrappedGridColumn<T>[] {
    const translations = this.sortTranslator.translations;
    return this.hiddenTranslator.getColumns(translations);
  }

  getCell(colUuid: string): CellPrototype<T> {
    const column = this.hiddenTranslator.getColumn(colUuid);
    if (column) {
      return column.cell;
    }
    throw new Error('Column does not exist');
  }

  private validateBounds(col: number): void {
    const columns = this.getColumns();
    if (col > columns.length || col < 0) {
      throw new Error('Out of bounds access');
    }
  }

  swap(col1: number, col2: number): void {
    const translatedPosition1 = this.getTranslatedPosition(col1);
    const translatedPosition2 = this.getTranslatedPosition(col2);
    this.sortTranslator.swap(translatedPosition1, translatedPosition2);
    this.hiddenTranslator.dirty();
  }
}

export { ColumnsManager };
