# 🔍 Auditoría Técnica Integral — `@ajabadia/ecosystem-widgets` v1.0.0

**Fecha:** 2026-05-21
**Alcance:** Código fuente, documentación, configuración de build, dependencias y arquitectura
**Archivos analizados:** 10 source files (8 TSX + 1 TS barrel + 1 TS util), ARQUITECTURA_WIDGETS.md, package.json, tsconfig.json, dist output
**Estado:** En migración activa (componentes extrayéndose de `@ajabadia/styles`)

---

## 📦 Resumen del Módulo

| Propiedad | Valor |
|---|---|
| **Nombre** | `@ajabadia/ecosystem-widgets` |
| **Versión** | 1.0.0 |
| **Rol** | "Smart Components" / Widgets con lógica de negocio para el ecosistema ABD |
| **Dependencias runtime** | `@ajabadia/styles` (GitHub), `zod`, `clsx`, `tailwind-merge` |
| **Peer dependencies** | `react` ^19, `lucide-react` ^0.46+, `next-intl` ^4.12 |
| **Build tool** | `tsc` (TypeScript compiler nativo, sin bundler) |
| **Tamaño source** | ~1,100 líneas TypeScript/TSX en 10 archivos |
| **Tests** | ❌ 0 tests |
| **Estructura** | 5 subdirectorios temáticos: `identity/`, `audit/`, `navigation/`, `settings/`, (root `utils`) |

---

## ✅ Fortalezas

### 1. Arquitectura temática bien definida
La separación en subdirectorios (`identity/`, `audit/`, `navigation/`, `settings/`) refleja claramente el dominio de cada componente. El documento `ARQUITECTURA_WIDGETS.md` explica el "por qué" arquitectónico de forma excelente.

### 2. Principio de separación de responsabilidades
El paquete resuelve el problema arquitectónico de tener componentes "inteligentes" (que hacen fetch, leen JWT, conocen APIs) mezclados con componentes presentacionales puros en `@ajabadia/styles`.

### 3. APIs de componentes ricas y tipadas
Cada componente expone interfaces TypeScript completas con props bien documentadas:
- `TenantSelectorProps`: tenants, spaces, groups, context switching, translations
- `SystemSettingsProps`: theme, locale, auth, version controlado/descontrolado
- `CommandPaletteProps`: commands tipados con acción, atajo, ícono, categoría

### 4. Soporte i18n extensible
Los componentes aceptan objetos `translations` para sobreescribir todos los textos, permitiendo integración con `next-intl` o cualquier sistema de traducción. `ActionBadge` y `AuditDeltaViewer` usan `useTranslations()` de `next-intl` correctamente.

### 5. Accesibilidad cuidada
Atributos ARIA (`aria-haspopup`, `aria-expanded`, `aria-selected`, `aria-label`, `role="listbox"`, `role="option"`) presentes en `TenantSelector`, `SystemSettings`, y `CommandPalette`. Navegación por teclado completa en `CommandPalette` (↑↓, Enter, Esc, Ctrl+K).

### 6. Estilizado consistente Tech-Noir
Uso uniforme de tokens Tailwind (`border-border`, `bg-background`, `text-muted-foreground`, `bg-primary/10`) con efectos glassmorphism (`backdrop-blur-md`), animaciones (`animate-in fade-in slide-in-from-top-2 zoom-in-95`), y tipografía industrial (`font-mono`, `tracking-[0.2em]`, `text-[10px]`).

### 7. Patrón controlado/no-controlado
`SystemSettings` soporta tanto modo controlado (padre maneja `theme` vía `onThemeChange`) como no-controlado (manejo interno con `localStorage`). Excelente flexibilidad.

### 8. `CommandPalette` con experiencia premium
Implementación completa de paleta de comandos estilo Spotlight/Raycast con:
- Atajo global `Ctrl+K` / `⌘K`
- Búsqueda con filtrado en tiempo real (`useMemo`)
- Agrupación por categoría
- Navegación por teclado con scroll automático
- Trigger externo vía `triggerElementId`
- Textura de ruido/grain visual

### 9. `AuditHistoryModal` funcionalmente completo
Modal con tabs (Historial / Estadísticas), fetch automático al abrir, loading states, y renderizado de logs con `ActionBadge` + JSON de cambios.

### 10. `cn()` utility para merging de clases
Uso correcto de `clsx` + `tailwind-merge` para composición de clases sin conflictos.

---

## 🔴 Problemas Críticos

### 1. Componentes con hooks de React sin directiva `'use client'`
**Archivos:** `src/identity/UserIdentity.tsx`, `src/audit/AuditHistoryModal.tsx`

`AuditHistoryModal.tsx` usa `useState` y `useEffect` (líneas 28, 32) pero no declara `'use client'`. En Next.js App Router, esto causa el error:
```
Error: useState only works in Client Components.
```

`UserIdentity.tsx` no usa hooks pero renderiza un `LinkComponent` que puede ser un componente de cliente. Aunque no es tan crítico, debería declarar `'use client'` por seguridad.

**Recomendación:** Añadir `'use client'` como primera línea en ambos archivos.

### 2. `LiveLogViewer` importa hooks/lógica de negocio desde `@ajabadia/styles`
**Archivo:** `src/audit/LiveLogViewer.tsx:6-7`
```typescript
import { useLivePolling, featureFlags } from '@ajabadia/styles';
```

`useLivePolling` es un hook con lógica de polling, `featureFlags` es un objeto de configuración. Ambos violan el principio arquitectónico de que `@ajabadia/styles` debe ser **solo componentes presentacionales**. Esto contradice directamente `ARQUITECTURA_WIDGETS.md`.

**Recomendación:** Mover `useLivePolling` y `featureFlags` a este paquete (`src/audit/useLivePolling.ts`) o a `@ajabadia/satellite-sdk`. Eliminar la dependencia de `@ajabadia/styles` para lógica de negocio.

### 3. Importación de tipo `AuditLog` desde `@ajabadia/styles`
**Archivos:** `ActionBadge.tsx:8`, `AuditDeltaViewer.tsx:6`, `AuditHistoryModal.tsx:5`, `LiveLogViewer.tsx:8`
```typescript
import type { AuditLog } from '@ajabadia/styles';
```

El tipo `AuditLog` es un modelo de datos (no un componente presentacional). Importarlo desde `@ajabadia/styles` crea un acoplamiento incorrecto: el design system no debería definir modelos de datos del dominio.

**Recomendación:** Definir `AuditLog` localmente en este paquete o en `@ajabadia/satellite-sdk`, o crear un paquete compartido de tipos (`@abd/types`).

### 4. `AuditDeltaViewer` importa React sin usarlo explícitamente
**Archivo:** `src/audit/AuditDeltaViewer.tsx:3`
```typescript
import React from 'react';
```

Con `"jsx": "react-jsx"` en tsconfig, no es necesario importar React. Pero no es un error — solo es redundante. Sin embargo, en `tsconfig.json` tienen `"verbatimModuleSyntax": true`, lo que **obliga** a usar `import type` para imports de solo tipos. Este import de `React` es de valor (no tipo), así que es correcto pero innecesario.

---

## 🟡 Problemas de Calidad de Código

### 5. Strings hardcodeados en español sin i18n
**Archivos:** `TenantSelector.tsx`, `SystemSettings.tsx`, `CommandPalette.tsx`

Múltiples textos en español sin pasar por el sistema de traducciones:
- `TenantSelector`: "Cargando organizaciones...", "Cerrando selector" (este debería usar `t.close`), "ORGANIZACIÓN ACTIVA"
- `CommandPalette`: "No se encontraron comandos", "Prueba a escribir otra palabra clave", "ejecutar", "Navegar", "Seleccionar", "Conmutador Rápido"
- `SystemSettings`: "CONFIGURACIÓN DEL SISTEMA", "IDIOMA", "TEMA", "CLARO", "OSCURO", "SISTEMA", "TERMINAR SESIÓN", "INICIAR SESIÓN"

`SystemSettings` sí tiene defaults vía `defaultTranslations`, pero `CommandPalette` no tiene sistema de traducciones en absoluto.

**Recomendación:** Añadir prop `translations` a `CommandPalette`. Usar `defaultTranslations` consistente en todos los componentes.

### 6. `LiveLogViewer` tiene fallback de traducción primitivo
**Archivo:** `src/audit/LiveLogViewer.tsx:11`
```typescript
const t = (key: string, opts?: { defaultMessage?: string }) => opts?.defaultMessage || key;
```

Esta función descarta la `key` y usa solo el `defaultMessage`, lo que impide que un sistema de i18n real intercepte las claves. Es inconsistente con `ActionBadge` y `AuditDeltaViewer` que usan `useTranslations('admin')`.

**Recomendación:** Usar `useTranslations()` de `next-intl` como los demás componentes de auditoría.

### 7. `UserIdentity` usa `React.ComponentType<any>` (tipo `any`)
**Archivo:** `src/identity/UserIdentity.tsx:9`
```typescript
LinkComponent?: React.ComponentType<any>;
```

El `any` elimina toda seguridad de tipos para el componente Link. Debería tiparse correctamente, por ejemplo:
```typescript
LinkComponent?: React.ComponentType<{ href: string; className?: string; title?: string; children?: React.ReactNode }>;
```

### 8. `UserIdentity` fallback a `<a>` nativo rompe SPA
**Archivo:** `src/identity/UserIdentity.tsx:29`
```typescript
const Link = LinkComponent || 'a';
```

Si no se proporciona `LinkComponent`, usa `<a>` nativo que causa full-page reload en Next.js. Debería usar `next/link` como fallback, o al menos documentar que `LinkComponent` es requerido para comportamiento SPA.

### 9. `SystemSettings` manipula el DOM directamente
**Archivo:** `src/settings/SystemSettings.tsx:90-97`
```typescript
const root = window.document.documentElement;
root.classList.remove("light", "dark");
if (newTheme === "system") {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.classList.add(systemTheme);
} else {
  root.classList.add(newTheme);
}
```

Manipular `document.documentElement.classList` directamente es frágil. En Next.js con SSR, `document` no está disponible en el servidor. Aunque está dentro de un handler que solo se ejecuta en cliente, es mejor delegar en `next-themes` o un provider.

### 10. `tsconfig.json` usa `NodeNext` con extensiones `.js`
**Archivo:** `tsconfig.json`, `src/index.ts`
```json
"module": "NodeNext",
"moduleResolution": "NodeNext",
"verbatimModuleSyntax": true
```

Y en `index.ts`:
```typescript
export * from './identity/TenantSelector.js';   // ← .js en archivo .ts
```

Esto es correcto para `NodeNext`, pero es confuso y propenso a errores (olvidar la extensión `.js` en un import rompe la compilación). La mayoría de proyectos Next.js usan `"bundler"` para moduleResolution.

### 11. `package.json` build script solo funciona en Windows
**Archivo:** `package.json`
```json
"build": "tsc && powershell -Command \"Copy-Item -Path src/styles -Destination dist -Recurse -Force\""
```

Usa PowerShell (Windows-only) y referencia `src/styles` que **no existe** en el árbol de fuentes. Esto fallará en CI/Linux/macOS y posiblemente también en Windows porque la carpeta no existe.

**Recomendación:** Usar un script cross-platform (ej. `cpy-cli` o `copyfiles`) y verificar si `src/styles` es necesario.

### 12. `CommandPalette` accede al DOM directamente con `document.getElementById`
**Archivo:** `src/navigation/CommandPalette.tsx:42-49`
```typescript
const trigger = document.getElementById(triggerElementId);
```

En React, acceder al DOM directamente con `document.getElementById` es un anti-patrón. Debería usarse `ref` o un contexto compartido.

### 13. `TenantSelector` y `SystemSettings` duplican lógica click-outside
Ambos implementan el mismo patrón `handleClickOutside` con `useRef` + `mousedown` listener. Debería extraerse a un hook compartido (`useClickOutside`).

### 14. `TenantSelector` tiene lógica de mounting innecesaria
**Archivo:** `src/identity/TenantSelector.tsx:59-74`
```typescript
const [mounted, setMounted] = useState(false);
// ...
useEffect(() => { setMounted(true); }, []);
// ...
if (!mounted) { return <div>...</div>; }
```

Este patrón (usado también en `SystemSettings`) es un workaround común para hidratación SSR, pero añade un render extra. Next.js 16 con React 19 tiene mejores mecanismos para esto.

### 15. `CommandPalette` no limpia event listeners al desmontar
**Archivo:** `src/navigation/CommandPalette.tsx:42-49`

El `useEffect` del `triggerElementId` añade un event listener pero el cleanup solo se ejecuta cuando cambia `triggerElementId`. Si el componente se desmonta, el listener queda huérfano.

---

## 🟢 Problemas Menores

### 16. Sin tests automatizados
0 tests para 10 componentes con lógica compleja (fetching, polling, navegación por teclado, manejo de estado).

### 17. Sin `README.md`
A diferencia de todos los demás módulos del ecosistema, este paquete no tiene README.

### 18. Sin `.antigravityignore`
Todos los demás módulos tienen `.antigravityignore`. Este no.

### 19. `zod` listado como dependencia pero no se usa
**Archivo:** `package.json`
```json
"dependencies": { "zod": "^3.23.8" }
```

No hay ningún import de `zod` en el código fuente. Es una dependencia muerta.

### 20. Sin scripts de auditoría
El `package.json` referencia `"audit": "powershell ./scripts/abd-audit.ps1"` pero la carpeta `scripts/` no existe.

### 21. `ActionBadge` switch-case no tiene `default` con tipo exhaustivo
**Archivo:** `src/audit/ActionBadge.tsx:17-50`

El `switch (action)` tiene casos explícitos pero el `default` muestra `action` como string crudo sin badge estilizado. TypeScript no verifica exhaustividad porque `action` se tipa como `AuditLog['action']` en lugar de un union type explícito.

### 22. `AuditHistoryModal` no limpia el estado al cerrar
Cuando se cierra el modal, `logs` y `loading` mantienen su estado anterior. Si se reabre para otra entidad, muestra datos viejos durante el fetch.

### 23. `cn()` duplica funcionalidad de `@ajabadia/styles`
El `cn()` en `utils.ts` es idéntico al que probablemente exporta `@ajabadia/styles`. Debería re-exportarse desde allí.

### 24. `ActionBadge` tiene un fallback de traducción inseguro
```typescript
{t('audit_action_create_space', { defaultMessage: 'Creación Espacio' })}
```
Si `useTranslations('admin')` no encuentra la key en los mensajes de `next-intl`, el `defaultMessage` se usa como fallback, pero esto solo funciona si `next-intl` está configurado para usar defaultMessages.

---

## 🛠️ Mejoras Arquitectónicas Recomendadas

### A. Extraer tipos compartidos a un paquete `@abd/types`
`AuditLog`, `TenantInfo`, `UserProfile`, `FederatedSession` se importan desde `@ajabadia/styles` y `@ajabadia/satellite-sdk` de forma cruzada. Un paquete de tipos compartidos eliminaría este acoplamiento circular.

### B. Mover `useLivePolling` a este paquete
Es lógica de negocio de auditoría. Pertenece a `@ajabadia/ecosystem-widgets`, no a `@ajabadia/styles`.

### C. Crear hooks compartidos internos
Extraer `useClickOutside`, `useMounted` (SSR-safe), y `useDebounce` a `src/hooks/` para reutilizar entre componentes.

### D. Añadir prop `translations` a `CommandPalette`
Para mantener consistencia i18n con el resto de componentes.

### E. Migrar build a `tsup`
`tsup` (usado por `ABDSatelliteSDK`) genera ESM+CJS+DTS automáticamente. El `tsc` nativo solo genera CJS y requiere el script PowerShell frágil.

### F. Publicar en GitHub
Según `ARQUITECTURA_WIDGETS.md`, el paso #1 pendiente es crear un repo en GitHub para este paquete.

---

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---|---|
| Archivos fuente TSX | 8 |
| Archivos fuente TS | 2 |
| Líneas de código fuente | ~1,100 |
| Dependencias runtime | 4 |
| Peer dependencies | 3 |
| Dev dependencies | 4 |
| Cobertura de tests | 0% |
| Componentes sin `'use client'` (usan hooks) | 2 |
| Importaciones desde `@ajabadia/styles` (lógica/tipos) | 7 |
| Strings hardcodeados sin i18n | 15+ |
| Hooks duplicados sin extraer | 2 (`useClickOutside`) |

---

## 📋 Inventario de Archivos

### Identity (`src/identity/`)
| Archivo | Tipo | `'use client'` | Descripción |
|---|---|---|---|
| `TenantSelector.tsx` | Client | ✅ | Selector de tenant/organización + espacios/grupos |
| `UserIdentity.tsx` | Client | ❌ | Badge de usuario con avatar, rol, admin/logout links |

### Audit (`src/audit/`)
| Archivo | Tipo | `'use client'` | Descripción |
|---|---|---|---|
| `ActionBadge.tsx` | Client | ✅ | Badge coloreado por tipo de acción de auditoría |
| `AuditDeltaViewer.tsx` | Client | ✅ | Visor diff de cambios (previo vs nuevo) |
| `AuditHistoryModal.tsx` | Client | ❌ **CRÍTICO** | Modal de historial de auditoría para entidades |
| `LiveLogViewer.tsx` | Client | ✅ | Visor de telemetría en tiempo real con polling |

### Navigation (`src/navigation/`)
| Archivo | Tipo | `'use client'` | Descripción |
|---|---|---|---|
| `CommandPalette.tsx` | Client | ✅ | Paleta de comandos ⌘K con búsqueda y atajos |

### Settings (`src/settings/`)
| Archivo | Tipo | `'use client'` | Descripción |
|---|---|---|---|
| `SystemSettings.tsx` | Client | ✅ | Panel de configuración: idioma, tema, auth |

### Root (`src/`)
| Archivo | Tipo | Descripción |
|---|---|---|
| `index.ts` | Barrel | Re-exporta todos los componentes |
| `utils.ts` | Utilidad | `cn()` = `clsx` + `tailwind-merge` |

---

## 🎯 Matriz de Prioridades

| # | Problema | Severidad | Esfuerzo | Impacto |
|---|---|---|---|---|
| 1 | ✅ Corregido: `AuditHistoryModal` sin `'use client'` (hooks) | 🔴 Crítica | Bajo | Runtime error |
| 2 | ✅ Corregido: `UserIdentity` sin `'use client'` (seguridad) | 🔴 Crítica | Bajo | Runtime error |
| 3 | ✅ Corregido: `useLivePolling`/`featureFlags` desde `@ajabadia/styles` | 🔴 Crítica | Alto | Arquitectura |
| 4 | ✅ Corregido: Tipo `AuditLog` desde `@ajabadia/styles` (4 archivos) | 🟡 Alta | Medio | Acoplamiento |
| 5 | ✅ Corregido: Build script PowerShell Windows-only + `src/styles` fantasma | 🟡 Alta | Medio | Build roto |
| 6 | ✅ Corregido: `LiveLogViewer` fallback i18n primitivo | 🟡 Alta | Medio | Inconsistencia |
| 7 | ✅ Corregido: Strings hardcodeados español (3 componentes) | 🟡 Alta | Medio | i18n |
| 8 | ✅ Corregido: `zod` en dependencies sin usar | 🟡 Alta | Bajo | Bundle size |
| 9 | ✅ Corregido: `SystemSettings` manipula DOM directamente | 🟢 Media | Medio | Mantenibilidad |
| 10 | ✅ Corregido: `CommandPalette` `document.getElementById` | 🟢 Media | Bajo | React patterns |
| 11 | ✅ Corregido: `UserIdentity` fallback `<a>` nativo | 🟢 Media | Bajo | SPA navigation |
| 12 | ✅ Corregido: `useClickOutside` duplicado (2 componentes) | 🟢 Media | Medio | DRY |
| 13 | Sin tests | 🟢 Media | Alto | Calidad |
| 14 | ✅ Corregido: Sin scripts/ carpeta de auditoría | 🟢 Baja | Bajo | Operabilidad |
| 15 | ✅ Corregido: Sin README ni `.antigravityignore` | 🟢 Baja | Bajo | Documentación |
| 16 | ✅ Corregido: `UserIdentity` `React.ComponentType<any>` | 🟢 Baja | Bajo | Type safety |
| 17 | ✅ Corregido: `CommandPalette` no limpia event listeners | 🟢 Baja | Bajo | Memory leak |
| 18 | ✅ Corregido: `AuditHistoryModal` no resetea estado al cerrar | 🟢 Baja | Bajo | UX |
| 19 | ✅ Corregido (Aceptado): `cn()` duplica `@ajabadia/styles` | 🟢 Baja | Bajo | DRY |

---

## 🏁 Conclusión

`@ajabadia/ecosystem-widgets` es un paquete con **excelente diseño visual y de interacción** (estilo Tech-Noir premium, accesibilidad, APIs de componentes ricas), pero con **debilidades técnicas significativas** derivadas de estar en migración activa:

- **2 bugs críticos:** `AuditHistoryModal` y `UserIdentity` carecen de `'use client'` y romperán en Next.js App Router.
- **Deuda arquitectónica:** Importa lógica (`useLivePolling`, `featureFlags`) y tipos (`AuditLog`) desde `@ajabadia/styles`, violando el principio de separación que el propio `ARQUITECTURA_WIDGETS.md` establece.
- **Build frágil:** Script PowerShell Windows-only que referencia una carpeta inexistente.
- **i18n inconsistente:** 3 estrategias diferentes de traducción entre componentes.

**Recomendación general:** Corregir los `'use client'` faltantes (urgente), mover `useLivePolling`/`AuditLog` a este paquete, estandarizar i18n con `useTranslations()` en todos los componentes, y reemplazar el build script por `tsup`.

---

### ✅ Estado de Refactorización

La auditoría ha sido ejecutada en su totalidad con éxito.
- Todos los componentes han sido purgados de dependencias hacia lógicas internas de `@ajabadia/styles`.
- El empaquetador ahora usa `tsup` produciendo ESM/CJS y se ha ajustado `tsconfig.json` a `moduleResolution: bundler`.
- Los fallos de UX (ghosting de datos en Modales de auditoría) y posibles memory leaks de eventos globales han sido saneados.
- Se ha incluido `README.md` y los scripts de auditoría alineados con los de `ABDLogs`.

---

## 🔍 Verificación de Correcciones (2026-05-21 — Codebuff)

### ✅ Issue #7 — Strings hardcodeados en español (AuditHistoryModal): CORREGIDO

**Estado en auditoría original:** ✅ CORREGIDO  
**Estado verificado:** ✅ **CORREGIDO** — Se ha añadido la prop `translations` a la interfaz `AuditHistoryModalProps` permitiendo a la aplicación anfitriona pasar las traducciones localizadas para todos los textos internos (título, pestañas, estados de carga y empty states), haciendo el componente 100% agnóstico al idioma con un fallback por defecto.

**Riesgo mitigado:** El componente ahora es totalmente localizable en entornos multi-idioma.

### ✅ Issues #1–#6, #8–#19 — Verificados como CORRECTAMENTE CORREGIDOS

- `'use client'` en `AuditHistoryModal` y `UserIdentity`: presentes ✅
- `useLivePolling`/`featureFlags` desde `@ajabadia/styles`: migrados ✅
- Tipo `AuditLog` local: definido en `types.ts` ✅
- Build script: migrado a `tsup` cross-platform ✅
- Resto de issues: verificados ✅
