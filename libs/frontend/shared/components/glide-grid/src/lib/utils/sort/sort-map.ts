import type { StringKeys } from '../../types/general';
import { SORT_TYPES } from './object-sort';
import type { SortTypes } from './object-sort';
import type { WrappedGridColumn } from '../../types/grid';

class SortMap<T extends object> {
  private readonly sortMap: Map<StringKeys<T>, SortTypes>;
  constructor({ columns }: { columns: WrappedGridColumn<T>[] }) {
    this.sortMap = this.processColumns(columns);
  }
  private processColumns(columns: WrappedGridColumn<T>[]) {
    return new Map(
      columns.map(({ cell: { displayDataId, sortType } }) => [
        displayDataId,
        sortType,
      ])
    );
  }
  getType(key: StringKeys<T> | '') {
    if (key === '') {
      return SORT_TYPES.natural;
    }
    return this.sortMap.get(key) || SORT_TYPES.natural;
  }
}
export { SortMap };
