import { GridMouseEventArgs } from '@glideapps/glide-data-grid';
import type { StringKeys } from './general';

type HeaderClickHandler = <T extends object>(
  headerVal: StringKeys<T>,
  col?: number
) => void;

type HoverHandler = (args: GridMouseEventArgs) => void;

export type { HeaderClickHandler, HoverHandler };
