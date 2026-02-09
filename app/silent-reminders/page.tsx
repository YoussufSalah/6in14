"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Layout } from "@/components/universal/Layout";
import { NotificationBanner } from "@/components/silent-reminders/NotificationBanner";
import { AddReminderForm } from "@/components/silent-reminders/AddReminderForm";
import { ReminderList } from "@/components/silent-reminders/ReminderList";
import { useReminderStore } from "@/store/reminderStore";

import { ProtectedRoute } from "@/components/universal/ProtectedRoute";

export default function SilentRemindersPage() {
  const { 
    reminders, 
    loading,
    fetchReminders,
    addReminder, 
    deleteReminder, 
    markAsFired, 
    clearFired,
    syncWithServiceWorker 
  } = useReminderStore();

  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    fetchReminders();

    // 1. Initial permission check
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }

    // 2. Register Service Worker
    async function initSW() {
      if ("serviceWorker" in navigator) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          if (navigator.serviceWorker.controller) {
            setSwRegistered(true);
            syncWithServiceWorker();
          } else {
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

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "REMINDER_FIRED") {
        markAsFired(event.data.payload.id);
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);
    return () => navigator.serviceWorker.removeEventListener("message", handleMessage);
  }, [fetchReminders, markAsFired, syncWithServiceWorker]);

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
    <ProtectedRoute>
      <Layout 
        appName="Silent Reminders" 
        appAccent="var(--app-5-accent)"
      >
        <div className="space-y-12 pb-24">
          <NotificationBanner 
            permission={permission}
            swRegistered={swRegistered}
            onRequestPermission={requestPermission}
          />

          {loading && reminders.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-app-5 border-t-transparent" />
            </div>
          ) : (
            <>
              <AddReminderForm 
                onAdd={addReminder} 
                permissionGranted={permission === "granted"} 
                onRequestPermission={requestPermission}
              />

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
            </>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
