import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Política de privacidad | DOOH Agency",
  description: "Cómo trata DOOH Agency los datos personales que recibe a través de este sitio, conforme al RGPD y a la Ley 25.326.",
};

// Datos del titular. Completar antes de publicar: el RGPD (art. 13) y la LSSI
// (art. 10) exigen identificar a la persona o empresa responsable y su domicilio.
// Las líneas vacías no se muestran.
const titular = {
  nombre: "DOOH Agency",
  razonSocial: "",
  documento: "", // CUIT (Argentina) y/o NIF (España)
  domicilio: "",
  email: "hello@dooh.com.ar",
};

const actualizado = "3 de noviembre de 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="pt-6 text-2xl font-bold leading-tight tracking-tightest text-dooh-dark md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-dooh-white font-sans text-dooh-dark">
      <SiteHeader />

      <header className="bg-dooh-dark px-8 pb-16 pt-14 text-dooh-white md:px-14 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-dooh-lime">Legal · Actualizada el {actualizado}</p>
          <h1 className="text-[clamp(2.4rem,5.5vw,5rem)] font-bold leading-[0.98] tracking-tightest">Política de privacidad</h1>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-8 py-14 md:px-14 md:py-20">
        <div className="space-y-6 text-base font-light leading-relaxed text-dooh-dark/80 md:text-lg">
          <p>
            En DOOH Agency trabajamos desde Buenos Aires y Málaga. Esta política explica qué datos personales recibimos a través
            de este sitio, para qué los usamos y cómo podés ejercer tus derechos. Aplica tanto el Reglamento General de
            Protección de Datos de la Unión Europea (RGPD) y la Ley Orgánica 3/2018 de España, como la Ley 25.326 de Protección
            de los Datos Personales de Argentina.
          </p>

          <Section title="1. Quién es responsable de tus datos">
            <ul className="list-disc space-y-1 pl-6">
              <li>Titular: {titular.nombre}{titular.razonSocial && ` (${titular.razonSocial})`}</li>
              {titular.documento && <li>Identificación fiscal: {titular.documento}</li>}
              {titular.domicilio && <li>Domicilio: {titular.domicilio}</li>}
              <li>Correo de contacto: <a className="underline" href={`mailto:${titular.email}`}>{titular.email}</a></li>
            </ul>
          </Section>

          <Section title="2. Qué datos recibimos">
            <p>
              Cuando nos escribís desde el formulario de contacto recibimos tu nombre, tu correo electrónico, tu número de
              WhatsApp (si decidís compartirlo) y el contenido de tu mensaje. Si nos escribís por WhatsApp o por correo,
              recibimos los datos que nos envíes por ese medio.
            </p>
            <p>
              Además, nuestro proveedor de hosting registra datos técnicos de cada visita (como la dirección IP y el navegador)
              para mantener el sitio disponible y protegerlo de ataques. No usamos esos datos para identificarte ni para
              crear perfiles.
            </p>
          </Section>

          <Section title="3. Para qué los usamos y con qué base legal">
            <p>
              Usamos tus datos únicamente para responder tu consulta y, si nos lo pedís, para preparar una propuesta de
              trabajo. No los usamos para enviarte publicidad ni los cedemos a terceros para sus propios fines.
            </p>
            <p>
              La base legal es tu consentimiento, que nos das al enviar el formulario (art. 6.1.a del RGPD y art. 5 de la Ley
              25.326), y, cuando corresponda, la aplicación de medidas precontractuales a tu pedido (art. 6.1.b del RGPD).
              Podés retirar tu consentimiento en cualquier momento escribiéndonos, sin que eso afecte el tratamiento previo.
            </p>
          </Section>

          <Section title="4. Cuánto tiempo los conservamos">
            <p>
              Conservamos los datos de tu consulta durante el tiempo necesario para responderla y hasta 24 meses desde el
              último contacto. Si empezamos a trabajar juntos, los conservamos mientras dure la relación y durante los
              plazos que exijan las obligaciones legales, fiscales o contables aplicables. Después los eliminamos.
            </p>
          </Section>

          <Section title="5. Con quién los compartimos">
            <p>Para operar el sitio y recibir tus mensajes usamos proveedores que tratan los datos por cuenta nuestra:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Cloudflare, Inc.: hosting del sitio y seguridad de la red.</li>
              <li>Resend (Plus Five Five, Inc.): envío del formulario de contacto a nuestro correo.</li>
              <li>Nuestro proveedor de correo electrónico, donde recibimos y respondemos tus mensajes.</li>
            </ul>
            <p>
              Algunos de estos proveedores están en Estados Unidos. Cuando tus datos salen del Espacio Económico Europeo o de
              Argentina, la transferencia se ampara en el Marco de Privacidad de Datos UE-EE. UU. o en cláusulas contractuales
              tipo, y en tu consentimiento conforme al art. 12 de la Ley 25.326. Solo comunicaremos tus datos a autoridades
              cuando una ley nos obligue.
            </p>
          </Section>

          <Section title="6. Tus derechos">
            <p>
              Podés acceder a tus datos, rectificarlos, pedir que los eliminemos, oponerte a su tratamiento, solicitar que lo
              limitemos o pedir su portabilidad. Para hacerlo, escribinos a{" "}
              <a className="underline" href={`mailto:${titular.email}`}>{titular.email}</a> indicando qué derecho querés
              ejercer. Te responderemos dentro de los plazos legales: un mes según el RGPD; diez días corridos para el acceso
              y cinco días hábiles para la rectificación o supresión según la Ley 25.326.
            </p>
            <p>
              <strong className="font-semibold text-dooh-dark">Si residís en España o en la Unión Europea</strong>, también
              podés presentar un reclamo ante la Agencia Española de Protección de Datos (
              <a className="underline" href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
            </p>
            <p>
              <strong className="font-semibold text-dooh-dark">Si residís en Argentina:</strong> el titular de los datos
              personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no
              inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el
              artículo 14, inciso 3 de la Ley N° 25.326. La Agencia de Acceso a la Información Pública, en su carácter de
              Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan
              quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de
              datos personales (
              <a className="underline" href="https://www.argentina.gob.ar/aaip" target="_blank" rel="noopener noreferrer">argentina.gob.ar/aaip</a>).
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Este sitio no usa cookies de publicidad ni de seguimiento. Si medimos las visitas, lo hacemos con herramientas
              que no instalan cookies ni identifican a las personas. El área interna para el equipo de DOOH guarda en tu
              navegador solo la sesión de quienes tienen acceso.
            </p>
          </Section>

          <Section title="8. Seguridad y menores de edad">
            <p>
              Aplicamos medidas técnicas y organizativas razonables para proteger tus datos: conexión cifrada, acceso
              restringido y proveedores con estándares de seguridad reconocidos. Este sitio no está dirigido a menores de 18
              años; si sos menor, no nos envíes datos personales sin la autorización de tu madre, padre o tutor.
            </p>
          </Section>

          <Section title="9. Cambios en esta política">
            <p>
              Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización.
            </p>
          </Section>
        </div>

        <div className="mt-14 border-t border-dooh-dark/15 pt-8">
          <Link href="/" className="inline-flex rounded-full bg-dooh-lime px-6 py-3 text-sm font-bold text-dooh-dark transition-colors hover:bg-dooh-lime-light">Volver al inicio</Link>
        </div>
      </div>
    </main>
  );
}
