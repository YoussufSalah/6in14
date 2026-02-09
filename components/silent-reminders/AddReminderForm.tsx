"use client";

import React, { useState } from "react";
import { AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/universal/Button";
import { cn } from "@/lib/utils";

interface AddReminderFormProps {
  onAdd: (text: string, fireAt: string) => void;
  permissionGranted: boolean;
  onRequestPermission: () => void;
}

export const AddReminderForm = ({ onAdd, permissionGranted, onRequestPermission }: AddReminderFormProps) => {
  const [text, setText] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!permissionGranted) {
      onRequestPermission();
      return;
    }

    if (!text.trim()) {
      setError("Please enter what you need to remember.");
      return;
    }

    if (!dateTime) {
      setError("Please pick a date and time.");
      return;
    }

    const fireAt = new Date(dateTime);
    if (fireAt.getTime() <= Date.now()) {
      setError("That time has already passed. Pick a future date and time.");
      return;
    }

    onAdd(text, fireAt.toISOString());
    setText("");
    setDateTime("");
  };

  return (
    <div className="mx-auto max-w-[800px] rounded-2xl border border-border-subtle bg-bg-secondary p-8 sm:p-10">
      <h2 className="mb-6 font-display text-xl font-bold text-white">New Reminder</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-white">
            What do you need to remember?
          </label>
          <input 
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., Email the lawyer, Update app store listing"
            className="h-12 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 text-base text-white transition-all focus:border-app-5 focus:outline-none focus:ring-2 focus:ring-app-5/15"
          />
          <p className="mt-1.5 text-xs text-text-tertiary">
            Be specific. You'll see exactly this in the notification.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-white">
            Remind me on
          </label>
          <input 
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="h-12 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 text-base text-white transition-all focus:border-app-5 focus:outline-none focus:ring-2 focus:ring-app-5/15"
          />
          <p className="mt-1.5 text-xs text-text-tertiary">
            Pick a date and time. The notification fires once at exactly this moment.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 font-mono text-sm text-error">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <Button 
          type="submit"
          className={cn(
            "mt-2 h-13 w-full text-base font-bold transition-all",
            permissionGranted 
              ? "bg-app-5 text-black hover:bg-app-5-light hover:shadow-[0_4px_16px_rgba(234,179,8,0.25)]" 
              : "border border-app-5 bg-transparent text-app-5 hover:bg-app-5/10"
          )}
        >
          {permissionGranted ? (
            <span className="flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" /> Add Reminder
            </span>
          ) : (
            "Enable Notifications First →"
          )}
        </Button>
      </form>
    </div>
  );
};
