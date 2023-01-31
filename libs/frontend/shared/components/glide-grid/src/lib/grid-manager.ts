import { ColumnsManager } from './columns-manager';
import type { IdRow, WrappedGridColumn } from './types/grid';
import type { StringKeys } from './types/general';
import { CellCache } from './cell-cache';
import type { GridCell, Item } from '@glideapps/glide-data-grid';
import { TableSorter } from './utils/sort/table-sorter';
import { uuid } from './utils/general';
import { Levels } from './levels';
import { Filters, FilterSet } from './utils/filters';
import { MiniCache } from './utils/mini-cache';

type GridManagerProps<T> = {
  columns: WrappedGridColumn<T>[];
  data: T[];
  hiddenColumns?: StringKeys<T>[];
  filterSet?: FilterSet<T>;
};

const getTextKeys = <T>(columns: WrappedGridColumn<T>[]): StringKeys<T>[] => {
  return columns.filter((e) => e.cell.kind !== 'number').map(({ id }) => id);
};

class GridManager<T> {
  private readonly columnsManager: ColumnsManager<T>;
  private readonly cellCache: CellCache<T>;

  private readonly sorter: TableSorter<T>;
  private readonly levels: Levels<T>;
  private filterSet: FilterSet<T>;
  private readonly filteredCache = new MiniCache<IdRow<T>[]>();

  constructor({
    columns,
    data,
    hiddenColumns,
    filterSet = [],
  }: GridManagerProps<T>) {
    this.columnsManager = new ColumnsManager<T>({ columns, hiddenColumns });
    this.cellCache = new CellCache<T>(this.columnsManager);
    this.sorter = new TableSorter({ columns });
    this.addData(data);
    this.levels = new Levels(getTextKeys(columns));
    this.filteredCache.cache([]);
    this.filterSet = filterSet;
  }

  setFilterSet(filterSet: FilterSet<T>) {
    this.filterSet = filterSet;
  }

  private filterer(filters: Filters<T>) {
    const keys = Object.keys(filters);
    for (const key of keys) {
      console.log(key);
    }
  }

  private filtered() {
    for (const filters of this.filterSet) {
      this.filterer(filters);
    }
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
  }

  nextSortKey(key: StringKeys<T>) {
    this.filtered();
    return this.sorter.stateSort(key);
  }
}

export { GridManager };
export type { GridManagerProps };
