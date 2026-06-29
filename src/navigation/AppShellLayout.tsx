import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';
import * as NextTopLoaderModule from 'nextjs-toploader';
import { Toaster } from 'sonner';

const NextTopLoader = NextTopLoaderModule.default;

interface AppShellLayoutProps {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
  brandingStyles?: React.ReactNode;
  sidebarNavigation?: React.ReactNode;
  commandPalette?: React.ReactNode;
  eventBusBridge?: React.ReactNode;
}

export function AppShellLayout({
  children,
  messages,
  locale,
  brandingStyles,
  sidebarNavigation,
  commandPalette,
  eventBusBridge,
}: AppShellLayoutProps) {
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {brandingStyles}
      <NextTopLoader
        color="hsl(var(--primary))"
        height={2}
        showSpinner={false}
        zIndex={45}
        speed={200}
      />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 transition-colors duration-300">
        {sidebarNavigation}
        {commandPalette}
        {eventBusBridge}
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </div>
    </NextIntlClientProvider>
  );
}
