"use client";

import React from "react";

const steps = [
  {
    step: "01",
    title: "Sign up. Once.",
    description: "Email + password. 30 seconds. Access all 6 apps instantly.",
    color: "var(--app-1-accent)",
  },
  {
    step: "02",
    title: "Pick your weapon.",
    description: "Start with Decision Fatigue. Or jump straight to Weekly War Map. Your call.",
    color: "var(--app-3-accent)",
  },
  {
    step: "03",
    title: "Execute daily.",
    description: "No setup. No learning curve. Just open and use. Every day.",
    color: "var(--app-4-accent)",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-bg-secondary px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            3 steps. That&apos;s it.
          </h2>
        </div>

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="absolute top-[4.5rem] left-0 hidden h-0.5 w-full border-t-2 border-dashed border-border-strong md:block" />
          
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-1 flex-col items-center text-center">
                <div 
                  className="mb-4 font-mono text-xs tracking-[0.2em] uppercase"
                  style={{ color: step.color }}
                >
                  STEP: {step.step}
                </div>
                
                {/* Step Circle/Marker */}
                <div 
                  className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-bg-tertiary bg-bg-secondary text-2xl font-black shadow-lg"
                  style={{ border: `2px solid ${step.color}` }}
                >
                  {index + 1}
                </div>

                <h3 className="mb-3 font-display text-2xl font-bold text-text-primary">
                  {step.title}
                </h3>
                <p className="max-w-[280px] text-base leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="font-mono text-lg text-app-1">
            → Built for speed. Designed for grinders.
          </p>
        </div>
      </div>
    </section>
  );
};
