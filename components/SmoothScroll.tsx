'use client'

/* ================================================================
   SmoothScroll — Lenis + GSAP ScrollTrigger integration
   ================================================================
   - Lenis maneja el scroll suave e inercial
   - GSAP ticker se sincroniza con Lenis para que ScrollTrigger
     (pinning, parallax, etc.) funcione correctamente más adelante
   ================================================================ */

import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      /* ── Duración de la inercia post-scroll.
         1.1s: respuesta inmediata al input, frenado elegante
         sin sentirse "flotante" ni descontrolado.           */
      duration: 1.1,

      /* ── Curva cuártica ease-out.
         Derivada en t=0: 4 → arranque firme y responsivo.
         Derivada en t→1: casi 0 → frenado ultra suave.
         Más "de peso" que cubic, menos agresivo que expo.  */
      easing: (t: number) => 1 - Math.pow(1 - t, 4),

      /* ── Multiplicador de rueda.
         0.82: cada tick del wheel mueve menos distancia,
         el usuario siente que tiene control granular.       */
      wheelMultiplier: 0.82,

      /* ── Touch: ligeramente amplificado para mobile,
         donde el dedo debe sentir respuesta directa.       */
      touchMultiplier: 1.8,

      smoothWheel: true,
    })

    /* ── Sincronizar Lenis con GSAP ScrollTrigger ───────────────
       Esto permite que ScrollTrigger lea la posición real de Lenis
       en lugar del scroll nativo del navegador.                    */
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    /* Deshabilita el "lag smoothing" de GSAP para evitar
       stutters cuando la pestaña está inactiva. */
    gsap.ticker.lagSmoothing(0)

    /* ── Exponer instancia globalmente (útil para animaciones
       en otros componentes que necesiten pausar el scroll)   */
    const w = window as unknown as Record<string, unknown>
    w.lenis = lenis

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      delete w.lenis
    }
  }, [])

  return null
}
