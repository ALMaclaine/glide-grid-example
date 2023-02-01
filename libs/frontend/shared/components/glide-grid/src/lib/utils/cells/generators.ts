import type { GridCell } from '@glideapps/glide-data-grid';
import { GridCellKind } from '@glideapps/glide-data-grid';
import type { Cell, WrappedGridColumn } from '../../types/grid';
import { SORT_TYPES } from '../sort/object-sort';
import { uuid } from '../general';

type GenGridCellBaseProps<T> = {
  kind: GridCell['kind'];
  data: Cell<T>['data'];
} & Partial<Omit<Cell<T>, 'kind' | 'data'>>;

type GenGridCellProps<T> = Omit<GenGridCellBaseProps<T>, 'kind'>;

const genGridCell = <T>({
  data,
  displayData = data,
  allowOverlay = false,
  sortType = SORT_TYPES.natural,
  ...rest
}: GenGridCellBaseProps<T>): Cell<T> => {
  return {
    data,
    displayData,
    allowOverlay,
    sortType,
    ...rest,
  };
};

const genTextCell = <T>(props: GenGridCellProps<T>): Cell<T> => {
  return genGridCell({ ...props, kind: GridCellKind.Text });
};

const genNumericCell = <T>(props: GenGridCellProps<T>): Cell<T> => {
  return genGridCell({
    ...props,
    sortType: SORT_TYPES.numeric,
    kind: GridCellKind.Number,
  });
};

const genUriCell = <T>(props: GenGridCellProps<T>): Cell<T> => {
  return genGridCell({ ...props, kind: GridCellKind.Uri });
};

type CellGenerator<T> = (props: GenGridCellProps<T>) => Cell<T>;

type GenerateWrappedColumnProps<T> = GenGridCellProps<T> & {
  title: string;
  cellGen: CellGenerator<T>;
  grow?: number;
};

const generateWrappedColumn = <T>({
  title,
  displayData,
  data,
  themeOverride,
  cursor,
  cellGen,
  grow,
  contentAlign,
}: GenerateWrappedColumnProps<T>): WrappedGridColumn<T> => ({
  title,
  id: displayData || data,
  columnUuid: uuid(),
  grow,
  cell: cellGen({ data, themeOverride, cursor, contentAlign }),
});

export {
  genTextCell,
  genGridCell,
  genUriCell,
  genNumericCell,
  generateWrappedColumn,
};
export type { GenGridCellProps, GenerateWrappedColumnProps, CellGenerator };
