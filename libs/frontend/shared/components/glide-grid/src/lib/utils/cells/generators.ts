import type { GridCell } from '@glideapps/glide-data-grid';
import { GridCellKind } from '@glideapps/glide-data-grid';
import type { CellPrototype, WrappedGridColumn } from '../../types/grid';
import { SORT_TYPES } from '../sort/object-sort';
import { uuid } from '../general';

type GenGridCellBaseProps<T extends object> = {
  kind: GridCell['kind'];
  dataId: CellPrototype<T>['dataId'];
} & Partial<Omit<CellPrototype<T>, 'kind' | 'data'>>;

type GenGridCellProps<T extends object> = Omit<GenGridCellBaseProps<T>, 'kind'>;

const genGridCell = <T extends object>({
  dataId,
  displayDataId = dataId,
  allowOverlay = false,
  sortType = SORT_TYPES.natural,
  ...rest
}: GenGridCellBaseProps<T>): CellPrototype<T> => {
  return {
    dataId,
    displayDataId,
    allowOverlay,
    sortType,
    ...rest,
  };
};

const genTextCell = <T extends object>(
  props: GenGridCellProps<T>
): CellPrototype<T> => {
  return genGridCell({ ...props, kind: GridCellKind.Text });
};

const genNumericCell = <T extends object>(
  props: GenGridCellProps<T>
): CellPrototype<T> => {
  return genGridCell({
    ...props,
    sortType: SORT_TYPES.numeric,
    kind: GridCellKind.Number,
  });
};

const genUriCell = <T extends object>(
  props: GenGridCellProps<T>
): CellPrototype<T> => {
  return genGridCell({
    ...props,
    kind: GridCellKind.Uri,
    cursor: 'pointer',
    themeOverride: {
      ...props.themeOverride,
      textDark: '#5843be',
    },
  });
};

type CellGenerator<T extends object> = (
  props: GenGridCellProps<T>
) => CellPrototype<T>;

type GenerateWrappedColumnProps<T extends object> = GenGridCellProps<T> & {
  title: string;
  cellGen: CellGenerator<T>;
  grow?: number;
  shouldSort?: boolean;
};

const generateWrappedColumn = <T extends object>({
  title,
  displayDataId,
  dataId,
  themeOverride,
  cursor,
  cellGen,
  grow,
  shouldSort = false,
  contentAlign,
}: GenerateWrappedColumnProps<T>): WrappedGridColumn<T> => ({
  title,
  id: displayDataId || dataId,
  columnUuid: uuid(),
  grow,
  shouldSort,
  cell: cellGen({ dataId, themeOverride, cursor, contentAlign }),
});

export {
  genTextCell,
  genGridCell,
  genUriCell,
  genNumericCell,
  generateWrappedColumn,
};
export type { GenGridCellProps, GenerateWrappedColumnProps, CellGenerator };
