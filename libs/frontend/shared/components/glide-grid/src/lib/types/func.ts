import type { Indexable } from './general';
import { GridCell, GridMouseEventArgs, Item } from '@glideapps/glide-data-grid';
import type { IdRow } from './grid';

type RowGetter<T extends Indexable> = (uuid: string) => IdRow<T>;

type RowIndexGetter<T extends Indexable> = (rowNumber: number) => IdRow<T>;

type RowIdGetter<T extends Indexable> = (uuid: string) => IdRow<T>;

type ItemToGridCell = (item: Item) => GridCell;

type HeaderClickHandler = (n: string, col?: number) => void;

type HoverHandler = (args: GridMouseEventArgs) => void;

export type {
  HeaderClickHandler,
  Indexable,
  ItemToGridCell,
  HoverHandler,
  RowGetter,
  RowIdGetter,
  RowIndexGetter,
};
