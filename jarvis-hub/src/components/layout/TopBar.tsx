"use client";

import { Bell, Search, MessageSquare, ChevronDown } from "lucide-react";
import { useState } from "react";
import { COMPANIES, type CompanyId } from "@/lib/utils";

export default function TopBar() {
  const [activeCompany, setActiveCompany] = useState<CompanyId>("midas");
  const [open, setOpen] = useState(false);

  const current = COMPANIES.find((c) => c.id === activeCompany)!;

  return (
    <header
      className="fixed top-0 right-0 z-20 flex items-center justify-between px-6 h-14"
      style={{
        left: "240px",
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm w-72"
        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
        <Search size={14} />
        <span>Buscar projetos, tarefas, clientes…</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Context switcher */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors"
            style={{ borderColor: current.color + "40", background: current.color + "10", color: current.color }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: current.color }} />
            {current.name}
            <ChevronDown size={13} />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-52 rounded-xl shadow-xl border overflow-hidden z-50"
              style={{ background: "white", borderColor: "var(--border)" }}>
              {COMPANIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setActiveCompany(c.id); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <div>
                    <p className="font-medium text-xs" style={{ color: "var(--foreground)" }}>{c.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{c.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Jarvis button */}
        <a href="/jarvis"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)" }}>
          <MessageSquare size={14} />
          Jarvis
        </a>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={16} style={{ color: "var(--muted-foreground)" }} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#ef4444" }} />
        </button>
      </div>
    </header>
  );
}
