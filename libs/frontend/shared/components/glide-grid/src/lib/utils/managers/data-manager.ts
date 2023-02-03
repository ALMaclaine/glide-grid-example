import { PageManager } from './page-manager';
import type { IdRow, WrappedGridColumn } from './grid-manager/types';
import { CellCache } from '../caches/cell-cache';
import type { ColumnsManager } from './columns-manager/columns-manager';
import type { CellInstance } from './grid-manager/types';
import { TableSorter } from '../sort/table-sorter';
import type { StringKeys } from '../../types/general';
import { Levels } from '../../levels';
import { uuid } from '../general';
import { MiniCache } from '../caches/mini-cache';
import type { FilterManagerFilterProps } from './filter-manager';
import { FilterManager } from './filter-manager';
import type { FilterSet } from '../filters/types';
import { SortMap } from '../sort/sort-map';

type DataMangerInProps = {
  pageSize?: number;
};

type DataManagerProps<T extends object> = DataMangerInProps &
  FilterManagerFilterProps<T> & {
    columnsManager: ColumnsManager<T>;
    columns: WrappedGridColumn<T>[];
  };

const getTextKeys = <T extends object>(
  columns: WrappedGridColumn<T>[]
): StringKeys<T>[] => {
  return columns.filter((e) => e.cell.kind !== 'number').map(({ id }) => id);
};

class DataManager<T extends object> {
  private readonly pageManager: PageManager<IdRow<T>>;
  private readonly cellCache: CellCache<T>;
  private readonly sorter: TableSorter<IdRow<T>>;
  private readonly columnsManager: ColumnsManager<T>;
  private readonly levels: Levels<T>;
  private readonly filterManager: FilterManager<T>;

  private readonly filteredCache = new MiniCache<IdRow<T>[]>();

  constructor({
    pageSize,
    columnsManager,
    columns,
    filters,
    searchTerms,
  }: DataManagerProps<T>) {
    const sortMap = new SortMap({ columns });

    this.levels = new Levels(getTextKeys(columns));
    this.columnsManager = columnsManager;
    this.pageManager = new PageManager<IdRow<T>>({ pageSize });
    this.cellCache = new CellCache<T>(columnsManager);
    this.sorter = new TableSorter<IdRow<T>>({ sortMap });
    this.filteredCache.cache([]);
    this.filterManager = new FilterManager({
      filters,
      sortMap,
      searchTerms,
    });
  }

  clear() {
    this.filteredCache.dirty();
    this.sorter.clear();
    this.pageManager.clear();
    this.cellCache.clear();
  }

  private processRows(rows: T[]): IdRow<T>[] {
    for (const row of rows) {
      const changeType = row as IdRow<T>;
      changeType.rowUuid = uuid();
      this.levels.processItem(row);
    }
    return rows as IdRow<T>[];
  }

  private filterSorted() {
    const sorted = this.sorter.sorted;
    const filtered = sorted.filter((item) => this.filterManager.testItem(item));
    this.setData(filtered);
  }

  nextSortKey(key?: StringKeys<T>) {
    if (key !== undefined && !this.columnsManager.isSortColumn(key)) {
      return;
    }
    this.sorter.stateSort(key);
    this.filterSorted();
  }

  // sorter only
  getSortHistory(steps: number) {
    return this.sorter.getSortHistory(steps);
  }

  // cell cache only
  getCell(rowUuid: string, col: number): CellInstance<T> {
    return this.cellCache.get(rowUuid, col);
  }

  addData(data: T[]): void {
    const rows = this.processRows(data);
    this.sorter.addData(rows);
    this.cellCache.addData(rows);
    this.nextSortKey();
  }

  //
  // page manager only
  //
  getRow(row: number) {
    return this.pageManager.getRow(row);
  }

  setData(data: IdRow<T>[]) {
    this.pageManager.setData(data);
  }

  get length() {
    return this.pageManager.length;
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

export { DataManager };
export type { DataManagerProps, DataMangerInProps };
