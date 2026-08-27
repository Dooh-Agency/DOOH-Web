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
| `npm run start` | Sirve el build de producción. |
| `npm run lint` | Ejecuta el linter configurado por Next.js. |

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

El formulario de contacto usa Netlify Forms. Al publicar en Netlify, configurar una notificación de envíos a `hello@dooh.com.ar` desde **Forms → Form notifications** en el panel del sitio. La detección se realiza durante el deploy.

Para un primer despliegue:

1. Importar este repositorio en Netlify.
2. Usar `npm run build` como comando de build; Netlify detecta Next.js automáticamente.
3. Publicar una vista previa y probar formulario, navegación móvil y galería.
4. Configurar la notificación a `hello@dooh.com.ar`.
5. Conectar el dominio y verificar DNS antes de redirigir el sitio anterior de Wix.

No guardar contraseñas, claves API ni credenciales en Git. Si una integración las requiere, usar variables de entorno en Netlify y documentar únicamente sus nombres en `.env.example`.

## Trabajo asistido por IA

Las pautas de colaboración para Codex, Claude Code u otros asistentes están en [AGENTS.md](AGENTS.md). Todas las herramientas pueden trabajar con este repositorio mediante Git, Node 20 y los comandos descriptos arriba.
