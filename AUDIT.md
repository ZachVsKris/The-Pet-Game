# The Pet Game — Audit Notes

## Fixed in v2.1

- Correct answers are randomized between the left and right cards at the start of every game.
- Replay creates a fresh left/right arrangement.
- Choice cards lock after the player answers, preventing accidental double submissions.
- Added a guard against tied question values.
- Confirmed 30 unique questions: 10 names, 10 breeds, and 10 companion-pet ownership questions.
- Confirmed every question has two numeric values, a source URL, and no ties.
- Replaced the obsolete `next lint` script with a TypeScript `typecheck` script.
- Improved accessibility with disabled answer states, pressed states, progress labels, and live score/reveal announcements.

## Environment note

The source and question-bank validation passed. This execution environment could not download npm packages, so `next build` could not be executed here. Vercel will install the pinned dependencies during deployment.
