import { supabase } from '@/lib/supabase';
import { Goal, PriorityLevel, ImpactLevel } from '@/lib/scoring';

export async function fetchGoals() {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('deadline', { ascending: true });
  
  if (error) throw error;

  return data.map(g => ({
    id: g.id,
    name: g.name,
    priority: g.priority_custom ? Number(g.priority_custom) : g.priority as PriorityLevel,
    deadline: g.deadline,
    impact: g.impact_custom ? Number(g.impact_custom) : g.impact as ImpactLevel,
    completed: g.completed,
    completedAt: g.completed_at,
    skippedAt: g.skipped_at // I might need to add this to the table if it's missing in my SQL script
  })) as Goal[];
}

export async function addGoal(goal: Omit<Goal, 'id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const isPriorityCustom = typeof goal.priority === "number";
  const isImpactCustom = typeof goal.impact === "number";

  const { data, error } = await supabase
    .from('goals')
    .insert({
      user_id: user.id,
      name: goal.name,
      priority: isPriorityCustom ? 'medium' : goal.priority, // placeholder if custom
      priority_custom: isPriorityCustom ? goal.priority : null,
      deadline: goal.deadline,
      impact: isImpactCustom ? 'medium' : goal.impact,
      impact_custom: isImpactCustom ? goal.impact : null,
      completed: !!goal.completed,
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateGoal(id: string, updates: Partial<Goal>) {
  const dbUpdates: any = {};
  if (updates.name !== undefined) dbUpdates.name = updates.name;
  if (updates.deadline !== undefined) dbUpdates.deadline = updates.deadline;
  if (updates.completed !== undefined) {
    dbUpdates.completed = updates.completed;
    dbUpdates.completed_at = updates.completed ? new Date().toISOString() : null;
  }
  if (updates.skippedAt !== undefined) dbUpdates.skipped_at = updates.skippedAt;

  if (updates.priority !== undefined) {
    const isCustom = typeof updates.priority === "number";
    dbUpdates.priority = isCustom ? 'medium' : updates.priority;
    dbUpdates.priority_custom = isCustom ? updates.priority : null;
  }

  if (updates.impact !== undefined) {
    const isCustom = typeof updates.impact === "number";
    dbUpdates.impact = isCustom ? 'medium' : updates.impact;
    dbUpdates.impact_custom = isCustom ? updates.impact : null;
  }

  const { data, error } = await supabase
    .from('goals')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteGoal(id: string) {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
