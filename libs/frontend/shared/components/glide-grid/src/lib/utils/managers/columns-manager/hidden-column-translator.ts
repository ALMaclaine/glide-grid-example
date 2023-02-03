import { MiniCache } from '../../caches/mini-cache';
import type { StringKeys } from '../../../types/general';
import type { ColumnsProps, Translation } from './types';
import { WrappedGridColumn } from '../grid-manager/types';

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

export { HiddenColumnTranslator };
