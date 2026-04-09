import type { Metadata } from "next";
import DemoClient from "./DemoClient";

export const metadata: Metadata = {
  title: "Démo interactive — découvrez le process RPO Rocket4RPO",
  description:
    "Explorez notre processus de recrutement RPO en 4 étapes interactives. Voyez comment nous trouvons vos meilleurs candidats en 48h.",
  alternates: { canonical: "/demo" },
};

export default function Page() {
  return <DemoClient />;
}
