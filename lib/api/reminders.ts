import { supabase } from '@/lib/supabase';
import { Reminder } from '@/store/reminderStore';

export async function fetchReminders() {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .order('fire_at', { ascending: true });
  
  if (error) throw error;
  return data.map(r => ({
    id: r.id,
    text: r.text,
    fireAt: r.fire_at,
    status: r.status,
    firedAt: r.fired_at,
    timer: null // Timers are local-only
  })) as Reminder[];
}

export async function addReminder(reminder: Omit<Reminder, 'id' | 'timer' | 'status' | 'firedAt'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data, error } = await supabase
    .from('reminders')
    .insert({
      user_id: user.id,
      text: reminder.text,
      fire_at: reminder.fireAt,
      status: 'active'
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function markFired(id: string) {
  const { error } = await supabase
    .from('reminders')
    .update({ 
      status: 'fired',
      fired_at: new Date().toISOString()
    })
    .eq('id', id);
  
  if (error) throw error;
}

export async function deleteReminder(id: string) {
  const { error } = await supabase
    .from('reminders')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}
