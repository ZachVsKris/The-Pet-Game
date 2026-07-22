"use client";

import { useMemo, useState } from "react";
import { questions as questionBank } from "@/data/questions";
import type { Choice, Question, RoundId } from "@/lib/types";

const roundOrder: RoundId[] = ["names", "breeds", "ownership"];
const roundIcons: Record<RoundId, string> = { names: "🐶", breeds: "🐕", ownership: "🐰" };

function winner(question: Question): "left" | "right" {
  if (question.left.value === question.right.value) {
    throw new Error(`Question ${question.id} has tied values.`);
  }
  return question.metric === "rank"
    ? question.left.value < question.right.value ? "left" : "right"
    : question.left.value > question.right.value ? "left" : "right";
}

function valueLabel(question: Question, choice: Choice) {
  return question.metric === "rank" ? `Rank #${choice.value}` : `${choice.value}% of households`;
}

function createGame(): Question[] {
  return questionBank.map((question) => {
    if (Math.random() >= 0.5) return question;
    return { ...question, left: question.right, right: question.left };
  });
}

export default function PetGame() {
  const [started, setStarted] = useState(false);
  const [gameQuestions, setGameQuestions] = useState<Question[]>(() => createGame());
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<"left" | "right" | null>(null);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);

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

  const choose = (side: "left" | "right") => {
    if (selected || !question) return;
    setSelected(side);
    setAnswers((previous) => ({ ...previous, [question.id]: side === correctSide }));
  };

  const next = () => {
    if (index === gameQuestions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
    setSelected(null);
  };

  const restart = () => {
    setGameQuestions(createGame());
    setIndex(0);
    setSelected(null);
    setAnswers({});
    setFinished(false);
    setStarted(true);
  };

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
          <button className="primary-button" onClick={() => setStarted(true)}>Play the game <span>→</span></button>
          <p className="source-note">Dog names, breeds, and pet ownership from published sources</p>
        </section>
      </main>
    );
  }

  if (finished) {
    const title = score >= 27 ? "Pet Genius" : score >= 23 ? "Pet Expert" : score >= 18 ? "Pet Lover" : score >= 12 ? "Curious Companion" : "Needs More Belly Rubs";
    return (
      <main className="shell result-shell">
        <section className="result-card">
          <div className="result-mascot">🏆</div>
          <p className="kicker">THE PET GAME</p>
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
          <button className="primary-button" onClick={restart}>Play again <span>↻</span></button>
        </section>
      </main>
    );
  }

  const answeredCorrectly = selected === correctSide;
  return (
    <main className="shell game-shell">
      <header className="topbar">
        <div className="brand">The Pet Game</div>
        <div className="score-pill" aria-live="polite">{score} correct</div>
      </header>

      <section className="progress-wrap" aria-label={`Question ${index + 1} of ${gameQuestions.length}`}>
        <div className="progress-meta">
          <span>Round {currentRoundNumber} of 3 · {question.roundTitle}</span>
          <span>{roundQuestionNumber} / 10</span>
        </div>
        <div className="progress-track"><div style={{ width: `${((index + 1) / gameQuestions.length) * 100}%` }} /></div>
      </section>

      <section className="question-card">
        <div className="question-heading">
          <span className="eyebrow">{question.eyebrow}</span>
          <span className={`difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span>
        </div>
        <h2>{question.prompt}</h2>

        <div className="choice-grid">
          {(["left", "right"] as const).map((side) => {
            const choice = question[side];
            const isWinner = side === correctSide;
            const state = selected ? isWinner ? "correct" : selected === side ? "wrong" : "dim" : "";
            return (
              <button
                key={side}
                type="button"
                className={`choice-card ${state}`}
                onClick={() => choose(side)}
                disabled={selected !== null}
                aria-pressed={selected === side}
              >
                <div className={`art ${choice.kind}`}><span>{choice.image}</span></div>
                <div className="choice-copy">
                  <strong>{choice.label}</strong>
                  {selected && <span className="value">{valueLabel(question, choice)}</span>}
                </div>
                {selected && isWinner && <span className="check">✓</span>}
              </button>
            );
          })}
          <div className="versus" aria-hidden="true">VS</div>
        </div>

        {!selected ? (
          <p className="tap-note">Choose the option you think is more common</p>
        ) : (
          <div className={`reveal ${answeredCorrectly ? "reveal-correct" : "reveal-wrong"}`} aria-live="polite">
            <div className="reveal-title"><span>{answeredCorrectly ? "✓" : "✕"}</span>{answeredCorrectly ? "Correct" : "Not quite"}</div>
            <p>{question.fact}</p>
            <div className="source-row">
              <div><span>Source</span><strong>{question.sourceName} · {question.sourceYear}</strong><small>{question.scope}</small></div>
              <a href={question.sourceUrl} target="_blank" rel="noreferrer">View source ↗</a>
            </div>
            <button className="next-button" onClick={next}>{index === gameQuestions.length - 1 ? "See results" : "Next question"} <span>→</span></button>
          </div>
        )}
      </section>
    </main>
  );
}
