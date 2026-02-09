"use client";

import Link from "next/link";
import { Card } from "@/components/universal/Card";

const apps = [
  {
    id: 1,
    icon: "🎯",
    name: "Decision Fatigue",
    tagline: "Tell me my mission for today.",
    description: "One command. One priority. Zero wasted energy deciding what matters most.",
    accent: "var(--app-1-accent)",
    bg: "var(--app-1-bg)",
    href: "/decision-fatigue",
  },
  {
    id: 2,
    icon: "🔥",
    name: "Streak Commander",
    tagline: "Don't let the chain break.",
    description: "Visual accountability. current streaks for work, training, and posting. Red warning when broken.",
    accent: "var(--app-2-accent)",
    bg: "var(--app-2-bg)",
    href: "/streak-commander",
  },
  {
    id: 3,
    icon: "⚔️",
    name: "Weekly War Map",
    tagline: "Commit. Execute. Repeat.",
    description: "3 priorities. 5 tasks each. Locked for 7 days. Mental plans decay. This doesn't.",
    accent: "var(--app-3-accent)",
    bg: "var(--app-3-bg)",
    href: "/weekly-war-map",
  },
  {
    id: 4,
    icon: "⚡",
    name: "Energy Monitor",
    tagline: "Protect the machine.",
    description: "Track sleep, mood, and fatigue. See trends over time. Avoid burnout before it hits.",
    accent: "var(--app-4-accent)",
    bg: "var(--app-4-bg)",
    href: "/energy-monitor",
  },
  {
    id: 5,
    icon: "🔔",
    name: "Silent Reminders",
    tagline: "Nothing slips.",
    description: "One-time reminders. Daily summary. No notification spam. Critical tasks never forgotten.",
    accent: "var(--app-5-accent)",
    bg: "var(--app-5-bg)",
    href: "/silent-reminders",
  },
  {
    id: 6,
    icon: "📊",
    name: "Progress Radar",
    tagline: "Proof you're leveling up.",
    description: "Weekly inputs: users, revenue, posts, training. Auto-graphing visual proof of growth.",
    accent: "var(--app-6-accent)",
    bg: "var(--app-6-bg)",
    href: "/progress-radar",
  },
];

export const AppsGrid = () => {
  return (
    <section id="apps-grid" className="bg-bg-primary px-4 py-24 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-4xl font-bold md:text-5xl">
            Your new operating system.
          </h2>
          <p className="text-xl text-text-secondary">
            6 micro-apps. One login. Total clarity.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <Link key={app.id} href={app.href} className="block group">
              <Card
                className="relative flex h-full flex-col border-2 border-transparent p-10 transition-all duration-300 group-hover:-translate-y-2"
                style={{ 
                  backgroundColor: app.bg,
                  borderColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = app.accent;
                  e.currentTarget.style.boxShadow = `0 16px 48px rgba(0, 0, 0, 0.4)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="mb-4 text-4xl transition-transform duration-300 group-hover:scale-110">
                  {app.icon}
                </div>
                <h3 
                  className="mb-1 font-display text-2xl font-bold"
                  style={{ color: app.accent }}
                >
                  {app.name}
                </h3>
                <p className="mb-4 font-mono text-sm italic text-text-secondary">
                  &quot;{app.tagline}&quot;
                </p>
                <p className="text-base leading-relaxed text-text-secondary">
                  {app.description}
                </p>

                {/* Background Glow */}
                <div 
                  className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
