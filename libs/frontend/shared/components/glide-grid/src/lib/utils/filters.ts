import type { ObjectValues, StringKeys } from '../types/general';

const FILTER_TYPES = {
  levels: 'levels',
  min: 'min',
  max: 'max',
  range: 'range',
  identity: 'identity',
} as const;

type FilterType = ObjectValues<typeof FILTER_TYPES>;

type FilterBase<T extends FilterType> = {
  type: T;
};

type LevelsFilter = FilterBase<'levels'> & {
  levels: string[];
};

type MinFilter = FilterBase<'min'> & {
  min: number;
};

type MaxFilter = FilterBase<'max'> & {
  max: number;
};

type RangeFilter = FilterBase<'range'> & {
  min: number;
  max: number;
};

type IdentityFilter = FilterBase<'identity'>;

type Filter =
  | LevelsFilter
  | MinFilter
  | MaxFilter
  | RangeFilter
  | IdentityFilter;

const levelsFilter = (value: string, levels: string[]) =>
  levels.includes(value);
const minFilter = (value: number, min: number) => value >= min;
const maxFilter = (value: number, max: number) => value <= max;
const rangeFilter = (value: number, min: number, max: number) =>
  value >= min && value <= max;

type Filters<T> = Record<StringKeys<T>, Filter>;
type FilterSet<T> = Filters<T>[];

export { FILTER_TYPES, levelsFilter, minFilter, maxFilter, rangeFilter };
export type {
  Filters,
  FilterSet,
  FilterType,
  MinFilter,
  MaxFilter,
  RangeFilter,
  LevelsFilter,
};
