import type { EventItem, Organizer } from "../types";

// Promotors reals de Lleida (per al prototip)
const calTeo: Organizer = {
  id: "org-cal-teo",
  name: "Cal Teo · TETEO",
  slug: "cal-teo",
  type: "club",
  city: "Lleida",
};

const bonoboGroup: Organizer = {
  id: "org-bonobo",
  name: "Grup Bonöbo",
  slug: "bonobo-group",
  type: "club",
  city: "Lleida",
};

const ceudl: Organizer = {
  id: "org-ceudl",
  name: "CEUdL · PromoFARRA",
  slug: "ceudl",
  type: "university_council",
  city: "Lleida",
};

const cafeTeatre: Organizer = {
  id: "org-cafe-teatre",
  name: "Cafè del Teatre",
  slug: "cafe-del-teatre",
  type: "cultural",
  city: "Lleida",
};

const bigBen: Organizer = {
  id: "org-big-ben",
  name: "Big Ben Discoteca",
  slug: "big-ben",
  type: "club",
  city: "Golmés (Lleida)",
};

// Imatges via picsum.photos amb seed deterministic — sempre carreguen,
// nunca rate-limit ni hotlink restrictions. Quan tinguem promotors reals
// onboardats, els pujaran fotos pròpies al Supabase Storage.
const IMG = {
  teteo: "https://picsum.photos/seed/teteo-cal-teo-club/800/500",
  biloba: "https://picsum.photos/seed/biloba-electronic-festival/800/500",
  manolita: "https://picsum.photos/seed/manolita-indie-concert/800/500",
  lanuit: "https://picsum.photos/seed/lanuit-disco-lights/800/500",
  lemon: "https://picsum.photos/seed/lemon-reggaeton-party/800/500",
  promofarra: "https://picsum.photos/seed/promofarra-udl-students/800/500",
  cafeTeatre: "https://picsum.photos/seed/jazz-quartet-stage/800/500",
  welcomeWeek: "https://picsum.photos/seed/udl-campus-students/800/500",
  festaMajor: "https://picsum.photos/seed/festa-major-crowd/800/500",
  bigBen: "https://picsum.photos/seed/bigben-disco-reopening/800/500",
};

// Dates relatives a "ara" (23 maig 2026)
const now = new Date("2026-05-23T20:00:00");
function inDays(d: number, hour = 23, min = 45) {
  const date = new Date(now);
  date.setDate(date.getDate() + d);
  date.setHours(hour, min, 0, 0);
  return date;
}

export const events: EventItem[] = [
  {
    id: "evt-teteo-saturday-30may",
    slug: "teteo-saturday-night-30-maig",
    title: "TETEO Saturday Night",
    description:
      "La sessió universitària de tota la vida al Cal Teo. Reguetón, latino i comercial fins l'última cançó. Posa't guapo i baixa cap a Teuleries 9.",
    type: "party",
    tags: ["reguetón", "latino", "universitari", "comercial"],
    startAt: inDays(7, 23, 45),
    endAt: inDays(8, 5, 30),
    venueName: "Cal Teo",
    venueAddress: "C/ Teuleries 9, Lleida",
    organizer: calTeo,
    coverImageUrl: IMG.teteo,
    capacityTotal: 320,
    capacitySold: 247,
    isHot: true,
    isFeatured: true,
    tiers: [
      {
        id: "tier-teteo-udl",
        name: "Descompte UdL",
        priceCents: 1000,
        capacity: 100,
        sold: 78,
        isUdlOnly: true,
        description: "Només per a verificats @alumnes.udl.cat",
      },
      {
        id: "tier-teteo-general",
        name: "General",
        priceCents: 1500,
        capacity: 220,
        sold: 169,
      },
    ],
  },
  {
    id: "evt-biloba-carnaval-6jun",
    slug: "biloba-carnaval-edition",
    title: "Biloba Sessions · Carnaval Edition",
    description:
      "El Top 100 IMS torna amb la seva edició especial de Carnaval. DJ residents + invitats internacionals. La festa més gran de l'estiu a Ivars.",
    type: "party",
    tags: ["electrònica", "techno", "carnaval", "macro"],
    startAt: inDays(14, 23, 0),
    endAt: inDays(15, 7, 0),
    venueName: "Biloba",
    venueAddress: "C/ Ivars d'Urgell, Lleida",
    organizer: bonoboGroup,
    coverImageUrl: IMG.biloba,
    capacityTotal: 2400,
    capacitySold: 1450,
    isFeatured: true,
    tiers: [
      {
        id: "tier-biloba-early",
        name: "Early Bird",
        priceCents: 1500,
        capacity: 500,
        sold: 500,
        description: "Ja esgotat",
      },
      {
        id: "tier-biloba-general",
        name: "General",
        priceCents: 2000,
        capacity: 1500,
        sold: 920,
      },
      {
        id: "tier-biloba-vip",
        name: "VIP + Open Bar",
        priceCents: 3500,
        capacity: 400,
        sold: 30,
      },
    ],
  },
  {
    id: "evt-promofarra-final-curs",
    slug: "promofarra-festa-final-curs",
    title: "PromoFARRA · Festa Final de Curs",
    description:
      "Els TFG entregats, ara toca celebrar-ho. Festa organitzada pel Consell de l'Estudiantat amb DJs locals i obert només a estudiants UdL.",
    type: "party",
    tags: ["universitari", "final-curs", "udl", "exclusiu"],
    startAt: inDays(20, 22, 0),
    endAt: inDays(21, 4, 0),
    venueName: "Cal Teo",
    venueAddress: "C/ Teuleries 9, Lleida",
    organizer: ceudl,
    coverImageUrl: IMG.promofarra,
    capacityTotal: 280,
    capacitySold: 195,
    isUdlExclusive: true,
    isHot: true,
    tiers: [
      {
        id: "tier-promofarra-udl",
        name: "Entrada UdL",
        priceCents: 800,
        capacity: 280,
        sold: 195,
        isUdlOnly: true,
      },
    ],
  },
  {
    id: "evt-manolita-13jun",
    slug: "manolita-night-13-jun",
    title: "Manolita Night · Indie Pop",
    description:
      "Concert directe amb tres bandes catalanes emergents + DJ session fins les 4. Aforament reduït, ambient cuidat.",
    type: "concert",
    tags: ["indie", "pop", "directe", "català"],
    startAt: inDays(21, 22, 30),
    endAt: inDays(22, 4, 0),
    venueName: "Manolita Night Life",
    venueAddress: "C/ Guillem de Béziers, Lleida",
    organizer: bonoboGroup,
    coverImageUrl: IMG.manolita,
    capacityTotal: 380,
    capacitySold: 142,
    tiers: [
      {
        id: "tier-manolita-general",
        name: "General",
        priceCents: 1200,
        capacity: 380,
        sold: 142,
      },
    ],
  },
  {
    id: "evt-lanuit-opening",
    slug: "lanuit-opening-night",
    title: "LaNuit Opening Night",
    description:
      "Estrena de la nova temporada de LaNuit. 3 sales, una nit. Música variada per a tots els gustos i copa de benvinguda fins les 1.",
    type: "party",
    tags: ["macro", "variada", "estrena"],
    startAt: inDays(13, 0, 30),
    endAt: inDays(14, 6, 0),
    venueName: "LaNuit Discothèque",
    venueAddress: "Av. Garrigues 39, Lleida",
    organizer: bonoboGroup,
    coverImageUrl: IMG.lanuit,
    capacityTotal: 700,
    capacitySold: 340,
    tiers: [
      {
        id: "tier-lanuit-udl",
        name: "Descompte UdL",
        priceCents: 1200,
        capacity: 200,
        sold: 95,
        isUdlOnly: true,
      },
      {
        id: "tier-lanuit-general",
        name: "General",
        priceCents: 1500,
        capacity: 500,
        sold: 245,
      },
    ],
  },
  {
    id: "evt-cafe-teatre-jazz",
    slug: "cafe-teatre-jazz-session",
    title: "Jazz Session · Quartet Local",
    description:
      "Programació cultural del Cafè del Teatre de l'Escorxador. Quartet de músics de Lleida + jam session oberta després del concert.",
    type: "cultural",
    tags: ["jazz", "directe", "cultura", "petit-format"],
    startAt: inDays(22, 21, 0),
    endAt: inDays(22, 23, 30),
    venueName: "Cafè del Teatre de l'Escorxador",
    venueAddress: "Pl. de l'Escorxador, Lleida",
    organizer: cafeTeatre,
    coverImageUrl: IMG.cafeTeatre,
    capacityTotal: 80,
    capacitySold: 23,
    tiers: [
      {
        id: "tier-jazz-general",
        name: "General",
        priceCents: 700,
        capacity: 80,
        sold: 23,
      },
    ],
  },
  {
    id: "evt-welcome-week-2026",
    slug: "welcome-week-udl-setembre-2026",
    title: "Welcome Week UdL 2026-27",
    description:
      "Jornada d'Acollida al campus Cappont. Activitats, regals i benvinguda als estudiants de 1r. Entrada gratuïta amb el carnet UdL.",
    type: "academic",
    tags: ["udl", "benvinguda", "campus", "gratis"],
    startAt: new Date("2026-09-15T11:00:00"),
    endAt: new Date("2026-09-15T20:00:00"),
    venueName: "Campus Cappont",
    venueAddress: "C/ Jaume II, 67 bis, Lleida",
    organizer: ceudl,
    coverImageUrl: IMG.welcomeWeek,
    capacityTotal: 3000,
    capacitySold: 0,
    isUdlExclusive: true,
    tiers: [
      {
        id: "tier-welcome-free",
        name: "Entrada gratuïta",
        priceCents: 0,
        capacity: 3000,
        sold: 0,
        isUdlOnly: true,
      },
    ],
  },
  {
    id: "evt-festa-major-2027",
    slug: "festa-major-udl-2027",
    title: "Festa Major UdL 2027",
    description:
      "La 31a edició de la Festa Major UdL. Concert principal, DJs, food trucks i activitats al campus Cappont. Faltarà poc.",
    type: "party",
    tags: ["udl", "festa-major", "imprescindible", "campus"],
    startAt: new Date("2027-04-17T19:00:00"),
    endAt: new Date("2027-04-18T04:00:00"),
    venueName: "Campus Cappont",
    venueAddress: "C/ Jaume II, Lleida",
    organizer: ceudl,
    coverImageUrl: IMG.festaMajor,
    capacityTotal: 5000,
    capacitySold: 0,
    isUdlExclusive: true,
    isFeatured: true,
    tiers: [
      {
        id: "tier-fm-udl",
        name: "Estudiant UdL",
        priceCents: 1500,
        capacity: 4000,
        sold: 0,
        isUdlOnly: true,
      },
      {
        id: "tier-fm-extern",
        name: "Convidat extern",
        priceCents: 2500,
        capacity: 1000,
        sold: 0,
      },
    ],
  },
];

export function findEventById(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

export function getUpcomingEvents(): EventItem[] {
  const refNow = new Date("2026-05-23T20:00:00");
  return events
    .filter((e) => e.startAt.getTime() >= refNow.getTime())
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
}

export function getFeaturedEvents(): EventItem[] {
  return getUpcomingEvents().filter((e) => e.isFeatured);
}
