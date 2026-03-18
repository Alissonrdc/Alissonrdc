"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { COMPANIES } from "@/lib/utils";
import { TrendingUp, TrendingDown, Target, Users, CheckCircle2, Clock, BarChart3, ArrowRight } from "lucide-react";

type Period = "semana" | "mes" | "trimestre";

const kpis = {
  semana: {
    tarefas: { value: 23, target: 30, prev: 19 },
    projetos: { value: 2, target: 3, prev: 1 },
    focoCycles: { value: 18, target: 20, prev: 14 },
    leads: { value: 5, target: 8, prev: 3 },
  },
  mes: {
    tarefas: { value: 94, target: 120, prev: 81 },
    projetos: { value: 7, target: 9, prev: 5 },
    focoCycles: { value: 68, target: 80, prev: 55 },
    leads: { value: 18, target: 25, prev: 12 },
  },
  trimestre: {
    tarefas: { value: 290, target: 360, prev: 240 },
    projetos: { value: 21, target: 27, prev: 18 },
    focoCycles: { value: 210, target: 240, prev: 165 },
    leads: { value: 54, target: 75, prev: 38 },
  },
};

const companyPerformance = [
  { company: "midas", mrr: 28000, mrrPrev: 24000, projects: 5, tasksCompleted: 38, nps: 4.7 },
  { company: "modo", mrr: 14500, mrrPrev: 13200, projects: 4, tasksCompleted: 22, nps: 4.9 },
  { company: "assessoria", mrr: 19000, mrrPrev: 22000, projects: 6, tasksCompleted: 34, nps: 4.2 },
];

function KPICard({ label, value, target, prev, icon: Icon, color }: {
  label: string; value: number; target: number; prev: number;
  icon: React.ElementType; color: string;
}) {
  const pct = Math.round((value / target) * 100);
  const delta = value - prev;
  const up = delta >= 0;
  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: color + "15" }}>
          <Icon size={15} style={{ color }} />
        </div>
        <div className="flex items-center gap-1 text-xs font-medium"
          style={{ color: up ? "#16a34a" : "#ef4444" }}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {up ? "+" : ""}{delta}
        </div>
      </div>
      <p className="text-2xl font-bold mb-0.5" style={{ color: "var(--foreground)" }}>{value}</p>
      <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{label}</p>
      <div>
        <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>
          <span>Meta: {target}</span>
          <span style={{ color: pct >= 80 ? "#16a34a" : pct >= 60 ? "#f59e0b" : "#ef4444" }}>
            {pct}%
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
          <div className="h-full rounded-full"
            style={{
              width: `${Math.min(pct, 100)}%`,
              background: pct >= 80 ? "#16a34a" : pct >= 60 ? "#f59e0b" : "#ef4444",
            }} />
        </div>
      </div>
    </Card>
  );
}

// Minimal bar chart using divs
function MiniBar({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1 h-16">
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-t-sm transition-all"
          style={{ height: `${(v / max) * 100}%`, background: color + (i === values.length - 1 ? "" : "60") }} />
      ))}
    </div>
  );
}

export default function RelatoriosPage() {
  const [period, setPeriod] = useState<Period>("mes");
  const data = kpis[period];

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Relatórios & Análises</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Visão consolidada do ecossistema
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["semana", "mes", "trimestre"] as Period[]).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize"
              style={{
                background: period === p ? "var(--accent)" : "var(--muted)",
                color: period === p ? "white" : "var(--muted-foreground)",
              }}>
              {p === "mes" ? "Mês" : p === "semana" ? "Semana" : "Trimestre"}
            </button>
          ))}
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <KPICard label="Tarefas concluídas" value={data.tarefas.value} target={data.tarefas.target} prev={data.tarefas.prev} icon={CheckCircle2} color="#245bff" />
        <KPICard label="Projetos entregues" value={data.projetos.value} target={data.projetos.target} prev={data.projetos.prev} icon={Target} color="#a855f7" />
        <KPICard label="Ciclos de foco" value={data.focoCycles.value} target={data.focoCycles.target} prev={data.focoCycles.prev} icon={Clock} color="#f59e0b" />
        <KPICard label="Novos leads" value={data.leads.value} target={data.leads.target} prev={data.leads.prev} icon={Users} color="#16a34a" />
      </div>

      {/* Per-company breakdown */}
      <h2 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>
        Performance por Empresa
      </h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {companyPerformance.map(({ company: cId, mrr, mrrPrev, projects, tasksCompleted, nps }) => {
          const company = COMPANIES.find((c) => c.id === cId)!;
          const mrrDelta = mrr - mrrPrev;
          const up = mrrDelta >= 0;
          return (
            <Card key={cId}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ background: company.color + "20", color: company.color }}>
                    {company.badge}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{company.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{company.description}</p>
                  </div>
                </div>
                <button style={{ color: "var(--accent)" }}>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* MRR */}
              <div className="p-3 rounded-xl mb-3" style={{ background: "var(--muted)" }}>
                <p className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>MRR</p>
                <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  R$ {mrr.toLocaleString("pt-BR")}
                </p>
                <div className="flex items-center gap-1 text-xs mt-0.5"
                  style={{ color: up ? "#16a34a" : "#ef4444" }}>
                  {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {up ? "+" : ""}R$ {Math.abs(mrrDelta).toLocaleString("pt-BR")} vs. período anterior
                </div>
              </div>

              {/* Mini chart (mock data) */}
              <div className="mb-4">
                <p className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>
                  MRR — últimas 6 semanas
                </p>
                <MiniBar
                  values={[mrrPrev * 0.8, mrrPrev * 0.9, mrrPrev * 0.95, mrrPrev, mrr * 0.97, mrr]}
                  color={company.color}
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Projetos", value: projects },
                  { label: "Tarefas", value: tasksCompleted },
                  { label: "NPS", value: nps.toFixed(1) },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                    <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{value}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Insights from Jarvis */}
      <Card style={{ background: "var(--sidebar)", borderColor: "#1f2937" }}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent)" }}>
            <span className="text-white text-sm font-bold">J</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-2">Jarvis · Insights do Período</p>
            <div className="space-y-2">
              {[
                "📈 Midas Hub cresceu +16.7% em MRR. Principal driver: novo cliente de automação IA.",
                "⚠️ Hub de Assessoria caiu -13.6% em MRR. Identificar causa: possível churn ou sazonalidade.",
                "🎯 Taxa de conclusão de tarefas em 78% — acima da meta. Manter ritmo de foco.",
                "🔥 Pipeline comercial: 3 propostas abertas há mais de 5 dias. Acelerar follow-ups.",
              ].map((insight, i) => (
                <p key={i} className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
                  {insight}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </AppShell>
  );
}
