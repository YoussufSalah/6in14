"use client";

import React from "react";
import { NavBar } from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
  appName: string;
  appAccent: string;
}

export const Layout = ({ children, appName, appAccent }: LayoutProps) => {
  return (
    <div 
      className="min-h-screen bg-bg-primary pt-[60px]"
      style={{ "--current-accent": appAccent } as React.CSSProperties}
    >
      <NavBar appName={appName} />
      <main className="mx-auto max-w-[1200px] p-4 sm:p-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-350 ease-decelerate">
          {children}
        </div>
      </main>
    </div>
  );
};
