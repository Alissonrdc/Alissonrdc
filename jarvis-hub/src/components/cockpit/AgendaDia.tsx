import { Calendar, Video, Users, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { COMPANIES } from "@/lib/utils";

const events = [
  {
    time: "09:00",
    duration: "1h",
    title: "Daily — Dev Team Jarvis Hub",
    company: "midas",
    type: "video",
  },
  {
    time: "11:00",
    duration: "30min",
    title: "Alinhamento Growth — Hub Assessoria",
    company: "assessoria",
    type: "call",
  },
  {
    time: "14:00",
    duration: "2h",
    title: "Bloco de Foco — Midas Hub (produto)",
    company: "midas",
    type: "focus",
  },
  {
    time: "16:30",
    duration: "45min",
    title: "Revisão de roteiro — Modo Criativo",
    company: "modo",
    type: "meeting",
  },
];

const typeIcon: Record<string, React.ReactNode> = {
  video: <Video size={12} />,
  call: <MessageSquare size={12} />,
  focus: <span className="text-xs">⚡</span>,
  meeting: <Users size={12} />,
};

export default function AgendaDia() {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={14} style={{ color: "var(--muted-foreground)" }} />
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          Agenda de Hoje
        </h3>
        <span className="text-xs ml-auto" style={{ color: "var(--muted-foreground)" }}>
          Quarta, 18 Mar
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-[42px] top-0 bottom-0 w-px"
          style={{ background: "var(--border)" }}
        />

        <div className="space-y-1">
          {events.map((event, idx) => {
            const company = COMPANIES.find((c) => c.id === event.company)!;
            return (
              <div key={idx} className="flex items-start gap-3 group">
                <div
                  className="text-xs w-10 flex-shrink-0 pt-2 text-right font-mono"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {event.time}
                </div>

                {/* Dot */}
                <div className="flex-shrink-0 relative z-10 mt-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full border-2 border-white"
                    style={{ background: company.color }}
                  />
                </div>

                {/* Event card */}
                <div
                  className="flex-1 mb-2 p-2.5 rounded-lg text-sm cursor-pointer transition-all group-hover:shadow-sm"
                  style={{
                    background: company.color + "10",
                    borderLeft: `2px solid ${company.color}60`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ color: company.color }}>{typeIcon[event.type]}</span>
                    <p className="font-medium text-xs flex-1" style={{ color: "var(--foreground)" }}>
                      {event.title}
                    </p>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                    {event.duration}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
