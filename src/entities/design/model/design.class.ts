import { PDFDocument, PDFPage } from 'pdf-lib';

import { convertPdfDocumentToUrl } from '@/entities/design/lib/design-converters';
import getPdfPagesUrlArray from '@/entities/design/lib/get-pdf-pages-blob-array';
import { ObservableStatic } from '@/shared/classes/observable';

class DesignClass extends ObservableStatic {
  private static document: PDFDocument | null = null;
  private static bytes: Uint8Array<ArrayBufferLike> | null = null;
  private static pages: PDFPage[] = [];
  private static pagesUrlArray: string[] = [];
  private static pagesCount: number = 0;
  private static blobUrl: string | null = null;

  constructor() {
    super();
  }

  public static async init(initialArrayBuffer: ArrayBuffer) {
    try {
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
