"use client";

import { useEffect, useState } from "react";

// Origen de la visita para saber qué canal trae consultas. Se guarda solo en
// sessionStorage (se borra al cerrar la pestaña), sin cookies ni datos personales:
// parámetros utm_* del link, dominio de la página anterior y página de entrada.
// Lo leen el formulario de contacto (campos ocultos) y los clics en WhatsApp.

type Origin = { source: string; medium: string; campaign: string; referrer: string; landing: string };

const KEY = "dooh-origin";

function readStored(): Origin | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Origin : null;
  } catch {
    return null;
  }
}

function captureOrigin(): Origin {
  const stored = readStored();
  if (stored) return stored;
  const params = new URLSearchParams(window.location.search);
  let referrer = "";
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : "";
    referrer = host && host !== window.location.hostname ? host : "";
  } catch {
    referrer = "";
  }
  const origin: Origin = {
    source: params.get("utm_source") ?? "",
    medium: params.get("utm_medium") ?? "",
    campaign: params.get("utm_campaign") ?? "",
    referrer,
    landing: window.location.pathname,
  };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(origin));
  } catch {
    // Sin almacenamiento (modo privado estricto): se usa solo para esta página.
  }
  return origin;
}

const isWhatsApp = (href: string) => /(^|\/\/)(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//.test(href);

/** Va en el layout: registra el origen al entrar y cuenta los clics en WhatsApp. */
export function LeadTracker() {
  useEffect(() => {
    captureOrigin();
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link || !isWhatsApp(link.getAttribute("href") ?? "")) return;
      const body = JSON.stringify({
        kind: "whatsapp",
        ...Object.fromEntries(Object.entries(captureOrigin()).map(([key, value]) => [`origen_${key}`, value])),
        origen_page: window.location.pathname,
      });
      try {
        navigator.sendBeacon("/api/lead", new Blob([body], { type: "application/json" }));
      } catch {
        // Si el navegador no lo permite, el clic sigue funcionando igual.
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}

/** Va dentro del formulario de contacto: envía el origen como campos ocultos. */
export function LeadSourceFields() {
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [page, setPage] = useState("");
  useEffect(() => {
    setOrigin(captureOrigin());
    setPage(window.location.pathname);
  }, []);
  return (
    <>
      <input type="hidden" name="origen_source" value={origin?.source ?? ""} />
      <input type="hidden" name="origen_medium" value={origin?.medium ?? ""} />
      <input type="hidden" name="origen_campaign" value={origin?.campaign ?? ""} />
      <input type="hidden" name="origen_referrer" value={origin?.referrer ?? ""} />
      <input type="hidden" name="origen_landing" value={origin?.landing ?? ""} />
      <input type="hidden" name="origen_page" value={page} />
    </>
  );
}
