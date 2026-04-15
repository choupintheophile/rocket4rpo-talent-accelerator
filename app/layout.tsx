import type { Metadata } from "next";
import { Inter, Space_Grotesk, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import "@/index.css";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/shared/StickyCTA";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import { ConversationalCTA } from "@/components/shared/ConversationalCTA";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { organizationSchema, professionalServiceSchema } from "@/lib/seo";

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

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RPO France — Recruteur intégré en 1 semaine | Rocket4RPO",
    template: "%s | Rocket4RPO",
  },
  description:
    "Recruteur senior intégré en 1 semaine, 5x moins cher qu'un cabinet. 200+ recrutements réalisés. Diagnostic gratuit →",
  metadataBase: new URL("https://rocket4rpo.com"),
  alternates: {
    canonical: "/",
    // v22.2 — Hreflang : signaler au moteur que le site est FR-FR par défaut
    // Si expansion internationale : ajouter "en-US": "https://rocket4rpo.com/en" etc.
    languages: {
      "fr-FR": "https://rocket4rpo.com",
      "x-default": "https://rocket4rpo.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Rocket4RPO",
    // images: auto-détecté depuis app/opengraph-image.tsx (génère OG dynamique)
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} ${dmSerif.variable}`}>
      <head>
        {/* v22.3 — Perf hints : preconnect + dns-prefetch pour les origins tiers critiques */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://meetings.hubspot.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://meetings.hubspot.com" />

        {/* Global structured data (Organization + ProfessionalService) — crawled on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, professionalServiceSchema]),
          }}
        />
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
          <MarketingShell
            navbar={<Navbar />}
            footer={<Footer />}
            extras={
              <>
                <StickyCTA />
                <div className="hidden lg:block"><ExitIntentPopup /></div>
                <div className="hidden lg:block"><ConversationalCTA /></div>
                <CookieBanner />
              </>
            }
          >
            {children}
          </MarketingShell>
        </Providers>
      </body>
    </html>
  );
}
