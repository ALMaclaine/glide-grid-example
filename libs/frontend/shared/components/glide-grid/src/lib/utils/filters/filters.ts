import { Filter, FILTER_TYPES, FilterFunc } from './types';
import { StringKeys } from '../../types/general';

const filterLevels = (value: string, levels: string[]) =>
  levels.includes(value);

const filterMin = (value: number, min: number) => value >= min;
const filterMax = (value: number, max: number) => value <= max;

const filterRange = (value: number, min: number, max: number) =>
  value >= min && value <= max;

function generateFilterLevels(levels: string[]): FilterFunc<string> {
  return (value: string) => filterLevels(value, levels);
}

function generateFilterMin(min: number): FilterFunc<string> {
  return (value: string) => filterMin(parseFloat(value), min);
}

function generateFilterMax(max: number): FilterFunc<string> {
  return (value: string) => filterMax(parseFloat(value), max);
}

function generateFilterRange(min: number, max: number): FilterFunc<string> {
  return (value: string) => filterRange(parseFloat(value), min, max);
}

function genereateRowAccessor<T>(
  key: StringKeys<T>,
  filterGen: FilterFunc<string>
): FilterFunc<T> {
  return (row: T) => filterGen(row[key] as string);
}

function generateFilter(filter: Filter) {
  const { type } = filter;
  switch (type) {
    case FILTER_TYPES.levels:
      return generateFilterLevels(filter.levels);
    case FILTER_TYPES.min:
      return generateFilterMin(filter.min);
    case FILTER_TYPES.max:
      return generateFilterMax(filter.max);
    case FILTER_TYPES.identity:
      return () => true;
    case FILTER_TYPES.range:
      return generateFilterRange(filter.min, filter.max);
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _default: never = type;
      return () => true;
    }
  }
}

export {
  generateFilterRange,
  generateFilterMax,
  generateFilterLevels,
  generateFilterMin,
  generateFilter,
  genereateRowAccessor,
};
