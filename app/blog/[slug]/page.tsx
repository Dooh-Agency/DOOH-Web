import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

type PageProps = { params: { slug: string } };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) return {};

  const description = post.blocks.find((block) => block.tag !== "h3")?.text;
  return {
    title: `${post.title} | DOOH Agency`,
    description,
    openGraph: { type: "article", title: post.title, description, images: [post.image] },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-dooh-white font-sans text-dooh-dark">
      <header className="bg-dooh-dark px-8 py-6 md:px-14">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-6">
          <Link href="/" aria-label="DOOH Agency — inicio"><Logo className="h-4 w-auto text-dooh-white" /></Link>
          <div className="flex items-center gap-5 md:gap-8">
            <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
              <Link href="/#servicios" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Servicios</Link>
              <Link href="/#proyectos" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Proyectos</Link>
              <Link href="/blog" className="text-sm text-dooh-white transition-colors">Blog</Link>
              <Link href="/#nosotros" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Nosotros</Link>
              <Link href="/#contacto" className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">Contacto</Link>
            </nav>
            <Link href="/#contacto" className="hidden rounded-full bg-dooh-lime px-5 py-2 text-sm font-bold text-dooh-dark transition-colors hover:bg-dooh-lime-light md:inline-flex">Hablemos</Link>
            <details className="relative md:hidden">
              <summary className="flex cursor-pointer list-none flex-col gap-1.5 p-2 [&::-webkit-details-marker]:hidden" aria-label="Abrir menú">
                <span className="block h-px w-5 bg-dooh-white" />
                <span className="block h-px w-5 bg-dooh-white" />
                <span className="block h-px w-3 bg-dooh-white" />
              </summary>
              <nav aria-label="Navegación móvil" className="absolute right-0 top-11 z-10 flex w-48 flex-col rounded-xl border border-white/10 bg-dooh-dark p-3 shadow-xl">
                <Link href="/#servicios" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Servicios</Link>
                <Link href="/#proyectos" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Proyectos</Link>
                <Link href="/blog" className="rounded-lg px-3 py-2 text-sm text-dooh-white hover:bg-white/10">Blog</Link>
                <Link href="/#nosotros" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Nosotros</Link>
                <Link href="/#contacto" className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">Contacto</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <article>
        <header className="bg-dooh-dark px-8 pb-16 pt-14 text-dooh-white md:px-14 md:pb-24 md:pt-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-dooh-lime">
              <span>{post.category}</span><span className="h-px w-6 bg-dooh-lime/50" /><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
            <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.98] tracking-tightest">{post.title}</h1>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-8 pt-10 md:px-14 md:pt-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image} alt="" className="aspect-[16/9] w-full rounded-[20px] object-cover" />
        </div>

        <div className="mx-auto max-w-3xl px-8 py-14 md:px-14 md:py-20">
          <div className="space-y-6 text-base font-light leading-relaxed text-dooh-dark/80 md:text-lg">
            {post.blocks.map((block, index) => {
              if (block.tag === "h3") return <h2 key={index} className="pt-6 text-2xl font-bold leading-tight tracking-tightest text-dooh-dark md:text-3xl">{block.text}</h2>;
              if (block.tag === "blockquote") return <blockquote key={index} className="border-l-2 border-dooh-lime pl-5 text-xl font-normal italic leading-relaxed text-dooh-dark md:text-2xl">{block.text}</blockquote>;
              return <p key={index}>{block.text}</p>;
            })}
          </div>
          <div className="mt-14 border-t border-dooh-dark/15 pt-8">
            <Link href="/#contacto" className="inline-flex rounded-full bg-dooh-lime px-6 py-3 text-sm font-bold text-dooh-dark transition-colors hover:bg-dooh-lime-light">Hablemos de tu proyecto</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
