import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import { Easel } from '../../utils/canvas/easel';
import { positioner } from '../../utils/canvas/utils';
import { StackedTriangles } from '../../utils/canvas/stacked-triangles';
import { Rectangle } from '../../utils/canvas/rectangle';

const WIDTH = 1024;
const HEIGHT = 512;
const SIZE = 100;
const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const easel = useMemo(() => new Easel({ width: WIDTH, height: HEIGHT }), []);
  const triangle = useMemo<StackedTriangles>(
    () => new StackedTriangles({ width: SIZE, height: SIZE / 2, gap: 24 }),
    []
  );

  const innerDraw = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain context');
    }
    triangle.fill('red');
    triangle.draw();

    const rectangle = new Rectangle({ width: WIDTH, height: 4 });
    rectangle.fill = 'blue';
    rectangle.drawRectangle();

    const pos1 = positioner({
      containerWidth: WIDTH,
      containerHeight: HEIGHT,
      itemWidth: triangle.width,
      itemHeight: triangle.height,
      position: 'midRight',
      padding: 32,
    });

    const pos2 = positioner({
      containerWidth: WIDTH,
      containerHeight: HEIGHT,
      itemWidth: rectangle.width,
      itemHeight: rectangle.height,
      position: 'botMid',
    });

    easel.putImageData(rectangle.image(), pos2);
    easel.putImageData(triangle.image(), pos1);
    context.putImageData(easel.image(), 0, 0);
    easel.clear();
  }, [easel, triangle]);

  useEffect(() => {
    const timeoutRef = setInterval(innerDraw, SIZE);
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
  title: 'Canvas',
  component: CanvasDemo,
} as Meta;

export const Primary: ComponentStory<typeof CanvasDemo> = () => {
  return <CanvasDemo />;
};

Primary.args = {};
