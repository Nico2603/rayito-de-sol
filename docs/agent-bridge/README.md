# Agent Bridge — ProSavis publicidad

Puente público entre Remote Controls (oficina ↔ casa) sin depender de repos privados.

| Recurso | URL |
| --- | --- |
| Blueprint repo (público) | https://github.com/Nico2603/prosavis-publicidad-blueprint |
| Blueprint raw (sin auth) | https://raw.githubusercontent.com/Nico2603/prosavis-publicidad-blueprint/main/archivo.md |
| Este archivo | [prosavis-publicidad-archivo.md](./prosavis-publicidad-archivo.md) |
| Mirror casa (privado) | https://github.com/Nico2603/publicidad |
| Upstream oficina | https://github.com/Prosavis/publicidad.git |

## Estado del puente (módulo)

1. Casa ya creó el landing pad `Nico2603/publicidad` e invitó a **Prosavis** (push).
2. Oficina debe: **aceptar el invite** y hacer `git push` del módulo real a `Nico2603/publicidad`  
   **o** invitar `Nico2603` a `Prosavis/publicidad`.
3. Path canónico en casa: `%USERPROFILE%\Documents\GitHub\publicidad`
4. Preview móvil: Firebase `prosavis-ads-preview`

## Receta

1. Código/contexto → GitHub compartido (blueprint + mirror)
2. Orquestación → Cursor Agents (Runtime) + deja/recoge del drop
3. Preview móvil → Firebase `prosavis-ads-preview`
4. Emergencia sin auth → raw blueprint o este `docs/agent-bridge/`
