import type { HeaderClickHandler } from './func';
import { Columns } from '../utils/columns';

type HeaderClickProps = {
  onHeaderClicked: HeaderClickHandler;
};

type RowsProps = {
  rows: number;
};

type ColumnsProps<T> = { columns: Columns<T> };

export type { RowsProps, HeaderClickProps, ColumnsProps };
