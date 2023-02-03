import type { GridCell } from '@glideapps/glide-data-grid';
import { GridCellKind } from '@glideapps/glide-data-grid';
import { SORT_TYPES } from '../sort/object-sort';
import { uuid } from '../general';
import type { ObjectValues } from '../../types/general';
import type {
  CellPrototype,
  WrappedGridColumn,
} from '../managers/grid-manager/types';

type GenGridCellBaseProps<T extends object> = {
  kind: GridCell['kind'];
  dataId: CellPrototype<T>['dataId'];
} & Partial<Omit<CellPrototype<T>, 'kind' | 'data'>>;

type GenGridCellProps<T extends object> = Omit<GenGridCellBaseProps<T>, 'kind'>;

const GENERATOR_TYPES = {
  uri: 'uri',
  text: 'text',
  numeric: 'numeric',
} as const;

type GeneratorTypes = ObjectValues<typeof GENERATOR_TYPES>;

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
  cellType: GeneratorTypes;
  grow?: number;
  width?: number;
  shouldSort?: boolean;
};

const cellTypeToGenerator = <T extends object>(
  type: GeneratorTypes
): CellGenerator<T> => {
  switch (type) {
    case GENERATOR_TYPES.uri:
      return genUriCell;
    case GENERATOR_TYPES.text:
      return genTextCell;
    case GENERATOR_TYPES.numeric:
      return genNumericCell;
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _default: never = type;
      return genTextCell;
    }
  }
};

const generateWrappedColumn = <T extends object>({
  title,
  displayDataId,
  dataId,
  themeOverride,
  cursor,
  cellType,
  grow,
  shouldSort = false,
  width,
  contentAlign,
}: GenerateWrappedColumnProps<T>): WrappedGridColumn<T> => ({
  title,
  id: displayDataId || dataId,
  columnUuid: uuid(),
  grow,
  ...(width ? { width } : {}), // source types are complicated, hard to get this typed correctly
  shouldSort,
  cell: cellTypeToGenerator<T>(cellType)({
    dataId,
    themeOverride,
    cursor,
    contentAlign,
  }),
});

export {
  genTextCell,
  genGridCell,
  genUriCell,
  genNumericCell,
  generateWrappedColumn,
};

export type {
  GenGridCellProps,
  GenerateWrappedColumnProps,
  CellGenerator,
  GeneratorTypes,
};
export { GENERATOR_TYPES };
