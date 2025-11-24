export type DailyFeeling = {
  date: string;      
  mood: string;      
  note?: string;     
  createdAt: string; 
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

function setLastDailyFeelingDate(date: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_DATE_KEY, date);
}

export function getLastDailyFeelingDate(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LAST_DATE_KEY);
}

export function saveDailyFeelingForToday(mood: string, note?: string) {
  const today = new Date().toISOString().slice(0, 10); 
  const now = new Date().toISOString();

  const all = loadDailyFeelings().filter((f) => f.date !== today);

  const entry: DailyFeeling = {
    date: today,
    mood,
    note,
    createdAt: now,
  };

  all.push(entry);
  all.sort((a, b) => (a.date < b.date ? 1 : -1));

  saveDailyFeelings(all);
  setLastDailyFeelingDate(today);
}

export function getDailyFeelings(): DailyFeeling[] {
  return loadDailyFeelings();
}