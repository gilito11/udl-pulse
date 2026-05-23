// Tipos compartidos del prototip
// Quan migrem a Supabase + Drizzle, aquests tipus es generaran automàticament
// del schema. De moment, definits a mà.

export type Faculty =
  | "eps"
  | "fdet"
  | "fepts"
  | "lletres"
  | "medicina"
  | "etsea"
  | "igualada"
  | "fif";

export type EventType =
  | "party"
  | "concert"
  | "cultural"
  | "academic"
  | "social";

export type OrganizerType =
  | "club"
  | "promoter"
  | "university_council"
  | "merchant"
  | "cultural";

export interface Organizer {
  id: string;
  name: string;
  slug: string;
  type: OrganizerType;
  city: string;
}

export interface TicketTier {
  id: string;
  name: string;
  priceCents: number;
  capacity: number;
  sold: number;
  isUdlOnly?: boolean;
  description?: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: EventType;
  tags: string[];
  startAt: Date;
  endAt: Date;
  venueName: string;
  venueAddress: string;
  organizer: Organizer;
  coverImageUrl: string;
  galleryUrls?: string[];
  capacityTotal: number;
  capacitySold: number;
  tiers: TicketTier[];
  isUdlExclusive?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
}

export type DiscountCategory =
  | "books"
  | "food"
  | "gym"
  | "cinema"
  | "clothing"
  | "services"
  | "culture";

export interface Merchant {
  id: string;
  name: string;
  category: DiscountCategory;
  address: string;
  neighborhood: string;
  logo?: string;
}

export type DiscountType = "percentage" | "fixed_amount" | "bogo" | "free";

export interface Discount {
  id: string;
  merchant: Merchant;
  title: string;
  description: string;
  conditions?: string;
  discountType: DiscountType;
  discountValue: number; // % o cèntims
  isUdlOnly: boolean;
  totalRedeemed: number;
}

export interface Profile {
  id: string;
  displayName: string;
  faculty: Faculty;
  facultyName: string;
  yearOfStudy: number;
  graduationYear: number;
  preferredLocale: "ca" | "es" | "en";
  initials: string;
  joinedAt: Date;
}

export interface PurchasedTicket {
  id: string;
  event: EventItem;
  tier: TicketTier;
  quantity: number;
  qrCode: string;
  purchasedAt: Date;
  status: "confirmed" | "used" | "refunded";
}
