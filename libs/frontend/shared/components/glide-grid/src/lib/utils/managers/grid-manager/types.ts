import type { StringKeys } from '../../../types/general';
import type {
  GridCell,
  GridColumn,
  GridMouseEventArgs,
  UriCell,
} from '@glideapps/glide-data-grid';
import type { SortTypes } from '../../sort/object-sort';

type HeaderClickHandler = <T extends object>(
  headerVal: StringKeys<T>,
  col?: number
) => void;

type HoverHandler = (args: GridMouseEventArgs) => void;

type CellPrototype<T extends object> = Omit<GridCell, 'data'> &
  Pick<UriCell, 'readonly'> & {
    dataId: StringKeys<T>;
    displayDataId: StringKeys<T>;
    sortType: SortTypes;
  };

type CellInstance<T extends object> = CellPrototype<T> & {
  data: string | number | Date;
  displayData: string | number | Date;
};

type WrappedGridColumn<T extends object> = IdColumn<
  Omit<GridColumn, 'id'> & {
    id: StringKeys<T>;
  } & {
    cell: CellPrototype<T>;
    shouldSort: boolean;
  }
>;

type IdRow<T extends object> = T & {
  rowUuid: string;
};

type IdColumn<T extends object> = T & {
  columnUuid: string;
};

type OnItemClickedProps<T extends object> = {
  cell: CellPrototype<T>;
  row: IdRow<T>;
};

type OnItemClickedHandler = <T extends object>(
  props: OnItemClickedProps<T>
) => void;

type OnRowClickedProps<T extends object> = {
  lastSelectedIndex: number;
  selectedIndices: number[];
  lastSelectedRow: IdRow<T>;
  selectedRows: IdRow<T>;
};

type OnRowClickedHandler = <T extends object>(
  props: OnRowClickedProps<T>
) => void;

export type {
  OnRowClickedHandler,
  OnRowClickedProps,
  OnItemClickedHandler,
  OnItemClickedProps,
  HoverHandler,
  HeaderClickHandler,
  IdColumn,
  IdRow,
  WrappedGridColumn,
  CellInstance,
  CellPrototype,
};
