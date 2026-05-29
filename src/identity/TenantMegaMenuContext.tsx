'use client';

/**
 * React Context to communicate mega‑menu view‑mode from SmartNavbar
 * to TenantSelectorConnector — avoiding React.cloneElement which
 * fails with server‑to‑client boundary elements in React 19.
 */
import { createContext, useContext } from 'react';

export interface TenantMegaMenuValue {
  variant: 'dropdown' | 'trigger' | 'content';
  isOpen: boolean;
}

const TenantMegaMenuContext = createContext<TenantMegaMenuValue | null>(null);

export const TenantMegaMenuProvider = TenantMegaMenuContext.Provider;

export function useTenantMegaMenu(): TenantMegaMenuValue | null {
  return useContext(TenantMegaMenuContext);
}
