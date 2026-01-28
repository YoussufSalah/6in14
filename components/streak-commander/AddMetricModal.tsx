"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/universal/Button";
import { useStreakCommanderStore } from "@/store/streakCommanderStore";

interface AddMetricModalProps {
  isOpen: boolean;
  onClose: () => void;
  editMetricId?: string | null;
}

export const AddMetricModal = ({ isOpen, onClose, editMetricId }: AddMetricModalProps) => {
  const { metrics, addMetric, updateMetric } = useStreakCommanderStore();
  const [name, setName] = useState("");

  useEffect(() => {
    if (editMetricId) {
      const m = metrics.find(metric => metric.id === editMetricId);
      if (m) setName(m.name);
    } else {
      setName("");
    }
  }, [editMetricId, metrics, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editMetricId) {
      updateMetric(editMetricId, name.trim());
    } else {
      addMetric(name.trim());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border-subtle p-6">
          <h2 className="font-display text-2xl font-bold">
            {editMetricId ? "Edit Metric" : "Add New Metric"}
          </h2>
          <button onClick={onClose} className="rounded-md p-2 text-text-tertiary hover:bg-bg-tertiary hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-8">
            <label className="mb-2 block text-sm font-semibold text-white">Metric Name</label>
            <input
              autoFocus
              type="text"
              maxLength={30}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Training, Posting on X, Coding"
              className="w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 py-3 text-white focus:border-app-2 focus:outline-none focus:ring-2 focus:ring-app-2/10"
            />
            <div className="mt-2 flex justify-between text-[10px] font-mono text-text-tertiary">
              <span>What do you want to track daily?</span>
              <span>{name.length}/30</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
            <Button type="submit" fullWidth className="bg-app-2 hover:bg-app-2-light border-none">
              {editMetricId ? "Save Changes" : "Add Metric"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
