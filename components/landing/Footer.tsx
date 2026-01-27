"use client";

import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Logo & Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="font-display text-2xl font-bold tracking-tighter text-text-primary">
              6-IN-14
            </div>
            <p className="mt-4 text-center text-sm text-text-tertiary md:text-left">
              Built in 14 days. Ships forever.<br />
              Relentless execution for builders.
            </p>
            
            {/* Social Links Placeholder */}
            <div className="mt-8 flex gap-6">
              <span className="cursor-pointer text-text-secondary transition-colors hover:text-app-1"><a href="https://x.com/youssuf_salah_/status/2016094748872736956?s=20" target="_blank">X/Twitter</a></span>
              <span className="cursor-pointer text-text-secondary transition-colors hover:text-app-1"><a href="https://github.com/YoussufSalah/6in14" target="_blank">GitHub</a></span>
            </div>
            
            <p className="mt-12 text-xs text-text-tertiary">
              © 2026 6-in-14. All rights reserved.
            </p>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-6 font-mono text-xs font-semibold tracking-widest text-text-tertiary uppercase">
              Platform
            </h4>
            <div className="flex flex-col items-center gap-4 md:items-start">
              {["All Apps", "How It Works", "Design System"].map((link) => (
                <span key={link} className="cursor-pointer text-sm text-text-secondary transition-colors hover:text-text-primary hover:underline">
                  {link}
                </span>
              ))}
            </div>
          </div>

          {/* Account Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-6 font-mono text-xs font-semibold tracking-widest text-text-tertiary uppercase">
              Account
            </h4>
            <div className="flex flex-col items-center gap-4 md:items-start">
              {["Sign Up", "Log In", "Support"].map((link) => (
                <span key={link} className="cursor-pointer text-sm text-text-secondary transition-colors hover:text-text-primary hover:underline">
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
