import type { EaselProps } from './easel';
import { Easel } from './easel';

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
