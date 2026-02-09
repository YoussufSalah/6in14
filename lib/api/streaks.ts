import { supabase } from '@/lib/supabase';
import { MetricStatus } from '@/lib/streakLogic';

export async function fetchMetrics() {
  const { data, error } = await supabase
    .from('streak_metrics')
    .select('*')
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function fetchHistory(metricIds: string[], startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('streak_history')
    .select('*')
    .in('metric_id', metricIds)
    .gte('date', startDate)
    .lte('date', endDate);
  
  if (error) throw error;
  return data;
}

export async function addMetric(name: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data, error } = await supabase
    .from('streak_metrics')
    .insert({ user_id: user.id, name })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteMetric(id: string) {
  const { error } = await supabase
    .from('streak_metrics')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

export async function updateMetric(id: string, name: string) {
  const { error } = await supabase
    .from('streak_metrics')
    .update({ name })
    .eq('id', id);
  
  if (error) throw error;
}

export async function upsertStatus(metricId: string, date: string, status: MetricStatus) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data, error } = await supabase
    .from('streak_history')
    .upsert({
      user_id: user.id,
      metric_id: metricId,
      date,
      status
    }, { onConflict: 'metric_id,date' })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function flushStalePending(date: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Change all 'pending' status older than today to 'missed'
  const { error } = await supabase
    .from('streak_history')
    .update({ status: 'missed' })
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .lt('date', date);
  
  if (error) throw error;
}
