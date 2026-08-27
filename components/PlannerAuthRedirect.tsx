"use client";

import { useEffect } from "react";

/**
 * Supabase puede volver al Site URL cuando un enlace de autenticación no
 * conserva la ruta solicitada. Si ese retorno trae una sesión, la llevamos al
 * planificador para que complete el inicio de sesión allí.
 */
export function PlannerAuthRedirect() {
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const hasAuthSession = params.has("access_token");
    const authError = params.get("error_code") || params.get("error");

    if (window.location.pathname === "/" && hasAuthSession) {
      window.location.replace(`/planificador-redes${hash}`);
    } else if (window.location.pathname === "/" && authError) {
      window.location.replace(`/planificador-redes?auth_error=${encodeURIComponent(authError)}`);
    }
  }, []);

  return null;
}
