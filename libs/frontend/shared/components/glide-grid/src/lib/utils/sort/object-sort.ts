import { ObjectValues, StringKeys } from '../../types/general';

const SORT_TYPES = {
  natural: 'natural',
  date: 'date',
  numeric: 'numeric',
} as const;

type SortTypes = ObjectValues<typeof SORT_TYPES>;

const SORT_STATES = {
  initial: 'initial',
  ascending: 'asc',
  descending: 'desc',
} as const;

type SortStates = ObjectValues<typeof SORT_STATES>;

const sortNumeric = (num1: string, num2: string) =>
  parseFloat(num1) - parseFloat(num2);
const sortDates = (date1: string, date2: string) =>
  sortNumeric(`${new Date(date1).getTime()}`, `${new Date(date2).getTime()}`);

const defaultSort = (a: string, b: string) => {
  return a < b ? -1 : a > b ? 1 : 0;
};

type Sorter<T extends object> = {
  type: SortTypes;
  state: SortStates;
  key: StringKeys<T> | '';
};

const COMPARE_MAP: Record<SortTypes, (str1: string, str2: string) => number> = {
  [SORT_TYPES.date]: sortDates,
  [SORT_TYPES.natural]: defaultSort,
  [SORT_TYPES.numeric]: sortNumeric,
} as const;

const objectSort = <T extends object>(data: T[], sorters: Sorter<T>[]) => {
  return data.sort((a, b) => {
    for (const sorter of sorters) {
      const { type, state, key } = sorter;
      if (state === 'initial' || key === '') {
        continue;
      }
      const compare = COMPARE_MAP[type];
      const factor = state === 'desc' ? -1 : 1;
      const mult = factor * compare(a[key] as string, b[key] as string);
      if (mult !== 0) {
        return mult;
      }
    }
    return 0;
  });
};

export { SORT_TYPES, SORT_STATES, objectSort };
export type { SortTypes, SortStates };
