import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Animations }   from "@/components/Animations";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOOH Agency — Publicidad Exterior Premium",
  description:
    "Agencia especializada en DOOH. Diseño, producción y gestión de campañas en pantallas digitales de alto impacto.",
  openGraph: {
    title: "DOOH Agency",
    description: "Publicidad exterior premium en pantallas digitales.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={nunitoSans.variable}>
      <body>
        <SmoothScroll />
        <Animations />
        {children}
      </body>
    </html>
  );
}
