import { WrappedGridColumn } from '../../types/grid';
import { uuid } from '../../utils/general';
import {
  genNumericCell,
  genTextCell,
  genUriCell,
} from '../../utils/cells/generators';
import { randAddress, randCompanyName } from '@ngneat/falso';

interface Property {
  property: string;
  address: string;
  investor: string;
  units: string;
  rentOwed: string;
}

const PROPERTY_COLUMNS: WrappedGridColumn<Property>[] = [
  {
    title: 'Property',
    id: 'property',
    grow: 2,
    columnUuid: uuid(),
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
    columnUuid: uuid(),
    cell: genTextCell({ data: 'address' }),
  },
  {
    title: 'Investor',
    id: 'investor',
    grow: 2,
    columnUuid: uuid(),

    cell: genTextCell({ data: 'investor' }),
  },
  {
    title: 'Units',
    id: 'units',
    grow: 1,
    columnUuid: uuid(),

    cell: genNumericCell({ data: 'units' }),
  },
  {
    title: 'Rent Owed',
    id: 'rentOwed',
    grow: 1,
    columnUuid: uuid(),
    cell: genNumericCell({ data: 'rentOwed', contentAlign: 'right' }),
  },
];

const RENT_OWED_SET = [1300.32, 1500.0, 700.12, 900.43];
const INVESTORS = [randCompanyName(), randCompanyName(), randCompanyName()];
const genProperty = (): Property => {
  return {
    property: randAddress().street,
    address: randAddress().street,
    investor: INVESTORS[Math.floor(Math.random() * INVESTORS.length)] + '',
    units: Math.round(Math.random() * 5 + 1).toString(),
    rentOwed:
      RENT_OWED_SET[Math.floor(Math.random() * RENT_OWED_SET.length)] + '',
  };
};

export type { Property };
export { PROPERTY_COLUMNS, genProperty };
