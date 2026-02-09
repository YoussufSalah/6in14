import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Reminder {
  id: string;
  text: string;
  fireAt: string; // ISO string
  status: 'active' | 'fired';
  firedAt?: string; // ISO string
}

interface ReminderState {
  reminders: Reminder[];
  addReminder: (text: string, fireAt: string) => void;
  deleteReminder: (id: string) => void;
  markAsFired: (id: string) => void;
  clearFired: () => void;
  syncWithServiceWorker: () => void;
}

export const useReminderStore = create<ReminderState>()(
  persist(
    (set, get) => ({
      reminders: [],

      addReminder: (text, fireAt) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newReminder: Reminder = {
          id,
          text,
          fireAt,
          status: 'active'
        };

        set((state) => ({
          reminders: [newReminder, ...state.reminders]
        }));

        // Notify Service Worker
        if (navigator.serviceWorker?.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'SCHEDULE_REMINDER',
            payload: { id, text, fireAt }
          });
        }
      },

      deleteReminder: (id) => {
        set((state) => ({
          reminders: state.reminders.filter(r => r.id !== id)
        }));

        // Cancel in Service Worker
        if (navigator.serviceWorker?.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'CANCEL_REMINDER',
            payload: { id }
          });
        }
      },

      markAsFired: (id) => {
        set((state) => ({
          reminders: state.reminders.map(r => 
            r.id === id 
              ? { ...r, status: 'fired', firedAt: new Date().toISOString() } 
              : r
          )
        }));
      },

      clearFired: () => {
        set((state) => ({
          reminders: state.reminders.filter(r => r.status === 'active')
        }));
      },

      syncWithServiceWorker: () => {
        const { reminders } = get();
        const active = reminders.filter(r => r.status === 'active');
        
        if (navigator.serviceWorker?.controller) {
          active.forEach(r => {
            navigator.serviceWorker.controller?.postMessage({
              type: 'SCHEDULE_REMINDER',
              payload: { id: r.id, text: r.text, fireAt: r.fireAt }
            });
          });
        }
      }
    }),
    {
      name: "silent-reminders-storage",
    }
  )
);
