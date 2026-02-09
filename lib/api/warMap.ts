import { supabase } from '@/lib/supabase';
import { WarTask, Subtask } from '@/lib/warMapLogic';

export async function fetchWeek(weekId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data: week, error: weekError } = await supabase
    .from('war_map_weeks')
    .select(`
      *,
      tasks:war_map_tasks(
        *,
        subtasks:war_map_subtasks(*)
      )
    `)
    .eq('user_id', user.id)
    .eq('week_id', weekId)
    .maybeSingle();
  
  if (weekError) throw weekError;
  return week;
}

export async function createWeek(weekId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data, error } = await supabase
    .from('war_map_weeks')
    .insert({ user_id: user.id, week_id: weekId })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function addTask(weekId: string, task: Omit<WarTask, 'id' | 'subtasks'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data: week } = await supabase
    .from('war_map_weeks')
    .select('id')
    .eq('user_id', user.id)
    .eq('week_id', weekId)
    .single();

  if (!week) throw new Error("Week not found in database");

  const { data, error } = await supabase
    .from('war_map_tasks')
    .insert({ 
      user_id: user.id, 
      week_id: week.id, 
      name: task.name, 
      priority: task.priority 
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function addSubtask(taskId: string, name: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data, error } = await supabase
    .from('war_map_subtasks')
    .insert({ user_id: user.id, task_id: taskId, text: name, completed: false })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function toggleSubtask(subtaskId: string, completed: boolean) {
  const { error } = await supabase
    .from('war_map_subtasks')
    .update({ completed })
    .eq('id', subtaskId);
  
  if (error) throw error;
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from('war_map_tasks')
    .delete()
    .eq('id', taskId);
  
  if (error) throw error;
}

export async function updateWeekStatus(weekId: string, locked: boolean) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { error } = await supabase
    .from('war_map_weeks')
    .update({ 
      locked, 
      locked_at: locked ? new Date().toISOString() : null 
    })
    .eq('user_id', user.id)
    .eq('week_id', weekId);
  
  if (error) throw error;
}

export async function markWeekCompleted(weekId: string, completed: boolean) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { error } = await supabase
    .from('war_map_weeks')
    .update({ 
      completed_at: completed ? new Date().toISOString() : null 
    })
    .eq('user_id', user.id)
    .eq('week_id', weekId);
  
  if (error) throw error;
}
