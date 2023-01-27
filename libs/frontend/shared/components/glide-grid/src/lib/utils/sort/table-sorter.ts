import type { Indexable, StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import { StateSet } from './sort-state-machine';
import type { ColumnsProps } from '../../types/props';
import { objectSort, SORT_STATES, SORT_TYPES } from './object-sort';
import { Columns } from '../columns';
const { initial } = SORT_STATES;

type TableSorterProps<T extends Indexable> = ColumnsProps<T> & {
  originalData: IdRow<T>[];
};

class TableSorter<T extends Indexable> {
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

  stateSort(currentStateSet: StateSet<T>, previousStateSet: StateSet<T>) {
    const { state: currentState, value: currentValue } = currentStateSet;
    const { state: previousState, value: previousValue } = previousStateSet;
    const bothStateInitial =
      currentState === initial && previousState === initial;
    if (bothStateInitial || currentValue === '') {
      return this.cloneOriginal();
    }

    return objectSort(this.cloneOriginal(), [
      {
        state: currentState,
        type: this.getType(currentValue),
        key: currentValue,
      },
      {
        state: previousState,
        type: this.getType(previousValue),
        key: previousValue,
      },
    ]);
  }
}

export { TableSorter };
export type { TableSorterProps };
