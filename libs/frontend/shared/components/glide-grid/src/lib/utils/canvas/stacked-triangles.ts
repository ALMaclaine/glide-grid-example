import { DEFAULT_HEIGHT, DEFAULT_WIDTH, Easel } from './easel';
import { positioner, ALIGNMENTS } from './utils';
import type { TriangleProps } from './triangle';
import { Triangle, TRIANGLE_DIRECTIONS } from './triangle';

type StackedTriangleProps = TriangleProps & {
  gap?: number;
};

class StackedTriangles extends Easel {
  private readonly triangle: Triangle;

  // private
  constructor(props?: StackedTriangleProps) {
    const {
      gap = 0,
      width = DEFAULT_WIDTH,
      height = DEFAULT_HEIGHT,
    } = props || {};

    super({ width, height: 2 * height + gap });
    this.triangle = new Triangle({ width, height });
  }

  canvas(): OffscreenCanvas {
    return super.canvas();
  }

  set fill(color: string) {
    this.triangle.fill = color;
    super.fill = color;
  }

  set background(color: string) {
    this.triangle.background = color;
    super.background = color;
  }

  clear() {
    this.triangle.clear();
    super.clear();
  }

  private drawTopTriangle() {
    this.triangle.drawTriangle(TRIANGLE_DIRECTIONS.up);
    const pos1 = positioner({
      containerWidth: this._width,
      containerHeight: this._height,
      itemWidth: this.triangle.width,
      itemHeight: this.triangle.height,
      position: ALIGNMENTS.topMid,
    });

    this.drawImage(this.triangle.canvas(), pos1);
    this.triangle.clear();
  }

  private drawBottomTriangle() {
    this.triangle.drawTriangle(TRIANGLE_DIRECTIONS.down);
    const pos2 = positioner({
      containerWidth: this._width,
      containerHeight: this._height,
      itemWidth: this.triangle.width,
      itemHeight: this.triangle.height,
      position: ALIGNMENTS.botMid,
    });

    this.drawImage(this.triangle.canvas(), pos2);
    this.triangle.clear();
  }

  draw() {
    this.drawBackground();
    this.drawTopTriangle();
    this.drawBottomTriangle();
  }
}

export { StackedTriangles };
export type { StackedTriangleProps };
