"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

type Channel = "instagram" | "linkedin" | "both";
type PlannerStatus = "draft" | "review" | "approved" | "rejected" | "scheduled" | "published";
type Session = { access_token: string; refresh_token?: string };
type AuthUser = { email?: string };

type Asset = {
  id: string;
  asset_type: "image" | "video";
  storage_path: string;
  source_url: string | null;
  alt_text: string;
  sort_order: number;
  previewUrl?: string;
};

type Item = {
  id: string;
  project: string;
  title: string;
  channel: Channel;
  format: string;
  objective: string;
  caption_es: string;
  caption_en: string;
  call_to_action: string;
  creative_direction: string;
  asset_url: string | null;
  preview_path: string | null;
  previewUrl?: string;
  scheduled_at: string | null;
  status: PlannerStatus;
  sort_order: number;
  content_item_assets: Asset[];
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const storageKey = "dooh-planner-session";

const labels: Record<PlannerStatus, string> = {
  draft: "Borrador", review: "En revisión", approved: "Aprobado", rejected: "Rechazado", scheduled: "Programado", published: "Publicado",
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
function drivePreviewUrl(source: string | null) {
  if (!source) return "";
  const match = source.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : "";
}
function compactCopy(copy: string) { return copy.replace(/\n{2,}/g, "\n").trim(); }

function Status({ status }: { status: PlannerStatus }) {
  const color = status === "approved" ? "bg-dooh-lime text-dooh-dark" : status === "scheduled" || status === "published" ? "bg-dooh-dark text-white" : "bg-dooh-dark/10 text-dooh-dark/55";
  return <span className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] ${color}`}>{labels[status]}</span>;
}

export default function PlanificadorRedes() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Item | null>(null);
  const [tab, setTab] = useState<"instagram" | "linkedin">("instagram");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewerEmail, setViewerEmail] = useState("");

  const headers = useCallback((token: string, extra: HeadersInit = {}) => ({ apikey: key ?? "", Authorization: `Bearer ${token}`, ...extra }), []);

  const signedStoragePath = useCallback(async (storagePath: string, token: string) => {
    const response = await fetch(`${url}/storage/v1/object/sign/planner-assets/${storagePath}`, {
      method: "POST", headers: headers(token, { "Content-Type": "application/json" }), body: JSON.stringify({ expiresIn: 3600 }),
    });
    if (!response.ok) return "";
    const result = await response.json() as { signedURL?: string; signedUrl?: string };
    const path = result.signedURL ?? result.signedUrl ?? "";
    return path ? `${url}/storage/v1${path}` : "";
  }, [headers]);

  const signedUrl = useCallback(async (asset: Asset, token: string) => {
    if (asset.storage_path.startsWith("drive://")) return asset.source_url ?? "";
    return (await signedStoragePath(asset.storage_path, token)) || asset.source_url || "";
  }, [signedStoragePath]);

  const renewSession = useCallback(async (current: Session) => {
    if (!url || !key || !current.refresh_token) return null;
    const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: current.refresh_token }),
    });
    if (!response.ok) return null;
    const next = await response.json() as Session;
    if (!next.access_token) return null;
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setSession(next);
    return next;
  }, []);

  const load = useCallback(async (active: Session, retry = true) => {
    if (!url || !key) { setNotice("Faltan las variables de Supabase en .env.local."); setLoading(false); return; }
    setLoading(true);
    const response = await fetch(`${url}/rest/v1/content_items?select=*,content_item_assets(*)&order=sort_order.desc,scheduled_at.desc`, { headers: headers(active.access_token) });
    if (!response.ok) {
      if (response.status === 401 && retry) {
        const renewed = await renewSession(active);
        if (renewed) return load(renewed, false);
      }
      window.localStorage.removeItem(storageKey);
      setSession(null);
      setNotice(response.status === 401 ? "La sesión venció. Pedí un nuevo enlace de acceso." : "No fue posible leer el planificador. Verificá que tu email esté habilitado.");
      setLoading(false);
      return;
    }
    const raw = await response.json() as Item[];
    let activeEmail = "";
    const userResponse = await fetch(`${url}/auth/v1/user`, { headers: headers(active.access_token) });
    if (userResponse.ok) {
      const user = await userResponse.json() as AuthUser;
      activeEmail = user.email ?? "";
      setViewerEmail(activeEmail);
    }
    const next = await Promise.all(raw.map(async (item) => ({
      ...item,
      previewUrl: item.preview_path ? await signedStoragePath(item.preview_path, active.access_token) : "",
      content_item_assets: await Promise.all((item.content_item_assets ?? []).sort((a, b) => a.sort_order - b.sort_order).map(async (asset) => ({ ...asset, previewUrl: await signedUrl(asset, active.access_token) }))),
    })));
    setItems(next);
    setNotice(next.length ? "" : `No hay piezas visibles para ${activeEmail || "esta cuenta"}. Si la grilla ya sincronizó 8 piezas, agregá exactamente este email a team_members y volvé a ingresar.`);
    setLoading(false);
  }, [headers, renewSession, signedUrl]);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");
    const authError = new URLSearchParams(window.location.search).get("auth_error");
    const fromLink = accessToken ? { access_token: accessToken, refresh_token: refreshToken ?? undefined } : null;
    if (fromLink) { window.localStorage.setItem(storageKey, JSON.stringify(fromLink)); window.history.replaceState({}, document.title, window.location.pathname); }
    const stored = window.localStorage.getItem(storageKey);
    const active = fromLink ?? (stored ? JSON.parse(stored) as Session : null);
    setSession(active);
    if (active) void load(active);
    else {
      setLoading(false);
      if (authError) setNotice(authError === "otp_expired" ? "El enlace de acceso venció o ya fue utilizado. Si esta es tu computadora habitual, recargá: la sesión debería conservarse. Si no, pedí un único enlace nuevo." : "No fue posible validar el enlace de acceso. Pedí uno nuevo.");
    }
  }, [load]);

  async function sendMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url || !key) { setNotice("Faltan las variables de Supabase en .env.local."); return; }
    setLoading(true);
    const redirectTo = `${window.location.origin}/planificador-redes`;
    const response = await fetch(`${url}/auth/v1/otp`, {
      method: "POST", headers: { apikey: key, "Content-Type": "application/json" },
      body: JSON.stringify({ email, create_user: true, email_redirect_to: redirectTo, gotrue_meta_security: {} }),
    });
    setLoading(false);
    if (response.ok) { setNotice("Te enviamos un enlace de acceso. Abrilo en este navegador."); return; }
    const error = await response.json().catch(() => null) as { msg?: string; message?: string } | null;
    const detail = error?.msg ?? error?.message ?? `Error ${response.status}`;
    setNotice(response.status === 429 ? "Supabase limitó temporalmente el envío de emails. Esperá 60 segundos antes de pedir otro enlace." : `No fue posible enviar el enlace: ${detail}`);
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
  function DriveAssetPreview({ source, alt, controls = false }: { source: string; alt: string; controls?: boolean }) {
    const [kind, setKind] = useState<"image" | "video">("image");
    return kind === "image"
      ? <img src={source} alt={alt} className="h-full w-full object-cover" onError={() => setKind("video")} />
      : <VideoPreview source={source} controls={controls} />;
  }
  function Preview({ item, controls = false }: { item: Item; controls?: boolean }) {
    const asset = item.content_item_assets[0];
    const drivePreview = drivePreviewUrl(item.asset_url);
    // Una portada no reemplaza al video: se usa como poster para conservar el play.
    if (asset?.asset_type === "video") return <Media asset={asset} alt={`Vista previa de ${item.project}`} poster={item.previewUrl} controls={controls} />;
    if (item.previewUrl) return <img src={item.previewUrl} alt={`Vista previa de ${item.project}`} className="h-full w-full object-cover" />;
    if (asset) return <Media asset={asset} alt={`Vista previa de ${item.project}`} controls={controls} />;
    if (drivePreview) return <DriveAssetPreview source={drivePreview} alt={`Vista previa de ${item.project}`} controls={controls} />;
    return <div className="flex h-full w-full flex-col justify-between bg-[#e9ecee] p-5 text-dooh-dark/55"><span className="text-[10px] font-bold uppercase tracking-[.16em]">Sin asset</span><p className="text-base leading-tight">{item.title}</p></div>;
  }
  function CollectionPreview({ item, controls = false }: { item: Item; controls?: boolean }) {
    const assets = item.content_item_assets;
    if (!carousel(item) || assets.length < 2) return <Preview item={item} controls={controls} />;
    const visibleAssets = assets.slice(0, 4);
    return <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-px bg-white/20">{visibleAssets.map((asset, index) => <div key={asset.id} className="relative min-h-0 overflow-hidden bg-[#242426]"><Media asset={asset} alt={`${item.project} · pieza ${index + 1}`} controls={false} />{index === 3 && assets.length > 4 && <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-bold text-white">+{assets.length - 4}</span>}</div>)}</div>;
  }
  function Card({ item }: { item: Item }) {
    const aspect = vertical(item) ? "aspect-[9/16]" : "aspect-square";
    return <button type="button" onClick={() => setSelected(item)} className="group overflow-hidden bg-[#e9ecee] text-left focus:outline-none focus:ring-4 focus:ring-dooh-lime"><div className={`relative ${aspect}`}><Preview item={item} /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 text-white"><p className="text-[10px] font-bold uppercase tracking-[.12em]">{item.project}</p><p className="mt-0.5 text-[9px] text-white/70">{carousel(item) ? `${item.content_item_assets.length} piezas · ` : ""}{day(item.scheduled_at)} · Ver propuesta</p></div></div></button>;
  }
  function Detail({ item }: { item: Item }) {
    const media = item.content_item_assets;
    const previewAspect = vertical(item) ? "aspect-[9/16] w-[min(58vw,16rem)]" : "aspect-square w-[min(58vw,20rem)]";
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-dooh-dark/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true"><article data-lenis-prevent className="planner-modal-scroll relative h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-scroll overscroll-contain rounded-3xl bg-white p-6 pr-4 shadow-2xl md:p-10 md:pr-8"><button type="button" onClick={() => setSelected(null)} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-dooh-dark/15 text-xl hover:bg-dooh-lime" aria-label="Cerrar">×</button><div className="pr-12"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-dooh-dark/45">{item.format}</p><div className="mt-3 flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-2xl font-bold tracking-tightest md:text-4xl">{item.project} — {item.title}</h2><p className="mt-2 text-sm text-dooh-dark/55">Salida propuesta: {day(item.scheduled_at)}</p></div><Status status={item.status} /></div></div><section className="mt-7"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-dooh-dark/45">Piezas de la publicación</p><p className="text-xs text-dooh-dark/55">{media.length ? `${media.length} ${media.length === 1 ? "pieza" : "piezas"}` : "Sin piezas"}</p></div>{media.length > 0 && <div className="mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl bg-dooh-dark p-2 pb-4">{media.map((asset, index) => <div key={asset.id} className={`shrink-0 snap-start overflow-hidden rounded-xl bg-black ${previewAspect}`}><Media asset={asset} alt={`${item.project} · pieza ${index + 1}`} poster={index === 0 ? item.previewUrl : ""} contain /></div>)}</div>}<p className="mt-3 text-xs text-dooh-dark/55">Deslizá horizontalmente para revisar todas las piezas y hacia abajo para ver el contenido de la publicación.</p></section><section className="mt-7 border-t border-dooh-dark/10 pt-6"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-dooh-dark/45">Información de la grilla</p><p className="mt-2 text-sm text-dooh-dark/60">Esta previsualización es de solo lectura. Editá la grilla semanal y sincronizá con Supabase para actualizarla.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><div><p className="text-xs font-bold">Estado</p><p className="mt-1 text-sm text-dooh-dark/70">{labels[item.status]}</p></div><div><p className="text-xs font-bold">Call to action</p><p className="mt-1 text-sm text-dooh-dark/70">{item.call_to_action || "Sin definir"}</p></div><div className="md:col-span-2"><p className="text-xs font-bold">Copy ES</p><p className="mt-1 whitespace-pre-line text-sm leading-snug text-dooh-dark/70">{compactCopy(item.caption_es) || "Sin definir"}</p></div><div className="md:col-span-2"><p className="text-xs font-bold">Copy EN</p><p className="mt-1 whitespace-pre-line text-sm leading-snug text-dooh-dark/70">{compactCopy(item.caption_en) || "Sin definir"}</p></div><div className="md:col-span-2"><p className="text-xs font-bold">Dirección visual</p><p className="mt-1 whitespace-pre-line text-sm leading-snug text-dooh-dark/70">{compactCopy(item.creative_direction) || "Sin definir"}</p></div></div></section></article></div>;
  }

  if (!session) return <main className="flex min-h-screen items-center justify-center bg-[#f2f3f4] p-5 font-sans text-dooh-dark"><form onSubmit={sendMagicLink} className="w-full max-w-md rounded-3xl border border-dooh-dark/10 bg-white p-7 shadow-xl"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-dooh-dark/45">DOOH · Interno</p><h1 className="mt-2 text-3xl font-bold tracking-tightest">Planificador de redes</h1><p className="mt-3 text-sm leading-relaxed text-dooh-dark/65">Ingresá con un email habilitado del equipo. La sesión queda guardada y se renueva en este navegador.</p><label className="mt-6 block text-xs font-bold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-dooh-dark/20 px-4 py-3 outline-none focus:border-dooh-dark" placeholder="nombre@dooh.com.ar" /></label><button disabled={loading} className="mt-4 w-full rounded-xl bg-dooh-dark px-4 py-3 text-sm font-bold text-white disabled:opacity-50">{loading ? "Enviando…" : "Enviar enlace de acceso"}</button>{notice && <p className="mt-4 text-sm text-dooh-dark/65">{notice}</p>}</form></main>;

  return <main className="min-h-screen bg-[#f2f3f4] px-5 py-8 font-sans text-dooh-dark md:px-10 md:py-12"><div className="mx-auto max-w-6xl"><header className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">DOOH · Interno</p><h1 className="mt-1 text-2xl font-bold tracking-tightest">Planificador de redes</h1>{viewerEmail && <p className="mt-1 text-xs text-dooh-dark/55">Sesión: {viewerEmail}</p>}</div><div className="flex gap-2"><button type="button" onClick={() => void load(session)} className="rounded-full border border-dooh-dark/15 bg-white px-4 py-2 text-xs font-bold">Actualizar</button><button type="button" onClick={() => { window.localStorage.removeItem(storageKey); setSession(null); setItems([]); }} className="rounded-full border border-dooh-dark/15 bg-white px-4 py-2 text-xs font-bold">Salir</button></div></header>{notice && <p className="mb-5 rounded-xl border border-dooh-dark/10 bg-white px-4 py-3 text-sm text-dooh-dark/70">{notice}</p>}{loading ? <p className="py-16 text-center text-sm text-dooh-dark/55">Cargando planificador…</p> : <><div className="inline-flex rounded-full border border-dooh-dark/15 bg-white p-1" role="tablist"><button role="tab" aria-selected={tab === "instagram"} onClick={() => setTab("instagram")} className={`rounded-full px-5 py-2.5 text-sm font-bold ${tab === "instagram" ? "bg-dooh-dark text-white" : "text-dooh-dark/55"}`}>Instagram</button><button role="tab" aria-selected={tab === "linkedin"} onClick={() => setTab("linkedin")} className={`rounded-full px-5 py-2.5 text-sm font-bold ${tab === "linkedin" ? "bg-dooh-dark text-white" : "text-dooh-dark/55"}`}>LinkedIn</button></div>{tab === "instagram" ? <section className="mt-8"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">Secuencia +24 h</p><h2 className="mt-1 text-2xl font-bold tracking-tightest">Stories</h2></div><p className="text-xs text-dooh-dark/55">Desde la grilla sincronizada.</p></div><div className="mt-4 flex gap-4 overflow-x-auto pb-5">{stories.map((item) => <article key={item.id} className="w-[11.5rem] shrink-0 overflow-hidden rounded-2xl border border-dooh-dark/10 bg-white"><div className="aspect-[9/16] bg-[#e9ecee]"><Preview item={item} controls /></div><button type="button" onClick={() => setSelected(item)} className="block w-full p-3 text-left focus:outline-none focus:ring-4 focus:ring-inset focus:ring-dooh-lime"><p className="text-[10px] font-bold uppercase tracking-[.14em] text-dooh-dark/45">Story IG</p><p className="mt-2 text-sm font-bold">{item.project}</p><p className="mt-1 text-xs text-dooh-dark/55">{day(item.scheduled_at)} · Ver detalle</p></button></article>)}</div><div className="mt-8 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">Preview visual</p><h2 className="mt-1 text-2xl font-bold tracking-tightest">Instagram feed</h2></div><span className="rounded-full border border-dooh-dark/15 px-3 py-1.5 text-xs text-dooh-dark/60">@dooh.agency</span></div><div className="mt-4 overflow-hidden rounded-[2rem] border-[10px] border-dooh-dark bg-dooh-dark shadow-[0_22px_70px_rgba(5,5,7,.2)]"><div className="flex items-center gap-2 border-b border-white/10 px-5 py-4"><span className="h-7 w-7 rounded-full bg-dooh-lime" /><span className="text-xs font-bold text-white">dooh.agency</span></div><div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3">{instagram.map((item) => <Card key={item.id} item={item} />)}{instagram.length === 0 && <div className="col-span-full p-10 text-center text-sm text-white/70">No hay piezas de Instagram en la grilla.</div>}</div></div></section> : <section className="mt-8"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-dooh-dark/45">Cola editorial</p><h2 className="mt-1 text-2xl font-bold tracking-tightest">LinkedIn</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{linkedin.map((item) => <button key={item.id} type="button" onClick={() => setSelected(item)} className="overflow-hidden rounded-2xl border border-dooh-dark/10 bg-white text-left"><div className={`${vertical(item) ? "aspect-[9/16]" : "aspect-square"} bg-[#e9ecee]`}><CollectionPreview item={item} /></div><div className="p-4"><div className="flex items-start justify-between gap-3"><p className="text-sm font-bold">{item.project}</p><Status status={item.status} /></div><p className="mt-2 text-xs text-dooh-dark/55">{carousel(item) ? `${item.content_item_assets.length} piezas · ` : ""}{day(item.scheduled_at)} · Ver propuesta</p></div></button>)}</div></section>}</>}</div>{selected && <Detail item={selected} />}</main>;
}
