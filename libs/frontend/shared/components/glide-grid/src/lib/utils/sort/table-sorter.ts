import type { Indexable, StringKeys } from '../../types/general';
import type { IdRow, SortTypes } from '../../types/grid';
import { SORT_STATES, SortStates } from '../../types/sort';
import { StateSet } from './sort-state-machine';
import { ColumnsProps } from '../../types/props';
import { SORT_TYPES } from '../../types/grid';
import { naturalSort, sortDates, sortNumeric } from './sorters';
import { firstBy } from 'thenby';
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

  private getSorterType(type: SortTypes) {
    switch (type) {
      case SORT_TYPES.natural:
        return naturalSort;
      case SORT_TYPES.date:
        return sortDates;
      case SORT_TYPES.numeric:
        return sortNumeric;
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _default: never = type;
        return naturalSort;
      }
    }
  }

  private getFirstBySorter(key: StringKeys<T>, state: SortStates) {
    const type = this.sortMap.get(key) as SortTypes;

    switch (type) {
      case SORT_TYPES.natural:
        return firstBy(key as string, state);
      case SORT_TYPES.date:
        return firstBy((val1: T, val2: T) => {
          return sortDates(val1[key] as string, val2[key] as string);
        }, state);
      case SORT_TYPES.numeric:
        return firstBy((val1: T, val2: T) => {
          return sortNumeric(val1[key] as string, val2[key] as string);
        }, state);
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _default: never = type;
        return firstBy(key as string, state);
      }
    }
  }

  private getThenBySorter(sorter, key: StringKeys<T>, state: SortStates) {
    const type = this.sortMap.get(key) as SortTypes;

    switch (type) {
      case SORT_TYPES.natural:
        return sorter.thenBy(key as string, state);
      case SORT_TYPES.date:
        return sorter.thenBy((val1: T, val2: T) => {
          return sortDates(val1[key] as string, val2[key] as string);
        }, state);
      case SORT_TYPES.numeric:
        return sorter.thenBy((val1: T, val2: T) => {
          return sortNumeric(val1[key] as string, val2[key] as string);
        }, state);
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _default: never = type;
        return sorter.thenBy(key as string, state);
      }
    }
  }

  stateSort(currentStateSet: StateSet<T>, previousStateSet: StateSet<T>) {
    const { state: currentState, value: currentValue } = currentStateSet;
    const { state: previousState, value: previousValue } = previousStateSet;
    const bothStateInitial =
      currentState === initial && previousState === initial;
    if (bothStateInitial || currentValue === '') {
      return this.cloneOriginal();
    }

    let sorter = this.getFirstBySorter(currentValue, currentState);

    if (previousValue !== '') {
      sorter = this.getThenBySorter(sorter, previousValue, previousState);
    }

    return this.cloneOriginal().sort(sorter);
  }
}

export { TableSorter };
export type { TableSorterProps };
