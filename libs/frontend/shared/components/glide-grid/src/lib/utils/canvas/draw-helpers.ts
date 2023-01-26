import { Triangle, TRIANGLE_DIRECTIONS } from './triangle';
import { StackedTriangles } from './stacked-triangles';
import type { DrawHeaderCallback } from '@glideapps/glide-data-grid';
import type { StateSetHistory } from '../sort/sort-state-machine';
import type { Indexable } from '../../types/general';
import { SORT_STATES, SortStates } from '../sort/object-sort';
import { positioner } from './utils';

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
    triangle.background(colors.backgroundColor);
  }

  if (colors.fillColor) {
    triangle.fill(colors.fillColor);
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
        triangle.draw(TRIANGLE_DIRECTIONS.up);
        return triangle.image();
      }
      case SORT_STATES.descending: {
        triangle.draw(TRIANGLE_DIRECTIONS.down);
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

const drawHeaderSort = <T extends Indexable>(
  headerProps: DrawHeaderCallbackProps,
  stateHistory: StateSetHistory<T>
) => {
  const {
    ctx,
    rect,
    theme,
    column: { id },
  } = headerProps;
  const {
    currentStateSet: { value: curValue, state: curState },
    previousStateSet: { value: prevValue, state: prevState },
  } = stateHistory;

  const { x, y, width, height } = rect;
  const zoomed = window.devicePixelRatio > 1;
  const zoomFactor = zoomed ? 2 : 1;

  const isSorted = curValue === id || prevValue === id;
  const sortState = curValue === id ? curState : prevState;

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
    padding: 8,
  });

  ctx.putImageData(image, zoomFactor * (pos.x + x), pos.y + y);
};

export {
  getTriangle,
  getStackedTriangle,
  headerThemePriority,
  getHeaderSortImage,
  drawHeaderSort,
};
