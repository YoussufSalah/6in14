"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Layout } from "@/components/universal/Layout";
import { NotificationBanner } from "@/components/silent-reminders/NotificationBanner";
import { AddReminderForm } from "@/components/silent-reminders/AddReminderForm";
import { ReminderList } from "@/components/silent-reminders/ReminderList";
import { useReminderStore } from "@/store/reminderStore";

export default function SilentRemindersPage() {
  const { 
    reminders, 
    addReminder, 
    deleteReminder, 
    markAsFired, 
    clearFired,
    syncWithServiceWorker 
  } = useReminderStore();

  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    // 1. Initial permission check
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }

    // 2. Register Service Worker
    async function initSW() {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          // Ensure SW is controlled
          if (navigator.serviceWorker.controller) {
            setSwRegistered(true);
            syncWithServiceWorker(); // Push any persisted reminders to the new SW session
          } else {
            // Need to wait for it to take control
            navigator.serviceWorker.addEventListener('controllerchange', () => {
              setSwRegistered(true);
              syncWithServiceWorker();
            });
          }
        } catch (error) {
          console.error("SW registration failed:", error);
          setSwRegistered(false);
        }
      }
    }

    initSW();

    // 3. Listen for messages from SW (when a reminder fires)
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "REMINDER_FIRED") {
        markAsFired(event.data.payload.id);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () => navigator.serviceWorker.removeEventListener("message", handleMessage);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const activeReminders = useMemo(() => 
    reminders.filter(r => r.status === 'active')
      .sort((a, b) => a.fireAt.localeCompare(b.fireAt)),
    [reminders]
  );

  const firedReminders = useMemo(() => 
    reminders.filter(r => r.status === 'fired')
      .sort((a, b) => (b.firedAt || '').localeCompare(a.firedAt || '')),
    [reminders]
  );

  return (
    <Layout 
      appName="Silent Reminders" 
      appAccent="var(--app-5-accent)"
    >
      <div className="space-y-12 pb-24">
        {/* Contextual Banner */}
        <NotificationBanner 
          permission={permission}
          swRegistered={swRegistered}
          onRequestPermission={requestPermission}
        />

        {/* Form Section */}
        <AddReminderForm 
          onAdd={addReminder} 
          permissionGranted={permission === "granted"} 
          onRequestPermission={requestPermission}
        />

        {/* Lists Section */}
        <div className="space-y-4">
          <ReminderList 
            reminders={activeReminders} 
            type="active" 
            onDelete={deleteReminder} 
          />

          <ReminderList 
            reminders={firedReminders} 
            type="fired" 
            onDelete={deleteReminder}
            onClearAll={clearFired}
          />
        </div>
      </div>
    </Layout>
  );
}
