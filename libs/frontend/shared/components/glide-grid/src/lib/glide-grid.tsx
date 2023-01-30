import {
  DataEditor,
  GridMouseEventArgs,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';

import { useCallback, useState } from 'react';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { noOp, noOpObj } from './utils/general';
import { useRowHoverHighlight } from './hooks/use-row-hover-highlight';
import type { HeaderClickHandler, HoverHandler } from './types/func';
import { drawHeaderSort } from './utils/canvas/draw-helpers';
import { STATE_HISTORY_STEPS } from './constants';
import { GridManager } from './utils/grid-manager';

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
  bgHeaderHovered: '#f3f0ff',
  bgBubble: '#f3f0ff',
  bgBubbleSelected: '#e2dbff',
  bgSearchResult: '#f3f0ff',
  borderColor: '#e9e9e9',
  linkColor: '#5843be',
  cellHorizontalPadding: 12,
  cellVerticalPadding: 10,
};

type GlideGridProps<T> = {
  onItemHovered?: HoverHandler;
  gridManager: GridManager<T>;
  getRowThemeOverride?: GetRowThemeCallback;
  onHeaderClicked?: HeaderClickHandler;
};

function GlideGrid<T>({
  gridManager,
  onItemHovered = noOp,
  getRowThemeOverride = noOpObj,
  onHeaderClicked = noOp,
}: GlideGridProps<T>) {
  const [, _refresh] = useState([]);
  const refresh = useCallback(() => _refresh([]), []);

  const _onHeaderClicked = useCallback(
    (col: number) => {
      const selectedHeader = gridManager.getHeaderKey(col);
      gridManager.nextSortKey(selectedHeader);
      onHeaderClicked(selectedHeader);
    },
    [gridManager, onHeaderClicked]
  );

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
        columns={gridManager.getColumns()}
        // turns on copy support
        getCellsForSelection={true}
        getCellContent={(item: Item) => gridManager.itemToCell(item)}
        onCellClicked={(item: Item) => {
          // const { kind, ...rest } = getCellContent(item);
          // if (kind === 'uri') {
          //   // TODO: use type guard
          //   const { data } = rest as UriCell;
          //   window.alert('Navigating to: ' + data);
          // }
        }}
        onColumnMoved={(col1, col2) => {
          gridManager.swap(col1, col2);
          refresh();
        }}
        onHeaderClicked={_onHeaderClicked}
        smoothScrollX={true}
        smoothScrollY={true}
        drawHeader={(args) => {
          drawHeaderSort(args, gridManager.getSortHistory(STATE_HISTORY_STEPS));
          return false;
        }}
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
