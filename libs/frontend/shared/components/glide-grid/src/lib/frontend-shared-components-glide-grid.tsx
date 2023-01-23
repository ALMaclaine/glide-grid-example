import {
  DataEditor,
  GridMouseEventArgs,
  Item,
  UriCell,
} from '@glideapps/glide-data-grid';
import '@glideapps/glide-data-grid/dist/index.css';
import type { GlideGridProps, Indexable, RowGetter } from './types';
import { useCallback, useMemo } from 'react';
import { GetRowThemeCallback } from '@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render';
import { addIdsToRows, genGetCellContent, noOp, noOpObj } from './utils';
import { useRowHoverHighlight } from './hooks/use-row-hover-highlight';

const useGenGetCellContent = <T extends Indexable>({
  columns,
  getRow,
}: Pick<GlideGridProps<T>, 'columns'> & { getRow: RowGetter<T> }) => {
  // useCallback can't be used for generating functions because it expects an inline function definition
  // https://kyleshevlin.com/debounce-and-throttle-callbacks-with-react-hooks
  // https://stackoverflow.com/questions/69830440/react-hook-usecallback-received-a-function-whose-dependencies-are-unknown-pass
  const getCellContent = useMemo(
    () => genGetCellContent(columns, getRow),
    [columns, getRow]
  );
  return { getCellContent };
};

const useSetupData = <T extends Indexable>(data: T[]) => {
  const dataWithIds = useMemo(() => addIdsToRows(data), [data]);
  console.log(dataWithIds);
  const getRow = useCallback(
    (row: number) => dataWithIds[row] ?? {},
    [dataWithIds]
  );
  return { getRow };
};

function GlideGrid<T extends Indexable>({
  columns,
  data,
  rows,
  onItemHovered = noOp,
  getRowThemeOverride = noOpObj,
}: GlideGridProps<T>) {
  const { getRow } = useSetupData(data);

  const {
    onItemHovered: onItemHoveredHighlight,
    getRowThemeOverride: getRowHoveredThemeOverride,
  } = useRowHoverHighlight();

  const _onItemHovered = useCallback(
    (args: GridMouseEventArgs) => {
      onItemHoveredHighlight(args);
      onItemHovered(args);
    },
    [onItemHovered, onItemHoveredHighlight]
  );

  const _getRowThemeOverride = useCallback<GetRowThemeCallback>(
    (row) => {
      return {
        ...getRowThemeOverride(row),
        ...getRowHoveredThemeOverride(row),
      };
    },
    [getRowHoveredThemeOverride, getRowThemeOverride]
  );

  const { getCellContent } = useGenGetCellContent({ columns, getRow });

  return (
    <DataEditor
      // width 100% needed otherwise grow/resizing animates slowly to fill extra width
      width="100%"
      verticalBorder={false}
      columns={columns}
      getCellsForSelection={true}
      getCellContent={getCellContent}
      onCellClicked={(item: Item) => {
        const { kind, ...rest } = getCellContent(item);
        if (kind === 'uri') {
          // TODO: use type guard
          const { data } = rest as UriCell;
          window.alert('Navigating to: ' + data);
        }
      }}
      smoothScrollX={true}
      smoothScrollY={true}
      onItemHovered={_onItemHovered}
      getRowThemeOverride={_getRowThemeOverride}
      rows={rows}
    />
  );
}

export { GlideGrid, GlideGridProps };
