import type { SortMap } from '../sort/sort-map';
import {
  Filter,
  FILTER_TYPES,
  FilterFunc,
  FilterSet,
  VALID_NATURAL_FILTER_SET,
  VALID_NUMERIC_FILTER_SET,
} from './types';
import { StringKeys } from '../../types/general';
import { SORT_TYPES, SortTypes } from '../sort/object-sort';
import { generateFilter, genereateRowAccessor } from './filters';

type FilterManagerProps<T> = {
  sortMap: SortMap<T>;
  filters?: FilterSet<T>[];
};

class FilterManager<T> {
  private readonly sortMap: SortMap<T>;
  filterGroup: FilterFunc<T>[] = [];

  constructor({ sortMap, filters = [] }: FilterManagerProps<T>) {
    this.sortMap = sortMap;
    filters.map((filter) => this.createFilterGroup(filter));
  }

  private createFilterGroup(filterSet: FilterSet<T>) {
    const filterGroup: FilterFunc<T>[] = [];
    const keys = Object.keys(filterSet);
    for (const key of keys) {
      const filterKey = key as StringKeys<T>;
      const keyFilter = filterSet[filterKey];
      if (keyFilter.type === FILTER_TYPES.identity) {
        continue;
      }
      const keyType = this.sortMap.getType(filterKey);
      this.validateFilter(keyFilter, keyType);
      filterGroup.push(
        genereateRowAccessor(filterKey, generateFilter(keyFilter))
      );
    }
    this.filterGroup = filterGroup;
  }

  private validateFilter(filter: Filter, sortType: SortTypes) {
    const { type: filterType } = filter;
    if (filterType === FILTER_TYPES.identity) {
      return true;
    }
    switch (sortType) {
      case SORT_TYPES.natural: {
        if (!VALID_NATURAL_FILTER_SET.has(filterType)) {
          throw new Error(
            'Invalid filter for type. Type: natural. Filter: ' + filterType
          );
        }
        return;
      }
      case SORT_TYPES.numeric: {
        if (!VALID_NUMERIC_FILTER_SET.has(filterType)) {
          throw new Error(
            'Invalid filter for type. Type: numeric. Filter: ' + filterType
          );
        }
        return;
      }
      case SORT_TYPES.date: {
        throw new Error('Has not been implemented');
      }
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _default: never = sortType;
      }
    }
  }
}

export { FilterManager };
