"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  ArrowRight,
  Info,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const formatEUR = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

const SCENARIOS = [
  { label: "Démarrage", days: 140, marge: 1.05, desc: "1ère année freelance" },
  { label: "Confortable", days: 180, marge: 1.15, desc: "Activité installée" },
  { label: "Optimal", days: 220, marge: 1.25, desc: "Réseau solide, demande forte" },
];

export default function TjmFreelanceClient() {
  const [revenuNet, setRevenuNet] = useState(60000);
  const [chargesFixes, setChargesFixes] = useState(8000);
  const [statut, setStatut] = useState<"eurl" | "sasu" | "micro">("eurl");

  // Coefficient brut→net selon statut (charges sociales + IS)
  const coefBrutNet = statut === "micro" ? 0.78 : statut === "eurl" ? 0.55 : 0.5;

  const calcul = useMemo(() => {
    return SCENARIOS.map((s) => {
      // CA brut nécessaire = (revenu net + charges fixes) / coef
      const caNecessaire = (revenuNet + chargesFixes) / coefBrutNet;
      // TJM minimum = CA / jours facturables
      const tjmMin = caNecessaire / s.days;
      // TJM avec marge sécurité
      const tjmRecommande = tjmMin * s.marge;
      return {
        ...s,
        tjmMin: Math.round(tjmMin),
        tjmRecommande: Math.round(tjmRecommande),
        caAnnuel: Math.round(tjmRecommande * s.days),
      };
    });
  }, [revenuNet, chargesFixes, coefBrutNet]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(220,20%,8%)] via-[hsl(220,18%,12%)] to-[hsl(220,20%,8%)] text-white">
      <div className="container-wide pt-8 pb-20">
        <div className="text-white/70 mb-4">
          <Breadcrumbs items={[{ label: "Outils" }, { label: "Calculateur TJM" }]} />
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5">
            <Calculator className="w-3.5 h-3.5" />
            Outil gratuit · 30 secondes
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Quel <span className="text-gradient bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">TJM</span> viser
            <br />en tant que TA freelance ?
          </h1>
          <p className="text-lg text-white/60 leading-relaxed">
            Entrez votre objectif de revenu, on calcule le TJM minimum et le TJM
            recommandé pour 3 scénarios d'activité.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 max-w-6xl mx-auto">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8"
          >
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              Vos paramètres
            </h2>
            <p className="text-sm text-white/50 mb-8">
              Trois inputs, calcul instantané.
            </p>

            {/* Revenu net souhaité */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Revenu net annuel souhaité
              </label>
              <div className="relative">
                <input
                  type="range"
                  min={30000}
                  max={150000}
                  step={1000}
                  value={revenuNet}
                  onChange={(e) => setRevenuNet(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1.5">
                  <span>30K€</span>
                  <span>150K€</span>
                </div>
              </div>
              <div className="mt-3 text-3xl font-bold text-emerald-400 tabular-nums">
                {formatEUR(revenuNet)}
                <span className="text-sm font-normal text-white/40 ml-2">
                  net / an
                </span>
              </div>
            </div>

            {/* Charges fixes */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Charges fixes annuelles
              </label>
              <p className="text-xs text-white/40 mb-3">
                Loyer pro, mutuelle, comptable, outils, formation, prévoyance…
              </p>
              <div className="relative">
                <input
                  type="range"
                  min={2000}
                  max={20000}
                  step={500}
                  value={chargesFixes}
                  onChange={(e) => setChargesFixes(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1.5">
                  <span>2K€</span>
                  <span>20K€</span>
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold text-white/90 tabular-nums">
                {formatEUR(chargesFixes)}
                <span className="text-sm font-normal text-white/40 ml-2">/ an</span>
              </div>
            </div>

            {/* Statut */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-white/80 mb-3">
                Statut juridique
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: "micro", label: "Micro", sub: "AE" },
                    { id: "eurl", label: "EURL/SARL", sub: "IR" },
                    { id: "sasu", label: "SASU/SAS", sub: "IS" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatut(s.id)}
                    className={`p-3 rounded-xl border transition-all text-sm font-semibold ${
                      statut === s.id
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20"
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-[10px] font-normal opacity-70">
                      {s.sub}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/40 mt-2 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                Le coefficient brut→net varie : Micro ~78%, EURL ~55%, SASU ~50%
              </p>
            </div>
          </motion.div>

          {/* Outputs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Vos TJM par scénario
            </h2>

            {calcul.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className={`rounded-2xl p-6 border ${
                  i === 1
                    ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/[0.08] to-teal-500/[0.04] shadow-lg shadow-emerald-500/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{s.label}</h3>
                      {i === 1 && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Recommandé
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/50">{s.desc}</p>
                  </div>
                  <div className="text-right text-xs text-white/40">
                    <div>{s.days} jours</div>
                    <div>facturables/an</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mb-1">
                      TJM minimum
                    </div>
                    <div className="text-2xl font-bold text-white tabular-nums">
                      {s.tjmMin} €
                      <span className="text-xs font-normal text-white/40 ml-1">
                        /j
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                      TJM recommandé
                    </div>
                    <div className="text-2xl font-bold text-emerald-400 tabular-nums">
                      {s.tjmRecommande} €
                      <span className="text-xs font-normal text-emerald-400/60 ml-1">
                        /j
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between text-xs">
                  <span className="text-white/50">CA cible annuel</span>
                  <span className="font-semibold text-white tabular-nums">
                    {formatEUR(s.caAnnuel)}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Disclaimer */}
            <p className="text-xs text-white/40 italic mt-4">
              * Calcul indicatif. Coef. brut→net moyens (variations selon
              tranche TVA, salaire dirigeant, prévoyance complémentaire).
              Provisionner 22 % minimum pour charges sociales URSSAF.
            </p>
          </motion.div>
        </div>

        {/* Mini case study */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-4xl mx-auto mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-lg mb-1">Cas réel — TA Manager freelance, 1ère année</h3>
              <p className="text-sm text-white/50">
                Reconversion après 7 ans en cabinet, 1ère année en EURL.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            {[
              { label: "Objectif net", value: "55 000 €", desc: "Revenu personnel net" },
              { label: "Charges", value: "9 200 €", desc: "Compta, mutuelle, prévoyance, outils" },
              { label: "Jours facturables", value: "165 j", desc: "Vacances, congés, formation, vide" },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-xl bg-white/[0.04] border-l-2 border-emerald-400 p-4"
              >
                <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">
                  {b.label}
                </div>
                <div className="text-xl font-bold tabular-nums">{b.value}</div>
                <div className="text-xs text-white/50 mt-1">{b.desc}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-emerald-500/10 border-l-4 border-emerald-400 p-4 text-sm">
            <strong className="text-emerald-400">Résultat :</strong> TJM
            recommandé <strong className="text-white">770 €/j</strong> pour
            sécuriser le revenu net + provisions URSSAF + 15 % de marge tampon.
            Mission Rocket4RPO acceptée à 720 €/j (3 jours/sem.) → 113 K€ CA en 12 mois.
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Envie de rejoindre notre réseau de TA freelance ?
          </h2>
          <p className="text-white/60 mb-6">
            Missions cadrées, clients exigeants, paiement à 30 jours, zéro prospection.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/recrutement"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 transition-all"
            >
              Postuler en 15 minutes
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ressources/checklist-freelance-rpo.pdf"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-white/15 text-white hover:bg-white/[0.06] transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Checklist freelance complète
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
