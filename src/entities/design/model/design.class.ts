import { PDFDocument, PDFPage } from 'pdf-lib';

import { ObservableStatic } from '@/shared/classes/observable';

class DesignClass extends ObservableStatic {
  private static document: PDFDocument | null = null;
  private static pdfBytes: Uint8Array<ArrayBufferLike> | null = null;
  private static pages: PDFPage[] = [];
  private static pagesCount: number = 0;
  private static blobUrl: string | null = null;

  constructor() {
    super();
  }

  public static async init(initialArrayBuffer: ArrayBuffer) {
    try {
      const doc = await PDFDocument.load(initialArrayBuffer);
      const pdfBytes = await doc.save();
      const uintArray = new Uint8Array(pdfBytes);
      const blobDocument = new Blob([uintArray], { type: 'application/pdf' });

      this.document = doc;
      this.pages = doc.getPages();
      this.pagesCount = doc.getPageCount();
      this.pdfBytes = pdfBytes;
      this.blobUrl = URL.createObjectURL(blobDocument);

      this.emit('changed');
    } catch (e) {
      console.error(e);
    }
  }

  public static getDocument() {
    return this.document;
  }

  public static getPdfBytes() {
    return this.pdfBytes;
  }

  public static getBlobUrl() {
    return this.blobUrl;
  }
}

export default DesignClass;
