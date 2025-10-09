'use client';

import DesignExample from '@/entities/design/ui/design-example';
import PdfLibProvider from '@/shared/pdf-lib/context/pdf-lib-provider';

function ViewDesignPage(params: { params: Promise<{ slug: string }> }) {
  return (
    <PdfLibProvider>
      <DesignExample />
    </PdfLibProvider>
  );
}

export default ViewDesignPage;
