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

| Alcance | Ruta | Estado |
|---------|------|--------|
| **Proyecto (definitivo)** | `rayito-de-sol/.agents/skills/` | 30 skills instaladas |
| Global (legacy, ignorar) | `~/.agents/skills/` | Copia anterior; no es fuente de verdad |
| Lockfile reproducible | `skills-lock.json` | `npx skills experimental_install` |

Verificar: `npx skills ls` (desde la raíz del repo).

Regla Cursor always-on: [`.cursor/rules/skills-mandatory.mdc`](.cursor/rules/skills-mandatory.mdc)

## Informe: éxitos vs fallos (instalación original)

### Instaladas correctamente en el proyecto (28 plan + 2 workflow)

Todas en `.agents/skills/<nombre>/SKILL.md`.

**Core (8):** brainstorming, systematic-debugging, using-superpowers, frontend-design, vercel-react-best-practices, web-design-guidelines, find-skills, agent-browser

**Complementarias (20):** motion-framer, tailwind-design-system, design-dna, design-taste-frontend, high-end-visual-design, emil-design-eng, ui-ux-pro-max, landing-page-design, css-animations, react-typescript, seo-optimizer, aceternity-ui, vercel-composition-patterns, canvas-design, theme-factory, brand-guidelines, sleek-design-mobile-apps, extract-design-system, redesign-existing-projects, design-motion-principles

**Workflow extra (2):** writing-plans, verification-before-completion

### Fallos en el primer intento (repo del plan incorrecto)

| Skill | Repo que falló | Motivo | Repo correcto usado |
|-------|----------------|--------|---------------------|
| motion-framer | anthropics/skills | Skill no existe ahí | freshtechbro/claudedesignskills |
| design-dna | anthropics/skills | Skill no existe ahí | zanwei/design-dna |
| emil-design-eng | emilkowalski/animations-dev | Repo privado / auth | emilkowalski/skills |
| react-typescript | wshobson/agents | Skill no existe ahí | josiahsiegel/claude-plugin-marketplace |
| react-typescript | tenequm/skills | Skill no existe ahí | (idem arriba) |
| css-animations | heygen-com/hyperframes | Eliminada upstream | boraoztunc/skills |
| css-animations | editframe/skills | Skill no existe ahí | boraoztunc/skills |
| landing-page-design | belt-sh/cli | No intentado | inference-sh/skills |

### Avisos ignorables (no afectan Cursor)

- `PromptScript does not support global skill installation` — otro agente; Cursor recibe la skill igual.

## Skills workflow

Antes de UI o features nuevas, leer [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) y [`src/styles/tokens.css`](src/styles/tokens.css). No introducir Inter/Roboto ni layouts template SaaS.

**Importante:** no correr las 28 skills en cada prompt. Usar el bundle del tipo de tarea (ver `.cursor/rules/skills-mandatory.mdc`).

### Bundles resumidos

- **Siempre:** `using-superpowers`
- **Feature:** brainstorming → spec → writing-plans
- **UI:** frontend-design + design-taste-frontend + brand-guidelines + tailwind-design-system + ui-ux-pro-max + high-end-visual-design
- **Motion:** motion-framer + emil-design-eng + design-motion-principles + design-dna + css-animations
- **React/TSX:** react-typescript + vercel-composition-patterns + vercel-react-best-practices
- **Cierre:** web-design-guidelines + verification-before-completion
- **Bug:** systematic-debugging
- **QA visual:** agent-browser

Reinstalar desde lockfile: `npx skills experimental_install -y`
