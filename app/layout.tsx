import type { Metadata } from "next";
import { Space_Grotesk, Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Stride's own brand typefaces — loaded site-wide (next/font requires a
// module-level call) but only ever applied via the `font-stride-sans` /
// `font-stride-mono` utilities below, which nothing outside the Stride case
// study's "Design system" panel uses.
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://florenciamicieli.com.ar";
const title = "Florencia Micieli — UX/UI Designer · Product Design";
const description =
  "3+ years designing B2B and SaaS products. Design systems, high-fidelity prototypes, and a workflow powered by generative AI to explore, document, and build interfaces independently.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Florencia Micieli",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable} antialiased bg-bg text-text-primary`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
