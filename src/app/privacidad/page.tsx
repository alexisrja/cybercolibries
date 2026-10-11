import Link from "next/link";
import { LegalPage } from "@/components/shared/legal-page";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Aviso de privacidad",
  description: "Cómo CyberColibríes recopila, usa y protege tus datos personales.",
  path: "/privacidad",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Aviso de privacidad"
      path="/privacidad"
      updated="2026-09-01"
      intro="Somos una comunidad de ciberseguridad: tratamos tus datos con el mismo cuidado que enseñamos."
    >
      <h2>Qué datos recopilamos</h2>
      <p>
        Este sitio no cuenta actualmente con formularios de contacto. Si decides escribirnos por LinkedIn, el tratamiento
        de la información que compartas también estará sujeto a las políticas de esa plataforma.
      </p>
      <h2>Para qué los usamos</h2>
      <ul>
        <li>Responder tu mensaje o solicitud.</li>
        <li>Gestionar tu postulación a programas de la comunidad.</li>
        <li>Coordinar alianzas, mentorías o charlas cuando tú lo solicitas.</li>
      </ul>
      <p>No vendemos ni compartimos tus datos con terceros para fines comerciales.</p>
      <h2>Analítica</h2>
      <p>
        Usamos analítica respetuosa de la privacidad, sin cookies de rastreo ni perfiles individuales, para entender qué
        contenido es útil. Consulta la <Link href="/cookies">política de cookies</Link>.
      </p>
      <h2>Conservación y seguridad</h2>
      <p>
        Conservamos tus datos solo mientras sean necesarios para el fin por el que los compartiste. Aplicamos controles de
        acceso, cifrado en tránsito y revisiones periódicas.
      </p>
      <h2>Tus derechos</h2>
      <p>
        Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos mediante la{" "}
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
          cuenta oficial de CyberColibríes en LinkedIn
        </a>
        .
      </p>
    </LegalPage>
  );
}
