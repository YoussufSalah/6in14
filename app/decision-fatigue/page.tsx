"use client";

import React, { useState, useMemo } from "react";
import { Layout } from "@/components/universal/Layout";
import { TheOneTask } from "@/components/decision-fatigue/TheOneTask";
import { GoalCard } from "@/components/decision-fatigue/GoalCard";
import { AddGoalModal } from "@/components/decision-fatigue/AddGoalModal";
import { useDecisionFatigueStore } from "@/store/decisionFatigueStore";
import { Button } from "@/components/universal/Button";
import { Plus, Target, CheckCircle2 } from "lucide-react";

export default function DecisionFatiguePage() {
  const { 
    goals, 
    deleteGoal, 
    toggleComplete, 
    skipGoal, 
    getSortedGoals, 
    getTopGoal 
  } = useDecisionFatigueStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editGoalId, setEditGoalId] = useState<string | null>(null);

  const sortedGoals = useMemo(() => getSortedGoals(), [goals]);
  const topGoal = useMemo(() => getTopGoal(), [goals]);

  const handleEdit = (id: string) => {
    setEditGoalId(id);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditGoalId(null);
    setIsModalOpen(true);
  };

  return (
    <Layout 
      appName="Decision Fatigue" 
      appAccent="var(--app-1-accent)"
    >
      <div className="space-y-12">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-display text-4xl font-bold text-white">Decision Fatigue</h2>
            <p className="text-lg text-text-secondary">Your mission for today, calculated from your goals.</p>
            
            <div className="mt-4 flex items-center gap-3 font-mono text-sm text-app-1">
              <span>{sortedGoals.length} active goals</span>
              <span>•</span>
              <span>Top priority locked</span>
            </div>
          </div>
          <Button onClick={handleAdd} className="h-12 px-8">
            <Plus className="mr-2 h-5 w-5" />
            Add Goal
          </Button>
        </div>

        {/* The One Task Section */}
        <section className="py-8">
          {topGoal ? (
            <TheOneTask 
              goal={topGoal} 
              onComplete={toggleComplete} 
              onSkip={skipGoal} 
            />
          ) : sortedGoals.length === 0 && goals.length > 0 ? (
            /* All goals skipped or completed state */
            <div className="mx-auto max-w-[600px] rounded-2xl border-2 border-dashed border-border-subtle bg-bg-secondary/50 p-12 text-center">
              <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-success opacity-50" />
              <h3 className="mb-2 font-display text-2xl font-bold">All clear.</h3>
              <p className="mb-8 text-text-secondary">You've completed or skipped all goals for today. Add new goals or come back tomorrow.</p>
              <Button variant="secondary" onClick={handleAdd}>
                Add New Goal
              </Button>
            </div>
          ) : (
            /* No goals yet state */
            <div className="mx-auto max-w-[600px] rounded-2xl border-2 border-dashed border-border-subtle bg-bg-secondary/50 p-12 text-center">
              <Target className="mx-auto mb-6 h-16 w-16 text-app-1 opacity-50" />
              <h3 className="mb-2 font-display text-2xl font-bold">Add your first goal.</h3>
              <p className="mb-8 text-text-secondary">Tell me what you're working on, and I'll tell you what to focus on first.</p>
              <Button onClick={handleAdd}>
                Add Goal
              </Button>
            </div>
          )}
        </section>

        {/* All Goals List Section */}
        {sortedGoals.length > 0 && (
          <section className="space-y-8 pb-12 gap-8">
            <div className="flex items-center justify-between border-b border-border-subtle pb-4">
              <h3 className="font-display text-2xl font-bold">All Goals ({sortedGoals.length})</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedGoals.map((goal, index) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  rank={index + 1}
                  onEdit={handleEdit}
                  onDelete={deleteGoal}
                />
              ))}
              
              {/* Add New Goal Card (Placeholder) */}
              <button
                onClick={handleAdd}
                className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border-strong bg-transparent text-text-secondary transition-all hover:border-app-1 hover:bg-app-1/5 hover:text-app-1"
              >
                <Plus className="mb-2 h-8 w-8" />
                <span className="font-medium font-display">Add Another Goal</span>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* Modals */}
      <AddGoalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editGoalId={editGoalId} 
      />
    </Layout>
  );
}
