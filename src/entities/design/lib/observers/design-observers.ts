'use client';

import { useSyncExternalStore } from 'react';

import { DesignClass } from '@/entities/design';

function useGetPdfBytes() {
  return useSyncExternalStore(
    (notify) => DesignClass.subscribe('changed', notify),
    () => DesignClass.getBlobUrl(),
    () => DesignClass.getBlobUrl(),
  );
}

export { useGetPdfBytes };
