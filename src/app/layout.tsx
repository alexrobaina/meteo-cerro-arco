import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meteo Cerro ARCO - Estación Meteorológica",
  description: "Dashboard en tiempo real de condiciones meteorológicas para parapente en Cerro ARCO",
  openGraph: {
    title: "Meteo Cerro ARCO - Estación Meteorológica",
    description: "Dashboard en tiempo real de condiciones meteorológicas para parapente en Cerro ARCO",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cerro ARCO - Sitio de despegue de parapente",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meteo Cerro ARCO - Estación Meteorológica",
    description: "Dashboard en tiempo real de condiciones meteorológicas para parapente en Cerro ARCO",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
