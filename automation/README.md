# Operación de automatización de redes

Esta carpeta organiza los insumos, las tandas y los registros de DOOH mientras se valida el flujo. No ejecuta automatizaciones ni publica contenido por sí misma.

La configuración editorial de DOOH está en [`../docs/automation/DOOH_Automatizacion_RRSS.md`](../docs/automation/DOOH_Automatizacion_RRSS.md). La estructura estándar que deben replicar los futuros repositorios de clientes está en [`../docs/automation/ESTANDAR_REPOS_CLIENTE.md`](../docs/automation/ESTANDAR_REPOS_CLIENTE.md).

## Carpetas

- `inputs/`: trabajos, imágenes, noticias, pedidos del equipo y cualquier material de referencia aportado para una tanda.
- `grid/`: una carpeta por tanda semanal con la grilla, captions, piezas y resultados de QA.
- `logs/`: registro de cada corrida, incluidas piezas generadas y estado de aprobación.

No guardar credenciales, accesos de redes ni claves de servicios en esta carpeta o en el repositorio.

La grilla a aprobar se crea desde [`grid/PLANTILLA_GRILLA.md`](grid/PLANTILLA_GRILLA.md) dentro de la carpeta de la tanda semanal. Cada tanda contiene 3 temas principales y una story de Instagram por tema, programada para el día siguiente. La carpeta compartida de revisión es [Google Drive](https://drive.google.com/drive/folders/1Zw8jLtzBdhwcoErdl2AjPzVDpJOzPTa_?usp=drive_link). Los nuevos temas se cargan en el [Formulario de inputs](https://docs.google.com/spreadsheets/d/1wIibWzTBJTPbJ5BOWPVTSmfrnGSRqPQ5vbh0rUqn9_0/edit?usp=drivesdk), dentro de la carpeta de inputs. Cuando se use Google Drive y Google Sheet, estos archivos son la fuente de trabajo y el Sheet concentra aprobación, assets finales, programación y resultado de publicación.
