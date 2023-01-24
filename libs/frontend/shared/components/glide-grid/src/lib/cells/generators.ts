import { GridCell, GridCellKind, Item } from '@glideapps/glide-data-grid';
import type { Indexable } from '../types/general';
import type { Cell } from '../types/grid';

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
  ...rest
}: GenGridCellProps<T>): Cell<T> => {
  return {
    data,
    displayData,
    allowOverlay,
    ...rest,
  };
};

const genTextCell = <T extends Indexable>(
  props: GenTextCellProps<T>
): Cell<T> => {
  return genGridCell({ kind: GridCellKind.Text, ...props });
};

const genUriCell = <T extends Indexable>(
  props: GenUriCellProps<T>
): Cell<T> => {
  return genGridCell({ kind: GridCellKind.Uri, ...props });
};

export { genTextCell, genGridCell, genUriCell };
export type {
  GenGridCellProps,
  GenTextCellProps,
  GlideGridCellGenerator,
  GenUriCellProps,
};
