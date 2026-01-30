import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeeklyData, WarTask, getCurrentWeekInfo } from "@/lib/warMapLogic";

interface WarMapState {
  weeklyData: WeeklyData | null;
  setTaskName: (index: number, name: string) => void;
  addSubtask: (taskIndex: number, name: string) => void;
  removeSubtask: (taskIndex: number, subtaskIndex: number) => void;
  updateSubtaskName: (taskIndex: number, subtaskIndex: number, name: string) => void;
  toggleSubtask: (taskIndex: number, subtaskIndex: number) => void;
  commitWeek: () => void;
  resetForNewWeek: () => void;
  checkAndInitialize: () => void;
}

const DEFAULT_TASKS: WarTask[] = [
  { id: "t1", name: "", subtasks: [] },
  { id: "t2", name: "", subtasks: [] },
  { id: "t3", name: "", subtasks: [] },
];

export const useWarMapStore = create<WarMapState>()(
  persist(
    (set, get) => ({
      weeklyData: null,

      checkAndInitialize: () => {
        const { weekId } = getCurrentWeekInfo();
        const currentData = get().weeklyData;
        if (!currentData || currentData.weekId !== weekId) {
          set({
            weeklyData: {
              weekId,
              locked: false,
              tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)),
            },
          });
        }
      },

      setTaskName: (index, name) => set((state) => {
        if (!state.weeklyData) return state;
        const newTasks = [...state.weeklyData.tasks];
        newTasks[index] = { ...newTasks[index], name };
        return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
      }),

      addSubtask: (taskIndex, name) => set((state) => {
        if (!state.weeklyData) return state;
        const newTasks = [...state.weeklyData.tasks];
        const task = newTasks[taskIndex];
        if (task.subtasks.length >= 5) return state;
        
        task.subtasks.push({
          id: Math.random().toString(36).substring(2, 9),
          name: name || "",
          completed: false
        });
        return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
      }),

      removeSubtask: (taskIndex, subtaskIndex) => set((state) => {
        if (!state.weeklyData) return state;
        const newTasks = [...state.weeklyData.tasks];
        newTasks[taskIndex].subtasks.splice(subtaskIndex, 1);
        return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
      }),

      updateSubtaskName: (taskIndex, subtaskIndex, name) => set((state) => {
        if (!state.weeklyData) return state;
        const newTasks = [...state.weeklyData.tasks];
        newTasks[taskIndex].subtasks[subtaskIndex].name = name;
        return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
      }),

      toggleSubtask: (taskIndex, subtaskIndex) => set((state) => {
        if (!state.weeklyData || !state.weeklyData.locked) return state;
        const newTasks = [...state.weeklyData.tasks];
        const subtask = newTasks[taskIndex].subtasks[subtaskIndex];
        subtask.completed = !subtask.completed;
        return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
      }),

      commitWeek: () => set((state) => {
        if (!state.weeklyData) return state;
        return { weeklyData: { ...state.weeklyData, locked: true } };
      }),

      resetForNewWeek: () => {
        const { weekId } = getCurrentWeekInfo();
        set({
          weeklyData: {
            weekId,
            locked: false,
            tasks: JSON.parse(JSON.stringify(DEFAULT_TASKS)),
          },
        });
      },
    }),
    {
      name: "weekly-war-map-storage",
    }
  )
);
