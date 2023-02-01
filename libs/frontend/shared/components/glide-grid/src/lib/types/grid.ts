import { GridCell, GridColumn, UriCell } from '@glideapps/glide-data-grid';
import type { StringKeys } from './general';
import type { SortTypes } from '../utils/sort/object-sort';

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
  }
>;

type IdRow<T extends object> = T & {
  rowUuid: string;
};

type IdColumn<T extends object> = T & {
  columnUuid: string;
};

export type { CellPrototype, IdRow, WrappedGridColumn, IdColumn, CellInstance };
