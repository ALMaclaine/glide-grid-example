// Button.stories.tsx
import { ComponentStory, Meta } from '@storybook/react';
import {
  GlideGrid,
  GlideGridProps,
} from '../frontend-shared-components-glide-grid';
import type { WrappedGridColumn } from '../types';
import { genGetCellContent, genTextCell } from '../utils';

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

const columns: WrappedGridColumn<User>[] = [
  {
    title: 'First Name',
    width: 100,
    cell: genTextCell({ data: 'firstName', cursor: 'pointer' }),
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

Primary.args = {
  columns,
  getCellContent: genGetCellContent(columns, getData),
  rows: data.length,
};
