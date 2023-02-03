import type {
  GridEventHandlers,
  OnAreaSelectedHandler,
  OnColSelectedHandler,
  OnHeaderClickHandler,
  OnItemSelectedHandler,
  OnRowSelectedHandler,
} from './grid-manager/types';
import type { GridSelection } from '@glideapps/glide-data-grid';
import type { ColumnsManager } from './columns-manager/columns-manager';
import type { PageManager } from './page-manager';
import type { IdRow } from './grid-manager/types';
import { LAST_SELECTION_CHANGE_TYPE } from './selection-manager/types';
import type { CellCache } from '../caches/cell-cache';
import type { Item } from '@glideapps/glide-data-grid';
import type { SelectionManager } from './selection-manager/selection-manager';

type EventManagerProps<T extends object> = GridEventHandlers & {
  cellCache: CellCache<T>;
  pageManager: PageManager<IdRow<T>>;
  columnsManager: ColumnsManager<T>;
  selectionManager: SelectionManager;
};

const isMarkerClick = ([col]: Item): boolean => {
  return col === -1;
};

class EventManager<T extends object> {
  private readonly onItemSelected?: OnItemSelectedHandler;
  private readonly onRowSelected?: OnRowSelectedHandler;
  private readonly onColSelected?: OnColSelectedHandler;
  private readonly onAreaSelected?: OnAreaSelectedHandler;
  private readonly columnsManager: ColumnsManager<T>;
  private readonly pageManager: PageManager<IdRow<T>>;
  private readonly cellCache: CellCache<T>;
  private readonly selectionManager: SelectionManager;

  constructor({
    cellCache,
    columnsManager,
    onAreaSelected,
    onColSelected,
    onItemSelected,
    onRowSelected,
    pageManager,
    selectionManager,
  }: EventManagerProps<T>) {
    this.cellCache = cellCache;
    this.columnsManager = columnsManager;
    this.onAreaSelected = onAreaSelected;
    this.onColSelected = onColSelected;
    this.onItemSelected = onItemSelected;
    this.onRowSelected = onRowSelected;
    this.pageManager = pageManager;
    this.selectionManager = selectionManager;
  }

  get selection(): GridSelection {
    return this.selectionManager.selection;
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

  handleSelectionChange(selection: GridSelection): void {
    // updateSelections must be called before accessing lastChangeType
    this.selectionManager.updateSelections(selection);
    const lastType = this.selectionManager.lastChangeType;
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

  cellSelectedHandler(item: Item): void {
    if (!isMarkerClick(item)) {
      // don't bother wasting cycles if we don't have a handler
      if (!this.onItemSelected) {
        return;
      }
      const [colPos, rowPos] = item;
      const row = this.pageManager.getRow(rowPos);
      const cell = this.cellCache.get(row.rowUuid, colPos);
      this.onItemSelected({
        row,
        cell,
        displayData: cell.displayData,
        data: cell.data,
      });
    }
  }
}

export { EventManager };
export type { EventManagerProps };
