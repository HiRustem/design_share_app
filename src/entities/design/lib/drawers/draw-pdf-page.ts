import { PDFDocumentProxy } from 'pdfjs-dist';

interface IDrawPdfPage {
  pdfDocumentProxy: PDFDocumentProxy;
  canvas: HTMLCanvasElement;
}

const canvasCacheSet = new Set<HTMLCanvasElement>();

async function drawPdfPage({ pdfDocumentProxy, canvas }: IDrawPdfPage): Promise<void> {
  if (canvasCacheSet.has(canvas)) return;

  const page = await pdfDocumentProxy.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });
  const context = canvas.getContext('2d')!;

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  canvasCacheSet.add(canvas);

  await page.render({ canvas: canvas, canvasContext: context, viewport }).promise;
}

export default drawPdfPage;
