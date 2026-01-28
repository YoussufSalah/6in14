import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Metric, MetricStatus, HistoryEntry, calculateMetricStreak, calculateMainStreak } from "@/lib/streakLogic";
import { format } from "date-fns";

interface StreakCommanderState {
  metrics: Metric[];
  addMetric: (name: string) => void;
  updateMetric: (id: string, name: string) => void;
  deleteMetric: (id: string) => void;
  checkIn: (metricId: string, status: MetricStatus) => void;
  getMainStreak: () => { current: number; best: number };
  getTodaysStats: () => { completed: number; total: number; percentage: number };
 }

export const useStreakCommanderStore = create<StreakCommanderState>()(
  persist(
    (set, get) => ({
      metrics: [],
      
      addMetric: (name) => set((state) => {
        const newMetric: Metric = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          createdAt: new Date().toISOString(),
          history: [],
          currentStreak: 0,
          bestStreak: 0,
        };
        return { metrics: [...state.metrics, newMetric] };
      }),

      updateMetric: (id, name) => set((state) => ({
        metrics: state.metrics.map(m => m.id === id ? { ...m, name } : m)
      })),

      deleteMetric: (id) => set((state) => ({
        metrics: state.metrics.filter(m => m.id !== id)
      })),

      checkIn: (metricId, status) => set((state) => {
        const today = format(new Date(), "yyyy-MM-dd");
        const updatedMetrics = state.metrics.map(m => {
          if (m.id === metricId) {
            const existingEntryIndex = m.history.findIndex(h => h.date === today);
            let updatedHistory = [...m.history];
            
            if (existingEntryIndex !== -1) {
              updatedHistory[existingEntryIndex] = { date: today, status };
            } else {
              updatedHistory.push({ date: today, status });
            }

            const { current, best } = calculateMetricStreak(updatedHistory);
            return { ...m, history: updatedHistory, currentStreak: current, bestStreak: best };
          }
          return m;
        });

        return { metrics: updatedMetrics };
      }),

      getMainStreak: () => {
        return calculateMainStreak(get().metrics);
      },

      getTodaysStats: () => {
        const today = format(new Date(), "yyyy-MM-dd");
        const metrics = get().metrics;
        if (metrics.length === 0) return { completed: 0, total: 0, percentage: 0 };

        const completed = metrics.filter(m => {
          const entry = m.history.find(h => h.date === today);
          return entry && (entry.status === "done" || entry.status === "rest");
        }).length;

        return { 
          completed, 
          total: metrics.length, 
          percentage: (completed / metrics.length) * 100 
        };
      },
    }),
    {
      name: "streak-commander-storage",
    }
  )
);
