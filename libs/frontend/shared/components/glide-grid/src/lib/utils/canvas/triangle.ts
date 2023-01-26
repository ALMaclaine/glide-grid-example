import type { EaselProps, Imageable } from './easel';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, Easel } from './easel';
import { ObjectValues } from '../../types/general';
import { midPoint } from './utils';

const TRIANGLE_DIRECTIONS = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
} as const;

type TriangleDirection = ObjectValues<typeof TRIANGLE_DIRECTIONS>;

type TriangleProps = EaselProps;

class Triangle implements Imageable {
  private readonly _width;
  private readonly _height;
  private readonly easel;
  private fillColor = 'black';
  // private
  constructor(props?: TriangleProps) {
    this._width = props?.width ? props.width : DEFAULT_WIDTH;
    this._height = props?.height ? props.height : DEFAULT_HEIGHT;
    this.easel = new Easel(props);
  }

  image(): ImageData {
    return this.easel.image();
  }

  fill(color: string) {
    this.fillColor = color;
  }

  private drawUp() {
    this.easel.draw((ctx) => {
      const _midPoint = midPoint(0, this._width);
      ctx.fillStyle = this.fillColor;
      ctx.beginPath();
      ctx.moveTo(_midPoint, 0);
      ctx.lineTo(0, this._height);
      ctx.lineTo(this._width, this._height);
      ctx.fill();
    });
  }

  private drawDown() {
    this.easel.draw((ctx) => {
      const _midPoint = midPoint(0, this._width);
      ctx.fillStyle = this.fillColor;
      ctx.beginPath();
      ctx.moveTo(_midPoint, this._height);
      ctx.lineTo(0, 0);
      ctx.lineTo(this._width, 0);
      ctx.fill();
    });
  }

  private drawRight() {
    this.easel.draw((ctx) => {
      const _midPoint = midPoint(0, this._height);
      ctx.fillStyle = this.fillColor;
      ctx.beginPath();
      ctx.moveTo(this._width, _midPoint);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, this._height);
      ctx.fill();
    });
  }

  private drawLeft() {
    this.easel.draw((ctx) => {
      const _midPoint = midPoint(0, this._height);
      ctx.fillStyle = this.fillColor;
      ctx.beginPath();
      ctx.moveTo(0, _midPoint);
      ctx.lineTo(this._width, this._height);
      ctx.lineTo(this._width, 0);
      ctx.fill();
    });
  }

  clear() {
    this.easel.clear();
    this.lastDirection = undefined;
  }

  private lastDirection?: TriangleDirection;
  draw(direction: TriangleDirection = TRIANGLE_DIRECTIONS.up) {
    if (this.lastDirection === direction) {
      return;
    } else {
      this.lastDirection = direction;
    }

    switch (direction) {
      case TRIANGLE_DIRECTIONS.up: {
        this.drawUp();
        return;
      }
      case TRIANGLE_DIRECTIONS.right: {
        this.drawRight();
        return;
      }
      case TRIANGLE_DIRECTIONS.left: {
        this.drawLeft();
        return;
      }
      case TRIANGLE_DIRECTIONS.down: {
        this.drawDown();
        return;
      }
    }
  }
}

export { Triangle, TRIANGLE_DIRECTIONS };
export type { TriangleDirection, TriangleProps };
