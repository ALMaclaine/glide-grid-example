import { GridCell, GridColumn } from '@glideapps/glide-data-grid';

type Cell<T> = Omit<GridCell, 'data' | 'displayData'> & {
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

export type {
  Cell,
  Indexable,
  WrappedGridColumn,
  GenTextCellProps,
  GenGridCellProps,
};
