# Supabase — Planificador de redes DOOH

Esta carpeta contiene el esquema de la herramienta interna. El sitio público no usa datos de esta base.

## Configuración inicial

1. Usar el proyecto independiente `dooh-social-planner-prod` dentro de la organización Agencia DOOH.
2. En **SQL Editor**, ejecutar las migraciones en orden:
   - `migrations/20260825090000_social_planner.sql`
   - `migrations/20260825110000_planner_assets_and_order.sql`
   - `migrations/20260825120000_content_item_assets.sql`
   - `migrations/20260825130000_sheet_sync_sources.sql` (si se conectará la grilla de Google Sheets)
   - `migrations/20260826163000_sheet_sync_source_key_constraint.sql` (si se conectará la grilla de Google Sheets)
   - `migrations/20260827103000_content_item_preview_cover.sql` (si se usará una portada explícita para video)
3. Mientras el sitio público continúe en Wix, en **Authentication → URL Configuration** definir:
   - Site URL: `http://localhost:3000`
   - Redirect URL: `http://localhost:3000/planificador-redes`
4. En **Authentication → Providers → Email**, activar el acceso por Magic Link. La lista permitida se controla en `public.team_members`, no en el cliente.
5. Copiar la Project URL y la Publishable key en `.env.local` usando los nombres de `.env.example`. No cargar esas variables todavía en Wix.

Cuando el nuevo sitio esté publicado en una URL de preview de Netlify, agregar esa URL seguida de `/planificador-redes` a Redirect URLs. Recién después de migrar el dominio de Wix, cambiar Site URL a `https://www.dooh.com.ar` y agregar `https://www.dooh.com.ar/planificador-redes`.

No usar `service_role` en el navegador, en `.env.example` ni en Netlify para esta interfaz.

## Acceso del equipo

La migración habilita inicialmente a:

- `florencia@dooh.com.ar` (admin)
- `fernanda@dooh.com.ar` (admin)
- `hello@dooh.com.ar` (reviewer)

Para añadir una persona, ejecutar en SQL Editor:

```sql
insert into public.team_members (email, role)
values ('persona@dooh.com.ar', 'editor');
```

Los usuarios autenticados que no estén en esta lista no pueden leer ni modificar publicaciones, aun cuando conozcan la URL pública y la Publishable key.

## Datos y assets

`content_items` guarda planificación, copy, enlaces de Canva, estados, orden manual y, opcionalmente, la ruta de una portada (`preview_path`). `content_item_assets` guarda todas las piezas en su orden: una imagen para post simple, varias placas para carrusel y un video para reel. El bucket privado `planner-assets` conserva estos archivos; los finales de diseño pueden continuar en Canva y Drive.

Una pieza solo debe marcarse como `approved` cuando tenga los assets finales y el enlace de Canva. La publicación automática queda fuera de esta migración: Make deberá verificar estado aprobado, horarios definidos y `publish_requested = true` antes de enviar contenido a una red.

## Sincronización desde Google Sheets

La integración gratuita para la grilla operativa está en [`../automation/google-sheet-sync/`](../automation/google-sheet-sync/). Corre como Google Apps Script dentro de la planilla, lee los links de Drive y escribe en Supabase usando una clave de servidor guardada únicamente en las propiedades privadas del script. No exponer esa clave en la aplicación web.
