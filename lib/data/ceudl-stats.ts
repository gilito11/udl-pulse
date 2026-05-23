// Estadístiques fictícies per al panel CEUdL del prototip.
// IMPORTANT: aquestes dades són UN MOCK i mai es presenten al CEUdL
// real com si fossin reals. La UI inclou badges "Vista demo".

export const assistantsByFaculty = [
  { faculty: "EPS", count: 87, color: "var(--primary)" },
  { faculty: "FDET", count: 142, color: "#8B5CF6" },
  { faculty: "FEPTS", count: 98, color: "#06B6D4" },
  { faculty: "Lletres", count: 41, color: "#10B981" },
  { faculty: "Medicina", count: 65, color: "#F59E0B" },
  { faculty: "ETSEA", count: 33, color: "#EF4444" },
  { faculty: "FIF", count: 27, color: "#EC4899" },
];

export const peakHoursData = [
  { hour: "22h", attendance: 45 },
  { hour: "23h", attendance: 180 },
  { hour: "00h", attendance: 410 },
  { hour: "01h", attendance: 493 },
  { hour: "02h", attendance: 487 },
  { hour: "03h", attendance: 320 },
  { hour: "04h", attendance: 120 },
];

export const recentEventsStats = [
  {
    eventName: "PromoFARRA · Festa Final Curs",
    date: "12 juny",
    attendees: 245,
    capacity: 280,
    revenue: 1960,
  },
  {
    eventName: "TETEO Saturday Night",
    date: "30 maig",
    attendees: 312,
    capacity: 320,
    revenue: 3744,
  },
  {
    eventName: "Welcome Week UdL",
    date: "15 setembre",
    attendees: 0,
    capacity: 3000,
    revenue: 0,
  },
];

export const kpiCards = [
  {
    label: "Estudiants verificats",
    value: "1.247",
    delta: "+18% setmana",
    trend: "up" as const,
  },
  {
    label: "Entrades venudes (mes)",
    value: "623",
    delta: "+34% mes anterior",
    trend: "up" as const,
  },
  {
    label: "Conversió a entrada",
    value: "47%",
    delta: "+5pp respecte mitjana",
    trend: "up" as const,
  },
  {
    label: "Comerços actius",
    value: "7",
    delta: "Onboarding en curs",
    trend: "neutral" as const,
  },
];
