"use client";

import React from "react";
import { Button } from "@/components/universal/Button";

const FloatingIcon = ({ emoji, className }: { emoji: string; className: string }) => (
  <div className={`absolute pointer-events-none opacity-10 animate-pulse-slow text-4xl ${className}`}>
    {emoji}
  </div>
);

export const Hero = () => {
  return (
    <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-bg-primary px-4 py-20">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10 animate-pulse-slow"
          style={{ backgroundColor: 'var(--app-1-accent)' }}
        />
        <div 
          className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] rounded-full blur-[120px] opacity-10 animate-pulse-slow"
          style={{ backgroundColor: 'var(--app-2-accent)', animationDelay: '2s' }}
        />
        <div 
          className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-10 animate-pulse-slow"
          style={{ backgroundColor: 'var(--app-3-accent)', animationDelay: '4s' }}
        />
      </div>

      {/* Floating Icons */}
      <FloatingIcon emoji="🎯" className="top-1/4 left-1/4" />
      <FloatingIcon emoji="🔥" className="top-1/3 right-1/4" />
      <FloatingIcon emoji="⚔️" className="bottom-1/3 left-1/3" />
      <FloatingIcon emoji="⚡" className="bottom-1/4 right-1/3" />
      <FloatingIcon emoji="🔔" className="top-2/3 right-10" />
      <FloatingIcon emoji="📊" className="top-10 left-1/2" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-[800px] text-center">
        <p className="mb-4 font-mono text-sm tracking-[0.15em] text-app-1 uppercase">
          BUILT IN 14 DAYS. SHIPS TODAY.
        </p>
        
        <h1 className="mb-6 font-display text-3xl font-black leading-[1.1] md:text-6xl">
          Stop planning.<br />
          Start executing.<br />
          <span className="text-secondary text-xl md:text-4xl">6 micro-apps. Zero excuses.</span>
        </h1>

        <p className="mb-10 text-md text-text-secondary md:text-xl md:leading-relaxed">
          Decision paralysis kills more dreams than failure ever will.<br />
          Get your command center for focus, execution, and relentless progress.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="large" className="min-w-[200px]" onClick={() => window.location.href = '/signup'}>
            Start Free →
          </Button>
          <Button variant="secondary" size="large" className="min-w-[200px]" onClick={() => document.getElementById('apps-grid')?.scrollIntoView({ behavior: 'smooth' })}>
            See The Apps
          </Button>
        </div>

        <p className="mt-8 text-sm text-text-tertiary">
          No credit card. No bullshit. Just build.
        </p>
      </div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay">
        <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
          <filter id='noiseFilter'>
            <feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
      </div>
    </section>
  );
};
