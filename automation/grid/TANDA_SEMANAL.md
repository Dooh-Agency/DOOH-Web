# Armar una tanda semanal

Procedimiento a pedido: el equipo pide “armá la tanda de la semana” y el asistente prepara copy y dirección visual para la grilla fija. El diseño, la aprobación y la publicación siguen siendo humanos.

## Fuentes

| Fuente | Uso |
| --- | --- |
| [Formulario de inputs](https://docs.google.com/spreadsheets/d/1wIibWzTBJTPbJ5BOWPVTSmfrnGSRqPQ5vbh0rUqn9_0/edit) | Temas disponibles. Solo filas con `Autorizado para usar = Confirmado` y `Estado` distinto de `Usado`. |
| [Grilla de redes](https://docs.google.com/spreadsheets/d/1n_dtGSjoxJd_SIHwU_0YvfHAj1tDR7CPRDWH-frfL_c/edit) | Historial: evitar repetir temas, ganchos o CTA, y continuar la numeración de piezas. |
| [`../../docs/automation/DOOH_Automatizacion_RRSS.md`](../../docs/automation/DOOH_Automatizacion_RRSS.md) | Voz, ejes, cadencia, templates de Canva y guardrails. |
| [`../../docs/base/01-brand-identity.md`](../../docs/base/01-brand-identity.md) | Identidad de marca. |

## Pasos

1. Leer las fuentes. Si el pedido no indica la semana, usar la próxima semana que empieza en lunes.
2. Elegir 3 temas balanceando los ejes del mes (50 % Projects & Work, 30 % Thinking & Insights, 20 % Culture & Collaboration). Si no hay 3 inputs válidos, armar solo los que haya y avisar: nunca completar con temas inventados.
3. Por cada tema, preparar la pieza principal, su adaptación para LinkedIn cuando corresponda según el criterio por canal, y una story de Instagram para el día siguiente.
4. Escribir una fila por pieza con las columnas de abajo.
5. Subir la tanda como archivo CSV en UTF-8, **sin convertirlo a Google Sheets**, a la carpeta `Tandas para importar` (junto a la grilla), con el título `Tanda AAAA-MM-DD.csv` (lunes de la semana). Si se convierte, Drive transforma textos como `Lunes 09/11` en fechas y el script no lo importa.
6. En la grilla, ejecutar **Planificador DOOH → Importar tanda nueva**. Agrega las filas al final, crea sus carpetas de assets y marca la tanda como importada. Si algo falla, deshace las filas de esa tanda y no la marca.
7. Informar al equipo qué temas se usaron para que marquen esos inputs como `Usado`.

## Columnas de la tanda

La fila 1 lleva estos encabezados, escritos igual que en la grilla. Las columnas que no figuren quedan vacías.

| Columna | Contenido |
| --- | --- |
| `Pieza` | Continuar la numeración de la grilla: `05-IG`, `05-LI`, `05S`, `06-IG`… |
| `Día` | Día y fecha, por ejemplo `Lunes 09/11`. |
| `Canal` | `Instagram` o `LinkedIn`. |
| `Formato` | `Carrusel IG`, `Post Instagram`, `Reel IG`, `Story IG` o `Post LinkedIn`. |
| `Tamaño final` | `1080 × 1350 px · 4:5`, `1080 × 1920 px · 9:16` o `1200 × 1500 px · 4:5`. |
| `Objetivo` | Una línea. |
| `Tema` | `Proyecto — ángulo`, por ejemplo `MUUD — identidad para cafetería en Trelew`. |
| `Copy ES` | Caption en español con hashtags. |
| `Copy EN` | Traducción adaptada, con hashtags. |
| `Dirección visual` | Template de Canva a usar (nombre e ID), texto por placa, imágenes sugeridas y CTA. |
| `Assets / fuente` | Link del input en Drive o fuente del dato. |
| `Estado` | Siempre `En revisión`. Es una lista desplegable en la grilla: un valor distinto queda marcado como inválido. |
| `Pieza relacionada` | En stories y adaptaciones, la pieza principal (`05-IG`). |
| `Fecha/hora salida` | Sugerida, en formato `AAAA-MM-DD HH:MM` (hora de Argentina). |
| `Programar publicación` | Siempre `No`. |

## Reglas

- No inventar clientes, métricas, resultados ni citas. Si falta información, escribir `[REVISAR]` al comienzo del copy y explicar qué falta en `Dirección visual`.
- No usar inputs con autorización `Pendiente`.
- No marcar piezas como aprobadas, no programarlas y no publicar.
- No mezclar DOOH con KANSO ni con otros proyectos propios.
