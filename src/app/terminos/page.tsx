import { LegalPage } from "@/components/shared/legal-page";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Términos de uso",
  description: "Condiciones de uso del sitio, los contenidos y los espacios de la comunidad CyberColibríes.",
  path: "/terminos",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos de uso"
      path="/terminos"
      updated="2026-09-01"
      intro="Las reglas que nos permiten aprender seguridad de forma ética y cuidar a la comunidad."
    >
      <h2>Uso ético del conocimiento</h2>
      <p>
        Todo el contenido, las actividades y los ejercicios de CyberColibríes tienen fines educativos. Las técnicas ofensivas solo
        deben practicarse en entornos propios o con autorización explícita y por escrito. El uso indebido es
        responsabilidad exclusiva de quien lo realiza.
      </p>
      <h2>Contenido</h2>
      <p>
        Salvo que se indique lo contrario, el contenido publicado por la comunidad puede compartirse citando la fuente y a su autor. Las
        marcas y el logotipo de CyberColibríes no pueden usarse sin autorización.
      </p>
      <h2>Código de conducta</h2>
      <ul>
        <li>Trata a todas las personas con respeto, sin importar su nivel de experiencia.</li>
        <li>No compartas información sensible, credenciales ni datos de terceros.</li>
        <li>Reporta vulnerabilidades de forma responsable.</li>
      </ul>
      <h2>Contacto</h2>
      <p>
        Si tienes dudas sobre estos términos, escríbenos mediante la{" "}
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
          cuenta oficial de CyberColibríes en LinkedIn
        </a>
        .
      </p>
    </LegalPage>
  );
}
