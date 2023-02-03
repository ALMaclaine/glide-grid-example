import type { ObjectValues } from '../../../types/general';

const LAST_SELECTION_CHANGE_TYPE = {
  columns: 'columns',
  rows: 'rows',
  rect: 'rect',
  initial: 'initial',
} as const;
type LastSelectionChangeType = ObjectValues<typeof LAST_SELECTION_CHANGE_TYPE>;

export type { LastSelectionChangeType };
export { LAST_SELECTION_CHANGE_TYPE };
