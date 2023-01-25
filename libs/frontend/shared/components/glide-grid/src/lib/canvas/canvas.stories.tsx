import { useCallback, useEffect, useRef } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

const draw = (ctx: OffscreenCanvasRenderingContext2D) => {
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(
    512 * Math.random(),
    512 * Math.random(),
    20 * Math.random(),
    0,
    2 * Math.PI
  );
  ctx.fill();
};

type Context2dProcessor = (ctx: OffscreenCanvasRenderingContext2D) => void;

class Easel {
  private canvasRef: OffscreenCanvas;
  private readonly context: OffscreenCanvasRenderingContext2D;
  constructor(private width = 512, private height = 512) {
    if (!document.createElement) {
      throw new Error('OffscreenCanvas only works in DOM environment');
    }

    this.canvasRef = new OffscreenCanvas(width, height);
    const context = this.canvasRef.getContext('2d');
    if (!context) {
      throw new Error('Context could not be created');
    }
    this.context = context;
  }

  image() {
    return this.context.getImageData(0, 0, this.width, this.height);
  }

  draw(processor: Context2dProcessor) {
    processor(this.context);
  }
}

const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const innerDraw = useCallback(() => {
    const easel = new Easel();
    for (let i = 0; i < 100; i++) {
      easel.draw(draw);
    }
    const image = easel.image();
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) {
      context.putImageData(image, 0, 0);
    }
  }, []);

  useEffect(() => {
    const timeoutRef = setInterval(innerDraw, 100);
    return () => clearTimeout(timeoutRef);
  }, [innerDraw]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{ width: '512px', height: '512px', border: '1px solid black' }}
      >
        <canvas width={512} height={512} ref={canvasRef} />
      </div>
    </div>
  );
};

export default {
  title: 'Canvas',
  component: CanvasDemo,
} as Meta;

export const Primary: ComponentStory<typeof CanvasDemo> = () => {
  return <CanvasDemo />;
};

Primary.args = {};
