import {
  Cell,
  GenGridCellProps,
  GenTextCellProps,
  GenUriCellProps,
  Indexable,
} from '../types';
import { GridCellKind } from '@glideapps/glide-data-grid';

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
