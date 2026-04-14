import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rocket4RPO — Recrutement externalisé sur-mesure pour startups, scale-ups et ETI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, hsl(220, 20%, 8%) 0%, hsl(220, 18%, 12%) 100%)",
          position: "relative",
        }}
      >
        {/* Decorative gradient orbs */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(13, 147, 115, 0.35) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 65%)",
            borderRadius: "50%",
          }}
        />

        {/* Top bar — logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, #10b981 0%, #0d9373 100%)",
              fontSize: "32px",
              fontWeight: 900,
              color: "white",
            }}
          >
            R
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              Rocket4RPO
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: "2px",
              }}
            >
              RPO France · Recruteur intégré
            </div>
          </div>
        </div>

        {/* Title + subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: "960px",
            }}
          >
            Recrutement externalisé{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              sur-mesure.
            </span>
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.65)",
              marginTop: "24px",
              lineHeight: 1.35,
              maxWidth: "900px",
              fontWeight: 400,
            }}
          >
            Recruteur senior intégré en 1 semaine · 200+ recrutements · 5x
            moins cher qu&apos;un cabinet
          </div>
        </div>

        {/* Bottom — 3 metrics + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1,
            gap: "20px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "48px" }}>
            {[
              { value: "200+", label: "recrutements" },
              { value: "4 sem.", label: "time-to-hire" },
              { value: "50+", label: "entreprises" },
            ].map((m) => (
              <div key={m.value} style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 900,
                    color: "#10b981",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {m.value}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            rocket4rpo.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
