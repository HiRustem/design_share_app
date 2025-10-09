'use client';

import { PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

import { useGetPdfBytes } from '@/entities/design/lib/observers/design-observers';
import DesignClass from '@/entities/design/model/design.class';
import { usePdfLibContext } from '@/shared/pdf-lib/context/use-pdf-lib-context';

const DesignExample = () => {
  const pdfLibContext = usePdfLibContext();

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
  const pdfBytes = useGetPdfBytes();

  useEffect(() => {
    (async function () {
      if (!selectedFile) return;

      const arrayBuffer = await selectedFile?.arrayBuffer();

      await DesignClass.init(arrayBuffer);
    })();
  }, [selectedFile]);

  useEffect(() => {
    if (!pdfBytes || pdfDoc || !pdfLibContext) return;

    (async () => {
      if (!pdfLibContext?.pdfLib) return;

      const loadingTask = pdfLibContext.pdfLib.getDocument(pdfBytes);
      const pdf = await loadingTask.promise;

      setPdfDoc(pdf);

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const context = canvas.getContext('2d')!;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvas: canvas, canvasContext: context, viewport }).promise;
    })();
  }, [pdfBytes, pdfDoc, pdfLibContext]);

  //TODO: добавить рендер по страницам и сделать представления как для одной страницы, так и для всего документа

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <input
        placeholder='Select file'
        type='file'
        accept='application/pdf'
        onChange={(event) => {
          const file = event.target.files?.item(0);

          setSelectedFile(file);
        }}
      />

      <canvas ref={canvasRef} style={{ width: 500, height: 500 }} />

      {/*{pdfBytes && <DesignPage imageUrl={pdfBytes} />}*/}
    </div>
  );
};

export default DesignExample;
