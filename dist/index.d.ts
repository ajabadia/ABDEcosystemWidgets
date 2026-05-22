import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
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
}
declare function TenantSelector({ activeTenantId, tenants, onTenantChange, spaces, groups, activeContextId, onContextChange, userRole, isLoading, }: TenantSelectorProps): react_jsx_runtime.JSX.Element;

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
    LinkComponent?: React.ComponentType<{
        href: string;
        className?: string;
        title?: string;
        children?: React.ReactNode;
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
    icon?: React.ReactNode;
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
}
declare function LiveLogViewer({ tenantId }: LiveLogViewerProps): react_jsx_runtime.JSX.Element;

interface AuditHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenantId: string;
    entityType: string;
    entityId: string;
    entityName?: string;
}
declare function AuditHistoryModal({ isOpen, onClose, tenantId, entityType, entityId, entityName }: AuditHistoryModalProps): react_jsx_runtime.JSX.Element | null;

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
    [key: string]: any;
}

interface AuditDeltaViewerProps {
    log: AuditLog;
}
declare function AuditDeltaViewer({ log }: AuditDeltaViewerProps): react_jsx_runtime.JSX.Element;

interface ActionBadgeProps {
    action: AuditLog['action'];
}
declare function ActionBadge({ action }: ActionBadgeProps): react_jsx_runtime.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

export { ActionBadge, AuditDeltaViewer, AuditHistoryModal, type Command, CommandPalette, type CommandPaletteProps, type ContextOption, LiveLogViewer, SystemSettings, type SystemSettingsProps, type TenantOption, TenantSelector, type TenantSelectorProps, UserIdentity, type UserIdentityProps, cn };
