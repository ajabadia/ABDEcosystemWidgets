import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { ReactNode } from 'react';
import { ClassValue } from 'clsx';

interface ContextOption {
    id: string;
    name: string;
}
interface TenantOption {
    tenantId: string;
    name: string;
    active?: boolean;
}
interface TenantSelectorProps {
    activeTenantId: string;
    tenants: TenantOption[];
    onTenantChange?: (tenantId: string) => void;
    spaces?: ContextOption[];
    groups?: ContextOption[];
    activeContextId?: string;
    onContextChange?: (contextId: string, type: 'space' | 'group') => void;
    userRole?: string;
    isLoading?: boolean;
    variant?: 'dropdown' | 'trigger' | 'content';
    isOpen?: boolean;
}
declare function TenantSelector({ activeTenantId, tenants, onTenantChange, spaces, groups, activeContextId, onContextChange, userRole, isLoading, variant, isOpen: externalIsOpen, }: TenantSelectorProps): react_jsx_runtime.JSX.Element;

interface UserIdentityProps {
    name: string;
    email: string;
    isAdmin?: boolean;
    adminHref?: string;
    logoutHref?: string;
    translations?: {
        adminTitle?: string;
        logoutTitle?: string;
    };
    LinkComponent?: React__default.ComponentType<{
        href: string;
        className?: string;
        title?: string;
        children?: React__default.ReactNode;
    }>;
}
/**
 * 👤 UserIdentity
 * Presentation component for rendering user profile status and session controls.
 * Keep it pure, stateless, and style-compliant.
 */
declare function UserIdentity({ name, email, isAdmin, adminHref, logoutHref, translations, LinkComponent }: UserIdentityProps): react_jsx_runtime.JSX.Element;

interface Command {
    id: string;
    title: string;
    description?: string;
    category: string;
    action: () => void | Promise<void>;
    icon?: React__default.ReactNode;
    shortcut?: string[];
}
interface CommandPaletteProps {
    commands: Command[];
    placeholder?: string;
    /** Pass isOpen and onOpenChange to control the palette externally instead of relying on DOM IDs */
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare function CommandPalette({ commands, placeholder, isOpen: controlledIsOpen, onOpenChange }: CommandPaletteProps): react_jsx_runtime.JSX.Element | null;

interface NavUser {
    name: string;
    role: string;
    tenantId: string;
    email?: string;
}
interface SidebarLink {
    href: string;
    label: string;
    icon: React.ReactNode;
}
interface NavbarTranslations {
    brandFallback?: string;
    logoutBtn?: string;
    identityProvider?: string;
    statusOnline?: string;
    emailLabel?: string;
}
interface GlobalNavbarSession {
    authenticated: boolean;
    user?: {
        name: string;
        role: string;
        tenantId: string;
        email?: string;
    } | null;
}
interface GlobalNavbarProps {
    session?: GlobalNavbarSession | null;
    links: SidebarLink[];
    logoUrl?: string | null;
    onLogout: () => void;
    brandName?: string;
    homeHref?: string;
    activeHref?: string;
    translations?: NavbarTranslations;
    transformHref?: (href: string) => string;
}
/**
 * 🌐 GlobalNavbar — Collapsible Navigation Sidebar
 */
declare function GlobalNavbar({ session, links, logoUrl, onLogout, brandName, homeHref, activeHref, translations, transformHref, }: GlobalNavbarProps): react_jsx_runtime.JSX.Element;

interface GlobalFooterProps {
    /** Simple centered label (used as fallback when no telemetry and no two-column layout) */
    label?: string;
    /** Left-side label (two-column layout mode) */
    leftLabel?: string;
    /** Right-side label (two-column layout mode) */
    rightLabel?: string;
    /** Telemetry data rows — overrides label mode when present */
    telemetryItems?: Array<{
        label: string;
        value: string;
    }>;
    /** Whether to show the separator line. Default true. */
    showSeparator?: boolean;
    /** Width of the separator line. Default 'full'. */
    separatorWidth?: 'full' | 'short';
    /** Additional className for the footer element */
    className?: string;
    /** Opacity level (0-100). Default 30. */
    opacity?: number;
}
/**
 * 🏁 GlobalFooter — Unified Industrial Footer
 *
 * Consolidates the old `Footer` (from @ajabadia/styles) and `GlobalFooter` (from widgets)
 * into a single component that supports three layout modes:
 *
 * 1. **Telemetry mode** — renders `telemetryItems[]` as centered key-value pairs
 * 2. **Two-column mode** — renders `leftLabel` + `rightLabel` side by side (responsive)
 * 3. **Label mode** — renders a single centered `label`
 *
 * Usage in apps follows the same thin-wrapper pattern as SystemSettings.
 */
declare function GlobalFooter({ label, leftLabel, rightLabel, telemetryItems, showSeparator, separatorWidth, className, opacity, }: GlobalFooterProps): react_jsx_runtime.JSX.Element;

interface IndustrialTopBarProps {
    /**
     * Current locale for bilingual labels (BUSCADOR / SEARCH).
     */
    locale?: string;
    /**
     * Optional elements rendered BEFORE the search button.
     * Use this for TenantSelector or other leading controls.
     */
    children?: React__default.ReactNode;
    /**
     * App-specific SystemSettings wrapper (required).
     * Each app passes its own wrapper with next-intl / next-themes bindings.
     *
     * @example
     * <IndustrialTopBar locale="es" settings={<SystemSettings isAuthenticated={true} />}>
     *   <TenantSelector sessionUser={user} />
     * </IndustrialTopBar>
     */
    settings: React__default.ReactNode;
    /** Additional className forwarded to the container */
    className?: string;
}
/**
 * 🏗️ IndustrialTopBar
 *
 * Consolidates the repeated [search button + SystemSettings] floating top-right
 * control panel from all four satellite layouts into a single shared component.
 *
 * Layout structure:
 * ```
 * ┌─ fixed top-6 right-6 ──────────────────┐
 * │  [TenantSelector?]  [🔍 BUSCADOR]  [⚙️] │
 * └─────────────────────────────────────────┘
 * ```
 *
 * Usage follows the "logic in widgets → connection in app" pattern:
 * each app passes its own SystemSettings wrapper via `settings`,
 * keeping locale/theme/auth bindings local while the UI/UX stays unified.
 */
declare function IndustrialTopBar({ locale, children, settings, className, }: IndustrialTopBarProps): react_jsx_runtime.JSX.Element;

interface SmartNavbarTranslations {
    brandFallback?: string;
    logoutBtn?: string;
    loginBtn?: string;
    searchLabel?: string;
    themeLabel?: string;
    themeLight?: string;
    themeDark?: string;
    themeSystem?: string;
    profileLabel?: string;
    identityProvider?: string;
    statusOnline?: string;
    emailLabel?: string;
    languageLabel?: string;
}
interface SmartNavbarProps {
    session: GlobalNavbarSession | null;
    links: SidebarLink[];
    logoUrl?: string | null;
    brandName?: string;
    activeHref?: string;
    locale?: string;
    onLogout: () => void;
    onLogin?: () => void;
    onLocaleChange?: (locale: string) => void;
    transformHref?: (href: string) => string;
    tenantSelectorSlot?: React.ReactNode;
    settingsSlot?: React.ReactNode;
    translations?: SmartNavbarTranslations;
    onSearchTrigger?: () => void;
}
/**
 * SmartNavbar — unified top navigation bar for all ABD Suite apps.
 *
 * Wraps the inner content in a Suspense boundary to satisfy Next.js 15+
 * requirements for `useSearchParams()` and prevents SSR bailouts.
 */
declare function SmartNavbar(props: SmartNavbarProps): react_jsx_runtime.JSX.Element;

/**
 * A link definition with optional role/permission requirements.
 * Extends the base `SidebarLink` shape from @ajabadia/styles with RBAC fields.
 */
interface NavLinkConfig {
    href: string;
    label: string;
    icon: ReactNode;
    /** Only show when the user is logged in */
    requiresAuth?: boolean;
    /** Only show when the user has ADMIN or SUPER_ADMIN role */
    requiresAdmin?: boolean;
    /** Only show when the user has SUPER_ADMIN role */
    requiresSuperAdmin?: boolean;
}
interface SidebarBuildResult {
    href: string;
    label: string;
    icon: ReactNode;
}
/**
 * Build a filtered sidebar link array based on the user's session state.
 *
 * - Links with `requiresSuperAdmin` are only included if role === 'SUPER_ADMIN'
 * - Links with `requiresAdmin` are only included if role is ADMIN, PROFESSOR, or SUPER_ADMIN
 * - Links with `requiresAuth` are only included if the user is logged in
 *
 * @param configs - All possible link definitions
 * @param role    - The current user's role (e.g. 'USER' | 'ADMIN' | 'PROFESSOR' | 'SUPER_ADMIN')
 * @param isLoggedIn - Whether the user is authenticated
 */
declare function buildSidebarLinks(configs: readonly NavLinkConfig[], role?: string, isLoggedIn?: boolean): SidebarBuildResult[];

interface UseConfirmDialogOptions<TData = void> {
    onConfirm: (data: TData) => Promise<void> | void;
}
interface UseConfirmDialogReturn<TData> {
    /** Whether the dialog is currently open */
    open: boolean;
    /** Whether the confirm action is in progress */
    isLoading: boolean;
    /** The data passed when triggering the dialog (null when closed) */
    data: TData | null;
    /** Open the dialog, optionally passing contextual data */
    trigger: (data?: TData) => void;
    /** Execute the confirm callback */
    confirm: () => Promise<void>;
    /** Close/cancel the dialog without executing */
    cancel: () => void;
}
/**
 * Manages state for a ConfirmDialog.
 *
 * @example
 * ```tsx
 * const deleteDialog = useConfirmDialog({
 *   onConfirm: async (id: string) => {
 *     await fetch(`/api/items/${id}`, { method: 'DELETE' });
 *   },
 * });
 *
 * return (
 *   <>
 *     <button onClick={() => deleteDialog.trigger(item.id)}>Delete</button>
 *     <ConfirmDialog
 *       open={deleteDialog.open}
 *       isLoading={deleteDialog.isLoading}
 *       onConfirm={deleteDialog.confirm}
 *       onCancel={deleteDialog.cancel}
 *       title="ELIMINAR"
 *       message="¿Estás seguro?"
 *     />
 *   </>
 * );
 * ```
 */
declare function useConfirmDialog<TData = void>(options: UseConfirmDialogOptions<TData>): UseConfirmDialogReturn<TData>;

/** Duration (ms) for dialog entrance and exit animations */
declare const ANIM_DURATION = 200;

type ConfirmVariant = 'danger' | 'warning' | 'info';
interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: ConfirmVariant;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}
declare function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, variant, isLoading, onConfirm, onCancel, }: ConfirmDialogProps): react_jsx_runtime.JSX.Element | null;

interface SystemSettingsProps {
    locale: string;
    onLocaleChange: (locale: string) => void;
    locales?: string[];
    theme?: string;
    onThemeChange?: (theme: string) => void;
    isAuthenticated?: boolean;
    /** Callback for custom login logic. If omitted, falls back to signinUrl navigation. */
    onLogin?: () => void;
    /** Callback for custom logout logic. If omitted, falls back to logoutUrl navigation. */
    onLogout?: () => void;
    /** URL to navigate to when logging out (fallback if onLogout is not provided). */
    logoutUrl?: string;
    /** URL to navigate to when logging in (fallback if onLogin is not provided). */
    signinUrl?: string;
    /** Whether to show the login button when not authenticated. Defaults to true. */
    showLogin?: boolean;
    versionSignature?: string;
}
declare function SystemSettings({ locale, onLocaleChange, locales, theme, onThemeChange, isAuthenticated, onLogin, onLogout, logoutUrl, signinUrl, showLogin, versionSignature, }: SystemSettingsProps): react_jsx_runtime.JSX.Element;

interface LiveLogViewerProps {
    tenantId: string;
    /** Override the global feature flag for live mode on this instance */
    liveModeEnabled?: boolean;
}
declare function LiveLogViewer({ tenantId, liveModeEnabled }: LiveLogViewerProps): react_jsx_runtime.JSX.Element;

interface AuditHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenantId: string;
    entityType: string;
    entityId: string;
    entityName?: string;
    translations?: {
        title?: string;
        tabHistory?: string;
        tabStats?: string;
        loading?: string;
        emptyEvents?: string;
        underConstruction?: string;
    };
}
declare function AuditHistoryModal({ isOpen, onClose, tenantId, entityType, entityId, entityName, translations }: AuditHistoryModalProps): react_jsx_runtime.JSX.Element | null;

interface AuditLog {
    _id?: string;
    appId?: string;
    action: string;
    entityId?: string;
    entityType?: string;
    createdAt?: string;
    userEmail?: string;
    changedFields?: Record<string, unknown>;
    previousState?: Record<string, unknown>;
    [key: string]: unknown;
}

interface AuditDeltaViewerProps {
    log: AuditLog;
}
declare function AuditDeltaViewer({ log }: AuditDeltaViewerProps): react_jsx_runtime.JSX.Element;

interface ActionBadgeProps {
    action: AuditLog['action'];
}
declare function ActionBadge({ action }: ActionBadgeProps): react_jsx_runtime.JSX.Element;

type FeatureFlags = {
    /** Enables live telemetry mode globally. Set to false to disable across all apps. */
    liveModeEnabled: boolean;
};
/**
 * Global feature flags for ABDEcosystemWidgets.
 * Consumers can override at runtime via {@link configureFeatureFlags}.
 */
declare const featureFlags: Readonly<FeatureFlags>;
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
declare function configureFeatureFlags(overrides: Partial<FeatureFlags>): void;

declare function cn(...inputs: ClassValue[]): string;

export { ANIM_DURATION, ActionBadge, AuditDeltaViewer, AuditHistoryModal, type Command, CommandPalette, type CommandPaletteProps, ConfirmDialog, type ConfirmDialogProps, type ConfirmVariant, type ContextOption, GlobalFooter, type GlobalFooterProps, GlobalNavbar, type GlobalNavbarProps, type GlobalNavbarSession, IndustrialTopBar, type IndustrialTopBarProps, LiveLogViewer, type NavLinkConfig, type NavUser, type NavbarTranslations, type SidebarBuildResult, type SidebarLink, SmartNavbar, type SmartNavbarProps, type SmartNavbarTranslations, SystemSettings, type SystemSettingsProps, type TenantOption, TenantSelector, type TenantSelectorProps, type UseConfirmDialogOptions, type UseConfirmDialogReturn, UserIdentity, type UserIdentityProps, buildSidebarLinks, cn, configureFeatureFlags, featureFlags, useConfirmDialog };
