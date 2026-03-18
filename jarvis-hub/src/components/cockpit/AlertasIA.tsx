import { AlertTriangle, Clock, TrendingDown, CheckCircle, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { COMPANIES } from "@/lib/utils";

const alerts = [
  {
    type: "danger",
    company: "assessoria",
    message: "Follow-up com cliente DEF há 5 dias sem resposta. Risco de perder negócio.",
    action: "Criar tarefa de contato",
    icon: AlertTriangle,
  },
  {
    type: "warning",
    company: "midas",
    message: "Projeto Jarvis Hub sem atualização há 2 dias. Checar bloqueios com o time.",
    action: "Ver projeto",
    icon: Clock,
  },
  {
    type: "warning",
    company: "modo",
    message: "Aprovação de roteiro pendente com cliente XPTO. Prazo em 2 dias.",
    action: "Enviar lembrança",
    icon: Clock,
  },
  {
    type: "info",
    company: "assessoria",
    message: "3 propostas abertas sem movimentação esta semana. Revisar funil comercial.",
    action: "Ver CRM",
    icon: TrendingDown,
  },
];

const typeStyles = {
  danger: {
    bg: "#fef2f2",
    border: "#fca5a5",
    iconColor: "#ef4444",
    textColor: "#991b1b",
  },
  warning: {
    bg: "#fffbeb",
    border: "#fcd34d",
    iconColor: "#f59e0b",
    textColor: "#92400e",
  },
  info: {
    bg: "#f0f9ff",
    border: "#7dd3fc",
    iconColor: "#0ea5e9",
    textColor: "#075985",
  },
};

export default function AlertasIA() {
  return (
    <div className="space-y-4">
      {/* AI summary */}
      <Card style={{ background: "var(--sidebar)", borderColor: "#1f2937" }}>
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: "var(--accent)" }}
          >
            <span className="text-white text-xs font-bold">J</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-white mb-1">Jarvis · Resumo do Dia</p>
            <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
              Você tem <strong className="text-white">3 alertas críticos</strong> hoje — todos
              ligados a follow-ups parados. Sugiro priorizar o contato com o cliente DEF e
              revisar o projeto Jarvis Hub com o time antes das 12h. Boa sessão.
            </p>
          </div>
        </div>
      </Card>

      {/* Alerts */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
          Alertas & Pendências
        </h3>
        <div className="space-y-2">
          {alerts.map((alert, idx) => {
            const styles = typeStyles[alert.type as keyof typeof typeStyles];
            const company = COMPANIES.find((c) => c.id === alert.company)!;
            const Icon = alert.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-xl border"
                style={{ background: styles.bg, borderColor: styles.border }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <Icon
                    size={13}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: styles.iconColor }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="text-xs font-medium px-1.5 py-0.5 rounded"
                        style={{ background: company.color + "20", color: company.color }}
                      >
                        {company.badge}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: styles.textColor }}>
                      {alert.message}
                    </p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1 text-xs font-medium ml-5 transition-opacity hover:opacity-70"
                  style={{ color: styles.iconColor }}
                >
                  {alert.action}
                  <ArrowRight size={11} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Follow-ups */}
      <Card>
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
          Follow-ups Pendentes
        </h3>
        <div className="space-y-2.5">
          {[
            { name: "Cliente DEF", company: "assessoria", days: 5, status: "urgent" },
            { name: "Lead ABC (Proposta)", company: "midas", days: 3, status: "warning" },
            { name: "Cliente XPTO (Roteiro)", company: "modo", days: 2, status: "ok" },
          ].map((fu, idx) => {
            const company = COMPANIES.find((c) => c.id === fu.company)!;
            return (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background:
                      fu.status === "urgent"
                        ? "#ef4444"
                        : fu.status === "warning"
                        ? "#f59e0b"
                        : "#16a34a",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>
                    {fu.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {company.name} · {fu.days} dias
                  </p>
                </div>
                <button className="text-xs" style={{ color: "var(--accent)" }}>
                  Contatar
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
