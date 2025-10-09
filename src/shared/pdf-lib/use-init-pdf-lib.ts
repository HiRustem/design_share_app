import { useEffect, useState } from 'react';

interface IUseInitPdfLib {}

const useInitPdfLib = ({}: IUseInitPdfLib) => {
  const [pdfjsLib, setPdfjsLib] = useState<
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

      setPdfjsLib(pdfjsLib);
    });
  }, []);
};

export default useInitPdfLib;
