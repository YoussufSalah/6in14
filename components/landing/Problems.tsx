"use client";

import React from "react";
import { Card } from "@/components/universal/Card";

const problems = [
  {
    emoji: "❌",
    title: "Analysis Paralysis",
    description: "Every morning: 'What should I work on?' You waste 30 minutes deciding. That's 182 hours per year lost.",
  },
  {
    emoji: "❌",
    title: "Broken Momentum",
    description: "Streaks break. Momentum dies. No visible accountability = weak discipline. You know this.",
  },
  {
    emoji: "❌",
    title: "Invisible Plans",
    description: "Weekly plans stay in your head. Mental plans decay by Tuesday. By Friday, you forgot what mattered.",
  },
  {
    emoji: "❌",
    title: "Silent Burnout",
    description: "You grind without measuring recovery. Then crash. Then restart. An endless, exhausting cycle.",
  },
  {
    emoji: "❌",
    title: "Leaky Execution",
    description: "Small tasks slip through. Legal pages, emails, updates. Not urgent = never done = costly mistakes.",
  },
  {
    emoji: "❌",
    title: "Zero Proof",
    description: "Grinding without data. You work hard but don't see the growth. Motivation leaks without visual evidence.",
  },
];

export const Problems = () => {
  return (
    <section className="bg-bg-secondary px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            You&apos;re grinding.<br />
            <span className="text-app-1">But are you winning?</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="group flex h-full flex-col bg-bg-tertiary transition-all duration-300 hover:-translate-y-1 hover:border-error/30"
            >
              <div className="mb-4 text-3xl">{problem.emoji}</div>
              <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">
                {problem.title}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary">
                {problem.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="inline-flex items-center gap-2 font-mono text-xl text-app-1">
            <span className="animate-bounce">→</span>
            These aren&apos;t minor issues. They&apos;re execution killers.
          </p>
        </div>
      </div>
    </section>
  );
};
