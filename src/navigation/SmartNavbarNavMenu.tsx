'use client';

import { memo } from 'react';
import { LocalizedLink } from './LocalizedLink.js';
import type { SidebarLink } from './GlobalNavbar.js';

interface SmartNavbarNavMenuProps {
  links: SidebarLink[];
  transformHref: (href: string) => string;
}

/**
 * Renders the navigation mega menu showing quick-access links.
 */
export const SmartNavbarNavMenu = memo(function SmartNavbarNavMenu({ links, transformHref }: SmartNavbarNavMenuProps) {
  return (
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
  );
});
