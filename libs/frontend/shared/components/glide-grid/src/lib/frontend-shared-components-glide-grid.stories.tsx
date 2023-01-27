// Button.stories.tsx
import { ComponentStory, Meta } from '@storybook/react';
import {
  GlideGrid,
  GlideGridProps,
} from './frontend-shared-components-glide-grid';
import { randAddress, randCompanyName } from '@ngneat/falso';
import {
  genNumericCell,
  genTextCell,
  genUriCell,
} from './utils/cells/generators';
import type { Indexable } from './types/general';
import type { WrappedGridColumn } from './types/grid';
import { Columns } from './utils/columns';

export default {
  title: 'GlideGrid/PropertiesPage',
  component: GlideGrid,
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div id="portal" />
      </div>
    ),
  ],
} as Meta;

export const Primary: ComponentStory<typeof GlideGrid> = <T extends Indexable>(
  args: GlideGridProps<T>
) => {
  return (
    <div
      style={{
        width: '80vw',
        height: '60vh',
        margin: '0 auto',
      }}
    >
      <GlideGrid {...args} />
    </div>
  );
};

interface Property extends Indexable {
  property: string;
  address: string;
  investor: string;
  units: string;
  rentOwed: string;
}

const columnsDetails: WrappedGridColumn<Property>[] = [
  {
    title: 'Property',
    id: 'property',
    grow: 2,
    cell: genUriCell({
      data: 'property',
      displayData: 'property',
      cursor: 'pointer',
      themeOverride: {
        textDark: 'blue',
        baseFontStyle: '12px underlined',
      },
    }),
  },
  {
    title: 'Address',
    id: 'address',
    grow: 2,
    cell: genTextCell({ data: 'address' }),
  },
  {
    title: 'Investor',
    id: 'investor',
    grow: 2,
    cell: genTextCell({ data: 'investor' }),
  },
  {
    title: 'Units',
    id: 'units',
    grow: 1,
    cell: genNumericCell({ data: 'units' }),
  },
  {
    title: 'Rent Owed',
    id: 'rentOwed',
    grow: 1,
    cell: genNumericCell({ data: 'rentOwed', contentAlign: 'right' }),
  },
];

const columns = new Columns<Property>(columnsDetails);

const RENT_OWED_SET = [1300.32, 1500.0, 700.12, 900.43, 4300.99, 543.53];
function genProperty(): Property {
  return {
    property: randAddress().street,
    address: randAddress().street,
    investor: randCompanyName(),
    units: Math.round(Math.random() * 6 + 1).toString(),
    rentOwed:
      RENT_OWED_SET[Math.floor(Math.random() * RENT_OWED_SET.length)] + '',
  };
}

const data: Property[] = [...Array(50).fill(0).map(genProperty)];

Primary.args = {
  columns,
  data,
  rows: data.length,
};
