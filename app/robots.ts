import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Herramienta interna y pantallas de resultado del formulario.
      disallow: ["/planificador-redes", "/gracias", "/contacto-error"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
