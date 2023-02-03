import type {
  GenerateWrappedColumnProps} from '../../../utils/cells/generators';
import {
  GENERATOR_TYPES,
} from '../../../utils/cells/generators';
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
    // grow: 2,
    width: 200,
    cellType: GENERATOR_TYPES.uri,
    dataId: 'property',
    shouldSort: true,
  },
  {
    title: 'Address',
    width: 500,
    cellType: GENERATOR_TYPES.text,
    dataId: 'address',
  },
  {
    title: 'Investor',
    width: 500,
    cellType: GENERATOR_TYPES.text,
    dataId: 'investor',
  },
  {
    title: 'Units',
    width: 500,
    shouldSort: true,
    cellType: GENERATOR_TYPES.numeric,
    dataId: 'units',
  },
  {
    title: 'Rent Owed',
    width: 500,
    cellType: GENERATOR_TYPES.numeric,
    dataId: 'rentOwed',
    contentAlign: 'right',
    shouldSort: true,
  },
];

const RENT_OWED_SET = [1300.32, -1500.0, 700.12, -900.43];
const INVESTORS = [randCompanyName(), randCompanyName(), randCompanyName()];
const genProperty = (): Property => {
  return {
    property: randAddress().street,
    address: randAddress().street,
    investor: INVESTORS[Math.floor(Math.random() * INVESTORS.length)] + '',
    units: Math.round(Math.random() * 5 + 1).toString(),
    rentOwed: `${
      RENT_OWED_SET[Math.floor(Math.random() * RENT_OWED_SET.length)]
    }`,
  };
};

export type { Property };
export { PROPERTY_COLUMNS, genProperty };
