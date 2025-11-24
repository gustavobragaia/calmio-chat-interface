export type StoredMessage = {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string; // ISO
};

export type Conversation = {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  messages: StoredMessage[];
};

const STORAGE_KEY = "calmio:conversations";

function generateId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
}

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
  }
}

function saveConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

// cria uma nova conversa (podendo já vir com mensagens iniciais)
export function createConversation(
  initialMessages: { text: string; isBot: boolean }[] = [],
  userId: string
): Conversation {
  const now = new Date().toISOString();
  const conv: Conversation = {
    id: generateId(),
    userId,
    createdAt: now,
    updatedAt: now,
    messages: initialMessages.map((m) => ({
      id: generateId(),
      text: m.text,
      isBot: m.isBot,
      timestamp: now,
    })),
  };

  const conversations = loadConversations();
  conversations.unshift(conv); // mais recente no topo
  saveConversations(conversations);

  return conv;
}

// adiciona mensagens numa conversa existente
export function appendMessagesToConversation(
  conversationId: string,
  newMessages: { text: string; isBot: boolean }[]
) {
  const conversations = loadConversations();
  const idx = conversations.findIndex((c) => c.id === conversationId);
  if (idx === -1) return;

  const now = new Date().toISOString();
  const conv = conversations[idx];

  const stored = newMessages.map((m) => ({
    id: generateId(),
    text: m.text,
    isBot: m.isBot,
    timestamp: now,
  }));

  const updated: Conversation = {
    ...conv,
    updatedAt: now,
    messages: [...conv.messages, ...stored],
  };

  conversations[idx] = updated;
  // reordenar: conversa atual vai pro topo
  conversations.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  saveConversations(conversations);
}

// pega todas as conversas (para a tela de histórico)
export function getConversations(): Conversation[] {
  return loadConversations();
}

// pega uma conversa específica pelo id (para reabrir)
export function getConversationById(id: string): Conversation | undefined {
  return loadConversations().find((c) => c.id === id);
}
export function getConversationsByUser(userId: string): Conversation[] {
  return loadConversations().filter((c) => c.userId === userId);
}