"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Modal = DialogPrimitive.Root;
export const ModalTrigger = DialogPrimitive.Trigger;
export const ModalClose = DialogPrimitive.Close;

interface ModalContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  title: string;
  description?: string;
  /** "center" para diálogos, "right" para paneles laterales (menú móvil). */
  side?: "center" | "right";
  hideTitle?: boolean;
}

export function ModalContent({
  title,
  description,
  side = "center",
  hideTitle,
  className,
  children,
  ...props
}: ModalContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="cc-overlay fixed inset-0 z-[60] bg-[#02040a]/70 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-[61] border border-line-strong bg-elevated text-fg shadow-2xl outline-none",
          side === "center" &&
            "cc-modal top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6",
          side === "right" && "cc-sheet inset-y-0 right-0 flex h-dvh w-[min(22rem,100%)] flex-col rounded-l-2xl p-6",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className={cn("font-display text-lg font-medium", hideTitle && "sr-only")}>
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description className={cn("mt-1 text-sm text-muted", !description && "sr-only")}>
          {description ?? title}
        </DialogPrimitive.Description>
        {children}
        <DialogPrimitive.Close
          className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
          aria-label="Cerrar"
        >
          <X className="size-5" aria-hidden />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
