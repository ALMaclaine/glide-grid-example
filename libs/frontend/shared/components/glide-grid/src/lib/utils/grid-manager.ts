import { ColumnsManager } from './columns-manager';
import type { Cell, IdRow, WrappedGridColumn } from '../types/grid';
import type { StringKeys } from '../types/general';
import { CellCache } from './caches/cell-cache';
import type { GridCell, Item } from '@glideapps/glide-data-grid';
import { SortMap } from './sort/sort-map';
import { TableSorter } from './sort/table-sorter';
import { SortStateMachine } from './sort/sort-state-machine';
import { STATE_HISTORY_STEPS } from '../constants';
import { uuid } from './general';

type GridManagerProps<T> = {
  columns: WrappedGridColumn<T>[];
  data: T[];
  hiddenColumns?: StringKeys<T>[];
};

const addIdsToRows = <T>(rows: T[]): IdRow<T>[] => {
  // mutate directly to avoid performance issues on large tables
  for (const row of rows) {
    const changeType = row as IdRow<T>;
    changeType.rowUuid = uuid();
  }
  return rows as IdRow<T>[];
};

class GridManager<T> {
  private readonly columnsManager: ColumnsManager<T>;
  private readonly cellCache: CellCache<T> = new CellCache<T>();

  private readonly sortStateMachine: SortStateMachine<T> =
    new SortStateMachine<T>();
  private readonly sorter: TableSorter<T>;
  private readonly columnUuids: string[];
  private readonly columnNames: Record<string, StringKeys<T>> = {};

  constructor({ columns, data, hiddenColumns }: GridManagerProps<T>) {
    columns.forEach(({ title, id }) => (this.columnNames[title] = id));
    this.columnUuids = columns.map(({ columnUuid }) => columnUuid);
    this.columnsManager = new ColumnsManager<T>({ columns, hiddenColumns });
    this.sorter = new TableSorter({
      sortMap: new SortMap({ columns }),
    });
    this.addData(data);
  }

  isColumnShowing(key: StringKeys<T>) {
    return this.columnsManager.isShowing(key);
  }

  addData(data: T[]) {
    const rows = addIdsToRows(data);
    this.sorter.addData(rows);
    this.addDataToCache(rows);
  }

  private genCell(item: IdRow<T>, colUuid: string): Cell<T> {
    const { data, displayData, ...rest } = this.columnsManager.getCell(colUuid);
    return {
      ...rest,
      data: item[data],
      displayData: item[displayData],
    } as Cell<T>;
  }

  private addDataToCache(data: IdRow<T>[]) {
    for (let row = 0; row < data.length; row++) {
      const item = data[row];
      const { rowUuid } = item;
      for (const columnUuid of this.columnUuids) {
        const cell = this.genCell(item, columnUuid);
        this.cellCache.set(rowUuid, columnUuid, cell);
      }
    }
  }

  setHiddenColumns(hiddenColumns: StringKeys<T>[]) {
    this.columnsManager.setHiddenColumns(hiddenColumns);
  }

  itemToCell([col, row]: Item): GridCell {
    const { rowUuid } = this.sorter.sorted[row];
    const translatedCol = this.columnsManager.getTranslation(col);
    return this.cellCache.get(rowUuid, translatedCol) as GridCell;
  }

  getColumns() {
    return this.columnsManager.getColumns();
  }

  getColumnNames() {
    return this.columnNames;
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
    return this.sortStateMachine.getHistory(steps);
  }

  clearData() {
    this.cellCache.clear();
    this.sorter.clear();
  }

  nextSortKey(key: StringKeys<T>) {
    const stateHistory = this.sortStateMachine.nextValue(
      key,
      STATE_HISTORY_STEPS
    );
    return this.sorter.stateSort(stateHistory);
  }
}

export { GridManager };
export type { GridManagerProps };
