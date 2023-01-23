import { GridCell, GridCellKind, Item } from '@glideapps/glide-data-grid';
import type {
  GenTextCellProps,
  GenGridCellProps,
  Cell,
  Indexable,
  WrappedGridColumn,
  GenUriCellProps,
  IdRow,
} from './types';
import { GlideGridCellGenerator } from './types';
import { v4 as uuid } from 'uuid';

function genGridCell<T extends Indexable>({
  data,
  displayData = data,
  allowOverlay = false,
  ...rest
}: GenGridCellProps<T>): Cell<T> {
  return {
    data,
    displayData,
    allowOverlay,
    ...rest,
  };
}

function genTextCell<T extends Indexable>(props: GenTextCellProps<T>): Cell<T> {
  return genGridCell({ kind: GridCellKind.Text, ...props });
}

function genUriCell<T extends Indexable>(props: GenUriCellProps<T>): Cell<T> {
  return genGridCell({ kind: GridCellKind.Uri, ...props });
}

class ContentCache<T extends Indexable> {
  // column -> row -> value
  private cachedContent: Map<string, Map<number, GridCell>> = new Map();

  get(rowUuid: string, col: number): GridCell {
    const rowCache = this.cachedContent.get(rowUuid);

    if (rowCache === undefined) {
      throw new Error('Cache should be set before accessing');
    }

    return rowCache.get(col) as GridCell;
  }

  hasRow(rowUuid: string) {
    return this.cachedContent.has(rowUuid);
  }

  has(rowUuid: string, col: number) {
    return this.hasRow(rowUuid) && this.cachedContent.get(rowUuid)?.has(col);
  }

  set(rowUuid: string, col: number, value: GridCell) {
    if (this.cachedContent.get(rowUuid) === undefined) {
      this.cachedContent.set(rowUuid, new Map());
    }

    const rowCache = this.cachedContent.get(rowUuid) as Map<number, GridCell>;
    rowCache.set(col, value);
  }
}

function genGetCellContent<T extends Indexable>(
  columns: WrappedGridColumn<T>[],
  getData: (row: number) => IdRow<T>
): GlideGridCellGenerator {
  return ([col, row]: Item): GridCell => {
    const item = getData(row);
    const { rowUuid } = item;
    if (col < columns.length) {
      const {
        cell: { data, displayData, ...rest },
      } = columns[col];

      return {
        ...rest,
        data: item[data],
        displayData: item[data],
      } as GridCell;
    } else {
      throw new Error();
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOpObj = () => ({});

const addIdToRow = <T extends Indexable>(row: T): IdRow<T> => {
  // mutate directly to avoid performance issues on large tables
  const changeType = row as IdRow<T>;
  changeType.rowUuid = uuid();
  return changeType;
};

const addIdsToRows = <T extends Indexable>(rows: T[]): IdRow<T>[] => {
  // mutate directly to avoid performance issues on large tables
  rows.forEach(addIdToRow);
  return rows as IdRow<T>[];
};

export {
  ContentCache,
  genTextCell,
  genGridCell,
  genGetCellContent,
  genUriCell,
  noOp,
  noOpObj,
  addIdsToRows,
};
