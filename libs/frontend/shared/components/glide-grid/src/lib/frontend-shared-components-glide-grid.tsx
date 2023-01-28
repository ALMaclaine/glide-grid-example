import {
  DataEditor,
  GridMouseEventArgs,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';

import { useCallback, useMemo, useState } from 'react';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { addIdsToRows, noOp, noOpObj } from './utils/general';
import { useRowHoverHighlight } from './hooks/use-row-hover-highlight';
import { useGenGetCellContent } from './hooks/use-gen-get-cell-content';
import {
  useHeaderClicked,
  UseHeaderClickedProps,
} from './hooks/use-header-clicked';
import type { StringKeys } from './types/general';
import type { HeaderClickHandler, HoverHandler } from './types/func';
import type { ColumnsProps, RowsProps } from './types/props';
import { drawHeaderSort } from './utils/canvas/draw-helpers';
import { STATE_HISTORY_STEPS } from './constants';
import { RowCache } from './utils/caches/row-cache';
import { IdRow } from './types/grid';
import { TableSorter } from './utils/sort/table-sorter';
import { SortStateMachine, StateSet } from './utils/sort/sort-state-machine';

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

class Rows<T> {
  private readonly _rows: IdRow<T>[];
  private readonly cache: RowCache<T>;

  get rows() {
    return this._rows;
  }
  constructor(data: T[]) {
    this._rows = addIdsToRows(data);
    this.cache = new RowCache<T>(this.rows);
  }

  getRowById(id: string) {
    return this.cache.getRowById(id);
  }

  getRowByIndex(index: number) {
    return this.cache.getRowByIndex(index);
  }
}

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
  const rowClass = useMemo(() => new Rows(data), [data]);

  const getRowByIndex = useCallback(
    (row: number) => {
      return rowClass.getRowByIndex(row);
    },
    [rowClass]
  );

  const sorter = useMemo(
    () => new TableSorter({ originalData: rowClass.rows, columns }),
    [columns, rowClass.rows]
  );

  const stateMachine = useMemo(() => new SortStateMachine<T>(), []);
  const sortMachineNextToken = useCallback(
    (value: StringKeys<T>, steps: number) => {
      return stateMachine.nextValue(value, steps);
    },
    [stateMachine]
  );

  const getSortState: (steps: number) => StateSet<T>[] = useCallback(
    (steps: number) => {
      return stateMachine.getHistory(steps);
    },
    [stateMachine]
  );

  const [sorted, setSorted] = useState(rowClass.rows);
  const onHeaderClickSort = useCallback(
    (headerVal: StringKeys<T>) => {
      const stateHistory = sortMachineNextToken(headerVal, STATE_HISTORY_STEPS);

      const nextSorted = sorter.stateSort(stateHistory);
      setSorted(nextSorted);
    },
    [sortMachineNextToken, sorter]
  );

  const refreshSort = useCallback(() => setSorted((sorted) => [...sorted]), []);

  const onHeaderClickedIn = useCallback(
    (headerVal: StringKeys<T>) => {
      onHeaderClicked(headerVal);
      onHeaderClickSort(headerVal);
    },
    [onHeaderClickSort, onHeaderClicked]
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

  const { getCellContent } = useGenGetCellContent({
    columns,
    getRowByIndex,
    sorted,
    rows,
  });

  return (
    <div style={divStyles}>
      <DataEditor
        // width 100% needed otherwise grow/resizing animates slowly to fill extra width
        width="100%"
        columns={columns.getColumns()}
        // turns on copy support
        getCellsForSelection={true}
        getCellContent={getCellContent}
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
          refreshSort();
        }}
        onHeaderClicked={_onHeaderClicked}
        smoothScrollX={true}
        smoothScrollY={true}
        drawHeader={(args) => {
          drawHeaderSort(args, getSortState(STATE_HISTORY_STEPS));
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
