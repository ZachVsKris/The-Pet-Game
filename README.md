# The Pet Game

A responsive, data-driven companion-pet trivia game built with Next.js and TypeScript.

## Game structure

- Round 1: 10 dog-name questions
- Round 2: 10 dog- and cat-breed questions
- Round 3: 10 companion-pet ownership questions
- Every round progresses from Easy to Medium to Hard
- Answers advance automatically after a short reveal

## Modes

- **Daily Challenge:** the same seeded game for everyone using that calendar date
- **Random Game:** creates a new shareable seed
- **Seed Challenge:** enter a friend’s seed to play the identical question order and left/right layout

Shared games use:

- `?mode=daily&date=YYYY-MM-DD`
- `?seed=PAWS42`

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run typecheck
npm run build
```

## Deploy to Vercel

1. Upload the project to GitHub
2. Import the repository into Vercel
3. Vercel should detect Next.js automatically
4. No environment variables are required

See `DATA_SOURCES.md` for source notes and `AUDIT.md` for the current gameplay changes.


## v2.3 interface
The game uses a responsive single-screen layout. On phones, both choices are stacked and visible together, while answer feedback appears briefly as a bottom sheet before automatic advancement.
