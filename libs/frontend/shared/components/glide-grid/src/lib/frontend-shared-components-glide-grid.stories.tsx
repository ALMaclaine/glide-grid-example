// Button.stories.tsx
import { ComponentStory, Meta } from '@storybook/react';
import {
  GlideGrid,
  GlideGridCellGenerator,
  GlideGridProps,
} from './frontend-shared-components-glide-grid';
import {
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
} from '@glideapps/glide-data-grid';

export default {
  component: GlideGrid,
} as Meta;

export const Primary: ComponentStory<typeof GlideGrid> = (
  args: GlideGridProps
) => {
  return <GlideGrid {...args} />;
};

type User = {
  firstName: string;
  lastName: string;
  middleName: string;
};

type Cell<T> = Omit<GridCell, 'data' | 'displayData'> & {
  data: keyof T;
  displayData: keyof T;
};

type Indexable = Record<string, unknown>;

type WrappedGridColumn<T extends Indexable> = GridColumn & {
  cell: Cell<T>;
};

type GenGridCellProps<T extends Indexable> = {
  kind: GridCell['kind'];
  data: Cell<T>['data'];
} & Partial<Omit<Cell<T>, 'kind' | 'data'>>;

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

type GenTextCellProps<T extends Indexable> = Omit<GenGridCellProps<T>, 'kind'>;
function genTextCell<T extends Indexable>(props: GenTextCellProps<T>): Cell<T> {
  return genGridCell({ kind: GridCellKind.Text, ...props });
}

const columnsT: WrappedGridColumn<User>[] = [
  {
    title: 'First Name',
    width: 100,
    cell: genTextCell({ data: 'firstName' }),
  },
  {
    title: 'Last Name',
    width: 100,
    cell: genTextCell({ data: 'lastName' }),
  },
  {
    title: 'Middle Name',
    width: 100,
    cell: genTextCell({ data: 'middleName' }),
  },
];

const data: User[] = [
  {
    firstName: 'Alex',
    lastName: 'Smith',
    middleName: 'Mike',
  },
  {
    firstName: 'Mark',
    lastName: 'Jones',
    middleName: 'Mike',
  },
  ...Array(50)
    .fill(0)
    .map((_, i) => ({
      firstName: `name ${i}`,
      lastName: `${i}`,
      middleName: 'Middle',
    })),
];

const getData = (row: number): User => data[row] ?? {};

function genGetCellContent<T extends Indexable>(
  columns: WrappedGridColumn<T>[],
  getData: (row: number) => T
): GlideGridCellGenerator {
  return ([col, row]: Item): GridCell => {
    const item = getData(row);
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

Primary.args = {
  columns: columnsT,
  getCellContent: genGetCellContent(columnsT, getData),
  rows: data.length,
};
