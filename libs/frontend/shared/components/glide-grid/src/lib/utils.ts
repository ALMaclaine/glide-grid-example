import { GridCell, GridCellKind, Item } from '@glideapps/glide-data-grid';
import type {
  GenTextCellProps,
  GenGridCellProps,
  Cell,
  Indexable,
  WrappedGridColumn,
} from './types';
import { GlideGridCellGenerator } from '@glide/frontend/shared/components/glide-grid';

function genGridCell<T extends Indexable>({
  data,
  displayData = data,
  allowOverlay = false,
  ...rest
}: GenGridCellProps<T>): Cell<T> {
  return {
    data,
    displayData,
    allowOverlay,
    ...rest,
  };
}

function genTextCell<T extends Indexable>(props: GenTextCellProps<T>): Cell<T> {
  return genGridCell({ kind: GridCellKind.Text, ...props });
}

function genGetCellContent<T extends Indexable>(
  columns: WrappedGridColumn<T>[],
  getData: (row: number) => T
): GlideGridCellGenerator {
  return ([col, row]: Item): GridCell => {
    const item = getData(row);
    if (col < columns.length) {
      const {
        cell: { data, displayData, ...rest },
      } = columns[col];

      return {
        ...rest,
        data: item[data],
        displayData: item[data],
      } as GridCell;
    } else {
      throw new Error();
    }
  };
}

export { genTextCell, genGridCell, genGetCellContent };
