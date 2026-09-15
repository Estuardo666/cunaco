import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

/**
 * Body type — Quicksand is the rounded sans the Cuna&Co. app itself ships
 * (see the brand kit's embedded `CunaBody` face).
 */
const quicksand = Quicksand({
  variable: "--fx-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Display type — the brand manual specifies Helvetica Rounded Bold, which is a
 * commercial face with no web licence (SITE_PLAN §6, open question 0). Fredoka
 * is the free rounded substitute nominated there; swap the import here if the
 * licence is ever bought.
 */
const fredoka = Fredoka({
  variable: "--fx-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Cuna&Co. — Acompañamiento para mamás, del embarazo a la crianza",
  description:
    "App creada por la Dra. Yasmín Sánchez León, pediatra. Registro diario, curvas de crecimiento OMS, vacunas y acompañamiento 24/7 para el embarazo y los primeros años.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuna&Co. — Acompañamiento para mamás",
    description:
      "Registro diario, curvas de crecimiento OMS, vacunas y acompañamiento 24/7. Creada por una pediatra en ejercicio.",
    images: ["/brand/cunaco/mascota_juntos.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`fx-page ${quicksand.variable} ${fredoka.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
