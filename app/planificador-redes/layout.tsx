import type { Metadata } from "next";

// Herramienta interna del equipo: fuera de buscadores aunque la URL sea pública.
export const metadata: Metadata = {
  title: "Planificador de redes | DOOH Agency",
  robots: { index: false, follow: false },
};

export default function PlannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
