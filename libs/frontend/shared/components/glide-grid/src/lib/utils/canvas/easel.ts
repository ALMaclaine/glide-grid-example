import type { Position } from './utils';

type Context2dProcessor = (ctx: OffscreenCanvasRenderingContext2D) => void;

type EaselProps = {
  width: number;
  height: number;
};

const DEFAULT_WIDTH = 512;
const DEFAULT_HEIGHT = 512;

class Easel {
  private readonly _canvas: OffscreenCanvas;
  private readonly context: OffscreenCanvasRenderingContext2D;
  protected readonly _width: number;
  protected readonly _height: number;
  private _background = 'white';
  private _fill = 'black';

  constructor(props?: EaselProps) {
    this._width = props?.width ? props.width : DEFAULT_WIDTH;
    this._height = props?.height ? props.height : DEFAULT_HEIGHT;
    if (!document.createElement) {
      throw new Error('OffscreenCanvas only works in DOM environment');
    }

    this._canvas = new OffscreenCanvas(this._width, this._height);
    const context = this._canvas.getContext('2d', {
      willReadFrequently: true,
    });
    if (!context) {
      throw new Error('Context could not be created');
    }
    this.context = context;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get fill() {
    return this._fill;
  }

  set fill(color: string) {
    this._fill = color;
    this.clear();
  }

  drawBackground() {
    this.context.fillStyle = this._background;
    this.context.beginPath();
    this.context.rect(0, 0, this._width, this._height);
    this.context.fill();
  }

  set background(color: string) {
    this._background = color;
    this.clear();
  }

  get background() {
    return this._background;
  }

  private clearScreen() {
    this.context.clearRect(0, 0, this._width, this._height);
  }

  clear() {
    this.clearScreen();
  }

  drawImage(canvas: OffscreenCanvas, { x, y }: Position) {
    this.context.drawImage(canvas, x, y);
  }

  canvas() {
    return this._canvas;
  }

  draw(processor: Context2dProcessor) {
    processor(this.context);
  }
}

export { Easel, DEFAULT_WIDTH, DEFAULT_HEIGHT };
export type { EaselProps, Context2dProcessor };
