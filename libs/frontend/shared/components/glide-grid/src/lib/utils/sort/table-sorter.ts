import type { Indexable, StringKeys } from '../../types/general';
import type { IdRow } from '../../types/grid';
import { StateSet } from './sort-state-machine';
import { ColumnsProps } from '../../types/props';
import { objectSort, SORT_STATES, SORT_TYPES } from './object-sort';
import type { SortTypes } from './object-sort';
const { initial } = SORT_STATES;

type TableSorterProps<T extends Indexable> = ColumnsProps<T> & {
  originalData: IdRow<T>[];
};

class TableSorter<T extends Indexable> {
  private readonly originalData: IdRow<T>[];
  private readonly sortMap: Map<StringKeys<T>, SortTypes>;
  constructor({ originalData, columns }: TableSorterProps<T>) {
    this.originalData = originalData;
    this.sortMap = this.processColumns({ columns });
  }

  private processColumns({ columns }: ColumnsProps<T>) {
    const sortMap = new Map<StringKeys<T>, SortTypes>();
    for (const column of columns) {
      const { sortType, displayData } = column.cell;
      sortMap.set(displayData, sortType);
    }
    return sortMap;
  }

  private cloneOriginal() {
    return [...this.originalData];
  }

  private getType(key: StringKeys<T> | '') {
    if (key === '') {
      return SORT_TYPES.natural;
    }
    return this.sortMap.get(key) || SORT_TYPES.natural;
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
