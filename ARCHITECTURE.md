# ARCHITECTURE.md · UDL-Pulse

> Decisiones de arquitectura del producto basadas en investigación
> de la comunidad dev 2026 (Reddit, IndieHackers, dev.to, HN, makerkit).
> Cada decisión incluye **por qué** y **cuándo migrar**.

## 1. Resumen ejecutivo del stack final

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA              │  TECNOLOGÍA                            │
├────────────────────┼────────────────────────────────────────┤
│  Framework         │  Next.js 15 (App Router) + TypeScript  │
│  UI                │  Tailwind CSS + shadcn/ui + Lucide     │
│  Animaciones       │  Framer Motion (selectivo)             │
│  Forms             │  React Hook Form + Zod                 │
│  State server      │  React Server Components + cache       │
│  State client      │  Zustand (mínimo) + TanStack Query     │
│  Auth              │  Supabase Auth (magic link email)      │
│  Database          │  Supabase Postgres                     │
│  ORM               │  Drizzle (edge-ready, serverless)      │
│  Storage media     │  Supabase Storage                      │
│  Real-time         │  Supabase Realtime (aforo en directe)  │
│  Pagos             │  Stripe Connect Express                │
│                    │  (Separate charges & transfers)        │
│  Maps              │  Mapbox GL JS (50k free loads/mes)     │
│  Notif push        │  OneSignal Web Push (10k free)         │
│  Email transac     │  Resend (3k free/mes)                  │
│  Analytics web     │  Vercel Analytics (free)               │
│  Analytics produc  │  PostHog Cloud EU (1M events free)     │
│  Error tracking    │  Sentry (5k events/mes free)           │
│  Search            │  Postgres full-text (suficiente)       │
│                    │  → Typesense si >10k events            │
│  Hosting           │  Vercel (Hobby → Pro cuando escala)    │
│  CI/CD             │  Vercel automatic + GitHub Actions     │
│  Mobile nativa     │  Expo + React Native (SOLO cuando      │
│                    │  PWA supere 1.500 MAU verificados)     │
└────────────────────┴────────────────────────────────────────┘
```

**Cost de runway estimat per al primer any:** 0 €/mes hasta los
primeros ~500 usuarios reales. ~$25/mes al pasar 50k MAU o 8GB DB.

## 2. Por qué cada decisión

### 2.1 ¿Por qué Next.js 15 App Router y no Remix / SvelteKit / Astro?

- Consenso 2026 en la comunidad indie/saas: Next.js domina el
  ecosistema React (~80% de los marketplaces lanzados en 2026 lo
  usan según JourneyH, Wasp, Webscension).
- **App Router + RSC + Server Actions** elimina la necesidad de
  un backend Express/NestJS separado → menos infra, menos costo,
  menos cosas que pueden fallar.
- Deploy nativo a Vercel con preview branches automático: cada PR
  genera URL para enseñar a Josep del CEUdL sin esfuerzo.
- Soporte de `next/image` con AVIF/WebP automático → crítico para
  un catálogo de eventos con fotos pesadas.

### 2.2 ¿Por qué Supabase y no Neon o PlanetScale?

| Criterio | Supabase | Neon | PlanetScale |
|---|---|---|---|
| Postgres puro | ✅ | ✅ | ❌ (MySQL) |
| Free tier 2026 | 500MB + 2 proyectos | 0.5GB + scale-to-zero | ❌ eliminado |
| Auth incluido | ✅ | ❌ | ❌ |
| Storage incluido | ✅ (1GB free) | ❌ | ❌ |
| Realtime incluido | ✅ | ❌ | ❌ |
| Row-Level Security | ✅ nativo | ✅ | ❌ |
| Branching git-like | ⚠️ via CLI | ✅ killer feature | ✅ |
| Edge HTTP driver | ✅ via PostgREST | ✅ | ✅ |
| Always-on $/mes | $25 | $19 (lite) / $69 (always-on) | $39+ |

**Veredicto**: Supabase. Razones específicas:

1. **Una sola cosa que aprender** (en vez de Neon + Clerk + R2 + Pusher).
2. **RLS nativo** = aislamiento de datos per-organizador GRATIS en BD,
   no tenemos que enforcearlo en aplicación.
3. **Realtime** lo necesitamos para "aforo restant en directe" en la
   pantalla de checkout — Pusher costaría aparte.
4. **EU región disponible** (Frankfurt / Dublin) → cumple GDPR sin
   gimnasia.
5. **Migración a Neon es fácil si un día queremos**: sólo es Postgres.

**Cuándo migrar (si)**:
- Si la BD pasa de 50GB → considerar Neon o RDS por coste.
- Si Auth pasa de 100k MAU → evaluar Better-Auth self-hosted en el
  mismo Supabase Postgres (no añade vendor lock-in).

### 2.3 ¿Por qué Drizzle y no Prisma?

Cambio respecto al planning anterior. Razones de la migración a
Drizzle (basado en research 2026):

1. **Bundle size**: Drizzle 7.4 KB gzip vs Prisma engine ~30MB.
   Crítico para cold starts en Vercel Functions.
2. **Edge runtime out-of-the-box**: Drizzle funciona en Vercel Edge
   y Cloudflare Workers sin Prisma Accelerate (paid proxy).
3. **Cold start**: <500ms vs 1-3s con Prisma. Importante para
   webhook handlers de Stripe que tienen timeout estricto.
4. **SQL-like TypeScript**: el equipo entiende mejor `where`
   (eq, and, or) que la sintaxis Prisma. Más cerca del SQL real.
5. **Prisma 7 lo ha igualado mucho** (3x perf vs Prisma 6), pero
   sigue perdiendo en bundle y edge.
6. **Drizzle Studio** = visor DB excelente sin pagar.

**Trade-off aceptado**: Drizzle tiene menos magia (no autogenera
queries n+1), pero como vamos a escribir las queries con cuidado
desde día 1, prefiero esto.

### 2.4 ¿Por qué Supabase Auth y no Clerk / Better-Auth?

Patrón 2026 documentado:
- **Clerk** = arrancar rápido pero $0.02/MAU después de 10k. Mata
  margen. Además **Clerk es US-only en 2026 → problema GDPR para EU**.
- **Better-Auth v1.6** = excelente self-hosted, pero requiere
  Postgres aparte si no usas Supabase. Madurez OK pero falta enterprise SSO.
- **Supabase Auth** = nativo de la BD que ya usamos. 50k MAU gratis,
  $0.00325/MAU después (= $25/mes a 100k usuarios). Integración con
  RLS automática.

**Veredicto**: Supabase Auth desde día 1. La integración con RLS
es lo que nos blinda en GDPR sin esfuerzo: el JWT incluye el
`user_id`, y cada policy de Postgres puede filtrar por él.

**Verificación email institucional UdL**: implementación específica:

```typescript
// Server Action al registrar:
1. Validar dominio: email termina en "@alumnes.udl.cat"
2. Si no → reject con mensaje "Necesitas email UdL"
3. Si sí → Supabase Auth envía magic link al institucional
4. Al verificar → CREATE row en `profiles` con:
     - id = auth.uid()
     - is_verified_student = true
     - faculty (extraída de subdomain o pedida al onboarding)
     - email_hash (sha256 del email, NUNCA email en claro)
5. Después del paso 4, BORRAR el email del registro `auth.users`
   o reemplazarlo por uuid+@anonymous.local
   (esto cumple LOPDGDD: no almacenamos email académico)
```

### 2.5 ¿Por qué Stripe Connect y no Polar / Creem / Paddle?

Investigación 2026 confirma: **Polar, Creem, Paddle son MoR
(Merchant of Record) para SaaS, no marketplaces multi-vendor**.

Stripe Connect sigue siendo el de facto para:
- Onboarding KYC de promotores (Stripe asume riesgo regulatorio).
- Pagar a múltiples cuentas con un solo checkout (split payments).
- Escrow temporal (Separate charges and transfers).
- Soporte Bizum nativo en España (1.5% + 0.25€).

**Alternativas evaluadas y descartadas**:
- **Adyen MarketPay**: enterprise, mínimo €1000/mes facturación.
- **MangoPay**: pricing opaco, platform fee €249/mes hasta volumen.
- **Lemonway**: idem MangoPay, FR-centric.
- **Redsys + Bizum directo**: no soporta marketplaces (sin Connect equivalent).

**Veredicto**: Stripe Connect Express, modo "Stripe controls fees",
flow Separate charges & transfers. Cuando GMV mensual >50k€,
reevaluar MangoPay por su escrow nativo con licencia EMI luxemburguesa.

## 3. Arquitectura de datos

### 3.1 Modelos principales (Drizzle schema)

```typescript
// === USUARIO ===
profiles {
  id: uuid (FK to auth.users)
  display_name: text
  faculty: enum('eps', 'fdet', 'fepts', 'lletres', 'medicina',
                'etsea', 'igualada', 'fif', null)
  graduation_year: integer
  email_hash: text  // sha256(email institucional)
  is_verified_student: boolean
  preferred_locale: enum('ca', 'es', 'en')
  push_token: text nullable
  created_at: timestamptz
  last_seen_at: timestamptz
}

// === ORGANITZADOR (TETEO, Bonöbo, PromoFARRA, ...) ===
organizers {
  id: uuid
  name: text
  slug: text unique
  type: enum('club', 'promoter', 'university_council',
             'merchant', 'cultural')
  logo_url: text
  description: text
  stripe_account_id: text  // acct_xxx de Stripe Connect
  stripe_onboarded: boolean
  default_payout_iban_last4: text  // solo últimos 4 para mostrar
  city: text
  contact_email: text
  contact_phone: text
  created_at: timestamptz
  approved: boolean default false  // admin gate
}

// === ESDEVENIMENT ===
events {
  id: uuid
  organizer_id: uuid (FK)
  title: text
  slug: text unique  // para URLs limpios /event/teteo-saturday-30-may
  description: text
  type: enum('party', 'concert', 'cultural', 'academic',
             'sports', 'social')
  category_tags: text[]  // ['reggaeton', 'latino', 'comercial']
  start_at: timestamptz
  end_at: timestamptz
  venue_name: text
  venue_address: text
  venue_lat: numeric
  venue_lng: numeric
  capacity_total: integer
  capacity_sold: integer default 0
  cover_image_url: text
  gallery_image_urls: text[]
  is_udl_exclusive: boolean default false
  is_published: boolean default false
  created_at: timestamptz
  updated_at: timestamptz
}
// INDEX (start_at, is_published) para listados de "próximos"
// INDEX (organizer_id, start_at desc) para panel organizador

// === TIER DE PRECIO ===
ticket_tiers {
  id: uuid
  event_id: uuid (FK)
  name: text  // "General", "VIP", "Early bird", "Descompte UdL"
  price_cents: integer  // 1500 = 15.00€
  capacity: integer  // capacidad de este tier
  sold: integer default 0
  available_from: timestamptz
  available_until: timestamptz
  is_udl_only: boolean default false  // gate verificación
  display_order: integer
}

// === COMPRA / TICKET ===
tickets {
  id: uuid
  event_id: uuid (FK)
  tier_id: uuid (FK)
  user_id: uuid (FK to profiles)
  quantity: integer
  amount_paid_cents: integer
  application_fee_cents: integer  // nuestro corte
  stripe_payment_intent_id: text
  stripe_charge_id: text nullable
  status: enum('pending', 'confirmed', 'cancelled', 'refunded',
               'used')
  qr_code: text unique  // hash único por ticket
  purchased_at: timestamptz
  used_at: timestamptz nullable  // al validar a la puerta
  refunded_at: timestamptz nullable
}
// INDEX (user_id, status) para "Mis entradas"
// INDEX (event_id, status) para conteo asistentes
// INDEX (qr_code) para validación rápida en la puerta

// === COMERÇ ===
merchants {
  id: uuid
  name: text  // "Llibreria Caselles"
  category: enum('books', 'food', 'gym', 'cinema',
                 'clothing', 'services', 'other')
  address: text
  city: text default 'Lleida'
  postal_code: text
  lat: numeric
  lng: numeric
  logo_url: text
  description: text
  contact_email: text
  is_active: boolean default true
  subscription_tier: enum('free', 'pro') default 'free'
}

// === DESCOMPTE ===
discounts {
  id: uuid
  merchant_id: uuid (FK)
  title: text  // "10% en llibres acadèmics"
  description: text
  discount_type: enum('percentage', 'fixed_amount', 'bogo', 'free')
  discount_value: integer  // 10 (=10%) o 500 (=5€)
  conditions: text  // "Mínim 20€ de compra"
  valid_from: timestamptz
  valid_until: timestamptz
  max_redemptions_per_user: integer nullable
  total_redemptions_limit: integer nullable
  total_redeemed: integer default 0
  is_udl_only: boolean default true
  active: boolean default true
}

// === REDEMPCIÓ DE DESCOMPTE ===
redemptions {
  id: uuid
  discount_id: uuid (FK)
  user_id: uuid (FK)
  merchant_id: uuid (FK)  // duplicado para query rápido
  redeemed_at: timestamptz
  validation_code: text  // QR único single-use
  status: enum('issued', 'used', 'expired')
}
// INDEX (user_id, redeemed_at desc)

// === EVENTOS DE ANALÍTICA (raw) ===
// Estos NO van a Postgres → van a PostHog directamente
// para no inflar la BD con telemetría de uso
```

### 3.2 Decisions de modelado clave

1. **Email institucional NUNCA almacenado en claro** después de
   verificación: solo `email_hash` (sha256) para evitar duplicados.
   Cumple LOPDGDD y AEPD para datos de estudiantes.

2. **Capacity tracking en doble nivel** (`events.capacity_sold` y
   `ticket_tiers.sold`): el primero para mostrar "X plazas restantes"
   en home sin joins; el segundo para enforcement real al comprar.
   Update via trigger SQL para mantenerlos sincronizados.

3. **QR único por ticket** (no por compra): si compras 4 entradas,
   se generan 4 QRs. Permite ceder una entrada a un amigo en el
   futuro sin rehacer toda la infra.

4. **Status enum estricto en tickets**: pending → confirmed →
   used o cancelled o refunded. Diagrama de estados explícito,
   transitions enforced por server actions.

5. **Stripe webhooks endpoint dedicado** (`/api/stripe/webhook`):
   recibe events, valida signature, actualiza status. Idempotent
   con `stripe_event_id` único.

6. **Soft deletes ON** para events, organizers, merchants
   (campo `deleted_at`). Nunca hard-delete por audit trail.

### 3.3 RLS policies (Supabase Row-Level Security)

Cada tabla tiene policy explícita. Ejemplos críticos:

```sql
-- Profiles: solo tú puedes leer/actualizar tu perfil
CREATE POLICY "users can read own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Tickets: solo el comprador ve sus tickets
CREATE POLICY "users can read own tickets"
ON tickets FOR SELECT
USING (auth.uid() = user_id);

-- Events publicados: todo el mundo verificado los ve
CREATE POLICY "verified students see published events"
ON events FOR SELECT
USING (
  is_published = true
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_verified_student = true
  )
);

-- Organizadores: solo ven SUS eventos en panel
CREATE POLICY "organizers manage own events"
ON events FOR ALL
USING (
  organizer_id IN (
    SELECT id FROM organizers
    WHERE owner_user_id = auth.uid()
  )
);
```

### 3.4 Patrones de query esperados (% del tráfico)

| Patrón | % tráfico | Cache? | Tipo |
|---|---|---|---|
| Feed home (próximos eventos UdL) | 40% | ISR 60s | Read heavy |
| Detalle evento | 25% | ISR 60s | Read |
| Listado descomptes Cappont | 10% | ISR 5min | Read |
| Checkout (crear ticket) | 5% | No | Write crítico |
| "Mis entradas" | 8% | Client (TanStack Query) | Read user-specific |
| Panel CEUdL analytics | 1% | Server aggregate cache 1h | Heavy read |
| Panel organitzador venda directe | 3% | Realtime subscription | Read + push |
| Redempció descompte | 3% | No | Write |
| Resto | 5% | Varies | Mixed |

**Decisión derivada**: agressive ISR en lecturas, optimistic
updates en checkout, Supabase Realtime channel para panel
organitzador.

### 3.5 Escalat previst

| Fase | MAU | Events/mes | DB size | Cost mensual |
|---|---|---|---|---|
| MVP (mes 1-3) | 0-500 | 0-20 | <100MB | 0€ (free tier) |
| Validació (mes 4-6) | 500-2k | 20-50 | <1GB | ~25€ Supabase Pro |
| Creixement (mes 7-12) | 2k-10k | 50-150 | <5GB | ~50€ (Pro + Vercel Pro) |
| Maduresa (any 2+) | 10k-50k | 150-500 | <20GB | ~150€ |
| Escala (any 3+) | 50k+ | 500+ | 20GB+ | reevaluar a RDS/Neon enterprise |

## 4. Estructura del repo (capas de aplicación)

```
udl-pulse/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # rutas públicas (landing, faq)
│   ├── (auth)/                   # login, signup, verify
│   ├── (app)/                    # post-login: el "app shell"
│   ├── (admin)/                  # panels CEUdL, organizador
│   ├── api/
│   │   ├── stripe/webhook/       # POST de Stripe → update ticket
│   │   ├── og/                   # OG images dinámicas
│   │   └── trpc/[...]            # IF añadimos tRPC (opcional)
│   └── layout.tsx
│
├── components/                   # UI components
│   ├── ui/                       # shadcn primitives
│   ├── event/                    # EventCard, EventBadge, etc.
│   ├── ticket/
│   ├── discount/
│   ├── nav/
│   └── shell/
│
├── lib/
│   ├── db/                       # Drizzle schema + client
│   │   ├── schema.ts
│   │   ├── client.ts
│   │   └── migrations/
│   ├── auth/                     # Supabase Auth helpers
│   ├── stripe/                   # Stripe Connect helpers
│   ├── analytics/                # PostHog client
│   ├── data/                     # MOCK data (solo prototip)
│   │   ├── events.ts
│   │   ├── discounts.ts
│   │   └── profile.ts
│   └── utils.ts
│
├── server/                       # Server-only logic
│   ├── actions/                  # Server Actions (forms, mutations)
│   ├── queries/                  # Server queries (with caching)
│   └── webhooks/
│
├── drizzle/                      # Drizzle config + migrations
│   ├── config.ts
│   └── migrations/
│
├── public/
│   ├── images/
│   ├── logos/
│   └── manifest.json             # PWA
│
├── PLANNING.md
├── ARCHITECTURE.md               # este fitxer
└── README.md
```

## 5. Fases de desarrollo

### Fase 0 — Prototipo navegable (ACTUAL — 5 días)

**Objetivo**: enseñar al CEUdL antes de la reunión.

- ✅ Setup Next.js + Tailwind + shadcn
- 🚧 Diseño visual + design tokens
- 🚧 Landing pulida
- ⏳ Datos mock realistas Lleida
- ⏳ Pantallas core navegables: Home, EventDetail, Checkout, Profile
- ⏳ Panel mock CEUdL con gráficos fake
- ⏳ Deploy a Vercel con URL pública

### Fase 1 — Backend real (juny-juliol 2026, post-grau)

- Supabase project creado (región EU)
- Drizzle schema + migrations
- Auth con magic link UdL (verificación dominio)
- RLS policies
- Stripe Connect Express setup
- Webhook handler con signature validation
- Migrar mock data a seed real
- Tests críticos (checkout, webhook)

### Fase 2 — Primer pilot real (setembre 2026)

- 1 promotor onboardeado (TETEO ideal)
- 1 evento real vendido por la plataforma
- PWA installable (manifest + service worker)
- Push notifications con OneSignal
- Vercel Analytics + PostHog integrados
- Sentry para error tracking
- Mapa de descomptes con Mapbox
- 5-10 comerços onboardeados gratis

### Fase 3 — Crescuda (oct 2026 - mar 2027)

- App nativa (Expo + React Native) si MAU >1500
- Sistema de notificaciones segmentadas
- Programa de afiliados estudiantil
- Panel CEUdL con exportació Excel
- Integració amb Google Calendar / iCal
- Multi-idioma complet (CA/ES/EN)

### Fase 4 — Escala (abr 2027+)

- Festa Major UdL 2027 com a milestone públic
- Expansió a altres universitats catalanes
- App nativa iOS/Android publicada a stores
- B2B SaaS layer per a salas (panel pro)
- Evaluar MangoPay si GMV mensual >50k€

## 6. Riesgos técnicos identificados (y mitigación)

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Supabase free tier no cubre crecimiento | Medio | Migrar a Pro $25/mes al pasar 50k MAU |
| Stripe Connect rechaza promotor por KYC | Alto | Tener Bizum-directo como fallback Plan B |
| Vercel Functions timeout en webhook Stripe | Alto | Mover handler a Edge Runtime o cola |
| Drizzle aún no tan maduro como Prisma | Bajo | Migrar a Prisma 7 si bloqueo crítico |
| Supabase región US por defecto | Medio | CONFIGURAR región Frankfurt/Dublin DESDE EL INICIO |
| Race condition en aforo (overselling) | Alto | Usar SELECT FOR UPDATE en compra |
| Filtración email institucional | Crítico | NO almacenar en claro; auditoría AEPD |
| Spam de registros con emails fake @alumnes.udl.cat | Bajo | Magic link valida que existe la cuenta real |
| Coste Mapbox supera free tier | Bajo | Caché tile en CDN |

## 7. Lo que NO haremos (decisions explícitamente descartadas)

- ❌ **GraphQL**: REST + Server Actions cubre 100% del caso de uso.
- ❌ **Microservicios**: monolito Next.js + funciones edge donde
  haga falta. Premature optimization.
- ❌ **Kubernetes**: Vercel handles all.
- ❌ **Redis cache propio**: ISR + TanStack Query + Vercel Cache cubren.
- ❌ **Auth0**: descartado por coste y porque Supabase Auth ya
  está pegado a la DB.
- ❌ **Firebase**: ecosistema cerrado de Google, opt-out de PWA push
  iOS, sin Postgres. No es 2018.
- ❌ **MongoDB**: relacional gana fuerte aquí (events ↔ tickets ↔
  users ↔ organizers); NoSQL nos complicaría.
- ❌ **Custom backend Express**: Next.js Server Actions cubre todo.
- ❌ **App nativa de día 1**: PWA primero, app si tracción demuestra.
- ❌ **Anonimato Yik Yak-style**: NO. Identidad verificada siempre.
- ❌ **Crypto / NFT tickets**: NO. Gen Z 2026 ya ha quemado esa moda.

## 8. Referencias consultadas (research 2026)

- JourneyH — Best tech stack to build a marketplace 2026
- Wasp — Best Full-stack Frameworks 2026
- MakerKit — Drizzle vs Prisma 2026
- MakerKit — Better Auth vs Clerk vs Supabase Auth 2026
- DevToolReviews — Supabase vs PlanetScale vs Neon 2026
- HirenodeJS — Drizzle vs Prisma Node.js 2026
- Indie Hackers — Stripe alternatives marketplace threads
- HackerNews — Ask HN: Stripe alternative for marketplace business
- Bytebase — Neon vs Supabase 2026
- Appik Studio — PWA vs Native: why Expo changes everything
- Progressier — PWA vs Native 2026 Comparison Table
- Tech-insider.org — Drizzle vs Prisma 10x Faster Queries 2026

---

**Última actualización**: 23 maig 2026 · Eric Gil
