import * as React from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border border-line-strong bg-elevated/60 px-4 text-[0.95rem] text-fg placeholder:text-subtle transition-[border-color,box-shadow] duration-200 outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)] focus-visible:outline-none aria-invalid:border-danger disabled:opacity-60";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-2 block text-sm font-medium text-fg", className)} {...props} />;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlBase, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlBase, "min-h-36 resize-y py-3 leading-relaxed", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(controlBase, "h-12 appearance-none pr-10", className)} {...props}>
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-subtle"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="m4 6 4 4 4-4" />
      </svg>
    </div>
  );
}

export function FieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-danger">
      <span aria-hidden className="font-mono">
        !
      </span>
      {children}
    </p>
  );
}
