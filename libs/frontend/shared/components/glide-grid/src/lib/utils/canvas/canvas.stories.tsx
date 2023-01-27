import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import { Easel } from './easel';
import { positioner } from './utils';
import { StackedTriangles } from './stacked-triangles';

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
    const image = triangle.image();

    const pos = positioner({
      containerWidth: WIDTH,
      containerHeight: HEIGHT,
      itemWidth: triangle.width,
      itemHeight: triangle.height,
      position: 'midRight',
      padding: 32,
    });

    easel.putImageData(image, pos);
    context.putImageData(easel.image(), 0, 0);
    easel.clear();
  }, []);

  useEffect(() => {
    const timeoutRef = setInterval(innerDraw, SIZE);
    return () => clearTimeout(timeoutRef);
  }, [innerDraw]);

  return (
    <div
      style={{
        height: 'SIZE%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px}`,
          border: '1px solid black',
        }}
      >
        <canvas width={WIDTH} height={HEIGHT} ref={canvasRef} />
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
