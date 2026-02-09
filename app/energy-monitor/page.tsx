"use client";

import React, { useMemo, useEffect } from "react";
import { format } from "date-fns";
import { Layout } from "@/components/universal/Layout";
import { DailyCheckIn } from "@/components/energy-monitor/DailyCheckIn";
import { CurrentStatus } from "@/components/energy-monitor/CurrentStatus";
import { TrendChart } from "@/components/energy-monitor/TrendChart";
import { InsightsSection } from "@/components/energy-monitor/InsightsSection";
import { useEnergyMonitorStore } from "@/store/energyMonitorStore";

import { ProtectedRoute } from "@/components/universal/ProtectedRoute";

export default function EnergyMonitorPage() {
  const { logs, loading, logToday, getTodayLog, getInsights, getStreak, fetchEntries } = useEnergyMonitorStore();

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Get current state
  const todayLog = useMemo(() => getTodayLog(), [logs, getTodayLog]);
  const insights = useMemo(() => getInsights(), [logs, getInsights]);
  const streak = useMemo(() => getStreak(), [logs, getStreak]);

  return (
    <ProtectedRoute>
      <Layout 
        appName="Energy Monitor" 
        appAccent="var(--app-4-accent)"
      >
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8">
          {loading && logs.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-4 border-t-transparent" />
            </div>
          ) : (
            <>
              <DailyCheckIn 
                onLog={(sleep, mood, fatigue) => logToday({
                  date: format(new Date(), "yyyy-MM-dd"),
                  sleep,
                  mood,
                  fatigue
                })} 
                existingLog={todayLog ?? null} 
              />
              
              <CurrentStatus 
                todayLog={todayLog ?? null} 
                streakDays={streak} 
              />

              <TrendChart logs={logs} />

              <InsightsSection insights={insights} />
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
