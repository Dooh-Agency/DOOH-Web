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

   Opcional: `DRIVE_ASSETS_FOLDER_ID` → el ID de la carpeta de Drive donde se crearán las carpetas de cada pieza. Si no se define, el script crea (o reutiliza) una carpeta `Assets finales` junto a la planilla y guarda su ID automáticamente.
5. Volver a la grilla. En el menú nuevo **Planificador DOOH → Sincronizar con Supabase**, aceptar los permisos solicitados por Google.

Al finalizar aparece un resumen de piezas y assets. Para MUUD 01 debería indicar cuatro assets con el estado actual de la carpeta. La carpeta compartida que revisamos hoy contiene 4 archivos (`1` a `4`); cuando se agregue la quinta placa, la siguiente sincronización la incorporará automáticamente.

## Operación

La grilla es fija: cada semana se agregan filas nuevas al final, sin crear otra planilla.

1. Cargar la pieza en la grilla con, al menos, `Pieza` y `Tema`, o importar una tanda preparada (ver abajo).
2. Ejecutar **Planificador DOOH → Crear carpetas de assets** (o directamente **Sincronizar con Supabase**, que también las crea). Cada pieza sin link en `Assets finales (Drive)` recibe una carpeta `01-IG · Tema` y su link queda escrito en la columna. Nunca se reemplaza un link cargado a mano.
3. Exportar la pieza desde Canva y soltar los archivos en esa carpeta, numerados `1`, `2`, `3`… para fijar el orden del carrusel.
4. Sincronizar.

Cada vez que se edite un copy, una aprobación o una carpeta final, ejecutar **Sincronizar con Supabase**, o bien activar **Activar sincronización cada hora** para que corra sola. Las ejecuciones horarias no muestran un aviso: su resumen y sus errores quedan en **Apps Script → Ejecuciones**, y Google envía un correo si alguna falla. Para pausarla, usar **Desactivar sincronización cada hora**.

### Importar una tanda

Las tandas que prepara el asistente ([`../grid/TANDA_SEMANAL.md`](../grid/TANDA_SEMANAL.md)) llegan como archivos CSV `Tanda AAAA-MM-DD.csv` (sin convertir a Google Sheets) dentro de la carpeta `Tandas para importar`, junto a la grilla (o la definida en la propiedad opcional `TANDAS_FOLDER_ID`). **Planificador DOOH → Importar tanda nueva** agrega sus filas al final de la grilla con el formato y las listas desplegables de la primera pieza, empareja las columnas por nombre de encabezado, crea las carpetas de assets y renombra la tanda como `✓ Importada · …` para no cargarla dos veces. Si algo falla, borra las filas que haya agregado de esa tanda y no la renombra. Un valor que no esté en la lista desplegable (por ejemplo, en `Estado`) se importa igual y queda marcado como inválido en la celda.

Si una carpeta se renombra o se borra el link de la columna, la siguiente ejecución reutiliza la carpeta que tenga exactamente el nombre `Pieza · Tema`, o crea una nueva si el tema cambió.

El planificador lee estas tablas de Supabase. Después de una sincronización, usar **Actualizar** en `/planificador-redes` para recargar los cambios.
