import { DEFAULT_HEIGHT, DEFAULT_WIDTH, Easel } from './easel';
import { positioner, ALIGNMENTS } from './utils';
import { Triangle, TRIANGLE_DIRECTIONS, TriangleProps } from './triangle';

type StackedTriangleProps = TriangleProps & {
  gap?: number;
};

class StackedTriangles {
  private readonly _width;
  get width() {
    return this._width;
  }
  private readonly itemHeight;

  private readonly _height;
  get height() {
    return this._height;
  }
  private readonly triangle;

  private readonly easel: Easel;
  private dirty = true;
  // private
  constructor(props?: StackedTriangleProps) {
    const gap = props?.gap ? props.gap : 0;
    this._width = props?.width ? props.width : DEFAULT_WIDTH;
    const height = props?.height ? props.height : DEFAULT_HEIGHT;
    this.itemHeight = height;
    this._height = 2 * height + gap;
    this.triangle = new Triangle({ width: this._width, height });
    this.easel = new Easel({
      width: this._width,
      height: this._height,
    });
  }

  image(): ImageData {
    return this.easel.image();
  }

  fill(color: string) {
    this.triangle.fill(color);
    this.clear();
  }

  background(color: string) {
    this.triangle.background(color);
    this.easel.background(color);
    this.clear();
  }

  clear() {
    this.triangle.clear();
    this.easel.clear();
    this.dirty = true;
  }

  draw() {
    if (!this.dirty) {
      return;
    }

    this.triangle.draw(TRIANGLE_DIRECTIONS.up);
    const triangleUpImage = this.triangle.image();
    this.triangle.clear();

    this.triangle.draw(TRIANGLE_DIRECTIONS.down);
    const triangleDownImage = this.triangle.image();
    this.triangle.clear();

    this.easel.drawBackground();

    const baseOptions = {
      containerWidth: this._width,
      containerHeight: this._height,
      itemWidth: this._width,
      itemHeight: this.itemHeight,
    };

    const pos1 = positioner({
      ...baseOptions,
      position: ALIGNMENTS.topMid,
    });

    const pos2 = positioner({
      ...baseOptions,
      position: ALIGNMENTS.botMid,
    });

    this.easel.putImageData(triangleUpImage, pos1);
    this.easel.putImageData(triangleDownImage, pos2);
    this.dirty = false;
  }
}

export { StackedTriangles };
export type { StackedTriangleProps };
