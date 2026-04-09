"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingDown, Clock, Euro } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CTASection } from "@/components/shared/CTASection";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ROICalculatorClient() {
  const [postes, setPostes] = useState(5);
  const [salaire, setSalaire] = useState(55000);
  const [coutPct, setCoutPct] = useState(18);
  const [delai, setDelai] = useState(45);

  const RPO_PCT = 0.1;
  const RPO_DELAI = 28;

  const coutActuel = postes * salaire * (coutPct / 100);
  const coutRPO = postes * salaire * RPO_PCT;
  const economie = coutActuel - coutRPO;
  const gainJours = Math.max(0, (delai - RPO_DELAI) * postes);

  const maxBar = Math.max(coutActuel, coutRPO, 1);

  return (
    <>
      <Breadcrumbs items={[{ label: "Calculateur ROI" }]} />

      {/* Hero */}
      <section className="section-padding pt-8">
        <div className="container-tight text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Calculez vos économies avec le{" "}
            <span className="text-gradient">RPO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Comparez le coût de votre recrutement actuel avec une solution RPO.
            Ajustez les curseurs et visualisez instantanément le retour sur
            investissement.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-20 md:pb-28">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-10"
            >
              <h2 className="text-2xl font-bold">Vos paramètres</h2>

              {/* Postes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Nombre de postes à pourvoir
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={postes}
                    onChange={(e) =>
                      setPostes(
                        Math.min(50, Math.max(1, Number(e.target.value) || 1))
                      )
                    }
                    className="w-20 text-center text-sm"
                  />
                </div>
                <Slider
                  value={[postes]}
                  onValueChange={([v]) => setPostes(v)}
                  min={1}
                  max={50}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              {/* Salaire */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Salaire moyen brut annuel
                  </label>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={30000}
                      max={150000}
                      step={1000}
                      value={salaire}
                      onChange={(e) =>
                        setSalaire(
                          Math.min(
                            150000,
                            Math.max(30000, Number(e.target.value) || 30000)
                          )
                        )
                      }
                      className="w-28 text-center text-sm"
                    />
                    <span className="text-sm text-muted-foreground">€</span>
                  </div>
                </div>
                <Slider
                  value={[salaire]}
                  onValueChange={([v]) => setSalaire(v)}
                  min={30000}
                  max={150000}
                  step={1000}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30 000 €</span>
                  <span>150 000 €</span>
                </div>
              </div>

              {/* Cout % */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Coût actuel par recrutement (% du salaire)
                  </label>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={10}
                      max={30}
                      value={coutPct}
                      onChange={(e) =>
                        setCoutPct(
                          Math.min(
                            30,
                            Math.max(10, Number(e.target.value) || 10)
                          )
                        )
                      }
                      className="w-20 text-center text-sm"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[coutPct]}
                  onValueChange={([v]) => setCoutPct(v)}
                  min={10}
                  max={30}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10 %</span>
                  <span>30 %</span>
                </div>
              </div>

              {/* Délai */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Délai actuel moyen de recrutement
                  </label>
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={20}
                      max={120}
                      value={delai}
                      onChange={(e) =>
                        setDelai(
                          Math.min(
                            120,
                            Math.max(20, Number(e.target.value) || 20)
                          )
                        )
                      }
                      className="w-20 text-center text-sm"
                    />
                    <span className="text-sm text-muted-foreground">jours</span>
                  </div>
                </div>
                <Slider
                  value={[delai]}
                  onValueChange={([v]) => setDelai(v)}
                  min={20}
                  max={120}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>20 jours</span>
                  <span>120 jours</span>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold">Résultats estimés</h2>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${postes}-${salaire}-${coutPct}-${delai}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Bar chart */}
                  <div className="rounded-xl border bg-card p-6 space-y-5">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Comparaison des coûts
                    </h3>

                    {/* Current cost bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span>Recrutement actuel</span>
                        <span className="font-semibold">
                          {formatCurrency(coutActuel)}
                        </span>
                      </div>
                      <div className="h-8 w-full rounded-md bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-md bg-muted-foreground/30"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(coutActuel / maxBar) * 100}%`,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* RPO cost bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span>Solution RPO</span>
                        <span className="font-semibold text-primary">
                          {formatCurrency(coutRPO)}
                        </span>
                      </div>
                      <div className="h-8 w-full rounded-md bg-secondary overflow-hidden">
                        <motion.div
                          className="h-full rounded-md bg-primary"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(coutRPO / maxBar) * 100}%`,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* KPI cards */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border bg-card p-6 text-center space-y-2">
                      <Euro className="w-6 h-6 mx-auto text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Économie estimée
                      </p>
                      <p
                        className={`text-3xl font-bold ${
                          economie > 0 ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {economie > 0 ? "+" : ""}
                        {formatCurrency(economie)}
                      </p>
                    </div>

                    <div className="rounded-xl border bg-card p-6 text-center space-y-2">
                      <Clock className="w-6 h-6 mx-auto text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Gain de temps estimé
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        {gainJours} jours
                      </p>
                    </div>

                    <div className="rounded-xl border bg-card p-6 text-center space-y-2">
                      <TrendingDown className="w-6 h-6 mx-auto text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Réduction du coût
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        {coutActuel > 0
                          ? `-${Math.round((economie / coutActuel) * 100)} %`
                          : "0 %"}
                      </p>
                    </div>

                    <div className="rounded-xl border bg-card p-6 text-center space-y-2">
                      <Clock className="w-6 h-6 mx-auto text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Délai moyen RPO
                      </p>
                      <p className="text-3xl font-bold text-primary">
                        28 jours
                      </p>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href="/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      Recevoir une analyse détaillée{" "}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors"
                    >
                      Parler à un expert
                    </a>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-muted-foreground italic">
                    * Estimations basées sur nos données internes. Chaque
                    situation est unique.
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
