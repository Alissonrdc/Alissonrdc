"use client";

import { useState, useEffect, useCallback } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { COMPANIES, type CompanyId } from "@/lib/utils";
import { Play, Pause, RotateCcw, CheckCircle2, Circle, Zap, Target, X } from "lucide-react";

type Phase = "foco" | "pausa_curta" | "pausa_longa";

const PHASES: Record<Phase, { label: string; duration: number; color: string }> = {
  foco: { label: "Foco", duration: 25 * 60, color: "#245bff" },
  pausa_curta: { label: "Pausa Curta", duration: 5 * 60, color: "#16a34a" },
  pausa_longa: { label: "Pausa Longa", duration: 15 * 60, color: "#a855f7" },
};

const sessionTasks = [
  { id: 1, title: "Revisar arquitetura módulo de IA", company: "midas" as CompanyId, effort: "25min" },
  { id: 2, title: "Contatar cliente DEF — proposta", company: "assessoria" as CompanyId, effort: "20min" },
  { id: 3, title: "Aprovar roteiro série XPTO", company: "modo" as CompanyId, effort: "15min" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function FocoPage() {
  const [phase, setPhase] = useState<Phase>("foco");
  const [timeLeft, setTimeLeft] = useState(PHASES.foco.duration);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [objective, setObjective] = useState("Revisar módulo de IA do Jarvis Hub e avançar na arquitetura");

  const cfg = PHASES[phase];
  const progress = 1 - timeLeft / cfg.duration;

  const reset = useCallback(() => {
    setRunning(false);
    setTimeLeft(PHASES[phase].duration);
  }, [phase]);

  useEffect(() => {
    setTimeLeft(PHASES[phase].duration);
    setRunning(false);
  }, [phase]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setRunning(false);
          if (phase === "foco") setCycles((c) => c + 1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, phase]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const circumference = 2 * Math.PI * 88;
  const dashOffset = circumference * (1 - progress);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Sessão de Foco</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Pomodoro técnico · {cycles} ciclos hoje
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Timer */}
          <div className="col-span-12 md:col-span-7">
            <Card className="text-center py-8">
              {/* Phase selector */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {(Object.keys(PHASES) as Phase[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPhase(p)}
                    className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: phase === p ? PHASES[p].color : "var(--muted)",
                      color: phase === p ? "white" : "var(--muted-foreground)",
                    }}
                  >
                    {PHASES[p].label}
                  </button>
                ))}
              </div>

              {/* Circular timer */}
              <div className="relative inline-flex items-center justify-center mb-8">
                <svg width="200" height="200" className="-rotate-90">
                  {/* Track */}
                  <circle cx="100" cy="100" r="88" fill="none" strokeWidth="6"
                    style={{ stroke: "var(--muted)" }} />
                  {/* Progress */}
                  <circle
                    cx="100" cy="100" r="88" fill="none" strokeWidth="6"
                    strokeLinecap="round"
                    style={{
                      stroke: cfg.color,
                      strokeDasharray: circumference,
                      strokeDashoffset: dashOffset,
                      transition: "stroke-dashoffset 1s linear",
                    }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold font-mono tabular-nums"
                    style={{ color: "var(--foreground)" }}>
                    {pad(mins)}:{pad(secs)}
                  </span>
                  <span className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
                    {cfg.label}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={reset}
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors hover:bg-gray-100"
                  style={{ borderColor: "var(--border)" }}
                >
                  <RotateCcw size={16} style={{ color: "var(--muted-foreground)" }} />
                </button>

                <button
                  onClick={() => setRunning((r) => !r)}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all hover:opacity-90 shadow-lg"
                  style={{ background: cfg.color }}
                >
                  {running ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>

                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "var(--muted)" }}>
                  <span className="text-sm font-bold" style={{ color: "var(--muted-foreground)" }}>
                    {cycles}
                  </span>
                </div>
              </div>

              {/* Objective */}
              <div className="mt-8 mx-4 p-4 rounded-xl text-left" style={{ background: "var(--muted)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Target size={13} style={{ color: "var(--accent)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                    Objetivo da sessão
                  </span>
                </div>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  rows={2}
                  className="w-full bg-transparent text-sm resize-none outline-none leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                />
              </div>
            </Card>

            {/* Cycle indicators */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Ciclos de foco
              </span>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ background: i < cycles % 4 ? cfg.color : "var(--muted)" }}
                  />
                ))}
              </div>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                {cycles} total hoje
              </span>
            </div>
          </div>

          {/* Right panel */}
          <div className="col-span-12 md:col-span-5 space-y-4">
            {/* Tasks for this session */}
            <Card>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} style={{ color: "var(--accent)" }} />
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Tarefas desta sessão
                </h3>
              </div>
              <div className="space-y-3">
                {sessionTasks.map((task) => {
                  const company = COMPANIES.find((c) => c.id === task.company)!;
                  const isDone = done.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: "var(--muted)",
                        opacity: isDone ? 0.5 : 1,
                      }}
                      onClick={() =>
                        setDone((prev) =>
                          prev.includes(task.id) ? prev.filter((d) => d !== task.id) : [...prev, task.id]
                        )
                      }
                    >
                      <button className="mt-0.5 flex-shrink-0">
                        {isDone
                          ? <CheckCircle2 size={16} style={{ color: "#16a34a" }} />
                          : <Circle size={16} style={{ color: "#d1d5db" }} />}
                      </button>
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
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs px-1.5 py-0.5 rounded font-medium"
                            style={{ background: company.color + "15", color: company.color }}
                          >
                            {company.badge}
                          </span>
                          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                            {task.effort}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="mt-3 w-full py-2 rounded-xl border border-dashed text-xs transition-colors hover:border-blue-400"
                style={{ borderColor: "#d1d5db", color: "var(--muted-foreground)" }}>
                + Adicionar tarefa
              </button>
            </Card>

            {/* Session stats */}
            <Card>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>
                Hoje
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Ciclos", value: cycles, color: "#245bff" },
                  { label: "Min focados", value: cycles * 25, color: "#16a34a" },
                  { label: "Tarefas feitas", value: done.length, color: "#a855f7" },
                  { label: "Pausas", value: Math.floor(cycles * 0.75), color: "#f59e0b" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="text-center p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                    <p className="text-xl font-bold" style={{ color }}>{value}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Jarvis suggestion */}
            <div className="p-4 rounded-xl border" style={{ background: "var(--sidebar)", borderColor: "#1f2937" }}>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent)" }}>
                  <span className="text-white text-xs font-bold">J</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-white mb-1">Jarvis</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
                    Você tem 3 tarefas críticas hoje. Sugiro iniciar pelo contato com o cliente DEF — é rápido (20min) e tem alto impacto comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
