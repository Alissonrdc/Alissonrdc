"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Zap } from "lucide-react";
import { COMPANIES } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"login" | "workspace">("login");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStep("workspace");
  }

  return (
    <div
      className="min-h-screen grid-bg flex items-center justify-center px-4"
      style={{ background: "var(--sidebar)" }}
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, #245bff 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {step === "login" ? (
          <>
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 glow-accent"
                style={{ background: "var(--accent)" }}
              >
                <Zap size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Jarvis Hub
              </h1>
              <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                Seu cockpit de orquestração
              </p>
            </div>

            {/* Card */}
            <div
              className="rounded-2xl p-8 border"
              style={{ background: "#111118", borderColor: "#1f2937" }}
            >
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label
                    className="block text-xs font-medium mb-1.5"
                    style={{ color: "#9ca3af" }}
                  >
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#4b5563" }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alisson@midashub.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:border-blue-500"
                      style={{ background: "#09090f", borderColor: "#1f2937" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-medium mb-1.5"
                    style={{ color: "#9ca3af" }}
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#4b5563" }}
                    />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 border outline-none transition-colors focus:border-blue-500"
                      style={{ background: "#09090f", borderColor: "#1f2937" }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90 mt-2"
                  style={{ background: "var(--accent)" }}
                >
                  Entrar
                  <ArrowRight size={14} />
                </button>
              </form>

              <div
                className="mt-6 pt-6 border-t"
                style={{ borderColor: "#1f2937" }}
              >
                <button
                  className="w-full py-2.5 rounded-lg text-sm font-medium border transition-colors hover:border-gray-600"
                  style={{
                    background: "transparent",
                    borderColor: "#1f2937",
                    color: "#9ca3af",
                  }}
                  onClick={() => setStep("workspace")}
                >
                  Continuar com Google SSO
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Workspace selection */
          <>
            <div className="text-center mb-8">
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 glow-accent"
                style={{ background: "var(--accent)" }}
              >
                <Zap size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Bem-vindo, Alisson
              </h1>
              <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                Selecione o contexto inicial
              </p>
            </div>

            <div className="space-y-3">
              {/* All ecosystem card */}
              <button
                onClick={() => router.push("/cockpit")}
                className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all hover:border-blue-500/50 group"
                style={{ background: "#111118", borderColor: "#245bff40" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                >
                  JH
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm">
                    Cockpit Geral
                  </p>
                  <p className="text-xs" style={{ color: "#6b7280" }}>
                    Visão completa do ecossistema
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>

              {COMPANIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => router.push("/cockpit")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all group"
                  style={{ background: "#111118", borderColor: "#1f2937" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = c.color + "50")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "#1f2937")
                  }
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{
                      background: c.color + "20",
                      border: `1px solid ${c.color}40`,
                    }}
                  >
                    <span style={{ color: c.color }}>{c.badge}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{c.name}</p>
                    <p
                      className="text-xs truncate"
                      style={{ color: "#6b7280" }}
                    >
                      {c.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: c.color }}
                  />
                </button>
              ))}
            </div>

            <p className="text-center text-xs mt-4" style={{ color: "#374151" }}>
              Último acesso: Midas Hub · há 2h
            </p>
          </>
        )}
      </div>
    </div>
  );
}
