'use client';

import { useEffect, useState } from 'react';

import { useGetPdfBytes } from '@/entities/design/lib/observers/design-observers';
import DesignClass from '@/entities/design/model/design.class';
import DesignPage from '@/entities/design/ui/design-page/design-page';

const DesignExample = () => {
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
  const pdfBytes = useGetPdfBytes();

  useEffect(() => {
    (async function () {
      if (!selectedFile) return;

      const arrayBuffer = await selectedFile?.arrayBuffer();

      await DesignClass.init(arrayBuffer);
    })();
  }, [selectedFile]);

  //TODO: добавить рендер по страницам и сделать представления как для одной страницы, так и для всего документа

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

      {pdfBytes && <DesignPage imageUrl={pdfBytes} />}
    </div>
  );
};

export default DesignExample;
