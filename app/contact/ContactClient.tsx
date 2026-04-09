"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Clock, Video, Shield, MapPin, Mail, ArrowRight, ExternalLink } from "lucide-react";
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
    title: "R\u00e9ponse sous 24h",
    description: "Notre \u00e9quipe vous recontacte en moins d\u2019un jour ouvr\u00e9.",
  },
  {
    icon: Video,
    title: "Diagnostic gratuit de 30 min",
    description: "Un audit de votre processus de recrutement, sans engagement.",
  },
  {
    icon: Shield,
    title: "Sans engagement",
    description: "Aucun engagement long terme. Vous pilotez la dur\u00e9e de la mission.",
  },
];

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamSize, setTeamSize] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;
    const company = data.get("company") as string;
    const positions = data.get("positions") as string;
    const message = data.get("message") as string;

    // Basic validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !company.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Veuillez entrer une adresse email valide.");
      return;
    }

    setIsSubmitting(true);

    // Log for now (HubSpot integration later)
    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      company,
      teamSize,
      positions,
      message,
    });

    // Simulate async submission
    await new Promise((r) => setTimeout(r, 800));

    toast.success("Demande envoy\u00e9e avec succ\u00e8s ! Nous vous recontactons sous 24h.");
    form.reset();
    setTeamSize("");
    setIsSubmitting(false);
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT — Form (3 cols) */}
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
                {"D\u00e9crivez vos besoins et nous vous proposerons le mod\u00e8le d\u2019accompagnement le plus adapt\u00e9."}
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* First + Last name row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{"Pr\u00e9nom"} *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Jean"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Dupont"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean@entreprise.com"
                    required
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise *</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Nom de votre entreprise"
                    required
                  />
                </div>

                {/* Team size + Positions row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{"Taille de l\u2019\u00e9quipe"}</Label>
                    <Select value={teamSize} onValueChange={setTeamSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="S\u00e9lectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1 - 50</SelectItem>
                        <SelectItem value="51-200">51 - 200</SelectItem>
                        <SelectItem value="201-500">201 - 500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="positions">{"Postes \u00e0 pourvoir"}</Label>
                    <Input
                      id="positions"
                      name="positions"
                      type="number"
                      min={1}
                      placeholder="Ex : 5"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="D\u00e9crivez votre besoin en quelques lignes..."
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>

              {/* Calendly fallback */}
              <div className="mt-6 p-4 rounded-xl border border-border bg-muted/50 flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    {"Ou r\u00e9servez directement un cr\u00e9neau"}
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

            {/* RIGHT — Info cards (2 cols) */}
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
                    <p className="text-sm text-muted-foreground">{"\u00cele-de-France"}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Villeurbanne</p>
                    <p className="text-sm text-muted-foreground">{"Auvergne-Rh\u00f4ne-Alpes"}</p>
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
