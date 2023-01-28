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
import type { WrappedGridColumn } from './types/grid';
import { Columns } from './utils/columns';

export default {
  title: 'GlideGrid/PropertiesPage',
  component: GlideGrid,
  decorators: [
    (Story) => (
      <div style={{ height: '100%' }}>
        <Story />
        <div id="portal" />
      </div>
    ),
  ],
} as Meta;

export const Primary: ComponentStory<typeof GlideGrid<Property>> = <T,>(
  args: GlideGridProps<T>
) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '80vw',
          height: '60vh',
        }}
      >
        <GlideGrid {...args} />
      </div>
    </div>
  );
};

interface Property {
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

const columns = new Columns<Property>({
  columns: columnsDetails,
  // hiddenColumns: ['rentOwed'],
});

const RENT_OWED_SET = [1300.32, 1500.0, 700.12, 900.43];
const INVESTORS = [randCompanyName(), randCompanyName(), randCompanyName()];
function genProperty(): Property {
  return {
    property: randAddress().street,
    address: randAddress().street,
    investor: INVESTORS[Math.floor(Math.random() * INVESTORS.length)] + '',
    units: Math.round(Math.random() * 2 + 1).toString(),
    rentOwed:
      RENT_OWED_SET[Math.floor(Math.random() * RENT_OWED_SET.length)] + '',
  };
}

const data: Property[] = [...Array(100).fill(0).map(genProperty)];

Primary.args = {
  columns,
  data,
  rows: data.length,
};
