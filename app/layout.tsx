import type { Metadata } from "next";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Animations }   from "@/components/Animations";
import { PlannerAuthRedirect } from "@/components/PlannerAuthRedirect";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Nunito Sans variable (200–900, subconjunto latino) alojada en el repo: el build
// no depende de descargar la fuente de Google Fonts.
const nunitoSans = localFont({
  src: "./fonts/NunitoSans-latin.woff2",
  weight: "200 900",
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DOOH Agency — Creative Tech Studio | Buenos Aires & Málaga",
  description:
    "Agencia creativa que combina diseño, estrategia e inteligencia artificial para construir marcas con propósito.",
  openGraph: {
    title: "DOOH Agency",
    description: "Diseño, estrategia e inteligencia artificial para marcas con propósito.",
    locale: "es_AR",
    type: "website",
    siteName: "DOOH Agency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={nunitoSans.variable}>
      <body>
        <PlannerAuthRedirect />
        <SmoothScroll />
        <Animations />
        {children}
      </body>
    </html>
  );
}
