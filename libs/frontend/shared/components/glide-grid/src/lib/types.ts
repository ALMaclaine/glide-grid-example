import {
  GridCell,
  GridColumn,
  GridMouseEventArgs,
  Item,
  UriCell,
} from '@glideapps/glide-data-grid';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';

type Cell<T> = Omit<GridCell, 'data'> &
  Pick<UriCell, 'readonly'> & {
    data: Extract<keyof T, string>;
    displayData: Extract<keyof T, string>;
  };

type Indexable = { [key: string]: unknown };

type WrappedGridColumn<T extends Indexable> = GridColumn & {
  cell: Cell<T>;
};

type ColumnsProps<T extends Indexable> = { columns: WrappedGridColumn<T>[] };

type IdRow<T extends Indexable> = T & {
  rowUuid: string;
};

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

type HoverHandler = (args: GridMouseEventArgs) => void;

type UserRowHoverHighlightReturn = {
  hoverRow: number;
  onItemHovered: HoverHandler;
  getRowThemeOverride: GetRowThemeCallback;
};

type RowGetter<T extends Indexable> = (uuid: string) => IdRow<T>;

type ObjectValues<T> = T[keyof T];

const SORT_STATES = {
  initial: 'initial',
  ascending: 'ascending',
  descending: 'descending',
} as const;

type SortStates = ObjectValues<typeof SORT_STATES>;

type RowIndexGetter<T extends Indexable> = (rowNumber: number) => IdRow<T>;

type RowIndexGetterProps<T extends Indexable> = {
  getRowByIndex: RowIndexGetter<T>;
};
type RowIdGetter<T extends Indexable> = (uuid: string) => IdRow<T>;

type ItemToGridCell = (item: Item) => GridCell;

type HeaderClickHandler = (n: string, col?: number) => void;
type HeaderClickProps = {
  onHeaderClicked: HeaderClickHandler;
};

export type {
  Cell,
  ColumnsProps,
  GenGridCellProps,
  GenTextCellProps,
  GenUriCellProps,
  GlideGridCellGenerator,
  HoverHandler,
  IdRow,
  Indexable,
  ItemToGridCell,
  RowGetter,
  RowIndexGetter,
  RowIndexGetterProps,
  HeaderClickHandler,
  HeaderClickProps,
  SORT_STATES,
  RowIdGetter,
  SortStates,
  UserRowHoverHighlightReturn,
  WrappedGridColumn,
};
