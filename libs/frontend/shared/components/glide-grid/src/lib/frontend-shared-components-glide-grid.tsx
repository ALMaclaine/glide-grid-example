import {
  DataEditor,
  GridMouseEventArgs,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';

import { useCallback, useMemo, useState } from 'react';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { noOp, noOpObj } from './utils/general';
import { useRowHoverHighlight } from './hooks/use-row-hover-highlight';
import {
  useHeaderClicked,
  UseHeaderClickedProps,
} from './hooks/use-header-clicked';
import type { StringKeys } from './types/general';
import type { HeaderClickHandler, HoverHandler } from './types/func';
import type { ColumnsProps, RowsProps } from './types/props';
import { drawHeaderSort } from './utils/canvas/draw-helpers';
import { STATE_HISTORY_STEPS } from './constants';
import { RowsManager } from './rows-manager';

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
  onItemHovered: HoverHandler;
  data: T[];
  getRowThemeOverride: GetRowThemeCallback;
  onHeaderClicked: HeaderClickHandler;
} & ColumnsProps<T> &
  RowsProps;

function GlideGrid<T>({
  columns,
  data,
  rows,
  onItemHovered = noOp,
  getRowThemeOverride = noOpObj,
  onHeaderClicked = noOp,
}: GlideGridProps<T>) {
  const [, _refresh] = useState([]);
  const refresh = useCallback(() => _refresh([]), []);

  const rowManager = useMemo(
    () => new RowsManager(data, columns),
    [columns, data]
  );

  const onHeaderClickedIn = useCallback(
    (headerVal: StringKeys<T>) => {
      onHeaderClicked(headerVal);
      rowManager.nextSortKey(headerVal);
      refresh();
    },
    [onHeaderClicked, refresh, rowManager]
  );

  const { onHeaderClicked: _onHeaderClicked } = useHeaderClicked({
    columns,
    onHeaderClicked: onHeaderClickedIn,
  } as UseHeaderClickedProps<T>);

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
        columns={columns.getColumns()}
        // turns on copy support
        getCellsForSelection={true}
        getCellContent={(item: Item) => rowManager.itemToCell(item)}
        onCellClicked={(item: Item) => {
          // const { kind, ...rest } = getCellContent(item);
          // if (kind === 'uri') {
          //   // TODO: use type guard
          //   const { data } = rest as UriCell;
          //   window.alert('Navigating to: ' + data);
          // }
        }}
        onColumnMoved={(col1, col2) => {
          columns.swap(col1, col2);
          refresh();
        }}
        onHeaderClicked={_onHeaderClicked}
        smoothScrollX={true}
        smoothScrollY={true}
        drawHeader={(args) => {
          drawHeaderSort(
            args,
            rowManager.stateMachine.getHistory(STATE_HISTORY_STEPS)
          );
          return false;
        }}
        theme={theme}
        onItemHovered={_onItemHovered}
        getRowThemeOverride={_getRowThemeOverride}
        rows={rows}
      />
    </div>
  );
}

export { GlideGrid };
export type { GlideGridProps };
