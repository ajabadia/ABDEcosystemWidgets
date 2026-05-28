"use client";
import * as React7 from 'react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Building2, Loader2, ChevronDown, Search, Check, X, ShieldCheck, Settings, LogOut, Terminal, CornerDownLeft, Shield, Menu, Sun, Languages, Info, AlertTriangle, LogIn, Activity, Layers, FileCode, Tag, Wifi, WifiOff, FileText, BarChart3, Moon, Monitor, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// src/identity/TenantSelector.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
function TenantSelector({
  activeTenantId,
  tenants = [],
  onTenantChange,
  spaces = [],
  groups = [],
  activeContextId,
  onContextChange,
  userRole = "USER",
  isLoading = false,
  variant = "dropdown",
  isOpen: externalIsOpen
}) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== void 0 ? externalIsOpen : localIsOpen;
  const setIsOpen = externalIsOpen !== void 0 ? () => {
  } : setLocalIsOpen;
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const t = (key, opts) => opts?.defaultMessage || key;
  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const hasContexts = spaces.length > 0 || groups.length > 0;
  const isInteractive = isSuperAdmin || tenants.length > 1 || hasContexts;
  const activeTenant = tenants.find((ten) => ten.tenantId === activeTenantId) || {
    name: activeTenantId
  };
  const activeContext = spaces.find((s) => s.id === activeContextId) || groups.find((g) => g.id === activeContextId);
  const displayLabel = activeContext ? `${activeTenant.name} / ${activeContext.name}` : activeTenant.name;
  const filteredTenants = tenants.filter(
    (ten) => ten.name.toLowerCase().includes(searchQuery.toLowerCase()) || ten.tenantId.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSpaces = spaces.filter(
    (space) => space.name.toLowerCase().includes(searchQuery.toLowerCase()) || space.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredGroups = groups.filter(
    (group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()) || group.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    setMounted(true);
  }, []);
  useClickOutside(containerRef, () => setIsOpen(false));
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);
  if (!mounted) {
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 border border-border bg-background/50 text-[10px] font-bold text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Building2, { size: 14, className: "animate-pulse" }),
      /* @__PURE__ */ jsx("span", { className: "truncate max-w-[120px] uppercase tracking-wider", children: displayLabel })
    ] });
  }
  if (!isInteractive) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        title: t("tenant_selector_active_badge", { defaultMessage: "ORGANIZACI\xD3N ACTIVA" }),
        className: "flex items-center gap-2 px-3 py-2.5 border border-border/80 bg-background/40 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80 font-sans backdrop-blur-md select-none",
        children: [
          /* @__PURE__ */ jsx(Building2, { size: 13, className: "text-muted-foreground/60 shrink-0" }),
          /* @__PURE__ */ jsx("span", { className: "truncate max-w-[140px]", children: displayLabel })
        ]
      }
    );
  }
  if (variant === "trigger") {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen,
        onClick: (e) => {
          e.preventDefault();
        },
        className: cn(
          "flex items-center justify-between gap-3 px-3 py-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted text-foreground transition-all duration-200 cursor-pointer shadow-none text-[10px] font-black uppercase tracking-[0.15em] font-sans min-w-[160px] max-w-[240px]",
          isOpen && "bg-muted ring-1 ring-primary/20 border-primary/30 text-primary"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 truncate", children: [
            isLoading ? /* @__PURE__ */ jsx(Loader2, { size: 13, className: "animate-spin text-primary shrink-0" }) : /* @__PURE__ */ jsx(Building2, { size: 13, className: cn("shrink-0 transition-colors", isOpen ? "text-primary" : "text-muted-foreground") }),
            /* @__PURE__ */ jsx("span", { className: "truncate text-left", children: displayLabel })
          ] }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              size: 13,
              className: cn(
                "text-muted-foreground shrink-0 transition-transform duration-300",
                isOpen && "rotate-180 text-primary"
              )
            }
          )
        ]
      }
    );
  }
  if (variant === "content") {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "w-full max-w-md bg-background border border-border backdrop-blur-md p-4 shadow-none rounded-none text-left",
        role: "listbox",
        "aria-label": t("tenant_selector_select", { defaultMessage: "Seleccionar organizaci\xF3n" }),
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-3 pb-1.5 border-b border-border", children: /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground italic flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Building2, { size: 10, className: "text-primary" }),
            t("tenant_selector_title", { defaultMessage: "ORGANIZACI\xD3N" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "relative mb-2 flex items-center", children: [
            /* @__PURE__ */ jsx(Search, { size: 12, className: "absolute left-2.5 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: t("tenant_selector_search", { defaultMessage: "Buscar organizaci\xF3n..." }),
                className: "w-full bg-card/60 hover:bg-card focus:bg-card border border-border hover:border-border/80 focus:border-primary/40 focus:ring-0 text-[10px] pl-8 pr-2 py-1.5 rounded-none text-foreground placeholder-muted-foreground font-sans focus:outline-none transition-colors",
                autoFocus: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar", children: isLoading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-6 text-[10px] text-muted-foreground font-sans gap-2", children: [
            /* @__PURE__ */ jsx(Loader2, { size: 12, className: "animate-spin text-primary" }),
            "Cargando organizaciones..."
          ] }) : filteredTenants.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-4 text-[10px] text-muted-foreground font-sans uppercase tracking-wider", children: t("tenant_selector_no_found", { defaultMessage: "No se encontraron organizaciones" }) }) : filteredTenants.map((ten) => {
            const isSelected = ten.tenantId === activeTenantId;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                role: "option",
                "aria-selected": isSelected,
                onClick: () => {
                  if (onTenantChange && !isSelected) {
                    onTenantChange(ten.tenantId);
                  }
                },
                className: cn(
                  "w-full text-left px-2.5 py-2 text-[10px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                  isSelected ? "bg-primary/10 border-primary/20 text-primary font-bold" : "bg-card/30 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col truncate pr-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-bold truncate", children: ten.name }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[8px] opacity-60 font-mono lowercase tracking-normal", children: [
                      "@",
                      ten.tenantId
                    ] })
                  ] }),
                  isSelected && /* @__PURE__ */ jsx(Check, { size: 12, className: "text-primary shrink-0 ml-2" })
                ]
              },
              ten.tenantId
            );
          }) }),
          filteredSpaces.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-2 border-t border-border/50", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 mb-1.5 px-1", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground italic", children: t("tenant_selector_spaces_title", { defaultMessage: "ESPACIOS" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1", children: filteredSpaces.map((space) => {
              const isSelected = space.id === activeContextId;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": isSelected,
                  onClick: () => {
                    if (onContextChange && !isSelected) {
                      onContextChange(space.id, "space");
                    }
                  },
                  className: cn(
                    "w-full text-left px-2.5 py-1.5 text-[9px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                    isSelected ? "bg-primary/10 border-primary/20 text-primary font-bold" : "bg-card/20 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col truncate pr-2", children: /* @__PURE__ */ jsx("span", { className: "font-bold truncate", children: space.name }) }),
                    isSelected && /* @__PURE__ */ jsx(Check, { size: 10, className: "text-primary shrink-0 ml-2" })
                  ]
                },
                space.id
              );
            }) })
          ] }),
          filteredGroups.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-2 border-t border-border/50", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 mb-1.5 px-1", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground italic", children: t("tenant_selector_groups_title", { defaultMessage: "GRUPOS" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1", children: filteredGroups.map((group) => {
              const isSelected = group.id === activeContextId;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": isSelected,
                  onClick: () => {
                    if (onContextChange && !isSelected) {
                      onContextChange(group.id, "group");
                    }
                  },
                  className: cn(
                    "w-full text-left px-2.5 py-1.5 text-[9px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                    isSelected ? "bg-primary/10 border-primary/20 text-primary font-bold" : "bg-card/20 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col truncate pr-2", children: /* @__PURE__ */ jsx("span", { className: "font-bold truncate", children: group.name }) }),
                    isSelected && /* @__PURE__ */ jsx(Check, { size: 10, className: "text-primary shrink-0 ml-2" })
                  ]
                },
                group.id
              );
            }) })
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-block text-left", ref: containerRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        "aria-haspopup": "listbox",
        "aria-expanded": isOpen,
        onClick: () => setIsOpen(!isOpen),
        className: cn(
          "flex items-center justify-between gap-3 px-3 py-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted text-foreground transition-all duration-200 cursor-pointer shadow-none text-[10px] font-black uppercase tracking-[0.15em] font-sans min-w-[160px] max-w-[240px]",
          isOpen && "bg-muted ring-1 ring-primary/20 border-primary/30 text-primary"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 truncate", children: [
            isLoading ? /* @__PURE__ */ jsx(Loader2, { size: 13, className: "animate-spin text-primary shrink-0" }) : /* @__PURE__ */ jsx(Building2, { size: 13, className: cn("shrink-0 transition-colors", isOpen ? "text-primary" : "text-muted-foreground") }),
            /* @__PURE__ */ jsx("span", { className: "truncate text-left", children: displayLabel })
          ] }),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              size: 13,
              className: cn(
                "text-muted-foreground shrink-0 transition-transform duration-300",
                isOpen && "rotate-180 text-primary"
              )
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "absolute right-0 mt-3 w-72 bg-background border border-border backdrop-blur-md z-[100] overflow-hidden rounded-none shadow-none p-3 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out",
        role: "listbox",
        "aria-label": t("tenant_selector_select", { defaultMessage: "Seleccionar organizaci\xF3n" }),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 pb-1.5 border-b border-border", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground italic flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Building2, { size: 10, className: "text-primary" }),
              t("tenant_selector_title", { defaultMessage: "ORGANIZACI\xD3N" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "Cerrar selector",
                onClick: () => setIsOpen(false),
                className: "p-1 hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground cursor-pointer",
                children: /* @__PURE__ */ jsx(X, { size: 12 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative mb-2 flex items-center", children: [
            /* @__PURE__ */ jsx(Search, { size: 12, className: "absolute left-2.5 text-muted-foreground" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: t("tenant_selector_search", { defaultMessage: "Buscar organizaci\xF3n..." }),
                className: "w-full bg-card/60 hover:bg-card focus:bg-card border border-border hover:border-border/80 focus:border-primary/40 focus:ring-0 text-[10px] pl-8 pr-2 py-1.5 rounded-none text-foreground placeholder-muted-foreground font-sans focus:outline-none transition-colors",
                autoFocus: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar", children: isLoading ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-6 text-[10px] text-muted-foreground font-sans gap-2", children: [
            /* @__PURE__ */ jsx(Loader2, { size: 12, className: "animate-spin text-primary" }),
            "Cargando organizaciones..."
          ] }) : filteredTenants.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-4 text-[10px] text-muted-foreground font-sans uppercase tracking-wider", children: t("tenant_selector_no_found", { defaultMessage: "No se encontraron organizaciones" }) }) : filteredTenants.map((ten) => {
            const isSelected = ten.tenantId === activeTenantId;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                role: "option",
                "aria-selected": isSelected,
                onClick: () => {
                  if (onTenantChange && !isSelected) {
                    onTenantChange(ten.tenantId);
                  }
                  setIsOpen(false);
                },
                className: cn(
                  "w-full text-left px-2.5 py-2 text-[10px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                  isSelected ? "bg-primary/10 border-primary/20 text-primary font-bold" : "bg-card/30 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col truncate pr-2", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-bold truncate", children: ten.name }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[8px] opacity-60 font-mono lowercase tracking-normal", children: [
                      "@",
                      ten.tenantId
                    ] })
                  ] }),
                  isSelected && /* @__PURE__ */ jsx(Check, { size: 12, className: "text-primary shrink-0 ml-2" })
                ]
              },
              ten.tenantId
            );
          }) }),
          filteredSpaces.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-2 border-t border-border/50", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 mb-1.5 px-1", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground italic", children: t("tenant_selector_spaces_title", { defaultMessage: "ESPACIOS" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1", children: filteredSpaces.map((space) => {
              const isSelected = space.id === activeContextId;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": isSelected,
                  onClick: () => {
                    if (onContextChange && !isSelected) {
                      onContextChange(space.id, "space");
                    }
                    setIsOpen(false);
                  },
                  className: cn(
                    "w-full text-left px-2.5 py-1.5 text-[9px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                    isSelected ? "bg-primary/10 border-primary/20 text-primary font-bold" : "bg-card/20 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col truncate pr-2", children: /* @__PURE__ */ jsx("span", { className: "font-bold truncate", children: space.name }) }),
                    isSelected && /* @__PURE__ */ jsx(Check, { size: 10, className: "text-primary shrink-0 ml-2" })
                  ]
                },
                space.id
              );
            }) })
          ] }),
          filteredGroups.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-2 border-t border-border/50", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 mb-1.5 px-1", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground italic", children: t("tenant_selector_groups_title", { defaultMessage: "GRUPOS" }) }) }),
            /* @__PURE__ */ jsx("div", { className: "space-y-1", children: filteredGroups.map((group) => {
              const isSelected = group.id === activeContextId;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": isSelected,
                  onClick: () => {
                    if (onContextChange && !isSelected) {
                      onContextChange(group.id, "group");
                    }
                    setIsOpen(false);
                  },
                  className: cn(
                    "w-full text-left px-2.5 py-1.5 text-[9px] uppercase font-sans tracking-wide transition-all duration-150 flex items-center justify-between border cursor-pointer rounded-none",
                    isSelected ? "bg-primary/10 border-primary/20 text-primary font-bold" : "bg-card/20 border-transparent hover:bg-muted hover:border-border/50 text-muted-foreground hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col truncate pr-2", children: /* @__PURE__ */ jsx("span", { className: "font-bold truncate", children: group.name }) }),
                    isSelected && /* @__PURE__ */ jsx(Check, { size: 10, className: "text-primary shrink-0 ml-2" })
                  ]
                },
                group.id
              );
            }) })
          ] })
        ]
      }
    )
  ] });
}
function UserIdentity({
  name,
  email,
  isAdmin = false,
  adminHref = "/admin",
  logoutHref = "/api/auth/logout",
  translations,
  LinkComponent
}) {
  const adminTitle = translations?.adminTitle || "Admin Console";
  const logoutTitle = translations?.logoutTitle || "Logout";
  const LinkComp = LinkComponent || "a";
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-1 pl-4 bg-card border border-border rounded-md backdrop-blur-sm group transition-all hover:border-primary/20", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-0.5 py-1", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono uppercase tracking-[0.2em] text-foreground font-bold", children: name }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
        isAdmin && /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3 h-3 text-primary/60" }),
        /* @__PURE__ */ jsx("span", { className: "text-[9px] font-mono uppercase tracking-[0.1em] text-muted-foreground/60", children: email })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-8 w-[1px] bg-border mx-1" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
      isAdmin && /* @__PURE__ */ jsx(LinkComp, { href: adminHref, title: adminTitle, className: "p-1 hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsx(Settings, { size: 14 }) }),
      /* @__PURE__ */ jsx(LinkComp, { href: logoutHref, title: logoutTitle, className: "p-1 hover:bg-red-500/10 rounded-none transition-colors text-red-500/70 hover:text-red-500", children: /* @__PURE__ */ jsx(LogOut, { size: 14 }) })
    ] })
  ] });
}
function CommandPalette({
  commands,
  placeholder,
  isOpen: controlledIsOpen,
  onOpenChange
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== void 0 ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (newVal) => {
    const nextVal = typeof newVal === "function" ? newVal(isOpen) : newVal;
    setInternalIsOpen(nextVal);
    onOpenChange?.(nextVal);
  };
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const t = (key, opts) => opts?.defaultMessage || key;
  const currentPlaceholder = placeholder || t("command_palette_placeholder", { defaultMessage: "Escribe un comando o busca..." });
  useEffect(() => {
    const handleKeyDown2 = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown2);
    return () => window.removeEventListener("keydown", handleKeyDown2);
  }, []);
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("abd-command-palette-open", handleOpenEvent);
    return () => window.removeEventListener("abd-command-palette-open", handleOpenEvent);
  }, []);
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setActiveIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const term = search.toLowerCase();
    return commands.filter(
      (cmd) => cmd.title.toLowerCase().includes(term) || cmd.category.toLowerCase().includes(term) || cmd.description?.toLowerCase().includes(term)
    );
  }, [commands, search]);
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredCommands]);
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        executeCommand(filteredCommands[activeIndex]);
      }
    }
  };
  const executeCommand = async (cmd) => {
    setIsOpen(false);
    try {
      await cmd.action();
    } catch (err) {
      console.error("Error executing command:", err);
    }
  };
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);
  if (!isOpen) return null;
  const groupedCommands = {};
  filteredCommands.forEach((cmd) => {
    if (!groupedCommands[cmd.category]) {
      groupedCommands[cmd.category] = [];
    }
    groupedCommands[cmd.category].push(cmd);
  });
  let flatIndexCounter = 0;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4",
      onKeyDown: handleKeyDown,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300",
            onClick: () => setIsOpen(false)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-xl bg-zinc-950/90 border border-white/10 rounded-xl shadow-2xl shadow-black overflow-hidden flex flex-col transition-all duration-200 transform scale-100 max-h-[50vh]", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center border-b border-white/5 px-4 py-3.5 z-10", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-white/40 mr-3 shrink-0" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: inputRef,
                type: "text",
                className: "w-full bg-transparent text-white text-base outline-none border-none placeholder-white/30",
                placeholder: currentPlaceholder,
                value: search,
                onChange: (e) => setSearch(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1 ml-2 shrink-0", children: /* @__PURE__ */ jsx("kbd", { className: "px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/10 text-white/50 border border-white/5 uppercase", children: "esc" }) })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: listRef,
              className: "flex-1 overflow-y-auto py-2 px-2 z-10 max-h-[35vh] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
              children: filteredCommands.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-10 px-4 text-center", children: [
                /* @__PURE__ */ jsx(Terminal, { className: "w-8 h-8 text-white/20 mb-2" }),
                /* @__PURE__ */ jsx("p", { className: "text-white/60 text-sm font-medium", children: t("command_palette_no_commands", { defaultMessage: "No se encontraron comandos" }) }),
                /* @__PURE__ */ jsx("p", { className: "text-white/30 text-xs mt-1", children: t("command_palette_try_another", { defaultMessage: "Prueba a escribir otra palabra clave" }) })
              ] }) : Object.keys(groupedCommands).map((category) => /* @__PURE__ */ jsxs("div", { className: "mb-2 last:mb-0", children: [
                /* @__PURE__ */ jsx("div", { className: "px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white/30 uppercase select-none", children: category }),
                /* @__PURE__ */ jsx("div", { className: "space-y-0.5", children: groupedCommands[category].map((cmd) => {
                  const currentFlatIndex = flatIndexCounter++;
                  const isActive = currentFlatIndex === activeIndex;
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      "data-active": isActive,
                      className: `group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150 ${isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`,
                      onClick: () => executeCommand(cmd),
                      onMouseEnter: () => setActiveIndex(currentFlatIndex),
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center min-w-0 mr-3", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: `flex items-center justify-center w-6 h-6 rounded mr-3 shrink-0 transition-colors duration-150 ${isActive ? "text-white" : "text-white/40 group-hover:text-white/60"}`,
                              children: cmd.icon || /* @__PURE__ */ jsx(Terminal, { className: "w-4 h-4" })
                            }
                          ),
                          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsx("span", { className: "block text-sm font-medium truncate", children: cmd.title }),
                            cmd.description && /* @__PURE__ */ jsx(
                              "span",
                              {
                                className: `block text-xs truncate transition-colors duration-150 ${isActive ? "text-white/60" : "text-white/30 group-hover:text-white/40"}`,
                                children: cmd.description
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-1 shrink-0", children: cmd.shortcut ? cmd.shortcut.map((key, idx) => /* @__PURE__ */ jsx(
                          "kbd",
                          {
                            className: `px-1 py-0.5 text-[9px] font-mono rounded border transition-colors duration-150 uppercase ${isActive ? "bg-white/20 border-white/20 text-white/80" : "bg-white/5 border-white/5 text-white/30 group-hover:text-white/40"}`,
                            children: key
                          },
                          idx
                        )) : isActive && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-white/40 flex items-center font-mono uppercase", children: [
                          t("command_palette_execute", { defaultMessage: "ejecutar" }),
                          " ",
                          /* @__PURE__ */ jsx(CornerDownLeft, { className: "w-3 h-3 ml-1" })
                        ] }) })
                      ]
                    },
                    cmd.id
                  );
                }) })
              ] }, category))
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "border-t border-white/5 px-4 py-2 bg-zinc-950 flex items-center justify-between text-[10px] text-white/30 select-none z-10 shrink-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("kbd", { className: "px-1 py-0.5 rounded bg-white/5 border border-white/5", children: "\u2191\u2193" }),
                " ",
                t("command_palette_navigate", { defaultMessage: "Navegar" })
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("kbd", { className: "px-1 py-0.5 rounded bg-white/5 border border-white/5", children: "enter" }),
                " ",
                t("command_palette_select", { defaultMessage: "Seleccionar" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { children: t("command_palette_switcher", { defaultMessage: "Conmutador R\xE1pido" }) }) })
          ] })
        ] })
      ]
    }
  );
}
var defaultTranslations = {
  brandFallback: "ABD SYSTEM",
  logoutBtn: "TERMINAR SESI\xD3N",
  identityProvider: "IDENTITY PROVIDER",
  statusOnline: "ONLINE",
  emailLabel: "EMAIL"
};
function GlobalNavbar({
  session,
  links,
  logoUrl,
  onLogout,
  brandName,
  homeHref = "/dashboard",
  activeHref,
  translations,
  transformHref
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = {
    name: session?.user?.name || (session?.authenticated ? "User" : "Guest"),
    role: session?.user?.role || "PUBLIC",
    tenantId: session?.user?.tenantId || (session?.authenticated ? "GLOBAL" : ""),
    email: session?.user?.email || ""
  };
  const resolvedBrand = brandName || (session?.user?.tenantId ? session.user.tenantId : "ABD SYSTEM");
  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed-layout");
      document.body.classList.remove("sidebar-expanded-layout");
    } else {
      document.body.classList.add("sidebar-expanded-layout");
      document.body.classList.remove("sidebar-collapsed-layout");
    }
    return () => {
      document.body.classList.remove("sidebar-collapsed-layout", "sidebar-expanded-layout");
    };
  }, [isCollapsed]);
  const t = { ...defaultTranslations, ...translations };
  const LocalizedLink2 = ({ href, onClick, className, title, children }) => {
    const finalHref = transformHref ? transformHref(href) : href;
    const isExternal = finalHref.startsWith("http://") || finalHref.startsWith("https://");
    if (isExternal) {
      return /* @__PURE__ */ jsx("a", { href: finalHref, onClick, className, title, children });
    }
    if (onClick) {
      return /* @__PURE__ */ jsx(Link, { href: finalHref, className, onClick, title, children });
    }
    return /* @__PURE__ */ jsx(Link, { href: finalHref, className, title, children });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "aside",
    {
      id: "global-navbar-panel",
      role: "navigation",
      "aria-label": "Global Navigation",
      className: cn(
        "fixed inset-y-0 left-0 z-[50] bg-background border-r border-border shadow-2xl flex flex-col transition-all duration-300 ease-in-out rounded-none overflow-hidden",
        isCollapsed ? "w-[64px] p-2" : "w-80 p-6"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: cn("flex items-center", isCollapsed ? "justify-center mt-4 mb-8" : "justify-between mb-8 pt-6 border-b border-border pb-4"), children: [
          !isCollapsed && /* @__PURE__ */ jsxs(
            LocalizedLink2,
            {
              href: homeHref,
              className: "flex items-center gap-3 overflow-hidden",
              children: [
                logoUrl ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: logoUrl,
                    alt: "Logo",
                    className: "w-6 h-6 object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] shrink-0"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Shield, { size: 12, className: "text-primary" }) }),
                /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground truncate", children: user.tenantId || resolvedBrand })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": "Toggle Navigation",
              "aria-expanded": !isCollapsed,
              "aria-controls": "global-navbar-panel",
              onClick: () => setIsCollapsed(!isCollapsed),
              className: "p-2 rounded-none hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer flex-shrink-0",
              children: isCollapsed ? /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden no-scrollbar", children: links.map((link) => {
          const isActive = activeHref ? activeHref === link.href || link.href !== homeHref && activeHref.startsWith(link.href) : false;
          return /* @__PURE__ */ jsxs(
            LocalizedLink2,
            {
              href: link.href,
              className: cn(
                "py-3 rounded-none flex items-center font-mono font-bold uppercase tracking-wider transition-all duration-200 border group",
                isCollapsed ? "px-0 justify-center text-[12px]" : "px-4 gap-4 text-[10px]",
                isActive ? "bg-primary/10 border-primary text-primary" : "bg-muted/10 border-border text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
              ),
              ...isCollapsed ? { title: link.label } : {},
              children: [
                /* @__PURE__ */ jsx("span", { className: "shrink-0", children: link.icon }),
                !isCollapsed && /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: link.label })
              ]
            },
            link.href
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: cn("border-border mt-auto", isCollapsed ? "pt-4 border-none flex justify-center pb-2" : "border-t pt-6"), children: [
          isCollapsed ? /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary rounded-none cursor-help", title: user.name, children: user.name?.charAt(0).toUpperCase() || "U" }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 p-4 border border-border bg-muted/10 rounded-none relative overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary rounded-none shrink-0", children: user.name?.charAt(0).toUpperCase() || "U" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-black tracking-wider truncate uppercase text-foreground", children: user.name }),
                /* @__PURE__ */ jsx("p", { className: "font-mono text-[8px] text-muted-foreground/80 uppercase tracking-widest truncate", children: user.role })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "font-mono text-[8px] text-muted-foreground/60 flex flex-col gap-1 border-t border-border/50 pt-2.5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  t.identityProvider,
                  ":"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: t.statusOnline })
              ] }),
              user.email && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  t.emailLabel,
                  ":"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "truncate max-w-[150px]", children: user.email.toLowerCase() })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                "aria-label": t.logoutBtn,
                onClick: onLogout,
                className: "w-full flex items-center justify-center gap-2 px-3 py-2 border border-border text-[9px] font-mono font-black uppercase tracking-widest transition-all rounded-none hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx(LogOut, { size: 12 }),
                  /* @__PURE__ */ jsx("span", { children: t.logoutBtn })
                ]
              }
            )
          ] }),
          isCollapsed && /* @__PURE__ */ jsx(
            "button",
            {
              "aria-label": t.logoutBtn,
              onClick: onLogout,
              className: "mt-4 w-10 h-10 flex items-center justify-center border border-border transition-all rounded-none hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 cursor-pointer text-muted-foreground mx-auto",
              title: t.logoutBtn,
              children: /* @__PURE__ */ jsx(LogOut, { size: 14 })
            }
          )
        ] })
      ]
    }
  ) });
}
function GlobalFooter({
  label,
  leftLabel,
  rightLabel,
  telemetryItems,
  showSeparator = true,
  separatorWidth = "full",
  className = "",
  opacity = 30
}) {
  const opacityClass = opacity <= 20 ? "text-muted-foreground/20" : opacity >= 40 ? "text-muted-foreground/40" : "text-muted-foreground/30";
  const isTwoColumn = !!(leftLabel && rightLabel);
  const containerClass = isTwoColumn ? "mt-auto pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4" : "mt-auto pt-12 flex flex-col items-center gap-6";
  const separatorWidthClass = separatorWidth === "short" ? "w-24 mx-auto" : "w-full";
  return /* @__PURE__ */ jsxs(
    "footer",
    {
      className: `${containerClass} font-mono text-[9px] uppercase tracking-[0.3em] ${opacityClass} ${className}`,
      role: "contentinfo",
      children: [
        showSeparator && !isTwoColumn && /* @__PURE__ */ jsx(
          "div",
          {
            className: `h-[1px] bg-border/40 ${separatorWidthClass}`,
            "aria-hidden": "true"
          }
        ),
        telemetryItems && telemetryItems.length > 0 ? (
          // ── Telemetry mode — centered key-value pairs ──
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-x-12 gap-y-2", children: telemetryItems.map((item, index) => /* @__PURE__ */ jsxs("span", { children: [
            item.label,
            ": ",
            item.value
          ] }, index)) })
        ) : isTwoColumn ? (
          // ── Two-column mode — left / right labels ──
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { children: leftLabel }),
            /* @__PURE__ */ jsx("span", { children: rightLabel })
          ] })
        ) : (
          // ── Simple label mode — centered ──
          label && /* @__PURE__ */ jsx("span", { children: label })
        )
      ]
    }
  );
}
function IndustrialTopBar({
  locale = "en",
  children,
  settings,
  className = ""
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed top-6 right-6 z-40 flex items-center gap-2 ${className}`,
      children: [
        children,
        /* @__PURE__ */ jsxs(
          "button",
          {
            id: "command-palette-trigger",
            "aria-label": locale === "es" ? "Buscar comandos (Ctrl+K)" : "Search commands (Ctrl+K)",
            className: "p-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted text-foreground transition-all active:scale-90 cursor-pointer shadow-lg flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx(Search, { size: 18, className: "text-foreground shrink-0" }),
              /* @__PURE__ */ jsx("span", { className: "hidden md:inline-flex items-center text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/80 font-sans", children: locale === "es" ? "BUSCADOR" : "SEARCH" }),
              /* @__PURE__ */ jsx("kbd", { className: "hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono rounded bg-white/10 text-white/50 border border-white/5 uppercase", children: "Ctrl+K" })
            ]
          }
        ),
        settings
      ]
    }
  );
}
function LocalizedLink({
  href,
  transformHref = (h) => h,
  onClick,
  className,
  title,
  children,
  "data-testid": dataTestId
}) {
  const finalHref = transformHref(href);
  const isExternal = finalHref.startsWith("http://") || finalHref.startsWith("https://");
  if (isExternal) {
    return /* @__PURE__ */ jsx("a", { href: finalHref, onClick, className, title, "data-testid": dataTestId, children });
  }
  if (onClick) {
    return /* @__PURE__ */ jsx(Link, { href: finalHref, className, onClick, title, "data-testid": dataTestId, children });
  }
  return /* @__PURE__ */ jsx(Link, { href: finalHref, className, title, "data-testid": dataTestId, children });
}
function SmartNavbarNavMenu({ links, transformHref }) {
  return /* @__PURE__ */ jsx("div", { className: "flex gap-8", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "font-mono text-[9px] font-bold tracking-widest uppercase text-muted-foreground mb-3", children: "ACCESOS R\xC1PIDOS" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: links.map((link, idx) => /* @__PURE__ */ jsxs(
      LocalizedLink,
      {
        href: link.href,
        transformHref,
        "data-testid": `navbar-link-idx-${idx}`,
        className: "flex items-center gap-3 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-200",
        children: [
          /* @__PURE__ */ jsx("span", { className: "shrink-0", children: link.icon }),
          link.label
        ]
      },
      link.href
    )) })
  ] }) });
}
function SmartNavbarThemeMenu({ currentTheme, setTheme, t }) {
  const themes = [
    { value: "light", icon: Sun, label: t.themeLight },
    { value: "dark", icon: Moon, label: t.themeDark },
    { value: "system", icon: Monitor, label: t.themeSystem }
  ];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "font-mono text-[9px] font-bold tracking-widest uppercase text-muted-foreground mb-3", children: t.themeLabel }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: themes.map(({ value, icon: Icon, label }) => {
      const isActive = currentTheme === value;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setTheme(value),
          className: cn(
            "flex flex-col items-center gap-2 p-4 border transition-all duration-200 cursor-pointer min-w-[100px] rounded-none",
            isActive ? "border-primary/60 bg-primary/5 text-primary" : "border-border bg-muted/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground"
          ),
          children: [
            /* @__PURE__ */ jsx(Icon, { size: 18, className: isActive ? "text-primary" : "text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: cn(
              "font-mono text-[9px] font-bold tracking-widest uppercase",
              isActive ? "text-primary" : "text-muted-foreground"
            ), children: label })
          ]
        },
        value
      );
    }) })
  ] });
}
function SmartNavbarLanguageMenu({ locale, onLocaleChange, onClose }) {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "flex gap-3", children: [
    { value: "es", label: "ESPA\xD1OL" },
    { value: "en", label: "ENGLISH" }
  ].map(({ value, label }) => /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => {
        onLocaleChange(value);
        onClose();
      },
      className: cn(
        "flex flex-col items-center justify-center gap-2 p-4 border font-mono text-[9px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer min-w-[100px] rounded-none",
        locale === value ? "border-primary/60 bg-primary/5 text-primary" : "border-border bg-muted/10 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground"
      ),
      children: /* @__PURE__ */ jsx("span", { children: label })
    },
    value
  )) }) });
}
function SmartNavbarUserMenu({
  user,
  userInitial,
  t,
  onLogout,
  transformHref,
  onClose
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center w-full justify-between max-w-4xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-sm text-primary rounded-none", children: userInitial }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs font-bold uppercase text-foreground", children: user.name }),
        /* @__PURE__ */ jsx("p", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-wider", children: user.role })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "font-mono text-[9px] text-muted-foreground/60 space-y-1 min-w-[240px] border-l border-border/50 pl-6 hidden md:block", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          t.identityProvider,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: t.statusOnline })
      ] }),
      user.email && /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          t.emailLabel,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "truncate max-w-[160px]", children: user.email.toLowerCase() })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "font-mono text-[9px] text-muted-foreground/60 space-y-1 w-full border-t border-border/50 pt-3 md:hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          t.identityProvider,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: t.statusOnline })
      ] }),
      user.email && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          t.emailLabel,
          ":"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: user.email.toLowerCase() })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto", children: [
      /* @__PURE__ */ jsxs(
        LocalizedLink,
        {
          href: "/profile",
          transformHref,
          onClick: onClose,
          className: "flex items-center justify-center gap-2 px-4 py-2 border border-border text-[9px] font-mono font-bold tracking-widest uppercase text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 rounded-none w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsx(User, { size: 12 }),
            t.profileLabel
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            onLogout();
            onClose();
          },
          className: "flex items-center justify-center gap-2 px-4 py-2 border border-border text-[9px] font-mono font-bold tracking-widest uppercase text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all duration-200 cursor-pointer rounded-none w-full sm:w-auto",
          children: [
            /* @__PURE__ */ jsx(LogOut, { size: 12 }),
            t.logoutBtn
          ]
        }
      )
    ] })
  ] });
}
function SmartNavbarSearchMenu({ locale, onSearchTrigger, onClose }) {
  return /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center py-2", children: /* @__PURE__ */ jsxs(
    "button",
    {
      "data-testid": "navbar-mega-search-trigger",
      onClick: () => {
        onSearchTrigger?.();
        onClose();
      },
      className: "flex items-center justify-between gap-4 w-full max-w-lg bg-card/60 border border-border px-4 py-3 text-[11px] text-muted-foreground/75 font-mono hover:bg-card hover:border-primary/50 transition-all duration-200 cursor-pointer rounded-none shadow-none",
      children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Search, { size: 14, className: "text-primary" }),
          locale === "es" ? "ESCRIBE UN COMANDO O BUSCA..." : "TYPE A COMMAND OR SEARCH..."
        ] }),
        /* @__PURE__ */ jsx("kbd", { className: "px-1.5 py-0.5 text-[9px] font-mono border border-border/50 text-muted-foreground/50 bg-background/50", children: "Ctrl+K" })
      ]
    }
  ) });
}
var defaultTranslations2 = {
  brandFallback: "ABD SYSTEM",
  logoutBtn: "TERMINAR SESI\xD3N",
  loginBtn: "INICIAR SESI\xD3N",
  searchLabel: "BUSCAR...",
  themeLabel: "TEMA",
  themeLight: "CLARO",
  themeDark: "OSCURO",
  themeSystem: "SISTEMA",
  profileLabel: "MI PERFIL",
  identityProvider: "PROVEEDOR",
  statusOnline: "ONLINE",
  emailLabel: "EMAIL",
  languageLabel: "IDIOMA"
};
var SlotErrorBoundary = class extends React7.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-[9px] font-mono text-muted-foreground border border-dashed border-border", children: "\u26A0\uFE0F SLOT ERROR" });
    }
    return this.props.children;
  }
};
function SmartNavbar({
  session,
  links,
  logoUrl,
  brandName,
  activeHref,
  locale = "en",
  onLogout,
  onLogin,
  onLocaleChange,
  transformHref: rawTransformHref,
  tenantSelectorSlot,
  settingsSlot,
  translations,
  onSearchTrigger
}) {
  const transformHref = rawTransformHref ?? ((href) => href);
  const t = { ...defaultTranslations2, ...translations };
  const isAuthenticated = session?.authenticated === true;
  const user = session?.user ?? null;
  const searchParams = useSearchParams();
  const activeTenantId = searchParams.get("tenantId") || user?.tenantId || "";
  const [activeMenu, setActiveMenu] = useState(null);
  const [lockedMenu, setLockedMenu] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("dark");
  const timeoutRef = useRef(null);
  const navbarRef = useRef(null);
  useEffect(() => {
    document.body.classList.remove("sidebar-expanded-layout", "sidebar-collapsed-layout");
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      } else {
        setCurrentTheme("system");
      }
    } catch {
      setCurrentTheme("system");
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (activeMenu) {
          setActiveMenu(null);
          setLockedMenu(null);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeMenu]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (lockedMenu && navbarRef.current && !navbarRef.current.contains(e.target)) {
        setActiveMenu(null);
        setLockedMenu(null);
      }
    };
    if (lockedMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [lockedMenu]);
  const handleMouseEnter = useCallback((menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!lockedMenu || lockedMenu === menuName) {
      setActiveMenu(menuName);
    }
  }, [lockedMenu]);
  const handleMouseLeave = useCallback(() => {
    if (lockedMenu) return;
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  }, [lockedMenu]);
  const handleMenuClick = useCallback((menuName) => {
    if (lockedMenu === menuName && activeMenu === menuName) {
      setActiveMenu(null);
      setLockedMenu(null);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveMenu(menuName);
      setLockedMenu(menuName);
    }
  }, [lockedMenu, activeMenu]);
  const closeMenus = useCallback(() => {
    setActiveMenu(null);
    setLockedMenu(null);
  }, []);
  const setTheme = useCallback((theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
    }
    setCurrentTheme(theme);
  }, []);
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";
  const renderNavLinks = () => links.map((link, idx) => {
    const isActive = activeHref ? activeHref === link.href || link.href !== "/" && link.href !== "/dashboard" && link.href !== "/admin" && activeHref?.startsWith(link.href + "/") : false;
    return /* @__PURE__ */ jsx(
      LocalizedLink,
      {
        href: link.href,
        transformHref,
        "data-testid": `navbar-link-idx-${idx}`,
        className: cn(
          "px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 rounded-none",
          isActive ? "text-primary font-black" : "text-muted-foreground font-medium hover:text-primary"
        ),
        children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          link.icon,
          link.label
        ] })
      },
      link.href
    );
  });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: navbarRef,
      "data-testid": "smart-navbar",
      className: "smart-navbar",
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-[1600px] mx-auto h-full px-4 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 min-w-0", children: /* @__PURE__ */ jsxs(
            LocalizedLink,
            {
              href: isAuthenticated ? "/" : "/",
              transformHref,
              "data-testid": "navbar-logo",
              className: "flex items-center gap-3 shrink-0",
              children: [
                logoUrl ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: logoUrl,
                    alt: "Logo",
                    className: "w-6 h-6 object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                  }
                ) : /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-primary/10 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsx(Shield, { size: 12, className: "text-primary" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col text-left", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-black uppercase tracking-[0.2em] text-foreground truncate max-w-[160px] leading-tight", children: brandName || t.brandFallback }),
                  isAuthenticated && activeTenantId && /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] opacity-70 uppercase tracking-widest text-muted-foreground leading-none mt-0.5", children: activeTenantId })
                ] })
              ]
            }
          ) }),
          isAuthenticated && /* @__PURE__ */ jsx("nav", { className: "smart-navbar-desktop-only flex items-center gap-1", children: renderNavLinks() }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            isAuthenticated && /* @__PURE__ */ jsx(
              "div",
              {
                className: "relative",
                onMouseEnter: () => handleMouseEnter("search"),
                onClick: () => handleMenuClick("search"),
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    "data-testid": "navbar-menu-search",
                    className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none",
                    "aria-haspopup": "true",
                    "aria-expanded": activeMenu === "search",
                    children: /* @__PURE__ */ jsx(Search, { size: 16 })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "relative",
                onMouseEnter: () => handleMouseEnter("theme"),
                onClick: () => handleMenuClick("theme"),
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    "data-testid": "navbar-menu-theme",
                    className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none",
                    "aria-haspopup": "true",
                    "aria-expanded": activeMenu === "theme",
                    children: /* @__PURE__ */ jsx(Sun, { size: 16 })
                  }
                )
              }
            ),
            onLocaleChange && /* @__PURE__ */ jsx(
              "div",
              {
                className: "relative",
                onMouseEnter: () => handleMouseEnter("language"),
                onClick: () => handleMenuClick("language"),
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    "data-testid": "navbar-menu-language",
                    className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none",
                    "aria-haspopup": "true",
                    "aria-expanded": activeMenu === "language",
                    children: /* @__PURE__ */ jsx(Languages, { size: 16 })
                  }
                )
              }
            ),
            isAuthenticated && tenantSelectorSlot && /* @__PURE__ */ jsx(
              "div",
              {
                className: "relative",
                onMouseEnter: () => handleMouseEnter("tenant"),
                onClick: () => handleMenuClick("tenant"),
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    "data-testid": "navbar-menu-tenant",
                    className: "p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer rounded-none",
                    "aria-haspopup": "true",
                    "aria-expanded": activeMenu === "tenant",
                    children: /* @__PURE__ */ jsx(Building2, { size: 16 })
                  }
                )
              }
            ),
            isAuthenticated && /* @__PURE__ */ jsx(
              "div",
              {
                className: "relative",
                onMouseEnter: () => handleMouseEnter("user"),
                onClick: () => handleMenuClick("user"),
                children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    "data-testid": "navbar-menu-user",
                    className: "w-7 h-7 shrink-0 aspect-square flex items-center justify-center bg-primary/10 border border-primary/20 text-primary font-bold text-xs hover:bg-primary/20 transition-all duration-200 cursor-pointer rounded-none",
                    "aria-haspopup": "true",
                    "aria-expanded": activeMenu === "user",
                    children: userInitial
                  }
                )
              }
            ),
            !isAuthenticated && onLogin && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onLogin,
                className: "px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest uppercase border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-pointer rounded-none",
                children: t.loginBtn
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[2px] opacity-0 bg-primary/50 scale-x-0 transition-all duration-300 pointer-events-none" }),
        activeMenu && /* @__PURE__ */ jsx(
          "div",
          {
            "data-testid": "navbar-dropdown",
            className: "smart-navbar-dropdown animate-in fade-in slide-in-from-top-1 duration-150",
            onMouseEnter: () => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            },
            onMouseLeave: handleMouseLeave,
            children: /* @__PURE__ */ jsxs("div", { className: cn(
              "max-w-[1600px] mx-auto p-6 flex",
              activeMenu === "theme" || activeMenu === "language" || activeMenu === "user" ? "justify-end" : "justify-start"
            ), children: [
              activeMenu === "navigation" && links && /* @__PURE__ */ jsx(
                SmartNavbarNavMenu,
                {
                  links,
                  transformHref
                }
              ),
              activeMenu === "theme" && /* @__PURE__ */ jsx(
                SmartNavbarThemeMenu,
                {
                  currentTheme,
                  setTheme,
                  t
                }
              ),
              activeMenu === "language" && onLocaleChange && /* @__PURE__ */ jsx(
                SmartNavbarLanguageMenu,
                {
                  locale,
                  onLocaleChange,
                  onClose: closeMenus
                }
              ),
              activeMenu === "user" && user && /* @__PURE__ */ jsx(
                SmartNavbarUserMenu,
                {
                  user,
                  userInitial,
                  t,
                  onLogout,
                  transformHref,
                  onClose: closeMenus
                }
              ),
              activeMenu === "search" && /* @__PURE__ */ jsx(
                SmartNavbarSearchMenu,
                {
                  locale,
                  onSearchTrigger,
                  onClose: closeMenus
                }
              ),
              activeMenu === "tenant" && tenantSelectorSlot && /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx(SlotErrorBoundary, { children: React7.isValidElement(tenantSelectorSlot) ? React7.cloneElement(tenantSelectorSlot, {
                variant: "content",
                isOpen: true
              }) : tenantSelectorSlot }) })
            ] })
          }
        )
      ]
    }
  ) });
}

// src/navigation/buildSidebarLinks.ts
function buildSidebarLinks(configs, role, isLoggedIn = false) {
  const roleUpper = role?.toUpperCase() ?? "";
  return configs.filter((link) => {
    if (link.requiresSuperAdmin) return roleUpper === "SUPER_ADMIN";
    if (link.requiresAdmin) return roleUpper === "ADMIN" || roleUpper === "PROFESSOR" || roleUpper === "SUPER_ADMIN";
    if (link.requiresAuth) return isLoggedIn;
    return true;
  });
}
function useConfirmDialog(options) {
  const { onConfirm } = options;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const trigger = useCallback((d) => {
    setData(d !== void 0 ? d : null);
    setOpen(true);
  }, []);
  const cancel = useCallback(() => {
    setOpen(false);
    setIsLoading(false);
    setData(null);
  }, []);
  const confirm = useCallback(async () => {
    setIsLoading(true);
    try {
      await onConfirm(data);
    } catch {
    } finally {
      setIsLoading(false);
      setOpen(false);
      setData(null);
    }
  }, [data, onConfirm]);
  return { open, isLoading, data, trigger, confirm, cancel };
}

// src/constants.ts
var ANIM_DURATION = 200;
var variantStyles = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-500",
    confirmBg: "bg-red-500/10",
    confirmBorder: "border-red-500/40",
    confirmHover: "hover:bg-red-500/20 hover:border-red-500",
    confirmText: "text-red-500"
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    confirmBg: "bg-amber-500/10",
    confirmBorder: "border-amber-500/40",
    confirmHover: "hover:bg-amber-500/20 hover:border-amber-500",
    confirmText: "text-amber-500"
  },
  info: {
    icon: Info,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    confirmBg: "bg-primary/10",
    confirmBorder: "border-primary/40",
    confirmHover: "hover:bg-primary/20 hover:border-primary",
    confirmText: "text-primary"
  }
};
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  isLoading = false,
  onConfirm,
  onCancel
}) {
  const cancelRef = useRef(null);
  const confirmRef = useRef(null);
  const closeTimerRef = useRef(null);
  const prevOpenRef = useRef(open);
  const [mounted, setMounted] = useState(open);
  useEffect(() => {
    if (open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setMounted(true);
    } else if (prevOpenRef.current) {
      closeTimerRef.current = setTimeout(() => {
        setMounted(false);
      }, ANIM_DURATION);
    }
    prevOpenRef.current = open;
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [open]);
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && !isLoading) {
        onCancel();
      }
    },
    [onCancel, isLoading]
  );
  if (!mounted) return null;
  const styles = variantStyles[variant];
  const IconComponent = styles.icon;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-[60] flex items-center justify-center",
      role: "alertdialog",
      "aria-modal": "true",
      "aria-label": title,
      onKeyDown: handleKeyDown,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute inset-0 bg-black/70 backdrop-blur-sm",
              open ? "animate-in fade-in duration-200" : "animate-out fade-out duration-150"
            ),
            onClick: isLoading ? void 0 : onCancel,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "relative w-full max-w-sm bg-card border border-border shadow-2xl p-6",
              open ? "animate-in fade-in zoom-in-95 duration-200" : "animate-out fade-out zoom-out-95 duration-150"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  disabled: isLoading,
                  "aria-label": cancelLabel,
                  className: "absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsx(X, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsx("div", { className: cn("p-3 border border-border", styles.iconBg), children: /* @__PURE__ */ jsx(IconComponent, { size: 22, className: styles.iconColor }) }),
                /* @__PURE__ */ jsx("h2", { className: "text-sm font-black uppercase tracking-wider text-foreground", children: title }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed max-w-xs", children: message })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    ref: cancelRef,
                    type: "button",
                    onClick: onCancel,
                    disabled: isLoading,
                    className: cn(
                      "px-4 py-2.5 bg-transparent text-muted-foreground border border-border",
                      "hover:border-muted-foreground/40 hover:bg-white/[0.02]",
                      "font-mono text-[10px] font-bold uppercase tracking-wider",
                      "transition-all duration-200 rounded-none active:scale-[0.98]",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    ),
                    children: cancelLabel
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    ref: confirmRef,
                    type: "button",
                    onClick: onConfirm,
                    disabled: isLoading,
                    className: cn(
                      "px-4 py-2.5 font-mono text-[10px] font-black uppercase tracking-wider",
                      "border transition-all duration-200 rounded-none active:scale-[0.98]",
                      "disabled:opacity-50 disabled:cursor-not-allowed",
                      styles.confirmBg,
                      styles.confirmBorder,
                      styles.confirmHover,
                      styles.confirmText
                    ),
                    children: isLoading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Loader2, { size: 12, className: "animate-spin" }),
                      confirmLabel
                    ] }) : confirmLabel
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function SystemSettings({
  locale,
  onLocaleChange,
  locales = ["es", "en"],
  theme,
  onThemeChange,
  isAuthenticated = false,
  onLogin,
  onLogout,
  logoutUrl = "/api/auth/logout",
  signinUrl = "/api/auth/signin",
  showLogin = true,
  versionSignature = "ABD_SYSTEM_V1.0"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const [internalTheme, setInternalTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const match = document.cookie.match(/(?:^|; )abd_theme=([^;]*)/);
      if (match && match[1]) {
        return match[1];
      }
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });
  useEffect(() => {
    setMounted(true);
  }, []);
  useClickOutside(containerRef, () => setIsOpen(false));
  const t = (key, opts) => opts?.defaultMessage || key;
  if (!mounted) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": "Loading Settings",
        disabled: true,
        className: "p-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md opacity-60 cursor-not-allowed",
        children: /* @__PURE__ */ jsx(Settings, { size: 18, className: "text-muted-foreground animate-pulse" })
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative inline-block text-left z-[55]", ref: containerRef, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": "Open Settings",
        onClick: () => setIsOpen(!isOpen),
        className: cn(
          "p-2.5 rounded-none border border-border bg-background/80 backdrop-blur-md hover:bg-muted transition-all active:scale-90 cursor-pointer shadow-lg",
          isOpen && "bg-muted ring-1 ring-primary/20 border-primary/30"
        ),
        children: /* @__PURE__ */ jsx(
          Settings,
          {
            size: 18,
            className: cn(
              "text-foreground transition-transform duration-500",
              isOpen && "rotate-90 text-primary"
            )
          }
        )
      }
    ),
    isOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "absolute right-0 mt-3 w-64 bg-background/95 border border-border backdrop-blur-md z-[100] overflow-hidden rounded-none shadow-2xl p-4 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 ease-out",
        role: "region",
        "aria-label": "System Settings Menu",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 pb-2 border-b border-border", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic", children: t("system_settings_title", { defaultMessage: "CONFIGURACI\xD3N DEL SISTEMA" }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                "aria-label": t("system_settings_close", { defaultMessage: "Cerrar" }),
                onClick: () => setIsOpen(false),
                className: "p-1 hover:bg-muted rounded-none transition-colors text-muted-foreground hover:text-foreground cursor-pointer",
                children: /* @__PURE__ */ jsx(X, { size: 14 })
              }
            )
          ] }),
          (isAuthenticated || showLogin) && /* @__PURE__ */ jsx("div", { className: "mt-6 pt-4 border-t border-border", children: isAuthenticated ? onLogout ? /* @__PURE__ */ jsxs(
            "button",
            {
              "aria-label": t("system_settings_logout", { defaultMessage: "TERMINAR SESI\xD3N" }),
              onClick: onLogout,
              className: "w-full flex items-center gap-3 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none",
              children: [
                /* @__PURE__ */ jsx(LogOut, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: t("system_settings_logout", { defaultMessage: "TERMINAR SESI\xD3N" }) })
              ]
            }
          ) : /* @__PURE__ */ jsxs(
            "a",
            {
              href: logoutUrl,
              className: "w-full flex items-center gap-3 px-3 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none",
              children: [
                /* @__PURE__ */ jsx(LogOut, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: t("system_settings_logout", { defaultMessage: "TERMINAR SESI\xD3N" }) })
              ]
            }
          ) : onLogin ? /* @__PURE__ */ jsxs(
            "button",
            {
              "aria-label": t("system_settings_login", { defaultMessage: "INICIAR SESI\xD3N" }),
              onClick: onLogin,
              className: "w-full flex items-center gap-3 px-3 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none",
              children: [
                /* @__PURE__ */ jsx(LogIn, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: t("system_settings_login", { defaultMessage: "INICIAR SESI\xD3N" }) })
              ]
            }
          ) : /* @__PURE__ */ jsxs(
            "a",
            {
              href: signinUrl,
              className: "w-full flex items-center gap-3 px-3 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200 text-[10px] font-bold uppercase cursor-pointer rounded-none",
              children: [
                /* @__PURE__ */ jsx(LogIn, { size: 14 }),
                /* @__PURE__ */ jsx("span", { children: t("system_settings_login", { defaultMessage: "INICIAR SESI\xD3N" }) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-[8px] font-mono uppercase tracking-[0.3em] text-muted-foreground/30", children: versionSignature }) })
        ]
      }
    )
  ] });
}

// src/utils/featureFlags.ts
var _flags = {
  liveModeEnabled: true
};
var featureFlags = _flags;
function configureFeatureFlags(overrides) {
  Object.assign(_flags, overrides);
}
function useLivePolling({ tenantId, pollInterval = 5e3 }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLogIds, setNewLogIds] = useState(/* @__PURE__ */ new Set());
  const [isLive, setIsLive] = useState(true);
  const [lastFetched, setLastFetched] = useState(null);
  const knownIdsRef = useRef(/* @__PURE__ */ new Set());
  const isLiveRef = useRef(isLive);
  useEffect(() => {
    isLiveRef.current = isLive;
  }, [isLive]);
  const fetchLogs = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const res = await fetch(`/api/admin/audit?tenantId=${tenantId}&limit=50`, {
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      if (!isInitial && knownIdsRef.current.size > 0) {
        const incoming = /* @__PURE__ */ new Set();
        data.forEach((log) => {
          if (log._id && !knownIdsRef.current.has(log._id)) {
            incoming.add(log._id);
          }
        });
        if (incoming.size > 0) {
          setNewLogIds((prev) => /* @__PURE__ */ new Set([...prev, ...incoming]));
          setTimeout(() => {
            setNewLogIds((prev) => {
              const next = new Set(prev);
              incoming.forEach((id) => next.delete(id));
              return next;
            });
          }, 2500);
        }
      }
      knownIdsRef.current = new Set(data.map((l) => l._id).filter(Boolean));
      setLogs(data);
      setLastFetched(/* @__PURE__ */ new Date());
    } catch (err) {
      console.error(err);
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [tenantId]);
  useEffect(() => {
    fetchLogs(true);
  }, [fetchLogs]);
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      if (isLiveRef.current) fetchLogs(false);
    }, pollInterval);
    return () => clearInterval(interval);
  }, [isLive, pollInterval, fetchLogs]);
  const toggleLive = () => setIsLive((prev) => !prev);
  return { logs, loading, newLogIds, isLive, toggleLive, lastFetched };
}
function ActionBadge({ action }) {
  const t = (key, opts) => opts?.defaultMessage || key;
  switch (action) {
    case "CREATE_SPACE":
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20", children: [
        /* @__PURE__ */ jsx(Layers, { className: "w-3 h-3" }),
        t("audit_action_create_space", { defaultMessage: "Creaci\xF3n Espacio" })
      ] });
    case "UPDATE_SPACE":
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20", children: [
        /* @__PURE__ */ jsx(Layers, { className: "w-3 h-3" }),
        t("audit_action_update_space", { defaultMessage: "Edici\xF3n Espacio" })
      ] });
    case "MOVE_SPACE":
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20", children: [
        /* @__PURE__ */ jsx(Activity, { className: "w-3 h-3" }),
        t("audit_action_move_space", { defaultMessage: "Traslado Espacio" })
      ] });
    case "HERITAGE_VISIBILITY":
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20", children: [
        /* @__PURE__ */ jsx(Shield, { className: "w-3 h-3" }),
        t("audit_action_heritage_visibility", { defaultMessage: "Herencia Permisos" })
      ] });
    case "UPDATE_BRANDING":
      return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20", children: [
        /* @__PURE__ */ jsx(Settings, { className: "w-3 h-3" }),
        t("audit_action_update_branding", { defaultMessage: "Marca Blanca" })
      ] });
    default:
      return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-secondary text-muted-foreground border border-border", children: action });
  }
}
function AuditDeltaViewer({ log }) {
  const t = (key, opts) => opts?.defaultMessage || key;
  const changes = log.changedFields || {};
  const previous = log.previousState || {};
  const formatValue = (val) => {
    if (val === null || val === void 0) return "null";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-3 p-4 rounded-lg bg-secondary/15 border border-border font-mono text-xs text-foreground/90 max-h-72 overflow-y-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 border-b border-border pb-2 text-[10px] uppercase tracking-wider text-primary font-bold", children: [
      /* @__PURE__ */ jsx(FileCode, { className: "w-3.5 h-3.5 text-primary" }),
      t("audit_delta_title", { defaultMessage: "Comparaci\xF3n de Estados (Delta)" })
    ] }),
    Object.keys(changes).length === 0 ? /* @__PURE__ */ jsx("span", { className: "text-muted-foreground italic", children: t("audit_no_details", { defaultMessage: "No hay detalles adicionales." }) }) : Object.keys(changes).map((key) => {
      if (key === "updatedAt" || key === "createdAt" || key === "_id") return null;
      const prevValue = previous[key];
      const newValue = changes[key];
      return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-border/10 last:border-b-0 items-start", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-bold text-primary flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Tag, { className: "w-3.5 h-3.5 opacity-60 text-primary" }),
          key
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 grid gap-1.5", children: [
          prevValue !== void 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-rose-500 bg-rose-500/5 px-2.5 py-0.5 rounded border border-rose-500/10 w-fit", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[9px] uppercase font-semibold tracking-wider opacity-60", children: t("audit_previous", { defaultMessage: "Previo:" }) }),
            /* @__PURE__ */ jsx("span", { className: "break-all font-bold", children: formatValue(prevValue) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-emerald-500 bg-emerald-500/5 px-2.5 py-0.5 rounded border border-emerald-500/10 w-fit", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[9px] uppercase font-semibold tracking-wider opacity-60", children: t("audit_new", { defaultMessage: "Nuevo:" }) }),
            /* @__PURE__ */ jsx("span", { className: "break-all font-bold", children: formatValue(newValue) })
          ] })
        ] })
      ] }, key);
    })
  ] });
}
function LiveLogViewer({ tenantId, liveModeEnabled }) {
  const t = (key, opts) => opts?.defaultMessage || key;
  const { logs, loading, newLogIds, isLive, toggleLive, lastFetched } = useLivePolling({ tenantId });
  const isLiveMode = liveModeEnabled ?? featureFlags.liveModeEnabled;
  if (!isLiveMode) {
    return /* @__PURE__ */ jsx("div", { className: "p-4 text-sm text-muted-foreground", children: "Live telemetry is disabled." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: toggleLive,
          className: `flex items-center gap-1 px-3 py-1 rounded text-sm font-bold ${isLive ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-zinc-700/20 border-zinc-600/30 text-zinc-500"}`,
          children: [
            isLive ? /* @__PURE__ */ jsx(Wifi, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(WifiOff, { className: "w-4 h-4" }),
            isLive ? t("live_on", { defaultMessage: "Live ON" }) : t("live_off", { defaultMessage: "Live OFF" })
          ]
        }
      ),
      lastFetched && /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
        t("synced_at", { defaultMessage: "Sync:" }),
        " ",
        lastFetched.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "p-4", children: t("loading", { defaultMessage: "Loading..." }) }) : /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: logs.map((log) => {
      const isNew = log._id && newLogIds.has(log._id);
      const logDate = log.createdAt ? new Date(log.createdAt) : null;
      const timeStr = logDate ? logDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "";
      const dateStr = logDate ? logDate.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" }) : "";
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `p-3 rounded border transition-colors ${isNew ? "bg-emerald-100 animate-pulse" : "bg-card border-border hover:bg-secondary/10"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(ActionBadge, { action: log.action }),
                /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs bg-background border border-border px-2 py-0.5 rounded", children: [
                  "ID: ",
                  log._id?.slice(-6) ?? "------"
                ] }),
                log.appId && /* @__PURE__ */ jsx("span", { className: "font-mono text-xs uppercase bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded", children: log.appId })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                dateStr,
                " ",
                timeStr
              ] })
            ] }),
            /* @__PURE__ */ jsx(AuditDeltaViewer, { log })
          ]
        },
        log._id
      );
    }) })
  ] });
}
function AuditHistoryModal({
  isOpen,
  onClose,
  tenantId,
  entityType,
  entityId,
  entityName,
  translations
}) {
  const [activeTab, setActiveTab] = useState("history");
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setActiveTab("history");
      setLoading(false);
      return;
    }
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/audit?tenantId=${tenantId}&entityType=${entityType}&entityId=${entityId}&limit=100`);
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        }
      } catch (err) {
        console.error("Failed to fetch audit history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [isOpen, tenantId, entityType, entityId]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200", children: /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col w-full max-w-4xl max-h-[85vh] bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-border bg-muted/30", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "p-2 rounded border border-border bg-background text-primary", children: /* @__PURE__ */ jsx(Activity, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold uppercase tracking-widest text-foreground", children: translations?.title || "Historial de Auditor\xEDa" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: entityName ? `${entityName} (${entityId})` : entityId })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded border border-transparent hover:border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer",
          children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 px-4 border-b border-border bg-background", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveTab("history"),
          className: cn(
            "flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
            activeTab === "history" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          ),
          children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
            translations?.tabHistory || "Registro de Eventos"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setActiveTab("stats"),
          className: cn(
            "flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer",
            activeTab === "stats" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          ),
          children: [
            /* @__PURE__ */ jsx(BarChart3, { className: "w-4 h-4" }),
            translations?.tabStats || "Estad\xEDsticas"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4 custom-scrollbar bg-secondary/5", children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-48 space-y-3", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin text-primary" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-muted-foreground uppercase tracking-widest", children: translations?.loading || "Cargando historial..." })
    ] }) : activeTab === "history" ? logs.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-48 space-y-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Activity, { className: "w-8 h-8 opacity-20" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: translations?.emptyEvents || "No hay eventos registrados" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: logs.map((log) => /* @__PURE__ */ jsxs("div", { className: "p-3 rounded border border-border bg-card flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ActionBadge, { action: log.action }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded", children: log.appId })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: log.createdAt ? new Date(log.createdAt).toLocaleString() : "" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-foreground/80 font-medium", children: log.userEmail }),
      log.changedFields && /* @__PURE__ */ jsx("div", { className: "mt-2 p-2 bg-muted/20 border border-border/50 rounded font-mono text-[9px] text-muted-foreground overflow-x-auto", children: /* @__PURE__ */ jsx("pre", { children: JSON.stringify(log.changedFields, null, 2) }) })
    ] }, log._id)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-48 space-y-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsx(BarChart3, { className: "w-8 h-8 opacity-20" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: translations?.underConstruction || "Gr\xE1ficos en construcci\xF3n" })
    ] }) })
  ] }) });
}

export { ANIM_DURATION, ActionBadge, AuditDeltaViewer, AuditHistoryModal, CommandPalette, ConfirmDialog, GlobalFooter, GlobalNavbar, IndustrialTopBar, LiveLogViewer, SmartNavbar, SystemSettings, TenantSelector, UserIdentity, buildSidebarLinks, cn, configureFeatureFlags, featureFlags, useConfirmDialog };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map