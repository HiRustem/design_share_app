import { createContext, useContext } from 'react';

export interface IUsePdfLibContext {
  pdfLib:
    | typeof import('/Users/rustemxridicloud.com/Desktop/my-projects/design_share_app/node_modules/pdfjs-dist/types/src/pdf')
    | null;
}

export const PdfLibContext = createContext<IUsePdfLibContext | null>(null);

export const usePdfLibContext = () => {
  const context = useContext(PdfLibContext);

  if (!context) {
    return null;
  }

  return context;
};
