import shortMapToLength from '@/shared/map/short-map-to-length';

import { IDrawPdfPage } from '../model/types';

let canvasCacheMap = new Map<HTMLCanvasElement, string>();

async function drawPdfPage({
  pdfDocumentProxy,
  canvas,
  imageUrl,
  urlArrayLength,
  currentUrlIndex,
}: IDrawPdfPage): Promise<void> {
  const existingUrl = canvasCacheMap.get(canvas);

  if (existingUrl === imageUrl) return;

  const page = await pdfDocumentProxy.getPage(1);
  const viewport = page.getViewport({ scale: 1.5 });
  const context = canvas.getContext('2d')!;

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  canvasCacheMap.set(canvas, imageUrl);

  await page.render({ canvas: canvas, canvasContext: context, viewport }).promise;

  if (currentUrlIndex === urlArrayLength - 1) {
    canvasCacheMap = shortMapToLength(canvasCacheMap, urlArrayLength);
  }

  console.log(canvasCacheMap.size);
}

export default drawPdfPage;
