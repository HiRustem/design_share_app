import { PDFDocument, PDFPage } from 'pdf-lib';

class DesignClass {
  private document: PDFDocument | null = null;
  private pages: PDFPage[] = [];
  private pagesCount: number = 0;

  constructor() {}

  async init(initialArrayBuffer: ArrayBuffer) {
    try {
      const doc = await PDFDocument.load(initialArrayBuffer);

      this.document = doc;
      this.pages = doc.getPages();
      this.pagesCount = doc.getPageCount();
    } catch (e) {
      console.error(e);
    }
  }

  getDocument() {
    return this.document;
  }
}

export default DesignClass;
