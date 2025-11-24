export type DailyFeeling = {
  userId: string;
  date: string;      // "YYYY-MM-DD"
  mood: string;      // ex: "Ansioso", "Tranquilo", etc.
  note?: string;     // opcional: observação curta
  createdAt: string; // ISO
};

const STORAGE_KEY = "calmio:daily-feelings";
const LAST_DATE_KEY = "calmio:last-feeling-date";

function loadDailyFeelings(): DailyFeeling[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DailyFeeling[];
  } catch {
    return [];
  }
}

function saveDailyFeelings(data: DailyFeeling[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function setLastDailyFeelingDate(userId: string, date: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${LAST_DATE_KEY}:${userId}`, date);
}

export function getLastDailyFeelingDate(userId: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${LAST_DATE_KEY}:${userId}`);
}

export function saveDailyFeelingForToday(userId: string, mood: string, note?: string) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const now = new Date().toISOString();

  // remove apenas o registro desse usuário nesse dia, mantendo os de outros usuários
  const all = loadDailyFeelings().filter(
    (f) => !(f.userId === userId && f.date === today)
  );

  const entry: DailyFeeling = {
    userId,
    date: today,
    mood,
    note,
    createdAt: now,
  };

  all.push(entry);
  // ordena por data decrescente
  all.sort((a, b) => (a.date < b.date ? 1 : -1));

  saveDailyFeelings(all);
  setLastDailyFeelingDate(userId, today);
}

export function getDailyFeelings(userId: string): DailyFeeling[] {
  return loadDailyFeelings().filter((f) => f.userId === userId);
}