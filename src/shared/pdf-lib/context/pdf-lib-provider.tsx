import { FC, PropsWithChildren, useEffect, useState } from 'react';

import { PdfLibContext } from './use-pdf-lib-context';

const PdfLibProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pdfLib, setPdfLib] = useState<
    | typeof import('/Users/rustemxridicloud.com/Desktop/my-projects/design_share_app/node_modules/pdfjs-dist/types/src/pdf')
    | null
  >(null);

  useEffect(() => {
    (async function () {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url,
      ).toString();

      setPdfLib(pdfjsLib);
    })();
  }, []);

  return <PdfLibContext.Provider value={{ pdfLib }}>{children}</PdfLibContext.Provider>;
};

export default PdfLibProvider;
