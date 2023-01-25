import type { ObjectValues } from './general';

const SORT_STATES = {
  initial: 'initial',
  ascending: 'asc',
  descending: 'desc',
} as const;

type SortStates = ObjectValues<typeof SORT_STATES>;

export { SORT_STATES };
export type { SortStates };
