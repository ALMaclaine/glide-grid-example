import { GridCell, GridMouseEventArgs, Item } from '@glideapps/glide-data-grid';
import type { StringKeys } from './general';
import type { IdRow } from './grid';

type RowGetter<T> = (uuid: string) => IdRow<T>;

type RowIndexGetter<T> = (rowNumber: number) => IdRow<T>;

type RowIdGetter<T> = (uuid: string) => IdRow<T>;

type ItemToGridCell = (item: Item) => GridCell;

type HeaderClickHandler = <T>(headerVal: StringKeys<T>, col?: number) => void;

type HoverHandler = (args: GridMouseEventArgs) => void;

export type {
  HeaderClickHandler,
  ItemToGridCell,
  HoverHandler,
  RowGetter,
  RowIdGetter,
  RowIndexGetter,
};
