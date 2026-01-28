"use client";

import React, { useState, useMemo } from "react";
import { Layout } from "@/components/universal/Layout";
import { StreakHero } from "@/components/streak-commander/StreakHero";
import { CheckInList } from "@/components/streak-commander/CheckInList";
import { IndividualStreaks } from "@/components/streak-commander/IndividualStreaks";
import { MetricSettings } from "@/components/streak-commander/MetricSettings";
import { AddMetricModal } from "@/components/streak-commander/AddMetricModal";
import { useStreakCommanderStore } from "@/store/streakCommanderStore";

export default function StreakCommanderPage() {
  const { 
    metrics, 
    deleteMetric, 
    checkIn, 
    getMainStreak, 
    getTodaysStats 
  } = useStreakCommanderStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMetricId, setEditMetricId] = useState<string | null>(null);

  const mainStreak = useMemo(() => getMainStreak(), [metrics]);
  const todaysStats = useMemo(() => getTodaysStats(), [metrics]);

  const handleEdit = (id: string) => {
    setEditMetricId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditMetricId(null);
    setIsModalOpen(true);
  };

  return (
    <Layout 
      appName="Streak Commander" 
      appAccent="var(--app-2-accent)"
    >
      <div className="space-y-16 pb-24">
        {/* Hero Section */}
        <StreakHero 
          streak={mainStreak.current} 
          bestStreak={mainStreak.best}
          completedToday={todaysStats.completed} 
          totalMetrics={todaysStats.total} 
          onAddMetric={handleAdd}
        />

        {metrics.length > 0 && (
          <>
            {/* Today's Check-In Section */}
            <CheckInList 
              metrics={metrics} 
              onCheckIn={checkIn} 
              completedCount={todaysStats.completed} 
              totalMetrics={todaysStats.total} 
              percentage={todaysStats.percentage}
            />

            {/* Individual Historical Stats Section */}
            <IndividualStreaks metrics={metrics} />

            {/* Management Section */}
            <MetricSettings 
              metrics={metrics} 
              onEdit={handleEdit} 
              onDelete={deleteMetric} 
              onAdd={handleAdd}
            />
          </>
        )}
      </div>

      <AddMetricModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editMetricId={editMetricId} 
      />
    </Layout>
  );
}
