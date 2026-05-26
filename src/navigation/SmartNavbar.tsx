'use client';

import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Shield, LogOut, Search, Sun, Moon, Monitor,
  User as UserIcon, Languages, Building2, ChevronDown,
} from 'lucide-react';
import { cn } from '../utils.js';
import type { GlobalNavbarSession, SidebarLink } from './GlobalNavbar.js';

// ──────────────────────────────────────────────
//  Translations
// ──────────────────────────────────────────────

export interface SmartNavbarTranslations {
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

const defaultTranslations: Required<SmartNavbarTranslations> = {
  brandFallback: 'ABD SYSTEM',
  logoutBtn: 'TERMINAR SESIÓN',
  loginBtn: 'INICIAR SESIÓN',
  searchLabel: 'BUSCAR...',
  themeLabel: 'TEMA',
  themeLight: 'CLARO',
  themeDark: 'OSCURO',
  themeSystem: 'SISTEMA',
  profileLabel: 'MI PERFIL',
  identityProvider: 'PROVEEDOR',
  statusOnline: 'ONLINE',
  emailLabel: 'EMAIL',
  languageLabel: 'IDIOMA',
};

// ──────────────────────────────────────────────
//  Props
// ──────────────────────────────────────────────

export interface SmartNavbarProps {
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

type MenuName = 'navigation' | 'tenant' | 'theme' | 'user' | 'language' | 'search';

// ──────────────────────────────────────────────
//  Error Boundary (Slot Isolation)
// ──────────────────────────────────────────────

class SlotErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="px-3 py-2 text-[9px] font-mono text-muted-foreground border border-dashed border-border">
            ⚠️ SLOT ERROR
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// ──────────────────────────────────────────────
//  Localized Link Helper
// ──────────────────────────────────────────────

function LocalizedLink({
  href,
  transformHref = (h: string) => h,
  onClick,
  className,
  title,
  children,
  'data-testid': dataTestId,
}: {
  href: string;
  transformHref?: (href: string) => string;
  onClick?: () => void;
  className?: string;
  title?: string;
  children: React.ReactNode;
  'data-testid'?: string;
}) {
  const finalHref = transformHref(href);
  const isExternal = finalHref.startsWith('http://') || finalHref.startsWith('https://');

  if (isExternal) {
    if (onClick) {
      return (
        <a href={finalHref} onClick={onClick} className={className} title={title} data-testid={dataTestId}>
          {children}
        </a>
      );
    }
    return (
      <a href={finalHref} className={className} title={title} data-testid={dataTestId}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <Link href={finalHref} className={className} onClick={onClick} title={title} data-testid={dataTestId}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={finalHref} className={className} title={title} data-testid={dataTestId}>
      {children}
    </Link>
  );
}

// ──────────────────────────────────────────────
//  SmartNavbar Component
// ──────────────────────────────────────────────

export function SmartNavbar({
  session,
  links,
  logoUrl,
  brandName,
  activeHref,
  locale = 'en',
  onLogout,
  onLogin,
  onLocaleChange,
  transformHref: rawTransformHref,
  tenantSelectorSlot,
  settingsSlot,
  translations,
  onSearchTrigger,
}: SmartNavbarProps) {
  const transformHref = rawTransformHref ?? ((href: string) => href);
  const t = { ...defaultTranslations, ...translations };
  const isAuthenticated = session?.authenticated === true;
  const user = session?.user ?? null;

  const searchParams = useSearchParams();
  const activeTenantId = searchParams.get('tenantId') || user?.tenantId || '';

  // ── Hover / Click-to-Lock State ──
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const [lockedMenu, setLockedMenu] = useState<MenuName | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // ── Initialize theme state on mount & Cleanup sidebar legacy classes ──
  useEffect(() => {
    document.body.classList.remove('sidebar-expanded-layout', 'sidebar-collapsed-layout');
    try {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      } else {
        setCurrentTheme('system');
      }
    } catch {
      setCurrentTheme('system');
    }
  }, []);

  // ── Escape key handler ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeMenu) {
          setActiveMenu(null);
          setLockedMenu(null);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeMenu]);

  // ── Click outside handler for locked menus ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (lockedMenu && navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setLockedMenu(null);
      }
    };
    if (lockedMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [lockedMenu]);

  // ── Hover handlers ──
  const handleMouseEnter = useCallback((menuName: MenuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // Only open on hover if not locked on a different menu
    if (!lockedMenu || lockedMenu === menuName) {
      setActiveMenu(menuName);
    }
  }, [lockedMenu]);

  const handleMouseLeave = useCallback(() => {
    if (lockedMenu) return; // Don't close if locked
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 200ms grace period (ANIM_DURATION)
  }, [lockedMenu]);

  // ── Click-to-lock handler ──
  const handleMenuClick = useCallback((menuName: MenuName) => {
    if (lockedMenu === menuName && activeMenu === menuName) {
      // Toggle off
      setActiveMenu(null);
      setLockedMenu(null);
    } else {
      // Lock this menu
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveMenu(menuName);
      setLockedMenu(menuName);
    }
  }, [lockedMenu, activeMenu]);

  // ── Theme switching ──
  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage may be unavailable (private browsing, etc.)
    }
    setCurrentTheme(theme);
  }, []);

  // ── Derived values ──
  const debugTenantId = user?.tenantId || (isAuthenticated ? 'GLOBAL' : '');
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  // ── Desktop nav links ──
  const renderNavLinks = () =>
    links.map((link, idx) => {
      const isActive = activeHref
        ? activeHref === link.href ||
          (link.href !== '/' && link.href !== '/dashboard' && link.href !== '/admin' && activeHref?.startsWith(link.href + '/'))
        : false;

      return (
        <LocalizedLink
          key={link.href}
          href={link.href}
          transformHref={transformHref}
          data-testid={`navbar-link-idx-${idx}`}
          className={cn(
            'px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 rounded-none',
            isActive
              ? 'text-primary font-black'
              : 'text-muted-foreground font-medium hover:text-primary'
          )}
        >
          <span className="flex items-center gap-2">
            {link.icon}
            {link.label}
          </span>
        </LocalizedLink>
      );
    });

  // ══════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════

  return (
    <>
      {/* ─── Navbar Container ─── */}
      <div
        ref={navbarRef}
        data-testid="smart-navbar"
        className="smart-navbar"
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1600px] mx-auto h-full px-4 flex items-center justify-between gap-2">
          {/* ═══ LEFT: Logo + Debug Tag + Tenant Selector ═══ */}
          <div className="flex items-center gap-3 min-w-0">
            <LocalizedLink
              href={isAuthenticated ? '/' : '/'}
              transformHref={transformHref}
              data-testid="navbar-logo"
              className="flex items-center gap-3 shrink-0"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="w-6 h-6 object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                />
              ) : (
                <div className="w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Shield size={12} className="text-primary" />
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground truncate max-w-[160px] leading-tight">
                  {brandName || t.brandFallback}
                </span>
                {isAuthenticated && activeTenantId && (
                  <span className="font-mono text-[9px] opacity-70 uppercase tracking-widest text-muted-foreground leading-none mt-0.5">
                    {activeTenantId}
                  </span>
                )}
              </div>
            </LocalizedLink>
          </div>

          {/* ═══ CENTER: Nav Links (desktop, authenticated only) ═══ */}
          {isAuthenticated && (
            <nav
              className="smart-navbar-desktop-only flex items-center gap-1"
            >
              {renderNavLinks()}
            </nav>
          )}

          {/* ═══ RIGHT: Utilities ═══ */}
          <div className="flex items-center gap-2">
            {/* Search Icon Button (left of Theme) */}
            {isAuthenticated && (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('search')}
                onClick={() => handleMenuClick('search')}
              >
                <button
                  data-testid="navbar-menu-search"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'search'}
                >
                  <Search size={16} />
                </button>
              </div>
            )}

            {/* Theme Toggle Button */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('theme')}
              onClick={() => handleMenuClick('theme')}
            >
              <button
                data-testid="navbar-menu-theme"
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none"
                aria-haspopup="true"
                aria-expanded={activeMenu === 'theme'}
              >
                <Sun size={16} />
              </button>
            </div>

            {/* Language Toggle Button */}
            {onLocaleChange && (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('language')}
                onClick={() => handleMenuClick('language')}
              >
                <button
                  data-testid="navbar-menu-language"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'language'}
                >
                  <Languages size={16} />
                </button>
              </div>
            )}

            {/* Tenant Selector Button (Building Icon, right of Languages, left of User) */}
            {isAuthenticated && tenantSelectorSlot && (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('tenant')}
                onClick={() => handleMenuClick('tenant')}
              >
                <button
                  data-testid="navbar-menu-tenant"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'tenant'}
                >
                  <Building2 size={16} />
                </button>
              </div>
            )}



            {/* User Menu (authenticated only) */}
            {isAuthenticated && (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('user')}
                onClick={() => handleMenuClick('user')}
              >
                <button
                  data-testid="navbar-menu-user"
                  className="w-7 h-7 shrink-0 aspect-square flex items-center justify-center bg-primary/10 border border-primary/20 text-primary font-bold text-xs hover:bg-primary/20 transition-all duration-200 cursor-pointer rounded-none"
                  style={{ width: '28px', height: '28px' }}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === 'user'}
                >
                  {userInitial}
                </button>
              </div>
            )}

            {/* Login Button (public mode only) */}
            {!isAuthenticated && onLogin && (
              <button
                onClick={onLogin}
                className="px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-pointer rounded-none"
              >
                {t.loginBtn}
              </button>
            )}


          </div>
        </div>

        {/* ─── Progress Bar (always in DOM → zero CLS) ─── */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 bg-primary/50 scale-x-0 transition-all duration-300 pointer-events-none" />

        {/* ═══ Mega Menu Dropdown ═══ */}
        {activeMenu && (
          <div
            data-testid="navbar-dropdown"
            className="smart-navbar-dropdown animate-in fade-in slide-in-from-top-1 duration-150"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className={cn(
              "max-w-[1600px] mx-auto p-6 flex",
              (activeMenu === 'theme' || activeMenu === 'language' || activeMenu === 'user') ? 'justify-end' : 'justify-start'
            )}>
              {/* Navigation Mega Menu */}
              {activeMenu === 'navigation' && (
                <div className="flex gap-8">
                  <div>
                    <h3 className="font-mono text-[9px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                      ACCESOS RÁPIDOS
                    </h3>
                    <div className="flex flex-col gap-2">
                      {links.map((link, idx) => (
                        <LocalizedLink
                          key={link.href}
                          href={link.href}
                          transformHref={transformHref}
                          data-testid={`navbar-link-idx-${idx}`}
                          className="flex items-center gap-3 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-200"
                        >
                          <span className="shrink-0">{link.icon}</span>
                          {link.label}
                        </LocalizedLink>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Theme Mega Menu */}
              {activeMenu === 'theme' && (
                <div>
                  <h3 className="font-mono text-[9px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                    {t.themeLabel}
                  </h3>
                  <div className="flex gap-3">
                    {([
                      { value: 'light' as const, icon: Sun, label: t.themeLight },
                      { value: 'dark' as const, icon: Moon, label: t.themeDark },
                      { value: 'system' as const, icon: Monitor, label: t.themeSystem },
                    ]).map(({ value, icon: Icon, label }) => {
                      const isActive = currentTheme === value;
                      return (
                        <button
                          key={value}
                          onClick={() => setTheme(value)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 border transition-all duration-200 cursor-pointer min-w-[100px] rounded-none",
                            isActive
                              ? "border-primary/60 bg-primary/5 text-primary"
                              : "border-border bg-muted/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground"
                          )}
                        >
                          <Icon size={18} className={isActive ? "text-primary" : "text-muted-foreground"} />
                          <span className={cn(
                            "font-mono text-[9px] font-bold tracking-widest uppercase",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}>
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Language Mega Menu */}
              {activeMenu === 'language' && onLocaleChange && (
                <div>
                  <h3 className="font-mono text-[9px] font-bold tracking-widest uppercase text-muted-foreground mb-3">
                    {t.languageLabel}
                  </h3>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        onLocaleChange('es');
                        setActiveMenu(null);
                        setLockedMenu(null);
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 p-4 border font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer min-w-[100px] rounded-none",
                        locale === 'es' ? 'border-primary/60 bg-primary/5 text-primary' : 'border-border bg-muted/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground'
                      )}
                    >
                      <span>ESPAÑOL</span>
                    </button>
                    <button
                      onClick={() => {
                        onLocaleChange('en');
                        setActiveMenu(null);
                        setLockedMenu(null);
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center gap-2 p-4 border font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer min-w-[100px] rounded-none",
                        locale === 'en' ? 'border-primary/60 bg-primary/5 text-primary' : 'border-border bg-muted/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground'
                      )}
                    >
                      <span>ENGLISH</span>
                    </button>
                  </div>
                </div>
              )}

              {/* User Mega Menu */}
              {activeMenu === 'user' && user && (
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center w-full justify-between max-w-4xl">
                  {/* Left: User Details */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-sm text-primary rounded-none">
                      {userInitial}
                    </div>
                    <div>
                      <p className="font-mono text-xs font-bold uppercase text-foreground">
                        {user.name}
                      </p>
                      <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  {/* Middle: Details info (Desktop) */}
                  <div className="font-mono text-[9px] text-muted-foreground/60 space-y-1 min-w-[240px] border-l border-border/50 pl-6 hidden md:block">
                    <div className="flex justify-between gap-4">
                      <span>{t.identityProvider}:</span>
                      <span className="text-primary font-bold">{t.statusOnline}</span>
                    </div>
                    {user.email && (
                      <div className="flex justify-between gap-4">
                        <span>{t.emailLabel}:</span>
                        <span className="truncate max-w-[160px]">{user.email.toLowerCase()}</span>
                      </div>
                    )}
                  </div>

                  {/* Middle: Details info (Mobile) */}
                  <div className="font-mono text-[9px] text-muted-foreground/60 space-y-1 w-full border-t border-border/50 pt-3 md:hidden">
                    <div className="flex justify-between">
                      <span>{t.identityProvider}:</span>
                      <span className="text-primary font-bold">{t.statusOnline}</span>
                    </div>
                    {user.email && (
                      <div className="flex justify-between">
                        <span>{t.emailLabel}:</span>
                        <span className="truncate">{user.email.toLowerCase()}</span>
                      </div>
                    )}
                  </div>

                  {/* Right: Actions buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
                    <LocalizedLink
                      href="/profile"
                      transformHref={transformHref}
                      onClick={() => { setActiveMenu(null); setLockedMenu(null); }}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-border text-[9px] font-mono font-bold tracking-widest uppercase text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 rounded-none w-full sm:w-auto"
                    >
                      <UserIcon size={12} />
                      {t.profileLabel}
                    </LocalizedLink>
                    <button
                      onClick={() => { onLogout(); setActiveMenu(null); setLockedMenu(null); }}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-border text-[9px] font-mono font-bold tracking-widest uppercase text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer rounded-none w-full sm:w-auto"
                    >
                      <LogOut size={12} />
                      {t.logoutBtn}
                    </button>
                  </div>
                </div>
              )}

              {/* Search Mega Menu */}
              {activeMenu === 'search' && (
                <div className="w-full flex justify-center py-2">
                  <button
                    data-testid="navbar-mega-search-trigger"
                    onClick={() => {
                      onSearchTrigger?.();
                      setActiveMenu(null);
                      setLockedMenu(null);
                    }}
                    className="flex items-center justify-between gap-4 w-full max-w-lg bg-card/60 border border-border px-4 py-3 text-[11px] text-muted-foreground/75 font-mono hover:bg-card hover:border-primary/50 transition-all duration-200 cursor-pointer rounded-none shadow-none"
                  >
                    <span className="flex items-center gap-2">
                      <Search size={14} className="text-primary" />
                      {locale === 'es' ? 'ESCRIBE UN COMANDO O BUSCA...' : 'TYPE A COMMAND OR SEARCH...'}
                    </span>
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono border border-border/50 text-muted-foreground/50 bg-background/50">
                      Ctrl+K
                    </kbd>
                  </button>
                </div>
              )}

              {/* Tenant Mega Menu (renders the tenantSelectorSlot) */}
              {activeMenu === 'tenant' && tenantSelectorSlot && (
                <div className="w-full flex justify-center">
                  <SlotErrorBoundary>
                    {React.isValidElement(tenantSelectorSlot)
                      ? React.cloneElement(tenantSelectorSlot as React.ReactElement<any>, {
                          variant: 'content',
                          isOpen: true,
                        })
                      : tenantSelectorSlot}
                  </SlotErrorBoundary>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═══ Mobile Drawer ═══ */}
    </>
  );
}
