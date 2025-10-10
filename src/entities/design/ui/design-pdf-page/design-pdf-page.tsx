import { useEffect, useRef } from 'react';

import drawPdfPage from '@/entities/design/lib/draw-pdf-page';
import { usePdfLibContext } from '@/shared/pdf-lib/context/use-pdf-lib-context';

import { IDesignPage } from '../../model/types';

const DesignPdfPage = ({ imageUrl, urlArrayLength, currentUrlIndex }: IDesignPage) => {
  const pdfLibContext = usePdfLibContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    (async function () {
      if (!pdfLibContext || !pdfLibContext?.pdfLib) return;

      const loadingTask = pdfLibContext.pdfLib.getDocument(imageUrl);
      await loadingTask.promise
        .then(async (pdfDocumentProxy) => {
          await drawPdfPage({
            canvas,
            pdfDocumentProxy,
            imageUrl,
            urlArrayLength,
            currentUrlIndex,
          });
        })
        .finally(() => {
          loadingTask.destroy();
        });
    })();
  }, [imageUrl, pdfLibContext, currentUrlIndex, urlArrayLength]);

  return <canvas ref={canvasRef} />;
};

export default DesignPdfPage;
