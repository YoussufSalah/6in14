import { create } from "zustand";
import { Goal, calculateGoalScore } from "@/lib/scoring";
import * as api from "@/lib/api/goals";

interface DecisionFatigueState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  fetchGoals: () => Promise<void>;
  addGoal: (goal: Omit<Goal, "id">) => Promise<void>;
  updateGoal: (id: string, goal: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  skipGoal: (id: string) => Promise<void>;
  getSortedGoals: () => (Goal & { score: number })[];
  getTopGoal: () => (Goal & { score: number }) | null;
}

export const useDecisionFatigueStore = create<DecisionFatigueState>()(
  (set, get) => ({
    goals: [],
    loading: false,
    error: null,

    fetchGoals: async () => {
      set({ loading: true, error: null });
      try {
        const goals = await api.fetchGoals();
        set({ goals, loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    addGoal: async (goal) => {
      set({ loading: true, error: null });
      try {
        const newGoal = await api.addGoal(goal);
        // Refresh goals or append? Refresh is safer for RLS/Defaults
        const goals = await api.fetchGoals();
        set({ goals, loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    updateGoal: async (id, updatedGoal) => {
      // Optimistic update
      const previousGoals = get().goals;
      set({
        goals: previousGoals.map((g) => (g.id === id ? { ...g, ...updatedGoal } : g)),
      });

      try {
        await api.updateGoal(id, updatedGoal);
      } catch (err: any) {
        set({ goals: previousGoals, error: err.message });
      }
    },

    deleteGoal: async (id) => {
      const previousGoals = get().goals;
      set({
        goals: previousGoals.filter((g) => g.id !== id),
      });

      try {
        await api.deleteGoal(id);
      } catch (err: any) {
        set({ goals: previousGoals, error: err.message });
      }
    },

    toggleComplete: async (id) => {
      const goal = get().goals.find(g => g.id === id);
      if (!goal) return;
      
      const newStatus = !goal.completed;
      await get().updateGoal(id, { completed: newStatus });
    },

    skipGoal: async (id) => {
      const today = new Date().toISOString().split("T")[0];
      await get().updateGoal(id, { skippedAt: today });
    },

    getSortedGoals: () => {
      const today = new Date().toISOString().split("T")[0];
      return get()
        .goals.filter((g) => !g.completed && g.skippedAt !== today)
        .map((g) => ({ ...g, score: calculateGoalScore(g) }))
        .sort((a, b) => b.score - a.score);
    },

    getTopGoal: () => {
      const sorted = get().getSortedGoals();
      return sorted.length > 0 ? sorted[0] : null;
    },
  })
);
