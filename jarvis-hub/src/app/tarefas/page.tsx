"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { COMPANIES, type CompanyId } from "@/lib/utils";
import {
  Plus, Search, CheckCircle2, Circle, Clock, AlertTriangle,
  Filter, Zap, User, CalendarDays,
} from "lucide-react";

type Priority = "alta" | "média" | "baixa";
type Status = "pendente" | "em_andamento" | "concluida" | "bloqueada";

interface Task {
  id: number;
  title: string;
  company: CompanyId;
  project: string;
  priority: Priority;
  status: Status;
  assignee: string;
  due: string;
  effort: string;
  tags: string[];
}

const tasks: Task[] = [
  { id: 1, title: "Implementar módulo de memória longa do Jarvis", company: "midas", project: "Jarvis Hub MVP", priority: "alta", status: "em_andamento", assignee: "Alisson", due: "20 Mar", effort: "2h", tags: ["IA", "backend"] },
  { id: 2, title: "Contatar cliente DEF — follow-up proposta", company: "assessoria", project: "Funil Perpétuo DEF", priority: "alta", status: "pendente", assignee: "Alisson", due: "Hoje", effort: "20min", tags: ["comercial"] },
  { id: 3, title: "Aprovar roteiro série vídeos XPTO", company: "modo", project: "Pacote Vídeos XPTO", priority: "alta", status: "pendente", assignee: "Alisson", due: "Hoje", effort: "30min", tags: ["conteúdo"] },
  { id: 4, title: "Configurar tracking de eventos no funil de leads", company: "midas", project: "Funil de Leads MH", priority: "média", status: "em_andamento", assignee: "Dev Team", due: "22 Mar", effort: "3h", tags: ["analytics"] },
  { id: 5, title: "Criar calendário editorial — Midas Hub", company: "modo", project: "Planejamento Audiovisual MH", priority: "média", status: "pendente", assignee: "Alisson", due: "25 Mar", effort: "1h", tags: ["conteúdo", "estratégia"] },
  { id: 6, title: "Montar pitch deck para captação Midas Hub", company: "midas", project: "Jarvis Hub MVP", priority: "alta", status: "bloqueada", assignee: "Alisson", due: "28 Mar", effort: "4h", tags: ["produto"] },
  { id: 7, title: "Onboarding SDR time de vendas cliente ABC", company: "assessoria", project: "Time de Vendas ABC", priority: "média", status: "em_andamento", assignee: "Ops Team", due: "21 Mar", effort: "2h", tags: ["vendas"] },
  { id: 8, title: "Review KPIs de tráfego semana passada", company: "assessoria", project: "Funil Perpétuo DEF", priority: "baixa", status: "pendente", assignee: "Alisson", due: "Hoje", effort: "15min", tags: ["análise"] },
  { id: 9, title: "Deploy ambiente de staging Jarvis Hub", company: "midas", project: "Jarvis Hub MVP", priority: "alta", status: "concluida", assignee: "Dev Team", due: "17 Mar", effort: "1h", tags: ["infra"] },
  { id: 10, title: "Entrega final lote 3 vídeos — XPTO", company: "modo", project: "Pacote Vídeos XPTO", priority: "média", status: "concluida", assignee: "Modo Team", due: "16 Mar", effort: "1h", tags: ["entrega"] },
];

const priorityBadge: Record<Priority, "danger" | "warning" | "muted"> = {
  alta: "danger", média: "warning", baixa: "muted",
};

const statusConfig: Record<Status, { label: string; color: string }> = {
  pendente: { label: "Pendente", color: "#9ca3af" },
  em_andamento: { label: "Em andamento", color: "#2563eb" },
  concluida: { label: "Concluída", color: "#16a34a" },
  bloqueada: { label: "Bloqueada", color: "#ef4444" },
};

type ViewMode = "lista" | "kanban";

export default function TarefasPage() {
  const [done, setDone] = useState<number[]>([9, 10]);
  const [filter, setFilter] = useState<CompanyId | "all">("all");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("lista");

  const toggle = (id: number) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  const filtered = tasks.filter((t) => {
    if (filter !== "all" && t.company !== filter) return false;
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: tasks.length,
    pendente: tasks.filter((t) => t.status === "pendente").length,
    em_andamento: tasks.filter((t) => t.status === "em_andamento").length,
    bloqueada: tasks.filter((t) => t.status === "bloqueada").length,
    concluida: tasks.filter((t) => t.status === "concluida").length,
  };

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Tarefas</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {stats.total} tarefas · {stats.em_andamento} em andamento · {stats.bloqueada} bloqueadas
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}
        >
          <Plus size={14} />
          Nova Tarefa
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Em andamento", value: stats.em_andamento, color: "#2563eb" },
          { label: "Pendentes", value: stats.pendente, color: "#9ca3af" },
          { label: "Bloqueadas", value: stats.bloqueada, color: "#ef4444" },
          { label: "Concluídas", value: stats.concluida, color: "#16a34a" },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tarefas…"
            className="pl-9 pr-4 py-2 rounded-lg text-sm border outline-none w-64"
            style={{ borderColor: "var(--border)", background: "var(--muted)", color: "var(--foreground)" }}
          />
        </div>

        <div className="flex items-center gap-2">
          {(["all", ...COMPANIES.map((c) => c.id)] as const).map((id) => {
            const company = id === "all" ? null : COMPANIES.find((c) => c.id === id)!;
            return (
              <button
                key={id}
                onClick={() => setFilter(id as CompanyId | "all")}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: filter === id ? (company ? company.color + "20" : "var(--accent)") : "var(--muted)",
                  color: filter === id ? (company ? company.color : "white") : "var(--muted-foreground)",
                  border: filter === id && company ? `1px solid ${company.color}40` : "1px solid transparent",
                }}
              >
                {company ? company.badge : "Todos"}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 ml-2">
          {(["all", "pendente", "em_andamento", "bloqueada", "concluida"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: statusFilter === s ? "var(--accent)" : "var(--muted)",
                color: statusFilter === s ? "white" : "var(--muted-foreground)",
              }}
            >
              {s === "all" ? "Todos status" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {filtered.map((task) => {
          const company = COMPANIES.find((c) => c.id === task.company)!;
          const isDone = done.includes(task.id) || task.status === "concluida";
          const sc = statusConfig[task.status];
          return (
            <div
              key={task.id}
              className="flex items-center gap-4 px-4 py-3 rounded-xl border transition-all hover:shadow-sm cursor-pointer"
              style={{
                borderColor: task.status === "bloqueada" ? "#fca5a580" : "var(--border)",
                background: task.status === "bloqueada" ? "#fef2f2" : "var(--card)",
                opacity: isDone ? 0.65 : 1,
              }}
            >
              {/* Checkbox */}
              <button onClick={() => toggle(task.id)} className="flex-shrink-0">
                {isDone
                  ? <CheckCircle2 size={18} style={{ color: "#16a34a" }} />
                  : <Circle size={18} style={{ color: "#d1d5db" }} />}
              </button>

              {/* Title + tags */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium"
                  style={{
                    color: "var(--foreground)",
                    textDecoration: isDone ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{ background: company.color + "15", color: company.color }}
                  >
                    {company.badge}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {task.project}
                  </span>
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded-md"
                      style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <Badge variant={priorityBadge[task.priority]}>{task.priority}</Badge>

                <div
                  className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: sc.color + "15", color: sc.color }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: sc.color }} />
                  {sc.label}
                </div>

                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <User size={11} />
                  {task.assignee}
                </div>

                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <CalendarDays size={11} />
                  {task.due}
                </div>

                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <Clock size={11} />
                  {task.effort}
                </div>

                {task.status === "bloqueada" && (
                  <AlertTriangle size={14} style={{ color: "#ef4444" }} />
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: "var(--muted-foreground)" }}>
            <p className="text-sm">Nenhuma tarefa encontrada com esses filtros.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
