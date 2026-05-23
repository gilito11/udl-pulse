import type { Discount, Merchant } from "../types";

const caselles: Merchant = {
  id: "m-caselles",
  name: "Llibreria Caselles",
  category: "books",
  address: "C/ Major 46, Lleida",
  neighborhood: "Centre Històric",
};

const irreductible: Merchant = {
  id: "m-irreductible",
  name: "La Irreductible",
  category: "books",
  address: "C/ Jaume II 7, Lleida",
  neighborhood: "Cappont",
};

const funatic: Merchant = {
  id: "m-funatic",
  name: "Espai Funatic",
  category: "cinema",
  address: "C/ Pi i Margall 26, Lleida",
  neighborhood: "Centre",
};

const synergymCappont: Merchant = {
  id: "m-synergym",
  name: "Synergym Cappont",
  category: "gym",
  address: "Av. Prat de la Riba 82, Lleida",
  neighborhood: "Cappont",
};

const mlGym: Merchant = {
  id: "m-mlgym",
  name: "M&L GYM Cappont",
  category: "gym",
  address: "C/ Pere de Cabrera 18, Lleida",
  neighborhood: "Cappont",
};

const screenbox: Merchant = {
  id: "m-screenbox",
  name: "Screenbox Lleida",
  category: "cinema",
  address: "C/ Anselm Clavé, Lleida",
  neighborhood: "Centre",
};

const cafeTeatre: Merchant = {
  id: "m-cafe-teatre",
  name: "Cafè del Teatre",
  category: "culture",
  address: "Pl. de l'Escorxador, Lleida",
  neighborhood: "Centre",
};

export const discounts: Discount[] = [
  {
    id: "d-caselles-10",
    merchant: caselles,
    title: "10% en llibres acadèmics",
    description:
      "Descompte directe sobre el preu de portada per a estudiants UdL.",
    conditions: "Aplicable a llibres marcats com 'UdL'. No acumulable.",
    discountType: "percentage",
    discountValue: 10,
    isUdlOnly: true,
    totalRedeemed: 142,
  },
  {
    id: "d-irreductible-5",
    merchant: irreductible,
    title: "5% en tota la literatura",
    description:
      "Cinc per cent sobre el preu en tota la planta de literatura. Local independent guardonat.",
    discountType: "percentage",
    discountValue: 5,
    isUdlOnly: true,
    totalRedeemed: 67,
  },
  {
    id: "d-funatic-3eur",
    merchant: funatic,
    title: "Sessió matinal a 3€",
    description:
      "Entrada a la sessió matinal del Funatic per només 3€. VO + cinema d'autor.",
    conditions: "Vàlid els dimecres de matí. Caducitat: junio 2026.",
    discountType: "fixed_amount",
    discountValue: 300,
    isUdlOnly: true,
    totalRedeemed: 234,
  },
  {
    id: "d-synergym-15",
    merchant: synergymCappont,
    title: "15% en matrícula + 1a quota",
    description:
      "Sense permanència. Quota mensual des de 19,99€/mes per a estudiants UdL.",
    discountType: "percentage",
    discountValue: 15,
    isUdlOnly: true,
    totalRedeemed: 89,
  },
  {
    id: "d-mlgym-10",
    merchant: mlGym,
    title: "10% en bonus 10 sessions",
    description:
      "Bonus de 10 entrenaments amb descompte universitari. Junt al campus.",
    discountType: "percentage",
    discountValue: 10,
    isUdlOnly: true,
    totalRedeemed: 31,
  },
  {
    id: "d-cafe-teatre-15",
    merchant: cafeTeatre,
    title: "15% en programació musical",
    description:
      "Descompte a la programació de jazz, folk i cantautor del Cafè del Teatre.",
    discountType: "percentage",
    discountValue: 15,
    isUdlOnly: true,
    totalRedeemed: 18,
  },
  {
    id: "d-screenbox-2x1",
    merchant: screenbox,
    title: "2x1 sessió matinal",
    description: "Vine amb un amic i una entrada paga per les dues.",
    conditions: "Només sessions abans de les 16:00.",
    discountType: "bogo",
    discountValue: 50,
    isUdlOnly: true,
    totalRedeemed: 56,
  },
];
