import type { Metadata } from "next";
import { Inter, Playfair_Display, Oswald, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const ibmPlexMono = IBM_Plex_Mono({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-mono-spec" });

import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://universalsanitary.in"),
  title: "Universal Sanitary House | Premium Sanitaryware & Exclusive NECO Dealer",
  description: "Defining luxury spaces since 1968. Kerala's premier destination for luxury sanitaryware, architectural solutions, and exclusive NECO manhole & drainage covers dealer.",
  keywords: ["sanitaryware", "luxury spaces", "Jaquar", "Kohler", "Grohe", "TOTO", "Kerala", "Ernakulam", "Kochi", "bath fittings", "faucets", "NECO manhole covers"],
  openGraph: {
    title: "Universal Sanitary House",
    description: "Kerala's premier destination for luxury sanitaryware since 1968.",
    url: "https://universalsanitary.in",
    siteName: "Universal Sanitary House",
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Universal Sanitary House Hero",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal Sanitary House",
    description: "Kerala's premier destination for luxury sanitaryware since 1968.",
    images: ["/images/hero.jpeg"],
  },
  icons: {
    icon: "/images/logo/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${oswald.variable} ${ibmPlexMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
