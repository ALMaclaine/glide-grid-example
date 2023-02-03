import type { StringKeys } from '../../../types/general';
import type { WrappedGridColumn } from '../grid-manager/types';

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
