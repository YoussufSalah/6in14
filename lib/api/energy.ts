import { supabase } from '@/lib/supabase';
import { EnergyLog } from '@/lib/energyLogic';

export async function fetchEntries(startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from('energy_entries')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data.map(e => ({
    date: e.date,
    sleep: Number(e.sleep),
    mood: e.mood,
    fatigue: e.fatigue,
    timestamp: e.created_at
  })) as EnergyLog[];
}

export async function upsertEntry(entry: Omit<EnergyLog, 'timestamp'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data, error } = await supabase
    .from('energy_entries')
    .upsert({
      user_id: user.id,
      date: entry.date,
      sleep: entry.sleep,
      mood: entry.mood,
      fatigue: entry.fatigue
    }, { onConflict: 'user_id,date' })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteEntry(date: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { error } = await supabase
    .from('energy_entries')
    .delete()
    .eq('user_id', user.id)
    .eq('date', date);
  
  if (error) throw error;
}
