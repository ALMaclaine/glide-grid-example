import { GridCell, GridColumn, UriCell } from '@glideapps/glide-data-grid';
import type { Indexable, StringKeys } from './general';
import type { SortTypes } from '../utils/sort/object-sort';

type Cell<T extends Indexable> = Omit<GridCell, 'data'> &
  Pick<UriCell, 'readonly'> & {
    data: StringKeys<T>;
    displayData: StringKeys<T>;
    sortType: SortTypes;
  };

type WrappedGridColumn<T extends Indexable> = GridColumn & {
  cell: Cell<T>;
};

type IdRow<T extends Indexable> = T & {
  rowUuid: string;
};

export type { Cell, IdRow, WrappedGridColumn };
