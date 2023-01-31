import { ColumnsManager } from './columns-manager';
import type { IdRow, WrappedGridColumn } from './types/grid';
import type { StringKeys } from './types/general';
import { CellCache } from './utils/caches/cell-cache';
import type { GridCell, Item } from '@glideapps/glide-data-grid';
import { TableSorter } from './utils/sort/table-sorter';
import { uuid } from './utils/general';
import { Levels } from './levels';
import { MiniCache } from './utils/caches/mini-cache';
import type { FilterSet } from './utils/filters/types';
import { SortMap } from './utils/sort/sort-map';
import { FilterManager } from './utils/filters/filter-manager';
import { RowCache } from './utils/caches/row-cache';

type GridManagerProps<T> = {
  columns: WrappedGridColumn<T>[];
  data: T[];
  hiddenColumns?: StringKeys<T>[];
  filterSet?: FilterSet<T>[];
};

const getTextKeys = <T>(columns: WrappedGridColumn<T>[]): StringKeys<T>[] => {
  return columns.filter((e) => e.cell.kind !== 'number').map(({ id }) => id);
};

class GridManager<T> {
  private readonly columnsManager: ColumnsManager<T>;
  private readonly cellCache: CellCache<T>;

  private readonly sorter: TableSorter<T>;
  private readonly levels: Levels<T>;
  private filterSet: FilterSet<T>[];
  private readonly filteredCache = new MiniCache<IdRow<T>[]>();
  private readonly rowCache = new RowCache();

  constructor({
    columns,
    data,
    hiddenColumns,
    filterSet = [],
  }: GridManagerProps<T>) {
    const sortMap = new SortMap({ columns });
    this.columnsManager = new ColumnsManager<T>({ columns, hiddenColumns });
    this.cellCache = new CellCache<T>(this.columnsManager);
    this.sorter = new TableSorter({ sortMap });
    this.addData(data);
    this.levels = new Levels(getTextKeys(columns));
    this.filteredCache.cache([]);
    this.filterSet = filterSet;
    const filterManager = new FilterManager({ filters: filterSet, sortMap });
  }

  setFilterSet(filterSet: FilterSet<T>[]) {
    this.filterSet = filterSet;
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
  }

  // TODO: ADD ROW CACHE BACK
  private processRows(rows: T[]) {
    for (const row of rows) {
      this.rowCache.addRow(row);
      this.levels.processItem(row);
    }
    return rows as IdRow<T>[];
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.columnsManager.setHiddenColumns(hiddenColumns);
  }

  itemToCell([col, row]: Item): GridCell {
    const { rowUuid } = this.sorter.sorted[row];
    return this.cellCache.get(rowUuid, col) as GridCell;
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

  get length() {
    return this.sorter.length;
  }

  getSortHistory(steps: number) {
    return this.sorter.getSortHistory(steps);
  }

  clearData() {
    this.cellCache.clear();
    this.sorter.clear();
    this.filteredCache.dirty();
    this.rowCache.clear();
  }

  nextSortKey(key: StringKeys<T>) {
    return this.sorter.stateSort(key);
  }
}

export { GridManager };
export type { GridManagerProps };
