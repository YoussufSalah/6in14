"use client";

import React from "react";
import { format } from "date-fns";
import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrentWeekBannerProps {
  weekStart: string;
  weekEnd: string;
  isLogged: boolean;
  loggedDate?: string;
}

export const CurrentWeekBanner = ({ weekStart, weekEnd, isLogged, loggedDate }: CurrentWeekBannerProps) => {
  const startDate = format(new Date(weekStart), "MMMM d");
  const endDate = format(new Date(weekEnd), "MMMM d, yyyy");

  return (
    <div className="mx-auto mb-8 max-w-[1200px] rounded-xl border border-border-subtle bg-bg-secondary p-6 sm:px-8">
      <h2 className="mb-2 font-display text-lg font-bold text-white sm:text-xl">
        Week of {startDate} - {endDate}
      </h2>
      
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-2">
          {isLogged ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="font-mono text-sm font-bold text-success uppercase">
                Week logged on {format(new Date(loggedDate!), "MMM d, h:mm a")}
              </span>
            </>
          ) : (
            <>
              <Clock className="h-4 w-4 text-text-tertiary" />
              <span className="font-mono text-sm text-text-secondary uppercase">
                Not logged yet
              </span>
            </>
          )}
        </div>

        <p className="text-sm leading-relaxed text-text-tertiary">
          {isLogged 
            ? "Come back next week to continue tracking." 
            : "Log your numbers below to track this week's progress."
          }
        </p>
      </div>
    </div>
  );
};
