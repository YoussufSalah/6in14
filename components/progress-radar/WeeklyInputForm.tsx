"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/universal/Button";
import { WeeklyEntry } from "@/lib/progressRadarLogic";

interface WeeklyInputFormProps {
  onLog: (metrics: WeeklyEntry['metrics']) => void;
  existingEntry?: WeeklyEntry;
}

export const WeeklyInputForm = ({ onLog, existingEntry }: WeeklyInputFormProps) => {
  const [users, setUsers] = useState<string>("");
  const [revenue, setRevenue] = useState<string>("");
  const [posts, setPosts] = useState<string>("");
  const [training, setTraining] = useState<string>("");

  useEffect(() => {
    if (existingEntry) {
      setUsers(existingEntry.metrics.users.toString());
      setRevenue(existingEntry.metrics.revenue.toString());
      setPosts(existingEntry.metrics.posts.toString());
      setTraining(existingEntry.metrics.training.toString());
    }
  }, [existingEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLog({
      users: Math.max(0, Number(users) || 0),
      revenue: Math.max(0, Number(revenue) || 0),
      posts: Math.max(0, Number(posts) || 0),
      training: Math.max(0, Number(training) || 0),
    });
  };

  const isComplete = users && revenue && posts && training;

  return (
    <div className="mx-auto max-w-[800px] rounded-2xl border border-border-subtle bg-bg-secondary p-8 sm:p-10">
      <h2 className="mb-2 font-display text-2xl font-bold text-white">
        {existingEntry ? "Edit This Week's Numbers" : "Log This Week's Numbers"}
      </h2>
      <p className="mb-8 text-sm text-text-secondary leading-relaxed">
        Enter your metrics for the week. Be honest. Growth shows in the trend, not a single week.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Users */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-white">Users</label>
            <input 
              type="number"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
              placeholder="e.g., 142"
              className="h-12 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 font-mono text-lg text-white transition-all focus:border-app-6 focus:outline-none focus:ring-2 focus:ring-app-6/15"
            />
            <p className="mt-2 text-[10px] uppercase tracking-wider text-text-tertiary">
              Total users or signups
            </p>
          </div>

          {/* Revenue */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-white">Revenue ($)</label>
            <input 
              type="number"
              step="0.01"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="e.g., 1250.00"
              className="h-12 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 font-mono text-lg text-white transition-all focus:border-app-6 focus:outline-none focus:ring-2 focus:ring-app-6/15"
            />
            <p className="mt-2 text-[10px] uppercase tracking-wider text-text-tertiary">
              Weekly revenue total
            </p>
          </div>

          {/* Posts */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-white">Content Posted</label>
            <input 
              type="number"
              value={posts}
              onChange={(e) => setPosts(e.target.value)}
              placeholder="e.g., 5"
              className="h-12 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 font-mono text-lg text-white transition-all focus:border-app-6 focus:outline-none focus:ring-2 focus:ring-app-6/15"
            />
            <p className="mt-2 text-[10px] uppercase tracking-wider text-text-tertiary">
              Blog posts, tweets, videos
            </p>
          </div>

          {/* Training */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-white">Training Sessions</label>
            <input 
              type="number"
              value={training}
              onChange={(e) => setTraining(e.target.value)}
              placeholder="e.g., 4"
              className="h-12 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 font-mono text-lg text-white transition-all focus:border-app-6 focus:outline-none focus:ring-2 focus:ring-app-6/15"
            />
            <p className="mt-2 text-[10px] uppercase tracking-wider text-text-tertiary">
              Gym, sports, or workouts
            </p>
          </div>
        </div>

        <div>
          <Button 
            type="submit"
            disabled={!isComplete}
            className="h-14 w-full bg-gradient-to-r from-app-6 to-app-6-light text-lg font-bold shadow-[0_4px_16px_rgba(236,72,153,0.25)] hover:shadow-[0_8px_24px_rgba(236,72,153,0.35)]"
          >
            {existingEntry ? "Update This Week" : "Log This Week"}
          </Button>
          <p className="mt-4 text-center font-mono text-[10px] italic text-text-tertiary">
            You can edit this week's data anytime before next week starts.
          </p>
        </div>
      </form>
    </div>
  );
};
