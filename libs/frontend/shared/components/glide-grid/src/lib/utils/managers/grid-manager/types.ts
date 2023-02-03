import type { StringKeys } from '../../../types/general';
import type {
  GridCell,
  GridColumn,
  GridMouseEventArgs,
  Rectangle,
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

type OnItemSelectedProps<T extends object> = {
  cell: CellPrototype<T>;
  row: IdRow<T>;
  displayData: number | string | Date;
  data: number | string | Date;
};

type OnItemSelectedHandler = <T extends object>(
  props: OnItemSelectedProps<T>
) => void;

type OnRowSelectedProps<T extends object> = {
  lastSelectedIndex: number;
  selectedIndices: number[];
  lastSelectedRow: IdRow<T>;
  selectedRows: IdRow<T>[];
};

type OnRowSelectedHandler = <T extends object>(
  props: OnRowSelectedProps<T>
) => void;

type OnColSelectedProps<T extends object> = {
  lastSelectedIndex: number;
  selectedIndices: number[];
  lastSelectedCol: CellPrototype<T>;
  selectedCols: CellPrototype<T>[];
};

type OnColSelectedHandler = <T extends object>(
  props: OnColSelectedProps<T>
) => void;

type OnAreaSelectedProps = {
  rect: Rectangle;
};

type OnAreaSelectedHandler = (props: OnAreaSelectedProps) => void;

type GridEventHandlers<T> = {
  onAreaSelected: OnAreaSelectedHandler;
  onRowSelected: OnRowSelectedHandler;
  onColSelected: OnColSelectedHandler;
  onItemSelected: OnItemSelectedHandler;
};

export type {
  GridEventHandlers,
  OnAreaSelectedProps,
  OnAreaSelectedHandler,
  OnRowSelectedHandler,
  OnRowSelectedProps,
  OnColSelectedProps,
  OnColSelectedHandler,
  OnItemSelectedHandler,
  OnItemSelectedProps,
  HoverHandler,
  HeaderClickHandler,
  IdColumn,
  IdRow,
  WrappedGridColumn,
  CellInstance,
  CellPrototype,
};
