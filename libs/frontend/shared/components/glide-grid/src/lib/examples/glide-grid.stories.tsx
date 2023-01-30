import { ComponentStory, Meta } from '@storybook/react';
import { GlideGrid, GlideGridProps } from '../glide-grid';
import { GridManager } from '../utils/grid-manager';
import { genProperty, Property, PROPERTY_COLUMNS } from './data/property';
import { generate } from './utils';

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
  const gridManager = new GridManager({
    columns: PROPERTY_COLUMNS,
    data,
    hiddenColumns: ['investor', 'address'],
  });
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

const data: Property[] = generate(100, genProperty);

Primary.args = {};
