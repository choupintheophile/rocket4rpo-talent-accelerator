"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simple auth check — hardcoded for now, replace with real auth later
    if (
      (email === "theo@rocket4rpo.com" && password === "R4RPO2026!") ||
      (email === "admin@rocket4rpo.com" && password === "R4RPO2026!") ||
      (email === "clement@rocket4rpo.com" && password === "R4RPO2026!")
    ) {
      // Set auth cookie/session
      document.cookie = "r4rpo_auth=1; path=/; max-age=86400; SameSite=Lax";
      router.push("/webapp-testing/vivier");
    } else {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px]"
        >
          <Link href="/" className="flex items-center mb-10">
            <Image
              src="/logo-rocket4rpo.webp"
              alt="Rocket4RPO"
              width={384}
              height={256}
              className="h-20 w-auto"
            />
          </Link>

          <h1 className="text-2xl font-bold mb-2">Connexion</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Accédez au vivier TA/TAM Rocket4RPO
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@entreprise.com"
                required
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60"
            >
              {loading ? "Connexion..." : "Se connecter"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Accès réservé aux équipes Rocket4RPO</span>
          </div>
        </motion.div>
      </div>

      {/* Right: Visual panel (desktop only) */}
      <div className="hidden lg:flex lg:w-[480px] bg-gradient-to-br from-rocket-dark via-rocket-navy-soft to-rocket-dark items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-rocket-teal/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-emerald-500/8 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/10">
            <Lock className="w-10 h-10 text-rocket-teal-glow" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Vivier TA/TAM</h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-[280px] mx-auto">
            Gérez votre vivier de Talent Acquisition Specialists. Scoring, classement et grille de questions d{"'"}entretien.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: "50+", label: "TA évalués" },
              { value: "7", label: "critères" },
              { value: "48h", label: "matching" },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-white font-bold font-mono text-lg">{stat.value}</div>
                <div className="text-white/40 text-[10px] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
