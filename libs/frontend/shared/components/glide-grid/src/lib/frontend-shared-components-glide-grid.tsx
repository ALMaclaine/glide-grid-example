import {
  DataEditor,
  GridMouseEventArgs,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import type { GlideGridProps, Indexable } from './types';
import { useCallback } from 'react';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { noOp, noOpObj } from './utils';
import { useRowHoverHighlight } from './hooks/use-row-hover-highlight';
import { useSetupData } from './hooks/use-setup-data';
import { useGenGetCellContent } from './hooks/use-gen-get-cell-content';

function GlideGrid<T extends Indexable>({
  columns,
  data,
  rows,
  onItemHovered = noOp,
  getRowThemeOverride = noOpObj,
}: GlideGridProps<T>) {
  const { getRow } = useSetupData(data);

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

  const { getCellContent } = useGenGetCellContent({ columns, getRow });

  return (
    <DataEditor
      // width 100% needed otherwise grow/resizing animates slowly to fill extra width
      width="100%"
      verticalBorder={false}
      columns={columns}
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
      smoothScrollX={true}
      smoothScrollY={true}
      onItemHovered={_onItemHovered}
      getRowThemeOverride={_getRowThemeOverride}
      rows={rows}
    />
  );
}

export { GlideGrid, GlideGridProps };
