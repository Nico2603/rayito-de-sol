# Agent Bridge — ProSavis publicidad

Puente entre Remote Controls (oficina Prosavis-PC ↔ casa Nico Personal).

## Drops / blueprints (sin auth)

| Recurso | URL |
| --- | --- |
| Blueprint repo (público) | https://github.com/Nico2603/prosavis-publicidad-blueprint |
| Este archivo (raw) | [prosavis-publicidad-archivo.md](./prosavis-publicidad-archivo.md) |
| Firebase sync | https://prosavis-ads-preview.web.app/sync/0e8fc2256ef7d816fb75551491c4f61f2e5aca8630948dd8/archivo.md |

## Código publicidad (con auth Nico2603)

| Repo | Rol |
| --- | --- |
| https://github.com/Nico2603/publicidad | **Mirror canónico para Nico Personal** (private) |
| https://github.com/Prosavis/publicidad | Origen oficina (private; Nico2603 es collaborator) |

### Flujo sync
- Oficina trabaja en `Prosavis/publicidad` → push a `main` → también `git push mirror main` (o sync periódico).
- Casa clona/pull `Nico2603/publicidad` con cuenta Nico2603.
- Preview PNG: `npm run preview:start` → `prosavis-ads-preview.web.app`.

### Clone en casa
```powershell
gh auth switch --user Nico2603
cd $env:USERPROFILE\Documents\GitHub
git clone https://github.com/Nico2603/publicidad.git
cd publicidad
npm install
```
