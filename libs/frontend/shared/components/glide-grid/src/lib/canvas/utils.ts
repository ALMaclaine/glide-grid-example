import { ObjectValues } from '../types/general';

const midPoint = (start: number, end: number) => (end + start) / 2;

const ALIGNMENTS = {
  topLeft: 'topLeft',
  topMid: 'topMid',
  topRight: 'topRight',
  midLeft: 'midLeft',
  midMid: 'midMid',
  midRight: 'midRight',
  botLeft: 'botLeft',
  botMid: 'botMid',
  botRight: 'botRight',
} as const;

type Alignments = ObjectValues<typeof ALIGNMENTS>;

type Position = {
  x: number;
  y: number;
};

type PositionerProps = {
  containerWidth: number;
  containerHeight: number;
  itemWidth: number;
  itemHeight: number;
  position: Alignments;
  padding?: number;
};

const midPointShift = (containerWidth: number, itemWidth: number) => {
  return midPoint(0, containerWidth) - midPoint(0, itemWidth);
};

const positioner = (props: PositionerProps) => {
  const {
    containerWidth,
    containerHeight,
    itemWidth,
    itemHeight,
    position,
    padding = 0,
  } = props;
  const widthDiff = containerWidth - itemWidth - padding;
  const heightDiff = containerHeight - itemHeight - padding;
  switch (position) {
    case ALIGNMENTS.topLeft: {
      return { x: padding, y: padding };
    }
    case ALIGNMENTS.topMid: {
      return { x: midPointShift(containerWidth, itemWidth), y: padding };
    }
    case ALIGNMENTS.topRight: {
      return {
        x: widthDiff,
        y: padding,
      };
    }
    case ALIGNMENTS.midLeft: {
      return {
        x: padding,
        y: midPointShift(containerHeight, itemHeight),
      };
    }
    case ALIGNMENTS.midMid: {
      return {
        x: midPointShift(containerWidth, itemWidth),
        y: midPointShift(containerHeight, itemHeight),
      };
    }
    case ALIGNMENTS.midRight: {
      return {
        x: widthDiff,
        y: midPointShift(containerHeight, itemHeight),
      };
    }
    case ALIGNMENTS.botLeft: {
      return {
        x: padding,
        y: heightDiff,
      };
    }
    case ALIGNMENTS.botMid: {
      return {
        x: midPointShift(containerWidth, itemWidth),
        y: heightDiff,
      };
    }
    case ALIGNMENTS.botRight: {
      return {
        x: widthDiff,
        y: heightDiff,
      };
    }
  }
  return { x: 0, y: 0 };
};

export { midPoint, positioner, ALIGNMENTS };
export type { Alignments, Position };
