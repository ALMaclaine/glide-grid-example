import { ObjectValues, StringKeys } from '../../types/general';

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

type FilterLevels = FilterBase<'levels'> & {
  levels: string[];
};

type FilterMin = FilterBase<'min'> & {
  min: number;
};

type FilterMax = FilterBase<'max'> & {
  max: number;
};

type FilterRange = FilterBase<'range'> & {
  min: number;
  max: number;
};

type FilterIdentity = FilterBase<'identity'>;

type Filter =
  | FilterLevels
  | FilterMin
  | FilterMax
  | FilterRange
  | FilterIdentity;

const isFilterLevels = (filter: Filter): filter is FilterLevels =>
  filter.type === FILTER_TYPES.levels;

const isFilterMin = (filter: Filter): filter is FilterMin =>
  filter.type === FILTER_TYPES.min;

const isFilterMax = (filter: Filter): filter is FilterMax =>
  filter.type === FILTER_TYPES.max;

const isFilterRange = (filter: Filter): filter is FilterRange =>
  filter.type === FILTER_TYPES.range;

type Filters<T> = Record<StringKeys<T>, Filter>;
type FiltersSet<T> = Filters<T>[];

export type {
  FilterType,
  FilterLevels,
  FilterMin,
  FilterMax,
  FilterRange,
  Filter,
  FilterIdentity,
  Filters,
  FiltersSet,
};

export {
  FILTER_TYPES,
  isFilterLevels,
  isFilterMin,
  isFilterMax,
  isFilterRange,
};
