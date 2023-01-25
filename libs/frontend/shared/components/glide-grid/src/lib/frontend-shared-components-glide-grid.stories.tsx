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
    cell: genNumericCell({ data: 'units' }),
  },
  {
    title: 'Rent Owed',
    id: 'rent-owed',
    grow: 1,
    cell: genNumericCell({ data: 'rentOwed', contentAlign: 'right' }),
  },
];

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
