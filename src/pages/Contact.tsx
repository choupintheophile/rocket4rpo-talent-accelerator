import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/lib/seo";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    // Load HubSpot form
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/4718727.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <Layout>
      <SEO
        title="Contact — échangez avec un expert Talent Acquisition"
        description="Contactez Rocket4RPO pour discuter de vos besoins en Talent Acquisition. Formulaire de contact, demande de rendez-vous ou candidature TA."
        canonical="/contact"
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="section-padding pt-8">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Parlons de vos <span className="text-gradient">recrutements</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Que vous souhaitiez structurer votre Talent Acquisition, recruter rapidement ou rejoindre notre réseau de TA Specialists, nous sommes à votre écoute.
              </p>
              <div className="mt-8 space-y-6">
                <div className="p-5 rounded-xl border border-border">
                  <h3 className="font-bold mb-1">Vous recrutez</h3>
                  <p className="text-sm text-muted-foreground">Décrivez vos besoins en recrutement et nous vous proposerons le modèle d'accompagnement le plus adapté.</p>
                </div>
                <div className="p-5 rounded-xl border border-border">
                  <h3 className="font-bold mb-1">Vous êtes Talent Acquisition</h3>
                  <p className="text-sm text-muted-foreground">Rejoignez notre réseau de TA Specialists et accédez à des missions variées dans l'écosystème Tech.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <h2 className="text-2xl font-bold mb-6">Échanger avec Rocket4RPO</h2>
              <div
                className="hs-form-frame"
                data-region="na1"
                data-form-id="2ed3b551-f739-4e1c-a5d8-b999d64f735f"
                data-portal-id="4718727"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
