import { ColumnsManager } from './columns-manager';
import type { IdRow, WrappedGridColumn } from '../../types/grid';
import type { StringKeys } from '../../types/general';
import { CellCache } from '../caches/cell-cache';
import type { GridCell, Item } from '@glideapps/glide-data-grid';
import { TableSorter } from '../sort/table-sorter';
import { uuid } from '../general';
import { Levels } from '../../levels';
import { MiniCache } from '../caches/mini-cache';
import type { FilterSet } from '../filters/types';
import { SortMap } from '../sort/sort-map';
import { FilterManager } from './filter-manager';
import { PageManager } from './page-manager';
import {
  generateWrappedColumn,
  GenerateWrappedColumnProps,
} from '../cells/generators';
import { OnItemClickedProps } from '../../types/func';

type GridManagerProps<T extends object> = {
  columns: GenerateWrappedColumnProps<T>[];
  data: T[];
  pageSize?: number;
  hiddenColumns?: StringKeys<T>[];
  filterSet?: FilterSet<T>[];
  searchTerms?: string[];
};

const getTextKeys = <T extends object>(
  columns: WrappedGridColumn<T>[]
): StringKeys<T>[] => {
  return columns.filter((e) => e.cell.kind !== 'number').map(({ id }) => id);
};

class GridManager<T extends object> {
  private readonly columnsManager: ColumnsManager<T>;
  private readonly cellCache: CellCache<T>;

  private readonly sorter: TableSorter<T>;
  private readonly levels: Levels<T>;
  private readonly filteredCache = new MiniCache<IdRow<T>[]>();
  private readonly pageManager;

  private filterManager: FilterManager<T>;
  constructor({
    columns: _columns,
    data,
    hiddenColumns,
    pageSize,
    filterSet = [],
    searchTerms = [],
  }: GridManagerProps<T>) {
    const columns = _columns.map(generateWrappedColumn);
    this.pageManager = new PageManager<T>({ pageSize });
    const sortMap = new SortMap({ columns });
    this.columnsManager = new ColumnsManager<T>({ columns, hiddenColumns });
    this.cellCache = new CellCache<T>(this.columnsManager);
    this.sorter = new TableSorter({ sortMap });
    this.addData(data);
    this.levels = new Levels(getTextKeys(columns));
    this.filteredCache.cache([]);
    this.filterManager = new FilterManager({
      filters: filterSet,
      sortMap,
      searchTerms,
    });
  }

  setFilterSet(filterSet: FilterSet<T>[]) {
    this.filterManager.setFilterGroups(filterSet);
    this.filterSorted();
  }

  setSearchTerms(terms: string[]) {
    this.filterManager.setSearchTerms(terms);
    this.filterSorted();
  }

  toggleColumnVisibility(hiddenColumn: StringKeys<T>, visibility?: boolean) {
    this.columnsManager.toggleColumnVisibility(hiddenColumn, visibility);
  }

  isColumnShowing(key: StringKeys<T>) {
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
    return this.cellCache.get(rowUuid, col) as GridCell;
  }

  onCellClicked([colPos, rowPos]: Item): OnItemClickedProps<T> {
    const row = this.pageManager.getRow(rowPos);
    const cell = this.cellCache.get(row.rowUuid, colPos);
    return { row, cell };
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

  clearData() {
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

  nextSortKey(key?: StringKeys<T>) {
    this.sorter.stateSort(key);
    this.filterSorted();
  }
}

export { GridManager };
export type { GridManagerProps };
