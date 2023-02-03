import { WrappedGridColumn } from '../../../types/grid';
import { StringKeys } from '../../../types/general';

type ColumnsProps<T extends object> = {
  columns: WrappedGridColumn<T>[];
  hiddenColumns?: StringKeys<T>[];
};

type Translation<T extends object> = {
  uuid: string;
  id: StringKeys<T>;
  originalColumn: number;
};

export type { ColumnsProps, Translation };
