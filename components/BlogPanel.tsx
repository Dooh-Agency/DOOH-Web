"use client";

import { useEffect, useMemo, useState } from "react";

// Pestaña “Blog” del planificador. Junta dos fuentes:
// - el sitio (/planificador-redes/notas-blog.json, armado al compilar): notas
//   publicadas y programadas, tal como están en lib/blog-posts.ts;
// - la pestaña “Blog” de la grilla (/api/planner/blog): notas en preparación.
// Se cruzan por slug: si una nota de la grilla ya está en el sitio, manda el sitio.

type SitePost = { slug: string; title: string; publishedAt: string; category: string };
type GridNote = {
  source_key: string; title: string; slug: string; status: string; target_date: string | null; owner: string;
  axis: string; sources: string; dooh_input: string; pieces: string; draft_url: string; notes: string;
};
export type BlogPiece = { piece: string; scheduled_at: string | null; status: string };

const statusLabel: Record<string, string> = { idea: "Idea", borrador: "Borrador", revisar: "Revisar", aprobado: "Aprobado", descartado: "Descartado" };

const todayInArgentina = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires" }).format(new Date());
const day = (date: string | null) => {
  if (!date) return "Sin fecha";
  const text = new Date(`${date.slice(0, 10)}T12:00:00`).toLocaleDateString("es-AR", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
  return text.charAt(0).toUpperCase() + text.slice(1);
};
const monthName = (month: string) => {
  const text = new Date(`${month}-01T12:00:00`).toLocaleDateString("es-AR", { month: "long" });
  return text.charAt(0).toUpperCase() + text.slice(1);
};
const nextMonth = (month: string) => {
  const [year, number] = month.split("-").map(Number);
  return number === 12 ? `${year + 1}-01` : `${year}-${String(number + 1).padStart(2, "0")}`;
};
const pieceCodes = (text: string) => text.split(/[\s,;·]+/).map((code) => code.trim().toUpperCase()).filter(Boolean);
const isLink = (text: string) => /^https?:\/\//.test(text.trim());

function Badge({ tone, children }: { tone: "dark" | "lime" | "muted" | "outline"; children: React.ReactNode }) {
  const color = tone === "dark" ? "bg-dooh-dark text-white" : tone === "lime" ? "bg-dooh-lime text-dooh-dark" : tone === "outline" ? "border border-dooh-dark/40 text-dooh-dark" : "bg-dooh-dark/10 text-dooh-dark/55";
  return <span className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] ${color}`}>{children}</span>;
}

export function BlogPanel({ pieces }: { pieces: BlogPiece[] }) {
  const [site, setSite] = useState<{ builtOn: string; posts: SitePost[] } | null>(null);
  const [notes, setNotes] = useState<GridNote[] | null>(null);
  const [failed, setFailed] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const read = (url: string) => fetch(url, { cache: "no-store" }).then(async (response) => {
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "No se pudieron leer las notas del blog.");
      return body;
    });
    read("/planificador-redes/notas-blog.json").then(setSite).catch((error: Error) => setFailed(error.message));
    // Sin la pestaña sincronizada se muestran igual las notas del sitio.
    read("/api/planner/blog").then((body) => setNotes(body.notes ?? [])).catch(() => setNotes([]));
  }, []);

  const view = useMemo(() => {
    if (!site || !notes) return null;
    const today = todayInArgentina();
    const bySlug = new Map(site.posts.map((post) => [post.slug, post]));
    const published = site.posts.filter((post) => post.publishedAt <= site.builtOn).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    const scheduled = site.posts.filter((post) => post.publishedAt > site.builtOn).sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    const preparing = notes.filter((note) => note.status !== "descartado" && !(note.slug && bySlug.has(note.slug)));
    const piecesByCode = new Map(pieces.map((piece) => [piece.piece.toUpperCase(), piece]));

    const warnings: string[] = [];
    // El sitio se vuelve a armar cada mañana: si una nota con fecha pasada sigue
    // como programada, el deploy del día no corrió.
    for (const post of scheduled) {
      if (post.publishedAt <= today) warnings.push(`“${post.title}” tenía que publicarse el ${day(post.publishedAt)} y el sitio todavía no se volvió a publicar. Revisá la tarea “Blog programado” en GitHub.`);
    }
    // Cadencia: una nota por mes.
    const thisMonth = today.slice(0, 7);
    for (const month of [thisMonth, nextMonth(thisMonth)]) {
      const inSite = site.posts.some((post) => post.publishedAt.startsWith(month));
      const planned = preparing.some((note) => note.target_date?.startsWith(month));
      if (!inSite && !planned) warnings.push(`No hay ninguna nota prevista para ${monthName(month)}.`);
      else if (!inSite && month === thisMonth) warnings.push(`Todavía no hay nota publicada ni programada en ${monthName(month)}.`);
    }
    // Piezas de redes que enlazan una nota que no va a estar publicada a tiempo.
    for (const note of notes) {
      if (note.status === "descartado") continue;
      const post = note.slug ? bySlug.get(note.slug) : undefined;
      for (const code of pieceCodes(note.pieces)) {
        const piece = piecesByCode.get(code);
        if (!piece || piece.status === "rejected" || !piece.scheduled_at) continue;
        const pieceDay = piece.scheduled_at.slice(0, 10);
        if (!post) warnings.push(`${code} sale el ${day(pieceDay)} y lleva a “${note.title}”, que todavía no está cargada en el sitio.`);
        else if (post.publishedAt > pieceDay) warnings.push(`${code} sale el ${day(pieceDay)}, antes que “${note.title}” (${day(post.publishedAt)}).`);
      }
      if (!post && note.target_date && note.target_date < today) warnings.push(`“${note.title}” tenía fecha objetivo ${day(note.target_date)} y no está publicada.`);
    }
    return { published, scheduled, preparing, warnings, bySlug };
  }, [site, notes, pieces]);

  if (failed) return <p className="mt-8 rounded-xl border border-dooh-dark/10 bg-white px-4 py-3 text-sm text-dooh-dark/70">{failed}</p>;
  if (!view) return <p className="py-16 text-center text-sm text-dooh-dark/55">Cargando notas del blog…</p>;

  const visiblePublished = showAll ? view.published : view.published.slice(0, 6);

  return (
    <section className="mt-8">
      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">Sitio web · una nota por mes</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tightest">Blog</h2>
      <p className="mt-2 max-w-2xl text-sm text-dooh-dark/60">
        Las notas en preparación se cargan en la pestaña “Blog” de la grilla. Las programadas y publicadas salen del sitio: una
        nota con fecha futura queda oculta y se publica sola a las 6:05 de ese día.
      </p>

      {view.warnings.length > 0 && (
        <div className="mt-5 max-w-3xl rounded-2xl border border-dooh-dark/15 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-dooh-dark/45">Para revisar</p>
          <ul className="mt-3 space-y-2 text-sm text-dooh-dark/80">
            {view.warnings.map((warning) => <li key={warning} className="flex gap-2"><span aria-hidden="true">⚠️</span><span>{warning}</span></li>)}
          </ul>
        </div>
      )}

      <h3 className="mt-8 text-lg font-bold">En preparación</h3>
      {view.preparing.length === 0
        ? <p className="mt-2 text-sm text-dooh-dark/55">No hay notas en preparación. Cargalas en la pestaña “Blog” de la grilla.</p>
        : <div className="mt-3 grid gap-4 md:grid-cols-2">{view.preparing.map((note) => {
          const checks = [
            { label: "Aporte de DOOH", done: Boolean(note.dooh_input) },
            { label: "Borrador", done: Boolean(note.draft_url) },
            { label: "Aprobada", done: note.status === "aprobado" },
            { label: "Cargada en el sitio", done: false },
          ];
          return (
            <article key={note.source_key} className="rounded-2xl border border-dooh-dark/10 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="font-bold">{note.title}</p>
                <Badge tone={note.status === "aprobado" ? "lime" : note.status === "revisar" ? "outline" : "muted"}>{statusLabel[note.status] ?? note.status}</Badge>
              </div>
              <p className="mt-1 text-xs text-dooh-dark/55">Fecha objetivo: {day(note.target_date)}{note.owner ? ` · ${note.owner}` : ""}{note.axis ? ` · ${note.axis}` : ""}</p>
              <ul className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold">
                {checks.map((check) => <li key={check.label} className={`rounded-full px-2.5 py-1 ${check.done ? "bg-dooh-lime text-dooh-dark" : "bg-dooh-dark/5 text-dooh-dark/50"}`}>{check.done ? "✓" : "○"} {check.label}</li>)}
              </ul>
              {note.pieces && <p className="mt-3 text-xs text-dooh-dark/70"><span className="font-bold">Piezas de redes:</span> {note.pieces}</p>}
              {note.slug && <p className="mt-1 text-xs text-dooh-dark/70"><span className="font-bold">Slug:</span> {note.slug} (todavía no está en el sitio)</p>}
              {note.notes && <p className="mt-2 whitespace-pre-line text-xs leading-snug text-dooh-dark/60">{note.notes}</p>}
              {isLink(note.draft_url) && <a href={note.draft_url} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-full border border-dooh-dark/15 px-4 py-2 text-xs font-bold hover:bg-dooh-lime">Abrir borrador</a>}
            </article>
          );
        })}</div>}

      <h3 className="mt-8 text-lg font-bold">Programadas</h3>
      {view.scheduled.length === 0
        ? <p className="mt-2 text-sm text-dooh-dark/55">No hay notas programadas en el sitio.</p>
        : <ul className="mt-3 grid gap-3 md:grid-cols-2">{view.scheduled.map((post) => (
          <li key={post.slug} className="flex items-start justify-between gap-3 rounded-2xl border border-dooh-dark/10 bg-white p-5">
            <div><p className="font-bold">{post.title}</p><p className="mt-1 text-xs text-dooh-dark/55">Sale el {day(post.publishedAt)} · {post.category}</p></div>
            <Badge tone="dark">Programada</Badge>
          </li>
        ))}</ul>}

      <h3 className="mt-8 text-lg font-bold">Publicadas</h3>
      <ul className="mt-3 divide-y divide-dooh-dark/10 rounded-2xl border border-dooh-dark/10 bg-white">
        {visiblePublished.map((post) => (
          <li key={post.slug} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
            <div className="min-w-0"><p className="truncate text-sm font-bold">{post.title}</p><p className="text-xs text-dooh-dark/55">{day(post.publishedAt)} · {post.category}</p></div>
            <a href={`/blog/${encodeURIComponent(post.slug)}`} target="_blank" rel="noreferrer" className="shrink-0 text-xs font-bold underline">Ver nota</a>
          </li>
        ))}
      </ul>
      {view.published.length > 6 && <button type="button" onClick={() => setShowAll((current) => !current)} className="mt-3 rounded-full border border-dooh-dark/15 bg-white px-4 py-2 text-xs font-bold hover:bg-dooh-lime">{showAll ? "Ver menos" : `Ver todas (${view.published.length})`}</button>}
    </section>
  );
}
