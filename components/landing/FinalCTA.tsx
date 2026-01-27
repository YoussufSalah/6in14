"use client";

import React from "react";
import { Button } from "@/components/universal/Button";

export const FinalCTA = () => {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-bg-primary px-4 py-32">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-20"
          style={{ 
            background: 'radial-gradient(circle, var(--app-1-accent) 0%, var(--app-3-accent) 50%, transparent 100%)' 
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[700px] text-center">
        <h2 className="mb-6 font-display text-4xl font-black md:text-6xl">
          Stop planning.<br />
          Start shipping.
        </h2>
        
        <p className="mb-12 text-xl text-text-secondary">
          6 apps. 1 platform. 0 excuses left.
        </p>

        <div className="flex flex-col items-center justify-center">
          <Button 
            size="large" 
            className="group relative h-16 min-w-[300px] overflow-hidden rounded-xl border-none bg-gradient-to-r from-app-1 via-app-3 to-app-6 p-0 text-xl font-bold transition-all duration-300 hover:scale-[1.05] md:min-w-[400px]"
            onClick={() => window.location.href = '/signup'}
          >
            <span className="relative z-10 flex h-full w-full items-center justify-center bg-transparent px-8">
              Get Started Free →
            </span>
            <div className="absolute inset-0 z-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Pulsing Glow Effect */}
            <div className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-r from-app-1 via-app-3 to-app-6 blur-lg" />
          </Button>
        </div>

        <p className="mt-8 text-sm text-text-tertiary">
          No credit card required. Cancel anytime. Built by a builder, for builders.
        </p>
      </div>
    </section>
  );
};
