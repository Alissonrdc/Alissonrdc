"use client";

import { useState, useRef, useEffect } from "react";
import AppShell from "@/components/layout/AppShell";
import { Send, Mic, Paperclip, Zap, RotateCcw, Brain, FolderKanban, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "user" | "jarvis";
  content: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "jarvis",
    content:
      "Olá, Alisson! Analisei seu dia. Você tem 3 alertas críticos — o mais urgente é o follow-up com o cliente DEF na Assessoria (5 dias sem resposta). Quer que eu crie uma tarefa de contato para agora?",
    time: "07:30",
  },
];

const suggestions = [
  "Organiza meu dia e me dá só 3 prioridades",
  "Quais follow-ups estão atrasados?",
  "Gera resumo da semana passada",
  "Cria projeto na Midas Hub para o novo cliente",
];

const contextCards = [
  {
    icon: Target,
    label: "Metas do Mês",
    value: "MRR +15% · 5 novos contratos",
    color: "#245bff",
  },
  {
    icon: FolderKanban,
    label: "Projetos Ativos",
    value: "15 projetos · 3 empresas",
    color: "#a855f7",
  },
  {
    icon: Brain,
    label: "Memórias Salvas",
    value: "47 contextos · atualizado hoje",
    color: "#f59e0b",
  },
];

function formatTime() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

const JARVIS_RESPONSES: Record<string, string> = {
  default:
    "Entendido! Estou processando sua solicitação. Posso criar tarefas, resumir projetos, analisar suas metas ou ajudar a organizar suas prioridades. Como posso ajudar mais?",
  prioridade:
    "Com base no seu dia de hoje, suas 3 principais prioridades são:\n\n1. **Contatar cliente DEF** (Assessoria) — follow-up há 5 dias, risco de perda\n2. **Revisar arquitetura Jarvis Hub** (Midas) — bloqueio técnico pendente\n3. **Aprovar roteiro XPTO** (Modo Criativo) — prazo em 2 dias\n\nQuer que eu bloqueie tempo na agenda para cada uma?",
  followup:
    "Encontrei **3 follow-ups atrasados**:\n\n• **Cliente DEF** — Assessoria · 5 dias sem resposta ⚠️\n• **Lead ABC** — Midas Hub · proposta enviada há 3 dias\n• **Cliente XPTO** — Modo Criativo · aprovação pendente há 2 dias\n\nCrio uma tarefa de contato para os 3 agora?",
  resumo:
    "**Resumo da Semana Passada:**\n\n✅ Concluídos: 12 tarefas | 2 projetos entregues\n⏳ Em andamento: 15 tarefas | 5 projetos\n🔴 Atrasados: 3 follow-ups | 1 entrega\n\n**Destaque:** Midas Hub avançou 40% no módulo de IA do Jarvis Hub. Modo Criativo entregou 6 vídeos.\n\n**Foco recomendado para essa semana:** reativar pipeline comercial da Assessoria.",
};

function getResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("prioridad") || lower.includes("organiz")) return JARVIS_RESPONSES.prioridade;
  if (lower.includes("follow") || lower.includes("atrasa")) return JARVIS_RESPONSES.followup;
  if (lower.includes("resumo") || lower.includes("semana")) return JARVIS_RESPONSES.resumo;
  return JARVIS_RESPONSES.default;
}

export default function JarvisPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text?: string) {
    const content = text || input.trim();
    if (!content) return;

    const userMsg: Message = { id: Date.now(), role: "user", content, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    const jarvisMsg: Message = {
      id: Date.now() + 1,
      role: "jarvis",
      content: getResponse(content),
      time: formatTime(),
    };
    setMessages((prev) => [...prev, jarvisMsg]);
    setLoading(false);
  }

  return (
    <AppShell>
      <div className="flex gap-5 h-[calc(100vh-80px)]">
        {/* Chat area */}
        <div className="flex-1 flex flex-col rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b"
            style={{ borderColor: "var(--border)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "var(--accent)" }}>
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Assistente Jarvis
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Online · memória ativa
                </span>
              </div>
            </div>
            <button className="ml-auto flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
              <RotateCcw size={12} />
              Nova conversa
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
              >
                {msg.role === "jarvis" && (
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--accent)" }}>
                    <Zap size={13} className="text-white" />
                  </div>
                )}
                <div className={cn("max-w-[75%]", msg.role === "user" && "items-end flex flex-col")}>
                  <div
                    className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap"
                    style={
                      msg.role === "jarvis"
                        ? { background: "var(--muted)", color: "var(--foreground)" }
                        : { background: "var(--accent)", color: "white" }
                    }
                  >
                    {msg.content}
                  </div>
                  <span className="text-xs mt-1 px-1" style={{ color: "var(--muted-foreground)" }}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--accent)" }}>
                  <Zap size={13} className="text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl" style={{ background: "var(--muted)" }}>
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-5 pb-2 flex gap-2 overflow-x-auto">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-blue-400 hover:text-blue-600"
                style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 pb-5 pt-2">
            <div className="flex items-end gap-2 p-3 rounded-xl border"
              style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
              <button className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                <Paperclip size={15} style={{ color: "var(--muted-foreground)" }} />
              </button>
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Peça ao Jarvis para organizar seu dia, criar projetos, resumir semanas…"
                className="flex-1 bg-transparent text-sm resize-none outline-none leading-relaxed"
                style={{ color: "var(--foreground)", maxHeight: "120px" }}
              />
              <button className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                <Mic size={15} style={{ color: "var(--muted-foreground)" }} />
              </button>
              <button
                onClick={() => send()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white transition-opacity hover:opacity-90"
                style={{ background: input.trim() ? "var(--accent)" : "#d1d5db" }}
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right panel: context */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--muted-foreground)" }}>
              Contexto Ativo
            </h3>
            <div className="space-y-3">
              {contextCards.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="p-3 rounded-xl border"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={13} style={{ color }} />
                    <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                      {label}
                    </span>
                  </div>
                  <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent conversations */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--muted-foreground)" }}>
              Histórico
            </h3>
            <div className="space-y-1">
              {[
                "Prioridades da semana — Midas",
                "Proposta para cliente DEF",
                "Review mensal — Mar 2025",
                "Estrutura do módulo de IA",
              ].map((title) => (
                <button key={title}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-gray-100"
                  style={{ color: "var(--muted-foreground)" }}>
                  {title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
