import type { StringKeys } from '../../types/general';
import { SORT_TYPES } from './object-sort';
import type { SortTypes } from './object-sort';
import type { WrappedGridColumn } from '../../types/grid';

class SortMap<T> {
  private readonly sortMap: Map<StringKeys<T>, SortTypes>;
  constructor({ columns }: { columns: WrappedGridColumn<T>[] }) {
    this.sortMap = this.processColumns(columns);
  }
  private processColumns(columns: WrappedGridColumn<T>[]) {
    return new Map(
      columns.map(({ cell: { displayData, sortType } }) => [
        displayData,
        sortType,
      ])
    );
  }

  getType(key: StringKeys<T>) {
    return this.sortMap.get(key) || SORT_TYPES.natural;
  }
}
export { SortMap };