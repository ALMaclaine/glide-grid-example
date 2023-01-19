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
  getData: GlideGridCellGenerator;
  rows: number;
};

function GlideGrid({ columns, getData, rows }: GlideGridProps) {
  return (
    <DataEditor
      overscrollX={0}
      overscrollY={0}
      columns={columns}
      getCellContent={getData}
      rows={rows}
    />
  );
}

export { GlideGrid, GlideGridProps };
