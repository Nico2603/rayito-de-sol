# Agent Bridge → Puente Remote Control (universal)

Este directorio **no duplica** planos. El canal es:

**https://github.com/Nico2603/puente-remote-control**

| Qué | Dónde |
| --- | --- |
| Código / docs entre PCs | `entregas/` (GitHub) |
| Móvil ↔ PC (fotos, PDFs…) | LocalSend → `bandeja-localsend/` |
| Decisión de canal | `docs/PUENTE-UNIVERSAL.md` |
| Guía LocalSend | `docs/LOCALSEND.md` |
| Máquina de anuncios (casa) | https://github.com/Nico2603/publicidad |
| Preview anuncios casa | Supabase Lumen `ads-preview` |
| Preview anuncios oficina | Firebase `prosavis-ads-preview` |

```powershell
git clone https://github.com/Nico2603/puente-remote-control.git
# o git pull
.\scripts\instalar-localsend.ps1
.\scripts\configurar-bandeja-localsend.ps1 -Alias nico-laptop   # o prosavis-pc
```
