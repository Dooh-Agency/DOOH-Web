import type { D1Database } from "./planner";

// Notas del blog en preparación, sincronizadas desde la pestaña “Blog” de la
// grilla. Las publicadas y programadas no se guardan acá: salen del sitio
// (lib/blog-posts.ts), que es donde realmente viven.

export type BlogNoteInput = {
  source_key: string;
  title: string;
  slug?: string;
  status?: string;
  target_date?: string | null;
  owner?: string;
  axis?: string;
  sources?: string;
  dooh_input?: string;
  pieces?: string;
  draft_url?: string;
  notes?: string;
  sort_order?: number;
};

const statuses = new Set(["idea", "borrador", "revisar", "aprobado", "descartado"]);
const clean = (value: unknown, max = 4000) => String(value ?? "").trim().slice(0, max);

// Fecha objetivo como AAAA-MM-DD; cualquier otro formato se descarta.
function dateOnly(value: unknown) {
  const text = clean(value, 40);
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
}

// Opcional: se crea sola si no existe (cloudflare/migrations/0004_blog_notes.sql).
async function ensureTable(db: D1Database) {
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS blog_notes (
      source_key TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT NOT NULL DEFAULT '',
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
    )`,
  ).run();
}

// La pestaña es corta: cada sincronización reemplaza la lista completa, así
// las filas borradas o movidas en la grilla no quedan colgadas.
export async function replaceBlogNotes(db: D1Database, notes: BlogNoteInput[]) {
  if (!Array.isArray(notes)) throw new Error("Falta la lista de notas.");
  await ensureTable(db);
  const rows = notes.map((note, index) => {
    if (!note?.source_key || !clean(note.title)) throw new Error("Cada nota necesita source_key y título.");
    const status = clean(note.status, 40).toLowerCase();
    return db.prepare(
      `INSERT INTO blog_notes (source_key, title, slug, status, target_date, owner, axis, sources, dooh_input, pieces, draft_url, notes, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(
      clean(note.source_key, 200), clean(note.title, 300), clean(note.slug, 200).replace(/^\/?blog\//, "").replace(/\/$/, ""),
      statuses.has(status) ? status : "idea", dateOnly(note.target_date), clean(note.owner, 200), clean(note.axis, 100),
      clean(note.sources), clean(note.dooh_input), clean(note.pieces, 300), clean(note.draft_url, 500), clean(note.notes),
      Number(note.sort_order) || index,
    );
  });
  await db.batch([db.prepare("DELETE FROM blog_notes"), ...rows]);
  return rows.length;
}

export async function listBlogNotes(db: D1Database) {
  await ensureTable(db);
  const result = await db.prepare("SELECT * FROM blog_notes ORDER BY target_date IS NULL, target_date, sort_order").all<Record<string, unknown>>();
  return result.results;
}
