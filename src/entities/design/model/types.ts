import { PDFDocumentProxy } from 'pdfjs-dist';

export interface IDesignPage {
  imageUrl: string;
  urlArrayLength: number;
  currentUrlIndex: number;
}

export interface IDrawPdfPage extends IDesignPage {
  pdfDocumentProxy: PDFDocumentProxy;
  canvas: HTMLCanvasElement;
}
