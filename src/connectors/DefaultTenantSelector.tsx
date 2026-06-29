'use client';

import { TenantSelectorConnector, type TenantSelectorConnectorProps } from './TenantSelectorConnector.js';

export type DefaultTenantSelectorProps = Omit<TenantSelectorConnectorProps, 'enableContexts'>;

export function DefaultTenantSelector(props: DefaultTenantSelectorProps) {
  return <TenantSelectorConnector {...props} enableContexts />;
}
