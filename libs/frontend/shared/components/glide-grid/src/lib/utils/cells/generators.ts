import { GridCell, GridCellKind, Item } from '@glideapps/glide-data-grid';
import type { Indexable } from '../../types/general';
import type { Cell } from '../../types/grid';
import { SORT_TYPES } from '../sort/object-sort';

type GenGridCellProps<T extends Indexable> = {
  kind: GridCell['kind'];
  data: Cell<T>['data'];
} & Partial<Omit<Cell<T>, 'kind' | 'data'>>;

type GenTextCellProps<T extends Indexable> = Omit<GenGridCellProps<T>, 'kind'>;

type GenUriCellProps<T extends Indexable> = Omit<
  GenGridCellProps<T>,
  'kind' | 'displayData'
> &
  Pick<Cell<T>, 'displayData'>;

type GlideGridCellGenerator = (item: Item) => GridCell;

const genGridCell = <T extends Indexable>({
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

const genTextCell = <T extends Indexable>(
  props: GenTextCellProps<T>
): Cell<T> => {
  return genGridCell({ kind: GridCellKind.Text, ...props });
};

const genNumericCell = <T extends Indexable>(
  props: GenTextCellProps<T>
): Cell<T> => {
  return genGridCell({
    kind: GridCellKind.Text,
    sortType: SORT_TYPES.numeric,
    ...props,
  });
};

const genUriCell = <T extends Indexable>(
  props: GenUriCellProps<T>
): Cell<T> => {
  return genGridCell({ kind: GridCellKind.Uri, ...props });
};

export { genTextCell, genGridCell, genUriCell, genNumericCell };
export type {
  GenGridCellProps,
  GenTextCellProps,
  GlideGridCellGenerator,
  GenUriCellProps,
};
