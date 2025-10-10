import { PDFDocument, PDFPage } from 'pdf-lib';

import { ObservableStatic } from '@/shared/classes/observable';

import { convertPdfDocumentToUrl } from '../lib/design-converters';
import getPdfPagesUrlArray from '../lib/get-pdf-pages-blob-array';

class DesignClass extends ObservableStatic {
  private static document: PDFDocument | null = null;
  private static bytes: Uint8Array<ArrayBufferLike> | null = null;
  private static pages: PDFPage[] = [];
  private static pagesUrlArray: string[] = [];
  private static pagesCount: number = 0;
  private static blobUrl: string | null = null;
  private static isLoading: boolean = false;
  private static isInitialized: boolean = false;

  constructor() {
    super();
  }

  public static async init(initialArrayBuffer: ArrayBuffer) {
    try {
      this.isLoading = true;

      if (this.isInitialized) {
        this.clearData();
      }

      await this.loadData(initialArrayBuffer);

      this.isLoading = false;
      this.isInitialized = true;

      this.emit('changed');
    } catch (e) {
      console.error(e);
    }
  }

  private static async loadData(initialArrayBuffer: ArrayBuffer): Promise<void> {
    const document = await PDFDocument.load(initialArrayBuffer);
    const documentUrl = await convertPdfDocumentToUrl(document);
    const pdfBytes = await document.save();
    const pdfPagesUrlArray = await getPdfPagesUrlArray(document);

    this.document = document;
    this.pages = document.getPages();
    this.pagesCount = document.getPageCount();
    this.bytes = pdfBytes;
    this.blobUrl = documentUrl;
    this.pagesUrlArray = pdfPagesUrlArray;

    console.log('загрузил');
  }

  private static clearData(): void {
    this.document = null;
    this.pages = [];
    this.pagesCount = 0;
    this.bytes = null;
    this.blobUrl = null;
    this.pagesUrlArray = [];

    console.log('выгрузил');
  }

  public static async drawTextPattern() {
    try {
      this.emit('changed');
    } catch (e) {
      console.error(e);
    }
  }

  public static getPagesUrlArray() {
    return this.pagesUrlArray;
  }
}

export default DesignClass;
