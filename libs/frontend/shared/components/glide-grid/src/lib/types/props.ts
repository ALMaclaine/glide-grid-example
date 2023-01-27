import type { Indexable } from './general';
import type { HeaderClickHandler, RowIndexGetter } from './func';
import { Columns } from '../utils/columns';

type RowIndexGetterProps<T extends Indexable> = {
  getRowByIndex: RowIndexGetter<T>;
};

type HeaderClickProps = {
  onHeaderClicked: HeaderClickHandler;
};

type RowsProps = {
  rows: number;
};

type ColumnsProps<T extends Indexable> = { columns: Columns<T> };

export type { RowsProps, HeaderClickProps, RowIndexGetterProps, ColumnsProps };
