import { GridCell, GridColumn, UriCell } from '@glideapps/glide-data-grid';
import type { StringKeys } from './general';
import type { SortTypes } from '../utils/sort/object-sort';

type Cell<T> = Omit<GridCell, 'data'> &
  Pick<UriCell, 'readonly'> & {
    data: StringKeys<T>;
    displayData: StringKeys<T>;
    sortType: SortTypes;
  };

type WrappedGridColumn<T> = Omit<GridColumn, 'id'> & {
  id: StringKeys<T>;
} & {
  cell: Cell<T>;
};

type IdRow<T> = T & {
  rowUuid: string;
};

type IdColumn<T> = T & {
  columnUuid: string;
};

export type { Cell, IdRow, WrappedGridColumn, IdColumn };
