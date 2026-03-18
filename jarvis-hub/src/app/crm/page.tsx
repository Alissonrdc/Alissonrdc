"use client";

import AppShell from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { COMPANIES } from "@/lib/utils";
import { Phone, Mail, ArrowRight, Plus, Clock, TrendingUp } from "lucide-react";

type Stage = "lead" | "qualificado" | "proposta" | "negociacao" | "fechado";

const stages: { id: Stage; label: string; color: string }[] = [
  { id: "lead", label: "Lead", color: "#9ca3af" },
  { id: "qualificado", label: "Qualificado", color: "#3b82f6" },
  { id: "proposta", label: "Proposta", color: "#a855f7" },
  { id: "negociacao", label: "Negociação", color: "#f59e0b" },
  { id: "fechado", label: "Fechado", color: "#16a34a" },
];

const leads = [
  {
    id: 1, name: "Ricardo Mendes", company_name: "Agência Crescer", company: "assessoria",
    stage: "negociacao" as Stage, value: 8500, lastContact: "2 dias atrás",
    nextAction: "Enviar contrato revisado", source: "Indicação",
  },
  {
    id: 2, name: "Fernanda Lopes", company_name: "TechStart Ltda", company: "midas",
    stage: "proposta" as Stage, value: 24000, lastContact: "5 dias atrás",
    nextAction: "Follow-up urgente", source: "LinkedIn",
  },
  {
    id: 3, name: "Carlos Sena", company_name: "Estúdio Bora", company: "modo",
    stage: "qualificado" as Stage, value: 5400, lastContact: "1 dia atrás",
    nextAction: "Agendar apresentação", source: "Instagram",
  },
  {
    id: 4, name: "Patricia Alves", company_name: "Grupo Delta", company: "assessoria",
    stage: "lead" as Stage, value: 12000, lastContact: "Hoje",
    nextAction: "Qualificar necessidades", source: "Google Ads",
  },
  {
    id: 5, name: "Bruno Castro", company_name: "InovaTech", company: "midas",
    stage: "fechado" as Stage, value: 36000, lastContact: "3 dias atrás",
    nextAction: "Kickoff do projeto", source: "Evento",
  },
];

export default function CRMPage() {
  const byStage = (stage: Stage) => leads.filter((l) => l.stage === stage);
  const totalPipeline = leads.filter(l => l.stage !== "fechado").reduce((s, l) => s + l.value, 0);
  const closed = leads.filter(l => l.stage === "fechado").reduce((s, l) => s + l.value, 0);

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>CRM / Leads</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Pipeline · {leads.length} oportunidades ativas
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}>
          <Plus size={14} />
          Novo Lead
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Pipeline total</p>
          <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
            R$ {totalPipeline.toLocaleString("pt-BR")}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={11} className="text-green-500" />
            <span className="text-xs text-green-600">+23% vs. mês anterior</span>
          </div>
        </Card>
        <Card>
          <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Fechado (mês)</p>
          <p className="text-xl font-bold text-green-600">
            R$ {closed.toLocaleString("pt-BR")}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>1 contrato fechado</p>
        </Card>
        <Card>
          <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>Follow-ups urgentes</p>
          <p className="text-xl font-bold text-red-500">2</p>
          <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Mais de 3 dias sem contato</p>
        </Card>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = byStage(stage.id);
          const stageTotal = stageLeads.reduce((s, l) => s + l.value, 0);

          return (
            <div key={stage.id} className="flex-shrink-0 w-64">
              {/* Column header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                  <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    {stage.label}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded-md font-medium"
                    style={{ background: stage.color + "15", color: stage.color }}>
                    {stageLeads.length}
                  </span>
                </div>
              </div>
              {stageTotal > 0 && (
                <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
                  R$ {stageTotal.toLocaleString("pt-BR")}
                </p>
              )}

              {/* Cards */}
              <div className="space-y-3">
                {stageLeads.map((lead) => {
                  const company = COMPANIES.find((c) => c.id === lead.company)!;
                  const isUrgent = parseInt(lead.lastContact) >= 3 && lead.lastContact.includes("dias");
                  return (
                    <div key={lead.id} className="p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm"
                      style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                            {lead.name}
                          </p>
                          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                            {lead.company_name}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: company.color + "15", color: company.color }}>
                          {company.badge}
                        </span>
                      </div>

                      <p className="text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                        R$ {lead.value.toLocaleString("pt-BR")}
                      </p>

                      <div className={`flex items-center gap-1 text-xs mb-2 ${isUrgent ? "text-red-500" : ""}`}
                        style={{ color: isUrgent ? "#ef4444" : "var(--muted-foreground)" }}>
                        <Clock size={10} />
                        {lead.lastContact}
                      </div>

                      <div className="p-2 rounded-lg text-xs mb-3"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                        <span className="font-medium" style={{ color: "var(--foreground)" }}>
                          Próximo:{" "}
                        </span>
                        {lead.nextAction}
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs border transition-colors hover:bg-gray-50"
                          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                          <Phone size={11} />
                          Ligar
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs border transition-colors hover:bg-gray-50"
                          style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                          <Mail size={11} />
                          E-mail
                        </button>
                        <button className="w-8 flex items-center justify-center py-1.5 rounded-lg text-xs border transition-colors hover:bg-gray-50"
                          style={{ borderColor: "var(--border)", color: "var(--accent)" }}>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <button className="w-full py-2.5 rounded-xl border border-dashed text-xs transition-colors hover:border-blue-400 hover:text-blue-500"
                  style={{ borderColor: "#d1d5db", color: "var(--muted-foreground)" }}>
                  + Adicionar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
