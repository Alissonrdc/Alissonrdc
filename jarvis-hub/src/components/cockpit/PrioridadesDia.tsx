"use client";

import { CheckCircle2, Circle, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { COMPANIES } from "@/lib/utils";

const tasks = [
  {
    id: 1,
    title: "Revisar arquitetura do módulo de IA do Jarvis Hub",
    company: "midas",
    priority: "alta",
    effort: "longa",
    done: false,
    time: "~2h",
  },
  {
    id: 2,
    title: "Enviar proposta para cliente DEF (Assessoria)",
    company: "assessoria",
    priority: "alta",
    effort: "média",
    done: false,
    time: "~45min",
  },
  {
    id: 3,
    title: "Aprovar roteiro da série de vídeos — Midas Hub",
    company: "modo",
    priority: "média",
    effort: "rápida",
    done: false,
    time: "~15min",
  },
];

const quickTasks = [
  { id: 4, title: "Confirmar reunião com dev team — 15h", company: "midas", time: "5min" },
  { id: 5, title: "Responder DM cliente XPTO", company: "modo", time: "10min" },
  { id: 6, title: "Revisar KPIs de tráfego — semana passada", company: "assessoria", time: "10min" },
];

export default function PrioridadesDia() {
  const [done, setDone] = useState<number[]>([]);

  const toggle = (id: number) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  const getCompany = (id: string) => COMPANIES.find((c) => c.id === id)!;

  return (
    <div className="space-y-4">
      {/* Top 3 */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: "var(--accent-dim)" }}
            >
              <Zap size={12} style={{ color: "var(--accent)" }} />
            </div>
            <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Top 3 Prioridades do Dia
            </h2>
          </div>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Gerado pela IA · 07h30
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task, idx) => {
            const company = getCompany(task.company);
            const isDone = done.includes(task.id);
            return (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer group"
                style={{
                  background: isDone ? "#f9fafb" : "var(--muted)",
                  opacity: isDone ? 0.6 : 1,
                }}
                onClick={() => toggle(task.id)}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: company.color + "20", color: company.color }}>
                  {idx + 1}
                </div>
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
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span
                      className="text-xs px-2 py-0.5 rounded-md font-medium"
                      style={{
                        background: company.color + "15",
                        color: company.color,
                      }}
                    >
                      {company.name}
                    </span>
                    <Badge variant={task.priority === "alta" ? "danger" : "warning"}>
                      {task.priority}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                      <Clock size={10} />
                      {task.time}
                    </span>
                  </div>
                </div>
                <button className="flex-shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 size={18} style={{ color: "#16a34a" }} />
                  ) : (
                    <Circle size={18} style={{ color: "#d1d5db" }} />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quick tasks */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <Clock size={14} style={{ color: "var(--muted-foreground)" }} />
          <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Tarefas Rápidas <span className="text-xs font-normal" style={{ color: "var(--muted-foreground)" }}>(até 15min)</span>
          </h3>
        </div>
        <div className="space-y-2">
          {quickTasks.map((task) => {
            const company = getCompany(task.company);
            const isDone = done.includes(task.id);
            return (
              <div
                key={task.id}
                className="flex items-center gap-3 py-2 px-3 rounded-lg cursor-pointer"
                style={{
                  background: "var(--muted)",
                  opacity: isDone ? 0.5 : 1,
                }}
                onClick={() => toggle(task.id)}
              >
                <button>
                  {isDone ? (
                    <CheckCircle2 size={15} style={{ color: "#16a34a" }} />
                  ) : (
                    <Circle size={15} style={{ color: "#d1d5db" }} />
                  )}
                </button>
                <p
                  className="flex-1 text-xs"
                  style={{
                    color: "var(--foreground)",
                    textDecoration: isDone ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{ background: company.color + "15", color: company.color }}
                  >
                    {company.badge}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {task.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
