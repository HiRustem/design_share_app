'use client';

import { useEffect, useState } from 'react';

import { useGetPdfBytes } from '@/entities/design/lib/observers/design-observers';
import DesignClass from '@/entities/design/model/design.class';

const DesignExample = () => {
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
  const pdfBytes = useGetPdfBytes();

  useEffect(() => {
    (async function () {
      if (!selectedFile) return;
      // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
      // const response = await fetch(url);

      const arrayBuffer = await selectedFile?.arrayBuffer();

      await DesignClass.init(arrayBuffer);
    })();
  }, [selectedFile]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
      <input
        placeholder='Select file'
        type='file'
        accept='application/pdf'
        onChange={(event) => {
          const file = event.target.files?.item(0);

          setSelectedFile(file);
        }}
      />

      {pdfBytes && <iframe style={{ minWidth: 200, minHeight: 500 }} src={pdfBytes}></iframe>}
    </div>
  );
};

export default DesignExample;
