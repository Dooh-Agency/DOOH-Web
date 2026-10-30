/** @type {import('next').NextConfig} */
const nextConfig = {
  // El sitio se publica como estático en Cloudflare Pages. Las redirecciones
  // se definen en public/_redirects, formato compatible con Pages.
  output: "export",
};

export default nextConfig;
