# Arquitectura de Micro-Frontends y Widgets del Ecosistema

Este paquete (`ABDEcosystemWidgets`) nace de la necesidad de separar las responsabilidades arquitectónicas (Principio DRY y Single Responsibility) dentro del monorepo, evitando que la librería base de UI (`ABDStyles`) se acople a la lógica de negocio y conectividad.

## 1. El Problema que Resolvemos
Originalmente, componentes con "inteligencia" (que hacían peticiones `fetch`, que leían JWTs de sesión, o que conocían la arquitectura del ecosistema) se colocaron en `ABDStyles`. Esto convirtió a `ABDStyles` en un cajón de sastre, dificultando su uso como un verdadero *Design System* puro.

## 2. Nueva Frontera Arquitectónica
Para evitar la proliferación excesiva de paquetes `package.json`, agruparemos los componentes inteligentes en este paquete (`ABDEcosystemWidgets`), pero estructurados en **subcarpetas temáticas**:

* **`@ajabadia/styles`**: SOLO componentes presentacionales "tontos". Reciben `props` y emiten `eventos`. No saben de APIs, ni de fetch, ni de tokens. (Ej: `Button`, `Modal`, `Table`, `Badge`).
* **`@ajabadia/satellite-sdk`**: SDK puro de backend/frontend para gestionar la criptografía de sesión, JWT, guards de seguridad y utilidades de red. Idealmente sin renderizado complejo de UI.
* **`@ajabadia/ecosystem-widgets` (Este paquete)**: "Smart Components" o Widgets. Usan `@ajabadia/styles` para pintarse y `@ajabadia/satellite-sdk` para conectarse a las APIs del ecosistema.

## 3. Estructura Interna Propuesta (Temática)
Para mantener el orden interno, dividiremos el código en subdirectorios:
- `/src/identity/`: Para componentes de gestión de usuario y organizaciones (Ej: `TenantSelector`, `UserIdentity`, y `LogoutSuccessView` con auditoría automatizada via `logger.audit` de `@ajabadia/satellite-sdk/client`).
- `/src/audit/`: Para visualizadores de logs y seguridad (Ej: `LiveLogViewer`, `AuditDeltaViewer`, el nuevo `AuditHistoryModal`).
- `/src/navigation/`: Para elementos de control global (Ej: `CommandPalette`).

## 4. Componentes Candidatos a Migrar
**Desde `ABDStyles`:**
- `TenantSelector.tsx` (Hace peticiones a `/api/admin/tenants`).
- `CommandPalette.tsx` (Lógica de navegación global).
- `UserIdentity.tsx` (Lee la sesión de usuario).
- `LiveLogViewer.tsx` (Lógica específica de auditoría).
- `AuditDeltaViewer.tsx` (Lógica específica de auditoría).
- `SystemSettings.tsx` (Carga y guarda configuraciones del sistema).

**Desde `ABDSatelliteSDK`:**
- `BrandingStyles.tsx`: Actualmente inyecta variables CSS leyendo el JWT. Aunque es seguro mantenerlo ahí (porque SDK maneja la sesión), si en el futuro queremos que el SDK sea Node/Typescript 100% puro sin dependencias de React, este componente pasaría a `/src/identity/BrandingProvider` en este paquete de Widgets.

## 5. Arquitectura de Despliegue (Multi-Repo)
Dado que el ecosistema NO utiliza un Monorepo a nivel de Git (cada aplicación tiene su propio repositorio de GitHub), la integración en Vercel funciona mediante dependencias Git.
Para desplegar aplicaciones que usan este paquete, es OBLIGATORIO:
1. Crear un repositorio en GitHub para `ABDEcosystemWidgets`.
2. Hacer push de este código.
3. Referenciarlo en el `package.json` de los satélites usando la sintaxis de GitHub (Ej: `"@ajabadia/ecosystem-widgets": "github:ajabadia/ABDEcosystemWidgets#main"`).
Esto asegura que Vercel, al clonar un satélite, pueda descargar este paquete directamente desde GitHub.

## 6. Internacionalización estricta con `next-intl`

Todos los textos de los componentes deben extraerse obligatoriamente utilizando el hook `useTranslations()` de `next-intl`. 
**Queda estrictamente prohibido:**
1. Hardcodear strings en español (ej. `<span>Cargando...</span>`).
2. Pasar objetos `translations={{ ... }}` como prop a los componentes.

Esta regla asegura que el ecosistema completo reacciona de forma síncrona a los cambios de locale y evita el infierno de props de traducción anidadas.

## 7. Prioridad a la Composición
El diseño debe favorecer la composición sobre la configuración. En lugar de un componente monolítico con 30 props, deberíamos exponer componentes compuestos (`<Widget.Root>`, `<Widget.Header>`, `<Widget.Content>`).

## 8. Siguientes Pasos (Próxima Conversación)
1. Subir este paquete a su nuevo repositorio de GitHub.
2. Migrar los componentes uno a uno, ajustando los imports en las aplicaciones de destino (`ABDLogs`, `Gobernanza`, `Quiz`).
3. Crear el nuevo `<AuditHistoryModal />` dentro de `/src/audit/` y consumirlo desde Gobernanza.
