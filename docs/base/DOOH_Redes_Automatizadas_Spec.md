# DOOH — Sistema de agentes para redes sociales
**Documento de handoff para Claude Code**
Buenos Aires – Málaga | Agosto 2026

---

## 1. Objetivo

Automatizar la producción de contenido para redes sociales de DOOH Agency (Instagram + LinkedIn en una segunda etapa) mediante agentes que se encarguen de:

1. La **grilla** (calendario de contenido)
2. La **redacción** (copy, captions, hooks)
3. La **generación de gráficas** (piezas visuales con identidad DOOH)
4. Dejar todo listo para que un humano dé el **OK de publicación**
5. Disparar la **publicación** una vez aprobado

**Prioridad:** redes primero. La web ya está en línea y no es parte de este alcance por ahora.

**Principio rector:** el equipo humano mantiene dirección creativa y aprobación final. Los agentes son un multiplicador de producción, no un reemplazo del criterio editorial.

---

## 2. Estado actual (punto de partida)

- Sitio web: en línea, fuera de alcance de este proyecto.
- Redes sociales: sin sistema activo de producción ni calendario recurrente.
- Identidad de marca DOOH ya definida y disponible como skill (`/mnt/skills/user/dooh-brand/SKILL.md`), incluye:
  - Colores: negro / lima (`#EEF46C` gráfica/impresión, `#DDF81D` variante web/producción)
  - Tipografía: Nunito Sans
  - Isotipo infinito (Google Drive, carpeta `1-arXYYtGjuNYKSHpUqXjM84XHjq75gfs`, archivo `Iso.svg` id `1SgoNPf3ZVeVX297HTayS0lH0IoKxd-9J`)
  - Tono de voz: directo, inteligente, cálido, concreto, seguro
  - Tagline: "Change the game. By design."
- Documentos estratégicos de referencia ya elaborados (ver sección 8): posicionamiento como *Creative Tech Studio*, guía de estilo de comunicación (Instagram vs. LinkedIn), plan de crecimiento 2026.
- Stack ya en uso por el equipo: Claude, Lovable, Cursor, Make.
- Conectores ya disponibles: Adobe (creatividad), Canva, Google Drive, Google Calendar, Meta Ads.

---

## 3. Arquitectura propuesta

El sistema tiene cuatro capas. Cada una puede construirse y probarse por separado.

| Capa | Función | Herramienta sugerida |
|---|---|---|
| **1. Cerebro de contenido** | Genera la grilla mensual/semanal, define ejes temáticos por publicación, redacta copy/caption, escribe el brief de cada gráfica | Claude Code (Routine programada) + skill `dooh-brand` |
| **2. Producción de gráficas** | A partir del brief, genera la pieza visual final (post estático, carrusel, cover de reel) | Adobe Express / Canva (conectores ya disponibles) |
| **3. Aprobación** | Punto único donde el equipo revisa la tanda y marca OK / cambios / rechazo | Google Sheet o dashboard liviano (a definir, ver sección 6) |
| **4. Publicación** | Dispara el posteo en la fecha y hora programada, solo para ítems aprobados | Make (ya está en el stack del equipo) |

### Por qué esta división

- La generación de contenido (capa 1 y 2) es la parte que Claude Code resuelve directamente, corriendo sin supervisión constante mediante **modo headless** (`claude -p`) o **Routines** (tareas programadas en la nube, sin necesidad de mantener un servidor prendido).
- La publicación automática a Meta/Instagram requiere permisos de negocio verificado y la Content Publishing API — por eso se delega a Make, que ya tiene el módulo nativo para Instagram Business y evita construir esa capa de autenticación desde cero.
- Separar aprobación de publicación es no negociable: ningún post sale sin el OK humano.

---

## 4. Flujo end-to-end

```
[Routine programada, ej. todos los lunes 8am]
        │
        ▼
1. Claude Code genera la grilla de la semana/mes
   (ejes temáticos, fechas, formato por pieza)
        │
        ▼
2. Claude Code redacta copy + caption + hashtags
   por pieza, aplicando skill dooh-brand
        │
        ▼
3. Claude Code arma el brief visual de cada pieza
   y dispara la generación de gráfica (Adobe/Canva)
        │
        ▼
4. Todo el paquete (grilla + copy + gráfica) se
   deja en el punto de aprobación
        │
        ▼
5. Humano revisa → OK / pide cambios / rechaza
        │
        ▼  (solo si OK)
6. Make dispara la publicación en la fecha
   y horario programado
```

---

## 5. Ejes de contenido (referencia — validar con equipo antes de programar la Routine)

Según la guía de estilo ya elaborada para DOOH:

| Eje | Peso | Tono | Plataforma principal |
|---|---|---|---|
| Projects & Work | 50% | Inspirador, técnico, visual | Instagram |
| Thinking & Insights | 30% | Editorial, reflexivo, conceptual | Instagram / LinkedIn |
| Culture & Collaboration | 20% | Humano, consciente, real | Instagram |
| Casos y aprendizajes (artículo breve) | — | Analítico, con cierre reflexivo | LinkedIn |

Formatos: reels (motion, renders, loops), posts estáticos (citas, insights), carousels (procesos, comparativas), stories (teasers, making-of).

---

## 6. Decisiones pendientes antes de programar la primera Routine

Estas son las variables que Claude Code va a necesitar resueltas para no inventar criterio propio:

- [ ] **Frecuencia**: ¿cuántas piezas por semana en Instagram? ¿arranca LinkedIn en esta fase o queda para después?
- [ ] **Punto de aprobación**: ¿Google Sheet simple, carpeta de Drive con naming convention, o vale la pena un dashboard liviano hecho en Claude Code?
- [ ] **Quién aprueba**: ¿Fernanda, Florencia, ambas? ¿hay un criterio de desempate?
- [ ] **Fuente de inputs**: ¿la Routine debe mirar proyectos recientes en Drive para sacar contenido de "Projects & Work", o el equipo va a subir inputs manualmente cada semana?
- [ ] **Cuentas a conectar en Make**: handles de Instagram/LinkedIn, permisos de negocio verificado en Meta.

---

## 7. Roadmap sugerido

| Fase | Alcance | Entregable |
|---|---|---|
| **1** | Cerebro de contenido: grilla + copy, sin gráficas ni publicación | Routine en Claude Code generando grilla semanal en un doc/sheet, para validar tono y ritmo |
| **2** | Sumar generación de gráficas | Brief visual conectado a Adobe/Canva, pieza final entregada junto al copy |
| **3** | Aprobación | Definir y montar el punto de OK (sección 6) |
| **4** | Publicación automática | Conectar Make, probar con cuenta de prueba antes de ir a producción |
| **5** (futuro) | Extender a LinkedIn, sumar reportes de performance | — |

**Recomendación:** no saltar a la Fase 4 sin validar 2–3 semanas de Fase 1 a mano. El riesgo más alto no es técnico, es de criterio editorial — mejor calibrar el "cerebro" antes de automatizar la salida.

---

## 8. Documentos de referencia (contexto adicional para Claude Code)

Estos documentos ya existen y deberían quedar disponibles en el proyecto de Claude Code como contexto de fondo:

- `DOOH_Plan_Estrategico_2026.docx` — plan de crecimiento y las tres líneas de negocio
- `DOOH_Ecosistema_Tres_Marcas.docx` — DOOH / KANSO / Florencia Alvarez
- `DOOH_Analisis_Estrategico_2026.docx` — fundamentos del plan
- `DOOH__Posicionamiento_comercial.pdf` — posicionamiento como *Creative Tech Studio*
- `DOOH_Estrategia_de_comunicación_en_RRSS.pdf` — guía de tono, voz y estructura de contenido por red (fuente de la sección 5 de este documento)
- Skill `/mnt/skills/user/dooh-brand/SKILL.md` — identidad visual y de voz aplicable a todo output

---

## 9. Notas técnicas para la implementación en Claude Code

- Usar **modo headless** (`claude -p`) para correr la generación sin sesión interactiva.
- Evaluar **Routines** de Claude Code para programar la corrida semanal/mensual sin depender de una máquina propia prendida.
- El prompt de la Routine debe ser explícito: qué ejes tocar, cuántas piezas, qué formato de salida (ej. filas de un Sheet, o archivos markdown por pieza) — instrucciones ambiguas producen resultados inconsistentes entre corridas.
- Mantener un log/registro de cada corrida (qué generó, cuándo) para poder auditar sin tener que revisar todo a mano.
- Empezar con permisos acotados (`--allowedTools`) y sin auto-publicación hasta validar el criterio del cerebro de contenido.

---

*Documento preparado como base de trabajo para iniciar la implementación en Claude Code. Las decisiones pendientes (sección 6) deberían resolverse antes de programar la primera Routine en producción.*
