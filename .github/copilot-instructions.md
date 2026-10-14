# GitHub Copilot Instructions for OpenDots

## Guidelines

- **Runtime**: Node.js >= 24 is required. Uses native `node:sqlite` (`DatabaseSync`) with WAL mode.
- **Module System**: ESM (`"type": "module"`). All relative imports in `src/server/` and `src/shared/` must end in `.js`.
- **Backend**: Built on Hono. Business logic lives in `src/server/`.
- **Frontend**: React 19 SPA built with Vite. Rich text editing is handled by Tiptap (`src/client/editor/`).
- **AI Integration**: CopilotKit Runtime (`@copilotkit/runtime/v2`), AG-UI streaming, and TanStack AI (`@tanstack/ai`).
- **Verification Commands**:
  - `npm run typecheck`
  - `npm run lint`
  - `npm test`
  - `npm run check-format`
