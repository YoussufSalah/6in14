import { create } from "zustand";
import * as api from "@/lib/api/reminders";

export interface Reminder {
  id: string;
  text: string;
  fireAt: string; // ISO string
  status: "active" | "fired";
  firedAt: string | null;
  timer: NodeJS.Timeout | null;
}

interface ReminderState {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
  
  fetchReminders: () => Promise<void>;
  addReminder: (text: string, fireAt: string) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  markAsFired: (id: string) => Promise<void>;
  clearFired: () => Promise<void>;
  clearReminders: () => void;
  syncWithServiceWorker: () => void; // Placeholder for UI compatibility
}

export const useReminderStore = create<ReminderState>()(
  (set, get) => ({
    reminders: [],
    loading: false,
    error: null,

    fetchReminders: async () => {
      // Clear existing timers
      get().reminders.forEach(r => {
        if (r.timer) clearTimeout(r.timer);
      });

      set({ loading: true, error: null });
      try {
        const reminders = await api.fetchReminders();
        
        // Re-setup timers for active ones
        const updatedReminders = reminders.map(r => {
          if (r.status === "active") {
            const delay = new Date(r.fireAt).getTime() - Date.now();
            if (delay > 0) {
              const timer = setTimeout(() => {
                get().markAsFired(r.id);
              }, delay);
              return { ...r, timer };
            } else {
              // Should have fired already
              api.markFired(r.id);
              return { ...r, status: "fired" as const, firedAt: new Date().toISOString() };
            }
          }
          return r;
        });

        set({ reminders: updatedReminders as Reminder[], loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    addReminder: async (text, fireAt) => {
      set({ loading: true });
      try {
        await api.addReminder({ text, fireAt });
        await get().fetchReminders();
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },

    deleteReminder: async (id) => {
      const reminder = get().reminders.find(r => r.id === id);
      if (reminder?.timer) clearTimeout(reminder.timer);

      const previousReminders = get().reminders;
      set({ reminders: previousReminders.filter(r => r.id !== id) });

      try {
        await api.deleteReminder(id);
      } catch (err: any) {
        set({ reminders: previousReminders, error: err.message });
      }
    },

    markAsFired: async (id) => {
      // Play sound
      try {
        const audio = new Audio("/ping.wav");
        audio.play();
      } catch (e) {}

      // Optimistic
      set(state => ({
        reminders: state.reminders.map(rem => 
          rem.id === id ? { ...rem, status: "fired", firedAt: new Date().toISOString() } : rem
        )
      }));

      try {
        await api.markFired(id);
      } catch (err: any) {
        set({ error: err.message });
      }
    },

    clearFired: async () => {
      const fired = get().reminders.filter(r => r.status === "fired");
      const previousReminders = get().reminders;
      set({ reminders: previousReminders.filter(r => r.status !== "fired") });

      try {
        for (const r of fired) {
          await api.deleteReminder(r.id);
        }
      } catch (err: any) {
        set({ reminders: previousReminders, error: err.message });
      }
    },

    clearReminders: () => {
      get().reminders.forEach(r => {
        if (r.timer) clearTimeout(r.timer);
      });
      set({ reminders: [] });
    },

    syncWithServiceWorker: () => {
      // SW logic removed for now, but kept signature for UI
    }
  })
);
