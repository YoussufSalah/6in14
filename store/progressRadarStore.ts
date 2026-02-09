import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeeklyEntry, getWeekRange } from "@/lib/progressRadarLogic";

interface ProgressRadarState {
  entries: WeeklyEntry[];
  logWeek: (metrics: WeeklyEntry['metrics'], manualWeekStart?: string) => void;
  deleteWeek: (id: string) => void;
  getEntryForWeek: (weekStart: string) => WeeklyEntry | undefined;
  getLatestEntries: (count: number) => WeeklyEntry[];
}

export const useProgressRadarStore = create<ProgressRadarState>()(
  persist(
    (set, get) => ({
      entries: [],

      logWeek: (metrics, manualWeekStart) => set((state) => {
        const { start, end } = getWeekRange(manualWeekStart ? new Date(manualWeekStart) : new Date());
        
        const existingIndex = state.entries.findIndex(e => e.weekStart === start);
        const newEntry: WeeklyEntry = {
          id: existingIndex !== -1 ? state.entries[existingIndex].id : Math.random().toString(36).substring(2, 9),
          weekStart: start,
          weekEnd: end,
          metrics,
          loggedDate: new Date().toISOString()
        };

        let updatedEntries = [...state.entries];
        if (existingIndex !== -1) {
          updatedEntries[existingIndex] = newEntry;
        } else {
          updatedEntries.push(newEntry);
        }

        // Sort by date descending
        updatedEntries.sort((a, b) => b.weekStart.localeCompare(a.weekStart));

        return { entries: updatedEntries };
      }),

      deleteWeek: (id) => set((state) => ({
        entries: state.entries.filter(e => e.id !== id)
      })),

      getEntryForWeek: (weekStart) => {
        return get().entries.find(e => e.weekStart === weekStart);
      },

      getLatestEntries: (count) => {
        return get().entries.slice(0, count);
      }
    }),
    {
      name: "progress-radar-storage",
    }
  )
);
