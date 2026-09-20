import {
  BookOpen,
  Building2,
  Compass,
  GraduationCap,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  Megaphone,
  MessageSquare,
  Mic,
  Network,
  Newspaper,
  Search,
  Share2,
  Shield,
  Sparkles,
  Target,
  Users,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconName } from "@/types";

const map: Record<IconName, ComponentType<LucideProps>> = {
  "book-open": BookOpen,
  users: Users,
  sparkles: Sparkles,
  mic: Mic,
  newspaper: Newspaper,
  target: Target,
  network: Network,
  shield: Shield,
  search: Search,
  "graduation-cap": GraduationCap,
  building: Building2,
  handshake: Handshake,
  megaphone: Megaphone,
  heart: Heart,
  compass: Compass,
  message: MessageSquare,
  wrench: Wrench,
  globe: Globe,
  lightbulb: Lightbulb,
  share: Share2,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp aria-hidden strokeWidth={1.6} {...props} />;
}
