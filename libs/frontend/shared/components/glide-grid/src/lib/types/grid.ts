import { GridCell, GridColumn, UriCell } from '@glideapps/glide-data-grid';
import type { Indexable, ObjectValues, StringKeys } from './general';

const SORT_TYPES = {
  natural: 'natural',
  date: 'date',
  numeric: 'numeric',
} as const;

type SortTypes = ObjectValues<typeof SORT_TYPES>;

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

export type { Cell, IdRow, WrappedGridColumn, SortTypes };
export { SORT_TYPES };
