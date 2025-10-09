'use client';

import { useEffect, useState } from 'react';

import { useGetPagesUrlArray } from '@/entities/design/lib/observers/design-observers';
import DesignClass from '@/entities/design/model/design.class';
import DesignPdfPage from '@/entities/design/ui/design-pdf-page/design-pdf-page';

const DesignExample = () => {
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);

  const pagesUrlArray = useGetPagesUrlArray();

  useEffect(() => {
    (async function () {
      if (!selectedFile) return;

      const arrayBuffer = await selectedFile?.arrayBuffer();

      await DesignClass.init(arrayBuffer);
    })();
  }, [selectedFile]);

  //TODO: Очищать предыдущий рендер pdf при изменении документа

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

      {pagesUrlArray.map((imageUrl, index) => {
        return <DesignPdfPage key={index} imageUrl={imageUrl} />;
      })}
    </div>
  );
};

export default DesignExample;
