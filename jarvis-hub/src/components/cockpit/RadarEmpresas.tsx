import { ArrowRight, AlertTriangle, TrendingUp, Folder } from "lucide-react";
import { COMPANIES } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

const companyData = [
  {
    id: "midas",
    projects: 5,
    deliveries: 3,
    alert: "Plataforma Jarvis Hub sem atualização há 2 dias",
    kpi: "+12% MRR",
    kpiUp: true,
  },
  {
    id: "modo",
    projects: 4,
    deliveries: 2,
    alert: "Aprovação de roteiro pendente com cliente XPTO",
    kpi: "8 vídeos entregues",
    kpiUp: true,
  },
  {
    id: "assessoria",
    projects: 6,
    deliveries: 4,
    alert: "Follow-up com cliente DEF há 5 dias sem resposta",
    kpi: "3 propostas abertas",
    kpiUp: false,
  },
];

export default function RadarEmpresas() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
        Radar de Empresas
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {COMPANIES.map((company) => {
          const data = companyData.find((d) => d.id === company.id)!;
          return (
            <Card
              key={company.id}
              className="group cursor-pointer"
              style={{ borderLeft: `3px solid ${company.color}` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: company.color + "15", color: company.color }}
                  >
                    {company.badge}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      {company.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                      {company.description}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                  style={{ color: company.color }}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div className="flex items-center justify-center gap-1 mb-0.5">
                    <Folder size={10} style={{ color: "var(--muted-foreground)" }} />
                  </div>
                  <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                    {data.projects}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Projetos
                  </p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                    {data.deliveries}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                    Entregas
                  </p>
                </div>
                <div className="text-center p-2 rounded-lg" style={{ background: "var(--muted)" }}>
                  <div className="flex items-center justify-center gap-0.5">
                    <TrendingUp
                      size={10}
                      style={{ color: data.kpiUp ? "#16a34a" : "#dc2626" }}
                    />
                  </div>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: data.kpiUp ? "#16a34a" : "#dc2626" }}
                  >
                    {data.kpi}
                  </p>
                </div>
              </div>

              {/* Alert */}
              <div
                className="flex items-start gap-2 p-2 rounded-lg"
                style={{ background: "#fef9c3", borderLeft: "2px solid #fbbf24" }}
              >
                <AlertTriangle size={12} className="mt-0.5 flex-shrink-0 text-amber-500" />
                <p className="text-xs" style={{ color: "#92400e" }}>
                  {data.alert}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
