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

### Skills instaladas (32)

**Core (8):** brainstorming, systematic-debugging, using-superpowers, frontend-design, vercel-react-best-practices, web-design-guidelines, find-skills, agent-browser

**Complementarias (20):** motion-framer, tailwind-design-system, design-dna, design-taste-frontend, high-end-visual-design, emil-design-eng, ui-ux-pro-max, landing-page-design, css-animations, react-typescript, seo-optimizer, aceternity-ui, vercel-composition-patterns, canvas-design, theme-factory, brand-guidelines, sleek-design-mobile-apps, extract-design-system, redesign-existing-projects, design-motion-principles

**Workflow (2):** writing-plans, verification-before-completion

**Analytics (2):** google-analytics-admin-api-basics, google-analytics-data-api-basics

## Skills workflow

Antes de UI o features nuevas, leer [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) y [`src/styles/tokens.css`](src/styles/tokens.css). No introducir Inter/Roboto ni layouts template SaaS.

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
