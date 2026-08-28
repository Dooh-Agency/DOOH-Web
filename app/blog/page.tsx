import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | DOOH Agency",
  description:
    "Ideas, procesos y proyectos de DOOH sobre diseño, tecnología, branding e inteligencia artificial.",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-dooh-white font-sans text-dooh-dark">
      <header className="bg-dooh-dark px-8 py-6 md:px-14">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-6">
          <Link href="/" aria-label="DOOH Agency — inicio">
            <Logo className="h-4 w-auto text-dooh-white" />
          </Link>
          <div className="flex items-center gap-5 md:gap-8">
            <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
              <Link href="/#servicios" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Servicios</Link>
              <Link href="/#proyectos" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Proyectos</Link>
              <Link href="/blog" aria-current="page" className="text-sm text-dooh-white transition-colors">Blog</Link>
              <Link href="/#nosotros" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Nosotros</Link>
              <Link href="/#contacto" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Contacto</Link>
            </nav>
            <Link href="/#contacto" className="hidden rounded-full bg-dooh-lime px-5 py-2 text-sm font-bold text-dooh-dark transition-colors hover:bg-dooh-lime-light md:inline-flex">
              Hablemos
            </Link>
            <details className="relative md:hidden">
              <summary className="flex cursor-pointer list-none flex-col gap-1.5 p-2 [&::-webkit-details-marker]:hidden" aria-label="Abrir menú">
                <span className="block h-px w-5 bg-dooh-white" />
                <span className="block h-px w-5 bg-dooh-white" />
                <span className="block h-px w-3 bg-dooh-white" />
              </summary>
              <nav aria-label="Navegación móvil" className="absolute right-0 top-11 z-10 flex w-48 flex-col rounded-xl border border-white/10 bg-dooh-dark p-3 shadow-xl">
                <Link href="/#servicios" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Servicios</Link>
                <Link href="/#proyectos" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Proyectos</Link>
                <Link href="/blog" aria-current="page" className="rounded-lg px-3 py-2 text-sm text-dooh-white hover:bg-white/10">Blog</Link>
                <Link href="/#nosotros" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Nosotros</Link>
                <Link href="/#contacto" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Contacto</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <section className="bg-dooh-dark px-8 pb-20 pt-16 text-dooh-white md:px-14 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-screen-xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-dooh-lime">Ideas y procesos</p>
          <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tightest">
            Pensar, diseñar y compartir lo que aprendemos.
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-dooh-gray-mid md:text-lg">
            Una mirada de DOOH sobre branding, diseño, tecnología e inteligencia artificial aplicada.
          </p>
        </div>
      </section>

      <section className="px-8 py-16 md:px-14 md:py-24">
        <div className="mx-auto grid max-w-screen-xl gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => {
            const excerpt = post.blocks.find((block) => block.tag !== "h3")?.text ?? "";

            return (
              <article key={post.slug} className="group flex flex-col border-t border-dooh-dark/15 pt-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt=""
                  className="mb-6 aspect-[4/3] w-full rounded-[16px] object-cover"
                />
                <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-dooh-dark/45">
                  <span>{post.category}</span>
                  <span className="h-px w-5 bg-dooh-dark/20" />
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-tightest">
                  <Link href={`/blog/${post.slug}`} className="transition-colors group-hover:text-dooh-dark/60">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 line-clamp-3 text-sm font-light leading-relaxed text-dooh-dark/65">{excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-6 text-sm font-bold text-dooh-dark underline decoration-dooh-lime decoration-2 underline-offset-4">
                  Leer nota
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
