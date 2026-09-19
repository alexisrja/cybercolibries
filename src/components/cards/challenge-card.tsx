import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { challengeStatusMeta, difficultyMeta } from "@/data/challenges";
import { trackAttrs } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Challenge, Difficulty } from "@/types";

export function DifficultyMeter({ difficulty, className }: { difficulty: Difficulty; className?: string }) {
  const { label, level } = difficultyMeta[difficulty];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="flex items-end gap-1" aria-hidden>
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className={cn("w-1.5 rounded-sm", n <= level ? "bg-teal" : "bg-line-strong")}
            style={{ height: `${6 + n * 3}px` }}
          />
        ))}
      </span>
      <span className="font-mono text-xs text-muted">
        Difficulty: <span className="text-fg">{label}</span>
      </span>
    </div>
  );
}

export function ChallengeCard({ challenge, headingLevel = "h3" }: { challenge: Challenge; headingLevel?: "h2" | "h3" }) {
  const status = challengeStatusMeta[challenge.status];
  const Heading = headingLevel;

  return (
    <article className="card-iri group flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <p className="hud-label">{challenge.category}</p>
        <Badge tone={status.tone} dot>
          {status.label}
        </Badge>
      </div>

      <Heading className="mt-6 font-display text-xl leading-snug font-medium tracking-tight text-fg">{challenge.title}</Heading>
      <p className="mt-2 font-mono text-xs text-teal">{challenge.skills.join(" · ")}</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{challenge.summary}</p>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <DifficultyMeter difficulty={challenge.difficulty} />
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
            <Clock className="size-3.5" aria-hidden />
            {challenge.estimatedTime}
          </span>
        </div>
        <Link
          href={`/challenges/${challenge.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg after:absolute after:inset-0 after:rounded-2xl after:content-['']"
          {...trackAttrs("challenge_open", challenge.slug, "challenge_card")}
        >
          Explorar challenge
          <span className="sr-only">: {challenge.title}</span>
          <ArrowRight className="size-4 text-teal transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
