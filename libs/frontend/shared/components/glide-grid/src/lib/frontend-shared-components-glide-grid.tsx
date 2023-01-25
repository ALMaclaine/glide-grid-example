import {
  DataEditor,
  GridMouseEventArgs,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';

import { useCallback } from 'react';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { noOp, noOpObj } from './utils/general';
import { useRowHoverHighlight } from './hooks/use-row-hover-highlight';
import { useSetupData } from './hooks/use-setup-data';
import { useGenGetCellContent } from './hooks/use-gen-get-cell-content';
import { useAddIds } from './hooks/use-add-ids';
import {
  useHeaderClicked,
  UseHeaderClickedProps,
} from './hooks/use-header-clicked';
import type { Indexable, StringKeys } from './types/general';
import type { HeaderClickHandler, HoverHandler } from './types/func';
import type { ColumnsProps, RowsProps } from './types/props';
import { useSort } from './hooks/use-sort';

type GlideGridProps<T extends Indexable> = {
  onItemHovered: HoverHandler;
  data: T[];
  getRowThemeOverride: GetRowThemeCallback;
  onHeaderClicked: HeaderClickHandler;
} & ColumnsProps<T> &
  RowsProps;

function GlideGrid<T extends Indexable>({
  columns,
  data,
  rows,
  onItemHovered = noOp,
  getRowThemeOverride = noOpObj,
  onHeaderClicked = noOp,
}: GlideGridProps<T>) {
  const { dataWithIds } = useAddIds(data);
  const { getRowByIndex } = useSetupData(dataWithIds);
  const { sorted, onHeaderClickSort } = useSort({
    originalData: dataWithIds,
    columns,
  });

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
    <DataEditor
      // width 100% needed otherwise grow/resizing animates slowly to fill extra width
      width="100%"
      verticalBorder={false}
      columns={columns}
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
      onHeaderClicked={_onHeaderClicked}
      smoothScrollX={true}
      smoothScrollY={true}
      theme={{
        accentColor: '#e1dbfc',
        accentLight: '#f8f7fe',
        textHeaderSelected: '#3d3c5a',
      }}
      onItemHovered={_onItemHovered}
      getRowThemeOverride={_getRowThemeOverride}
      rows={rows}
    />
  );
}

export { GlideGrid };
export type { GlideGridProps };
