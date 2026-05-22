# `@abd/ecosystem-widgets`

Este paquete contiene componentes React con **lógica de negocio (smart components)** centralizada para el ecosistema ABD. A diferencia de `@abd/styles` que es puramente presentacional, estos widgets manejan estados, contextos (next-intl, themes), peticiones a APIs internas y lógica interactiva avanzada.

## Dominios de Widgets

1. **Identity (`src/identity/`)**
   - `TenantSelector`: Dropdown para cambiar de organización/grupo.
   - `UserIdentity`: Widget de perfil con avatar y rol de usuario.

2. **Audit (`src/audit/`)**
   - `LiveLogViewer`: Consola de logs en tiempo real (SSE/Polling).
   - `AuditHistoryModal`: Historial detallado de cambios de una entidad.
   - `ActionBadge`: Píldora de estado semántica.
   - `AuditDeltaViewer`: Comparador de deltas JSON.

3. **Navigation (`src/navigation/`)**
   - `CommandPalette`: Paleta de comandos (Ctrl+K) con búsqueda fuzzy.

4. **Settings (`src/settings/`)**
   - `SystemSettings`: Preferencias de sistema, temas e idioma.

## Uso

```tsx
import { CommandPalette, SystemSettings } from '@abd/ecosystem-widgets';

// Los componentes están optimizados para el App Router de Next.js
export default function Layout() {
  return (
    <>
      <SystemSettings locale="es" onLocaleChange={setLocale} />
      <CommandPalette commands={[]} />
    </>
  );
}
```

## Arquitectura
Para mantener la limpieza arquitectónica, los componentes de negocio (Widgets) se empaquetan y versionan independientemente de los tokens de estilo (`@abd/styles`). Todos los widgets están protegidos con `'use client'` para garantizar compatibilidad con RSC.
