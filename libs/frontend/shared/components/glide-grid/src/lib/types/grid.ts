import { GridCell, GridColumn, UriCell } from '@glideapps/glide-data-grid';
import type { StringKeys } from './general';
import type { SortTypes } from '../utils/sort/object-sort';

type Cell<T extends object> = Omit<GridCell, 'data'> &
  Pick<UriCell, 'readonly'> & {
    data: StringKeys<T>;
    displayData: StringKeys<T>;
    sortType: SortTypes;
  };

type WrappedGridColumn<T extends object> = IdColumn<
  Omit<GridColumn, 'id'> & {
    id: StringKeys<T>;
  } & {
    cell: Cell<T>;
  }
>;

type IdRow<T extends object> = T & {
  rowUuid: string;
};

type IdColumn<T extends object> = T & {
  columnUuid: string;
};

export type { Cell, IdRow, WrappedGridColumn, IdColumn };
