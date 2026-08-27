# Estándar de repositorios para automatización de redes

Todos los repositorios de automatización de clientes deben repetir esta estructura para que el flujo sea predecible, independientemente de la IA utilizada.

```text
/
  AGENTS.md                 ← reglas neutrales para asistentes y colaboradores
  CLAUDE.md                 ← referencia a AGENTS.md o adaptación compatible
  README.md                 ← instalación, alcance y enlaces operativos
  brand/
    skill.md                ← identidad, tono, paleta y reglas del cliente
    canva_templates.md      ← categoría → Brand Template ID
    assets/                 ← logos y assets aprobados
  inputs/                   ← material aportado por el equipo o desde Drive
  grid/
    YYYY-MM-DD/             ← una tanda semanal por carpeta
  logs/                     ← registro de cada corrida
```

## Reglas comunes

- El flujo genera dirección creativa y material para aprobación humana; no publica de manera autónoma.
- Cada tanda se organiza por fecha de generación, siempre en lunes.
- El repositorio conserva inputs, grilla y registros como fuente de trabajo. Google Drive puede guardar los assets de revisión y Google Sheet controlar estado, fecha, canal y aprobación cuando el equipo requiera un circuito compartido.
- `Aprobado` valida el contenido y la gráfica. La publicación requiere además asset final, fecha/hora y una orden explícita de programación (`Programar publicación = Sí`).
- Cada repositorio conserva su propia identidad y assets; nunca se comparten referencias entre clientes.
- No guardar credenciales, tokens ni contraseñas en Git.

## Flujo de inputs

Los inputs pueden llegar por dos vías, que se registran juntas en la grilla:

1. Indicación directa del equipo: cliente/proyecto, idea, objetivo, restricciones y fechas.
2. Material cargado en Google Drive: se registra el enlace y se verifica qué está autorizado para comunicar.

Si falta una definición crítica, la pieza se marca `Revisar`; no se inventa información.

## Secuencia principal + story

Cuando el cliente opere con presencia continua a partir de pocos temas semanales, cada tema se compone de una pieza principal y una story asociada. La story se programa para el día calendario siguiente a la pieza principal y amplifica el contenido sin duplicarlo. Registrar assets, horarios y estado de publicación de ambas salidas por separado.
