"use client";

import React, { useEffect, useState } from "react";
import { Bell, Trash2, CheckCircle2 } from "lucide-react";
import { format, formatDistanceToNow, isAfter, isBefore, addDays, isToday } from "date-fns";
import { Reminder } from "@/store/reminderStore";
import { cn } from "@/lib/utils";

interface ReminderListProps {
  reminders: Reminder[];
  type: 'active' | 'fired';
  onDelete: (id: string) => void;
  onClearAll?: () => void;
}

export const ReminderList = ({ reminders, type, onDelete, onClearAll }: ReminderListProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeDisplay = (fireAtStr: string) => {
    const fireAt = new Date(fireAtStr);
    const diff = fireAt.getTime() - now.getTime();

    if (diff <= 0) return "Firing now...";
    if (diff < 60000) return `In ${Math.floor(diff / 1000)} seconds`;
    if (diff < 3600000) return `In ${Math.floor(diff / 60000)} minutes`;
    
    if (isToday(fireAt)) {
      return `Today at ${format(fireAt, "h:mm a")}`;
    }
    
    const sevenDaysFromNow = addDays(now, 7);
    if (isBefore(fireAt, sevenDaysFromNow)) {
      return `In ${formatDistanceToNow(fireAt)}, ${format(fireAt, "h:mm a")}`;
    }

    return format(fireAt, "MMM d 'at' h:mm a");
  };

  const getFiredDisplay = (firedAtStr?: string) => {
    if (!firedAtStr) return "Fired recently";
    return `Fired ${formatDistanceToNow(new Date(firedAtStr))} ago`;
  };

  if (reminders.length === 0) {
    return (
      <div className="mx-auto max-w-[800px] py-12 text-center text-text-tertiary">
        {type === 'active' ? (
          <>
            <Bell className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p className="italic">No active reminders. Add one above.</p>
          </>
        ) : (
          <p className="italic">No fired reminders yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[800px] px-8 py-10 sm:px-0">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-3 font-display text-xl font-bold text-white">
          {type === 'active' ? 'Active' : 'Already Fired'}
          <span className={cn(
            "rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold",
            type === 'active' 
              ? "border-app-5/30 bg-app-5/10 text-app-5" 
              : "border-border-subtle bg-bg-tertiary text-text-tertiary"
          )}>
            {reminders.length}
          </span>
        </h3>
        {type === 'fired' && onClearAll && (
          <button 
            onClick={onClearAll}
            className="font-mono text-sm text-text-tertiary transition-colors hover:text-error"
          >
            Clear All Fired
          </button>
        )}
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => {
          const isFiringSoon = type === 'active' && 
            new Date(reminder.fireAt).getTime() - now.getTime() < 3600000;
          const isFiringVerySoon = type === 'active' && 
            new Date(reminder.fireAt).getTime() - now.getTime() < 600000;

          return (
            <div 
              key={reminder.id}
              className={cn(
                "group flex items-start justify-between gap-4 rounded-xl border border-border-subtle bg-bg-secondary p-5 transition-all",
                type === 'active' && "hover:border-app-5 hover:bg-app-5/5",
                isFiringSoon && "border-app-5/50 bg-app-5/10 animate-pulse",
                type === 'fired' && "opacity-50"
              )}
            >
              <div className="flex-1">
                <p className={cn(
                  "text-base font-semibold text-white leading-snug",
                  type === 'fired' && "text-text-secondary line-through"
                )}>
                  {reminder.text}
                </p>
                <p className={cn(
                  "mt-1.5 font-mono text-sm text-text-secondary",
                  isFiringSoon && "text-app-5 font-bold",
                  isFiringVerySoon && "animate-pulse"
                )}>
                  {type === 'active' 
                    ? getTimeDisplay(reminder.fireAt) 
                    : getFiredDisplay(reminder.firedAt)
                  }
                </p>
              </div>

              <button 
                onClick={() => onDelete(reminder.id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-text-tertiary transition-all hover:border-error hover:bg-error/10 hover:text-error"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
