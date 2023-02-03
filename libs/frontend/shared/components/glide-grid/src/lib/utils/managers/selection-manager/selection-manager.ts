import {
  CompactSelection,
  GridSelection,
  Rectangle,
} from '@glideapps/glide-data-grid';
import LastSelectionChangeType from './types';
import LAST_SELECTION_CHANGE_TYPE from './types';

class SelectionManager {
  private columnSelections = CompactSelection.empty();
  private rowsSelections = CompactSelection.empty();
  private currentSelections?: GridSelection['current'];
  private _selectedRows: number[] = [];
  private _selectedColumns: number[] = [];
  private _selectedRect?: Rectangle;

  get selection(): GridSelection {
    return {
      columns: this.columnSelections,
      rows: this.rowsSelections,
      current: this.currentSelections,
    };
  }

  get lastChangeType(): LastSelectionChangeType {
    // at time of writing, these events are mutually exclusive
    if (this._selectedRect !== undefined) {
      return LAST_SELECTION_CHANGE_TYPE.rect;
    } else if (this._selectedRows.length > 0) {
      return LAST_SELECTION_CHANGE_TYPE.rows;
    } else if (this._selectedColumns.length > 0) {
      return LAST_SELECTION_CHANGE_TYPE.columns;
    } else {
      throw new Error('Should not occur');
    }
  }

  get selectedRows(): number[] {
    return this._selectedRows;
  }

  get selectedColumns(): number[] {
    return this._selectedColumns;
  }

  get selectedRect(): Rectangle | undefined {
    return this._selectedRect;
  }

  updateSelections(selection: GridSelection) {
    this.columnSelections = selection.columns;
    this._selectedColumns = selection.columns.toArray();
    this.rowsSelections = selection.rows;
    this._selectedRows = selection.rows.toArray();
    this.currentSelections = selection.current;
    this._selectedRect = selection.current?.range;
  }
}

export { SelectionManager };
