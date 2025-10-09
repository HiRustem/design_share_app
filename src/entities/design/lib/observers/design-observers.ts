'use client';

import { useSyncExternalStore } from 'react';

import { DesignClass } from '@/entities/design';

function useGetPagesUrlArray() {
  return useSyncExternalStore(
    (notify) => DesignClass.subscribe('changed', notify),
    () => DesignClass.getPagesUrlArray(),
    () => DesignClass.getPagesUrlArray(),
  );
}

export { useGetPagesUrlArray };
