import type { ObjectValues } from './general';

const SORT_STATES = {
  initial: 'initial',
  ascending: 'ascending',
  descending: 'descending',
} as const;

type SortStates = ObjectValues<typeof SORT_STATES>;

export { SORT_STATES };
export type { SortStates };
