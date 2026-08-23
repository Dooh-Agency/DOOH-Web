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
  title: "DOOH Agency — Creative Tech Studio | Buenos Aires & Málaga",
  description:
    "Agencia creativa que combina diseño, estrategia e inteligencia artificial para construir marcas con propósito.",
  openGraph: {
    title: "DOOH Agency",
    description: "Diseño, estrategia e inteligencia artificial para marcas con propósito.",
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
