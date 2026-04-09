"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

type CellValue = "check" | "x" | "minus" | string;

interface Row {
  label: string;
  rpo: CellValue;
  internal: CellValue;
  cabinet: CellValue;
}

const rows: Row[] = [
  {
    label: "Coût pour 10 recrutements",
    rpo: "~44\u00a0000\u00a0\u20ac",
    internal: "50\u00a0000-70\u00a0000\u00a0\u20ac",
    cabinet: "60\u00a0000-200\u00a0000\u00a0\u20ac",
  },
  {
    label: "Flexibilité (arrêt sans préavis)",
    rpo: "check",
    internal: "x",
    cabinet: "minus",
  },
  {
    label: "Time-to-hire moyen",
    rpo: "6 semaines",
    internal: "8-12 semaines",
    cabinet: "8-10 semaines",
  },
  {
    label: "Expertise marché du recrutement",
    rpo: "check",
    internal: "minus",
    cabinet: "minus",
  },
  {
    label: "Intégration dans votre équipe",
    rpo: "check",
    internal: "check",
    cabinet: "x",
  },
  {
    label: "Reporting & KPIs hebdomadaires",
    rpo: "check",
    internal: "minus",
    cabinet: "x",
  },
  {
    label: "Engagement minimum",
    rpo: "1 mois",
    internal: "CDI / 12 mois",
    cabinet: "Par mission",
  },
  {
    label: "Rétention à 12 mois",
    rpo: "92\u00a0%",
    internal: "Variable",
    cabinet: "Non garanti",
  },
];

const CellIcon = ({ value }: { value: CellValue }) => {
  if (value === "check")
    return <Check className="w-5 h-5 text-primary mx-auto" />;
  if (value === "x")
    return <X className="w-5 h-5 text-destructive/70 mx-auto" />;
  if (value === "minus")
    return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
  return (
    <span className="text-sm text-center block">{value}</span>
  );
};

export const ComparisonSection = () => (
  <section className="section-padding bg-background">
    <div className="container-wide">
      <SectionHeading
        badge="Comparatif"
        title={
          <>
            {"RPO vs cabinet vs recruteur interne\u00a0: "}
            <span className="text-gradient">{"les chiffres parlent"}</span>
          </>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="text-left text-sm font-medium text-muted-foreground p-4 w-1/4" />
              <th className="text-center p-4 w-1/4 rounded-t-xl bg-primary/5 border-x-2 border-t-2 border-primary/20">
                <span className="text-base font-bold text-primary">
                  RPO Rocket4RPO
                </span>
              </th>
              <th className="text-center p-4 w-1/4">
                <span className="text-sm font-semibold text-foreground">
                  Recruteur interne
                </span>
              </th>
              <th className="text-center p-4 w-1/4">
                <span className="text-sm font-semibold text-foreground">
                  Cabinet de recrutement
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`${i % 2 === 0 ? "bg-muted/30" : ""} hover:bg-primary/5 transition-colors duration-200`}
              >
                <td className="text-sm font-medium p-4">{row.label}</td>
                <td className="p-4 bg-primary/5 border-x-2 border-primary/20">
                  <CellIcon value={row.rpo} />
                </td>
                <td className="p-4">
                  <CellIcon value={row.internal} />
                </td>
                <td className="p-4">
                  <CellIcon value={row.cabinet} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="pt-6 pb-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-center"
                >
                  <p className="text-sm font-semibold text-primary">
                    {"Verdict\u00a0: le RPO est recommandé si vous recrutez 3+ postes par trimestre. Coût prévisible, expertise immédiate, zéro engagement long terme."}
                  </p>
                </motion.div>
              </td>
            </tr>
          </tfoot>
        </table>
      </motion.div>
    </div>
  </section>
);
