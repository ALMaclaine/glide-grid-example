// Button.stories.tsx
import { ComponentStory, Meta } from '@storybook/react';
import {
  GlideGrid,
  GlideGridProps,
} from '../frontend-shared-components-glide-grid';
import type { WrappedGridColumn } from '../types';
import { genGetCellContent, genTextCell, genUriCell } from '../utils';
import { randAddress, randCompanyName, randFloat } from '@ngneat/falso';

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

export const Primary: ComponentStory<typeof GlideGrid> = (
  args: GlideGridProps
) => {
  return (
    <div
      style={{
        width: '80vw',
        height: '60vh',
        margin: '0 auto',
        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      }}
    >
      <GlideGrid {...args} />
    </div>
  );
};

type Property = {
  property: string;
  address: string;
  investor: string;
  units: string;
  rentOwed: string;
};

const columns: WrappedGridColumn<Property>[] = [
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
    cell: genTextCell({ data: 'units' }),
  },
  {
    title: 'Rent Owed',
    id: 'rent-owed',
    grow: 1,
    cell: genTextCell({ data: 'rentOwed', contentAlign: 'right' }),
  },
];

function genProperty(): Property {
  return {
    property: randAddress().street,
    address: randAddress().street,
    investor: randCompanyName(),
    units: Math.round(Math.random() * 6 + 1).toString(),
    rentOwed: randFloat({ fraction: 2 }).toString(),
  };
}

const data: Property[] = [...Array(50).fill(0).map(genProperty)];

const getData = (row: number): Property => data[row] ?? {};

Primary.args = {
  columns,
  getCellContent: genGetCellContent(columns, getData),
  rows: data.length,
};
