import { GridCell, Item } from '@glideapps/glide-data-grid';
import type { Indexable, WrappedGridColumn, IdRow } from './types';
import type { GlideGridCellGenerator } from './types';
import { v4 as uuid } from 'uuid';

function genGetCellContent<T extends Indexable>(
  columns: WrappedGridColumn<T>[],
  getDataByIndex: (row: number) => IdRow<T>
): GlideGridCellGenerator {
  return ([col, row]: Item): GridCell => {
    const item = getDataByIndex(row);
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
      throw new Error("Attempting to access a column that doesn't exist");
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

export { addIdToRow, addIdsToRows, genGetCellContent, noOp, noOpObj };
