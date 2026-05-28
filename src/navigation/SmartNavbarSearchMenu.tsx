'use client';

import { Search } from 'lucide-react';

interface SmartNavbarSearchMenuProps {
  locale: string;
  onSearchTrigger: (() => void) | undefined;
  onClose: () => void;
}

/**
 * Renders the search/command mega menu with a trigger button.
 */
export function SmartNavbarSearchMenu({ locale, onSearchTrigger, onClose }: SmartNavbarSearchMenuProps) {
  return (
    <div className="w-full flex justify-center py-2">
      <button
        data-testid="navbar-mega-search-trigger"
        onClick={() => {
          onSearchTrigger?.();
          onClose();
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
  );
}
