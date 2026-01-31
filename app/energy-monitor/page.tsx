"use client";

import React, { useMemo, useEffect } from "react";
import { Layout } from "@/components/universal/Layout";
import { DailyCheckIn } from "@/components/energy-monitor/DailyCheckIn";
import { CurrentStatus } from "@/components/energy-monitor/CurrentStatus";
import { TrendChart } from "@/components/energy-monitor/TrendChart";
import { InsightsSection } from "@/components/energy-monitor/InsightsSection";
import { useEnergyMonitorStore } from "@/store/energyMonitorStore";

export default function EnergyMonitorPage() {
  const { logs, logToday, getTodayLog, getInsights, getStreak } = useEnergyMonitorStore();

  // Get current state
  const todayLog = useMemo(() => getTodayLog(), [logs, getTodayLog]);
  const insights = useMemo(() => getInsights(), [logs, getInsights]);
  const streak = useMemo(() => getStreak(), [logs, getStreak]);

  return (
    <Layout 
      appName="Energy Monitor" 
      appAccent="var(--app-4-accent)"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8">
        <DailyCheckIn 
          onLog={logToday} 
          existingLog={todayLog} 
        />
        
        <CurrentStatus 
          todayLog={todayLog} 
          streakDays={streak} 
        />

        <TrendChart logs={logs} />

        <InsightsSection insights={insights} />
      </div>
    </Layout>
  );
}
