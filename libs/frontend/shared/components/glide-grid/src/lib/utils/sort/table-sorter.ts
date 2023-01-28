import type { StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import { StateSet } from './sort-state-machine';
import type { ColumnsProps } from '../../types/props';
import { objectSort, SORT_STATES, SORT_TYPES } from './object-sort';
import { Columns } from '../columns';
const { initial } = SORT_STATES;

type TableSorterProps<T> = ColumnsProps<T> & {
  originalData: IdRow<T>[];
};

class TableSorter<T> {
  private readonly originalData: IdRow<T>[];
  private readonly columns: Columns<T>;
  constructor({ originalData, columns }: TableSorterProps<T>) {
    this.originalData = originalData;
    this.columns = columns;
  }

  private cloneOriginal() {
    return [...this.originalData];
  }

  private getType(key: StringKeys<T> | '') {
    if (key === '') {
      return SORT_TYPES.natural;
    }
    return this.columns.getType(key);
  }

  stateSort(stateHistory: StateSet<T>[]) {
    return objectSort(this.cloneOriginal(), [
      ...stateHistory.map(({ state, key }) => ({
        state,
        type: this.getType(key),
        key,
      })),
    ]);
  }
}

export { TableSorter };
export type { TableSorterProps };
