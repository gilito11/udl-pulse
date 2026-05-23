import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UDL-Pulse · La teva vida UdL, en una app",
  description:
    "L'aplicació pensada per als estudiants de la Universitat de Lleida. Entrades, descomptes i agenda en un sol lloc.",
  applicationName: "UDL-Pulse",
  authors: [{ name: "Eric Gil" }],
  keywords: [
    "UdL",
    "Universitat de Lleida",
    "estudiants",
    "Lleida",
    "TETEO",
    "Festa Major",
    "descomptes universitaris",
  ],
  openGraph: {
    title: "UDL-Pulse · La teva vida UdL, en una app",
    description:
      "Entrades, descomptes i agenda universitària en un sol lloc — verificat amb el teu email UdL.",
    locale: "ca_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ca"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
