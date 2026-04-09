import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "@/index.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { SocialProofWidget } from "@/components/shared/SocialProofWidget";
import { StickyCTA } from "@/components/shared/StickyCTA";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rocket4RPO — Talent Acquisition RPO pour entreprises Tech",
    template: "%s | Rocket4RPO",
  },
  description:
    "Rocket4RPO met à disposition des Talent Acquisition Specialists experts pour accélérer vos recrutements Sales, IT, Finance, Marketing et fonctions support.",
  metadataBase: new URL("https://rocket4rpo.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Rocket4RPO",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Rocket4RPO — Le seul RPO spécialisé Sales SaaS en France",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "VERIFICATION_CODE_HERE",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P6DMKRLC');`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P6DMKRLC"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg">
            Aller au contenu principal
          </a>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-1 pt-16 lg:pt-20">{children}</main>
            <Footer />
          </div>
          <SocialProofWidget />
          <StickyCTA />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
