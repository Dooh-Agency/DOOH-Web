# Sincronización de la grilla con el planificador

Esta integración es gratuita a la escala actual: usa Google Apps Script, Google Drive y el proyecto de Supabase ya creado. No publica en redes ni llama a un modelo de IA.

## Qué sincroniza

Lee la pestaña `Grilla semanal` de este documento:

<https://docs.google.com/spreadsheets/d/1n_dtGSjoxJd_SIHwU_0YvfHAj1tDR7CPRDWH-frfL_c/edit?gid=1774004414#gid=1774004414>

- Desde la fila 5, usando los encabezados de la fila 4.
- Copy ES, copy EN, objetivo, formato, tamaño final, dirección visual, estado, enlace de asset final, programación y URL publicada.
- Cada canal es una fila independiente, aunque comparta concepto con otra pieza. Por ejemplo, `01-IG` y `01-LI` requieren sus propios assets finales y tamaños.
- `Tamaño final` (E) indica la especificación de diseño y de exportación que corresponde a esa fila. Referencias actuales: feed/carrusel de Instagram `1080 × 1350 px · 4:5`, post vertical de LinkedIn `1200 × 1500 px · 4:5` y story `1080 × 1920 px · 9:16`.
- `Assets / fuente` (K) es material de referencia: fotos base, links de inspiración o fuente del contenido. Todavía no genera una gráfica de Canva de forma automática ni se publica desde allí.
- `Assets finales (Drive)` (M) es la única fuente de publicación. Si contiene una carpeta de Drive, incorpora las imágenes y videos finales en orden natural (`1`, `2`, `3`…). Durante la sincronización, Apps Script copia esos archivos al bucket privado `planner-assets` de Supabase. Un enlace de Canva por sí solo no se puede previsualizar ni publicar: primero hay que exportar la pieza y subirla a Drive.
- `Preview / cover` (N, opcional) admite un único enlace a una imagen de Drive. Usalo en reels, videos y stories de video para fijar la portada que verá el equipo en el panel. Si queda vacío, el panel usa el primer asset final disponible.
- Actualiza una misma pieza sin duplicarla. La referencia estable es su fila del Sheet.

Los originales permanecen en Drive y se conserva su referencia, pero la previsualización se sirve desde Supabase Storage con una URL firmada. No hace falta publicar la carpeta ni los archivos de Drive: alcanza con que la cuenta que ejecuta Apps Script tenga acceso de lectura.

## Preparación (una vez)

1. En Supabase → **SQL Editor**, ejecutar las migraciones pendientes de `supabase/migrations/`, incluida `20260827103000_content_item_preview_cover.sql`.
2. En el Sheet, abrir **Extensiones → Apps Script**.
3. Reemplazar el contenido inicial por [`Code.gs`](Code.gs), guardar el proyecto y recargar la planilla.
4. En Apps Script, abrir **Project Settings → Script properties** y agregar:

   - `SUPABASE_URL` → la Project URL de `dooh-social-planner-prod`.
   - `SUPABASE_SERVICE_ROLE_KEY` → la clave `service_role` de Supabase, en **Project Settings → API Keys**.

   Esta clave omite RLS para ejecutar la sincronización. Nunca copiarla en el sitio, en `.env.local`, en Git ni en un mensaje de chat.
5. Volver a la grilla. En el menú nuevo **Planificador DOOH → Sincronizar con Supabase**, aceptar los permisos solicitados por Google.

Al finalizar aparece un resumen de piezas y assets. Para MUUD 01 debería indicar cuatro assets con el estado actual de la carpeta. La carpeta compartida que revisamos hoy contiene 4 archivos (`1` a `4`); cuando se agregue la quinta placa, la siguiente sincronización la incorporará automáticamente.

## Operación

Cada vez que se edite un copy, una aprobación o una carpeta final, ejecutar el menú **Sincronizar con Supabase**. Más adelante se puede añadir un disparador horario desde Apps Script si el equipo lo necesita; no conviene sincronizar por cada edición mientras la grilla está en trabajo.

El planificador lee estas tablas de Supabase. Después de una sincronización, usar **Actualizar** en `/planificador-redes` para recargar los cambios.
