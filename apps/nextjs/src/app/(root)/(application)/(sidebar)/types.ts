import type { LucideIcon } from "lucide-react";

export type Section = "MAIN" | "MORE";

export type SidebarItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  section: Section;
};
