import { GridCell, GridColumn, UriCell } from '@glideapps/glide-data-grid';
import type { Indexable } from './general';

type Cell<T> = Omit<GridCell, 'data'> &
  Pick<UriCell, 'readonly'> & {
    data: Extract<keyof T, string>;
    displayData: Extract<keyof T, string>;
  };

type WrappedGridColumn<T extends Indexable> = GridColumn & {
  cell: Cell<T>;
};

type IdRow<T extends Indexable> = T & {
  rowUuid: string;
};

export type { Cell, IdRow, WrappedGridColumn };
