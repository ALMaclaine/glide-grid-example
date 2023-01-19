// Button.stories.tsx
import { ComponentStory, Meta } from '@storybook/react';
import {
  GlideGrid,
  GlideGridProps,
} from './frontend-shared-components-glide-grid';
import {
  GridCell,
  GridColumn,
  Item,
  GridCellKind,
} from '@glideapps/glide-data-grid';

export default {
  component: GlideGrid,
} as Meta;

export const Primary: ComponentStory<typeof GlideGrid> = (
  args: GlideGridProps
) => <GlideGrid {...args} />;

type User = {
  firstName: string;
  lastName: string;
};

const columns: GridColumn[] = [
  { title: 'First Name', width: 100 },
  { title: 'Last Name', width: 100 },
];

const data: User[] = [
  {
    firstName: 'Alex',
    lastName: 'Smith',
  },
  {
    firstName: 'Mark',
    lastName: 'Jones',
  },
];

function getData([col, row]: Item): GridCell {
  const person = data[row];

  if (col === 0) {
    return {
      kind: GridCellKind.Text,
      data: person.firstName,
      allowOverlay: false,
      displayData: person.firstName,
    };
  } else if (col === 1) {
    return {
      kind: GridCellKind.Text,
      data: person.lastName,
      allowOverlay: false,
      displayData: person.lastName,
    };
  } else {
    throw new Error();
  }
}

Primary.args = {
  columns,
  getData,
  rows: columns.length,
};
