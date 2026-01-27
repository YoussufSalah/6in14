"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/universal/Button";
import { PriorityLevel, ImpactLevel, calculateGoalScore } from "@/lib/scoring";
import { useDecisionFatigueStore } from "@/store/decisionFatigueStore";
import { format, addDays } from "date-fns";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  editGoalId?: string | null;
}

export const AddGoalModal = ({ isOpen, onClose, editGoalId }: AddGoalModalProps) => {
  const { goals, addGoal, updateGoal } = useDecisionFatigueStore();
  
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<PriorityLevel>("medium");
  const [deadline, setDeadline] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd"));
  const [impact, setImpact] = useState<ImpactLevel>("medium");
  const [showCustomPriority, setShowCustomPriority] = useState(false);
  const [showCustomImpact, setShowCustomImpact] = useState(false);

  useEffect(() => {
    if (editGoalId) {
      const g = goals.find((goal) => goal.id === editGoalId);
      if (g) {
        setName(g.name);
        setPriority(g.priority);
        setDeadline(g.deadline);
        setImpact(g.impact);
        setShowCustomPriority(typeof g.priority === "number");
        setShowCustomImpact(typeof g.impact === "number");
      }
    } else {
      setName("");
      setPriority("medium");
      setDeadline(format(addDays(new Date(), 7), "yyyy-MM-dd"));
      setImpact("medium");
      setShowCustomPriority(false);
      setShowCustomImpact(false);
    }
  }, [editGoalId, goals, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goalData = { name, priority, deadline, impact };
    
    if (editGoalId) {
      updateGoal(editGoalId, goalData);
    } else {
      addGoal(goalData);
    }
    onClose();
  };

  const previewScore = calculateGoalScore({
    id: "preview",
    name,
    priority,
    deadline,
    impact,
  });

  const OptionButton = ({ 
    active, 
    onClick, 
    children 
  }: { 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode 
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border-2 p-3 text-sm font-medium transition-all ${
        active 
          ? "border-app-1 bg-app-1/10 text-app-1" 
          : "border-border-subtle bg-bg-tertiary text-text-secondary hover:border-border-strong"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[600px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle p-6">
          <h2 className="font-display text-2xl font-bold">
            {editGoalId ? "Edit Goal" : "Add New Goal"}
          </h2>
          <button onClick={onClose} className="rounded-md p-2 text-text-tertiary hover:bg-bg-tertiary hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto p-8">
          <div className="space-y-6">
            {/* Goal Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">What are you working on?</label>
              <input
                autoFocus
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Launch Framo MVP"
                className="w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 py-3 text-white focus:border-app-1 focus:outline-none focus:ring-2 focus:ring-app-1/10"
              />
              <p className="mt-2 text-xs text-text-tertiary">Be specific. This is what you'll see every day.</p>
            </div>

            {/* Priority */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">Priority Level</label>
              <div className="grid grid-cols-4 gap-3">
                {["Low", "Medium", "High"].map((lev) => (
                  <OptionButton 
                    key={lev}
                    active={priority === lev.toLowerCase() && !showCustomPriority}
                    onClick={() => {
                      setPriority(lev.toLowerCase() as PriorityLevel);
                      setShowCustomPriority(false);
                    }}
                  >
                    {lev}
                  </OptionButton>
                ))}
                <OptionButton 
                  active={showCustomPriority} 
                  onClick={() => setShowCustomPriority(true)}
                >
                  Custom
                </OptionButton>
              </div>
              {showCustomPriority && (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={typeof priority === "number" ? priority : ""}
                  onChange={(e) => setPriority(parseInt(e.target.value) || 0)}
                  placeholder="0-100%"
                  className="mt-3 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 py-2 text-white focus:border-app-1 focus:outline-none"
                />
              )}
            </div>

            {/* Deadline */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">Deadline</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 py-3 text-white focus:border-app-1 focus:outline-none"
                />
              </div>
              <p className="mt-2 text-xs text-app-1 font-mono">
                {format(new Date(deadline), "PPP")}
              </p>
            </div>

            {/* Impact */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">Impact Level</label>
              <div className="grid grid-cols-4 gap-3">
                {["Low", "Medium", "High"].map((lev) => (
                  <OptionButton 
                    key={lev}
                    active={impact === lev.toLowerCase() && !showCustomImpact}
                    onClick={() => {
                      setImpact(lev.toLowerCase() as ImpactLevel);
                      setShowCustomImpact(false);
                    }}
                  >
                    {lev}
                  </OptionButton>
                ))}
                <OptionButton 
                  active={showCustomImpact} 
                  onClick={() => setShowCustomImpact(true)}
                >
                  Custom
                </OptionButton>
              </div>
              {showCustomImpact && (
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={typeof impact === "number" ? impact : ""}
                  onChange={(e) => setImpact(parseInt(e.target.value) || 0)}
                  placeholder="0-100%"
                  className="mt-3 w-full rounded-lg border border-border-subtle bg-bg-tertiary px-4 py-2 text-white focus:border-app-1 focus:outline-none"
                />
              )}
            </div>

            {/* Score Preview */}
            <div className="rounded-lg border border-app-1/30 bg-app-1/10 p-4 text-center">
              <span className="text-sm font-medium text-text-secondary uppercase tracking-widest block mb-1">Estimated Score</span>
              <span className="font-mono text-3xl font-bold text-app-1">{previewScore.toFixed(2)} / 100</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex gap-3">
            <Button variant="secondary" onClick={onClose} fullWidth>Cancel</Button>
            <Button type="submit" fullWidth>{editGoalId ? "Save Changes" : "Add Goal"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
