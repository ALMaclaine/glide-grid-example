import { GridCell, GridCellKind, Item } from '@glideapps/glide-data-grid';
import type { Cell } from '../../types/grid';
import { SORT_TYPES } from '../sort/object-sort';

type GenGridCellProps<T> = {
  kind: GridCell['kind'];
  data: Cell<T>['data'];
} & Partial<Omit<Cell<T>, 'kind' | 'data'>>;

type GenTextCellProps<T> = Omit<GenGridCellProps<T>, 'kind'>;

type GenUriCellProps<T> = Omit<GenGridCellProps<T>, 'kind' | 'displayData'> &
  Pick<Cell<T>, 'displayData'>;

const genGridCell = <T>({
  data,
  displayData = data,
  allowOverlay = false,
  sortType = SORT_TYPES.natural,
  ...rest
}: GenGridCellProps<T>): Cell<T> => {
  return {
    data,
    displayData,
    allowOverlay,
    sortType,
    ...rest,
  };
};

const genTextCell = <T>(props: GenTextCellProps<T>): Cell<T> => {
  return genGridCell({ kind: GridCellKind.Text, ...props });
};

const genNumericCell = <T>(props: GenTextCellProps<T>): Cell<T> => {
  return genGridCell({
    kind: GridCellKind.Text,
    sortType: SORT_TYPES.numeric,
    ...props,
  });
};

const genUriCell = <T>(props: GenUriCellProps<T>): Cell<T> => {
  return genGridCell({ kind: GridCellKind.Uri, ...props });
};

export { genTextCell, genGridCell, genUriCell, genNumericCell };
export type { GenGridCellProps, GenTextCellProps, GenUriCellProps };
