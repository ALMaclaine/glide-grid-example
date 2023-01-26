import { Position } from './utils';

type Context2dProcessor = (ctx: OffscreenCanvasRenderingContext2D) => void;

type EaselProps = {
  width: number;
  height: number;
};

interface Imageable {
  image(): ImageData;
}

const DEFAULT_WIDTH = 512;
const DEFAULT_HEIGHT = 512;

class Easel implements Imageable {
  private canvasRef: OffscreenCanvas;
  private readonly context: OffscreenCanvasRenderingContext2D;
  private readonly _width: number;
  private readonly _height: number;

  constructor(props?: EaselProps) {
    this._width = props?.width ? props.width : DEFAULT_WIDTH;
    this._height = props?.height ? props.height : DEFAULT_HEIGHT;
    if (!document.createElement) {
      throw new Error('OffscreenCanvas only works in DOM environment');
    }

    this.canvasRef = new OffscreenCanvas(this._width, this._height);
    const context = this.canvasRef.getContext('2d');
    if (!context) {
      throw new Error('Context could not be created');
    }
    this.context = context;
  }

  private clearCache() {
    this.imageCache = undefined;
  }

  private clearScreen() {
    this.context.clearRect(0, 0, this._width, this._height);
  }

  clear() {
    this.clearCache();
    this.clearScreen();
  }

  putImageData(image: ImageData, { x, y }: Position) {
    this.context.putImageData(image, x, y);
  }

  private imageCache?: ImageData;
  image() {
    if (this.imageCache) {
      return this.imageCache;
    }
    const imageData = this.context.getImageData(
      0,
      0,
      this._width,
      this._height
    );
    this.imageCache = imageData;
    return this.imageCache;
  }

  draw(processor: Context2dProcessor) {
    if (this.imageCache) {
      this.clearCache();
    }
    processor(this.context);
  }
}

export { Easel, DEFAULT_WIDTH, DEFAULT_HEIGHT };
export type { EaselProps, Context2dProcessor, Imageable };
