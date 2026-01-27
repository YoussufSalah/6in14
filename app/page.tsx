"use client";

import React from "react";
import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { AppsGrid } from "@/components/landing/AppsGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Stats } from "@/components/landing/Stats";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="grain-overlay relative min-h-screen bg-bg-primary">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 z-50 h-1 w-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-app-1 via-app-3 to-app-6" 
          id="scroll-progress-bar"
          style={{ width: '0%' }}
        />
      </div>

      <Hero />
      <Problems />
      <AppsGrid />
      <HowItWorks />
      <Stats />
      <FinalCTA />
      <Footer />

      {/* Script for Scroll Progress */}
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('scroll', () => {
              const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              const bar = document.getElementById("scroll-progress-bar");
              if (bar) bar.style.width = scrolled + "%";
            });
          `
        }}
      />
    </main>
  );
}
