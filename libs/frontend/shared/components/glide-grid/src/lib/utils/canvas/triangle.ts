import type { EaselProps } from './easel';
import { Easel } from './easel';
import type { ObjectValues } from '../../types/general';
import { midPoint } from './utils';

const TRIANGLE_DIRECTIONS = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
} as const;

type TriangleDirection = ObjectValues<typeof TRIANGLE_DIRECTIONS>;

type TriangleProps = EaselProps;

class Triangle extends Easel {
  clear() {
    super.clear();
    this.lastDirection = undefined;
  }

  private drawUp() {
    super.draw((ctx) => {
      this.drawBackground();
      const _midPoint = midPoint(0, this._width);
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      ctx.moveTo(_midPoint, 0);
      ctx.lineTo(0, this._height);
      ctx.lineTo(this._width, this._height);
      ctx.fill();
    });
  }

  private drawDown() {
    super.draw((ctx) => {
      this.drawBackground();
      const _midPoint = midPoint(0, this._width);
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      ctx.moveTo(_midPoint, this._height);
      ctx.lineTo(0, 0);
      ctx.lineTo(this._width, 0);
      ctx.fill();
    });
  }

  private drawRight() {
    super.draw((ctx) => {
      this.drawBackground();
      const _midPoint = midPoint(0, this._height);
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      ctx.moveTo(this._width, _midPoint);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, this._height);
      ctx.fill();
    });
  }

  private drawLeft() {
    super.draw((ctx) => {
      this.drawBackground();
      const _midPoint = midPoint(0, this._height);
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      ctx.moveTo(0, _midPoint);
      ctx.lineTo(this._width, this._height);
      ctx.lineTo(this._width, 0);
      ctx.fill();
    });
  }

  private lastDirection?: TriangleDirection;
  drawTriangle(direction: TriangleDirection = TRIANGLE_DIRECTIONS.up) {
    if (this.lastDirection === direction || !this.isDirty) {
      return;
    } else {
      this.lastDirection = direction;
    }

    this.dirty();
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
      default: {
        return;
      }
    }
  }
}

export { Triangle, TRIANGLE_DIRECTIONS };
export type { TriangleDirection, TriangleProps };
