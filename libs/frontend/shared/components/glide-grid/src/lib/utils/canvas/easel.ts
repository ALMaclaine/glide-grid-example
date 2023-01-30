import { Position } from './utils';
import { MiniCache } from '../mini-cache';

type Context2dProcessor = (ctx: OffscreenCanvasRenderingContext2D) => void;

type EaselProps = {
  width: number;
  height: number;
};

const DEFAULT_WIDTH = 512;
const DEFAULT_HEIGHT = 512;

class Easel {
  private canvasRef: OffscreenCanvas;
  private readonly context: OffscreenCanvasRenderingContext2D;
  private readonly _width: number;
  private readonly _height: number;
  private _background = 'white';

  constructor(props?: EaselProps) {
    this._width = props?.width ? props.width : DEFAULT_WIDTH;
    this._height = props?.height ? props.height : DEFAULT_HEIGHT;
    if (!document.createElement) {
      throw new Error('OffscreenCanvas only works in DOM environment');
    }

    this.canvasRef = new OffscreenCanvas(this._width, this._height);
    const context = this.canvasRef.getContext('2d', {
      willReadFrequently: true,
    });
    if (!context) {
      throw new Error('Context could not be created');
    }
    this.context = context;
  }

  drawBackground() {
    this.context.fillStyle = this._background;
    this.context.beginPath();
    this.context.rect(0, 0, this._width, this._height);
    this.context.fill();
  }

  background(color: string) {
    this._background = color;
  }

  private imageCache = new MiniCache<ImageData>();

  private clearScreen() {
    this.context.clearRect(0, 0, this._width, this._height);
  }

  clear() {
    this.imageCache.dirty();
    this.clearScreen();
  }

  putImageData(image: ImageData, { x, y }: Position) {
    this.context.putImageData(image, x, y);
  }

  image() {
    if (this.imageCache.isClean) {
      return this.imageCache.getCache();
    }
    const imageData = this.context.getImageData(
      0,
      0,
      this._width,
      this._height
    );
    this.imageCache.cache(imageData);
    return this.imageCache.getCache();
  }

  draw(processor: Context2dProcessor) {
    this.imageCache.dirty();
    processor(this.context);
  }
}

export { Easel, DEFAULT_WIDTH, DEFAULT_HEIGHT };
export type { EaselProps, Context2dProcessor };
