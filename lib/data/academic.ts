// Calendari acadèmic mock — inspirat en el calendari real del Grau
// d'Enginyeria Informàtica de l'EPS UdL (curs 2025-26, 2n quadrimestre).
//
// Quan tinguem accés via integració amb Sakai o parsing dels PDFs
// públics que la UdL publica per cada centre/quadrimestre, aquestes
// dades es generaran automàticament per a cada estudiant segons la
// seva matrícula.

export type AcademicItemKind =
  | "exam"
  | "deadline"
  | "tfg"
  | "review"
  | "presentation";

export interface AcademicItem {
  id: string;
  kind: AcademicItemKind;
  subjectCode: string;
  subjectName: string;
  title: string;
  startAt: Date;
  endAt?: Date;
  location?: string;
  notes?: string;
  weight?: string; // p.e. "40% de la nota final"
  status: "upcoming" | "today" | "past";
}

export interface AcademicSubject {
  code: string;
  name: string;
  credits: number;
  semester: 1 | 2;
  year: 4;
}

export const enrolledSubjects: AcademicSubject[] = [
  {
    code: "102058",
    name: "Direcció de Projectes Informàtics",
    credits: 6,
    semester: 2,
    year: 4,
  },
  {
    code: "102060",
    name: "Sistemes Distribuïts",
    credits: 6,
    semester: 2,
    year: 4,
  },
  {
    code: "102063",
    name: "Aprenentatge Automàtic",
    credits: 6,
    semester: 2,
    year: 4,
  },
  {
    code: "102099",
    name: "Treball de Fi de Grau (TFG)",
    credits: 12,
    semester: 2,
    year: 4,
  },
];

// Dates relatives a 23 maig 2026
function date(day: number, month: number, hour = 9, min = 0): Date {
  return new Date(2026, month - 1, day, hour, min, 0);
}

export const academicCalendar: AcademicItem[] = [
  {
    id: "ac-tfg-entrega",
    kind: "tfg",
    subjectCode: "102099",
    subjectName: "TFG",
    title: "Entrega memòria final TFG",
    startAt: date(8, 6, 23, 59),
    notes: "Lliurament al Campus Virtual abans de mitjanit. PDF + codi.",
    weight: "60% de la nota final",
    status: "upcoming",
  },
  {
    id: "ac-exam-sd",
    kind: "exam",
    subjectCode: "102060",
    subjectName: "Sistemes Distribuïts",
    title: "Examen final · Convocatòria ordinària",
    startAt: date(12, 6, 9, 0),
    endAt: date(12, 6, 12, 0),
    location: "Aula 1.04 · EPS Cappont",
    weight: "50% de la nota",
    status: "upcoming",
  },
  {
    id: "ac-exam-aa",
    kind: "exam",
    subjectCode: "102063",
    subjectName: "Aprenentatge Automàtic",
    title: "Examen final · Convocatòria ordinària",
    startAt: date(15, 6, 9, 0),
    endAt: date(15, 6, 12, 0),
    location: "Aula 1.07 · EPS Cappont",
    weight: "60% de la nota",
    status: "upcoming",
  },
  {
    id: "ac-tfg-defensa",
    kind: "presentation",
    subjectCode: "102099",
    subjectName: "TFG",
    title: "Defensa pública del TFG",
    startAt: date(2, 7, 11, 30),
    endAt: date(2, 7, 12, 0),
    location: "Sala de Graus · EPS Cappont",
    notes: "Presentació 20min + 10min de preguntes del tribunal.",
    weight: "40% de la nota final",
    status: "upcoming",
  },
  {
    id: "ac-exam-dpi",
    kind: "exam",
    subjectCode: "102058",
    subjectName: "Direcció de Projectes Informàtics",
    title: "Examen final · Convocatòria ordinària",
    startAt: date(18, 6, 9, 0),
    endAt: date(18, 6, 11, 30),
    location: "Aula 2.12 · EPS Cappont",
    weight: "50% de la nota",
    status: "upcoming",
  },
  {
    id: "ac-deadline-aa-practica",
    kind: "deadline",
    subjectCode: "102063",
    subjectName: "Aprenentatge Automàtic",
    title: "Pràctica 3 · Models de classificació",
    startAt: date(30, 5, 23, 59),
    notes: "Entrega via Campus Virtual.",
    weight: "20% de la nota",
    status: "upcoming",
  },
];

export const KIND_META: Record<
  AcademicItemKind,
  { label: string; emoji: string; color: string; bg: string }
> = {
  exam: {
    label: "Examen",
    emoji: "📝",
    color: "#FF4D6D",
    bg: "rgba(255,77,109,0.12)",
  },
  deadline: {
    label: "Entrega",
    emoji: "📤",
    color: "#FFD23F",
    bg: "rgba(255,210,63,0.12)",
  },
  tfg: {
    label: "TFG",
    emoji: "🎓",
    color: "#06B6D4",
    bg: "rgba(6,182,212,0.12)",
  },
  review: {
    label: "Revisió",
    emoji: "👀",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.12)",
  },
  presentation: {
    label: "Defensa",
    emoji: "🎤",
    color: "#10B981",
    bg: "rgba(16,185,129,0.12)",
  },
};

export function getUpcomingAcademicItems(): AcademicItem[] {
  const refNow = new Date("2026-05-23T20:00:00");
  return academicCalendar
    .filter((i) => i.startAt.getTime() >= refNow.getTime())
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
}
