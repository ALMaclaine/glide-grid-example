import { useCallback, useEffect, useRef } from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import { Easel } from './easel';
import { Triangle } from './triangle';

const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triangle = useRef<Triangle>(new Triangle({ width: 1024, height: 512 }));

  const innerDraw = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain context');
    }
    triangle.current.fill('red');
    triangle.current.draw('down');
    const image = triangle.current.image();

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
        style={{ width: '1024px', height: '512px', border: '1px solid black' }}
      >
        <canvas width={1024} height={512} ref={canvasRef} />
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
