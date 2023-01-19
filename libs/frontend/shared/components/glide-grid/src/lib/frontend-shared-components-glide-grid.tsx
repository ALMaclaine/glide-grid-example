import styles from './frontend-shared-components-glide-grid.module.css';
import {
  DataEditor,
  GridCell,
  GridColumn,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { useCallback } from 'react';

type GlideGridCellGenerator = (item: Item) => GridCell;

type GlideGridProps = {
  columns: GridColumn[];
  getCellContent: GlideGridCellGenerator;
  rows: number;
};

function GlideGrid({ columns, getCellContent, rows }: GlideGridProps) {
  const getRowThemeOverride = useCallback<GetRowThemeCallback>((row) => {
    console.log(row);
    return undefined;
  }, []);
  return (
    <DataEditor
      verticalBorder={true}
      columns={columns}
      getCellsForSelection={true}
      getRowThemeOverride={getRowThemeOverride}
      onCellClicked={(cell, event) => {
        const out = getCellContent(cell);
        console.log(out);
        // if (data === 'Alex') {
        //   window.location = 'www.reddit.com';
        // }
      }}
      getCellContent={getCellContent}
      rows={rows}
    />
  );
}

export { GlideGrid, GlideGridProps, GlideGridCellGenerator };
