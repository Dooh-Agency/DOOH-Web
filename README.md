# DOOH — Creative Tech Studio

Sitio web institucional de DOOH, construido con Next.js, TypeScript y Tailwind CSS.

## Requisitos

- Node.js 20 (ver `.nvmrc`)
- npm 10 o compatible

## Primeros pasos

```bash
npm ci
npm run dev
```

Abrí `http://localhost:3000` en el navegador.

## Comandos disponibles

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia el entorno local. |
| `npm run build` | Genera y valida el build de producción. |
| `npm run lint` | Ejecuta el linter configurado por Next.js. |

El resultado estático queda en `out/`; Cloudflare Pages lo sirve en producción.

Antes de entregar cambios, ejecutar como mínimo:

```bash
npm run build
```

## Estructura del proyecto

- `app/page.tsx`: página principal y contenido institucional.
- `app/gracias/page.tsx`: confirmación luego de enviar el formulario.
- `app/globals.css`: estilos globales.
- `components/`: componentes reutilizables; la galería de casos está en `ProjectGallery.tsx`.
- `public/proyectos/`: imágenes de casos. Ver su [guía](public/proyectos/README.md).
- `docs/base/`: contexto estratégico y de marca proporcionado por DOOH.
- `docs/automation/`: configuración de referencia para la automatización de redes de DOOH.

## Contenido y marca

La fuente de contexto es `docs/base/`. Son documentos de referencia, no instrucciones de ejecución automáticas. Para los cambios editoriales prevalecen las solicitudes vigentes de DOOH. El documento `Prompt_Automatizacion_RRSS.md` es una plantilla para repositorios independientes de clientes: no corresponde ejecutarla ni aplicarla desde este sitio. La adaptación específica de DOOH está en `docs/automation/DOOH_Automatizacion_RRSS.md` y sirve de base para el futuro repositorio de automatización. La operación prevé tres temas principales por semana y una story de Instagram por tema, programada para el día siguiente. Durante la etapa actual, la automatización entrega dirección creativa y el equipo diseña las piezas dentro de Canva; ninguna publicación se programa sin assets finales y aprobación editorial explícita.

Lineamientos esenciales actuales:

- El sitio comunica exclusivamente a DOOH y sus proyectos de clientes.
- No presentar KANSO u otros proyectos propios como parte del ecosistema de DOOH.
- No mencionar a socias o integrantes por nombre sin una indicación editorial expresa.
- Mantener la estética de fondo negro en hero y footer, y contenido mayormente blanco.
- Usar el tono en español rioplatense del material de marca.

## Formularios y despliegue

El sitio se publica como exportación estática en Cloudflare Pages. El formulario de contacto usa la Pages Function `functions/api/contact.ts`, que envía los mensajes mediante Resend. Las redirecciones desde Wix están en `public/_redirects` y los encabezados HTTP en `public/_headers`.

La guía completa de puesta en producción, con todas las variables, Resend, la migración del dominio y la lista de pruebas, está en [`docs/deploy/CLOUDFLARE.md`](docs/deploy/CLOUDFLARE.md). Resumen para un primer despliegue:

1. En **Cloudflare → Workers & Pages**, crear un proyecto de Pages e importar el repositorio `Dooh-Agency/DOOH-Web`.
2. Configurar **Build command** como `npm run build` y **Build output directory** como `out`.
3. En **Settings → Variables and Secrets**, crear `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (se leen al compilar) y estas variables para Production y Preview:
   - `RESEND_API_KEY`: clave API de Resend.
   - `RESEND_FROM_EMAIL`: remitente validado en Resend, por ejemplo `DOOH <contacto@dooh.com.ar>`.
   - `CONTACT_RECIPIENT`: buzón que recibe los contactos, por ejemplo `hello@dooh.com.ar`.
   - `ALLOWED_CONTACT_ORIGIN`: URL pública exacta, por ejemplo `https://www.dooh.com.ar`. En Preview puede dejarse vacía o reemplazarse por la URL del preview que se va a probar.
4. En Resend, verificar el dominio de envío siguiendo los registros DNS que indique su panel.
5. Publicar una vista previa y probar formulario, navegación móvil y galería.
6. Conectar el dominio desde **Custom domains** y verificar DNS antes de redirigir el sitio anterior de Wix. Para el dominio raíz, delegar los nameservers a Cloudflare.
7. Cuando el dominio productivo quede activo, cambiar `NEXT_PUBLIC_SITE_URL` y `ALLOWED_CONTACT_ORIGIN` a `https://www.dooh.com.ar`.

No guardar contraseñas, claves API ni credenciales en Git. Las claves se cargan como secretos en Cloudflare y `.env.example` sólo declara sus nombres.

## Trabajo asistido por IA

Las pautas de colaboración para Codex, Claude Code u otros asistentes están en [AGENTS.md](AGENTS.md). Todas las herramientas pueden trabajar con este repositorio mediante Git, Node 20 y los comandos descriptos arriba.
