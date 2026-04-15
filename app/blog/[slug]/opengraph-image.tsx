import { ImageResponse } from "next/og";

/**
 * v22.3 — OG image dynamique par article de blog.
 *
 * Runtime edge : plus rapide et moins coûteux.
 * Pas de dépendance Prisma (évite les 500 en prod causés par le bundling
 * de Prisma dans une route image). Le titre est dérivé du slug.
 */

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "Rocket4RPO — Article de blog";

/**
 * Convertit un slug en titre lisible.
 * Ex: "rpo-definition-complete-2026-0" → "RPO Definition Complete 2026"
 */
function slugToTitle(slug: string): string {
  return slug
    .replace(/-\d+$/, "") // retire suffix numérique -0, -1
    .replace(/^(p2|p3|extra)-/, "") // retire préfixes autogen
    .split("-")
    .map((w) => {
      // Mots en majuscules
      if (["rpo", "ta", "ats", "crm", "b2b", "b2c", "rh", "drh", "kpi", "ia"].includes(w.toLowerCase())) {
        return w.toUpperCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slugToTitle(slug).slice(0, 120) || "Rocket4RPO — Blog";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #0B3833 0%, #124944 45%, #0B3833 100%)",
          fontFamily: "Inter, sans-serif",
          color: "white",
          position: "relative",
        }}
      >
        {/* Orbes décoratifs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(20, 184, 166, 0.12)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.08)",
            filter: "blur(80px)",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(20, 184, 166, 0.2)",
              border: "1px solid rgba(20, 184, 166, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#2dd4bf",
            }}
          >
            R
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>
              ROCKET4RPO
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
              Cabinet RPO · Paris · Lyon
            </div>
          </div>
        </div>

        {/* Titre principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 16px",
              background: "rgba(20, 184, 166, 0.2)",
              border: "1px solid rgba(20, 184, 166, 0.4)",
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 600,
              color: "#5eead4",
              letterSpacing: 1,
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            📖 Article RPO
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: -1,
              color: "white",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24 }}>⚡</span>
              <span style={{ fontSize: 20, fontWeight: 600 }}>
                Recruteur intégré en 1 semaine
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#5eead4",
              letterSpacing: 0.5,
            }}
          >
            rocket4rpo.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
