import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  sizes: string;
  alt?: string;
  eager?: boolean;
}

export function BrandMark({ className, sizes, alt = "", eager = false }: BrandMarkProps) {
  return (
    <Image
      src="/brand/logo.webp"
      width={1254}
      height={1254}
      alt={alt}
      sizes={sizes}
      quality={90}
      priority={eager}
      loading={eager ? undefined : "lazy"}
      className={cn("object-contain", className)}
    />
  );
}
