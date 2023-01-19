import {
  EditableGridCell,
  GridCell,
  GridColumn,
  Item,
  UriCell,
} from '@glideapps/glide-data-grid';

type Cell<T> = Omit<GridCell, 'data' | 'displayData'> &
  Pick<UriCell, 'readonly'> & {
    data: keyof T;
    displayData: keyof T;
  };

type Indexable = Record<string, unknown>;

type WrappedGridColumn<T extends Indexable> = GridColumn & {
  cell: Cell<T>;
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

type GlideGridProps = {
  columns: GridColumn[];
  getCellContent: GlideGridCellGenerator;
  rows: number;
};

export type {
  Cell,
  Indexable,
  WrappedGridColumn,
  GenTextCellProps,
  GenGridCellProps,
  GlideGridProps,
  GlideGridCellGenerator,
  GenUriCellProps,
};
