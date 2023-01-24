import { GridCell, GridCellKind, Item } from '@glideapps/glide-data-grid';
import type {
  GenTextCellProps,
  GenGridCellProps,
  Cell,
  Indexable,
  WrappedGridColumn,
  GenUriCellProps,
  IdRow,
} from './types';
import { GlideGridCellGenerator } from './types';
import { v4 as uuid } from 'uuid';

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

function genUriCell<T extends Indexable>(props: GenUriCellProps<T>): Cell<T> {
  return genGridCell({ kind: GridCellKind.Uri, ...props });
}

function genGetCellContent<T extends Indexable>(
  columns: WrappedGridColumn<T>[],
  getDataByIndex: (row: number) => IdRow<T>
): GlideGridCellGenerator {
  return ([col, row]: Item): GridCell => {
    const item = getDataByIndex(row);
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
      throw new Error("Attempting to access a column that doesn't exist");
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOpObj = () => ({});

const addIdToRow = <T extends Indexable>(row: T): IdRow<T> => {
  // mutate directly to avoid performance issues on large tables
  const changeType = row as IdRow<T>;
  changeType.rowUuid = uuid();
  return changeType;
};

export {
  addIdToRow,
  genTextCell,
  genGridCell,
  genGetCellContent,
  genUriCell,
  noOp,
  noOpObj,
};
