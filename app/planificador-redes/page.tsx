"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Channel = "instagram" | "linkedin" | "both";
type PlannerStatus = "draft" | "review" | "changes_requested" | "approved" | "rejected" | "scheduled" | "published";
type ReviewAction = "approve" | "request_changes";

type Asset = {
  id: string;
  asset_type: "image" | "video";
  alt_text: string;
  sort_order: number;
  previewUrl: string;
};

type Item = {
  id: string;
  piece: string;
  project: string;
  title: string;
  channel: Channel;
  format: string;
  objective: string;
  caption_es: string;
  caption_en: string;
  call_to_action: string;
  creative_direction: string;
  canva_url: string | null;
  previewUrl: string;
  scheduled_at: string | null;
  status: PlannerStatus;
  publish_requested: boolean;
  published_url: string | null;
  review_notes: string;
  sort_order: number;
  assets: Asset[];
};

const labels: Record<PlannerStatus, string> = {
  draft: "Borrador", review: "En revisión", changes_requested: "Cambios solicitados", approved: "Aprobado", rejected: "Descartado", scheduled: "Programado", published: "Publicado",
};

function story(item: Item) { return item.format.toLowerCase().includes("story"); }
function reel(item: Item) { return item.format.toLowerCase().includes("reel"); }
function carousel(item: Item) { return item.format.toLowerCase().includes("carrusel"); }
function vertical(item: Item) { return story(item) || reel(item); }
function day(value: string | null) {
  if (!value) return "Sin fecha asignada";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "Sin fecha asignada" : new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "short" }).format(parsed);
}
function compactCopy(copy: string) { return copy.replace(/\n{2,}/g, "\n").trim(); }
function released(item: Item) { return item.status === "scheduled" || item.status === "published"; }
// Lo que necesita una pieza para salir: el mismo criterio que la regla de publicación de la grilla.
function readiness(item: Item) {
  return [
    { label: "Copy", done: Boolean(item.caption_es.trim()) && !item.caption_es.includes("[REVISAR]") },
    { label: "Gráfica", done: item.assets.length > 0 || Boolean(item.previewUrl) },
    { label: "Fecha", done: Boolean(item.scheduled_at) },
    { label: "Aprobada", done: item.status === "approved" || released(item) },
    { label: "Programar", done: item.publish_requested || released(item) },
  ];
}
function readinessSummary(item: Item) {
  if (item.status === "published") return "Publicada";
  if (item.status === "rejected") return "Rechazada";
  const missing = readiness(item).filter((check) => !check.done).map((check) => check.label.toLowerCase());
  return missing.length ? `Falta: ${missing.join(", ")}` : "Lista para salir";
}

function Status({ status }: { status: PlannerStatus }) {
  const color = status === "approved" ? "bg-dooh-lime text-dooh-dark" : status === "scheduled" || status === "published" ? "bg-dooh-dark text-white" : status === "changes_requested" ? "border border-dooh-dark/40 text-dooh-dark" : "bg-dooh-dark/10 text-dooh-dark/55";
  return <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] ${color}`}>{labels[status]}</span>;
}

function Readiness({ item }: { item: Item }) {
  return <ul className="flex flex-wrap gap-2">{readiness(item).map((check) => <li key={check.label} className={`rounded-full px-3 py-1.5 text-xs font-bold ${check.done ? "bg-dooh-lime text-dooh-dark" : "border border-dashed border-dooh-dark/30 text-dooh-dark/55"}`}>{check.done ? "✓" : "○"} {check.label}</li>)}</ul>;
}

function ReviewPanel({ item, onReview }: { item: Item; onReview: (action: ReviewAction, comment: string) => Promise<string | null> }) {
  const [asking, setAsking] = useState(false);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState<ReviewAction | null>(null);
  const [error, setError] = useState("");

  async function send(action: ReviewAction) {
    setSending(action);
    setError("");
    const failure = await onReview(action, comment.trim());
    setSending(null);
    if (failure) setError(failure);
  }

  return <div className="rounded-2xl border border-dooh-dark/10 bg-[#f7f8f8] p-4">
    {asking
      ? <form onSubmit={(event) => { event.preventDefault(); void send("request_changes"); }}>
          <label className="block text-xs font-bold">¿Qué hay que cambiar?<textarea required autoFocus value={comment} onChange={(event) => setComment(event.target.value)} rows={3} className="mt-2 w-full rounded-xl border border-dooh-dark/20 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-dooh-dark" placeholder="Por ejemplo: acortar el título de la placa 2 y usar otra foto." /></label>
          <div className="mt-3 flex flex-wrap gap-2"><button disabled={sending !== null || !comment.trim()} className="rounded-full bg-dooh-dark px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{sending ? "Enviando…" : "Enviar pedido"}</button><button type="button" onClick={() => { setAsking(false); setError(""); }} className="rounded-full border border-dooh-dark/15 bg-white px-5 py-2.5 text-sm font-bold">Cancelar</button></div>
        </form>
      : <div className="flex flex-wrap items-center gap-2">
          {item.status !== "approved" && <button type="button" disabled={sending !== null} onClick={() => void send("approve")} className="rounded-full bg-dooh-lime px-5 py-2.5 text-sm font-bold text-dooh-dark disabled:opacity-50">{sending === "approve" ? "Aprobando…" : "Aprobar"}</button>}
          <button type="button" disabled={sending !== null} onClick={() => setAsking(true)} className="rounded-full border border-dooh-dark/15 bg-white px-5 py-2.5 text-sm font-bold disabled:opacity-50">Pedir cambios</button>
          <p className="text-xs text-dooh-dark/55">{item.status === "approved" ? "Ya está aprobada. Si algo cambió, pedí cambios para volver a revisarla." : "Se guarda en la grilla con tu email y la fecha."}</p>
        </div>}
    {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
  </div>;
}

export default function PlanificadorRedes() {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [tab, setTab] = useState<"instagram" | "linkedin">("instagram");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewerEmail, setViewerEmail] = useState("");

  // Cloudflare Access protege la página y la API: la sesión viaja en su cookie.
  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/planner/items", { cache: "no-store" }).catch(() => null);
    if (!response?.ok) {
      setNotice(response?.status === 401 ? "Tu sesión venció. Recargá la página para volver a ingresar." : "No fue posible leer el planificador. Probá de nuevo en unos minutos.");
      setLoading(false);
      return;
    }
    const result = await response.json() as { viewer: string; items: Item[] };
    setViewerEmail(result.viewer);
    setItems(result.items);
    setSelected((current) => current ? result.items.find((item) => item.id === current.id) ?? null : null);
    setNotice(result.items.length ? "" : "Todavía no hay piezas sincronizadas desde la grilla.");
    setLoading(false);
  }, []);

  useEffect(() => { void load(); }, [load]);

  // Devuelve un mensaje de error, o null si la decisión quedó guardada en la grilla.
  async function review(item: Item, action: ReviewAction, comment: string) {
    try {
      const response = await fetch("/api/planner/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: item.id, action, comment }),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!result.ok) return result.error ?? "No fue posible guardar la decisión.";
    } catch {
      return "No fue posible conectar con la grilla. Probá de nuevo.";
    }
    await load();
    return null;
  }

  const stories = useMemo(() => items.filter(story), [items]);
  const instagram = useMemo(() => items.filter((item) => !story(item) && item.channel !== "linkedin"), [items]);
  const linkedin = useMemo(() => items.filter((item) => !story(item) && item.channel !== "instagram"), [items]);

  function Media({ asset, alt, poster = "", controls = true, contain = false }: { asset: Asset; alt: string; poster?: string; controls?: boolean; contain?: boolean }) {
    if (!asset.previewUrl) return <div className="flex h-full w-full items-center justify-center bg-[#e9ecee] p-4 text-center text-xs text-dooh-dark/50">Vista previa no disponible.</div>;
    return asset.asset_type === "video" ? <VideoPreview source={asset.previewUrl} poster={poster} controls={controls} /> : <img src={asset.previewUrl} alt={alt} className={`h-full w-full ${contain ? "object-contain" : "object-cover"}`} />;
  }
  function VideoPreview({ source, poster = "", controls = true }: { source: string; poster?: string; controls?: boolean }) {
    const video = useRef<HTMLVideoElement>(null);
    const previewFrameSet = useRef(false);
    function showPreviewFrame() {
      const element = video.current;
      if (!element || previewFrameSet.current || element.currentTime > 0 || !Number.isFinite(element.duration) || element.duration <= 0) return;
      // Evita la pantalla negra habitual del primer fotograma sin iniciar la reproducción.
      previewFrameSet.current = true;
      element.currentTime = Math.min(1, Math.max(0.15, element.duration * 0.1));
    }
    return <video ref={video} controls={controls} playsInline muted preload="metadata" className="h-full w-full bg-black object-contain" src={source} poster={poster || undefined} onLoadedMetadata={showPreviewFrame} onCanPlay={showPreviewFrame} />;
  }
  function Preview({ item, controls = false }: { item: Item; controls?: boolean }) {
    const asset = item.assets[0];
    // Una portada no reemplaza al video: se usa como poster para conservar el play.
    if (asset?.asset_type === "video") return <Media asset={asset} alt={`Vista previa de ${item.project}`} poster={item.previewUrl} controls={controls} />;
    if (item.previewUrl) return <img src={item.previewUrl} alt={`Vista previa de ${item.project}`} className="h-full w-full object-cover" />;
    if (asset) return <Media asset={asset} alt={`Vista previa de ${item.project}`} controls={controls} />;
    return <div className="flex h-full w-full flex-col justify-between bg-[#e9ecee] p-5 text-dooh-dark/55"><span className="text-[10px] font-bold uppercase tracking-[.16em]">Sin asset</span><p className="text-base leading-tight">{item.title}</p></div>;
  }
  function CollectionPreview({ item, controls = false }: { item: Item; controls?: boolean }) {
    const assets = item.assets;
    if (!carousel(item) || assets.length < 2) return <Preview item={item} controls={controls} />;
    const visibleAssets = assets.slice(0, 4);
    return <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-px bg-white/20">{visibleAssets.map((asset, index) => <div key={asset.id} className="relative min-h-0 overflow-hidden bg-[#242426]"><Media asset={asset} alt={`${item.project} · pieza ${index + 1}`} controls={false} />{index === 3 && assets.length > 4 && <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-bold text-white">+{assets.length - 4}</span>}</div>)}</div>;
  }
  function Card({ item }: { item: Item }) {
    const aspect = vertical(item) ? "aspect-[9/16]" : "aspect-square";
    return <button type="button" onClick={() => setSelected(item)} className="group overflow-hidden bg-[#e9ecee] text-left focus:outline-none focus:ring-4 focus:ring-dooh-lime"><div className={`relative ${aspect}`}><Preview item={item} /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-white"><p className="text-[10px] font-bold uppercase tracking-[.12em]">{item.project}</p><p className="mt-0.5 text-[9px] text-white/70">{carousel(item) ? `${item.assets.length} piezas · ` : ""}{day(item.scheduled_at)} · Ver propuesta</p><p className="mt-1 text-[9px] font-bold text-dooh-lime">{readinessSummary(item)}</p></div></div></button>;
  }
  function Detail({ item }: { item: Item }) {
    const media = item.assets;
    const previewAspect = vertical(item) ? "aspect-[9/16] w-[min(58vw,16rem)]" : "aspect-square w-[min(58vw,20rem)]";
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-dooh-dark/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><article data-lenis-prevent className="planner-modal-scroll relative h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-scroll overscroll-contain rounded-3xl bg-white p-6 pr-4 shadow-2xl md:p-10 md:pr-8"><button type="button" onClick={() => setSelected(null)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-dooh-dark/15 text-xl hover:bg-dooh-lime" aria-label="Cerrar">×</button><div className="pr-12"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-dooh-dark/45">{item.format}</p><div className="mt-3 flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-2xl font-bold tracking-tightest md:text-4xl">{item.project} — {item.title}</h2><p className="mt-2 text-sm text-dooh-dark/55">Salida propuesta: {day(item.scheduled_at)}</p></div><Status status={item.status} /></div></div><section className="mt-7"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-dooh-dark/45">Para salir</p><div className="mt-3"><Readiness item={item} /></div>{item.status === "published" && item.published_url && <a href={item.published_url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-bold underline">Ver publicación</a>}{!released(item) && <div className="mt-4"><ReviewPanel key={item.id} item={item} onReview={(action, comment) => review(item, action, comment)} /></div>}</section><section className="mt-7"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-dooh-dark/45">Piezas de la publicación</p><p className="text-xs text-dooh-dark/55">{media.length ? `${media.length} ${media.length === 1 ? "pieza" : "piezas"}` : "Sin piezas"}</p></div>{media.length > 0 && <div className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl bg-dooh-dark p-2 pb-4">{media.map((asset, index) => <div key={asset.id} className={`shrink-0 snap-start overflow-hidden rounded-xl bg-black ${previewAspect}`}><Media asset={asset} alt={`${item.project} · pieza ${index + 1}`} poster={index === 0 ? item.previewUrl : ""} contain /></div>)}</div>}<p className="mt-3 text-xs text-dooh-dark/55">Deslizá horizontalmente para revisar todas las piezas y hacia abajo para ver el contenido de la publicación.</p></section><section className="mt-7 border-t border-dooh-dark/10 pt-6"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-dooh-dark/45">Información de la grilla</p><p className="mt-2 text-sm text-dooh-dark/60">Los textos se editan en la grilla semanal; la aprobación y los pedidos de cambio se guardan ahí automáticamente.</p>{item.canva_url && <a href={item.canva_url} target="_blank" rel="noreferrer" className="mt-3 inline-block rounded-full border border-dooh-dark/15 px-4 py-2 text-xs font-bold hover:bg-dooh-lime">Abrir diseño en Canva</a>}<div className="mt-5 grid gap-4 md:grid-cols-2"><div><p className="text-xs font-bold">Estado</p><p className="mt-1 text-sm text-dooh-dark/70">{labels[item.status]}</p></div><div><p className="text-xs font-bold">Call to action</p><p className="mt-1 text-sm text-dooh-dark/70">{item.call_to_action || "Sin definir"}</p></div><div className="md:col-span-2"><p className="text-xs font-bold">Copy ES</p><p className="mt-1 whitespace-pre-line text-sm leading-snug text-dooh-dark/70">{compactCopy(item.caption_es) || "Sin definir"}</p></div><div className="md:col-span-2"><p className="text-xs font-bold">Copy EN</p><p className="mt-1 whitespace-pre-line text-sm leading-snug text-dooh-dark/70">{compactCopy(item.caption_en) || "Sin definir"}</p></div>{item.review_notes && <div className="md:col-span-2"><p className="text-xs font-bold">Historial de revisión</p><p className="mt-1 whitespace-pre-line text-sm leading-snug text-dooh-dark/70">{item.review_notes}</p></div>}<div className="md:col-span-2"><p className="text-xs font-bold">Dirección visual</p><p className="mt-1 whitespace-pre-line text-sm leading-snug text-dooh-dark/70">{compactCopy(item.creative_direction) || "Sin definir"}</p></div></div></section></article></div>;
  }

  return <main className="min-h-screen bg-[#f2f3f4] px-5 py-8 font-sans text-dooh-dark md:px-10 md:py-12"><div className="mx-auto max-w-6xl"><header className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">DOOH · Interno</p><h1 className="mt-1 text-2xl font-bold tracking-tightest">Planificador de redes</h1>{viewerEmail && <p className="mt-1 text-xs text-dooh-dark/55">Sesión: {viewerEmail}</p>}</div><div className="flex gap-2"><button type="button" onClick={() => void load()} className="rounded-full border border-dooh-dark/15 bg-white px-4 py-2 text-xs font-bold">Actualizar</button><a href="/cdn-cgi/access/logout" className="rounded-full border border-dooh-dark/15 bg-white px-4 py-2 text-xs font-bold">Salir</a></div></header>{notice && <p className="mb-5 rounded-xl border border-dooh-dark/10 bg-white px-4 py-3 text-sm text-dooh-dark/70">{notice}</p>}{loading ? <p className="py-16 text-center text-sm text-dooh-dark/55">Cargando planificador…</p> : <><div className="inline-flex rounded-full border border-dooh-dark/15 bg-white p-1" role="tablist"><button role="tab" aria-selected={tab === "instagram"} onClick={() => setTab("instagram")} className={`rounded-full px-5 py-2.5 text-sm font-bold ${tab === "instagram" ? "bg-dooh-dark text-white" : "text-dooh-dark/55"}`}>Instagram</button><button role="tab" aria-selected={tab === "linkedin"} onClick={() => setTab("linkedin")} className={`rounded-full px-5 py-2.5 text-sm font-bold ${tab === "linkedin" ? "bg-dooh-dark text-white" : "text-dooh-dark/55"}`}>LinkedIn</button></div>{tab === "instagram" ? <section className="mt-8"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">Secuencia +24 h</p><h2 className="mt-1 text-2xl font-bold tracking-tightest">Stories</h2></div><p className="text-xs text-dooh-dark/55">Desde la grilla sincronizada.</p></div><div className="mt-4 flex gap-4 overflow-x-auto pb-5">{stories.map((item) => <article key={item.id} className="w-[11.5rem] shrink-0 overflow-hidden rounded-2xl border border-dooh-dark/10 bg-white"><div className="aspect-[9/16] bg-[#e9ecee]"><Preview item={item} controls /></div><button type="button" onClick={() => setSelected(item)} className="block w-full p-3 text-left focus:outline-none focus:ring-4 focus:ring-inset focus:ring-dooh-lime"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-dooh-dark/45">Story IG</p><p className="mt-2 text-sm font-bold">{item.project}</p><p className="mt-1 text-xs text-dooh-dark/55">{day(item.scheduled_at)} · Ver detalle</p><p className="mt-2 text-[11px] font-bold text-dooh-dark/70">{readinessSummary(item)}</p></button></article>)}</div><div className="mt-8 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">Preview visual</p><h2 className="mt-1 text-2xl font-bold tracking-tightest">Instagram feed</h2></div><span className="rounded-full border border-dooh-dark/15 px-3 py-1.5 text-xs text-dooh-dark/60">@dooh.agency</span></div><div className="mt-4 overflow-hidden rounded-[2rem] border-[10px] border-dooh-dark bg-dooh-dark shadow-[0_22px_70px_rgba(5,5,7,.2)]"><div className="flex items-center gap-2 border-b border-white/10 px-5 py-4"><span className="h-7 w-7 rounded-full bg-dooh-lime" /><span className="text-xs font-bold text-white">dooh.agency</span></div><div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">{instagram.map((item) => <Card key={item.id} item={item} />)}{instagram.length === 0 && <div className="col-span-full p-10 text-center text-sm text-white/70">No hay piezas de Instagram en la grilla.</div>}</div></div></section> : <section className="mt-8"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">Cola editorial</p><h2 className="mt-1 text-2xl font-bold tracking-tightest">LinkedIn</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{linkedin.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item)} className="overflow-hidden rounded-2xl border border-dooh-dark/10 bg-white text-left"><div className={`${vertical(item) ? "aspect-[9/16]" : "aspect-square"} bg-[#e9ecee]`}><CollectionPreview item={item} /></div><div className="p-4"><div className="flex items-start justify-between gap-3"><p className="text-sm font-bold">{item.project}</p><Status status={item.status} /></div><p className="mt-2 text-xs text-dooh-dark/55">{carousel(item) ? `${item.assets.length} piezas · ` : ""}{day(item.scheduled_at)} · Ver propuesta</p><p className="mt-2 text-[11px] font-bold text-dooh-dark/70">{readinessSummary(item)}</p></div></button>)}</div></section>}</>}</div>{selected && <Detail item={selected} />}</main>;
}
