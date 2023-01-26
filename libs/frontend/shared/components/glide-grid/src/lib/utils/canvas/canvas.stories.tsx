import { useCallback, useEffect, useRef } from 'react';
import { ComponentStory, Meta } from '@storybook/react';
import { Easel } from './easel';
import { Triangle } from './triangle';
import { positioner } from './utils';
import { StackedTriangles } from './stacked-triangles';

const WIDTH = 1024;
const HEIGHT = 512;
const SIZE = 100;
const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const easel = useRef(new Easel({ width: WIDTH, height: HEIGHT }));
  const triangle = useRef<StackedTriangles>(
    new StackedTriangles({ width: SIZE, height: SIZE / 2, gap: 24 })
  );

  const innerDraw = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain context');
    }
    triangle.current.fill('red');
    triangle.current.draw();
    const image = triangle.current.image();

    const pos = positioner({
      containerWidth: WIDTH,
      containerHeight: HEIGHT,
      itemWidth: triangle.current.width,
      itemHeight: triangle.current.height,
      position: 'midRight',
      padding: 32,
    });

    easel.current.putImageData(image, pos);
    context.putImageData(easel.current.image(), 0, 0);
    easel.current.clear();
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
