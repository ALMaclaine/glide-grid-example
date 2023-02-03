import { ColumnsManager } from '../columns-manager/columns-manager';
import type { StringKeys } from '../../../types/general';
import type { GridCell, GridSelection, Item } from '@glideapps/glide-data-grid';
import type { FilterSet } from '../../filters/types';

import type { GenerateWrappedColumnProps } from '../../cells/generators';
import { generateWrappedColumn } from '../../cells/generators';

import type { EventManagerEventProps } from '../event-manager';
import { EventManager } from '../event-manager';
import { SelectionManager } from '../selection-manager/selection-manager';
import type { OnHeaderClickHandler } from './types';
import type { DataMangerInProps } from '../data-manager';
import { DataManager } from '../data-manager';
import type { FilterManagerFilterProps } from '../filter-manager';

type GridManagerProps<T extends object> = DataMangerInProps &
  FilterManagerFilterProps<T> &
  EventManagerEventProps & {
    columns: GenerateWrappedColumnProps<T>[];
    data: T[];
    hiddenColumns?: StringKeys<T>[];
  };

class GridManager<T extends object> {
  private readonly selectionManager = new SelectionManager();
  private readonly onHeaderClicked?: OnHeaderClickHandler;

  private readonly columnsManager: ColumnsManager<T>;
  private readonly eventManager: EventManager<T>;
  private readonly dataManager: DataManager<T>;
  constructor({
    columns: _columns,
    data,
    hiddenColumns,
    pageSize,
    filters = [],
    searchTerms = [],
    events: { onHeaderClicked } = {},
    events,
  }: GridManagerProps<T>) {
    this.onHeaderClicked = onHeaderClicked;
    const columns = _columns.map(generateWrappedColumn);
    this.columnsManager = new ColumnsManager<T>({ columns, hiddenColumns });

    this.dataManager = new DataManager<T>({
      pageSize,
      columns,
      filters,
      searchTerms,
      columnsManager: this.columnsManager,
    });

    this.eventManager = new EventManager<T>({
      selectionManager: this.selectionManager,
      columnsManager: this.columnsManager,
      dataManager: this.dataManager,
      events,
    });

    this.addData(data);
  }

  itemToCell([col, row]: Item): GridCell {
    const { rowUuid } = this.dataManager.getRow(row);
    const cell = this.dataManager.getCell(rowUuid, col);

    if (cell.kind === 'number') {
      const clonedCell = { ...cell };
      const displayNumber = parseFloat(clonedCell.displayData.toString());
      if (displayNumber < 0) {
        clonedCell.displayData = `(${Math.abs(displayNumber)})`;
      } else {
        clonedCell.displayData = `${displayNumber} `;
      }
      return clonedCell as GridCell;
    } else {
      return cell as GridCell;
    }
  }

  //
  // data manager only
  //
  addData(data: T[]): void {
    this.dataManager.addData(data);
  }

  getSortHistory(steps: number) {
    return this.dataManager.getSortHistory(steps);
  }

  clear() {
    this.dataManager.clear();
  }

  get length() {
    return this.dataManager.length;
  }

  setPage(page = 0) {
    this.dataManager.setPage(page);
  }

  get page() {
    return this.dataManager.page;
  }

  get pageSize() {
    return this.dataManager.pageSize;
  }

  get pageCount() {
    return this.dataManager.pageCount;
  }

  setPageSize(pageSize: number | undefined) {
    this.dataManager.setPageSize(pageSize);
  }

  setFilterGroups(filters: FilterSet<T>[]): void {
    this.dataManager.setFilterGroups(filters);
  }

  setSearchTerms(terms: string[]): void {
    this.dataManager.setSearchTerms(terms);
  }

  //
  // event manager only
  //
  onHeaderClickedHandler(col: number) {
    const selectedHeader = this.columnsManager.getHeaderKey(col);
    this.dataManager.nextSortKey(selectedHeader);
    this.onHeaderClicked?.(selectedHeader);
  }

  handleSelectionChange(selection: GridSelection): void {
    this.eventManager.handleSelectionChange(selection);
  }

  cellSelectedHandler(item: Item): void {
    this.eventManager.cellSelectedHandler(item);
  }

  //
  // columns manager only
  //
  getColumns() {
    return this.columnsManager.getColumns();
  }

  get columnTitleIdMap() {
    return this.columnsManager.columnTitleIdMap;
  }

  swap(col1: number, col2: number) {
    this.columnsManager.swap(col1, col2);
  }

  toggleColumnVisibility(
    hiddenColumn: StringKeys<T>,
    visibility?: boolean
  ): void {
    this.columnsManager.toggleColumnVisibility(hiddenColumn, visibility);
  }

  isColumnShowing(key: StringKeys<T>): boolean {
    return this.columnsManager.isShowing(key);
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.columnsManager.setHiddenColumns(hiddenColumns);
  }

  //
  // selection manager only
  //
  get selection(): GridSelection {
    return this.selectionManager.selection;
  }
}

export { GridManager };
export type { GridManagerProps };
