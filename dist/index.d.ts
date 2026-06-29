import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { ReactNode, ComponentType } from 'react';
import { AbstractIntlMessages } from 'next-intl';
import { Dialog } from 'radix-ui';
import { ThemeProvider as ThemeProvider$1 } from 'next-themes';
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

interface TenantMegaMenuValue {
    variant: 'dropdown' | 'trigger' | 'content';
    isOpen: boolean;
}
declare const TenantMegaMenuProvider: React.Provider<TenantMegaMenuValue | null>;
declare function useTenantMegaMenu(): TenantMegaMenuValue | null;

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

interface LogoutSuccessViewProps {
    signInUrl?: string;
    homeUrl?: string;
    appTitle?: string;
    translations?: {
        title?: string;
        subtitle?: string;
        message?: string;
        button?: string;
        home_button?: string;
        shield_badge?: string;
        tenantNotFoundTitle?: string;
        tenantNotFoundDesc?: string;
    };
    LinkComponent?: React.ComponentType<{
        href: string;
        className?: string;
        children?: React.ReactNode;
        'aria-label'?: string;
    }>;
}
declare function LogoutSuccessView(props: LogoutSuccessViewProps): react_jsx_runtime.JSX.Element;

interface TenantSelectorConnectorProps {
    sessionUser?: {
        id?: string;
        email?: string;
        role?: string;
        tenantId?: string;
    };
    /** Enable spaces/groups context support (needed by tenantGobernance) */
    enableContexts?: boolean;
    /** Optional server action to fire after setting cookie (e.g. switchTenantAction) */
    onTenantSwitch?: (tenantId: string) => Promise<unknown>;
    /** Use next/navigation router.push instead of window.location.href */
    useRouterPush?: boolean;
    /** Label for the SYSTEM tenant (default: 'Sistema Global') */
    systemTenantLabel?: string;
    /** Optional callback fired when onTenantSwitch (server action) throws */
    onError?: (error: unknown, context: {
        action: "tenantSwitch";
        tenantId: string;
    }) => void;
    /** Rendering variant when used inside SmartNavbar mega menu */
    variant?: 'dropdown' | 'trigger' | 'content';
    /** External open state control (used by SmartNavbar via cloneElement) */
    isOpen?: boolean;
}
declare function TenantSelectorConnector({ sessionUser, enableContexts, onTenantSwitch, useRouterPush, systemTenantLabel, onError, variant, isOpen, }: TenantSelectorConnectorProps): react_jsx_runtime.JSX.Element | null;

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

/**
 * @purpose Renderiza un componente pie de pie una vez que se ha enviado datos de telemetry, disposición en dos columnas y modo de etiquetas simples.
 * @purpose_en Renders a unified footer component that supports telemetry data, two-column layout, and simple label modes.
 * @refactorable true (contains too many state variables and UI parts)
 * @classification UI Component
 * @complexity Low
 * @fingerprint exports:2,imports:1,sig:1j6cv6z
 * @lastUpdated 2026-06-23T23:01:50.207Z
 */
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
    /** Opacity level (0-100). Default 80. */
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
    /** Optional short identifier for the satellite app (e.g. 'LOGS', 'GOV', 'QUIZ', 'AUTH') */
    appBadge?: string;
    activeHref?: string;
    locale?: string;
    onLogout: () => void;
    onLogin?: () => void;
    onLocaleChange?: (locale: string) => void;
    transformHref?: (href: string) => string;
    tenantSelectorSlot?: React.ReactNode;
    settingsSlot?: React.ReactNode;
    notificationsSlot?: React.ReactNode;
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

interface AppSidebarLink {
    href: string;
    label: string;
    icon: React__default.ReactNode;
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
    requiresSuperAdmin?: boolean;
}
interface AppSidebarNavigationProps {
    session: GlobalNavbarSession | null;
    logoUrl?: string | null;
    links: AppSidebarLink[];
    appBadge?: string;
    brandName?: string;
    onLogin?: () => void;
    onLogout?: () => void;
    transformHref?: (href: string) => string;
    translations?: Partial<SmartNavbarTranslations>;
    tenantSelectorSlot?: React__default.ReactNode;
    settingsSlot?: React__default.ReactNode;
    notificationsSlot?: React__default.ReactNode;
}
declare function AppSidebarNavigation({ session, logoUrl, links, appBadge, brandName, onLogin, onLogout, transformHref, translations: translationsOverride, tenantSelectorSlot, settingsSlot, notificationsSlot, }: AppSidebarNavigationProps): react_jsx_runtime.JSX.Element;

interface AppShellLayoutProps {
    children: React__default.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
    brandingStyles?: React__default.ReactNode;
    sidebarNavigation?: React__default.ReactNode;
    commandPalette?: React__default.ReactNode;
    eventBusBridge?: React__default.ReactNode;
}
declare function AppShellLayout({ children, messages, locale, brandingStyles, sidebarNavigation, commandPalette, eventBusBridge, }: AppShellLayoutProps): react_jsx_runtime.JSX.Element;

/**
 * @purpose Proporciona un arreglo de enlaces de sidebar filtrados basado en el estado de sesión del usuario, su rol y estatus de autenticación.
 * @purpose_en Builds a filtered sidebar link array based on the user's session state, role, and authentication status.
 * @refactorable false
 * @classification Helper Utility
 * @complexity Low
 * @fingerprint exports:3,imports:1,sig:kq5xf1
 * @lastUpdated 2026-06-23T23:01:39.722Z
 */

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

interface IndustrialSelectSearchItem {
    id: string;
    label: string;
    subLabel?: string;
}
interface IndustrialSelectSearchProps {
    items: IndustrialSelectSearchItem[];
    value: string;
    onChange: (id: string) => void;
    placeholder?: string;
    noResultsLabel?: string;
    ariaLabel?: string;
}
declare function IndustrialSelectSearch({ items, value, onChange, placeholder, noResultsLabel, ariaLabel, }: IndustrialSelectSearchProps): react_jsx_runtime.JSX.Element;

interface IndustrialModalHeaderProps {
    title: string;
    subtitle?: string;
    icon: ComponentType<{
        size?: number;
    }>;
    onClose: () => void;
}
declare function IndustrialModalHeader({ title, subtitle, icon: Icon, onClose }: IndustrialModalHeaderProps): react_jsx_runtime.JSX.Element;

interface IndustrialSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    ariaLabel?: string;
}
declare function IndustrialSearchInput({ value, onChange, placeholder, ariaLabel }: IndustrialSearchInputProps): react_jsx_runtime.JSX.Element;

declare function DialogHeader({ className, ...props }: Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'>): react_jsx_runtime.JSX.Element;
declare function DialogFooter({ className, showCloseButton, closeLabel, children, ...props }: Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'> & {
    showCloseButton?: boolean;
    closeLabel?: string;
}): react_jsx_runtime.JSX.Element;
declare function DialogTitle({ className, ...props }: React.ComponentProps<typeof Dialog.Title>): react_jsx_runtime.JSX.Element;
declare function DialogDescription({ className, ...props }: React.ComponentProps<typeof Dialog.Description>): react_jsx_runtime.JSX.Element;

/**
 * @purpose Gestiona una constante para definir el tiempo de las animaciones de entrada y salida de diálogo en milisegundos.
 * @purpose_en Defines a constant for the duration of dialog entrance and exit animations in milliseconds.
 * @refactorable false
 * @classification Data/Constants
 * @complexity Low
 * @fingerprint exports:1,imports:0,sig:16swo3g
 * @lastUpdated 2026-06-23T23:01:20.754Z
 */
/** Duration (ms) for dialog entrance and exit animations */
declare const ANIM_DURATION = 200;

declare function ThemeProvider({ children, ...props }: React.ComponentProps<typeof ThemeProvider$1>): react_jsx_runtime.JSX.Element;

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

/**
 * @purpose Gestiona la estructura para registros de auditoría.
 * @purpose_en Defines the structure for audit log entries.
 * @refactorable false
 * @classification Type Definition
 * @complexity Low
 * @fingerprint exports:1,imports:0,sig:1u2z8wy
 * @lastUpdated 2026-06-21T14:27:31.218Z
 */
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

/**
 * @purpose Gestiona banderas de características para ABDEcosystemWidgets, permitiendo la configuración en tiempo de ejecución de los ajustes globales.
 * @purpose_en Manages feature flags for ABDEcosystemWidgets, allowing runtime configuration of global settings.
 * @refactorable false
 * @classification Type Definition
 * @complexity Low
 * @fingerprint exports:2,imports:0,sig:14bum57
 * @lastUpdated 2026-06-23T23:02:41.210Z
 */
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

/**
 * @purpose Proporciona una forma de combinar nombres de clase utilizando `clsx` y `tailwind-merge`.
 * @purpose_en Merges and combines class names using `clsx` and `tailwind-merge`.
 * @refactorable false
 * @classification Helper Utility
 * @complexity Low
 * @fingerprint exports:1,imports:2,sig:mt3gra
 * @lastUpdated 2026-06-21T14:27:55.055Z
 */

declare function cn(...inputs: ClassValue[]): string;

export { ANIM_DURATION, ActionBadge, AppShellLayout, type AppSidebarLink, AppSidebarNavigation, type AppSidebarNavigationProps, AuditDeltaViewer, AuditHistoryModal, type Command, CommandPalette, type CommandPaletteProps, ConfirmDialog, type ConfirmDialogProps, type ConfirmVariant, type ContextOption, DialogDescription, DialogFooter, DialogHeader, DialogTitle, GlobalFooter, type GlobalFooterProps, GlobalNavbar, type GlobalNavbarProps, type GlobalNavbarSession, IndustrialModalHeader, type IndustrialModalHeaderProps, IndustrialSearchInput, type IndustrialSearchInputProps, IndustrialSelectSearch, type IndustrialSelectSearchItem, IndustrialTopBar, type IndustrialTopBarProps, LiveLogViewer, LogoutSuccessView, type LogoutSuccessViewProps, type NavLinkConfig, type NavUser, type NavbarTranslations, type SidebarBuildResult, type SidebarLink, SmartNavbar, type SmartNavbarProps, type SmartNavbarTranslations, SystemSettings, type SystemSettingsProps, TenantMegaMenuProvider, type TenantMegaMenuValue, type TenantOption, TenantSelector, TenantSelectorConnector, type TenantSelectorConnectorProps, type TenantSelectorProps, ThemeProvider, type UseConfirmDialogOptions, type UseConfirmDialogReturn, UserIdentity, type UserIdentityProps, buildSidebarLinks, cn, configureFeatureFlags, featureFlags, useConfirmDialog, useTenantMegaMenu };
