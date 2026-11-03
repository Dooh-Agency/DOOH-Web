// URL pública del sitio. En Cloudflare se define NEXT_PUBLIC_SITE_URL por entorno;
// sin ella se usa el dominio de producción para metadatos, sitemap y robots.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.dooh.com.ar").replace(/\/$/, "");
