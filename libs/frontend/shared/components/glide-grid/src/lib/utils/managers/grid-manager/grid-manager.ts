import { ColumnsManager } from '../columns-manager/columns-manager';
import type { StringKeys } from '../../../types/general';
import { CellCache } from '../../caches/cell-cache';
import type { GridCell, GridSelection, Item } from '@glideapps/glide-data-grid';
import { TableSorter } from '../../sort/table-sorter';
import { uuid } from '../../general';
import { Levels } from '../../../levels';
import { MiniCache } from '../../caches/mini-cache';
import type { FilterSet } from '../../filters/types';
import { SortMap } from '../../sort/sort-map';
import { FilterManager } from '../filter-manager';

import type { GenerateWrappedColumnProps } from '../../cells/generators';
import { generateWrappedColumn } from '../../cells/generators';

import type { GridEventHandlers, IdRow, WrappedGridColumn } from './types';
import { EventManager } from '../event-manager';
import { SelectionManager } from '../selection-manager/selection-manager';
import type { OnHeaderClickHandler } from './types';
import type { DataManagerProps } from '../data-manager';
import { DataManager } from '../data-manager';

type GridManagerProps<T extends object> = DataManagerProps<T> & {
  columns: GenerateWrappedColumnProps<T>[];
  data: T[];
  hiddenColumns?: StringKeys<T>[];
  filterSet?: FilterSet<T>[];
  searchTerms?: string[];
  events?: GridEventHandlers;
};

const getTextKeys = <T extends object>(
  columns: WrappedGridColumn<T>[]
): StringKeys<T>[] => {
  return columns.filter((e) => e.cell.kind !== 'number').map(({ id }) => id);
};

class GridManager<T extends object> {
  private readonly selectionManager = new SelectionManager();
  private readonly onHeaderClicked?: OnHeaderClickHandler;

  private readonly sorter: TableSorter<IdRow<T>>;
  private readonly levels: Levels<T>;
  private readonly filteredCache = new MiniCache<IdRow<T>[]>();
  private readonly columnsManager: ColumnsManager<T>;
  private readonly eventManager: EventManager<T>;
  private readonly filterManager: FilterManager<T>;
  private readonly dataManager: DataManager<IdRow<T>>;
  constructor({
    columns: _columns,
    data,
    hiddenColumns,
    pageSize,
    filterSet = [],
    searchTerms = [],
    events: { onHeaderClicked } = {},
    events,
  }: GridManagerProps<T>) {
    this.onHeaderClicked = onHeaderClicked;
    const columns = _columns.map(generateWrappedColumn);
    const sortMap = new SortMap({ columns });
    this.columnsManager = new ColumnsManager<T>({ columns, hiddenColumns });

    this.dataManager = new DataManager<IdRow<T>>({
      pageSize,
      columnsManager: this.columnsManager,
    });

    this.levels = new Levels(getTextKeys(columns));
    this.sorter = new TableSorter<IdRow<T>>({ sortMap });

    this.filteredCache.cache([]);

    this.filterManager = new FilterManager({
      filters: filterSet,
      sortMap,
      searchTerms,
    });

    this.eventManager = new EventManager<T>({
      selectionManager: this.selectionManager,
      columnsManager: this.columnsManager,
      dataManager: this.dataManager,
      events,
    });

    this.addData(data);
  }

  addData(data: T[]): void {
    const rows = this.processRows(data);
    this.sorter.addData(rows);
    this.dataManager.addData(rows);
    this.nextSortKey();
  }

  private processRows(rows: T[]): IdRow<T>[] {
    for (const row of rows) {
      const changeType = row as IdRow<T>;
      changeType.rowUuid = uuid();
      this.levels.processItem(row);
    }
    return rows as IdRow<T>[];
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

  getSortHistory(steps: number) {
    return this.sorter.getSortHistory(steps);
  }

  clear() {
    this.sorter.clear();
    this.filteredCache.dirty();
    this.dataManager.clear();
  }

  private filterSorted() {
    const sorted = this.sorter.sorted;
    const filtered = sorted.filter((item) => this.filterManager.testItem(item));
    this.dataManager.setData(filtered);
  }

  private nextSortKey(key?: StringKeys<T>) {
    if (key !== undefined && !this.columnsManager.isSortColumn(key)) {
      return;
    }
    this.sorter.stateSort(key);
    this.filterSorted();
  }

  //
  // data manager only
  //
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

  //
  // event manager only
  //
  onHeaderClickedHandler(col: number) {
    const selectedHeader = this.columnsManager.getHeaderKey(col);
    this.nextSortKey(selectedHeader);
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

  //
  // filter manager only
  //
  setFilterGroups(filterSet: FilterSet<T>[]): void {
    this.filterManager.setFilterGroups(filterSet);
    this.filterSorted();
  }

  setSearchTerms(terms: string[]): void {
    this.filterManager.setSearchTerms(terms);
    this.filterSorted();
  }
}

export { GridManager };
export type { GridManagerProps };
