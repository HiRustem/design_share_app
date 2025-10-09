import { useEffect, useRef } from 'react';

import drawPdfPage from '@/entities/design/lib/drawers/draw-pdf-page';
import { usePdfLibContext } from '@/shared/pdf-lib/context/use-pdf-lib-context';

interface IDesignPage {
  imageUrl: string;
}

const DesignPdfPage = ({ imageUrl }: IDesignPage) => {
  const pdfLibContext = usePdfLibContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    (async function () {
      if (!pdfLibContext || !pdfLibContext?.pdfLib) return;

      const loadingTask = pdfLibContext.pdfLib.getDocument(imageUrl);
      const pdfDocumentProxy = await loadingTask.promise;

      await drawPdfPage({
        canvas,
        pdfDocumentProxy,
      });
    })();
  }, [imageUrl, pdfLibContext]);

  return <canvas ref={canvasRef} />;
};

export default DesignPdfPage;
