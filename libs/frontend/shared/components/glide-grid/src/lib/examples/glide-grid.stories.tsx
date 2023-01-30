import { ComponentStory, Meta } from '@storybook/react';
import { GlideGrid, GlideGridProps } from '../glide-grid';
import { GridManager } from '../grid-manager';
import { genProperty, Property, PROPERTY_COLUMNS } from './data/property';
import { asyncGenerate, generate } from './utils';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { StringKeys } from '../types/general';

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

const companies = ['company1', 'company2', 'company3'];
const columns: StringKeys<Property>[] = [
  'property',
  'address',
  'investor',
  'units',
  'rentOwed',
] as StringKeys<Property>[];

export const Primary: ComponentStory<typeof GlideGrid<Property>> = () => {
  const [, _refresh] = useState([]);
  const refresh = useCallback(() => _refresh([]), []);

  const gridManager = useMemo(
    () =>
      new GridManager<Property>({
        columns: PROPERTY_COLUMNS,
        data: [],
        // hiddenColumns: ['investor', 'address'],
      }),
    []
  );

  const dataManager = useMemo(() => {
    const map = new Map<string, Property[]>();
    companies.map((company) => map.set(company, []));
    return map;
  }, []);

  const [selectedColumns, setSelectedColumns] = useState(
    {} as Record<StringKeys<Property>, boolean>
  );

  const [state, setState] = useState('waiting');
  const [company, setCompany] = useState(companies[0]);

  const onCompanyChange = (company: string) => {
    setCompany(company);
    const companyData = dataManager.get(company)!;
    gridManager.clearData();
    gridManager.addData(companyData);
  };

  const updateData = async () => {
    setState('loading');
    const data = await asyncGenerate(10, genProperty, Math.random() * 500);
    const companyData = dataManager.get(company)!;
    const newData = [...companyData, ...data];
    gridManager.addData(data);
    dataManager.set(company, newData);
    setState('waiting');
  };

  const onChangeColumns = (colName: StringKeys<Property>) => {
    gridManager.toggleColumnVisibility(colName);
    refresh();
  };

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
        <select
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
        >
          {companies.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <div>
          {Object.entries(gridManager.getColumnNames()).map(([key, value]) => (
            <Fragment key={key}>
              <label>{key}</label>
              <input
                type="checkbox"
                onChange={() => onChangeColumns(value)}
                checked={gridManager.isColumnShowing(value)}
              />
            </Fragment>
          ))}
        </div>
        <button onClick={() => updateData()}>Add Data</button>
        <div>Count: {gridManager.length}</div>
        <div>State: {state}</div>
        <GlideGrid gridManager={gridManager} />
      </div>
    </div>
  );
};

Primary.args = {};
