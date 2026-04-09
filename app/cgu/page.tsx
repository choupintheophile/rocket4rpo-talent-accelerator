import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "CGU du site Rocket4RPO.",
  alternates: { canonical: "/cgu" },
  robots: { index: false },
};

export default function CGUPage() {
  return (
    <section className="section-padding">
      <div className="container-tight prose max-w-none">
        <h1>Conditions Générales d&apos;Utilisation</h1>
        <p>
          Dernière mise à jour : 9 avril 2026
        </p>

        <h2>1. Objet et acceptation</h2>
        <p>
          Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») régissent l&apos;accès et l&apos;utilisation du site internet rocket4rpo.com (ci-après « le Site »), édité par Rocket4Sales SAS, dont le siège social est situé au 22 rue de l&apos;Échiquier, 75010 Paris.
        </p>
        <p>
          En accédant au Site, l&apos;utilisateur reconnaît avoir pris connaissance des présentes CGU et les accepte sans réserve. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le Site.
        </p>

        <h2>2. Accès au site et services</h2>
        <p>
          Le Site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet. L&apos;ensemble des frais liés à l&apos;accès au Site (matériel informatique, connexion Internet) sont à la charge de l&apos;utilisateur.
        </p>
        <p>
          Rocket4Sales SAS met tout en œuvre pour assurer la disponibilité du Site mais ne saurait garantir un accès continu et sans interruption. L&apos;éditeur se réserve le droit de suspendre, modifier ou interrompre l&apos;accès au Site, en tout ou partie, à tout moment et sans préavis, notamment pour des raisons de maintenance ou de mise à jour.
        </p>
        <p>
          Le Site propose des informations relatives aux services de Talent Acquisition et de RPO (Recruitment Process Outsourcing) de Rocket4RPO, ainsi qu&apos;un formulaire de contact permettant aux utilisateurs de solliciter un échange avec l&apos;équipe.
        </p>

        <h2>3. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des éléments constituant le Site (textes, images, graphismes, logos, icônes, vidéos, logiciels, base de données, structure) est protégé par les dispositions du Code de la propriété intellectuelle et par les législations françaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle, de ces éléments, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation écrite préalable de Rocket4Sales SAS.
        </p>
        <p>
          Les marques « Rocket4RPO », « Rocket4Sales » et « Rocket4GTM » ainsi que les logos associés sont des marques déposées. Toute utilisation non autorisée constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
        </p>

        <h2>4. Données personnelles</h2>
        <p>
          Le traitement des données personnelles collectées via le Site est régi par notre{" "}
          <Link href="/politique-confidentialite">Politique de confidentialité</Link>, qui fait partie intégrante des présentes CGU. Nous vous invitons à la consulter pour connaître vos droits et les modalités de traitement de vos données.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Le Site utilise des cookies à des fins de mesure d&apos;audience via Google Tag Manager. Pour en savoir plus sur l&apos;utilisation des cookies, veuillez consulter notre{" "}
          <Link href="/politique-confidentialite">Politique de confidentialité</Link>.
        </p>

        <h2>6. Limitation de responsabilité</h2>
        <p>
          Les informations diffusées sur le Site sont fournies à titre indicatif et ne sauraient constituer un engagement contractuel. Rocket4Sales SAS s&apos;efforce de maintenir les informations à jour mais ne garantit pas l&apos;exactitude, la complétude ou l&apos;actualité des informations diffusées.
        </p>
        <p>
          Rocket4Sales SAS ne saurait être tenue responsable :
        </p>
        <ul>
          <li>Des dommages directs ou indirects résultant de l&apos;utilisation du Site</li>
          <li>De l&apos;impossibilité temporaire d&apos;accéder au Site</li>
          <li>Du contenu des sites tiers vers lesquels des liens hypertextes pourraient renvoyer depuis le Site</li>
          <li>De tout dommage résultant d&apos;une intrusion frauduleuse d&apos;un tiers ayant entraîné une modification des informations mises à disposition sur le Site</li>
        </ul>

        <h2>7. Liens hypertextes</h2>
        <p>
          Le Site peut contenir des liens hypertextes vers des sites tiers. Rocket4Sales SAS n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux éventuels traitements de données personnelles qu&apos;ils effectuent.
        </p>

        <h2>8. Modification des CGU</h2>
        <p>
          Rocket4Sales SAS se réserve le droit de modifier les présentes CGU à tout moment. Les CGU applicables sont celles en vigueur à la date de la dernière mise à jour indiquée en haut de cette page. L&apos;utilisateur est invité à consulter régulièrement cette page.
        </p>

        <h2>9. Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes CGU sont régies par le droit français. En cas de litige relatif à l&apos;interprétation ou à l&apos;exécution des présentes, et à défaut de résolution amiable, les tribunaux compétents de Paris seront seuls compétents.
        </p>

        <h2>10. Contact</h2>
        <p>
          Pour toute question relative aux présentes CGU, vous pouvez nous contacter via notre{" "}
          <Link href="/contact">page de contact</Link> ou par email à{" "}
          <a href="mailto:contact@rocket4rpo.com">contact@rocket4rpo.com</a>.
        </p>
      </div>
    </section>
  );
}
