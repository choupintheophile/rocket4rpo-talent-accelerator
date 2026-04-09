"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ClipboardCheck,
  BarChart3,
  CheckSquare,
  Download,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const resources = [
  {
    title: "Guide : RPO vs Cabinet — Le comparatif complet",
    description:
      "12 pages pour comprendre les différences de coût, flexibilité et efficacité entre RPO et cabinet de recrutement traditionnel.",
    badge: "Guide PDF",
    icon: FileText,
  },
  {
    title: "Template : Scorecard de recrutement Sales SaaS",
    description:
      "Notre modèle de scorecard utilisé pour évaluer les profils SDR, AE et Sales Manager dans l'écosystème SaaS.",
    badge: "Template",
    icon: ClipboardCheck,
  },
  {
    title: "Étude : Grille de rémunération Sales & Tech 2026",
    description:
      "Fourchettes salariales actualisées pour 30+ postes Sales et Tech en Île-de-France et région.",
    badge: "Étude",
    icon: BarChart3,
  },
  {
    title: "Checklist : Les 10 étapes d'un onboarding réussi",
    description:
      "La checklist utilisée par nos Talent Acquisition Specialists pour intégrer un nouveau collaborateur efficacement.",
    badge: "Checklist",
    icon: CheckSquare,
  },
];

export default function RessourcesClient() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDownloadClick = (title: string) => {
    setSelectedResource(title);
    setEmail("");
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Veuillez entrer une adresse email valide.");
      return;
    }

    setIsSubmitting(true);
    console.log("Lead magnet download:", { email, resource: selectedResource });

    // Simulate async submission
    await new Promise((r) => setTimeout(r, 600));

    setIsSubmitting(false);
    setDialogOpen(false);
    toast.success("Document envoyé à votre email !");
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Ressources" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {"Ressources gratuites pour "}
              <span className="text-gradient">
                {"accélérer vos recrutements"}
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Guides, templates et études conçus par nos experts Talent
              Acquisition
            </p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-2 gap-6">
            {resources.map((resource, i) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="p-6 rounded-xl border border-border bg-card flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary mb-2">
                      {resource.badge}
                    </span>
                    <h2 className="text-lg font-bold leading-snug">
                      {resource.title}
                    </h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {resource.description}
                </p>
                <Button
                  className="mt-5 w-full"
                  onClick={() => handleDownloadClick(resource.title)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger gratuitement
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead capture dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recevoir le document</DialogTitle>
            <DialogDescription>
              Entrez votre email professionnel pour recevoir le document
              gratuitement.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="lead-email">Email professionnel</Label>
              <Input
                id="lead-email"
                type="email"
                placeholder="jean@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Recevoir le document"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Pas de spam. Vos données restent confidentielles.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <CTASection
        title="Besoin d'un accompagnement sur mesure ?"
        subtitle="Discutez avec un expert Talent Acquisition et recevez un diagnostic gratuit de votre processus de recrutement."
        ctaLabel="Parler à un expert"
        ctaHref="/contact"
      />
    </>
  );
}
