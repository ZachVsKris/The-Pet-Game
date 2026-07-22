"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { questions as questionBank } from "@/data/questions";
import type { Choice, Question, RoundId } from "@/lib/types";

const roundOrder: RoundId[] = ["names", "breeds", "ownership"];
const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 } as const;
const roundIcons: Record<RoundId, string> = { names: "🐶", breeds: "🐕", ownership: "🐰" };
const REVEAL_MS = 2400;

type GameMode = "daily" | "seed" | "random";

function winner(question: Question): "left" | "right" {
  if (question.left.value === question.right.value) throw new Error(`Question ${question.id} has tied values.`);
  return question.metric === "rank"
    ? question.left.value < question.right.value ? "left" : "right"
    : question.left.value > question.right.value ? "left" : "right";
}

function valueLabel(question: Question, choice: Choice) {
  return question.metric === "rank" ? `#${choice.value} most popular` : `${choice.value}% of households`;
}

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: string) {
  let state = hashSeed(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createGame(seed: string): Question[] {
  const random = seededRandom(seed);
  return roundOrder.flatMap((round) => {
    const roundQuestions = questionBank.filter((question) => question.round === round);
    return (["Easy", "Medium", "Hard"] as const).flatMap((difficulty) =>
      shuffle(roundQuestions.filter((question) => question.difficulty === difficulty), random)
        .map((question) => random() < 0.5 ? question : { ...question, left: question.right, right: question.left })
    );
  });
}

function dailyKey() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function makeSeed() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  const bytes = new Uint32Array(6);
  crypto.getRandomValues(bytes);
  for (const value of bytes) result += alphabet[value % alphabet.length];
  return result;
}

export default function PetGame() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<GameMode>("random");
  const [gameSeed, setGameSeed] = useState("PETGAME");
  const [seedInput, setSeedInput] = useState("");
  const [gameQuestions, setGameQuestions] = useState<Question[]>(() => createGame("PETGAME"));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<"left" | "right" | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedSeed = params.get("seed")?.trim().toUpperCase();
    const sharedMode = params.get("mode");
    const sharedDate = params.get("date");
    if (sharedMode === "daily") {
      startGame("daily", sharedDate || dailyKey(), false);
    } else if (sharedSeed) {
      startGame("seed", sharedSeed, false);
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
    // Run only once to load a shared challenge URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const question = gameQuestions[index];
  const correctSide = question ? winner(question) : "left";
  const currentRoundNumber = question ? roundOrder.indexOf(question.round) + 1 : 3;
  const roundQuestions = question ? gameQuestions.filter((item) => item.round === question.round) : [];
  const roundQuestionNumber = question ? roundQuestions.findIndex((item) => item.id === question.id) + 1 : 10;
  const score = Object.values(answers).filter(Boolean).length;

  const breakdown = useMemo(() => roundOrder.map((round) => {
    const ids = gameQuestions.filter((item) => item.round === round).map((item) => item.id);
    return { round, score: ids.filter((id) => answers[id]).length };
  }), [answers, gameQuestions]);

  function startGame(nextMode: GameMode, requestedSeed?: string, updateUrl = true) {
    const seed = requestedSeed || (nextMode === "daily" ? dailyKey() : makeSeed());
    const normalizedSeed = seed.trim().toUpperCase();
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setMode(nextMode);
    setGameSeed(normalizedSeed);
    setGameQuestions(createGame(normalizedSeed));
    setIndex(0);
    setSelected(null);
    setAnswers({});
    setFinished(false);
    setStarted(true);
    setCopied(false);

    if (updateUrl) {
      const url = nextMode === "daily"
        ? `?mode=daily&date=${encodeURIComponent(normalizedSeed)}`
        : `?seed=${encodeURIComponent(normalizedSeed)}`;
      window.history.replaceState({}, "", url);
    }
  }

  const choose = (side: "left" | "right") => {
    if (selected || !question) return;
    setSelected(side);
    setAnswers((previous) => ({ ...previous, [question.id]: side === correctSide }));
    const answeredIndex = index;
    timerRef.current = window.setTimeout(() => {
      if (answeredIndex === gameQuestions.length - 1) setFinished(true);
      else setIndex(answeredIndex + 1);
      setSelected(null);
    }, REVEAL_MS);
  };

  async function copyChallenge() {
    const base = `${window.location.origin}${window.location.pathname}`;
    const url = mode === "daily"
      ? `${base}?mode=daily&date=${encodeURIComponent(gameSeed)}`
      : `${base}?seed=${encodeURIComponent(gameSeed)}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (!started) {
    return (
      <main className="shell home-shell">
        <section className="hero-card">
          <div className="pet-orbit" aria-hidden="true"><span>🐶</span><span>🐱</span><span>🐰</span><span>🦜</span></div>
          <p className="kicker">REAL DATA. SURPRISING ANSWERS.</p>
          <h1>The Pet Game</h1>
          <p className="hero-copy">How well do you really know companion pets?</p>
          <div className="stats-row">
            <div><strong>30</strong><span>Questions</span></div>
            <div><strong>3</strong><span>Rounds</span></div>
            <div><strong>100%</strong><span>Companion pets</span></div>
          </div>
          <div className="mode-actions">
            <button className="primary-button" onClick={() => startGame("daily")}>Play today&apos;s game <span>→</span></button>
            <button className="secondary-button" onClick={() => startGame("random")}>New random game</button>
          </div>
          <div className="seed-box">
            <label htmlFor="seed">Challenge seed</label>
            <div>
              <input id="seed" value={seedInput} maxLength={12} placeholder="e.g. PAWS42" onChange={(event) => setSeedInput(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))} />
              <button disabled={!seedInput} onClick={() => startGame("seed", seedInput)}>Play seed</button>
            </div>
          </div>
          <p className="source-note">The daily game is identical for everyone. Seeds let friends play the exact same challenge.</p>
        </section>
      </main>
    );
  }

  if (finished) {
    const title = score >= 27 ? "Pet Genius" : score >= 23 ? "Pet Expert" : score >= 18 ? "Pet Lover" : score >= 12 ? "Curious Companion" : "Needs More Belly Rubs";
    return (
      <main className="shell result-shell">
        <section className="result-card">
          <div className="result-mascot"><span>🐾</span>🏆</div>
          <p className="kicker">{mode === "daily" ? `DAILY · ${gameSeed}` : `SEED · ${gameSeed}`}</p>
          <h1>{score} <span>/ 30</span></h1>
          <h2>{title}</h2>
          <div className="breakdown">
            {breakdown.map((item) => (
              <div key={item.round}>
                <span>{roundIcons[item.round]} {item.round === "names" ? "Dog Names" : item.round === "breeds" ? "Breeds" : "Companion Pets"}</span>
                <strong>{item.score} / 10</strong>
              </div>
            ))}
          </div>
          <div className="result-actions">
            <button className="primary-button" onClick={copyChallenge}>{copied ? "Link copied!" : "Challenge a friend"}</button>
            <button className="secondary-button" onClick={() => startGame("random")}>New game</button>
          </div>
        </section>
      </main>
    );
  }

  const answeredCorrectly = selected === correctSide;
  return (
    <main className="shell game-shell">
      <header className="topbar">
        <div>
          <div className="brand"><span className="brand-mark">🐾</span>The Pet Game</div>
          <div className="game-code">{mode === "daily" ? `Daily · ${gameSeed}` : `Seed · ${gameSeed}`}</div>
        </div>
        <div className="score-pill" aria-live="polite">{score} correct</div>
      </header>

      <section className="progress-wrap" aria-label={`Question ${index + 1} of ${gameQuestions.length}`}>
        <div className="progress-meta">
          <span>Round {currentRoundNumber} of 3 · {question.roundTitle}</span>
          <span>{roundQuestionNumber} / 10</span>
        </div>
        <div className="progress-track"><div style={{ width: `${((index + 1) / gameQuestions.length) * 100}%` }} /></div>
      </section>

      <section className={`question-card round-${question.round}`}>
        <div className="question-heading">
          <div className="question-context"><span className="round-badge">{roundIcons[question.round]}</span><span className="eyebrow">{question.eyebrow}</span></div>
          <span className={`difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span>
        </div>
        <h2>{question.prompt}</h2>

        <div className="choice-grid">
          {(["left", "right"] as const).map((side) => {
            const choice = question[side];
            const isWinner = side === correctSide;
            const state = selected ? isWinner ? "correct" : selected === side ? "wrong" : "dim" : "";
            return (
              <button key={side} type="button" className={`choice-card ${state}`} onClick={() => choose(side)} disabled={selected !== null} aria-pressed={selected === side}>
                <span className="choice-letter">{side === "left" ? "A" : "B"}</span><div className={`art ${choice.kind}`}><span>{choice.image}</span></div>
                <div className="choice-copy">
                  <strong>{choice.label}</strong>{choice.detail && <small>{choice.detail}</small>}
                  {selected && <span className="value">{valueLabel(question, choice)}</span>}
                </div>
                {selected && isWinner && <span className="check">✓</span>}
              </button>
            );
          })}
          <div className="versus" aria-hidden="true">VS</div>
        </div>

        {!selected ? (
          <p className="tap-note"><span>Tap a card</span> to choose the option you think is more popular</p>
        ) : (
          <div className={`reveal ${answeredCorrectly ? "reveal-correct" : "reveal-wrong"}`} aria-live="polite">
            <div className="reveal-title"><span>{answeredCorrectly ? "✓" : "✕"}</span>{answeredCorrectly ? "Correct" : "Not quite"}</div>
            <p>{question.fact}</p>
            <div className="source-row">
              <div><span>Source</span><strong>{question.sourceName} · {question.sourceYear}</strong><small>{question.scope}</small></div>
              <a href={question.sourceUrl} target="_blank" rel="noreferrer">Source ↗</a>
            </div>
            <div className="auto-next"><span style={{ animationDuration: `${REVEAL_MS}ms` }} />Next question…</div>
          </div>
        )}
      </section>
    </main>
  );
}
