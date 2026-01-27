"use client";

import React from "react";

const stats = [
  {
    number: "6",
    label: "Micro-apps",
    sublabel: "One platform",
  },
  {
    number: "14",
    label: "Days to build",
    sublabel: "Zero shortcuts",
  },
  {
    number: "1",
    label: "Login",
    sublabel: "Access everything",
  },
  {
    number: "0",
    label: "Bullshit",
    sublabel: "Just execution",
  },
];

export const Stats = () => {
  return (
    <section className="bg-bg-primary px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-2 font-display text-6xl font-black md:text-7xl">
                <span className="bg-gradient-to-br from-white to-app-1 bg-clip-text text-transparent">
                  {stat.number}
                </span>
              </div>
              <div className="text-xl font-semibold text-text-primary">
                {stat.label}
              </div>
              <div className="mt-1 text-sm text-text-tertiary">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 mx-auto max-w-[700px] border-l-4 border-app-1 pl-8">
          <p className="font-body text-xl italic leading-relaxed text-text-secondary">
            &quot;I built this because I was tired of productivity apps that feel like work.
            These 6 apps do one thing each. Perfectly. No bloat. No friction.
            Just tools that make you move faster.&quot;
          </p>
          <p className="mt-6 font-mono text-base text-app-1 uppercase">
            — Youssuf, Builder
          </p>
        </div>
      </div>
    </section>
  );
};
