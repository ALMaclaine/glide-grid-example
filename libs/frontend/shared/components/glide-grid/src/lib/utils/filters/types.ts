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

type FilterSet<T> = Record<StringKeys<T>, Filter>;

type FilterFunc<T> = (val: T) => boolean;

const VALID_NATURAL_FILTER_SET = new Set<FilterType>([FILTER_TYPES.levels]);
const VALID_NUMERIC_FILTER_SET = new Set<FilterType>([
  FILTER_TYPES.min,
  FILTER_TYPES.max,
  FILTER_TYPES.range,
]);

export type {
  Filter,
  FilterFunc,
  FilterIdentity,
  FilterLevels,
  FilterMax,
  FilterMin,
  FilterRange,
  FilterSet,
  FilterType,
};

export { FILTER_TYPES, VALID_NUMERIC_FILTER_SET, VALID_NATURAL_FILTER_SET };
