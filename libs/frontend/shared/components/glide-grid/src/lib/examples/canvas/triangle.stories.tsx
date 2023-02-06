import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ComponentStory, Meta } from '@storybook/react';
import { positioner } from '../../utils/canvas/utils';
import { Triangle, TRIANGLE_DIRECTIONS } from '../../utils/canvas/triangle';

const WIDTH = 1024;
const HEIGHT = 512;
const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triangle = useMemo(() => new Triangle({ width: 100, height: 100 }), []);

  const innerDraw = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain context');
    }

    triangle.drawTriangle(TRIANGLE_DIRECTIONS.up);

    const pos1 = positioner({
      containerWidth: WIDTH,
      containerHeight: HEIGHT,
      itemWidth: triangle.width,
      itemHeight: triangle.height,
      position: 'midRight',
      padding: 32,
    });

    context.drawImage(triangle.canvas(), pos1.x, pos1.y);
    triangle.clear();
  }, [triangle]);

  useEffect(() => {
    const timeoutRef = setInterval(innerDraw, 1000);
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
      <canvas
        style={{ border: '1px solid black' }}
        width={WIDTH}
        height={HEIGHT}
        ref={canvasRef}
      />
    </div>
  );
};

export default {
  title: 'Canvas/Triangle',
  component: CanvasDemo,
} as Meta;

export const Primary: ComponentStory<typeof CanvasDemo> = () => {
  return <CanvasDemo />;
};

Primary.args = {};
