import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = { title: "Página no encontrada | DOOH Agency" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-dooh-dark font-sans text-dooh-white">
      <SiteHeader />
      <section className="flex flex-1 items-center justify-center px-8 py-24">
        <div className="flex max-w-xl flex-col items-center gap-6 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-dooh-lime">Error 404</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Esta página no existe.</h1>
          <p className="text-base leading-relaxed text-dooh-gray-mid">
            Puede que el enlace haya cambiado con el nuevo sitio. Te dejamos el camino de vuelta.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-dooh-lime px-7 py-3.5 text-sm font-bold text-dooh-dark transition-colors hover:bg-dooh-lime-light">Volver al inicio</Link>
            <Link href="/blog" className="rounded-full border border-white/20 px-7 py-3.5 text-sm text-dooh-white transition-colors hover:border-white/50">Ir al blog</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
