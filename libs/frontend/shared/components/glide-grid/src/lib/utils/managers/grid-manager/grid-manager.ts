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
import { PageManager } from '../page-manager';

import type { GenerateWrappedColumnProps } from '../../cells/generators';
import { generateWrappedColumn } from '../../cells/generators';

import { SelectionManager } from '../selection-manager/selection-manager';
import type {
  IdRow,
  OnAreaSelectedHandler,
  OnColSelectedHandler,
  OnItemSelectedHandler,
  WrappedGridColumn,
} from './types';
import type { LastSelectionChangeType } from '../selection-manager/types';
import { LAST_SELECTION_CHANGE_TYPE } from '../selection-manager/types';
import type { OnRowSelectedHandler } from './types';

type GridManagerProps<T extends object> = {
  columns: GenerateWrappedColumnProps<T>[];
  data: T[];
  pageSize?: number;
  hiddenColumns?: StringKeys<T>[];
  filterSet?: FilterSet<T>[];
  searchTerms?: string[];
  onItemSelected?: OnItemSelectedHandler;
  onRowSelected?: OnRowSelectedHandler;
  onColSelected?: OnColSelectedHandler;
  onAreaSelected?: OnAreaSelectedHandler;
};

const isMarkerClick = ([col]: Item): boolean => {
  return col === -1;
};

const getTextKeys = <T extends object>(
  columns: WrappedGridColumn<T>[]
): StringKeys<T>[] => {
  return columns.filter((e) => e.cell.kind !== 'number').map(({ id }) => id);
};

class GridManager<T extends object> {
  private readonly columnsManager: ColumnsManager<T>;
  private readonly cellCache: CellCache<T>;
  private readonly sorter: TableSorter<IdRow<T>>;
  private readonly levels: Levels<T>;
  private readonly filteredCache = new MiniCache<IdRow<T>[]>();
  private readonly pageManager: PageManager<IdRow<T>>;
  private readonly selectionManager = new SelectionManager();
  private readonly onItemSelected?: OnItemSelectedHandler;
  private readonly onRowSelected?: OnRowSelectedHandler;
  private readonly onColSelected?: OnColSelectedHandler;
  private readonly onAreaSelected?: OnAreaSelectedHandler;

  get selection(): GridSelection {
    return this.selectionManager.selection;
  }

  private filterManager: FilterManager<T>;
  constructor({
    columns: _columns,
    data,
    hiddenColumns,
    pageSize,
    filterSet = [],
    searchTerms = [],
    onItemSelected,
    onRowSelected,
    onColSelected,
    onAreaSelected,
  }: GridManagerProps<T>) {
    this.onItemSelected = onItemSelected;
    this.onRowSelected = onRowSelected;
    this.onColSelected = onColSelected;
    this.onAreaSelected = onAreaSelected;
    const columns = _columns.map(generateWrappedColumn);
    this.pageManager = new PageManager<IdRow<T>>({ pageSize });
    const sortMap = new SortMap({ columns });
    this.columnsManager = new ColumnsManager<T>({ columns, hiddenColumns });
    this.cellCache = new CellCache<T>(this.columnsManager);
    this.sorter = new TableSorter<IdRow<T>>({ sortMap });
    this.addData(data);
    this.levels = new Levels(getTextKeys(columns));
    this.filteredCache.cache([]);
    this.filterManager = new FilterManager({
      filters: filterSet,
      sortMap,
      searchTerms,
    });
  }

  private handleRowSelected(selection: GridSelection) {
    // don't bother wasting cycles if we don't have a handler
    if (!this.onRowSelected) {
      return;
    }
    const lastSelectedIndex = selection.rows.last();
    if (lastSelectedIndex === undefined) {
      throw new Error('Should not occur');
    }
    const lastSelectedRow = this.pageManager.getRow(lastSelectedIndex);
    const selectedIndices = selection.rows.toArray();
    const selectedRows = selectedIndices.map((index) =>
      this.pageManager.getRow(index)
    );
    this.onRowSelected({
      lastSelectedIndex,
      selectedIndices,
      lastSelectedRow,
      selectedRows,
    });
  }

  private handleAreaSelected(selection: GridSelection) {
    // don't bother wasting cycles if we don't have a handler
    if (!this.onAreaSelected) {
      return;
    }
    const rect = selection.current?.range;
    if (!rect) {
      throw new Error('Should not occur');
    }
    this.onAreaSelected({
      rect,
    });
  }

  private handleColSelected(selection: GridSelection) {
    // don't bother wasting cycles if we don't have a handler
    if (!this.onColSelected) {
      return;
    }
    const lastSelectedIndex = selection.columns.last();
    if (lastSelectedIndex === undefined) {
      throw new Error('Should not occur');
    }
    const lastSelectedCol =
      this.columnsManager.getCellByIndex(lastSelectedIndex);
    const selectedIndices = selection.columns.toArray();
    const selectedCols = selectedIndices.map((index) =>
      this.columnsManager.getCellByIndex(index)
    );
    this.onColSelected({
      lastSelectedIndex,
      selectedIndices,
      lastSelectedCol,
      selectedCols,
    });
  }

  handleSelectionChange(selection: GridSelection): void {
    // updateSelections must be called before accessing lastChangeType
    this.selectionManager.updateSelections(selection);
    const lastType = this.lastChangeType;
    switch (lastType) {
      case LAST_SELECTION_CHANGE_TYPE.rows: {
        this.handleRowSelected(selection);
        return;
      }
      case LAST_SELECTION_CHANGE_TYPE.columns: {
        this.handleColSelected(selection);
        return;
      }
      case LAST_SELECTION_CHANGE_TYPE.rect: {
        this.handleAreaSelected(selection);
        return;
      }
      case LAST_SELECTION_CHANGE_TYPE.initial:
        break;
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _default: never = lastType;
      }
    }
  }

  setFilterSet(filterSet: FilterSet<T>[]): void {
    this.filterManager.setFilterGroups(filterSet);
    this.filterSorted();
  }

  setSearchTerms(terms: string[]): void {
    this.filterManager.setSearchTerms(terms);
    this.filterSorted();
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

  addData(data: T[]) {
    const rows = this.processRows(data);
    this.sorter.addData(rows);
    this.cellCache.addData(rows);
    this.nextSortKey();
  }

  private processRows(rows: T[]) {
    for (const row of rows) {
      const changeType = row as IdRow<T>;
      changeType.rowUuid = uuid();
      this.levels.processItem(row);
    }
    return rows as IdRow<T>[];
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.columnsManager.setHiddenColumns(hiddenColumns);
  }

  itemToCell([col, row]: Item): GridCell {
    const { rowUuid } = this.pageManager.getRow(row);
    const cell = this.cellCache.get(rowUuid, col);

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

  cellClickedHandler(item: Item): void {
    if (!isMarkerClick(item)) {
      // don't bother wasting cycles if we don't have a handler
      if (!this.onItemSelected) {
        return;
      }
      const [colPos, rowPos] = item;
      const row = this.pageManager.getRow(rowPos);
      const cell = this.cellCache.get(row.rowUuid, colPos);
      this.onItemSelected({ row, cell });
    }
  }

  get length() {
    return this.pageManager.length;
  }

  getColumns() {
    return this.columnsManager.getColumns();
  }

  get columnTitleIdMap() {
    return this.columnsManager.columnTitleIdMap;
  }

  swap(col1: number, col2: number) {
    this.columnsManager.swap(col1, col2);
  }

  getHeaderKey(col: number) {
    return this.columnsManager.getHeaderKey(col);
  }

  setPage(page = 0) {
    this.pageManager.setPage(page);
  }

  get page() {
    return this.pageManager.page;
  }

  get pageSize() {
    return this.pageManager.pageSize;
  }

  get pageCount() {
    return this.pageManager.pageCount;
  }

  setPageSize(pageSize: number | undefined) {
    this.pageManager.setPageSize(pageSize);
  }

  getSortHistory(steps: number) {
    return this.sorter.getSortHistory(steps);
  }

  clear() {
    this.sorter.clear();
    this.filteredCache.dirty();
    this.pageManager.clear();
    this.cellCache.clear();
  }

  private filterSorted() {
    const sorted = this.sorter.sorted;
    const filtered = sorted.filter((item) => this.filterManager.testItem(item));
    this.pageManager.setData(filtered);
  }

  get lastChangeType(): LastSelectionChangeType {
    return this.selectionManager.lastChangeType;
  }

  nextSortKey(key?: StringKeys<T>) {
    if (key !== undefined && !this.columnsManager.isSortColumn(key)) {
      return;
    }
    this.sorter.stateSort(key);
    this.filterSorted();
  }
}

export { GridManager };
export type { GridManagerProps };
