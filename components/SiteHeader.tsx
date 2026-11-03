import Link from "next/link";
import { Logo } from "@/components/Logo";

const links = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

// Encabezado oscuro de las páginas internas (privacidad, 404), con el mismo
// menú que las notas del blog.
export function SiteHeader() {
  return (
    <header className="bg-dooh-dark px-8 py-6 md:px-14">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-6">
        <Link href="/" aria-label="DOOH Agency — inicio"><Logo className="h-4 w-auto text-dooh-white" /></Link>
        <div className="flex items-center gap-5 md:gap-8">
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-dooh-gray-mid transition-colors hover:text-dooh-white">{link.label}</Link>
            ))}
          </nav>
          <Link href="/#contacto" className="hidden rounded-full bg-dooh-lime px-5 py-2 text-sm font-bold text-dooh-dark transition-colors hover:bg-dooh-lime-light md:inline-flex">Hablemos</Link>
          <details className="relative md:hidden">
            <summary className="flex cursor-pointer list-none flex-col gap-1.5 p-2 [&::-webkit-details-marker]:hidden" aria-label="Abrir menú">
              <span className="block h-px w-5 bg-dooh-white" />
              <span className="block h-px w-5 bg-dooh-white" />
              <span className="block h-px w-3 bg-dooh-white" />
            </summary>
            <nav aria-label="Navegación móvil" className="absolute right-0 top-11 z-10 flex w-48 flex-col rounded-xl border border-white/10 bg-dooh-dark p-3 shadow-xl">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm text-dooh-gray-mid hover:bg-white/10 hover:text-dooh-white">{link.label}</Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
