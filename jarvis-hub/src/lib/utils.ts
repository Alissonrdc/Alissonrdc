import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COMPANIES = [
  {
    id: "midas",
    name: "Midas Hub",
    color: "#f59e0b",
    description: "Software House & IA",
    badge: "MH",
  },
  {
    id: "modo",
    name: "Modo Criativo",
    color: "#a855f7",
    description: "Audiovisual & Conteúdo",
    badge: "MC",
  },
  {
    id: "assessoria",
    name: "Hub de Assessoria",
    color: "#245bff",
    description: "Estratégia Comercial & Growth",
    badge: "HA",
  },
] as const;

export type CompanyId = (typeof COMPANIES)[number]["id"];
