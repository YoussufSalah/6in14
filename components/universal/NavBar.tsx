"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";

const apps = [
  { name: "Decision Fatigue", path: "/decision-fatigue", icon: "🎯", color: "var(--app-1-accent)" },
  { name: "Streak Commander", path: "/streak-commander", icon: "🔥", color: "var(--app-2-accent)" },
  { name: "Weekly War Map", path: "/weekly-war-map", icon: "⚔️", color: "var(--app-3-accent)" },
  { name: "Energy Monitor", path: "/energy-monitor", icon: "⚡", color: "var(--app-4-accent)" },
  { name: "Silent Reminders", path: "/silent-reminders", icon: "🔔", color: "var(--app-5-accent)" },
  { name: "Progress Radar", path: "/progress-radar", icon: "📊", color: "var(--app-6-accent)" },
];

export const NavBar = ({ appName }: { appName?: string }) => {
  const pathname = usePathname();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center justify-between border-b-2 border-border-subtle bg-bg-secondary/95 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
          className="flex items-center gap-2 rounded-md bg-bg-tertiary px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-border-subtle"
        >
          <Zap className="h-4 w-4 text-app-2" />
          <span className="hidden sm:inline">Apps</span>
        </button>
        <div className="h-6 w-[2px] bg-border-subtle hidden sm:block" />
        <h1 className="font-display text-lg font-bold text-text-primary truncate max-w-[150px] sm:max-w-none">
          {appName || "6-in-14"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-tertiary text-text-secondary transition-colors hover:bg-border-subtle hover:text-text-primary">
          <User className="h-5 w-5" />
        </button>
      </div>

      {/* App Switcher Modal */}
      {isSwitcherOpen && (
        <div className="fixed inset-0 top-[60px] z-50 bg-bg-primary/95 p-4 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Switch App</h2>
              <button 
                onClick={() => setIsSwitcherOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-bg-tertiary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {apps.map((app) => (
                <Link
                  key={app.path}
                  href={app.path}
                  onClick={() => setIsSwitcherOpen(false)}
                  className={cn(
                    "group relative flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all duration-200 hover:-translate-y-1",
                    pathname.startsWith(app.path) 
                      ? "border-current bg-bg-tertiary" 
                      : "border-border-subtle bg-bg-secondary hover:border-strong"
                  )}
                  style={{ color: pathname.startsWith(app.path) ? app.color : undefined }}
                >
                  <span className="mb-3 text-4xl">{app.icon}</span>
                  <span className="font-display text-sm font-bold text-center">{app.name}</span>
                  
                  {/* Subtle Glow on Hover */}
                  <div 
                    className="absolute inset-0 -z-10 opacity-0 blur-xl transition-opacity group-hover:opacity-20"
                    style={{ backgroundColor: app.color }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
