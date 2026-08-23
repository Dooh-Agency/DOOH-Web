# Plan de Crecimiento y Monetización Digital — DOOH 2026

Buenos Aires – Málaga | Mayo 2026
Inversión inicial: $0 | Personas: 2 + IA | Mercados: ARG + ESP | Plazo al primer ingreso: <30 días

## Contexto

Estudio con 13 años de trayectoria en branding, comunicación digital y producción de contenido. Equipo: dos diseñadoras con perfil estratégico, experiencia en branding, UX/UI, edición multimedia y marketing de contenidos. Incorporación de IA generativa (Claude, Lovable, Cursor, Make) habilita construir y operar productos digitales sin equipo de desarrollo técnico dedicado.

Desafíos: modelo de agencia tradicional depende de referidos, sin ingresos recurrentes; la IA comprime el mercado de diseño genérico; relocalización de la socia a Málaga abre un segundo mercado de mayor poder adquisitivo.

## Diagnóstico: por qué no creció en 13 años

| Causa | Consecuencia |
|---|---|
| Canal único (referidos) | Sin crecimiento previsible ni alcance nuevo |
| Sin producto propio | Dependencia total de clientes activos |
| Sin ingresos recurrentes | Caja inestable, sin capacidad de inversión |
| Posicionamiento difuso | No se diferencia de cualquier otra agencia |

**Conclusión:** no es un problema de calidad del trabajo, es el modelo de negocio. Solución: pasar de agencia reactiva a estudio con productos propios y canales activos de adquisición.

## Las tres líneas de negocio paralelas

No compiten entre sí — se alimentan mutuamente, ordenadas por velocidad de ingreso y nivel de construcción.

### Línea A — Servicio productizado DOOH + IA
Lo que ya hacen, reempaquetado como suscripción mensual fija (sin construir nada nuevo). Tres paquetes que combinan branding, contenido y automatización IA. Precio fijo, entrega predecible, renovación automática.
- **Por qué funciona ahora:** pymes necesitan presencia digital constante sin saber usar IA. Mercado español (Málaga) paga €500–1.500/mes sin fricción. Argentina como laboratorio/portafolio.
- **Sinergia:** cada restaurante que adopte la app gastro es cliente potencial del servicio productizado.
- **Acción inmediata:** definir 3 paquetes, landing page, activar LinkedIn España.

### Línea B — App Gastro-Tech SaaS
Plataforma SaaS para restaurantes: carta digital editable, reservas online, panel admin, gestión de reseñas con respuesta IA, fidelización. Suscripción mensual por local.
- **Piloto:** cliente de Trelew (2 locales) — relación establecida, trabajo previo documentado (vajilla, branding, menú), sin sistema digital hoy. Primeros 2 meses sin costo a cambio de feedback y testimonial.
- **Diferencial DOOH:** los SaaS genéricos son funcionales pero no tienen identidad. DOOH ofrece sistema + identidad del restaurante integrados.
- **Puerta de entrada triple:** app gastro → contenido mensual (línea A); → diseño de marca/carta física; → vajilla y arquigrafía (futuro, ver KANSO en `05-ecosistema-tres-marcas.md`).

### Línea C — App Ceramistas AI
Tres módulos: (1) diagnóstico visual por IA de fallos de producción cerámica; (2) intercambio de herramientas/insumos entre ceramistas cercanos; (3) marketplace de sobrantes con geolocalización.
- **Por qué:** no existe solución digital hoy; comunidad activa en IG/YouTube; DOOH tiene acceso directo al mundo cerámica (vía KANSO). Diagnóstico resoluble con Claude API + prompts especializados.
- **Monetización:** freemium (5 diagnósticos gratis/mes → suscripción), comisión en marketplace, publicidad geolocada a proveedores.
- **Timing:** construcción progresiva mientras A y B generan ingresos. Apuesta a 12 meses.

## Hoja de ruta — 6 meses

| Período | Línea | Hito clave |
|---|---|---|
| Semana 1–2 | A | Definir paquetes + landing lista |
| Mes 1 | A | Primeros 2–3 clientes suscriptos |
| Mes 1–3 | B | MVP Gastro funcionando en Trelew |
| Mes 2 | A | Activación mercado España |
| Mes 3–4 | B | SaaS listo para más clientes ARG |
| Mes 4–5 | C | Beta ceramistas |
| Mes 5–6 | B | Primeros clientes gastro en España |
| Mes 6+ | A+B+C | ~$3.000 USD/mes recurrente estimado |

## Stack técnico recomendado

| Componente | Herramienta |
|---|---|
| Frontend / App | Lovable o Cursor |
| Base de datos | Supabase (auth + DB + storage + realtime) |
| Hosting | Vercel |
| Pagos Argentina | Mercado Pago API |
| Pagos España | Stripe |
| Notificaciones | Twilio o Meta Cloud API (WhatsApp) |
| IA en la app | Claude API |
| Dominio / DNS | Cloudflare |
| Emails | Resend |

## Modelo de precios estimado

### Línea A
| Plan | Precio mensual | Incluye |
|---|---|---|
| Starter | $250–400 USD / €230–380 | Identidad visual + 8 posts/mes + copy IA |
| Growth | $500–700 USD / €460–650 | Starter + automatización IA + landing page |
| Studio | $900–1.200 USD / €850–1.100 | Growth + estrategia + contenido multimedia + reportes |

### Línea B
| Plan | Precio mensual | Incluye |
|---|---|---|
| Base | $25–40 USD / local | Carta digital + reservas + panel |
| Pro | $60–90 USD / local | Base + pre-order + fidelización + reportes |
| Studio | $150–200 USD / local | Pro + diseño de marca + contenido mensual |
| España (Pro/Studio) | €80–250 / local | Mismo producto, mercado premium europeo |

### Proyección conservadora — mes 6
| Fuente | Estimado mensual |
|---|---|
| 5 clientes servicio productizado (mix ARG/ESP) | ~$1.500 USD |
| 10 restaurantes SaaS Plan Pro (ARG) | ~$700 USD |
| 2 restaurantes SaaS España | ~$400 USD |
| Beta ceramistas (freemium) | ~$0–200 USD |
| **TOTAL** | **~$2.600–3.000 USD/mes** |

## Próximos pasos concretos

**Esta semana — Línea A:** definir 3 paquetes, armar landing, activar LinkedIn España, identificar 10 pymes en Málaga.

**Mes 1 — Línea B:** proponer piloto gastro a Trelew, definir módulos MVP, construir con Lovable + Supabase + Vercel, documentar el proceso como contenido de marca.

**Meses 2–4:** lanzar SaaS gastro a 3–5 clientes ARG, investigar usuarios ceramistas, definir MVP app ceramistas.

## Por qué puede funcionar

- IA democratizó construir productos digitales sin equipo técnico.
- Bi-locación (Buenos Aires + Málaga) es un activo: producción en Argentina, mercado premium en Europa.
- Cliente de Trelew es caso de uso perfecto para validar sin riesgo.
- Nicho ceramista sin solución digital — no hay que pelear mercado.
- Las tres líneas se retroalimentan.

> El único trabajo pendiente es salir del modo agencia reactiva y entrar en modo estudio con productos. Eso no requiere inversión — requiere decisión.
