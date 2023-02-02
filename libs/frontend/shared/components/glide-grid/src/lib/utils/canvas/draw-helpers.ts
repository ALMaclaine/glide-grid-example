import { Triangle, TRIANGLE_DIRECTIONS } from './triangle';
import { StackedTriangles } from './stacked-triangles';
import type { DrawHeaderCallback } from '@glideapps/glide-data-grid';
import type { StateSet } from '../sort/sort-state-machine';
import { SORT_STATES, SortStates } from '../sort/object-sort';
import { positioner } from './utils';
import { drawTextCell } from '@glideapps/glide-data-grid';
import { WrappedGridColumn } from '../../types/grid';
import { Rectangle } from './rectangle';

const WIDTH = 8;
const HEIGHT = 5;
const ZOOM_FACTOR = 2;
const ZOOM_WIDTH = ZOOM_FACTOR * WIDTH;
const ZOOM_HEIGHT = ZOOM_FACTOR * HEIGHT;
const GAP = 4;

const zoomX1Triangle = new Triangle({
  width: WIDTH,
  height: HEIGHT,
});

const zoomX2Triangle = new Triangle({
  width: ZOOM_WIDTH,
  height: ZOOM_HEIGHT,
});

const zoomX1StackedTriangles = new StackedTriangles({
  width: WIDTH,
  height: HEIGHT,
  gap: GAP,
});

const zoomX2StackedTriangles = new StackedTriangles({
  width: ZOOM_WIDTH,
  height: ZOOM_HEIGHT,
  gap: GAP,
});

const getTriangle = (
  zoomed = false,
  colors: { backgroundColor: string; fillColor: string }
): Triangle => {
  const triangle = zoomed ? zoomX2Triangle : zoomX1Triangle;
  if (colors.backgroundColor) {
    triangle.background = colors.backgroundColor;
  }

  if (colors.fillColor) {
    triangle.fill = colors.fillColor;
  }

  return triangle;
};

const getStackedTriangle = (
  zoomed = false,
  colors: { backgroundColor: string; fillColor: string }
): StackedTriangles => {
  const stackedTriangles = zoomed
    ? zoomX2StackedTriangles
    : zoomX1StackedTriangles;

  if (colors.backgroundColor) {
    stackedTriangles.background(colors.backgroundColor);
  }

  if (colors.fillColor) {
    stackedTriangles.fill(colors.fillColor);
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
  zoomed: boolean;
  backgroundColor: string;
  fillColor: string;
};
const getHeaderSortImage = (props: GetHeaderImageProps) => {
  const { isSorted, sortState, zoomed, backgroundColor, fillColor } = props;

  const stackedTriangles = getStackedTriangle(zoomed, {
    backgroundColor,
    fillColor,
  });

  const triangle = getTriangle(zoomed, {
    backgroundColor,
    fillColor,
  });

  if (isSorted) {
    switch (sortState) {
      case SORT_STATES.initial: {
        stackedTriangles.draw();
        return stackedTriangles.image();
      }
      case SORT_STATES.ascending: {
        triangle.drawTriangle(TRIANGLE_DIRECTIONS.up);
        return triangle.image();
      }
      case SORT_STATES.descending: {
        triangle.drawTriangle(TRIANGLE_DIRECTIONS.down);
        return triangle.image();
      }
      default: {
        return triangle.image();
      }
    }
  } else {
    stackedTriangles.draw();
    return stackedTriangles.image();
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
  const zoomed = window.devicePixelRatio > 1;
  const zoomFactor = zoomed ? 2 : 1;

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
      } as any,
      title,
      contentAlign
    );
  } else {
    drawTextCell({ rect, theme, ctx } as any, title, contentAlign);
  }

  if (shouldSort) {
    const image = getHeaderSortImage({
      isSorted,
      sortState,
      backgroundColor: headerThemePriority(headerProps),
      fillColor: theme.textHeaderSelected,
      zoomed,
    });

    const pos = positioner({
      containerWidth: width,
      containerHeight: zoomFactor * height,
      itemWidth: image.width,
      itemHeight: image.height,
      position: 'midRight',
      padding: theme.cellHorizontalPadding,
    });
    ctx.putImageData(image, zoomFactor * (pos.x + x), pos.y + y);

    if (isSelected) {
      const rectangle = new Rectangle({ width: rect.width, height: 2 });
      rectangle.fill = theme.linkColor;
      rectangle.drawRectangle();

      const pos2 = positioner({
        containerWidth: width,
        containerHeight: zoomFactor * height,
        itemWidth: rectangle.width,
        itemHeight: rectangle.height,
        position: 'botMid',
      });

      ctx.putImageData(
        rectangle.image(),
        zoomFactor * (pos2.x + x),
        pos2.y + y
      );
    }
  }
};

export {
  getTriangle,
  getStackedTriangle,
  headerThemePriority,
  getHeaderSortImage,
  drawHeaderSort,
};
