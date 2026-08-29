## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Skills — ubicación e instalación

Inventario completo del workspace: [SKILLS.md](../SKILLS.md)

| Alcance | Ruta | Estado |
|---------|------|--------|
| **Proyecto (definitivo)** | `rayito-de-sol/.agents/skills/` | 32 skills instaladas |
| Lockfile reproducible | `skills-lock.json` | `npx skills experimental_install -y` |

Verificar: `npx skills ls` (desde la raíz del repo).

Regla Cursor always-on: [`.cursor/rules/skills-mandatory.mdc`](.cursor/rules/skills-mandatory.mdc)  
Identidad del autor: skill `nicolas-identity` + [`.cursor/rules/nicolas-identity.mdc`](.cursor/rules/nicolas-identity.mdc)

### Skills instaladas (32)

**Core (8):** brainstorming, systematic-debugging, using-superpowers, frontend-design, vercel-react-best-practices, web-design-guidelines, find-skills, agent-browser

**Complementarias (20):** motion-framer, tailwind-design-system, design-dna, design-taste-frontend, high-end-visual-design, emil-design-eng, ui-ux-pro-max, landing-page-design, css-animations, react-typescript, seo-optimizer, aceternity-ui, vercel-composition-patterns, canvas-design, theme-factory, brand-guidelines, sleek-design-mobile-apps, extract-design-system, redesign-existing-projects, design-motion-principles

**Workflow (2):** writing-plans, verification-before-completion

**Analytics (2):** google-analytics-admin-api-basics, google-analytics-data-api-basics

## Skills workflow

Antes de UI o features nuevas, leer [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) y [`src/styles/tokens.css`](src/styles/tokens.css). No introducir Inter/Roboto ni layouts template SaaS.

## Despliegue

- **Producción:** https://rayitodesolpsico.com · Vercel team `maria-camila`
- **Autónomo (Nico-Laptop):** `npm run deploy:prod` · docs workspace `docs/REMOTE-CONTROL-DEPLOY.md`
- **Cloud Agent (VM Ubuntu):** environment `Nico2603/rayito-de-sol` · `npm run cloud:probe` / `cloud:status` / `cloud:deploy` · [`../docs/CLOUD-AGENT-SECRETS.md`](../docs/CLOUD-AGENT-SECRETS.md)

## Cursor Cloud specific instructions

- Environment personal ya existe: `Nico2603/rayito-de-sol` (no reutilices el de Lumen). My Secrets: `VITE_WEB3FORMS_ACCESS_KEY`, `VITE_GA_MEASUREMENT_ID`. **Faltan** `VERCEL_TOKEN`, `VITE_INSTAGRAM_TOKEN`, `VITE_GTM_CONTAINER_ID`.
- Skills: `.agents/skills/` + `skills-lock.json`. `npx skills ls`.
- MCP: `.cursor/mcp.json` → HTTP `https://mcp.vercel.com`. En Dashboard → Integrations & MCP, el mismo URL. OAuth Vercel con `psico.camilaa@gmail.com` (team `maria-camila`).
- Token deploy: `npm run cloud:deploy` si `VERCEL_TOKEN` está `set`. Estado: `npm run cloud:status`.
- `nico-ops` y galería/Drive son Nico-Laptop, no esta VM.

## Cloud fallback (sin Remote Control)

Este repo **es** el canal Rayito. Si el runtime no es `Nico-Laptop`: lee `.agents/skills/cloud-agent-fallback/SKILL.md`. No PowerShell personal, no `nico-ops`.

| Pedido | Acción |
|---|---|
| probe / ¿faltan secretos? | `npm run cloud:probe` |
| estado / último deploy | `npm run cloud:status` |
| preview / arregla deploy | `npm run cloud:deploy` |
| prod | `npm run cloud:deploy:prod` |

Si `VERCEL_TOKEN` sale `missing`, parar. Pegar en My Secrets scoped a `Nico2603/rayito-de-sol`. Código local sin push **no está** en esta VM.

**Importante:** no correr las 32 skills en cada prompt. Usar el bundle del tipo de tarea (ver `.cursor/rules/skills-mandatory.mdc`).

### Bundles resumidos

- **Siempre:** `using-superpowers`
- **Feature:** brainstorming → spec → writing-plans
- **UI:** frontend-design + design-taste-frontend + brand-guidelines + tailwind-design-system + ui-ux-pro-max + high-end-visual-design
- **Motion:** motion-framer + emil-design-eng + design-motion-principles + design-dna + css-animations
- **React/TSX:** react-typescript + vercel-composition-patterns + vercel-react-best-practices
- **Cierre:** web-design-guidelines + verification-before-completion
- **Bug:** systematic-debugging
- **QA visual:** agent-browser
- **Analytics:** google-analytics-admin-api-basics + google-analytics-data-api-basics

Reinstalar desde lockfile: `npx skills experimental_install -y`
