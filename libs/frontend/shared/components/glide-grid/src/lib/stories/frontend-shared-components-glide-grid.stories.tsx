// Button.stories.tsx
import { ComponentStory, Meta } from '@storybook/react';
import {
  GlideGrid,
  GlideGridProps,
} from '../frontend-shared-components-glide-grid';
import type { Indexable, WrappedGridColumn } from '../types';
import { randAddress, randCompanyName, randFloat } from '@ngneat/falso';
import { genTextCell, genUriCell } from '../cells/generators';

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
    id: 'Property',
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
    id: 'Address',
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

Primary.args = {
  columns,
  data,
  rows: data.length,
};
