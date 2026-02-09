import { create } from "zustand";
import { 
  Metric,
  MetricStatus, 
  calculateMainStreak, 
  calculateSubstreak,
  calculateBestStreak
} from "@/lib/streakLogic";
import * as api from "@/lib/api/streaks";
import { format, subDays } from "date-fns";

interface StreakCommanderState {
  metrics: Metric[];
  loading: boolean;
  error: string | null;
  lastKnownMainStreak: number;
  
  fetchData: () => Promise<void>;
  addMetric: (name: string) => Promise<void>;
  deleteMetric: (id: string) => Promise<void>;
  checkIn: (metricId: string, status: MetricStatus) => Promise<void>;
  initializeDaily: () => Promise<void>;
  
  getMainStreak: () => { current: number; best: number };
  getSubstreak: (metricId: string) => number;
  getTodaysStats: () => { completed: number; total: number; percentage: number };
}

export const useStreakCommanderStore = create<StreakCommanderState>()(
  (set, get) => ({
    metrics: [],
    loading: false,
    error: null,
    lastKnownMainStreak: 0,

    fetchData: async () => {
      set({ loading: true, error: null });
      try {
        const dbMetrics = await api.fetchMetrics();
        const metricIds = dbMetrics.map(m => m.id);
        
        if (metricIds.length === 0) {
          set({ metrics: [], loading: false });
          return;
        }

        const endDate = format(new Date(), "yyyy-MM-dd");
        const startDate = format(subDays(new Date(), 30), "yyyy-MM-dd");
        
        const history = await api.fetchHistory(metricIds, startDate, endDate);

        const mappedMetrics: Metric[] = dbMetrics.map(m => {
          const metricHistory: Record<string, MetricStatus> = {};
          history
            .filter(h => h.metric_id === m.id)
            .forEach(h => {
              metricHistory[h.date] = h.status as MetricStatus;
            });
          
          const metricBase = {
            id: m.id,
            name: m.name,
            history: metricHistory
          };

          return {
            ...metricBase,
            currentStreak: calculateSubstreak(metricBase),
            bestStreak: calculateBestStreak(metricBase)
          };
        });

        const currentStreak = calculateMainStreak(mappedMetrics).current;
        set({ 
          metrics: mappedMetrics, 
          loading: false,
          lastKnownMainStreak: currentStreak 
        });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    addMetric: async (name) => {
      set({ loading: true });
      try {
        const newMetric = await api.addMetric(name);
        const today = format(new Date(), "yyyy-MM-dd");
        await api.upsertStatus(newMetric.id, today, "pending");
        await get().fetchData();
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    deleteMetric: async (id) => {
      set({ loading: true });
      try {
        await api.deleteMetric(id);
        await get().fetchData();
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    checkIn: async (metricId, status) => {
      const today = format(new Date(), "yyyy-MM-dd");
      
      // Optimistic update
      const previousMetrics = get().metrics;
      set({
        metrics: previousMetrics.map(m => 
          m.id === metricId 
            ? { ...m, history: { ...m.history, [today]: status } }
            : m
        )
      });

      try {
        await api.upsertStatus(metricId, today, status);
      } catch (err: any) {
        set({ metrics: previousMetrics, error: err.message });
      }
    },

    initializeDaily: async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      set({ loading: true });
      try {
        await api.flushStalePending(today);
        
        const dbMetrics = await api.fetchMetrics();
        const metricIds = dbMetrics.map(m => m.id);
        
        if (metricIds.length > 0) {
           const historyData = await api.fetchHistory(metricIds, today, today);
           const existingMetricIds = new Set(historyData.map(h => h.metric_id));
           
           for (const id of metricIds) {
             if (!existingMetricIds.has(id)) {
               await api.upsertStatus(id, today, "pending");
             }
           }
        }
        
        await get().fetchData();
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    getMainStreak: () => calculateMainStreak(get().metrics),
    getSubstreak: (metricId) => {
      const metric = get().metrics.find((m) => m.id === metricId);
      return metric ? calculateSubstreak(metric) : 0;
    },
    getTodaysStats: () => {
      const today = format(new Date(), "yyyy-MM-dd");
      const metrics = get().metrics;
      if (metrics.length === 0) return { completed: 0, total: 0, percentage: 0 };

      const completed = metrics.filter(m => m.history[today] === "done").length;
      return {
        completed,
        total: metrics.length,
        percentage: Math.round((completed / metrics.length) * 100)
      };
    }
  })
);
