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
import { LAST_SELECTION_CHANGE_TYPE } from './selection-manager/types';
import type { Item } from '@glideapps/glide-data-grid';
import type { SelectionManager } from './selection-manager/selection-manager';
import type { DataManager } from './data-manager';

type EventManagerEventProps = {
  eventHandlers?: GridEventHandlers;
};

type EventManagerProps<T extends object> = EventManagerEventProps & {
  dataManager: DataManager<T>;
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
  private readonly onHeaderClicked?: OnHeaderClickHandler;
  private readonly columnsManager: ColumnsManager<T>;
  private readonly dataManager: DataManager<T>;
  private readonly selectionManager: SelectionManager;

  constructor({
    columnsManager,
    eventHandlers: {
      onAreaSelected,
      onColSelected,
      onHeaderClicked,
      onItemSelected,
      onRowSelected,
    } = {},
    dataManager,
    selectionManager,
  }: EventManagerProps<T>) {
    this.columnsManager = columnsManager;
    this.onAreaSelected = onAreaSelected;
    this.onColSelected = onColSelected;
    this.onHeaderClicked = onHeaderClicked;
    this.onItemSelected = onItemSelected;
    this.onRowSelected = onRowSelected;
    this.dataManager = dataManager;
    this.selectionManager = selectionManager;
  }

  get selection(): GridSelection {
    return this.selectionManager.selection;
  }

  onHeaderClickedHandler(col: number) {
    const selectedHeader = this.columnsManager.getHeaderKey(col);
    this.dataManager.nextSortKey(selectedHeader);
    this.onHeaderClicked?.(selectedHeader);
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
    const lastSelectedRow = this.dataManager.getRow(lastSelectedIndex);
    const selectedIndices = selection.rows.toArray();
    const selectedRows = selectedIndices.map((index) =>
      this.dataManager.getRow(index)
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
      const row = this.dataManager.getRow(rowPos);
      const cell = this.dataManager.getCell(row.rowUuid, colPos);
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
export type { EventManagerProps, EventManagerEventProps };
