import { PDFDocument } from 'pdf-lib';

export async function convertPdfDocumentToUrl(document: PDFDocument): Promise<string> {
  const pdfPageBytes = await document.save();
  const pdfPageUnitArray = new Uint8Array(pdfPageBytes);
  const pdfPageBlob = new Blob([pdfPageUnitArray], { type: 'application/pdf' });

  return URL.createObjectURL(pdfPageBlob);
}
