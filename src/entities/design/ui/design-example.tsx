'use client';

import { PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

import { useGetPdfBytes } from '@/entities/design/lib/observers/design-observers';
import DesignClass from '@/entities/design/model/design.class';

const DesignExample = () => {
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
    if (!pdfBytes || pdfDoc) return;

    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
      ).toString();

      const loadingTask = pdfjsLib.getDocument(pdfBytes);
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
  }, [pdfBytes, pdfDoc]);

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
