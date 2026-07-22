# The Pet Game v2.1

A production-structured Next.js prototype with 30 questions across three rounds:

1. **Dog Names** — 10 AKC name-ranking questions
2. **Breeds** — 10 AKC dog and CFA cat breed questions
3. **Companion Pets** — 10 pet-vs-pet and country-vs-country ownership questions

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Upload this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Vercel will detect Next.js automatically.
4. Deploy. No environment variables are required for this prototype.

## Architecture

- `data/questions.ts` contains the question bank and source metadata.
- `components/PetGame.tsx` contains the reusable game engine.
- The interface does not hardcode round-specific logic beyond display labels.
- Supabase can later replace the local question array without redesigning the UI.

## Scope policy

The ownership round uses **companion animals only**. Agricultural livestock is excluded. Horses are included only when a pet-ownership survey explicitly treats them as companion animals.

## Data note

The prototype is structured around published source material. Before a public commercial release, revalidate every figure against the linked source, confirm survey category definitions, and review redistribution/licensing terms. The cross-country sample comparisons are especially important to recheck because survey years and category definitions vary.


## Audit

See `AUDIT.md` for the fixes and validation completed in this version.
