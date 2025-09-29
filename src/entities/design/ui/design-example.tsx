'use client';

import { PDFDocument } from 'pdf-lib';
import { useEffect, useState } from 'react';

import DesignClass from '@/entities/design/model/design.class';

const DesignExample = () => {
  const [doc, setDoc] = useState<PDFDocument | null>();

  useEffect(() => {
    (async function () {
      const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();

      const designClass = new DesignClass();

      await designClass.init(arrayBuffer);

      console.log(designClass.getDocument());

      setDoc(designClass.getDocument());
    })();
  }, []);

  if (!doc) return null;

  return <></>;
};

export default DesignExample;
