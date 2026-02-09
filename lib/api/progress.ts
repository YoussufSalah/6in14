import { supabase } from '@/lib/supabase';
import { ProgressWeek, ProgressSettings } from '@/lib/progressRadarLogic';

export async function fetchSettings() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { data, error } = await supabase
    .from('progress_settings')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();
  
  if (error) throw error;
  return data ? { currencySymbol: data.currency_symbol } : { currencySymbol: '$' };
}

export async function upsertSettings(settings: ProgressSettings) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { error } = await supabase
    .from('progress_settings')
    .upsert({
      user_id: user.id,
      currency_symbol: settings.currencySymbol,
      updated_at: new Date().toISOString()
    });
  
  if (error) throw error;
}

export async function fetchProgressWeeks(startDate: string) {
  const { data, error } = await supabase
    .from('progress_weeks')
    .select('*')
    .gte('week_id', startDate)
    .order('week_id', { ascending: true });
  
  if (error) throw error;
  return data.map(w => ({
    weekId: w.week_id,
    users: w.users,
    revenue: Number(w.revenue),
    posts: w.posts,
    training: w.training
  })) as ProgressWeek[];
}

export async function upsertProgressWeek(week: ProgressWeek) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Authenticated user not found");

  const { error } = await supabase
    .from('progress_weeks')
    .upsert({
      user_id: user.id,
      week_id: week.weekId,
      users: week.users,
      revenue: week.revenue,
      posts: week.posts,
      training: week.training,
      logged_at: new Date().toISOString()
    }, { onConflict: 'user_id,week_id' });
  
  if (error) throw error;
}
