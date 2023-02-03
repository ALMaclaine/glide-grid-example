import { useCallback, useState } from 'react';
import { GridMouseEventArgs } from '@glideapps/glide-data-grid';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { HoverHandler } from '../utils/managers/grid-manager/types';

type UseRowHoverHighlightReturn = {
  hoverRow: number;
  onItemHovered: HoverHandler;
  getRowThemeOverride: GetRowThemeCallback;
};

const useRowHoverHighlight: () => UseRowHoverHighlightReturn = () => {
  const [hoverRow, setHoverRow] = useState<number>(-1);

  const onItemHovered = useCallback((args: GridMouseEventArgs) => {
    const row = args.location[1];
    setHoverRow(args.kind !== 'cell' ? -1 : row);
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
  return { hoverRow, onItemHovered, getRowThemeOverride };
};

export { useRowHoverHighlight };
export type { UseRowHoverHighlightReturn };
