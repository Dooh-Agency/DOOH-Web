import Link from "next/link";

export default function GraciasPage() {
  return (
    <main className="min-h-screen bg-dooh-dark text-dooh-white flex items-center justify-center px-8">
      <section className="max-w-xl text-center flex flex-col items-center gap-6">
        <p className="text-dooh-lime text-xs tracking-[0.24em] uppercase">DOOH Agency</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Gracias por escribirnos.</h1>
        <p className="text-dooh-gray-mid text-base leading-relaxed">
          Recibimos tu consulta. Te responderemos a la brevedad desde hello@dooh.com.ar.
        </p>
        <Link
          href="/"
          className="mt-3 bg-dooh-lime text-dooh-dark font-bold text-sm px-7 py-3.5 rounded-full hover:bg-dooh-lime-light transition-colors"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
