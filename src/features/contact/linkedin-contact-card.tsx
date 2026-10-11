import { ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "@/components/shared/social-icons";
import { Button } from "@/components/ui/button";
import { trackAttrs } from "@/lib/analytics";

interface LinkedInContactCardProps {
  href: string;
  cta: string;
  note: string;
}

export function LinkedInContactCard({ href, cta, note }: LinkedInContactCardProps) {
  return (
    <div className="relative mt-7 flex w-full flex-col items-center gap-5 text-center">
      <LinkedInIcon
        aria-hidden
        className="absolute -right-8 -bottom-8 size-40 text-[#5aa7f0]/[0.05] sm:right-0 sm:size-48"
      />

      <p className="relative mx-auto max-w-2xl text-sm leading-relaxed text-muted sm:text-base">{note}</p>

      <Button asChild size="lg" className="relative mx-auto w-full sm:w-auto sm:min-w-60">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...trackAttrs("join_click", cta, "participate_linkedin")}
        >
          <LinkedInIcon className="size-5" />
          {cta}
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
        </a>
      </Button>
    </div>
  );
}
