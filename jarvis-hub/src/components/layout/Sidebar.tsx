"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Building2,
  FolderKanban,
  CheckSquare,
  MessageSquare,
  Brain,
  CalendarDays,
  Users,
  BarChart3,
  Target,
  ClipboardList,
  Settings,
  Zap,
  Bell,
  FileArchive,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Principal",
    items: [
      { href: "/cockpit", label: "Cockpit Jarvis", icon: LayoutDashboard },
      { href: "/inbox", label: "Inbox de Captura", icon: Inbox },
      { href: "/empresas", label: "Empresas", icon: Building2 },
      { href: "/foco", label: "Sessão de Foco", icon: Zap },
    ],
  },
  {
    label: "Execução",
    items: [
      { href: "/projetos", label: "Projetos", icon: FolderKanban },
      { href: "/tarefas", label: "Tarefas", icon: CheckSquare },
      { href: "/rotinas", label: "Rotinas & Playbooks", icon: ClipboardList },
      { href: "/agenda", label: "Agenda", icon: CalendarDays },
    ],
  },
  {
    label: "Inteligência",
    items: [
      { href: "/jarvis", label: "Assistente Jarvis", icon: MessageSquare },
      { href: "/memoria", label: "Memória da IA", icon: Brain },
    ],
  },
  {
    label: "Comercial",
    items: [
      { href: "/crm", label: "CRM / Leads", icon: Users },
    ],
  },
  {
    label: "Gestão",
    items: [
      { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
      { href: "/metas", label: "Metas & Projeções", icon: Target },
      { href: "/revisoes", label: "Revisões", icon: RefreshCcw },
      { href: "/notificacoes", label: "Notificações", icon: Bell },
      { href: "/arquivos", label: "Arquivos", icon: FileArchive },
      { href: "/automacoes", label: "Automações", icon: Zap },
    ],
  },
  {
    label: "Sistema",
    items: [
      { href: "/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col z-30"
      style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold glow-accent"
          style={{ background: "var(--accent)" }}>
          J
        </div>
        <div>
          <span className="text-white font-semibold text-sm tracking-wide">JARVIS HUB</span>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>v1.0 · MVP</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 mb-1 text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#4b5563" }}>
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "sidebar-item flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
                        active ? "active" : "text-gray-400"
                      )}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: "var(--sidebar-border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: "var(--accent)" }}>
            AR
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-medium truncate">Alisson Rodrigues</p>
            <p className="text-xs truncate" style={{ color: "#4b5563" }}>Founder</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
