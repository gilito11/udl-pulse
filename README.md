# UDL-Pulse

> **Codename intern**. La marca definitiva es decidirà després de
> validar la idea amb el CEUdL.

Plataforma única per a la comunitat universitària de Lleida:
entrades a esdeveniments, descomptes hyperlocals i agenda del campus,
amb verificació via email `@alumnes.udl.cat`.

## Estat actual

Prototip navegable en construcció per a presentar al Consell de
l'Estudiantat de la UdL (CEUdL). Sense backend real encara — UI
funcional amb dades mock realistes de Lleida (TETEO, Cal Teo, Biloba,
Caselles, Funatic, etc.).

## Documents clau

- [`PLANNING.md`](./PLANNING.md) — pla d'execució del prototip
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — decisions tècniques per al
  producte real (stack, BD, escala, riscos)

## Stack

- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS v4
- Vercel (hosting)
- (futur) Supabase + Drizzle + Stripe Connect

## Desenvolupament local

```bash
npm install
npm run dev
```

Obrir [http://localhost:3000](http://localhost:3000).

## Autor

Eric Gil — Estudiant Grau Enginyeria Informàtica · EPS UdL
