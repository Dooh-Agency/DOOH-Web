-- Notas del blog en preparación (pestaña “Blog” de la grilla), para la pestaña
-- “Blog” del planificador. Las publicadas y programadas salen del sitio.
-- Opcional: functions/_shared/blog.ts crea la tabla si no existe.
CREATE TABLE IF NOT EXISTS blog_notes (
  -- Fila de la grilla: spreadsheetId:sheetId:fila.
  source_key TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL DEFAULT '',
  -- idea, borrador, revisar, aprobado o descartado.
  status TEXT NOT NULL DEFAULT 'idea',
  target_date TEXT,
  owner TEXT NOT NULL DEFAULT '',
  axis TEXT NOT NULL DEFAULT '',
  sources TEXT NOT NULL DEFAULT '',
  dooh_input TEXT NOT NULL DEFAULT '',
  pieces TEXT NOT NULL DEFAULT '',
  draft_url TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
