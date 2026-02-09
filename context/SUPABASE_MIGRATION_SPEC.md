# Supabase Migration Specification
**From localStorage to Production Database**

---

## 🎯 Migration Overview

**What We're Doing:**
- Setting up Supabase project with PostgreSQL database
- Implementing email/password + magic link authentication
- Creating 6 tables (one per app) with proper schemas
- Writing Row Level Security (RLS) policies for data isolation
- Replacing all localStorage logic with Supabase queries
- Preserving existing user data during migration (optional migration script)

**What Changes:**
- Auth: localStorage → Supabase Auth (JWT-based sessions)
- Data: localStorage → PostgreSQL with RLS
- State management: Direct storage calls → Supabase client queries

**What Stays the Same:**
- All UI components and logic
- All calculation functions
- All animations and interactions
- App routing and structure

---

## 📦 PART 1: SUPABASE PROJECT SETUP

### 1.1 Create Supabase Project

```bash
# Go to: https://supabase.com/dashboard
# Click: "New Project"
# Fill in:
#   - Project name: "6in14-production" (or your choice)
#   - Database password: [Generate a strong one, save it]
#   - Region: Choose closest to your users
#   - Pricing plan: Free tier is fine for MVP
# Click: "Create new project"
# Wait ~2 minutes for provisioning
```

### 1.2 Get Your Project Credentials

Once the project is created, go to **Settings → API**

You'll need these two values:

```
PROJECT_URL:     https://[your-project-ref].supabase.co
ANON_PUBLIC_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (long string)
```

**CRITICAL:** The `ANON_PUBLIC_KEY` is safe to expose in frontend code. The `SERVICE_ROLE_KEY` is **NOT** — never put it in your frontend.

### 1.3 Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 1.4 Create Supabase Client Instance

Create a file: `/src/lib/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})
```

### 1.5 Environment Variables

Create `.env` file in project root:

```
VITE_SUPABASE_URL=https://[your-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Add `.env` to `.gitignore`:

```
# .gitignore
.env
.env.local
.env.production
```

---

## 🔐 PART 2: AUTHENTICATION SETUP

### 2.1 Enable Auth Providers

Go to **Authentication → Providers** in Supabase dashboard:

- ✅ **Email** — Already enabled by default
- ✅ **Magic Link** — Toggle ON
- ❌ Disable all OAuth providers (Google, GitHub, etc.) unless you want them

### 2.2 Configure Email Settings

Go to **Authentication → Email Templates**

**Confirm Signup:**
```html
<h2>Confirm your signup</h2>
<p>Click the link below to confirm your email address:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm Email</a></p>
```

**Magic Link:**
```html
<h2>Your magic link</h2>
<p>Click the link below to sign in:</p>
<p><a href="{{ .ConfirmationURL }}">Sign In</a></p>
```

**Password Recovery:**
```html
<h2>Reset your password</h2>
<p>Click the link below to reset your password:</p>
<p><a href="{{ .ConfirmationURL }}">Reset Password</a></p>
```

### 2.3 Set Redirect URLs

Go to **Authentication → URL Configuration**

Add these to **Redirect URLs:**
```
http://localhost:5173
http://localhost:5173/**
https://yourdomain.com
https://yourdomain.com/**
```

### 2.4 Auth Helper Functions

Create `/src/lib/auth.js`:

```javascript
import { supabase } from './supabase'

// Sign up with email/password
export async function signUp(email, password, metadata = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata // Optional: { name: 'John Doe' }
    }
  })
  
  if (error) throw error
  return data
}

// Sign in with email/password
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data
}

// Sign in with magic link
export async function signInWithMagicLink(email) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin
    }
  })
  
  if (error) throw error
  return data
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Get current session
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}

// Get current user
export async function getUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) throw error
  return data.user
}

// Reset password request
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  })
  
  if (error) throw error
  return data
}

// Update password (after reset)
export async function updatePassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  
  if (error) throw error
  return data
}

// Listen to auth state changes
export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session)
  })
}
```

### 2.5 Auth Context Provider

Create `/src/contexts/AuthContext.jsx`:

```javascript
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    session,
    loading,
    signOut: () => supabase.auth.signOut()
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
```

### 2.6 Protected Route Component

Create `/src/components/ProtectedRoute.jsx`:

```javascript
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
```

---

## 🗄️ PART 3: DATABASE SCHEMA

### 3.1 Run SQL Editor

Go to **SQL Editor** in Supabase dashboard. Run each of these SQL blocks one at a time.

### 3.2 Enable UUID Extension

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 3.3 Table 1: Decision Fatigue (Goals)

```sql
-- Decision Fatigue: Goals table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  priority_custom NUMERIC(5,2), -- For custom percentage (0-100)
  deadline DATE NOT NULL,
  impact TEXT NOT NULL CHECK (impact IN ('low', 'medium', 'high')),
  impact_custom NUMERIC(5,2), -- For custom percentage (0-100)
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_completed ON goals(user_id, completed);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3.4 Table 2: Streak Commander (Metrics)

```sql
-- Streak Commander: Metrics table
CREATE TABLE streak_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Streak history entries
CREATE TABLE streak_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  metric_id UUID REFERENCES streak_metrics(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('done', 'missed', 'rest', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(metric_id, date) -- One entry per metric per day
);

-- Indexes
CREATE INDEX idx_streak_metrics_user_id ON streak_metrics(user_id);
CREATE INDEX idx_streak_history_user_id ON streak_history(user_id);
CREATE INDEX idx_streak_history_metric_date ON streak_history(metric_id, date DESC);
```

### 3.5 Table 3: Weekly War Map (Weeks & Tasks)

```sql
-- Weekly War Map: Weeks table
CREATE TABLE war_map_weeks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_id DATE NOT NULL, -- Sunday's date
  locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_id) -- One week entry per user per week
);

-- Tasks for each week
CREATE TABLE war_map_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_id UUID REFERENCES war_map_weeks(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  priority INTEGER NOT NULL CHECK (priority IN (1, 2, 3)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subtasks for each task
CREATE TABLE war_map_subtasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  task_id UUID REFERENCES war_map_tasks(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_war_map_weeks_user_id ON war_map_weeks(user_id);
CREATE INDEX idx_war_map_tasks_week_id ON war_map_tasks(week_id);
CREATE INDEX idx_war_map_subtasks_task_id ON war_map_subtasks(task_id);
```

### 3.6 Table 4: Energy Monitor (Daily Entries)

```sql
-- Energy Monitor: Daily entries table
CREATE TABLE energy_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  sleep NUMERIC(4,2) NOT NULL CHECK (sleep >= 0 AND sleep <= 12), -- 0-12 hours
  mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5), -- 1-5 scale
  fatigue INTEGER NOT NULL CHECK (fatigue >= 1 AND fatigue <= 10), -- 1-10 scale
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date) -- One entry per user per day
);

-- Index
CREATE INDEX idx_energy_entries_user_date ON energy_entries(user_id, date DESC);

-- Updated_at trigger
CREATE TRIGGER update_energy_entries_updated_at
  BEFORE UPDATE ON energy_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3.7 Table 5: Silent Reminders (Reminders)

```sql
-- Silent Reminders: Reminders table
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  fire_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'fired')),
  fired_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_reminders_user_status ON reminders(user_id, status);
CREATE INDEX idx_reminders_fire_at ON reminders(user_id, fire_at);
```

### 3.8 Table 6: Progress Radar (Weekly Metrics)

```sql
-- Progress Radar: Weekly metrics table
CREATE TABLE progress_weeks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_id DATE NOT NULL, -- Sunday's date
  users INTEGER NOT NULL DEFAULT 0,
  revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  posts INTEGER NOT NULL DEFAULT 0,
  training INTEGER NOT NULL DEFAULT 0,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, week_id) -- One entry per user per week
);

-- User settings (currency symbol, etc.)
CREATE TABLE progress_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  currency_symbol TEXT DEFAULT '$',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_progress_weeks_user_id ON progress_weeks(user_id, week_id DESC);

-- Updated_at trigger for settings
CREATE TRIGGER update_progress_settings_updated_at
  BEFORE UPDATE ON progress_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## 🔒 PART 4: ROW LEVEL SECURITY (RLS)

### 4.1 What is RLS?

Row Level Security ensures users can only access their own data. Even if someone gets your `ANON_PUBLIC_KEY`, they cannot query other users' rows. Supabase enforces this at the database level.

### 4.2 Enable RLS on All Tables

```sql
-- Enable RLS on all tables
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
```

### 4.3 RLS Policies — Goals (Decision Fatigue)

```sql
-- Goals: Users can only see/edit their own goals
CREATE POLICY "Users can view their own goals"
  ON goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals"
  ON goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
  ON goals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals"
  ON goals FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.4 RLS Policies — Streak Commander

```sql
-- Streak Metrics
CREATE POLICY "Users can view their own metrics"
  ON streak_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON streak_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics"
  ON streak_metrics FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metrics"
  ON streak_metrics FOR DELETE
  USING (auth.uid() = user_id);

-- Streak History
CREATE POLICY "Users can view their own history"
  ON streak_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own history"
  ON streak_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own history"
  ON streak_history FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own history"
  ON streak_history FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.5 RLS Policies — Weekly War Map

```sql
-- War Map Weeks
CREATE POLICY "Users can view their own weeks"
  ON war_map_weeks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weeks"
  ON war_map_weeks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weeks"
  ON war_map_weeks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weeks"
  ON war_map_weeks FOR DELETE
  USING (auth.uid() = user_id);

-- War Map Tasks
CREATE POLICY "Users can view their own tasks"
  ON war_map_tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON war_map_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
  ON war_map_tasks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON war_map_tasks FOR DELETE
  USING (auth.uid() = user_id);

-- War Map Subtasks
CREATE POLICY "Users can view their own subtasks"
  ON war_map_subtasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subtasks"
  ON war_map_subtasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subtasks"
  ON war_map_subtasks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subtasks"
  ON war_map_subtasks FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.6 RLS Policies — Energy Monitor

```sql
-- Energy Entries
CREATE POLICY "Users can view their own entries"
  ON energy_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own entries"
  ON energy_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries"
  ON energy_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own entries"
  ON energy_entries FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.7 RLS Policies — Silent Reminders

```sql
-- Reminders
CREATE POLICY "Users can view their own reminders"
  ON reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
  ON reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
  ON reminders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders"
  ON reminders FOR DELETE
  USING (auth.uid() = user_id);
```

### 4.8 RLS Policies — Progress Radar

```sql
-- Progress Weeks
CREATE POLICY "Users can view their own weeks"
  ON progress_weeks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weeks"
  ON progress_weeks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weeks"
  ON progress_weeks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own weeks"
  ON progress_weeks FOR DELETE
  USING (auth.uid() = user_id);

-- Progress Settings
CREATE POLICY "Users can view their own settings"
  ON progress_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON progress_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON progress_settings FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 🔄 PART 5: MIGRATION FROM LOCALSTORAGE

### 5.1 App 1: Decision Fatigue

**Old localStorage logic:**
```javascript
const goals = JSON.parse(localStorage.getItem('decision_fatigue_goals')) || []
```

**New Supabase logic:**

Create `/src/lib/api/goals.js`:

```javascript
import { supabase } from '@/lib/supabase'

// Fetch all goals for current user
export async function fetchGoals() {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('deadline', { ascending: true })
  
  if (error) throw error
  return data
}

// Add a new goal
export async function addGoal(goal) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('goals')
    .insert({
      user_id: user.id,
      name: goal.name,
      priority: goal.priority,
      priority_custom: goal.priorityCustom || null,
      deadline: goal.deadline,
      impact: goal.impact,
      impact_custom: goal.impactCustom || null
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Update a goal
export async function updateGoal(id, updates) {
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete a goal
export async function deleteGoal(id) {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Mark goal as complete
export async function completeGoal(id) {
  const { data, error } = await supabase
    .from('goals')
    .update({
      completed: true,
      completed_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

**Usage in component:**

```javascript
import { useEffect, useState } from 'react'
import { fetchGoals, addGoal, updateGoal, deleteGoal, completeGoal } from '@/lib/api/goals'

export function DecisionFatigue() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGoals()
  }, [])

  async function loadGoals() {
    try {
      const data = await fetchGoals()
      setGoals(data)
    } catch (error) {
      console.error('Error loading goals:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleAddGoal(goalData) {
    try {
      const newGoal = await addGoal(goalData)
      setGoals([...goals, newGoal])
    } catch (error) {
      console.error('Error adding goal:', error)
    }
  }

  // ... rest of handlers
}
```

### 5.2 App 2: Streak Commander

Create `/src/lib/api/streaks.js`:

```javascript
import { supabase } from '@/lib/supabase'

// Fetch all metrics for current user
export async function fetchMetrics() {
  const { data, error } = await supabase
    .from('streak_metrics')
    .select('*')
    .order('created_at', { ascending: true })
  
  if (error) throw error
  return data
}

// Fetch history for a specific metric (or all)
export async function fetchHistory(metricId = null) {
  let query = supabase
    .from('streak_history')
    .select('*')
    .order('date', { ascending: false })
  
  if (metricId) {
    query = query.eq('metric_id', metricId)
  }
  
  const { data, error } = await query
  
  if (error) throw error
  return data
}

// Fetch metric with its history (joined query)
export async function fetchMetricsWithHistory() {
  const metrics = await fetchMetrics()
  const history = await fetchHistory()
  
  // Group history by metric_id
  const historyByMetric = history.reduce((acc, entry) => {
    if (!acc[entry.metric_id]) acc[entry.metric_id] = []
    acc[entry.metric_id].push(entry)
    return acc
  }, {})
  
  // Attach history to each metric
  return metrics.map(metric => ({
    ...metric,
    history: historyByMetric[metric.id] || []
  }))
}

// Add a new metric
export async function addMetric(name) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('streak_metrics')
    .insert({
      user_id: user.id,
      name
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Update metric name
export async function updateMetric(id, name) {
  const { data, error } = await supabase
    .from('streak_metrics')
    .update({ name })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete metric (cascade deletes history via FK)
export async function deleteMetric(id) {
  const { error } = await supabase
    .from('streak_metrics')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Answer check-in (upsert)
export async function answerCheckIn(metricId, date, status) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('streak_history')
    .upsert({
      user_id: user.id,
      metric_id: metricId,
      date,
      status
    }, {
      onConflict: 'metric_id,date'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Initialize pending entries for today
export async function initializePendingEntries(metricIds) {
  const { data: { user } } = await supabase.auth.getUser()
  const today = new Date().toISOString().split('T')[0]
  
  const entries = metricIds.map(metricId => ({
    user_id: user.id,
    metric_id: metricId,
    date: today,
    status: 'pending'
  }))
  
  // Upsert won't overwrite existing entries, only inserts missing ones
  const { data, error } = await supabase
    .from('streak_history')
    .upsert(entries, {
      onConflict: 'metric_id,date',
      ignoreDuplicates: true
    })
    .select()
  
  if (error) throw error
  return data
}

// Flush stale pending entries (convert to missed)
export async function flushStalePending() {
  const today = new Date().toISOString().split('T')[0]
  
  const { error } = await supabase
    .from('streak_history')
    .update({ status: 'missed' })
    .eq('status', 'pending')
    .lt('date', today)
  
  if (error) throw error
}
```

### 5.3 App 3: Weekly War Map

Create `/src/lib/api/warmap.js`:

```javascript
import { supabase } from '@/lib/supabase'

// Fetch week data for a specific week
export async function fetchWeek(weekId) {
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch week
  const { data: week, error: weekError } = await supabase
    .from('war_map_weeks')
    .select('*')
    .eq('user_id', user.id)
    .eq('week_id', weekId)
    .single()
  
  if (weekError) {
    if (weekError.code === 'PGRST116') return null // Not found
    throw weekError
  }
  
  // Fetch tasks for this week
  const { data: tasks, error: tasksError } = await supabase
    .from('war_map_tasks')
    .select('*, war_map_subtasks(*)')
    .eq('week_id', week.id)
    .order('priority', { ascending: true })
  
  if (tasksError) throw tasksError
  
  return { ...week, tasks }
}

// Create a new week with tasks
export async function createWeek(weekId, tasks) {
  const { data: { user } } = await supabase.auth.getUser()
  
  // Insert week
  const { data: week, error: weekError } = await supabase
    .from('war_map_weeks')
    .insert({
      user_id: user.id,
      week_id: weekId,
      locked: false
    })
    .select()
    .single()
  
  if (weekError) throw weekError
  
  // Insert tasks with subtasks
  for (const task of tasks) {
    const { data: taskData, error: taskError } = await supabase
      .from('war_map_tasks')
      .insert({
        user_id: user.id,
        week_id: week.id,
        name: task.name,
        priority: task.priority
      })
      .select()
      .single()
    
    if (taskError) throw taskError
    
    // Insert subtasks
    if (task.subtasks && task.subtasks.length > 0) {
      const subtasks = task.subtasks.map(st => ({
        user_id: user.id,
        task_id: taskData.id,
        text: st.text || st,
        completed: st.completed || false
      }))
      
      const { error: subtasksError } = await supabase
        .from('war_map_subtasks')
        .insert(subtasks)
      
      if (subtasksError) throw subtasksError
    }
  }
  
  return await fetchWeek(weekId)
}

// Lock a week
export async function lockWeek(weekId) {
  const { data, error } = await supabase
    .from('war_map_weeks')
    .update({
      locked: true,
      locked_at: new Date().toISOString()
    })
    .eq('week_id', weekId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Toggle subtask completion
export async function toggleSubtask(subtaskId, completed) {
  const { data, error } = await supabase
    .from('war_map_subtasks')
    .update({ completed })
    .eq('id', subtaskId)
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

### 5.4 App 4: Energy Monitor

Create `/src/lib/api/energy.js`:

```javascript
import { supabase } from '@/lib/supabase'

// Fetch all entries for current user (last 30 days)
export async function fetchEntries(limit = 30) {
  const { data, error } = await supabase
    .from('energy_entries')
    .select('*')
    .order('date', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data
}

// Add or update entry for a specific date (upsert)
export async function saveEntry(date, metrics) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('energy_entries')
    .upsert({
      user_id: user.id,
      date,
      sleep: metrics.sleep,
      mood: metrics.mood,
      fatigue: metrics.fatigue
    }, {
      onConflict: 'user_id,date'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete an entry
export async function deleteEntry(date) {
  const { error } = await supabase
    .from('energy_entries')
    .delete()
    .eq('date', date)
  
  if (error) throw error
}
```

### 5.5 App 5: Silent Reminders

Create `/src/lib/api/reminders.js`:

```javascript
import { supabase } from '@/lib/supabase'

// Fetch all reminders for current user
export async function fetchReminders() {
  const { data, error } = await supabase
    .from('reminders')
    .select('*')
    .order('fire_at', { ascending: true })
  
  if (error) throw error
  return data
}

// Add a new reminder
export async function addReminder(text, fireAt) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('reminders')
    .insert({
      user_id: user.id,
      text,
      fire_at: fireAt,
      status: 'active'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Mark reminder as fired
export async function markReminderFired(id) {
  const { data, error } = await supabase
    .from('reminders')
    .update({
      status: 'fired',
      fired_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete a reminder
export async function deleteReminder(id) {
  const { error } = await supabase
    .from('reminders')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Clear all fired reminders
export async function clearFiredReminders() {
  const { error } = await supabase
    .from('reminders')
    .delete()
    .eq('status', 'fired')
  
  if (error) throw error
}
```

### 5.6 App 6: Progress Radar

Create `/src/lib/api/progress.js`:

```javascript
import { supabase } from '@/lib/supabase'

// Fetch all weeks for current user
export async function fetchWeeks() {
  const { data, error } = await supabase
    .from('progress_weeks')
    .select('*')
    .order('week_id', { ascending: true })
  
  if (error) throw error
  return data
}

// Add or update a week (upsert)
export async function saveWeek(weekId, metrics) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('progress_weeks')
    .upsert({
      user_id: user.id,
      week_id: weekId,
      users: metrics.users,
      revenue: metrics.revenue,
      posts: metrics.posts,
      training: metrics.training,
      logged_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,week_id'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete a week
export async function deleteWeek(weekId) {
  const { error } = await supabase
    .from('progress_weeks')
    .delete()
    .eq('week_id', weekId)
  
  if (error) throw error
}

// Fetch user settings
export async function fetchSettings() {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('progress_settings')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No settings yet, return defaults
      return { currency_symbol: '$' }
    }
    throw error
  }
  
  return data
}

// Update user settings
export async function updateSettings(settings) {
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data, error } = await supabase
    .from('progress_settings')
    .upsert({
      user_id: user.id,
      ...settings
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}
```

---

## 🔄 PART 6: OPTIONAL LOCALSTORAGE MIGRATION

If you want to preserve existing users' localStorage data when they first log in, you can run a one-time migration.

### 6.1 Migration Script

Create `/src/lib/migration.js`:

```javascript
import { supabase } from './supabase'

export async function migrateLocalStorageToSupabase(userId) {
  const migrated = localStorage.getItem('data_migrated')
  if (migrated) return // Already migrated
  
  try {
    // Decision Fatigue
    const goals = JSON.parse(localStorage.getItem('decision_fatigue_goals') || '[]')
    if (goals.length > 0) {
      for (const goal of goals) {
        await supabase.from('goals').insert({
          user_id: userId,
          name: goal.name,
          priority: goal.priority,
          deadline: goal.deadline,
          impact: goal.impact,
          completed: goal.completed || false
        })
      }
    }
    
    // Streak Commander
    const streakData = JSON.parse(localStorage.getItem('streak_commander_data') || '{"metrics":[]}')
    if (streakData.metrics.length > 0) {
      for (const metric of streakData.metrics) {
        const { data: newMetric } = await supabase
          .from('streak_metrics')
          .insert({
            user_id: userId,
            name: metric.name
          })
          .select()
          .single()
        
        if (metric.history && metric.history.length > 0) {
          const history = metric.history.map(h => ({
            user_id: userId,
            metric_id: newMetric.id,
            date: h.date,
            status: h.status
          }))
          await supabase.from('streak_history').insert(history)
        }
      }
    }
    
    // ... Repeat for other apps
    
    // Mark as migrated
    localStorage.setItem('data_migrated', 'true')
    console.log('Migration complete')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}
```

### 6.2 Run Migration on First Auth

```javascript
// In AuthContext.jsx, after user signs in:
useEffect(() => {
  if (user && !localStorage.getItem('data_migrated')) {
    migrateLocalStorageToSupabase(user.id)
  }
}, [user])
```

---

## 🧪 PART 7: TESTING RLS POLICIES

### 7.1 Test in Supabase Dashboard

Go to **SQL Editor** and run:

```sql
-- Test as a specific user
SELECT auth.uid(); -- Should return NULL (you're not authenticated in SQL editor)

-- To test RLS, use the Table Editor
-- Go to: Table Editor → Select any table → Try to view/insert/update rows
-- RLS is enforced automatically
```

### 7.2 Test in Your App

```javascript
// Try to fetch another user's data (should fail)
const { data, error } = await supabase
  .from('goals')
  .select('*')
  .eq('user_id', 'some-other-user-id') // This will return empty, not error

// RLS prevents seeing other users' rows
// Even if you manually specify another user_id in WHERE clause
```

---

## 📋 PART 8: DEPLOYMENT CHECKLIST

Before going live:

**Environment Variables:**
- [ ] `.env` file created with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] `.env` added to `.gitignore`
- [ ] Production environment variables set in hosting platform (Vercel, Netlify, etc.)

**Database:**
- [ ] All tables created
- [ ] All indexes created
- [ ] All RLS policies enabled
- [ ] All triggers created
- [ ] Test data verified (insert, update, delete)

**Authentication:**
- [ ] Email provider enabled
- [ ] Magic link enabled
- [ ] Email templates configured
- [ ] Redirect URLs set correctly
- [ ] Auth context provider implemented
- [ ] Protected routes implemented

**Migration:**
- [ ] localStorage logic removed from all apps
- [ ] Supabase API functions implemented for all apps
- [ ] All components updated to use Supabase
- [ ] Migration script tested (optional)

**Security:**
- [ ] `SERVICE_ROLE_KEY` never exposed in frontend
- [ ] RLS policies tested
- [ ] Auth flows tested (signup, login, logout, password reset)
- [ ] Cross-user data access verified as blocked

**Performance:**
- [ ] Indexes verified on frequently queried columns
- [ ] Query performance tested with sample data
- [ ] Real-time subscriptions optimized (if used)

---

## 🚀 PART 9: GOING LIVE

### 9.1 Build for Production

```bash
npm run build
```

### 9.2 Deploy

**Vercel (Recommended):**
```bash
npm install -g vercel
vercel --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 9.3 Set Environment Variables in Hosting Platform

**Vercel:**
- Go to: Project Settings → Environment Variables
- Add: `VITE_SUPABASE_URL`
- Add: `VITE_SUPABASE_ANON_KEY`

**Netlify:**
- Go to: Site Settings → Build & Deploy → Environment
- Add both variables

### 9.4 Update Supabase Redirect URLs

Go to **Authentication → URL Configuration** in Supabase and add your production domain:

```
https://yourdomain.com
https://yourdomain.com/**
```

---

## 🐛 PART 10: COMMON ISSUES & FIXES

### Issue: "new row violates row-level security policy"

**Cause:** RLS policy blocks the insert/update  
**Fix:** Check that `user_id` matches `auth.uid()` in your INSERT/UPDATE

### Issue: "null value in column 'user_id' violates not-null constraint"

**Cause:** User not authenticated when inserting  
**Fix:** Ensure `await supabase.auth.getUser()` succeeds before DB operations

### Issue: Can't see any data after login

**Cause:** RLS filtering out rows  
**Fix:** Verify `user_id` column in table matches authenticated user's ID

### Issue: "JWT expired" or session errors

**Cause:** Auth token expired  
**Fix:** Supabase client auto-refreshes. If persisting, check `persistSession: true` in client config

### Issue: Queries slow with large datasets

**Cause:** Missing indexes  
**Fix:** Add indexes on columns used in WHERE/ORDER BY clauses

### Issue: Email confirmation not working

**Cause:** Incorrect redirect URL  
**Fix:** Verify redirect URLs in Supabase dashboard match your domain exactly

---

## 📚 PART 11: SUPABASE BEST PRACTICES

### 11.1 Error Handling

```javascript
try {
  const { data, error } = await supabase.from('goals').select('*')
  
  if (error) {
    // Supabase errors
    console.error('Database error:', error.message)
    throw error
  }
  
  return data
} catch (error) {
  // Network errors, auth errors, etc.
  console.error('Request failed:', error)
  throw error
}
```

### 11.2 Loading States

```javascript
const [loading, setLoading] = useState(true)

useEffect(() => {
  async function load() {
    setLoading(true)
    try {
      const data = await fetchGoals()
      setGoals(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  load()
}, [])
```

### 11.3 Real-time Subscriptions (Optional)

If you want live updates when data changes:

```javascript
useEffect(() => {
  const channel = supabase
    .channel('goals-changes')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'goals',
        filter: `user_id=eq.${user.id}`
      },
      (payload) => {
        console.log('Change received!', payload)
        // Refresh data
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [user])
```

### 11.4 Batch Operations

```javascript
// Insert multiple rows at once
const { data, error } = await supabase
  .from('goals')
  .insert([goal1, goal2, goal3])
  .select()
```

### 11.5 Transactions

Supabase doesn't support multi-table transactions in the client. For complex operations, use a Database Function:

```sql
CREATE OR REPLACE FUNCTION create_week_with_tasks(
  p_week_id DATE,
  p_tasks JSONB
)
RETURNS UUID AS $$
DECLARE
  v_week_id UUID;
BEGIN
  -- Insert week
  INSERT INTO war_map_weeks (user_id, week_id)
  VALUES (auth.uid(), p_week_id)
  RETURNING id INTO v_week_id;
  
  -- Insert tasks from JSONB
  -- ... (complex logic here)
  
  RETURN v_week_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## ✅ FINAL MIGRATION CHECKLIST

**Setup:**
- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Supabase client initialized

**Auth:**
- [ ] Auth helper functions created
- [ ] Auth context provider implemented
- [ ] Login/signup pages built
- [ ] Protected routes implemented
- [ ] Magic link tested
- [ ] Password reset tested

**Database:**
- [ ] All 10 tables created
- [ ] All indexes created
- [ ] All triggers created
- [ ] RLS enabled on all tables
- [ ] All RLS policies created

**Migration:**
- [ ] Decision Fatigue migrated
- [ ] Streak Commander migrated
- [ ] Weekly War Map migrated
- [ ] Energy Monitor migrated
- [ ] Silent Reminders migrated
- [ ] Progress Radar migrated
- [ ] All localStorage calls removed
- [ ] All data persists correctly

**Testing:**
- [ ] Signup flow works
- [ ] Login flow works
- [ ] Logout works
- [ ] Each app CRUD operations work
- [ ] RLS prevents cross-user access
- [ ] Data persists after refresh
- [ ] No console errors

**Deployment:**
- [ ] Production build tested
- [ ] Environment variables set in hosting
- [ ] Redirect URLs updated in Supabase
- [ ] Live site tested end-to-end

---

**Migration Spec Version:** 1.0  
**Estimated migration time:** 6-10 hours (depending on testing thoroughness)  
**Ready to migrate:** YES

---

You now have everything you need to move from localStorage to a production-ready Supabase backend with authentication and per-user data isolation. The 6-in-14 platform is ready to scale.
