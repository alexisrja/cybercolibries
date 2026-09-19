import { LegalPage } from "@/components/shared/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de cookies",
  description: "Qué cookies y almacenamiento local usa el sitio de CyberColibríes.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de cookies"
      path="/cookies"
      updated="2026-09-01"
      intro="Usamos lo mínimo indispensable para que el sitio funcione y para saber qué contenido es útil."
    >
      <h2>Almacenamiento necesario</h2>
      <p>
        Guardamos tu preferencia de tema (claro u oscuro) en el almacenamiento local de tu navegador. No contiene datos
        personales y puedes borrarla en cualquier momento.
      </p>
      <h2>Analítica</h2>
      <p>
        Nuestra analítica no usa cookies de rastreo ni identifica a personas: mide visitas y clics de forma agregada. Si en
        el futuro activamos una herramienta que use cookies, te pediremos consentimiento antes de cargarla.
      </p>
      <h2>Terceros</h2>
      <p>
        Los botones para compartir contenido solo abren un enlace a la red social elegida; no cargan scripts de esas redes
        en nuestras páginas.
      </p>
    </LegalPage>
  );
}
