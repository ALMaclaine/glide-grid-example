import {
  GenerateWrappedColumnProps,
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

const PROPERTY_COLUMNS: GenerateWrappedColumnProps<Property>[] = [
  {
    title: 'Property',
    grow: 2,
    cellGen: genUriCell,
    dataId: 'property',
    cursor: 'pointer',
    themeOverride: {
      textDark: 'blue',
      baseFontStyle: '12px underlined',
    },
  },
  {
    title: 'Address',
    grow: 2,
    cellGen: genTextCell,
    dataId: 'address',
  },
  {
    title: 'Investor',
    grow: 2,
    cellGen: genTextCell,
    dataId: 'investor',
  },
  {
    title: 'Units',
    grow: 1,
    cellGen: genNumericCell,
    dataId: 'units',
  },
  {
    title: 'Rent Owed',
    grow: 1,
    cellGen: genNumericCell,
    dataId: 'rentOwed',
    contentAlign: 'right',
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
