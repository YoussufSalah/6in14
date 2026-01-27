import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Goal, calculateGoalScore } from "@/lib/scoring";

interface DecisionFatigueState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id">) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  toggleComplete: (id: string) => void;
  skipGoal: (id: string) => void;
  getSortedGoals: () => (Goal & { score: number })[];
  getTopGoal: () => (Goal & { score: number }) | null;
}

export const useDecisionFatigueStore = create<DecisionFatigueState>()(
  persist(
    (set, get) => ({
      goals: [],
      addGoal: (goal) =>
        set((state) => ({
          goals: [
            ...state.goals,
            { ...goal, id: Math.random().toString(36).substring(2, 9) },
          ],
        })),
      updateGoal: (id, updatedGoal) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, ...updatedGoal } : g)),
        })),
      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),
      toggleComplete: (id) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, completed: !g.completed } : g
          ),
        })),
      skipGoal: (id) => {
        const today = new Date().toISOString().split("T")[0];
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id ? { ...g, skippedAt: today } : g
          ),
        }));
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
    }),
    {
      name: "decision-fatigue-storage",
    }
  )
);
