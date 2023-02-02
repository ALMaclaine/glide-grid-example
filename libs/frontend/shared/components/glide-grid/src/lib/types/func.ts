import { GridMouseEventArgs } from '@glideapps/glide-data-grid';
import type { StringKeys } from './general';
import { CellPrototype, IdRow } from './grid';

type HeaderClickHandler = <T extends object>(
  headerVal: StringKeys<T>,
  col?: number
) => void;

type HoverHandler = (args: GridMouseEventArgs) => void;

type OnItemClickedProps<T extends object> = {
  cell: CellPrototype<T>;
  row: IdRow<T>;
};

type OnItemClickedHandler = <T extends object>(
  props: OnItemClickedProps<T>
) => void;

type OnRowClickedProps<T extends object> = {
  lastSelectedIndex: number;
  selectedIndices: number[];
  lastSelectedRow: IdRow<T>;
  selectedRows: IdRow<T>;
};

type OnRowClickedHandler = <T extends object>(
  props: OnRowClickedProps<T>
) => void;

export type {
  HeaderClickHandler,
  HoverHandler,
  OnItemClickedHandler,
  OnItemClickedProps,
  OnRowClickedHandler,
  OnRowClickedProps,
};
