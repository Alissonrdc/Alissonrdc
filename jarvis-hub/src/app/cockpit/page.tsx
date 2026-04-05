import AppShell from "@/components/layout/AppShell";
import PrioridadesDia from "@/components/cockpit/PrioridadesDia";
import AgendaDia from "@/components/cockpit/AgendaDia";
import RadarEmpresas from "@/components/cockpit/RadarEmpresas";
import AlertasIA from "@/components/cockpit/AlertasIA";

export default function CockpitPage() {
  return (
    <AppShell>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
          Bom dia, Alisson 👋
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          Quarta-feira, 18 de Março · 3 alertas críticos · 6 tarefas do dia
        </p>
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* Col 1: Priorities + Quick Tasks */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <PrioridadesDia />
        </div>

        {/* Col 2: Agenda + Radar */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <AgendaDia />
          <RadarEmpresas />
        </div>

        {/* Col 3: Alerts + Follow-ups */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <AlertasIA />
        </div>
      </div>
    </AppShell>
  );
}
