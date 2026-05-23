# UDL-Pulse · Prototip navegable per al CEUdL

> Codename intern del prototip. **NO és el nom de marca definitiu** —
> la decisió de branding s'ajorna fins després de validar amb el CEUdL.
> Quan toqui, find-replace global en aquest repo.

## Context

**Promotor**: Eric Gil — Estudiant Grau Enginyeria Informàtica, EPS UdL.
**Objectiu del prototip**: Eina de demostració jugable que el CEUdL
pugui obrir des del mòbil i veure en 2 minuts què és el producte.
**No és**: el producte real. No té backend, ni pagaments reals, ni
verificació real. És UI funcional amb dades mock realistes de Lleida.
**Hito**: presentar a la reunió amb Josep Balcells + Carlos Sánchez
(CEUdL) després d'enviar el correu del dimarts 26 maig.

## Decisions arquitectòniques (ULTRATHINK)

### 1. Stack mínim — zero infraestructura extra

- **Next.js 15** App Router + TypeScript. Tot client/server amb un
  sol framework, deploy trivial a Vercel.
- **Tailwind CSS** + design tokens propis. Sense UI kit pesat de
  moment; quan calgui complexitat, afegim shadcn/ui (CLI ja preparat).
- **No backend, no DB**: dades estàtiques en `lib/data/*.ts` exportades
  com a constants tipades. Quan validem, migrarem a Supabase.
- **No auth real**: el botó "Verifica UdL" navega a `/home` directament.
  L'usuari mock és Eric Gil i les dades del perfil són hard-coded.
- **No pagaments**: el checkout mostra una animació i salta a "Entrada
  confirmada" amb un QR placeholder. Pas a Stripe Connect Express
  només quan tinguem promotor real onboardat.

### 2. Restriccions de disseny

- **Mobile-first absolut**. Container principal limitat a 430px (iPhone
  16 Pro Max width). En desktop, la "app" es renderitza centrada amb
  fons fosc al voltant per simular un device frame.
- **Tema fosc per defecte** (estètica Gen Z, energia nocturna,
  contrasta amb apps institucionals UdL que son llum-tradicional).
- **Tipografia**: Inter (Google Fonts) per UI, Geist Mono per dades
  numèriques. Tots dos optimitzats per `next/font`.
- **Paleta de marca temporal**:
  - Background: `#0A0A0F` (gairebé negre amb tint blau)
  - Surface: `#16161D`
  - Primary (acció): `#FF4D6D` (vermell càlid, contrast alt) →
    representa el "puls" del campus
  - Accent: `#FFD23F` (groc UdL adaptat) → CTA secundari
  - Text primary: `#F5F5F7`, secondary: `#9CA3AF`
- **Borders**: rounded-2xl per a cards, rounded-full per a tabs/avatars.
- **Animacions**: subtle, mai gratuïtes. Loading states sempre.

### 3. Estructura del repo

```
udl-pulse/
├── PLANNING.md                  # aquest fitxer
├── README.md
├── app/
│   ├── layout.tsx               # root layout amb fonts + metadata
│   ├── globals.css              # design tokens
│   ├── page.tsx                 # splash / landing
│   ├── (app)/                   # grup d'app post-verificació
│   │   ├── layout.tsx           # bottom tab nav
│   │   ├── home/page.tsx        # feed esdeveniments
│   │   ├── event/[id]/page.tsx  # detall esdeveniment
│   │   ├── checkout/page.tsx    # checkout mock
│   │   ├── discounts/page.tsx   # mapa descomptes
│   │   ├── tickets/page.tsx     # meves entrades
│   │   └── profile/page.tsx     # perfil
│   └── (admin)/                 # vistes panel mock
│       ├── ceudl/page.tsx       # panel CEUdL
│       └── organizer/page.tsx   # panel organitzador
├── components/
│   ├── ui/                      # primitives (Button, Card, Sheet)
│   ├── event/                   # EventCard, EventBadge, etc.
│   ├── nav/                     # BottomTabBar, TopHeader
│   └── shell/                   # MobileFrame (centra app en desktop)
├── lib/
│   ├── data/
│   │   ├── events.ts            # TETEO, Biloba, PromoFARRA, etc.
│   │   ├── discounts.ts         # Caselles, Funatic, Synergym...
│   │   ├── profile.ts           # mock user Eric Gil
│   │   └── ceudl-stats.ts       # mock analítica panel CEUdL
│   ├── utils.ts                 # cn(), formatters
│   └── types.ts                 # Event, Discount, Profile, etc.
└── public/
    └── (imatges Unsplash descarregades + logos)
```

### 4. Roadmap d'execució (chunks de 1-2 hores)

| Bloc | Pantalles | Quan | Output |
|---|---|---|---|
| **B1 — Setup visual** | Landing + design tokens + layout shell | Avui (dia 0) | Vercel deploy inicial OK |
| **B2 — Core estudiant** | Home (feed), Event detail, Checkout mock | Dia 1 | Flow comprar entrada navegable |
| **B3 — Engagement** | Discounts map, Tickets, Profile | Dia 2 | Flow complet usuari final |
| **B4 — Panels admin** | CEUdL panel + Organizer panel | Dia 3 | Demo per a Josep/Carlos amb la seva vista |
| **B5 — Polish** | Loading states, transitions, copy review | Dia 4 | Llest per ensenyar |

### 5. Continguts reals que utilitzarem (no Lorem Ipsum)

**Esdeveniments mock** (extrets del nostre research):

- TETEO Saturday Night @ Cal Teo · dissabte 30 maig · 23:45 · 12€
- Biloba Sessions: Carnaval Edition · 6 juny · 22:00 · 18€
- Manolita — Concert directe · 5 juny · 23:00 · 15€
- LaNuit Discothèque opening · dissabte 6 juny · 0:00 · 14€
- Lemon Lleida — Reggaeton Night · 7 juny · 23:00 · 10€
- PromoFARRA — Festa final curs · 12 juny · 22:00 · 8€
- Cafè del Teatre — Jazz session · 14 juny · 21:00 · 7€
- Welcome Week UdL 2026-27 · 15 setembre · campus Cappont · gratis
- Festa Major UdL 2027 (countdown) · abril 2027 · 30€

**Descomptes mock** (zona Cappont + centre Lleida):

- Llibreria Caselles · 10% en llibres acadèmics (c/ Major 46)
- La Irreductible · 5% en literatura (c/ Jaume II 7)
- Espai Funatic · entrada 3€ tots els dimecres (c/ Pi i Margall 26)
- Synergym Cappont · 15% en quota mensual (Av. Prat de la Riba 82)
- M&L GYM Cappont · 10% en bonus 10 sessions (Pere de Cabrera 18)
- Screenbox Lleida · 2x1 sessió matinal
- Cafè del Teatre · 15% entrades programació musical

**Perfil mock**:

- Eric Gil
- Estudiant — Grau Enginyeria Informàtica
- Escola Politècnica Superior · UdL
- Avatar: inicial sobre fons gradient (sense necessitat de foto real)

### 6. Decisions explícitament aplaçades

- **Branding definitiu**: després de validar concepte amb CEUdL.
- **Dominio i email pro**: cuan tinguem confirmació interés del CEUdL
  + 1 promotor compromès. Mentre, `eric.gil.digital@gmail.com`.
- **Backend i auth real**: només quan signem pilot amb el primer
  promotor. Aleshores Supabase + magic link `@alumnes.udl.cat`.
- **Pagaments**: només quan tinguem pilot. Stripe Connect Express.
- **App nativa (RN+Expo)**: només si la PWA dona tracció > 1.500 MAU.

### 7. Èxit del prototip (criteri de "ready")

El prototip està **READY** quan:

1. Es pot obrir en mòbil i en 30s un visitant entén què és el producte.
2. Es pot completar el flow: landing → home → triar event → checkout → confirmació.
3. El panel CEUdL ensenya 3-4 gràfics realistes amb dades fake creïbles.
4. Cap pantalla té errors visuals ni "Lorem Ipsum".
5. Funciona en Safari iOS i Chrome Android sense glitches.
6. URL pública en Vercel accessible des d'un link curt.
