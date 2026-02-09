import { create } from "zustand";
import { WarTask, Subtask, WeeklyData, getCurrentWeekInfo, determineWeekState } from "@/lib/warMapLogic";
import * as api from "@/lib/api/warMap";

interface WarMapState {
  weeklyData: WeeklyData;
  loading: boolean;
  error: string | null;
  
  fetchWeek: () => Promise<void>;
  setTaskName: (index: number, name: string) => void;
  addSubtask: (taskIndex: number, name: string) => void;
  removeSubtask: (taskIndex: number, subtaskIndex: number) => void;
  updateSubtaskName: (taskIndex: number, subtaskIndex: number, name: string) => void;
  toggleSubtask: (taskIndex: number, subtaskIndex: number) => Promise<void>;
  commitWeek: () => Promise<void>;
  resetForNewWeek: () => void;
  checkAndInitialize: () => Promise<void>;
}

export const useWarMapStore = create<WarMapState>()(
  (set, get) => ({
    weeklyData: {
      weekId: getCurrentWeekInfo().weekId,
      tasks: Array.from({ length: 3 }, (_, i) => ({
        id: `temp-${i}`,
        name: "",
        priority: (i + 1) as 1 | 2 | 3,
        subtasks: []
      })),
      locked: false,
    },
    loading: false,
    error: null,

    fetchWeek: async () => {
      const { weekId } = getCurrentWeekInfo();
      set({ loading: true, error: null });
      try {
        const week = await api.fetchWeek(weekId);
        if (week) {
          const mappedTasks: WarTask[] = week.tasks.map((t: any) => ({
            id: t.id,
            name: t.name,
            priority: t.priority,
            subtasks: t.subtasks.map((st: any) => ({
              id: st.id,
              name: st.text, // DB 'text' to APP 'name'
              completed: st.completed
            }))
          }));
          set({ 
            weeklyData: { weekId, tasks: mappedTasks, locked: week.locked },
            loading: false 
          });
        } else {
          set({ loading: false });
        }
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    setTaskName: (index, name) => set(state => {
      const newTasks = [...state.weeklyData.tasks];
      newTasks[index] = { ...newTasks[index], name };
      return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
    }),

    addSubtask: (taskIndex, name) => set(state => {
      const newTasks = [...state.weeklyData.tasks];
      const task = { ...newTasks[taskIndex] };
      task.subtasks = [
        ...task.subtasks,
        { id: `temp-st-${Math.random()}`, name, completed: false }
      ];
      newTasks[taskIndex] = task;
      return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
    }),

    removeSubtask: (taskIndex, subtaskIndex) => set(state => {
      const newTasks = [...state.weeklyData.tasks];
      const task = { ...newTasks[taskIndex] };
      task.subtasks = task.subtasks.filter((_, i) => i !== subtaskIndex);
      newTasks[taskIndex] = task;
      return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
    }),

    updateSubtaskName: (taskIndex, subtaskIndex, name) => set(state => {
      const newTasks = [...state.weeklyData.tasks];
      const task = { ...newTasks[taskIndex] };
      task.subtasks = task.subtasks.map((st, i) => 
        i === subtaskIndex ? { ...st, name } : st
      );
      newTasks[taskIndex] = task;
      return { weeklyData: { ...state.weeklyData, tasks: newTasks } };
    }),

    toggleSubtask: async (taskIndex, subtaskIndex) => {
      const task = get().weeklyData.tasks[taskIndex];
      const subtask = task.subtasks[subtaskIndex];
      const newCompleted = !subtask.completed;

      const previousData = get().weeklyData;
      const newTasks = [...previousData.tasks];
      const newTask = { ...newTasks[taskIndex] };
      const newSubtasks = [...newTask.subtasks];
      newSubtasks[subtaskIndex] = { ...subtask, completed: newCompleted };
      newTask.subtasks = newSubtasks;
      newTasks[taskIndex] = newTask;
      
      set({ weeklyData: { ...previousData, tasks: newTasks } });

      try {
        await api.toggleSubtask(subtask.id, newCompleted);
        
        // Final completion check
        const updatedData = get().weeklyData;
        const newState = determineWeekState(updatedData, updatedData.weekId);
        
        if (newState === "COMPLETED") {
          await api.markWeekCompleted(updatedData.weekId, true);
        } else if (newState === "EXECUTION") {
          // If we unchecked a task and it was previously completed
          await api.markWeekCompleted(updatedData.weekId, false);
        }
      } catch (err: any) {
        set({ weeklyData: previousData, error: err.message });
      }
    },

    commitWeek: async () => {
      const { weekId } = getCurrentWeekInfo();
      const { tasks } = get().weeklyData;
      
      set({ loading: true });
      try {
        await api.createWeek(weekId);
        
        for (const task of tasks) {
          if (!task.name) continue;
          const dbTask = await api.addTask(weekId, { name: task.name, priority: task.priority });
          for (const st of task.subtasks) {
            if (!st.name) continue;
            await api.addSubtask(dbTask.id, st.name);
          }
        }

        await api.updateWeekStatus(weekId, true);
        await get().fetchWeek();
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    resetForNewWeek: () => set({
      weeklyData: {
        weekId: getCurrentWeekInfo().weekId,
        tasks: Array.from({ length: 3 }, (_, i) => ({
          id: `temp-${i}`,
          name: "",
          priority: (i + 1) as 1 | 2 | 3,
          subtasks: []
        })),
        locked: false
      }
    }),

    checkAndInitialize: async () => {
       await get().fetchWeek();
    }
  })
);
