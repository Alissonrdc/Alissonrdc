require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

// ─── Clientes ─────────────────────────────────────────────────────────────────

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Memória ──────────────────────────────────────────────────────────────────

const MEMORY_FILE = path.join(__dirname, "memory.json");

function carregarMemoria() {
  try {
    return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
  } catch {
    return { tarefas: [], ideias: [], historico: [] };
  }
}

function salvarMemoria(memoria) {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memoria, null, 2), "utf8");
}

// ─── Claude ───────────────────────────────────────────────────────────────────

async function perguntarClaude(mensagemUsuario) {
  const memoria = carregarMemoria();

  const systemPrompt = `Você é o Jarvis, assistente pessoal inteligente do usuário.

MEMÓRIA ATUAL:
- Tarefas pendentes: ${JSON.stringify(memoria.tarefas)}
- Ideias salvas: ${JSON.stringify(memoria.ideias)}

INSTRUÇÕES:
1. Responda sempre em português, de forma direta e útil.
2. Se o usuário mencionar uma TAREFA a fazer, extraia e retorne um bloco JSON ao final da resposta no formato:
   [TAREFA: {"acao": "adicionar", "item": "descrição da tarefa"}]
3. Se o usuário mencionar uma IDEIA, extraia e retorne um bloco JSON ao final da resposta no formato:
   [IDEIA: {"acao": "adicionar", "item": "descrição da ideia"}]
4. Se o usuário disser que concluiu ou removeu uma tarefa/ideia, use:
   [TAREFA: {"acao": "remover", "item": "descrição exata"}]
5. Não mostre os blocos JSON ao usuário — eles são instruções internas.
6. Se não houver nada para salvar, não inclua nenhum bloco JSON.`;

  const response = await claude.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: mensagemUsuario }],
  });

  const textoCompleto = response.content[0].text;

  // Extrai e processa blocos de memória
  processarBlocosMemoria(textoCompleto);

  // Remove os blocos internos antes de retornar ao usuário
  const textoLimpo = textoCompleto
    .replace(/\[TAREFA:.*?\]/gs, "")
    .replace(/\[IDEIA:.*?\]/gs, "")
    .trim();

  return textoLimpo;
}

function processarBlocosMemoria(texto) {
  const memoria = carregarMemoria();
  let atualizado = false;

  const regexTarefa = /\[TAREFA:\s*(\{.*?\})\]/gs;
  const regexIdeia = /\[IDEIA:\s*(\{.*?\})\]/gs;

  for (const match of texto.matchAll(regexTarefa)) {
    try {
      const { acao, item } = JSON.parse(match[1]);
      if (acao === "adicionar" && item && !memoria.tarefas.includes(item)) {
        memoria.tarefas.push(item);
        atualizado = true;
      } else if (acao === "remover") {
        memoria.tarefas = memoria.tarefas.filter((t) => t !== item);
        atualizado = true;
      }
    } catch {}
  }

  for (const match of texto.matchAll(regexIdeia)) {
    try {
      const { acao, item } = JSON.parse(match[1]);
      if (acao === "adicionar" && item && !memoria.ideias.includes(item)) {
        memoria.ideias.push(item);
        atualizado = true;
      } else if (acao === "remover") {
        memoria.ideias = memoria.ideias.filter((i) => i !== item);
        atualizado = true;
      }
    } catch {}
  }

  if (atualizado) salvarMemoria(memoria);
}

// ─── Comandos ─────────────────────────────────────────────────────────────────

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Olá! Sou o Jarvis, seu assistente pessoal.\n\nComandos disponíveis:\n/tarefas — lista suas tarefas\n/ideias — lista suas ideias\n/memoria — mostra tudo salvo\n\nOu simplesmente me mande uma mensagem!`
  );
});

bot.onText(/\/tarefas/, (msg) => {
  const { tarefas } = carregarMemoria();
  if (tarefas.length === 0) {
    bot.sendMessage(msg.chat.id, "Nenhuma tarefa salva.");
    return;
  }
  const lista = tarefas.map((t, i) => `${i + 1}. ${t}`).join("\n");
  bot.sendMessage(msg.chat.id, `Suas tarefas:\n\n${lista}`);
});

bot.onText(/\/ideias/, (msg) => {
  const { ideias } = carregarMemoria();
  if (ideias.length === 0) {
    bot.sendMessage(msg.chat.id, "Nenhuma ideia salva.");
    return;
  }
  const lista = ideias.map((i, idx) => `${idx + 1}. ${i}`).join("\n");
  bot.sendMessage(msg.chat.id, `Suas ideias:\n\n${lista}`);
});

bot.onText(/\/memoria/, (msg) => {
  const memoria = carregarMemoria();
  bot.sendMessage(
    msg.chat.id,
    `Memória completa:\n\n${JSON.stringify(memoria, null, 2)}`
  );
});

// ─── Mensagens livres ─────────────────────────────────────────────────────────

bot.on("message", async (msg) => {
  if (!msg.text || msg.text.startsWith("/")) return;

  const chatId = msg.chat.id;

  try {
    await bot.sendChatAction(chatId, "typing");
    const resposta = await perguntarClaude(msg.text);
    bot.sendMessage(chatId, resposta);
  } catch (err) {
    console.error("Erro:", err.message);
    bot.sendMessage(chatId, "Ocorreu um erro. Tente novamente.");
  }
});

console.log("Jarvis online.");
