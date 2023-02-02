import type { EaselProps } from './easel';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, Easel } from './easel';
import { ObjectValues } from '../../types/general';
import { midPoint } from './utils';

type RectangleProps = EaselProps;

class Rectangle extends Easel {
  drawRectangle() {
    this.draw((ctx) => {
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      ctx.rect(0, 0, this._width, this._height);
      ctx.fill();
    });
  }
}

export { Rectangle };
export type { RectangleProps };
