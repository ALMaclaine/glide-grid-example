import type { SortMap } from '../sort/sort-map';
import type { Filter, FilterFunc, FilterSet } from '../filters/types';
import type { StringKeys } from '../../types/general';
import type { SortTypes } from '../sort/object-sort';
import { SORT_TYPES } from '../sort/object-sort';
import { generateFilter, genereateRowAccessor } from '../filters/filters';
import {
  FILTER_TYPES,
  VALID_NATURAL_FILTER_SET,
  VALID_NUMERIC_FILTER_SET,
} from '../filters/types';

type FilterManagerProps<T extends object> = {
  sortMap: SortMap<T>;
  filters?: FilterSet<T>[];
  searchTerms?: string[];
};

class FilterManager<T extends object> {
  private readonly sortMap: SortMap<T>;
  filterGroups: FilterFunc<T>[][] = [];
  private searchTerms: string[] = [];

  constructor({
    sortMap,
    filters = [],
    searchTerms = [],
  }: FilterManagerProps<T>) {
    this.sortMap = sortMap;
    this.filterGroups = filters.map((filter) => this.createFilterGroup(filter));
    this.searchTerms = searchTerms;
  }

  setFilterGroups(filters: FilterSet<T>[]) {
    this.filterGroups = filters.map((filter) => this.createFilterGroup(filter));
  }

  setSearchTerms(terms: string[]) {
    this.searchTerms = terms;
  }

  testItem(item: T) {
    for (const filterGroup of this.filterGroups) {
      const filterTest = this.testFilterGroup(filterGroup, item);
      if (filterTest && this.testSearchTerms(item)) {
        return true;
      }
    }
    return false;
  }

  // TODO: ignore numeric fields
  private testSearchTerm(key: StringKeys<T>, item: T) {
    for (const term of this.searchTerms) {
      const toSearch = `${item[key] as string}`;
      if (toSearch.toLowerCase().includes(term.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  private testSearchTerms(item: T) {
    if (this.searchTerms.length === 0) {
      return true;
    }
    const keys = Object.keys(item) as StringKeys<T>[];
    for (const key of keys) {
      if (this.testSearchTerm(key, item)) {
        return true;
      }
    }
    return false;
  }

  private testFilterGroup(filterGroup: FilterFunc<T>[], item: T) {
    for (const filter of filterGroup) {
      if (!filter(item)) {
        return false;
      }
    }
    return true;
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
    return filterGroup;
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
