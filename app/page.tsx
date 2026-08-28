import { Logo } from "@/components/Logo";
import { ClientLogoCarousel } from "@/components/ClientLogoCarousel";
import { ProjectGallery } from "@/components/ProjectGallery";

/* ================================================================
   DOOH Agency — page.tsx  v2
   Premium Dark · Next.js 14 + Tailwind CSS
   ================================================================ */

/* ── Microfrase separadora ────────────────────────────────────── */
function Microfrase({ text }: { text: string }) {
  return (
    <div className="bg-dooh-white border-y border-dooh-dark/10 py-10 px-8 md:px-14 flex items-center justify-center">
      <p className="text-dooh-dark/55 text-sm italic text-center tracking-wide max-w-2xl">
        {text}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="font-sans">

      {/* ============================================================
          NAV
          ============================================================ */}
      <header
        id="nav"
        className="
          fixed top-0 left-0 right-0 z-50
          flex items-center justify-between
          px-8 h-16
          bg-dooh-dark/80 backdrop-blur-md
          border-b border-white/[0.06]
        "
      >
        <a href="#hero" aria-label="DOOH Agency — inicio">
          <Logo className="h-4 w-auto text-dooh-white" />
        </a>

        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          <a href="#servicios"    className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">Servicios</a>
          <a href="#proyectos"    className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">Proyectos</a>
          <a href="/blog"          className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">Blog</a>
          <a href="#nosotros"     className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">Nosotros</a>
          <a href="#contacto"     className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">Contacto</a>
        </nav>

        <a
          href="#contacto"
          className="
            hidden md:inline-flex items-center gap-2
            bg-dooh-lime text-dooh-dark
            text-sm font-bold px-5 py-2 rounded-full
            hover:bg-dooh-lime-light transition-colors
          "
        >
          Hablemos
        </a>

        <button
          id="hamburger"
          aria-label="Abrir menú"
          aria-expanded="false"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-5 h-px bg-dooh-white" />
          <span className="block w-5 h-px bg-dooh-white" />
          <span className="block w-3 h-px bg-dooh-white" />
        </button>
      </header>


      {/* ============================================================
          01 · HERO
          ============================================================ */}
      <section
        id="hero"
        data-scroll-section
        className="
          relative min-h-screen flex flex-col justify-end
          bg-dooh-dark
          pt-16 pb-16 px-8 md:px-14
        "
      >
        {/* Gradient vignette — oscurece bordes para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-dooh-dark/40 via-transparent to-dooh-dark pointer-events-none z-[2]" />

        {/* ── Isotipo background — glow animado por scroll ──────────────
            z-[1] · queda sobre el fondo pero bajo el gradient y el texto
            La máscara inferior evita que el brillo neon sangre al texto  */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            zIndex: 1,
            maskImage: 'linear-gradient(to bottom, white 40%, transparent 88%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent 88%)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="hero-iso"
            src="/iso-line.svg"
            alt=""
            aria-hidden="true"
            className="
              absolute top-[42%] -translate-y-1/2
              w-[78vw] md:w-[64vw] lg:w-[58vw]
              max-w-[920px] min-w-[260px]
              right-[-4%] md:right-[-6%]
            "
            style={{ opacity: 0.12 }}
          />
        </div>

        <div className="relative z-[10] max-w-screen-xl mx-auto w-full">
          <div className="section-label flex items-center gap-3 mb-8">
            <span className="text-dooh-lime text-xs font-semibold tracking-widest uppercase" style={{ opacity: 0 }}>DOOH Agency</span>
            <span className="section-line" style={{ opacity: 0 }} />
          </div>

          <h1 className="text-[clamp(2.4rem,6vw,6rem)] font-bold tracking-tightest leading-tight text-dooh-white">
            <span className="block" style={{ opacity: 0 }}>Tu marca tiene algo que decir.</span>
            <span id="hero-paint-text" className="block font-extralight" style={{ color: 'inherit', opacity: 0 }}>
              <span className="word-paint-hero text-dooh-gray-mid">Te</span>{' '}
              <span className="word-paint-hero text-dooh-gray-mid">ayudamos</span>{' '}
              <span className="word-paint-hero text-dooh-gray-mid">a</span>{' '}
              <span className="word-paint-hero text-dooh-gray-mid">decirlo</span>{' '}
              <span className="word-paint-hero text-dooh-gray-mid">bien.</span>
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-dooh-gray-mid font-light max-w-lg leading-relaxed" style={{ opacity: 0 }}>
            Somos una agencia creativa que combina diseño, estrategia e inteligencia artificial para construir marcas con propósito, presencia y potencia real en el mercado.
          </p>

          <div className="cta-row mt-10 flex flex-wrap gap-4">
            <a
              href="#contacto"
              style={{ opacity: 0 }}
              className="
                inline-flex items-center gap-2
                bg-dooh-lime text-dooh-dark
                font-bold text-sm px-7 py-3.5 rounded-full
                hover:bg-dooh-lime-light transition-colors
              "
            >
              Hablemos de tu proyecto
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#proyectos"
              style={{ opacity: 0 }}
              className="
                inline-flex items-center gap-2
                border border-white/20 text-dooh-white
                text-sm px-7 py-3.5 rounded-full
                hover:border-white/40 transition-colors
              "
            >
              Ver nuestro trabajo
            </a>
          </div>
        </div>

        <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] tracking-widest uppercase text-dooh-gray-mid">Scroll</span>
          <span className="w-px h-8 bg-dooh-gray-mid" />
        </div>
      </section>

      {/* ============================================================
          02 · POSICIONAMIENTO
          ============================================================ */}
      <section
        id="posicionamiento"
        data-scroll-section
        className="
          min-h-screen flex flex-col justify-center
          bg-dooh-white
          py-24 px-8 md:px-14
        "
      >
        <div className="max-w-screen-xl mx-auto w-full">

          <div className="section-label flex items-center gap-3 mb-16">
            <span className="text-dooh-lime text-xs font-semibold tracking-widest uppercase">02</span>
            <span className="text-dooh-dark/45 text-xs tracking-widest uppercase">Posicionamiento</span>
            <span className="section-line bg-dooh-dark/10" />
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tightest leading-tight text-dooh-dark max-w-3xl mb-10">
            Diseño con criterio.{' '}
            <span id="paint-text" className="font-normal" style={{ color: 'inherit' }}>
              <span className="word-paint">Resultados</span>{' '}
              <span className="word-paint">con</span>{' '}
              <span className="word-paint">intención.</span>
            </span>
          </h2>

          <p className="anim-body text-dooh-dark/65 font-light leading-relaxed max-w-2xl mb-6">
            En DOOH combinamos pensamiento estratégico, sensibilidad creativa e inteligencia artificial en un solo proceso integrado. Trabajamos junto al cliente desde el primer diagnóstico hasta la implementación final, entendiendo sus objetivos, su mercado y lo que su marca necesita comunicar para crecer.
          </p>
          <p className="anim-body text-dooh-dark/65 font-light leading-relaxed max-w-2xl mb-16">
            Somos una agencia que piensa como estudio creativo y actúa como partner estratégico.
          </p>

          {/* Tres pilares */}
          <div className="pillars-grid grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                tag: "CREATIVE",
                desc: "Diseño, estética y construcción de marca con intención y coherencia visual.",
              },
              {
                tag: "TECH",
                desc: "Inteligencia artificial, automatización y sistemas aplicados con criterio creativo.",
              },
              {
                tag: "STUDIO",
                desc: "Autoría, proceso y acompañamiento real en cada etapa del proyecto.",
              },
            ].map((p) => (
              <div
                key={p.tag}
                data-pillar-card
                className="
                  group bg-dooh-dark p-10 flex flex-col gap-4
                  rounded-[20px] border border-dooh-dark
                "
              >
                <span
                  className="
                    text-dooh-lime text-xs font-bold uppercase
                    tracking-[0.2em] group-hover:tracking-[0.42em]
                    transition-[letter-spacing] duration-500 ease-out
                  "
                >
                  {p.tag}
                </span>
                <p className="text-dooh-gray-mid font-light leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ============================================================
          03 · SERVICIOS
          ============================================================ */}
      <section
        id="servicios"
        data-scroll-section
        className="
          relative overflow-hidden
          min-h-screen flex flex-col justify-center
          bg-dooh-white
          py-24 px-8 md:px-14
        "
      >

        {/* ── Miscelánea derecha — ángulo superior derecho ──────────────
            Semicírculo derecho del isotipo DOOH.
            Entra deslizándose desde la derecha mientras se dibuja.    */}
        <div
          id="svc-iso-right"
          className="absolute top-[3%] right-[-2%] sm:right-[-6%] w-[62vw] sm:w-[38vw] max-w-[420px] pointer-events-none select-none"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <svg viewBox="0 0 37.65 34.82" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              id="svc-path-right"
              d="M20.25,0h0C10.9.04,3.28,7.53,3.11,16.89v1.08c.05,1.51.28,3.01.71,4.47H0c6.64,6,11.17,11.75,20.25,12.39,9.6,0,17.39-7.79,17.4-17.39C37.66,7.82,29.87.02,20.25,0Z"
              stroke="#ddf81d"
              strokeWidth="0.12"
              strokeMiterlimit="10"
            />
          </svg>
        </div>

        {/* ── Miscelánea izquierda — ángulo inferior izquierdo ──────────
            Semicírculo izquierdo del isotipo DOOH.
            Entra deslizándose desde la izquierda mientras se dibuja.  */}
        <div
          id="svc-iso-left"
          className="absolute bottom-[4%] left-[-2%] sm:left-[-6%] w-[62vw] sm:w-[38vw] max-w-[420px] pointer-events-none select-none"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          <svg viewBox="0 0 37.49 34.42" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              id="svc-path-left"
              d="M17.24,0h0C8.02,0,.41,7.24.02,16.47c-.42,9.49,6.94,17.52,16.43,17.93,9.5.42,17.53-6.95,17.94-16.44v-1.07c-.05-1.51-.28-3.01-.71-4.47h3.81C30.84,6.38,26.34.64,17.24,0Z"
              stroke="#ddf81d"
              strokeWidth="0.12"
              strokeMiterlimit="10"
            />
          </svg>
        </div>

        <div className="max-w-screen-xl mx-auto w-full relative z-10">

          <div className="section-label flex items-center gap-3 mb-6">
            <span className="text-dooh-lime text-xs font-semibold tracking-widest uppercase">03</span>
            <span className="text-dooh-dark/45 text-xs tracking-widest uppercase">Servicios</span>
            <span className="section-line bg-dooh-dark/10" />
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tightest leading-tight text-dooh-dark max-w-3xl mb-4">
            Soluciones concretas para marcas que quieren crecer con identidad.
          </h2>
          <p className="text-dooh-dark/65 font-light leading-relaxed max-w-xl mb-12">
            Cada servicio está diseñado para resolver un problema real de comunicación, presencia o conversión. La inteligencia artificial amplifica nuestra capacidad de entrega en cada uno de ellos.
          </p>

          {/* Navegación y contenido: en escritorio la navegación funciona como una columna lateral. */}
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-x-14 md:gap-y-0">
          <div
            role="tablist"
            aria-label="Servicios"
            className="flex flex-nowrap gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-col md:items-stretch md:gap-3 md:overflow-visible"
          >
            {["Branding & Identidad", "Diseño Web & UX/UI", "Contenido & IA"].map((tab, i) => (
              <button
                key={tab}
                role="tab"
                aria-selected={i === 0}
                data-tab={`s${i + 1}`}
                className={`
                  tab shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold text-left transition-colors md:w-full
                  ${i === 0
                    ? "bg-dooh-lime text-dooh-dark"
                    : "border border-dooh-dark/20 text-dooh-dark/65 hover:border-dooh-dark hover:text-dooh-dark"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          {[
            {
              id: "s1", folder: "branding",
              claim: "La identidad visual que hace que te reconozcan antes de hablar.",
              title: "Branding & Identidad de Marca",
              desc: "Desarrollamos marcas con carácter: desde el naming y la arquitectura de marca hasta el sistema visual completo. Trabajamos junto al cliente para que cada decisión de diseño refleje quiénes son y hacia dónde van.",
              tags: ["Naming", "Identidad visual", "Posicionamiento", "Manual de marca", "Aplicaciones"],
            },
            {
              id: "s2", folder: "web",
              claim: "Un sitio que convierte porque fue pensado para convertir.",
              title: "Diseño Web & UX/UI",
              desc: "Diseñamos interfaces digitales orientadas a la experiencia del usuario y la conversión. Cada pantalla tiene una función estratégica: capturar atención, generar confianza y llevar al visitante a la acción que el negocio necesita.",
              tags: ["Diseño UX/UI", "Wix / Webflow", "Landing pages", "Integración digital"],
            },
            {
              id: "s3", folder: "contenido",
              claim: "Una comunicación que trabaja con la misma constancia que tu negocio.",
              title: "Contenido & Comunicación con IA",
              desc: "Combinamos estrategia de contenido, producción creativa y automatización inteligente para que la presencia digital de tu marca sea consistente, relevante y escalable. La IA nos permite entregar más, con mayor precisión y sin perder la voz propia del cliente.",
              tags: ["Estrategia de contenido", "Copywriting", "Redes sociales", "Automatización con IA", "Agentes conversacionales"],
            },
          ].map((panel, i) => (
            <div
              key={panel.id}
              id={`tab-${panel.id}`}
              role="tabpanel"
              className={`tab-panel contents ${i !== 0 ? "hidden" : ""}`}
            >
              {/* Texto: a la derecha de la navegación en escritorio. */}
              <div className="max-w-2xl md:col-start-2">
                <p className="text-dooh-lime text-sm italic mb-4 font-light">{panel.claim}</p>
                <h3 className="text-3xl font-bold tracking-tightest text-dooh-dark mb-4 leading-tight">
                  {panel.title}
                </h3>
                <p className="text-dooh-dark/65 font-light leading-relaxed mb-8">
                  {panel.desc}
                </p>
                <div className="tab-tags flex flex-wrap gap-2">
                  {panel.tags.map(tag => (
                    <span key={tag} className="text-xs border border-dooh-dark/15 text-dooh-dark/60 px-3 py-1.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Galería full-bleed: queda debajo de toda la navegación y el texto. */}
              <div className="service-slideshow relative w-screen ml-[calc(50%-50vw)] mt-2 md:col-span-2 md:mt-14 aspect-[5/4] md:aspect-[2.35/1] bg-dooh-dark/5 border-y border-dooh-dark/10 overflow-hidden">
                <div className="slideshow-track flex h-full">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="slide flex-shrink-0 w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/servicios/${panel.folder}/${n}.jpg`}
                        alt={`${panel.title} — imagen ${n}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <button aria-label="Imagen anterior" className="slide-prev slide-arrow absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/15 text-dooh-white flex items-center justify-center hover:bg-dooh-lime hover:text-dooh-dark transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button aria-label="Imagen siguiente" className="slide-next slide-arrow absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/15 text-dooh-white flex items-center justify-center hover:bg-dooh-lime hover:text-dooh-dark transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="slide-dots absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                  {[0, 1, 2].map(d => (
                    <button key={d} aria-label={`Ir a imagen ${d + 1}`} className={`dot w-1.5 h-1.5 rounded-full transition-all ${d === 0 ? "bg-dooh-lime scale-125" : "bg-white/30"}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}

          </div>
        </div>
      </section>

      {/* ============================================================
          04 · PROYECTOS / PORTFOLIO
          ============================================================ */}
      <section
        id="proyectos"
        data-scroll-section
        className="
          min-h-screen flex flex-col justify-center
          bg-dooh-white
          py-24
        "
      >
        <div className="max-w-screen-xl mx-auto w-full px-8 md:px-14 mb-12">
          <div className="section-label flex items-center gap-3 mb-6">
            <span className="text-dooh-lime text-xs font-semibold tracking-widest uppercase">04</span>
            <span className="text-dooh-dark/45 text-xs tracking-widest uppercase">Proyectos</span>
            <span className="section-line bg-dooh-dark/10" />
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tightest text-dooh-dark max-w-2xl leading-tight mb-3">
            Trabajo real para marcas con objetivos reales.
          </h2>
          <p className="text-dooh-dark/65 font-light text-sm max-w-lg">
            Cada proyecto comienza con una pregunta estratégica y termina con un resultado medible.
          </p>
        </div>

        {/* Galería editorial — imágenes a escala de página */}
        <div className="px-3 md:px-6 pb-4">
          <ProjectGallery />
        </div>
      </section>

      {/* ============================================================
          05 · PROCESO
          ============================================================ */}
      <section
        id="proceso"
        data-scroll-section
        className="
          relative overflow-hidden
          min-h-screen flex flex-col justify-center
          bg-dooh-white
          py-24 px-8 md:px-14
        "
      >
        {/* ── Trama + velo de luz ───────────────────────────────────────
            Stack de capas:
            1. Trama SVG (isotipos blancos, opacity baja pero presente)
            2. Velo oscuro con un hueco radial en el centro — tapa la trama
               casi completamente. Solo donde está el hueco se ve la trama.
            3. El velo se desplaza de arriba a abajo con el scroll:
               el hueco entra por la parte superior de la sección,
               barre hasta abajo y sale. La trama nunca se ve completa. */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">

          {/* 1 · Trama — blanca, 5% opacidad. Se mueve con el mouse. */}
          <div
            id="proceso-trama"
            className="absolute -left-[5%] w-[110%]
                       -top-[30%] h-[160%]
                       sm:-top-[5%] sm:h-[110%]
                       [background-size:auto_100%] sm:[background-size:100%_auto]"
            style={{
              backgroundImage  : 'url(/trama-gde.svg)',
              backgroundRepeat : 'no-repeat',
              backgroundPosition: 'center center',
              opacity          : 0.05,
            }}
          />

          {/* 2 · Velo oscuro fijo con hueco radial centrado — ventana permanente */}
          <div
            id="proceso-velo"
            className="absolute inset-0"
            style={{
              background: [
                'radial-gradient(ellipse 68% 52% at 50% 50%,',
                '  transparent 0%,',
                '  rgba(247,247,247,0.58) 38%,',
                '  rgba(247,247,247,0.92) 58%,',
                '  rgba(247,247,247,0.99) 75%',
                ')',
              ].join(' '),
            }}
          />

        </div>

        <div className="max-w-screen-xl mx-auto w-full relative z-10">

          <div className="section-label flex items-center gap-3 mb-6">
            <span className="text-dooh-lime text-xs font-semibold tracking-widest uppercase">05</span>
            <span className="text-dooh-dark/45 text-xs tracking-widest uppercase">Cómo trabajamos</span>
            <span className="section-line bg-dooh-dark/10" />
          </div>

          <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-bold tracking-tightest text-dooh-dark mb-4 max-w-2xl leading-tight">
            Un proceso diseñado para lograr resultados predecibles.
          </h2>
          <p className="text-dooh-dark/65 font-light leading-relaxed max-w-xl mb-16">
            Trabajamos junto al cliente en cada etapa, entendiendo sus necesidades, su contexto y sus objetivos antes de diseñar cualquier solución. El proceso es claro, iterativo y orientado siempre al resultado.
          </p>

          <div className="steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                n: "01",
                title: "Diagnóstico",
                desc: "Entendemos el negocio, el mercado y lo que la marca necesita resolver. Antes de diseñar, escuchamos.",
              },
              {
                n: "02",
                title: "Estrategia",
                desc: "Definimos la dirección con criterio. Cada decisión de diseño tiene una lógica detrás que el cliente puede ver y validar.",
              },
              {
                n: "03",
                title: "Diseño & Producción",
                desc: "Ejecutamos con precisión y velocidad. La inteligencia artificial amplifica nuestra capacidad sin reemplazar el juicio creativo.",
              },
              {
                n: "04",
                title: "Entrega & Seguimiento",
                desc: "Acompañamos la implementación y nos aseguramos de que el trabajo funcione en el mundo real, no solo en los archivos de entrega.",
              },
            ].map((step) => (
              <div key={step.n} data-step-card className="group bg-dooh-dark rounded-[20px] p-8 flex flex-col gap-4 overflow-hidden">
                <span className="step-number text-4xl font-bold text-dooh-lime tracking-tightest inline-block">{step.n}</span>
                <h3 className="text-lg font-bold text-dooh-white tracking-tight leading-snug">{step.title}</h3>
                <p className="text-sm text-dooh-gray-mid font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================
          06 · NOSOTROS
          ============================================================ */}
      <section
        id="nosotros"
        data-scroll-section
        className="
          min-h-screen flex flex-col justify-center
          bg-dooh-white
          py-24 px-8 md:px-14
        "
      >
        <div className="max-w-screen-xl mx-auto w-full">

          <div className="section-label flex items-center gap-3 mb-16">
            <span className="text-dooh-lime text-xs font-semibold tracking-widest uppercase">06</span>
            <span className="text-dooh-dark/45 text-xs tracking-widest uppercase">Nosotros</span>
            <span className="section-line bg-dooh-dark/10" />
          </div>

          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-20">
            {/* Título a la izquierda; relato institucional a la derecha. */}
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] tracking-tightest text-dooh-dark leading-tight">
              <span className="font-bold block">Una agencia que piensa como estudio.</span>
              <span id="nosotros-paint-text" className="font-normal block" style={{ color: 'inherit' }}>
                <span className="word-paint-nosotros text-dooh-dark/55">Un</span>{' '}
                <span className="word-paint-nosotros text-dooh-dark/55">equipo</span>{' '}
                <span className="word-paint-nosotros text-dooh-dark/55">que</span>{' '}
                <span className="word-paint-nosotros text-dooh-dark/55">trabaja</span>{' '}
                <span className="word-paint-nosotros text-dooh-dark/55">como</span>{' '}
                <span className="word-paint-nosotros text-dooh-dark/55">socio.</span>
              </span>
            </h2>

            <div className="nosotros-body flex flex-col gap-5 text-dooh-dark/65 font-light leading-relaxed text-[15px]">
                <p>
                  DOOH nació en Buenos Aires en 2013 como estudio de diseño. A lo largo de trece años de trabajo con marcas de distintos sectores y mercados, desarrollamos una forma de trabajar que integra pensamiento estratégico, diseño con identidad e inteligencia artificial aplicada con propósito.
                </p>
                <p>
                  Hoy operamos desde Buenos Aires y Málaga, con proyectos activos en Argentina y España. Somos una agencia pequeña en estructura y grande en capacidad: usamos la tecnología disponible para entregar resultados que antes requerían equipos mucho más grandes.
                </p>
                <p>
                  Trabajamos junto a nuestros clientes como parte del equipo, no como proveedores externos. Esa diferencia define el resultado final.
                </p>
            </div>
          </div>

          {/* Indicadores compactos al cierre del módulo. */}
          <div className="stats-grid mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-5">
            <div className="bg-dooh-lime rounded-xl p-5 md:p-6">
              <p className="text-2xl font-bold tracking-tightest text-dooh-dark leading-none mb-2">13 años</p>
              <p className="text-dooh-dark/70 font-light text-xs">2 mercados · Buenos Aires & Málaga</p>
            </div>
            {[
              { n: "2013", label: "Fundación" },
              { n: "2",    label: "Ciudades" },
              { n: "AR+ES", label: "Mercados activos" },
              { n: "IA",   label: "Integrada al proceso" },
            ].map(s => (
              <div key={s.n} className="bg-dooh-dark/5 border border-dooh-dark/10 rounded-xl p-5 md:p-6">
                <p className="text-xl font-bold text-dooh-dark tracking-tight mb-1">{s.n}</p>
                <p className="text-xs text-dooh-dark/55 font-light">{s.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      <ClientLogoCarousel />

      {/* ============================================================
          07 · CONTACTO / CTA FINAL
          ============================================================ */}
      <section
        id="contacto"
        data-scroll-section
        className="
          min-h-screen flex flex-col items-center justify-center
          bg-dooh-white
          py-24 px-8 md:px-14
          border-t border-dooh-dark/10
        "
      >
        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Lado izquierdo — texto */}
          <div className="contacto-left">
            <div className="section-label flex items-center gap-3 mb-10">
              <span className="text-dooh-lime text-xs font-semibold tracking-widest uppercase">07</span>
              <span className="text-dooh-dark/45 text-xs tracking-widest uppercase">Contacto</span>
              <span className="section-line bg-dooh-dark/10" />
            </div>

            <h2 className="text-[clamp(2rem,4.5vw,4rem)] font-bold tracking-tightest text-dooh-dark leading-tight mb-6">
              Contanos en qué estás trabajando.
            </h2>
            <p className="text-dooh-dark/65 font-light leading-relaxed mb-10 max-w-sm">
              Compartinos tu proyecto o tu desafío actual. En menos de 24 horas te respondemos con una perspectiva concreta sobre cómo podemos ayudarte.
            </p>

            {/* WhatsApp directo */}
            <a
              href="https://wa.me/5491125497600"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-3
                border border-dooh-dark/20 text-dooh-dark
                text-sm px-6 py-3.5 rounded-full
                hover:border-dooh-lime/50 hover:text-dooh-lime transition-colors
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribir por WhatsApp
            </a>
          </div>

          {/* Lado derecho — formulario */}
          <form
            name="contacto-dooh"
            method="POST"
            action="/gracias"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="form-fields flex flex-col gap-4"
          >
            <input type="hidden" name="form-name" value="contacto-dooh" />
            <p className="hidden" aria-hidden="true">
              <label>
                No completar este campo si sos una persona
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="nombre" className="text-xs text-dooh-dark/55 tracking-widest uppercase">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre"
                autoComplete="name"
                required
                className="
                  bg-white border border-dooh-dark/15
                  rounded-xl px-5 py-3.5 text-sm text-dooh-dark
                  placeholder:text-dooh-dark/30
                  focus:outline-none focus:border-dooh-lime/50
                  transition-colors
                "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs text-dooh-dark/55 tracking-widest uppercase">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="hola@tuempresa.com"
                autoComplete="email"
                required
                className="
                  bg-white border border-dooh-dark/15
                  rounded-xl px-5 py-3.5 text-sm text-dooh-dark
                  placeholder:text-dooh-dark/30
                  focus:outline-none focus:border-dooh-lime/50
                  transition-colors
                "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="whatsapp" className="text-xs text-dooh-dark/55 tracking-widest uppercase">
                WhatsApp <span className="normal-case tracking-normal">(opcional)</span>
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                placeholder="+54 9 11..."
                autoComplete="tel"
                className="
                  bg-white border border-dooh-dark/15
                  rounded-xl px-5 py-3.5 text-sm text-dooh-dark
                  placeholder:text-dooh-dark/30
                  focus:outline-none focus:border-dooh-lime/50
                  transition-colors
                "
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="mensaje" className="text-xs text-dooh-dark/55 tracking-widest uppercase">
                ¿En qué podemos ayudarte?
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                placeholder="Contanos tu proyecto, desafío o pregunta..."
                required
                className="
                  bg-white border border-dooh-dark/15
                  rounded-xl px-5 py-3.5 text-sm text-dooh-dark
                  placeholder:text-dooh-dark/30
                  focus:outline-none focus:border-dooh-lime/50
                  transition-colors resize-none
                "
              />
            </div>

            <button
              type="submit"
              className="
                bg-dooh-lime text-dooh-dark
                font-bold text-sm px-7 py-3.5 rounded-full
                hover:bg-dooh-lime-light transition-colors
                self-start mt-2
              "
            >
              Enviar mensaje
              <svg className="inline-block ml-2" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 7h12M8 3l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="text-xs text-dooh-dark/45 leading-relaxed">
              Usaremos tus datos únicamente para responder esta consulta.
            </p>
          </form>

        </div>
      </section>


      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="bg-dooh-dark border-t border-white/[0.06] py-14 px-8 md:px-14">
        <div className="max-w-screen-xl mx-auto">

          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">

            {/* Logo + tagline */}
            <div className="flex flex-col gap-3 items-start">
              <Logo className="h-4 w-auto text-dooh-white" />
              <p className="text-dooh-gray-mid/60 text-xs max-w-[18rem] leading-relaxed font-light">
                Diseño con criterio. Tecnología con alma. Resultados con intención.
              </p>
            </div>

            {/* Navegación */}
            <nav aria-label="Footer" className="flex flex-col gap-2">
              <p className="text-[10px] text-dooh-gray-mid/40 tracking-widest uppercase mb-1">Navegación</p>
              {[
                { label: "Servicios",  href: "#servicios" },
                { label: "Proyectos", href: "#proyectos" },
                { label: "Nosotros",  href: "#nosotros" },
                { label: "Contacto",  href: "#contacto" },
              ].map(l => (
                <a key={l.label} href={l.href} className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Redes */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-dooh-gray-mid/40 tracking-widest uppercase mb-1">Redes</p>
              {[
                { label: "Instagram", href: "https://instagram.com" },
                { label: "LinkedIn",  href: "https://linkedin.com" },
                { label: "Behance",   href: "https://behance.net" },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">
                  {l.label}
                </a>
              ))}
            </div>

            {/* Contacto */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] text-dooh-gray-mid/40 tracking-widest uppercase mb-1">Contacto</p>
              <a href="mailto:hello@dooh.com.ar" className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">
                hello@dooh.com.ar
              </a>
              <a href="https://wa.me/5491125497600" className="text-sm text-dooh-gray-mid hover:text-dooh-white transition-colors">
                +54 9 11 2549 7600
              </a>
              <p className="text-sm text-dooh-gray-mid/60 mt-1">Buenos Aires · Málaga</p>
            </div>

          </div>

          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Logo className="h-3.5 w-auto text-dooh-white/40" />
            <p className="text-xs text-dooh-gray-mid/30">© 2026 DOOH Agency. Todos los derechos reservados.</p>
          </div>

        </div>
      </footer>

    </main>
  );
}
