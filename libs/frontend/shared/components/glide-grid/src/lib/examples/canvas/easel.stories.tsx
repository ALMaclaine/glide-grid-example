import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { ComponentStory, Meta } from '@storybook/react';
import { Easel } from '../../utils/canvas/easel';
import { positioner } from '../../utils/canvas/utils';

const WIDTH = 1024;
const HEIGHT = 512;
const CanvasDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const easel = useMemo(() => new Easel({ width: 100, height: 100 }), []);

  const innerDraw = useCallback(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain context');
    }

    easel.draw((ctx) => {
      ctx.moveTo(0, 0);
      ctx.lineTo(200, 100);
      ctx.stroke();
    });

    const pos1 = positioner({
      containerWidth: WIDTH,
      containerHeight: HEIGHT,
      itemWidth: easel.width,
      itemHeight: easel.height,
      position: 'midRight',
      padding: 32,
    });

    context.drawImage(easel.canvas(), pos1.x, pos1.y);
    easel.clear();
  }, [easel]);

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
  title: 'Canvas/Easel',
  component: CanvasDemo,
} as Meta;

export const Primary: ComponentStory<typeof CanvasDemo> = () => {
  return <CanvasDemo />;
};

Primary.args = {};
