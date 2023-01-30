import { ComponentStory, Meta } from '@storybook/react';
import { GlideGrid, GlideGridProps } from '../glide-grid';
import { GridManager } from '../utils/grid-manager';
import { genProperty, Property, PROPERTY_COLUMNS } from './data/property';
import { generate } from './utils';
import { useMemo } from 'react';

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
  const gridManager = useMemo(
    () =>
      new GridManager({
        columns: PROPERTY_COLUMNS,
        data: generate(100, genProperty),
        hiddenColumns: ['investor', 'address'],
      }),
    []
  );

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
        <GlideGrid gridManager={gridManager} />
      </div>
    </div>
  );
};

Primary.args = {};
