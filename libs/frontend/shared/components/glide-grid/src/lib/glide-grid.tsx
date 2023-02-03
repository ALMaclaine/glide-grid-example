import type {
  DrawHeaderCallback,
  GridMouseEventArgs,
  GridSelection,
  Item,
} from '@glideapps/glide-data-grid';
import { DataEditor } from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';

import { useCallback, useState } from 'react';
import type { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { noOp, noOpObj } from './utils/general';
import { useRowHoverHighlight } from './hooks/use-row-hover-highlight';
import { drawHeaderSort } from './utils/canvas/draw-helpers';
import { STATE_HISTORY_STEPS } from './constants';
import type { GridManager } from './utils/managers/grid-manager/grid-manager';
import type { HoverHandler } from './utils/managers/grid-manager/types';

const divStyles = {
  border: '1px solid #e9e9e9',
  borderRadius: '4px',
  height: '100%',
  overflow: 'hidden',
};

const theme = {
  accentColor: '#e2dbff',
  accentLight: '#f8f6ff',
  textDark: '#0e0e2c',
  textMedium: '#7e7f9b',
  textLight: '#adaec8',
  textBubble: '#03032c',
  bgIconHeader: '#f9f8f8',
  fgIconHeader: '#cccccc',
  textHeader: '#0e0e2c',
  textGroupHeader: '#0e0e2c',
  textHeaderSelected: '#0e0e2c',
  bgCell: '#ffffff',
  bgCellMedium: '#ffffff',
  bgHeader: '#f9f8f8',
  bgHeaderHasFocus: '#e2dbff',
  headerFontStyle: '300 12px',
  baseFontStyle: '400 13px',
  fontFamily: 'Inter, sans-serif',
  bgHeaderHovered: '#f3f0ff',
  bgBubble: '#f3f0ff',
  bgBubbleSelected: '#e2dbff',
  bgSearchResult: '#f3f0ff',
  borderColor: '#e9e9e9',
  linkColor: '#5843be',
  cellHorizontalPadding: 12,
  cellVerticalPadding: 10,
};

type GlideGridProps<T extends object> = {
  onItemHovered?: HoverHandler;
  gridManager: GridManager<T>;
  getRowThemeOverride?: GetRowThemeCallback;
};

const useGridManager = <T extends object>(gridManager: GridManager<T>) => {
  const [, _refresh] = useState([]);
  const refresh = useCallback(() => _refresh([]), []);

  const onColumnMoved = useCallback(
    (col1: number, col2: number) => {
      gridManager.swap(col1, col2);
      refresh();
    },
    [gridManager, refresh]
  );

  const onHeaderClicked = useCallback(
    (col: number) => {
      gridManager.onHeaderClickedHandler(col);
      refresh();
    },
    [gridManager, refresh]
  );

  const getCellContent = useCallback(
    (item: Item) => gridManager.itemToCell(item),
    [gridManager]
  );

  const onCellClicked = useCallback(
    (itemPos: Item) => {
      gridManager.cellSelectedHandler(itemPos);
    },
    [gridManager]
  );

  const onGridSelectionChanged = useCallback(
    (selection: GridSelection) => {
      gridManager.handleSelectionChange(selection);
      refresh();
    },
    [gridManager, refresh]
  );

  const drawHeader = useCallback<DrawHeaderCallback>(
    (args) => {
      if (args.columnIndex === -1) {
        return false;
      }
      drawHeaderSort(args, gridManager.getSortHistory(STATE_HISTORY_STEPS));
      return true;
    },
    [gridManager]
  );

  return {
    onColumnMoved,
    onGridSelectionChanged,
    onHeaderClicked,
    onCellClicked,
    getCellContent,
    drawHeader,
  };
};

function GlideGrid<T extends object>({
  gridManager,
  onItemHovered = noOp,
  getRowThemeOverride = noOpObj,
}: GlideGridProps<T>) {
  const {
    onColumnMoved,
    onGridSelectionChanged,
    onHeaderClicked,
    onCellClicked,
    getCellContent,
    drawHeader,
  } = useGridManager(gridManager);

  const {
    onItemHovered: onItemHoveredHighlight,
    getRowThemeOverride: getRowHoveredThemeOverride,
  } = useRowHoverHighlight();

  const _onItemHovered = useCallback(
    (args: GridMouseEventArgs) => {
      onItemHoveredHighlight(args);
      onItemHovered(args);
    },
    [onItemHovered, onItemHoveredHighlight]
  );

  const _getRowThemeOverride = useCallback<GetRowThemeCallback>(
    (row) => {
      return {
        ...getRowThemeOverride(row),
        ...getRowHoveredThemeOverride(row),
      };
    },
    [getRowHoveredThemeOverride, getRowThemeOverride]
  );

  return (
    <div style={divStyles}>
      <DataEditor
        // width 100% needed otherwise grow/resizing animates slowly to fill extra width
        width="100%"
        freezeColumns={1}
        // turns on copy support
        getCellsForSelection={true}
        smoothScrollX={true}
        smoothScrollY={true}
        rowMarkers="both"
        columns={gridManager.getColumns()}
        gridSelection={gridManager.selection}
        onGridSelectionChange={onGridSelectionChanged}
        getCellContent={getCellContent}
        onCellClicked={onCellClicked}
        onColumnMoved={onColumnMoved}
        onHeaderClicked={onHeaderClicked}
        drawHeader={drawHeader}
        theme={theme}
        onItemHovered={_onItemHovered}
        getRowThemeOverride={_getRowThemeOverride}
        rows={gridManager.length}
      />
    </div>
  );
}

export { GlideGrid };
export type { GlideGridProps };
