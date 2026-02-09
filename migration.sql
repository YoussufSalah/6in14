-- 6in14 PRODUCTION SCHEMA MIGRATION
-- Run this in your Supabase SQL Editor

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES

-- Decision Fatigue
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  priority_custom NUMERIC(5,2),
  deadline DATE NOT NULL,
  impact TEXT NOT NULL CHECK (impact IN ('low', 'medium', 'high')),
  impact_custom NUMERIC(5,2),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  skipped_at DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Streak Commander
CREATE TABLE streak_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE streak_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  metric_id UUID REFERENCES streak_metrics(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('done', 'missed', 'rest', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(metric_id, date)
);

-- Weekly War Map
CREATE TABLE war_map_weeks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_id DATE NOT NULL,
  locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_id)
);

CREATE TABLE war_map_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_id UUID REFERENCES war_map_weeks(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  priority INTEGER NOT NULL CHECK (priority IN (1, 2, 3)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE war_map_subtasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES war_map_tasks(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Energy Monitor
CREATE TABLE energy_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  sleep NUMERIC(4,2) NOT NULL CHECK (sleep >= 0 AND sleep <= 12),
  mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
  fatigue INTEGER NOT NULL CHECK (fatigue >= 1 AND fatigue <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Silent Reminders
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  fire_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'fired')),
  fired_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress Radar
CREATE TABLE progress_weeks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_id DATE NOT NULL,
  users INTEGER NOT NULL DEFAULT 0,
  revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  posts INTEGER NOT NULL DEFAULT 0,
  training INTEGER NOT NULL DEFAULT 0,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_id)
);

CREATE TABLE progress_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  currency_symbol TEXT DEFAULT '$',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_energy_entries_updated_at BEFORE UPDATE ON energy_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_progress_settings_updated_at BEFORE UPDATE ON progress_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. ENABLE RLS
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE streak_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE streak_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE war_map_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE war_map_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE war_map_subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_settings ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES

-- Common Auth Helper: auth.uid() = user_id

-- Goals
CREATE POLICY "Users can view their own goals" ON goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own goals" ON goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own goals" ON goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own goals" ON goals FOR DELETE USING (auth.uid() = user_id);

-- Streak Metrics
CREATE POLICY "Users can view their own metrics" ON streak_metrics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own metrics" ON streak_metrics FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own metrics" ON streak_metrics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own metrics" ON streak_metrics FOR DELETE USING (auth.uid() = user_id);

-- Streak History
CREATE POLICY "Users can view their own history" ON streak_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own history" ON streak_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own history" ON streak_history FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own history" ON streak_history FOR DELETE USING (auth.uid() = user_id);

-- War Map
CREATE POLICY "Users can view their own weeks" ON war_map_weeks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own weeks" ON war_map_weeks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own weeks" ON war_map_weeks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own weeks" ON war_map_weeks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own tasks" ON war_map_tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own tasks" ON war_map_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own tasks" ON war_map_tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own tasks" ON war_map_tasks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own subtasks" ON war_map_subtasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own subtasks" ON war_map_subtasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own subtasks" ON war_map_subtasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own subtasks" ON war_map_subtasks FOR DELETE USING (auth.uid() = user_id);

-- Energy
CREATE POLICY "Users can view their own entries" ON energy_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own entries" ON energy_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own entries" ON energy_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own entries" ON energy_entries FOR DELETE USING (auth.uid() = user_id);

-- Reminders
CREATE POLICY "Users can view their own reminders" ON reminders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own reminders" ON reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reminders" ON reminders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reminders" ON reminders FOR DELETE USING (auth.uid() = user_id);

-- Progress
CREATE POLICY "Users can view their own progress weeks" ON progress_weeks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress weeks" ON progress_weeks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress weeks" ON progress_weeks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own progress weeks" ON progress_weeks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own progress settings" ON progress_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress settings" ON progress_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress settings" ON progress_settings FOR UPDATE USING (auth.uid() = user_id);
