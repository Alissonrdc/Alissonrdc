"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { COMPANIES, type CompanyId } from "@/lib/utils";
import { Plus, Search, Filter, AlertTriangle, Clock, CheckCircle2, TrendingUp } from "lucide-react";

type Status = "em_andamento" | "planejando" | "bloqueado" | "concluido";

const statusConfig: Record<Status, { label: string; color: string; icon: React.ReactNode }> = {
  em_andamento: { label: "Em andamento", color: "#2563eb", icon: <TrendingUp size={11} /> },
  planejando: { label: "Planejando", color: "#9ca3af", icon: <Clock size={11} /> },
  bloqueado: { label: "Bloqueado", color: "#ef4444", icon: <AlertTriangle size={11} /> },
  concluido: { label: "Concluído", color: "#16a34a", icon: <CheckCircle2 size={11} /> },
};

const projects = [
  {
    id: 1, company: "midas" as CompanyId, area: "Produto",
    name: "Plataforma Jarvis Hub — MVP",
    objective: "Lançar o MVP interno do Jarvis Hub em 90 dias",
    kpi: "MVP entregue · 60% concluído",
    status: "em_andamento" as Status,
    progress: 60, daysLeft: 32, risk: "médio",
    milestone: "Módulo de IA com memória longa",
  },
  {
    id: 2, company: "midas" as CompanyId, area: "Growth",
    name: "Funil de Leads — Software & Automações IA",
    objective: "Gerar 50 leads qualificados/mês para Midas Hub",
    kpi: "18 leads/mês · meta: 50",
    status: "em_andamento" as Status,
    progress: 35, daysLeft: 45, risk: "alto",
    milestone: "Landing page e tráfego pago",
  },
  {
    id: 3, company: "modo" as CompanyId, area: "Produção",
    name: "Pacote de Vídeos Mensais — Cliente XPTO",
    objective: "Entregar 8 vídeos/mês com aprovação em até 48h",
    kpi: "6/8 vídeos entregues",
    status: "em_andamento" as Status,
    progress: 75, daysLeft: 8, risk: "baixo",
    milestone: "Entrega final do mês",
  },
  {
    id: 4, company: "modo" as CompanyId, area: "Conteúdo",
    name: "Planejamento Audiovisual — Midas Hub (marketing)",
    objective: "Criar calendário editorial e primeiros 10 vídeos da Midas",
    kpi: "Calendário definido · 3 vídeos gravados",
    status: "planejando" as Status,
    progress: 20, daysLeft: 60, risk: "baixo",
    milestone: "Aprovação de roteiros",
  },
  {
    id: 5, company: "assessoria" as CompanyId, area: "Estratégia Comercial",
    name: "Estruturação de Time de Vendas — Cliente ABC",
    objective: "Montar e treinar time SDR+Closer em 60 dias",
    kpi: "Fase 1 concluída · contratação em andamento",
    status: "em_andamento" as Status,
    progress: 50, daysLeft: 30, risk: "médio",
    milestone: "Treinamento de closers",
  },
  {
    id: 6, company: "assessoria" as CompanyId, area: "Growth",
    name: "Funil Perpétuo — Cliente DEF",
    objective: "Escalar de 20k para 80k de faturamento em 6 meses",
    kpi: "ROAS 2.1 · meta: 3.5",
    status: "bloqueado" as Status,
    progress: 40, daysLeft: 120, risk: "alto",
    milestone: "Otimização de criativos",
  },
];

export default function ProjetosPage() {
  const [filter, setFilter] = useState<CompanyId | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) => {
    const matchesCompany = filter === "all" || p.company === filter;
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.area.toLowerCase().includes(search.toLowerCase());
    return matchesCompany && matchesSearch;
  });

  const stats = {
    total: projects.length,
    em_andamento: projects.filter((p) => p.status === "em_andamento").length,
    bloqueado: projects.filter((p) => p.status === "bloqueado").length,
    concluido: projects.filter((p) => p.status === "concluido").length,
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
            Projetos
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {stats.total} projetos · {stats.em_andamento} em andamento · {stats.bloqueado} bloqueados
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          <Plus size={14} />
          Novo Projeto
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total, color: "#245bff" },
          { label: "Em andamento", value: stats.em_andamento, color: "#2563eb" },
          { label: "Bloqueados", value: stats.bloqueado, color: "#ef4444" },
          { label: "Concluídos", value: stats.concluido, color: "#16a34a" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="text-center">
            <p className="text-2xl font-bold" style={{ color }}>
              {value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              {label}
            </p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--muted-foreground)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar projetos…"
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm border outline-none"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: filter === "all" ? "var(--accent)" : "var(--muted)",
              color: filter === "all" ? "white" : "var(--muted-foreground)",
            }}
          >
            Todos
          </button>
          {COMPANIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: filter === c.id ? c.color + "20" : "var(--muted)",
                color: filter === c.id ? c.color : "var(--muted-foreground)",
                border: filter === c.id ? `1px solid ${c.color}40` : "1px solid transparent",
              }}
            >
              {c.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((project) => {
          const company = COMPANIES.find((c) => c.id === project.company)!;
          const status = statusConfig[project.status];
          const riskColor =
            project.risk === "alto" ? "#ef4444" : project.risk === "médio" ? "#f59e0b" : "#16a34a";

          return (
            <Card key={project.id} className="flex flex-col gap-3" onClick={() => {}}>
              {/* Company + Area */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{ background: company.color + "15", color: company.color }}
                  >
                    {company.badge}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {project.area}
                  </span>
                </div>
                <div
                  className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: status.color + "15", color: status.color }}
                >
                  {status.icon}
                  {status.label}
                </div>
              </div>

              {/* Name */}
              <div>
                <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                  {project.name}
                </h3>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
                  {project.objective}
                </p>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Progresso
                  </span>
                  <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                    {project.progress}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${project.progress}%`, background: company.color }}
                  />
                </div>
              </div>

              {/* KPI + Milestone */}
              <div className="p-2.5 rounded-lg" style={{ background: "var(--muted)" }}>
                <p className="text-xs font-medium mb-0.5" style={{ color: "var(--foreground)" }}>
                  {project.kpi}
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Próximo: {project.milestone}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: riskColor }} />
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Risco {project.risk}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <Clock size={11} />
                  {project.daysLeft} dias restantes
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
