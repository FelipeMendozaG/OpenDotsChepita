# Guía para Agentes de IA en OpenDots

Este documento define el contexto, arquitectura, restricciones y flujo de trabajo para agentes de IA de desarrollo que trabajen en este repositorio.

---

## 📌 Contexto del Proyecto

**OpenDots** es una plantilla open-source para auto-hospedar agentes de IA personales persistentes ("Dots"), desarrollada por CopilotKit.
- **Frontend**: React 19, Vite, Tiptap (editor enriquecido), Lucide Icons.
- **Backend**: Hono (`@hono/node-server`), Node.js ESM nativo.
- **Base de Datos**: SQLite nativo de Node.js (`node:sqlite` con `DatabaseSync` y modo WAL).
- **Capa de IA**: CopilotKit Runtime (`@copilotkit/runtime`), AG-UI (`@ag-ui/core`, `@ag-ui/client`), TanStack AI (`@tanstack/ai`).
- **Integraciones**: Sandbox de computadora aislado (OpenBot supervisor), herramientas MCP (Model Context Protocol), llamadas de voz y Slack.

---

## ⚙️ Entorno y Requisitos Técnicos

- **Node.js**: **>= 24.0.0** (estrictamente requerido por `node:sqlite`). Antes de ejecutar comandos, verificar que la versión activa sea Node 24 (ej. `nvm use 24`).
- **Módulos**: ECMAScript Modules (`"type": "module"` en `package.json`).
- **TypeScript**: Modo estricto. **Importante**: En el backend (`src/server/`) y código compartido (`src/shared/`), las importaciones relativas locales DEBEN usar la extensión `.js` (ej. `import { Store } from './store.js';`).

---

## 📁 Estructura del Código

```
OpenDots/
├── src/
│   ├── client/       # Frontend SPA (React 19, Vite, Tiptap editor, CSS vanilla)
│   ├── server/       # Backend (Hono, DotAgent, Platform, SQLite stores, MCP, OpenBot)
│   ├── shared/       # Tipos TypeScript compartidos entre client y server
│   └── browser/      # Utilidades de seguridad y transporte de navegador
├── tests/            # Pruebas con Vitest
├── docs/             # Documentación de arquitectura, computadoras y configuración
└── compose*.yml      # Archivos de Docker Compose para OpenDots y OpenBot supervisor
```

---

## 🛠️ Comandos de Desarrollo y Validación

Siempre ejecuta estas validaciones antes de concluir una tarea:

| Acción | Comando | Descripción |
|---|---|---|
| **Typecheck** | `npm run typecheck` | Valida TypeScript (`tsc --noEmit`). No debe haber errores. |
| **Lint** | `npm run lint` | Valida reglas con ESLint. |
| **Tests** | `npm test` | Ejecuta la suite de pruebas unitarias con Vitest. |
| **Formato (verificar)** | `npm run check-format` | Comprueba el formateo con Prettier. |
| **Formato (corregir)** | `npm run format` | Corrige formateo automáticamente. |
| **Build completo** | `npm run build` | Compila frontend (Vite) y servidor (`tsc -p tsconfig.server.json`). |

---

## 📋 Reglas y Convenciones para el Agente

1. **Compatibilidad ESM y TypeScript**:
   - Siempre añade `.js` al importar archivos relativos en el servidor/shared: `import { ... } from './mi-modulo.js'`.
   - No desactives comprobaciones estrictas de TypeScript (`any` injustificado, `@ts-ignore`).
2. **Persistencia y Datos**:
   - Todo estado persistente local pasa por `Store` ([src/server/store.ts](file:///e:/chepita-dev/dev/OpenDots/src/server/store.ts)) o `WorkspaceStore` ([src/server/workspace.ts](file:///e:/chepita-dev/dev/OpenDots/src/server/workspace.ts)).
   - No utilices librerías externas de SQLite (como `better-sqlite3` o `sqlite3`); se utiliza `node:sqlite` nativo.
3. **Flujo Human-in-the-Loop (HITL)**:
   - Cualquier acción con efectos secundarios destructivos o que guarde datos en Spaces debe respetar las tarjetas de revisión y aprobación previa (`pageReviewTool`, `connectionActionTool`).
4. **Privacidad y Seguridad**:
   - Nunca expongas credenciales ni tokens en logs ni en respuestas de red.
   - Todo endpoint administrativo o con `HOST` externo requiere validación de `ownerToken` (mínimo 24 caracteres).
5. **Pruebas y Regresiones**:
   - Cada nueva funcionalidad o corrección debe acompañarse de pruebas en `tests/` ejecutables con `npm test`.
   - Las pruebas unitarias no deben depender de servicios externos en la nube ni de GPUs reales.
