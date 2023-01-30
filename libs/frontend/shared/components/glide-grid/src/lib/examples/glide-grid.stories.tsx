import { ComponentStory, Meta } from '@storybook/react';
import { GlideGrid, GlideGridProps } from '../glide-grid';
import { GridManager } from '../utils/grid-manager';
import { genProperty, Property, PROPERTY_COLUMNS } from './data/property';
import { asyncGenerate, generate } from './utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

export const Primary: ComponentStory<typeof GlideGrid<Property>> = () => {
  const gridManager = useMemo(
    () =>
      new GridManager({
        columns: PROPERTY_COLUMNS,
        data: [],
        hiddenColumns: ['investor', 'address'],
      }),
    []
  );

  const dataManager = useMemo(() => {
    const map = new Map<string, Property[]>();
    companies.map((company) => map.set(company, []));
    return map;
  }, []);

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
            <option>{e}</option>
          ))}
        </select>
        <button onClick={() => updateData()}>Add Data</button>
        <div>Count: {gridManager.length}</div>
        <div>State: {state}</div>
        <GlideGrid gridManager={gridManager} />
      </div>
    </div>
  );
};

Primary.args = {};
