import styles from './frontend-shared-components-glide-grid.module.css';
import {
  DataEditor,
  GridCell,
  GridColumn,
  Item,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';

type GlideGridCellGenerator = (item: Item) => GridCell;

type GlideGridProps = {
  columns: GridColumn[];
  getCellContent: GlideGridCellGenerator;
  rows: number;
};

function GlideGrid({ columns, getCellContent, rows }: GlideGridProps) {
  return (
    <DataEditor
      verticalBorder={false}
      columns={columns}
      getCellsForSelection={true}
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
