import { GridMouseEventArgs } from '@glideapps/glide-data-grid';
import type { StringKeys } from './general';
import { Cell, IdRow } from './grid';

type HeaderClickHandler = <T extends object>(
  headerVal: StringKeys<T>,
  col?: number
) => void;

type HoverHandler = (args: GridMouseEventArgs) => void;

type OnItemClickedProps<T extends object> = {
  cell: Cell<T>;
  row: IdRow<T>;
};

type OnItemClickedHandler = <T extends object>(
  props: OnItemClickedProps<T>
) => void;

export type {
  HeaderClickHandler,
  HoverHandler,
  OnItemClickedHandler,
  OnItemClickedProps,
};
