import { Triangle, TRIANGLE_DIRECTIONS } from './triangle';
import { StackedTriangles } from './stacked-triangles';
import type { DrawHeaderCallback } from '@glideapps/glide-data-grid';
import type { StateSet } from '../sort/sort-state-machine';
import type { SortStates } from '../sort/object-sort';
import { SORT_STATES } from '../sort/object-sort';
import { positioner } from './utils';
import { drawTextCell } from '@glideapps/glide-data-grid';
import { Rectangle } from './rectangle';
import type { WrappedGridColumn } from '../managers/grid-manager/types';

const WIDTH = 8;
const HEIGHT = 5;
const GAP = 4;

const triangle = new Triangle({
  width: WIDTH,
  height: HEIGHT,
});

const stackedTriangles = new StackedTriangles({
  width: WIDTH,
  height: HEIGHT,
  gap: GAP,
});

const getTriangle = (colors: {
  backgroundColor: string;
  fillColor: string;
}): Triangle => {
  if (colors.backgroundColor) {
    triangle.setBackground(colors.backgroundColor);
  }

  if (colors.fillColor) {
    triangle.setFill(colors.fillColor);
  }

  return triangle;
};

const getStackedTriangle = (colors: {
  backgroundColor: string;
  fillColor: string;
}): StackedTriangles => {
  if (colors.backgroundColor) {
    stackedTriangles.setBackground(colors.backgroundColor);
  }

  if (colors.fillColor) {
    stackedTriangles.setFill(colors.fillColor);
  }

  return stackedTriangles;
};

const headerThemePriority = (header: Parameters<DrawHeaderCallback>[0]) => {
  const { isSelected, isHovered, hasSelectedCell } = header;
  if (isSelected) {
    return header.theme.accentColor;
  } else if (isHovered) {
    return header.theme.bgHeaderHovered;
  } else if (hasSelectedCell) {
    return header.theme.bgHeaderHasFocus;
  }
  return 'white';
};

type GetHeaderImageProps = {
  isSorted: boolean;
  sortState: SortStates;
  backgroundColor: string;
  fillColor: string;
};

const getHeaderSortCanvas = (props: GetHeaderImageProps): OffscreenCanvas => {
  const { isSorted, sortState, backgroundColor, fillColor } = props;

  const stackedTriangles = getStackedTriangle({
    backgroundColor,
    fillColor,
  });

  const triangle = getTriangle({
    backgroundColor,
    fillColor,
  });

  if (isSorted) {
    switch (sortState) {
      case SORT_STATES.initial: {
        stackedTriangles.draw();
        return stackedTriangles.canvas();
      }
      case SORT_STATES.ascending: {
        triangle.drawTriangle(TRIANGLE_DIRECTIONS.up);
        return triangle.canvas();
      }
      case SORT_STATES.descending: {
        triangle.drawTriangle(TRIANGLE_DIRECTIONS.down);
        return triangle.canvas();
      }
      default: {
        return triangle.canvas();
      }
    }
  } else {
    stackedTriangles.draw();
    return stackedTriangles.canvas();
  }
};

type DrawHeaderCallbackProps = Parameters<DrawHeaderCallback>[0];

const drawHeaderSort = <T extends object>(
  headerProps: DrawHeaderCallbackProps,
  stateHistory: StateSet<T>[]
) => {
  const { ctx, rect, theme, column: _column, isSelected } = headerProps;
  const column = _column as WrappedGridColumn<T>;
  const {
    id,
    title,
    shouldSort,
    cell: { contentAlign },
  } = column;

  const { x, y, width, height } = rect;

  const stateSet = stateHistory.find((state) => state.key === id);
  const isSorted = stateSet !== undefined;
  const sortState = stateSet?.state || SORT_STATES.initial;
  if (contentAlign === 'right') {
    drawTextCell(
      {
        rect: {
          ...rect,
          x: rect.x - (shouldSort ? 16 : 0),
        },
        theme,
        ctx,
      } as never,
      title,
      contentAlign
    );
  } else {
    drawTextCell({ rect, theme, ctx } as never, title, contentAlign);
  }

  if (shouldSort) {
    const image = getHeaderSortCanvas({
      isSorted,
      sortState,
      backgroundColor: headerThemePriority(headerProps),
      fillColor: theme.textHeaderSelected,
    });

    const pos = positioner({
      containerWidth: width,
      containerHeight: height,
      itemWidth: image.width,
      itemHeight: image.height,
      position: 'midRight',
      padding: theme.cellHorizontalPadding,
    });
    ctx.drawImage(image, pos.x + x, pos.y + y);

    if (isSelected) {
      const rectangle = new Rectangle({ width: rect.width, height: 2 });
      rectangle.setFill(theme.linkColor);
      rectangle.drawRectangle();

      const pos2 = positioner({
        containerWidth: width,
        containerHeight: height,
        itemWidth: rectangle.width,
        itemHeight: rectangle.height,
        position: 'botMid',
      });

      ctx.drawImage(rectangle.canvas(), pos2.x + x, pos2.y + y);
    }
  }
};

export {
  getTriangle,
  getStackedTriangle,
  headerThemePriority,
  getHeaderSortCanvas,
  drawHeaderSort,
};
