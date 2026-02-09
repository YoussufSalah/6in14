"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/universal/Layout";
import { CurrentWeekBanner } from "@/components/progress-radar/CurrentWeekBanner";
import { WeeklyInputForm } from "@/components/progress-radar/WeeklyInputForm";
import { WeekSummaryCard } from "@/components/progress-radar/WeekSummaryCard";
import { TrendChart } from "@/components/progress-radar/TrendChart";
import { InsightsSection } from "@/components/progress-radar/InsightsSection";
import { WeeklyHistory } from "@/components/progress-radar/WeeklyHistory";
import { useProgressRadarStore } from "@/store/progressRadarStore";
import { getWeekRange, WeeklyEntry } from "@/lib/progressRadarLogic";

import { ProtectedRoute } from "@/components/universal/ProtectedRoute";

export default function ProgressRadarPage() {
  const { entries, loading, fetchData, logWeek, deleteWeek, getEntryForWeek } = useProgressRadarStore();
  const [editingEntry, setEditingEntry] = useState<WeeklyEntry | null>(null);
  const [isManualEdit, setIsManualEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentWeeks = useMemo(() => getWeekRange(), []);
  const currentEntry = useMemo(() => getEntryForWeek(currentWeeks.start), [entries, currentWeeks.start, getEntryForWeek]);

  const handleLog = (metrics: WeeklyEntry['metrics']) => {
    logWeek(metrics, editingEntry?.weekStart);
    setEditingEntry(null);
    setIsManualEdit(false);
  };

  const handleEdit = (entry: WeeklyEntry) => {
    setEditingEntry(entry);
    setIsManualEdit(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ProtectedRoute>
      <Layout 
        appName="Progress Radar" 
        appAccent="var(--app-6-accent)"
      >
        <div className="space-y-4 pb-20">
          {loading && entries.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-6 border-t-transparent" />
            </div>
          ) : (
            <>
              {/* Banner Section */}
              <CurrentWeekBanner 
                weekStart={currentWeeks.start} 
                weekEnd={currentWeeks.end} 
                isLogged={!!currentEntry}
                loggedDate={currentEntry?.loggedDate}
              />

              {/* Input/Summary Section */}
              <div className="min-h-[400px]">
                {( !currentEntry || isManualEdit ) ? (
                  <WeeklyInputForm 
                    onLog={handleLog} 
                    existingEntry={editingEntry || undefined}
                  />
                ) : (
                  <WeekSummaryCard 
                    entry={currentEntry} 
                    prevEntry={entries[1]} // Assuming entries are sorted desc
                    onEdit={() => handleEdit(currentEntry)}
                  />
                )}
              </div>

              {/* Trend Section */}
              <TrendChart entries={entries} />

              {/* Insights Section */}
              <InsightsSection entries={entries} />

              {/* History Section */}
              <WeeklyHistory 
                entries={entries} 
                onEdit={handleEdit} 
                onDelete={deleteWeek} 
              />
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
