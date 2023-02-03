import type { ComponentStory, Meta } from '@storybook/react';
import { GlideGrid } from '../../glide-grid';
import { GridManager } from '../../utils/managers/grid-manager/grid-manager';
import type { Property } from './data/property';
import { genProperty, PROPERTY_COLUMNS } from './data/property';
import { asyncGenerate } from './utils';
import { useCallback, useMemo, useState } from 'react';
import type { StringKeys } from '../../types/general';

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
  const [, _refresh] = useState([]);
  const refresh = useCallback(() => _refresh([]), []);

  const gridManager = useMemo<GridManager<Property>>(
    () =>
      new GridManager<Property>({
        columns: PROPERTY_COLUMNS,
        data: [],
        onItemSelected: console.log,
        onRowSelected: console.log,
        onColSelected: console.log,
        onAreaSelected: console.log,
        searchTerms: ['gateway', 'drive', 'vista'],
        filterSet: [
          {
            address: { type: 'identity' },
            investor: { type: 'identity' },
            property: { type: 'identity' },
            rentOwed: { type: 'min', min: 1000 },
            units: { type: 'range', min: 3, max: 4 },
          },
          {
            address: { type: 'identity' },
            investor: { type: 'identity' },
            property: { type: 'identity' },
            rentOwed: { type: 'max', max: 1000 },
            units: { type: 'range', min: 1, max: 2 },
          },
        ],
        // hiddenColumns: ['investor', 'address'],
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
    const companyData = dataManager.get(company);
    if (companyData) {
      gridManager.clear();
      gridManager.addData(companyData);
    }
  };

  const updateData = async () => {
    setState('loading');
    const data = await asyncGenerate(10000, genProperty, Math.random() * 500);
    const companyData = dataManager.get(company);
    if (companyData) {
      const newData = [...companyData, ...data];
      gridManager.addData(data);
      dataManager.set(company, newData);
    }
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
        marginTop: '90px',
      }}
    >
      <div
        style={{
          width: '80vw',
          height: '40vh',
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
          {Object.entries(gridManager.columnTitleIdMap).map(([key, value]) => (
            <div key={key}>
              <label>{key}</label>
              <input
                type="checkbox"
                onChange={() => onChangeColumns(value)}
                checked={gridManager.isColumnShowing(value)}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            void updateData();
          }}
        >
          Add Data
        </button>
        <div>State: {state}</div>
        <div>Page Count: {gridManager.pageCount}</div>
        <select
          onChange={(e) => {
            gridManager.setPage(parseInt(e.target.value));
            refresh();
          }}
          value={gridManager.page}
        >
          {Array(gridManager.pageCount || 1)
            .fill(0)
            .map((_, i) => (
              <option key={i} value={i}>
                {i + 1}
              </option>
            ))}
        </select>
        <input
          value={gridManager.pageSize === 0 ? '' : gridManager.pageSize}
          type="number"
          min={1}
          onChange={(e) => {
            const num = e.target.value === '' ? 0 : parseInt(e.target.value);
            gridManager.setPageSize(num);
            refresh();
          }}
        />
        <GlideGrid gridManager={gridManager} />
      </div>
    </div>
  );
};

Primary.args = {};
