"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Video,
  Shield,
  MapPin,
  Mail,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Check,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CTASection } from "@/components/shared/CTASection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const infoCards = [
  {
    icon: Clock,
    title: "Réponse sous 24h",
    description: "Notre équipe vous recontacte en moins d\u2019un jour ouvré.",
  },
  {
    icon: Video,
    title: "Diagnostic gratuit de 30 min",
    description: "Un audit de votre processus de recrutement, sans engagement.",
  },
  {
    icon: Shield,
    title: "Sans engagement",
    description: "Aucun engagement long terme. Vous pilotez la durée de la mission.",
  },
];

const stepTitles = ["Parlons de vous", "Votre entreprise", "Votre besoin"];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function ContactClient() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    company: "",
    teamSize: "",
    positions: "",
    message: "",
    source: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Validate current step
    if (step === 0) {
      if (!formData.email.trim() || !formData.firstName.trim()) {
        toast.error("Veuillez remplir tous les champs.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Veuillez entrer une adresse email valide.");
        return;
      }
    }
    if (step === 1) {
      if (!formData.company.trim()) {
        toast.error("Veuillez indiquer votre entreprise.");
        return;
      }
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, 2));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Log for now (HubSpot integration later)
    console.log("Contact form submission:", formData);

    // Simulate async submission
    await new Promise((r) => setTimeout(r, 800));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Demande envoyée avec succès !");
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT -- Form (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {"Parlons de vos "}
                <span className="text-gradient">{"recrutements Sales"}</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {"Décrivez vos besoins et nous vous proposerons le modèle d\u2019accompagnement le plus adapté."}
              </p>

              {/* Progress bar */}
              <div className="mt-8 mb-6">
                <div className="flex items-center justify-between mb-2">
                  {stepTitles.map((title, i) => (
                    <span
                      key={i}
                      className={`text-xs font-medium transition-colors ${
                        i <= step
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {title}
                    </span>
                  ))}
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "33.33%" }}
                    animate={{ width: `${((step + 1) / 3) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {`Étape ${step + 1} sur 3`}
                </p>
              </div>

              {isSuccess ? (
                /* Success state */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                  >
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <Check className="w-10 h-10 text-primary" />
                    </motion.div>
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Merci !</h2>
                  <p className="text-muted-foreground text-lg">
                    Nous vous répondons sous 24h.
                  </p>
                </motion.div>
              ) : (
                /* Multi-step form */
                <form onSubmit={handleSubmit}>
                  <div className="relative overflow-hidden min-h-[280px]">
                    <AnimatePresence mode="wait" custom={direction}>
                      {step === 0 && (
                        <motion.div
                          key="step-0"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="email">Email professionnel *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="jean@entreprise.com"
                              value={formData.email}
                              onChange={(e) =>
                                updateField("email", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="firstName">{"Prénom *"}</Label>
                            <Input
                              id="firstName"
                              placeholder="Jean"
                              value={formData.firstName}
                              onChange={(e) =>
                                updateField("firstName", e.target.value)
                              }
                              required
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="company">Entreprise *</Label>
                            <Input
                              id="company"
                              placeholder="Nom de votre entreprise"
                              value={formData.company}
                              onChange={(e) =>
                                updateField("company", e.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>{"Taille de l\u2019équipe"}</Label>
                            <Select
                              value={formData.teamSize}
                              onValueChange={(v) => updateField("teamSize", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-50">1 - 50</SelectItem>
                                <SelectItem value="51-200">51 - 200</SelectItem>
                                <SelectItem value="201-500">
                                  201 - 500
                                </SelectItem>
                                <SelectItem value="500+">500+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="positions">
                              {"Nombre de postes à pourvoir"}
                            </Label>
                            <Input
                              id="positions"
                              type="number"
                              min={1}
                              placeholder="Ex : 5"
                              value={formData.positions}
                              onChange={(e) =>
                                updateField("positions", e.target.value)
                              }
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-5"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="message">Votre message</Label>
                            <Textarea
                              id="message"
                              placeholder="Décrivez votre besoin en quelques lignes..."
                              rows={4}
                              value={formData.message}
                              onChange={(e) =>
                                updateField("message", e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>
                              {"Comment nous avez-vous connu ?"}
                            </Label>
                            <Select
                              value={formData.source}
                              onValueChange={(v) => updateField("source", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="google">Google</SelectItem>
                                <SelectItem value="linkedin">
                                  LinkedIn
                                </SelectItem>
                                <SelectItem value="recommandation">
                                  Recommandation
                                </SelectItem>
                                <SelectItem value="evenement">
                                  {"Événement"}
                                </SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex items-center gap-4 mt-6">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                    )}
                    <div className="flex-1" />
                    {step < 2 ? (
                      <Button
                        type="button"
                        size="lg"
                        onClick={nextStep}
                      >
                        Suivant
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Envoi en cours..."
                          : "Envoyer ma demande"}
                        {!isSubmitting && (
                          <ArrowRight className="w-4 h-4 ml-2" />
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              )}

              {/* Calendly fallback */}
              <div className="mt-6 p-4 rounded-xl border border-border bg-muted/50 flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    {"Ou réservez directement un créneau"}
                  </p>
                  <a
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {"Planifier un appel de 30 min \u2192"}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT -- Info cards (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              {infoCards.map((card, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl border border-border bg-card flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Addresses */}
              <div className="p-5 rounded-xl border border-border bg-card space-y-4">
                <h3 className="font-bold">Nos bureaux</h3>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Paris</p>
                    <p className="text-sm text-muted-foreground">
                      {"\u00cele-de-France"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Villeurbanne</p>
                    <p className="text-sm text-muted-foreground">
                      {"Auvergne-Rh\u00f4ne-Alpes"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-5 rounded-xl border border-border bg-card flex gap-3 items-center">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:contact@rocket4rpo.com"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  contact@rocket4rpo.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mini-testimonial */}
      <section className="py-12 bg-muted/30">
        <div className="container-tight text-center">
          <p className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
            &ldquo;En 30 minutes de diagnostic, l&apos;équipe Rocket4RPO a
            identifié 3 optimisations immédiates dans notre process de
            recrutement. Pragmatique et sans bullshit.&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold">
            — T.B., CEO, Start-up HealthTech (30 pers.)
          </p>
        </div>
      </section>

      {/* CTA Section with custom text */}
      <CTASection
        title="Pr\u00eat \u00e0 diviser vos co\u00fbts de recrutement par 3\u00a0?"
        subtitle="Recevez un diagnostic gratuit et d\u00e9couvrez combien vous pouvez \u00e9conomiser avec le RPO."
        ctaLabel="R\u00e9server un appel"
        ctaHref="/contact"
      />
    </>
  );
}
