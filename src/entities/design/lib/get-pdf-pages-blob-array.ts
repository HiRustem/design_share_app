import { PDFDocument } from 'pdf-lib';

import { convertPdfDocumentToUrl } from '@/entities/design/lib/design-converters';

async function getPdfPagesUrlArray(document: PDFDocument): Promise<string[]> {
  const pdfPageBlobArray: string[] = [];
  const pagesCount = document.getPageCount();

  for (let i = 0; i < pagesCount; i++) {
    const pdfPageUrl = await getPdfPageUrl(document, i);

    pdfPageBlobArray.push(pdfPageUrl);
  }

  return pdfPageBlobArray;
}

async function getPdfPageUrl(document: PDFDocument, pageNumber: number): Promise<string> {
  const newDocument = await PDFDocument.create();
  const [copiedPage] = await newDocument.copyPages(document, [pageNumber]);

  newDocument.addPage(copiedPage);

  return await convertPdfDocumentToUrl(newDocument);
}

export default getPdfPagesUrlArray;
