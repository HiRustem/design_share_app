import { useEffect, useRef } from 'react';

interface IDesignPage {
  imageUrl: string;
}

const DesignPage = ({ imageUrl }: IDesignPage) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    console.log('отработалд');

    const context = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
      context?.drawImage(image, 0, 0);
    };
  }, [imageUrl]);

  return <canvas ref={canvasRef} style={{ width: 500, height: 500 }} />;
};

export default DesignPage;
