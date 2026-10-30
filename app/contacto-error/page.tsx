import Link from "next/link";

export default function ContactoErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-dooh-dark px-8 text-dooh-white">
      <section className="flex max-w-xl flex-col items-center gap-6 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-dooh-lime">DOOH Agency</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">No pudimos enviar tu consulta.</h1>
        <p className="text-base leading-relaxed text-dooh-gray-mid">
          Probá nuevamente en unos minutos o escribinos directamente a hello@dooh.com.ar.
        </p>
        <Link
          href="/#contacto"
          className="mt-3 rounded-full bg-dooh-lime px-7 py-3.5 text-sm font-bold text-dooh-dark transition-colors hover:bg-dooh-lime-light"
        >
          Volver al formulario
        </Link>
      </section>
    </main>
  );
}
