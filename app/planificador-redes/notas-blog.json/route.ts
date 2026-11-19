import { allBlogPosts, todayInArgentina } from "@/lib/blog-posts";

// Lista de notas del sitio (incluidas las programadas) para la pestaña “Blog”
// del planificador. Se genera al compilar, como archivo estático bajo
// /planificador-redes, así que queda protegida por Cloudflare Access.
// `builtOn` dice qué día se armó el sitio: una nota con fecha anterior o igual
// ya está publicada; una con fecha posterior, programada.
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    builtOn: todayInArgentina(),
    posts: allBlogPosts.map(({ slug, title, publishedAt, category }) => ({ slug, title, publishedAt, category })),
  });
}
