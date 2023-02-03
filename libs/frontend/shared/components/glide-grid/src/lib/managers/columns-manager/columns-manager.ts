import type { StringKeys } from '../../types/general';
import { HiddenColumnTranslator } from './hidden-column-translator';
import { SortTranslator } from './sort-translator';
import type { ColumnsProps } from './types';
import { CellPrototype, WrappedGridColumn } from '../grid-manager/types';

class ColumnsManager<T extends object> {
  private readonly sortTranslator = new SortTranslator<T>();
  private readonly hiddenTranslator: HiddenColumnTranslator<T>;
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
