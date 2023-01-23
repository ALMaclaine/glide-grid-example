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
    data: keyof T;
    displayData: keyof T;
  };

type Indexable = Record<string, unknown>;

type WrappedGridColumn<T extends Indexable> = GridColumn & {
  cell: Cell<T>;
};

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

type GlideGridProps<T extends Indexable> = {
  columns: WrappedGridColumn<T>[];
  rows: number;
  onItemHovered: HoverHandler;
  data: T[];
  getRowThemeOverride: GetRowThemeCallback;
};

type RowGetter<T extends Indexable> = (row: number) => IdRow<T>;

export type {
  Cell,
  GenGridCellProps,
  GenTextCellProps,
  GenUriCellProps,
  GlideGridCellGenerator,
  GlideGridProps,
  HoverHandler,
  IdRow,
  Indexable,
  RowGetter,
  UserRowHoverHighlightReturn,
  WrappedGridColumn,
};
