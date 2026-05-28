// Feature flag configuration for ABDEcosystemWidgets
type FeatureFlags = {
  /** Enables live telemetry mode globally. Set to false to disable across all apps. */
  liveModeEnabled: boolean;
};

const _flags: FeatureFlags = {
  liveModeEnabled: true,
};

/**
 * Global feature flags for ABDEcosystemWidgets.
 * Consumers can override at runtime via {@link configureFeatureFlags}.
 */
export const featureFlags: Readonly<FeatureFlags> = _flags;

/**
 * Override one or more feature flags at runtime.
 * Call this during app initialisation before mounting widgets.
 *
 * @example
 * ```ts
 * import { configureFeatureFlags } from '@ajabadia/ecosystem-widgets';
 * configureFeatureFlags({ liveModeEnabled: false });
 * ```
 */
export function configureFeatureFlags(overrides: Partial<FeatureFlags>): void {
  Object.assign(_flags, overrides);
}

