import { accessEmail, error, json, type PlannerContext, type PlannerEnv } from "../../_shared/planner";

// Últimos posts publicados en @dooh.agency, para completar el feed del planificador.
// Solo lectura: la función únicamente lista posts, aunque el token tenga otros
// permisos. Acepta dos tipos de token:
// - De usuario de Instagram (empieza con “IG”): vence a los 60 días y se renueva solo.
// - De usuario del sistema de Meta (inicio de sesión unificado): no vence.
// La respuesta se guarda en D1 para no consultar Instagram en cada visita.

const INSTAGRAM_GRAPH = "https://graph.instagram.com";
const FACEBOOK_GRAPH = "https://graph.facebook.com";
// Cuenta de Instagram de @dooh.agency en Meta (no es secreto).
const DEFAULT_ACCOUNT_ID = "17841455194637699";
const FEED_TTL_MS = 3 * 60 * 60 * 1000;
const REFRESH_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const LIMIT = 12;

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

type PublishedPost = {
  id: string;
  type: "image" | "video" | "carousel";
  imageUrl: string;
  permalink: string;
  timestamp: string;
  caption: string;
};

type StoredToken = { token: string; refreshedAt: number; seed: string };
type StoredFeed = { fetchedAt: number; posts: PublishedPost[] };

async function settings(env: PlannerEnv) {
  await env.PLANNER_DB.prepare(
    "CREATE TABLE IF NOT EXISTS planner_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')))",
  ).run();
  return {
    async get<T>(key: string): Promise<T | null> {
      const row = await env.PLANNER_DB.prepare("SELECT value FROM planner_settings WHERE key = ?").bind(key).first<{ value: string }>();
      return row ? JSON.parse(row.value) as T : null;
    },
    async set(key: string, value: unknown) {
      await env.PLANNER_DB.prepare(
        "INSERT INTO planner_settings (key, value, updated_at) VALUES (?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
      ).bind(key, JSON.stringify(value)).run();
    },
  };
}

// El secreto de Cloudflare es el token inicial; si se vuelve a autorizar la
// cuenta y se pega uno nuevo, reemplaza al renovado que estaba guardado.
async function currentToken(env: PlannerEnv, store: Awaited<ReturnType<typeof settings>>) {
  const initial = env.INSTAGRAM_ACCESS_TOKEN?.trim();
  if (!initial) return null;
  const seed = initial.slice(-12);
  let stored = await store.get<StoredToken>("instagram_token");
  if (!stored || stored.seed !== seed) {
    stored = { token: initial, refreshedAt: Date.now(), seed };
    await store.set("instagram_token", stored);
  }
  if (stored.token.startsWith("IG") && Date.now() - stored.refreshedAt > REFRESH_AFTER_MS) {
    const response = await fetch(`${INSTAGRAM_GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(stored.token)}`).catch(() => null);
    const refreshed = response?.ok ? await response.json() as { access_token?: string } : null;
    if (refreshed?.access_token) {
      stored = { token: refreshed.access_token, refreshedAt: Date.now(), seed };
      await store.set("instagram_token", stored);
    }
  }
  return stored.token;
}

function toPost(media: InstagramMedia): PublishedPost | null {
  const imageUrl = media.media_type === "VIDEO" ? media.thumbnail_url : media.media_url;
  if (!imageUrl) return null;
  return {
    id: media.id,
    type: media.media_type === "VIDEO" ? "video" : media.media_type === "CAROUSEL_ALBUM" ? "carousel" : "image",
    imageUrl,
    permalink: media.permalink,
    timestamp: media.timestamp,
    caption: (media.caption ?? "").slice(0, 140),
  };
}

export async function onRequestGet({ request, env }: PlannerContext) {
  const email = await accessEmail(request, env);
  if (!email) return error("Ingresá al planificador con un email habilitado del equipo.", 401);
  if (!env.INSTAGRAM_ACCESS_TOKEN?.trim()) return json({ connected: false, posts: [] });

  const store = await settings(env);
  const cached = await store.get<StoredFeed>("instagram_feed");
  if (cached && Date.now() - cached.fetchedAt < FEED_TTL_MS) return json({ connected: true, posts: cached.posts });

  const token = (await currentToken(env, store)) ?? "";
  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const endpoint = token.startsWith("IG")
    ? `${INSTAGRAM_GRAPH}/me/media`
    : `${FACEBOOK_GRAPH}/${env.INSTAGRAM_ACCOUNT_ID?.trim() || DEFAULT_ACCOUNT_ID}/media`;
  const response = await fetch(`${endpoint}?fields=${fields}&limit=${LIMIT}&access_token=${encodeURIComponent(token)}`).catch(() => null);
  if (!response?.ok) {
    // Si Instagram no responde, se muestra lo último guardado y se avisa, con el
    // motivo que da Meta (no incluye el token) y el tipo de token usado.
    const detail = await response?.json().then((body: { error?: { message?: string; code?: number; type?: string } }) => body.error).catch(() => null);
    return json({
      connected: true,
      posts: cached?.posts ?? [],
      detail: { status: response?.status ?? 0, api: token.startsWith("IG") ? "instagram" : "facebook", tokenPrefix: token.slice(0, 4), message: detail?.message ?? "", code: detail?.code ?? null, type: detail?.type ?? "" },
      error: response?.status === 400 || response?.status === 401
        ? "Instagram rechazó el token: hay que volver a autorizar la cuenta."
        : "Instagram no respondió; se muestran los últimos posts guardados.",
    });
  }
  const { data } = await response.json() as { data: InstagramMedia[] };
  const posts = data.map(toPost).filter((post): post is PublishedPost => Boolean(post));
  await store.set("instagram_feed", { fetchedAt: Date.now(), posts } satisfies StoredFeed);
  return json({ connected: true, posts });
}
