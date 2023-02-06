import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ComponentStory, Meta } from '@storybook/react';
import { positioner } from '../../utils/canvas/utils';
import { StackedTriangles } from '../../utils/canvas/stacked-triangles';

const WIDTH = 1024;
const HEIGHT = 512;
const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stackedTriangles = useMemo(
    () => new StackedTriangles({ width: 100, height: 100 }),
    []
  );

  const innerDraw = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain context');
    }

    stackedTriangles.draw();

    const pos1 = positioner({
      containerWidth: WIDTH,
      containerHeight: HEIGHT,
      itemWidth: stackedTriangles.width,
      itemHeight: stackedTriangles.height,
      position: 'midRight',
      padding: 32,
    });

    context.drawImage(stackedTriangles.canvas(), pos1.x, pos1.y);
    stackedTriangles.clear();
  }, [stackedTriangles]);

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
  title: 'Canvas/StackedTriangle',
  component: CanvasDemo,
} as Meta;

export const Primary: ComponentStory<typeof CanvasDemo> = () => {
  return <CanvasDemo />;
};

Primary.args = {};
