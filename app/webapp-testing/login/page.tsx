"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const ALLOWED_DOMAIN = "rocket4rpo.com";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (el: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const handleGoogleCallback = useCallback(
    async (response: { credential: string }) => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ googleCredential: response.credential }),
        });
        const data = await res.json();
        if (res.ok) {
          router.push("/webapp-testing/vivier");
        } else {
          setError(data.error || "Erreur de connexion Google");
        }
      } catch {
        setError("Erreur de connexion");
      }
      setLoading(false);
    },
    [router],
  );

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          hd: ALLOWED_DOMAIN,
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: 380,
        });
        setGoogleLoaded(true);
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [handleGoogleCallback]);

  return (
    <div className="min-h-screen flex">
      {/* Left — login */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] text-center"
        >
          <Link href="/" className="inline-flex items-center mb-10">
            <Image
              src="/logo-rocket4rpo.webp"
              alt="Rocket4RPO"
              width={384}
              height={256}
              className="h-20 w-auto"
            />
          </Link>

          <h1 className="text-2xl font-bold mb-2">Connexion</h1>
          <p className="text-muted-foreground text-sm mb-10">
            Connectez-vous avec votre compte Google @rocket4rpo.com
          </p>

          {/* Google button */}
          <div className="flex justify-center mb-4">
            <div ref={googleBtnRef} />
            {!googleLoaded && (
              <button
                disabled
                className="flex items-center justify-center gap-3 px-8 py-3 text-sm font-medium rounded-xl border border-gray-300 bg-white text-gray-500"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Chargement...
              </button>
            )}
          </div>

          {loading && (
            <p className="text-sm text-muted-foreground animate-pulse">
              Connexion en cours...
            </p>
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mt-4"
            >
              {error}
            </motion.p>
          )}

          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>{"Accès réservé aux équipes @rocket4rpo.com"}</span>
          </div>
        </motion.div>
      </div>

      {/* Right — branding */}
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-rocket-teal/10 blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-emerald-500/8 blur-[100px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/10">
            <Lock className="w-10 h-10 text-rocket-teal-glow" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-8">Vivier TA/TAM</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "4 100+", label: "profils évalués" },
              { value: "15", label: "critères" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="text-white font-bold font-mono text-lg">
                  {stat.value}
                </div>
                <div className="text-white/40 text-[10px] mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
