import type { HeaderClickHandler, RowIndexGetter } from './func';
import { Columns } from '../utils/columns';

type RowIndexGetterProps<T> = {
  getRowByIndex: RowIndexGetter<T>;
};

type HeaderClickProps = {
  onHeaderClicked: HeaderClickHandler;
};

type RowsProps = {
  rows: number;
};

type ColumnsProps<T> = { columns: Columns<T> };

export type { RowsProps, HeaderClickProps, RowIndexGetterProps, ColumnsProps };
