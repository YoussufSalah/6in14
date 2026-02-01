import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Metric, MetricStatus, calculateSubstreak, calculateBestStreak, calculateMainStreak } from "@/lib/streakLogic";
import { format } from "date-fns";

interface StreakCommanderState {
  metrics: Metric[];
  lastKnownMainStreak: number;
  addMetric: (name: string) => void;
  updateMetric: (id: string, name: string) => void;
  deleteMetric: (id: string) => void;
  checkIn: (metricId: string, status: MetricStatus) => void;
  getMainStreak: () => { current: number; best: number };
  getTodaysStats: () => { completed: number; total: number; percentage: number };
  initializeDaily: () => void;
 }

export const useStreakCommanderStore = create<StreakCommanderState>()(
  persist(
    (set, get) => ({
      metrics: [],
      lastKnownMainStreak: 0,
      
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
              updatedHistory[existingEntryIndex] = { ...updatedHistory[existingEntryIndex], status };
            } else {
              updatedHistory.push({ date: today, status });
            }

            const current = calculateSubstreak({ ...m, history: updatedHistory });
            const best = calculateBestStreak({ ...m, history: updatedHistory });
            return { ...m, history: updatedHistory, currentStreak: current, bestStreak: best };
          }
          return m;
        });

        const mainStreak = calculateMainStreak(updatedMetrics);

        return { 
          metrics: updatedMetrics,
          lastKnownMainStreak: mainStreak.current
        };
      }),

      getMainStreak: () => {
        return calculateMainStreak(get().metrics);
      },

      getTodaysStats: () => {
        const today = format(new Date(), "yyyy-MM-dd");
        const metrics = get().metrics;
        if (metrics.length === 0) return { completed: 0, total: 0, percentage: 0 };

        const answered = metrics.filter(m => {
          const entry = m.history.find(h => h.date === today);
          return entry && entry.status !== "pending";
        }).length;

        const completed = metrics.filter(m => {
          const entry = m.history.find(h => h.date === today);
          return entry && (entry.status === "done" || entry.status === "rest");
        }).length;

        return { 
          completed, 
          total: metrics.length, 
          percentage: metrics.length > 0 ? (answered / metrics.length) * 100 : 0 
        };
      },

      initializeDaily: () => set((state) => {
        const today = format(new Date(), "yyyy-MM-dd");
        
        // 1. Flush stale pending entries
        const flushedMetrics = state.metrics.map(metric => {
          const updatedHistory = metric.history.map(entry => {
            if (entry.status === "pending" && entry.date < today) {
              return { ...entry, status: "missed" as MetricStatus };
            }
            return entry;
          });
          return { ...metric, history: updatedHistory };
        });

        // 2. Initialize today's pending entries
        const initializedMetrics = flushedMetrics.map(metric => {
          const hasEntryToday = metric.history.some(h => h.date === today);
          if (!hasEntryToday) {
            return {
              ...metric,
              history: [...metric.history, { date: today, status: "pending" as MetricStatus }]
            };
          }
          return metric;
        });

        // 3. Recalculate streaks
        const finalMetrics = initializedMetrics.map(metric => ({
          ...metric,
          currentStreak: calculateSubstreak(metric),
          bestStreak: calculateBestStreak(metric)
        }));

        const mainStreak = calculateMainStreak(finalMetrics);

        return { 
          metrics: finalMetrics,
          lastKnownMainStreak: mainStreak.current
        };
      })
    }),
    {
      name: "streak-commander-storage",
    }
  )
);
