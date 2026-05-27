'use client'

/* ================================================================
   Animations.tsx — Sistema GSAP + ScrollTrigger
   ================================================================
   Filosofía de movimiento:
   · Los textos salen de abajo con Y + opacidad. La opacidad
     llega a 1 DESPUÉS que la posición: el texto "emerge".
   · Las grillas nunca aparecen juntas: stagger milimétrico
     guía la mirada de izquierda a derecha, arriba a abajo.
   · Las curvas de aceleración cambian según la naturaleza
     del elemento: expo para titulares, back para números,
     power2 para tarjetas.
   · once: true — cada animación se dispara una sola vez,
     sin re-trigger molesto al hacer scroll inverso.
   ================================================================ */

import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect }     from 'react'

gsap.registerPlugin(ScrollTrigger)

/* ── Eases — cada uno elegido por su carácter ─────────────────────
   expo.out    → dramático, cinemático, limpio · para titulares
   power3.out  → natural, respirado · para cuerpo y subtítulos
   power2.out  → preciso, predecible · para grillas y cards
   back.out    → leve overshoot · para números y stats (sensación de "dato que llega")
   expo.inOut  → tensión → resolución · para líneas decorativas
   ─────────────────────────────────────────────────────────────── */
const E = {
  headline : 'expo.out',
  body     : 'power3.out',
  card     : 'power2.out',
  stat     : 'back.out(1.18)',
  line     : 'expo.inOut',
} as const

/* ── Duraciones base ───────────────────────────────────────────── */
const D = {
  headline : 1.05,
  body     : 0.85,
  card     : 0.65,
  stat     : 0.62,
  line     : 1.1,
  label    : 0.5,
} as const

/* ── ScrollTrigger default: 80% del viewport, una sola vez ──────── */
const ST = (trigger: Element | string, startOffset = '80%') => ({
  trigger,
  start : `top ${startOffset}`,
  once  : true,
})

export function Animations() {
  useEffect(() => {
    /* gsap.context() garantiza limpieza total al desmontar */
    const ctx = gsap.context(() => {

      /* ══════════════════════════════════════════════════════════
         HERO — timeline orquestado, sin scroll trigger

         Los elementos del hero se pre-ocultan con opacity:0 en
         el HTML (inline style en page.tsx). Esto evita el flash
         SSR→GSAP que ocurría al hacer hard refresh: el servidor
         renderizaba los elementos visibles, luego GSAP los ocultaba
         con from() creando una ventana de 100-500ms invisible.

         Al pre-ocultarlos en el HTML, siempre arrancan en opacity:0
         y GSAP los revela con fromTo() — sin flash posible.

         Se usa fromTo() en lugar de from() para especificar
         explícitamente ambos estados, porque from() lee el estado
         CSS actual como destino "to" y los inline styles opacity:0
         confundirían el cálculo.
         ══════════════════════════════════════════════════════════ */
      const hero = gsap.timeline()

      /* Label "DOOH Agency" + línea decorativa */
      hero
        .fromTo('#hero .section-label span:not(.section-line)',
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: D.label, ease: E.body, stagger: 0.07 })
        .fromTo('#hero .section-line',
          { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
          { scaleX: 1, opacity: 1, transformOrigin: 'left center', duration: D.line, ease: E.line },
          '-=0.25')

        /* Título — las dos líneas entran desde abajo con un
           leve desfase: la segunda espera 120ms a la primera */
        .fromTo('#hero h1 span:first-child',
          { y: 72, opacity: 0 },
          { y: 0, opacity: 1, duration: D.headline, ease: E.headline },
          '-=0.65')
        .fromTo('#hero h1 span:last-child',
          { y: 72, opacity: 0 },
          { y: 0, opacity: 1, duration: D.headline, ease: E.headline },
          '-=0.88')

        /* Subtítulo — empieza cuando el título está al 40% */
        .fromTo('#hero p',
          { y: 38, opacity: 0 },
          { y: 0, opacity: 1, duration: D.body, ease: E.body },
          '-=0.62')

        /* CTAs — stagger izquierda → derecha */
        .fromTo('#hero .cta-row > *',
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: D.card, ease: E.body, stagger: 0.13 },
          '-=0.5')

        /* Scroll hint — último, muy sutil (usa from porque su base es opacity-30 vía Tailwind) */
        .from('#hero .scroll-hint', {
          opacity: 0, y: 10,
          duration: 0.8, ease: E.body,
        }, '-=0.3')


      /* ══════════════════════════════════════════════════════════
         HERO — pintura de "Te ayudamos a decirlo bien."
         Arranca en cuanto el usuario empieza a scrollear el hero.
         Cada palabra pasa de dooh-gray-mid a dooh-lime en secuencia.
         scrub: 1.2 → movimiento orgánico, no mecánico.
         ══════════════════════════════════════════════════════════ */
      gsap.to('#hero-paint-text .word-paint-hero', {
        scrollTrigger: {
          trigger : '#hero',
          start   : 'top top',
          end     : 'center top',
          scrub   : 1.2,
        },
        color  : '#ddf81d',
        ease   : 'none',
        stagger: { amount: 0.5 },
      })


      /* ══════════════════════════════════════════════════════════
         HELPER: label de sección (número + texto + línea)
         Se reutiliza en todas las secciones excepto hero.
         ══════════════════════════════════════════════════════════ */
      document.querySelectorAll('section[data-scroll-section]:not(#hero) .section-label').forEach(label => {
        const spans = label.querySelectorAll('span:not(.section-line)')
        const line  = label.querySelector('.section-line')

        if (spans.length) {
          gsap.from(spans, {
            scrollTrigger: ST(label, '85%'),
            x: -14, opacity: 0,
            duration: D.label, ease: E.body,
            stagger: 0.08,
          })
        }
        if (line) {
          gsap.from(line, {
            scrollTrigger: ST(label, '85%'),
            scaleX: 0, transformOrigin: 'left center',
            duration: D.line, ease: E.line,
          })
        }
      })


      /* ══════════════════════════════════════════════════════════
         HELPER: cada h2 scroll-triggered, independiente

         Se excluyen los h2 que son hijos directos de contenedores
         con stagger propio (.nosotros-body, .contacto-left).
         Si no se excluyen, reciben DOS animaciones from() que
         conflictúan: la segunda resetea opacity a 0 justo cuando
         la primera ya reveló el elemento.
         ══════════════════════════════════════════════════════════ */
      document.querySelectorAll('section[data-scroll-section]:not(#hero) h2').forEach(el => {
        if (el.closest('.nosotros-body, .contacto-left')) return
        gsap.from(el, {
          scrollTrigger: ST(el, '82%'),
          y: 58, opacity: 0,
          duration: D.headline, ease: E.headline,
        })
      })


      /* ══════════════════════════════════════════════════════════
         HELPER: párrafos de cuerpo con clase .anim-body
         ══════════════════════════════════════════════════════════ */
      document.querySelectorAll('.anim-body').forEach(el => {
        gsap.from(el, {
          scrollTrigger: ST(el, '85%'),
          y: 32, opacity: 0,
          duration: D.body, ease: E.body,
        })
      })


      /* ══════════════════════════════════════════════════════════
         02 · POSICIONAMIENTO — pilares CREATIVE / TECH / STUDIO
         Entran de izquierda a derecha, escalando desde 0.95.
         Stagger total: 300ms para 3 elementos = 100ms c/u.
         ══════════════════════════════════════════════════════════ */
      gsap.from('#posicionamiento .pillars-grid > *', {
        scrollTrigger: ST('#posicionamiento .pillars-grid', '72%'),
        y: 48, opacity: 0, scale: 0.96,
        duration: D.card, ease: E.card,
        stagger: { amount: 0.3, from: 'start' },
      })


      /* ══════════════════════════════════════════════════════════
         03 · SERVICIOS — misceláneas decorativas (draw-in scrub)

         Técnica de dibujo SVG:
           stroke-dasharray  = longitud total del path (getTotalLength)
           stroke-dashoffset = misma longitud → trazo invisible
           Al animar dashoffset a 0 el trazo "se dibuja" progresivamente.

         Neon multicapa (proxy idéntico al isotipo del hero):
           · core  (5px)  → trazo nítido
           · halo  (16px) → aureola media
           · bloom (40px) → difuminado ambiental

         Timeline scrubbed por sección:
           Fase 1 (0→55%): entra desde el costado + se dibuja + enciende
           Fase 2 (55→100%): se apaga + desaparece
         ══════════════════════════════════════════════════════════ */
      ;[
        { wrapperId: '#svc-iso-right', pathId: '#svc-path-right', xFrom:  130 },
        { wrapperId: '#svc-iso-left',  pathId: '#svc-path-left',  xFrom: -130 },
      ].forEach(({ wrapperId, pathId, xFrom }) => {
        const wrapper = document.querySelector<HTMLElement>(wrapperId)
        const path    = document.querySelector<SVGPathElement>(pathId)
        if (!wrapper || !path) return

        /* longitud real del trazo para el efecto de dibujo */
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.set(wrapper, { x: xFrom })   // empieza fuera de cuadro

        /* proxy de brillo — igual que el isotipo del hero */
        const g = { core: 0, halo: 0, bloom: 0 }
        const applyGlow = () => {
          wrapper.style.filter = [
            `drop-shadow(0 0 ${g.core.toFixed(1)}px #ddf81d)`,
            `drop-shadow(0 0 ${g.halo.toFixed(1)}px rgba(221,248,29,0.5))`,
            `drop-shadow(0 0 ${g.bloom.toFixed(1)}px rgba(221,248,29,0.18))`,
          ].join(' ')
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger : '#servicios',
            start   : 'top 55%',
            end     : 'bottom 15%',
            scrub   : 2.2,
          },
        })

        /* Fase 1 — aparición: desliza + dibuja + enciende */
        tl.to(wrapper, {
          opacity : 0.55,
          x       : 0,
          ease    : 'power2.out',
          duration: 0.52,
        }, 0)
        tl.to(path, {
          strokeDashoffset: 0,
          ease    : 'none',          // dibujo lineal con el scroll
          duration: 0.52,
        }, 0)
        tl.to(g, {
          core : 5,
          halo : 16,
          bloom: 40,
          ease : 'power2.in',        // neon que se calienta
          duration: 0.52,
          onUpdate: applyGlow,
        }, 0)

        /* Fase 2 — desaparición: se apaga y sale */
        tl.to(wrapper, {
          opacity : 0,
          ease    : 'power2.in',
          duration: 0.48,
        }, 0.52)
        tl.to(g, {
          core : 0,
          halo : 0,
          bloom: 0,
          ease : 'power3.in',
          duration: 0.48,
          onUpdate: applyGlow,
        }, 0.52)
      })


      /* ══════════════════════════════════════════════════════════
         03 · SERVICIOS — tabs y slideshow
         Tabs entran con stagger rápido (50ms c/u).
         Slideshow sube y escala sutilmente.
         ══════════════════════════════════════════════════════════ */
      gsap.from('#servicios [role="tablist"] button', {
        scrollTrigger: ST('#servicios [role="tablist"]', '82%'),
        y: 20, opacity: 0,
        duration: D.label, ease: E.body,
        stagger: 0.06,
      })
      gsap.from('#servicios .service-slideshow', {
        scrollTrigger: ST('#servicios .service-slideshow', '78%'),
        y: 40, opacity: 0, scale: 0.97,
        duration: D.card, ease: E.card,
      })
      gsap.from('#servicios .tab-tags > span', {
        scrollTrigger: ST('#servicios .tab-tags', '85%'),
        y: 16, opacity: 0,
        duration: 0.45, ease: E.body,
        stagger: 0.07,
      })


      /* ══════════════════════════════════════════════════════════
         04 · PROYECTOS — carousel cards
         Todas visibles en el viewport: stagger de 80ms c/u.
         Combinan Y + scale para que cada tarjeta "aterrice".
         ══════════════════════════════════════════════════════════ */
      gsap.from('#proyectos .portfolio-track article', {
        scrollTrigger: ST('#proyectos', '68%'),
        y: 55, opacity: 0, scale: 0.94,
        duration: D.card, ease: E.card,
        stagger: { amount: 0.55, from: 'start' },
      })


      /* ══════════════════════════════════════════════════════════
         05 · PROCESO — cards + números
         Cards: stagger estándar.
         Números: escalan desde 0.65 con back.out para el
         "pop" de dato que llega a su posición.
         ══════════════════════════════════════════════════════════ */
      gsap.from('#proceso .steps-grid > *', {
        scrollTrigger: ST('#proceso .steps-grid', '72%'),
        y: 52, opacity: 0, scale: 0.96,
        duration: D.card, ease: E.card,
        stagger: { amount: 0.38, from: 'start' },
      })
      gsap.from('#proceso .step-number', {
        scrollTrigger: ST('#proceso .steps-grid', '72%'),
        scale: 0.65, opacity: 0,
        duration: D.stat, ease: E.stat,
        stagger: { amount: 0.38 },
      })


      /* ══════════════════════════════════════════════════════════
         06 · NOSOTROS
         Párrafos: stagger suave, uno detrás del otro.
         Dato "13 años": entra solo, grande, con peso.
         Stats 2×2: stagger con back para que cada número pop.
         ══════════════════════════════════════════════════════════ */
      gsap.from('#nosotros .nosotros-body > *', {
        scrollTrigger: ST('#nosotros .nosotros-body', '75%'),
        y: 36, opacity: 0,
        duration: D.body, ease: E.body,
        stagger: 0.14,
      })
      gsap.from('#nosotros .dato-destacado', {
        scrollTrigger: ST('#nosotros .dato-destacado', '80%'),
        y: 30, opacity: 0, scale: 0.97,
        duration: D.headline, ease: E.headline,
      })
      gsap.from('#nosotros .stats-grid > *', {
        scrollTrigger: ST('#nosotros .stats-grid', '78%'),
        y: 28, opacity: 0, scale: 0.94,
        duration: D.stat, ease: E.stat,
        stagger: { amount: 0.32, from: 'start' },
      })


      /* ══════════════════════════════════════════════════════════
         07 · CONTACTO
         Left col: stagger moderado top-to-bottom.
         Form fields: cada campo aparece 100ms después del anterior,
         dando sensación de formulario que "se construye".
         ══════════════════════════════════════════════════════════ */
      gsap.from('#contacto .contacto-left > *', {
        scrollTrigger: ST('#contacto', '72%'),
        y: 38, opacity: 0,
        duration: D.body, ease: E.body,
        stagger: 0.13,
      })
      gsap.from('#contacto .form-fields > *', {
        scrollTrigger: ST('#contacto', '72%'),
        y: 32, opacity: 0,
        duration: D.card, ease: E.body,
        stagger: 0.1,
      })


      /* ══════════════════════════════════════════════════════════
         PILLAR CARDS — neon de borde en hover
         Técnica idéntica al isotipo: proxy object animado por GSAP,
         onUpdate reconstruye el box-shadow en cada frame.

         Encendido  (mouseenter) : power2.in  — arranca lento, como
           un tubo de neón que tarda en calentarse, luego estalla
         Apagado    (mouseleave) : power3.out — energía que se drena
           rápido al inicio y frena suave al apagarse

         Dos capas de sombra inset:
           · line   (1px sólida)  → el trazo de luz del borde
           · bloom  (36px difuso) → aureola ambiental interior
         ══════════════════════════════════════════════════════════ */
      document.querySelectorAll<HTMLElement>('[data-pillar-card]').forEach(card => {
        const g = { line: 0, bloom: 0 }
        let tween: gsap.core.Tween | null = null

        const applyGlow = () => {
          card.style.boxShadow = [
            `inset 0 0 0 1px rgba(221,248,29,${g.line.toFixed(3)})`,
            `inset 0 0 36px rgba(221,248,29,${g.bloom.toFixed(4)})`,
          ].join(', ')
        }

        card.addEventListener('mouseenter', () => {
          tween?.kill()
          tween = gsap.to(g, {
            line : 0.45,
            bloom: 0.07,
            duration : 0.42,
            ease     : 'power2.in',   // lento → estalla: neon calentándose
            onUpdate : applyGlow,
          })
        })

        card.addEventListener('mouseleave', () => {
          tween?.kill()
          tween = gsap.to(g, {
            line : 0,
            bloom: 0,
            duration : 0.38,
            ease     : 'power3.out',  // drena rápido → frena: luz que se apaga
            onUpdate : applyGlow,
          })
        })
      })


      /* ══════════════════════════════════════════════════════════
         STEP CARDS — neon de borde en hover (idéntico a pillar cards)
         El número usa CSS group-hover:scale-125 (origin-left).
         ══════════════════════════════════════════════════════════ */
      document.querySelectorAll<HTMLElement>('[data-step-card]').forEach(card => {
        const g = { line: 0, bloom: 0 }
        let glowTween : gsap.core.Tween | null = null
        let numTween  : gsap.core.Tween | null = null
        const numEl = card.querySelector<HTMLElement>('.step-number')

        const applyGlow = () => {
          card.style.boxShadow = [
            `inset 0 0 0 1px rgba(221,248,29,${g.line.toFixed(3)})`,
            `inset 0 0 36px rgba(221,248,29,${g.bloom.toFixed(4)})`,
          ].join(', ')
        }

        card.addEventListener('mouseenter', () => {
          glowTween?.kill()
          glowTween = gsap.to(g, {
            line : 0.45,
            bloom: 0.07,
            duration : 0.42,
            ease     : 'power2.in',
            onUpdate : applyGlow,
          })
          /* Número: zoom con leve overshoot (back.out), crece hacia abajo-derecha */
          if (numEl) {
            numTween?.kill()
            numTween = gsap.to(numEl, {
              scale          : 1.4,
              transformOrigin: 'left top',
              duration       : 0.35,
              ease           : 'back.out(1.6)',
            })
          }
        })

        card.addEventListener('mouseleave', () => {
          glowTween?.kill()
          glowTween = gsap.to(g, {
            line : 0,
            bloom: 0,
            duration : 0.38,
            ease     : 'power3.out',
            onUpdate : applyGlow,
          })
          /* Número: vuelve a su tamaño original */
          if (numEl) {
            numTween?.kill()
            numTween = gsap.to(numEl, {
              scale   : 1,
              duration: 0.3,
              ease    : 'power2.out',
            })
          }
        })
      })


      /* ══════════════════════════════════════════════════════════
         PINTURA DE TEXTO — "Resultados con intención."
         Cada palabra pasa de blanco a lima a medida que scrolleás.
         scrub: true para mapeo 1:1 con el scroll.
         stagger distribuye el inicio de cada palabra a lo largo
         del timeline: la primera pinta primero, la última al final.
         ══════════════════════════════════════════════════════════ */
      gsap.to('#paint-text .word-paint', {
        scrollTrigger: {
          trigger : '#paint-text',
          start   : 'top 72%',
          end     : 'top 28%',
          scrub   : 1.2,
        },
        color  : '#ddf81d',
        ease   : 'none',
        stagger: { amount: 0.6 },
      })


      /* ══════════════════════════════════════════════════════════
         PINTURA DE TEXTO — "Un equipo que trabaja como socio."
         Segunda oración del h2 de Nosotros, en regular weight.
         Mismo comportamiento que Posicionamiento: cada palabra
         pasa de dooh-gray-mid a dooh-lime conforme baja el scroll.
         start más abajo (75%) para que el efecto arranque cuando
         la línea ya está bien visible en pantalla.
         ══════════════════════════════════════════════════════════ */
      gsap.to('#nosotros-paint-text .word-paint-nosotros', {
        scrollTrigger: {
          trigger : '#nosotros-paint-text',
          start   : 'top 75%',
          end     : 'top 30%',
          scrub   : 1.2,
        },
        color  : '#ddf81d',
        ease   : 'none',
        stagger: { amount: 0.6 },
      })


      /* ══════════════════════════════════════════════════════════
         FOOTER — entra como un bloque único, muy sutil
         ══════════════════════════════════════════════════════════ */
      gsap.from('footer > *', {
        scrollTrigger: ST('footer', '90%'),
        y: 24, opacity: 0,
        duration: D.body, ease: E.body,
      })


      /* ══════════════════════════════════════════════════════════
         HERO ISOTIPO — Efecto neon multicapa por scroll (scrub)

         Técnica: objeto proxy con onUpdate reconstruye el
         drop-shadow en cada frame. 3 capas de blur dan profundidad:
           · Core  (tight, 100% lime)  → brillo nítido del trazo
           · Halo  (medium, 55% alpha) → aureola media
           · Bloom (wide, 22% alpha)   → difuminado ambiental

         Fases del timeline (0→1 normalizado por scrub):
           0.00 → 0.55 : encendido suave — opacity sube, brillo nace
           0.55 → 1.00 : apagado — brillo se drena, logo se disuelve

         Ease por fase:
           · Encendido : power2.in — arranca lento (como un neon
             que tarda en calentarse), luego el brillo estalla
           · Apagado   : power3.in — el brillo desaparece con
             aceleración, como una pantalla que pierde energía
         ══════════════════════════════════════════════════════════ */
      const isoEl = document.querySelector<HTMLImageElement>('#hero-iso')

      if (isoEl) {
        /* Estado inicial — casi invisible */
        gsap.set(isoEl, { opacity: 0.12 })
        isoEl.style.filter = 'drop-shadow(0 0 0px transparent)'

        /* Proxy de brillo — interpolado por GSAP, aplicado en onUpdate */
        const g = { core: 0, halo: 0, bloom: 0, opacity: 0.12 }

        const applyGlow = () => {
          isoEl.style.filter = [
            `drop-shadow(0 0 ${g.core.toFixed(1)}px #ddf81d)`,
            `drop-shadow(0 0 ${g.halo.toFixed(1)}px rgba(221,248,29,0.55))`,
            `drop-shadow(0 0 ${g.bloom.toFixed(1)}px rgba(221,248,29,0.22))`,
          ].join(' ')
          isoEl.style.opacity = g.opacity.toFixed(4)
        }

        const isoTl = gsap.timeline({
          scrollTrigger: {
            trigger  : '#hero',
            start    : 'top top',
            end      : 'bottom top',
            scrub    : 1.6,       // lag de 1.6s = movimiento orgánico, no mecánico
          },
        })

        /* Fase 1 — Encendido (0% → 55% del scroll) */
        isoTl.to(g, {
          core   : 20,
          halo   : 52,
          bloom  : 105,
          opacity: 0.88,
          ease   : 'power2.in',  // neon que se calienta lentamente
          duration: 0.55,
          onUpdate: applyGlow,
        }, 0)

        /* Fase 2 — Apagado (55% → 100%) */
        isoTl.to(g, {
          core   : 0,
          halo   : 0,
          bloom  : 0,
          opacity: 0,
          ease   : 'power3.in',  // energía que se drena, acelerando
          duration: 0.45,
          onUpdate: applyGlow,
        }, 0.55)

        /* ── Parallax vertical — el iso desciende suavemente con el scroll ──
           ease: 'none' es estándar en animaciones scrub: mapeo lineal 1:1.
           72px de desplazamiento: suficiente para percibirse sin exagerar. */
        gsap.to(isoEl, {
          scrollTrigger: {
            trigger : '#hero',
            start   : 'top top',
            end     : 'bottom top',
            scrub   : 1.6,
          },
          y   : 72,
          ease: 'none',
        })
      }

      /* ══════════════════════════════════════════════════════════
         SCROLL REFRESH — recalcula posiciones una vez que todo
         el DOM, Lenis y los estilos están completamente asentados.

         Problema sin esto: el HTML del servidor renderiza los
         elementos visibles; GSAP los oculta inmediatamente con
         el estado `from`; ScrollTrigger calcula posiciones antes
         de que el layout esté estable → algunos triggers no
         disparan y los elementos quedan invisibles.

         requestAnimationFrame garantiza que el primer paint
         del navegador ya ocurrió. El timeout de 120ms le da
         margen a Lenis para registrarse como proxy de scroll
         antes de que ScrollTrigger mida las coordenadas.
         ══════════════════════════════════════════════════════════ */
      requestAnimationFrame(() => {
        setTimeout(() => ScrollTrigger.refresh(), 120)
      })

    }) // end gsap.context

    return () => ctx.revert()
  }, [])

  return null
}
