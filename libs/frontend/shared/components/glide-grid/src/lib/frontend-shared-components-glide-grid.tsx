import {
  DataEditor,
  GridMouseEventArgs,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import { GlideGridProps } from './types';
import { useCallback, useState } from 'react';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';

function GlideGrid({ columns, getCellContent, rows }: GlideGridProps) {
  const [hoverRow, setHoverRow] = useState<number | undefined>(undefined);

  const onItemHovered = useCallback((args: GridMouseEventArgs) => {
    const [, row] = args.location;
    setHoverRow(args.kind !== 'cell' ? undefined : row);
  }, []);

  const getRowThemeOverride = useCallback<GetRowThemeCallback>(
    (row) => {
      if (row !== hoverRow) return undefined;
      return {
        bgCell: '#f7f7f7',
        bgCellMedium: '#f0f0f0',
      };
    },
    [hoverRow]
  );

  return (
    <DataEditor
      // width 100% needed otherwise grow/resizing animates slowly to fill extra width
      width="100%"
      verticalBorder={false}
      columns={columns}
      getCellsForSelection={true}
      getCellContent={getCellContent}
      onCellClicked={(item: Item) => {
        const { kind, ...rest } = getCellContent(item);
        if (kind === 'uri') {
          const { data } = rest;
          window.alert('Navigating to: ' + data);
        }
      }}
      smoothScrollX={true}
      smoothScrollY={true}
      onItemHovered={onItemHovered}
      getRowThemeOverride={getRowThemeOverride}
      rows={rows}
    />
  );
}

export { GlideGrid, GlideGridProps };
