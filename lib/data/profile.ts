import type { Profile, PurchasedTicket } from "../types";
import { events } from "./events";

export const currentProfile: Profile = {
  id: "user-eric-gil",
  displayName: "Eric Gil",
  faculty: "eps",
  facultyName: "Escola Politècnica Superior",
  yearOfStudy: 4,
  graduationYear: 2026,
  preferredLocale: "ca",
  initials: "EG",
  joinedAt: new Date("2026-05-23"),
};

// Tickets mock que ja "ha comprat" l'Eric per veure a la pantalla /tickets
export const purchasedTickets: PurchasedTicket[] = [
  {
    id: "ticket-001",
    event: events.find((e) => e.id === "evt-teteo-saturday-30may")!,
    tier: events.find((e) => e.id === "evt-teteo-saturday-30may")!.tiers[0],
    quantity: 1,
    qrCode: "UDLP-7K3N-XQ92-TET1",
    purchasedAt: new Date("2026-05-21T14:23:00"),
    status: "confirmed",
  },
  {
    id: "ticket-002",
    event: events.find((e) => e.id === "evt-promofarra-final-curs")!,
    tier: events.find((e) => e.id === "evt-promofarra-final-curs")!.tiers[0],
    quantity: 2,
    qrCode: "UDLP-2H8M-RJ41-PFA2",
    purchasedAt: new Date("2026-05-22T09:11:00"),
    status: "confirmed",
  },
];
