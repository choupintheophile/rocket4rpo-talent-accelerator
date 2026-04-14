"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  TrendingDown,
  ArrowRight,
  Info,
  Briefcase,
  Calculator,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const formatEUR = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

export default function CoutRecrutementRateClient() {
  const [salaire, setSalaire] = useState(50000);
  const [moisJusquaDepart, setMoisJusquaDepart] = useState(8);
  const [niveau, setNiveau] = useState<"junior" | "confirme" | "senior" | "manager">(
    "confirme"
  );

  const calcul = useMemo(() => {
    // Coût direct = salaire chargé sur la période
    const salaireMensuelCharge = (salaire * 1.45) / 12;
    const coutSalaire = salaireMensuelCharge * moisJusquaDepart;

    // Coût recrutement initial (cabinet ~20% ou interne ~3 000-8 000€)
    const coutRecrutementInitial =
      niveau === "junior"
        ? 3000
        : niveau === "confirme"
        ? 8000
        : niveau === "senior"
        ? 14000
        : 22000;

    // Coût onboarding (formation, équipement, intégration)
    const coutOnboarding = niveau === "junior" ? 4000 : 6500;

    // Productivité réduite : 50% de productivité moyenne sur la période avant départ
    // Valeur ajoutée perdue = 1.5x salaire (règle empirique standard) × 50% × période
    const productivitePerdueMensuelle = (salaire * 1.5) / 12;
    const coutProductiviteReduite =
      productivitePerdueMensuelle * 0.5 * moisJusquaDepart;

    // Coût équipe (ralentissement, démoralisation)
    const coutEquipe = salaireMensuelCharge * 0.15 * moisJusquaDepart;

    // Coût re-recrutement (refaire l'opération, urgence × 1.3)
    const coutReRecrutement = coutRecrutementInitial * 1.3 + coutOnboarding;

    // Période sans poste pourvu (3 mois en moyenne pour rebooter)
    const coutPosteVacant = productivitePerdueMensuelle * 0.7 * 3;

    const total =
      coutSalaire +
      coutRecrutementInitial +
      coutOnboarding +
      coutProductiviteReduite +
      coutEquipe +
      coutReRecrutement +
      coutPosteVacant;

    return {
      coutSalaire,
      coutRecrutementInitial,
      coutOnboarding,
      coutProductiviteReduite,
      coutEquipe,
      coutReRecrutement,
      coutPosteVacant,
      total,
      multiple: total / salaire,
    };
  }, [salaire, moisJusquaDepart, niveau]);

  const breakdown = [
    {
      label: "Salaire chargé pendant la mission",
      value: calcul.coutSalaire,
      desc: `${moisJusquaDepart} mois × salaire × 1.45 (charges)`,
      color: "from-red-400 to-red-500",
    },
    {
      label: "Coût recrutement initial",
      value: calcul.coutRecrutementInitial,
      desc: "Cabinet, jobboards, temps RH/managers",
      color: "from-orange-400 to-orange-500",
    },
    {
      label: "Onboarding & équipement",
      value: calcul.coutOnboarding,
      desc: "Formation, matériel, licences, mentor",
      color: "from-amber-400 to-amber-500",
    },
    {
      label: "Productivité réduite",
      value: calcul.coutProductiviteReduite,
      desc: "Apport en valeur < 50% du potentiel",
      color: "from-yellow-400 to-yellow-500",
    },
    {
      label: "Impact sur l'équipe",
      value: calcul.coutEquipe,
      desc: "Démotivation, ralentissement collectif",
      color: "from-rose-400 to-rose-500",
    },
    {
      label: "Re-recrutement",
      value: calcul.coutReRecrutement,
      desc: "Refaire le process en urgence (+30%)",
      color: "from-pink-400 to-pink-500",
    },
    {
      label: "Poste vacant 3 mois",
      value: calcul.coutPosteVacant,
      desc: "Productivité non délivrée pendant le replacement",
      color: "from-fuchsia-400 to-fuchsia-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(220,20%,8%)] via-[hsl(220,18%,12%)] to-[hsl(220,20%,8%)] text-white">
      <div className="container-wide pt-8 pb-20">
        <div className="text-white/70 mb-4">
          <Breadcrumbs
            items={[
              { label: "Outils" },
              { label: "Coût recrutement raté" },
            ]}
          />
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Source DARES + données internes RPO
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Combien vous coûte
            <br />
            <span className="text-gradient bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              un recrutement raté ?
            </span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed">
            La perte cachée n'est pas le salaire : c'est l'addition de 7
            postes invisibles. Calcul personnalisé en 3 inputs.
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
              <Briefcase className="w-5 h-5 text-red-400" />
              Le contexte
            </h2>
            <p className="text-sm text-white/50 mb-8">
              Trois inputs, le coût total apparait à droite.
            </p>

            {/* Salaire */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Salaire annuel brut
              </label>
              <div className="relative">
                <input
                  type="range"
                  min={25000}
                  max={150000}
                  step={1000}
                  value={salaire}
                  onChange={(e) => setSalaire(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1.5">
                  <span>25K€</span>
                  <span>150K€</span>
                </div>
              </div>
              <div className="mt-3 text-3xl font-bold text-red-400 tabular-nums">
                {formatEUR(salaire)}
                <span className="text-sm font-normal text-white/40 ml-2">
                  brut / an
                </span>
              </div>
            </div>

            {/* Mois jusqu'au départ */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-white/80 mb-2">
                Durée jusqu'au départ
              </label>
              <p className="text-xs text-white/40 mb-3">
                En moyenne, un mauvais recrutement quitte ou est remercié entre
                3 et 12 mois.
              </p>
              <div className="relative">
                <input
                  type="range"
                  min={2}
                  max={18}
                  step={1}
                  value={moisJusquaDepart}
                  onChange={(e) => setMoisJusquaDepart(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1.5">
                  <span>2 mois</span>
                  <span>18 mois</span>
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold text-white/90 tabular-nums">
                {moisJusquaDepart}
                <span className="text-sm font-normal text-white/40 ml-2">
                  mois
                </span>
              </div>
            </div>

            {/* Niveau */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-white/80 mb-3">
                Niveau du poste
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: "junior", label: "Junior", sub: "0-2 ans" },
                    { id: "confirme", label: "Confirmé", sub: "3-5 ans" },
                    { id: "senior", label: "Senior", sub: "6-10 ans" },
                    { id: "manager", label: "Manager / Lead", sub: "10+ ans" },
                  ] as const
                ).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setNiveau(s.id)}
                    className={`p-3 rounded-xl border transition-all text-sm font-semibold ${
                      niveau === s.id
                        ? "border-red-500 bg-red-500/10 text-red-400"
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
                Plus le niveau est élevé, plus le coût de re-recrutement explose.
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
            {/* Total */}
            <div className="rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 p-8 text-center shadow-2xl shadow-red-500/20">
              <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                Coût total estimé
              </p>
              <p className="text-5xl md:text-6xl font-black text-white tabular-nums">
                {formatEUR(calcul.total)}
              </p>
              <p className="text-sm text-white/80 mt-3">
                Soit{" "}
                <strong className="text-white">
                  {calcul.multiple.toFixed(1)}× le salaire annuel brut
                </strong>
              </p>
            </div>

            {/* Breakdown */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Détail des 7 coûts cachés
              </h3>
              <div className="space-y-3">
                {breakdown.map((b) => {
                  const pct = (b.value / calcul.total) * 100;
                  return (
                    <div key={b.label}>
                      <div className="flex justify-between items-baseline text-sm mb-1">
                        <span className="text-white/85 font-medium">
                          {b.label}
                        </span>
                        <span className="font-bold text-white tabular-nums">
                          {formatEUR(b.value)}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${b.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                      <p className="text-[11px] text-white/40 mt-0.5">
                        {b.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-white/40 italic mt-4">
                * Modèle basé sur DARES (étude coût recrutement raté) +
                données Rocket4RPO 200+ recrutements.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            💡 La même somme aurait pu financer…
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Un TA Specialist RPO",
                value: `${Math.round(calcul.total / 600)} jours`,
                desc: "à temps partagé sur un an",
              },
              {
                title: "Une mission RPO complète",
                value: `${Math.round(calcul.total / 5000)} recrutements`,
                desc: "réussis et garantis",
              },
              {
                title: "Une équipe formée",
                value: `${Math.round(calcul.total / 1500)} jours`,
                desc: "de coaching senior",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.05] to-teal-500/[0.02] p-6 text-center"
              >
                <div className="text-3xl font-bold text-emerald-400 tabular-nums mb-1">
                  {c.value}
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {c.title}
                </div>
                <div className="text-xs text-white/50">{c.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Évitez l'erreur. Sécurisez vos recrutements.
          </h2>
          <p className="text-white/60 mb-6">
            Nos TA Specialists ont 92 % de rétention à 12 mois (vs 75 %
            marché). Diagnostic gratuit en 30 min.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/rdv"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl bg-emerald-500 text-white hover:bg-emerald-400 transition-all"
            >
              Réserver un diagnostic gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculateur"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-white/15 text-white hover:bg-white/[0.06] transition-all"
            >
              <Calculator className="w-4 h-4" />
              Comparer RPO vs cabinet vs interne
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
