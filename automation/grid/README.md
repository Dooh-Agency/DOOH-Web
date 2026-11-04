# Tandas de contenido

La [grilla de redes](https://docs.google.com/spreadsheets/d/1n_dtGSjoxJd_SIHwU_0YvfHAj1tDR7CPRDWH-frfL_c/edit) en Google Sheets es fija, acumula todas las semanas y es el único lugar de aprobación. Las tandas no se guardan en este repositorio. El [planificador](../../app/planificador-redes/page.tsx) (`/planificador-redes`) es la vista para revisar cómo está pensado el contenido: muestra cada gráfica junto con su copy, sincronizado desde la grilla. Se mira ahí y se aprueba en la grilla. Para pedirle una tanda al asistente, seguir [`TANDA_SEMANAL.md`](TANDA_SEMANAL.md).

Cada tema contiene una pieza principal y una story de Instagram asociada, publicada el día calendario posterior. Cada canal y cada story son filas independientes, con su propio asset, fecha/hora y estado; `Pieza relacionada` vincula la adaptación o story con la pieza principal. Cada caption usa el formato `[ES]` seguido por `[EN]` dentro del mismo post.

Cuando una pieza deriva de una nota de blog, registrar su título o URL en `Assets / fuente`. La adaptación debe desarrollar un ángulo propio y dirigir a la nota; no reutilizar el texto del artículo como caption.

El `Aprobado` de cualquiera de los responsables definidos por DOOH valida la pieza, pero no publica por sí solo. No programar ni publicar sin asset final, fecha/hora definida y `Programar publicación = Sí`.
