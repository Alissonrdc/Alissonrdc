"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { COMPANIES } from "@/lib/utils";
import { Target, TrendingUp, TrendingDown, Plus, Zap, ChevronRight, CheckCircle2, Clock } from "lucide-react";

const goals = [
  {
    id: 1, company: "midas", level: "empresa", period: "2025 Q1",
    title: "Lançar MVP Jarvis Hub",
    description: "Entregar a primeira versão funcional para uso interno até 31 de Março",
    kpi: "MVP em produção",
    progress: 60, target: 100, unit: "%",
    status: "em_andamento",
    milestones: [
      { label: "Cockpit + Chat Jarvis", done: true },
      { label: "Módulo de IA com memória", done: false },
      { label: "CRM integrado", done: false },
      { label: "Deploy & onboarding", done: false },
    ],
  },
  {
    id: 2, company: "midas", level: "empresa", period: "2025 Q1",
    title: "Atingir R$ 35k MRR",
    description: "Escalar base de clientes de software e automação IA",
    kpi: "MRR mensal",
    progress: 28000, target: 35000, unit: "R$",
    status: "em_andamento",
    milestones: [
      { label: "Fechar 2 contratos novos", done: true },
      { label: "Upsell cliente existente ABC", done: false },
      { label: "Ativar funil de inbound", done: false },
    ],
  },
  {
    id: 3, company: "modo", level: "empresa", period: "2025 Q1",
    title: "Entregar 24 vídeos este trimestre",
    description: "Manter SLA de entrega com qualidade aprovada em até 48h",
    kpi: "Vídeos entregues",
    progress: 17, target: 24, unit: "vídeos",
    status: "em_andamento",
    milestones: [
      { label: "Janeiro: 8 vídeos", done: true },
      { label: "Fevereiro: 8 vídeos", done: true },
      { label: "Março: 8 vídeos", done: false },
    ],
  },
  {
    id: 4, company: "assessoria", level: "empresa", period: "2025 Q1",
    title: "5 novos contratos fechados",
    description: "Através do funil perpétuo e prospecção ativa",
    kpi: "Contratos fechados",
    progress: 2, target: 5, unit: "contratos",
    status: "atrasado",
    milestones: [
      { label: "Contratar SDR", done: true },
      { label: "Montar playbook de vendas", done: true },
      { label: "Ativar 3 canais de prospecção", done: false },
      { label: "Pipeline com 15+ leads quentes", done: false },
    ],
  },
  {
    id: 5, company: "midas", level: "pessoal", period: "2025",
    title: "Captação pre-seed R$ 500k",
    description: "Levantar capital para escalar a Midas Hub",
    kpi: "Valor captado",
    progress: 0, target: 500000, unit: "R$",
    status: "planejando",
    milestones: [
      { label: "Preparar pitch deck", done: false },
      { label: "Mapear 20 investidores-alvo", done: false },
      { label: "Iniciar rodada de conversas", done: false },
    ],
  },
];

function ProgressBar({ value, target, color }: { value: number; target: number; color: string }) {
  const pct = Math.min(Math.round((value / target) * 100), 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>
        <span>{pct}% concluído</span>
        <span style={{ color: pct >= 80 ? "#16a34a" : pct >= 50 ? "#f59e0b" : "#ef4444" }}>
          {pct >= 80 ? "No caminho" : pct >= 50 ? "Atenção" : "Atrasado"}
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: pct >= 80 ? "#16a34a" : pct >= 50 ? "#f59e0b" : "#ef4444",
          }}
        />
      </div>
    </div>
  );
}

export default function MetasPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "empresa" | "pessoal">("all");

  const filtered = goals.filter((g) => filter === "all" || g.level === filter);
  const totalProgress = Math.round(
    filtered.reduce((sum, g) => sum + (g.progress / g.target) * 100, 0) / filtered.length
  );

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Metas & Projeções</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {goals.length} metas ativas · progresso médio {totalProgress}%
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          <Plus size={14} />
          Nova Meta
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="text-center py-5">
          <div className="text-3xl font-bold mb-1" style={{ color: "var(--accent)" }}>
            {totalProgress}%
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Progresso médio</p>
        </Card>
        <Card className="text-center py-5">
          <div className="text-3xl font-bold mb-1" style={{ color: "#16a34a" }}>
            {goals.filter((g) => g.status === "em_andamento").length}
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Em andamento</p>
        </Card>
        <Card className="text-center py-5">
          <div className="text-3xl font-bold mb-1" style={{ color: "#ef4444" }}>
            {goals.filter((g) => g.status === "atrasado").length}
          </div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Atrasadas</p>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-5">
        {(["all", "empresa", "pessoal"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors"
            style={{
              background: filter === f ? "var(--accent)" : "var(--muted)",
              color: filter === f ? "white" : "var(--muted-foreground)",
            }}
          >
            {f === "all" ? "Todas" : f === "empresa" ? "Empresa" : "Pessoal"}
          </button>
        ))}
      </div>

      {/* Goals */}
      <div className="space-y-3">
        {filtered.map((goal) => {
          const company = COMPANIES.find((c) => c.id === goal.company)!;
          const isOpen = expanded === goal.id;
          const pct = Math.round((goal.progress / goal.target) * 100);

          return (
            <Card
              key={goal.id}
              className="cursor-pointer"
              style={{ borderLeft: `3px solid ${company.color}` }}
              onClick={() => setExpanded(isOpen ? null : goal.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: company.color + "15" }}>
                  <Target size={18} style={{ color: company.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded"
                          style={{ background: company.color + "15", color: company.color }}>
                          {company.badge}
                        </span>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          {goal.period} · {goal.level}
                        </span>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                        {goal.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        {goal.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold" style={{ color: pct >= 80 ? "#16a34a" : pct >= 50 ? "#f59e0b" : "#ef4444" }}>
                        {pct}%
                      </p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {goal.progress.toLocaleString("pt-BR")} / {goal.target.toLocaleString("pt-BR")} {goal.unit}
                      </p>
                    </div>
                  </div>

                  <ProgressBar value={goal.progress} target={goal.target} color={company.color} />
                </div>

                <ChevronRight
                  size={16}
                  className={`flex-shrink-0 transition-transform mt-2 ${isOpen ? "rotate-90" : ""}`}
                  style={{ color: "var(--muted-foreground)" }}
                />
              </div>

              {/* Milestones (expanded) */}
              {isOpen && (
                <div className="mt-4 ml-14 space-y-2" onClick={(e) => e.stopPropagation()}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>
                    Marcos
                  </p>
                  {goal.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {m.done
                        ? <CheckCircle2 size={14} style={{ color: "#16a34a" }} />
                        : <Clock size={14} style={{ color: "#9ca3af" }} />}
                      <span
                        className="text-xs"
                        style={{
                          color: m.done ? "#16a34a" : "var(--foreground)",
                          textDecoration: m.done ? "line-through" : "none",
                        }}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}

                  <div className="pt-3 flex gap-2">
                    <button className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg text-white"
                      style={{ background: company.color }}>
                      <Zap size={11} />
                      Pedir plano ao Jarvis
                    </button>
                    <button className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border"
                      style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                      Editar meta
                    </button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
