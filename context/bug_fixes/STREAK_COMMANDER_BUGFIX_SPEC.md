# Streak Commander — Bug Fix: Pending State
**Spec v1.0 → v1.1**

---

## 🐛 THE BUG

### What Happens

User has 5 metrics. Yesterday, all 5 are marked "done". Today, they open the app and mark the first metric as "done". The moment that first metric is answered, the remaining 4 metrics — which the user hasn't touched yet today — are treated as if they have no entry for today. The main streak calculation sees those 4 missing entries, concludes the day is already failed (1 done out of 5 = 20%, below the 50% threshold), and breaks the streak. The day isn't over. The user hasn't had a chance to answer yet. The streak is already gone.

### Why It Happens

The original `calculateMainStreak` function walks backwards from today. For today's date, it loops through every metric and checks for a history entry. If a metric has no entry for today, the function treats it as a gap — equivalent to a missed day in the past. There is no distinction between "this metric has no entry because the user hasn't gotten to it yet" and "this metric has no entry because the user forgot about it and the day ended."

The streak calculation runs on every single answer. So after answering metric 1, the function fires, sees metrics 2–5 with zero entries for today, and collapses the streak immediately.

The original spec tried to handle this with a single line:

```javascript
// But if it's today and not yet answered, don't count as broken
const isToday = dateStr === today.toISOString().split('T')[0]
if (!isToday) {
  return streak
}
```

This only skips the early `return` for today. It does not prevent those unanswered metrics from pulling the daily score down to below 50%. The score calculation still runs, still counts only the metrics that have been answered, and still breaks the streak.

### The Core Problem in Plain Terms

The system has no concept of "not yet answered." It only knows three things a metric can be on a given day: done, missed, or rest. The moment a new day starts and the user hasn't answered everything yet, the unanswered metrics are invisible — and invisibility reads as failure.

---

## ✅ THE FIX: PENDING STATE

### What Changes

A fourth status is introduced: `pending`. This is not a user-facing action. The user never clicks a "Pending" button. It is a system-assigned placeholder that exists on every metric for every new day the moment that day begins — or more precisely, the moment the app first checks in on that day.

### How Pending Works

**Assignment:** When the app loads (or when any check-in is answered), it checks whether today's date already has entries for all metrics. For any metric that has no entry for today, the system writes a `pending` entry. This happens automatically. The user sees it as an unanswered card — buttons visible, no badge.

**Replacement:** The moment the user answers a metric (Yes / No / Rest), the `pending` entry for that metric is overwritten with the real status. Pending disappears. It never coexists alongside a real answer on the same metric for the same day.

**End of Day:** If the day ends (midnight passes) and any metric is still `pending`, it is treated identically to `missed` for all streak calculations. Pending at end of day = the user didn't show up for that metric.

### The Four States — Complete Reference

| Status | Assigned By | Meaning | Main Streak | Substreak | Heatmap Color |
|---|---|---|---|---|---|
| `pending` | System (auto) | Day started, not yet answered | Neutral (not counted against) | Neutral (not counted against) | Gray |
| `done` | User clicks Yes | Completed today | ✓ Counts toward 50% | ✓ Increments streak | Green |
| `missed` | User clicks No, OR pending at midnight | Did not complete | ✗ Counts against 50% | ✗ Breaks streak | Red |
| `rest` | User clicks Rest | Intentional off-day | ✓ Counts toward 50% | — Skips (no break, no increment) | Orange |

---

## 🧮 UPDATED LOGIC

### 1. Pending Initialization (NEW)

This function runs on app load and after every check-in answer. It ensures every metric has an entry for today. If one doesn't exist, it creates a `pending` entry.

```javascript
function initializeTodaysPendingEntries(metrics) {
  const today = new Date().toISOString().split('T')[0]

  return metrics.map(metric => {
    const hasEntryToday = metric.history.some(h => h.date === today)

    if (!hasEntryToday) {
      // Write a pending entry for today
      return {
        ...metric,
        history: [
          ...metric.history,
          { date: today, status: 'pending' }
        ]
      }
    }

    return metric
  })
}
```

**When to call this:**
- On initial app load, after loading data from storage
- This is it. Pending entries are written once per day per metric. After that, they either stay pending or get replaced by user answers.

### 2. Answering a Check-In (UPDATED)

When the user clicks Yes / No / Rest, the handler finds the existing entry for today — which will be `pending` — and overwrites its status. No new entry is created. The pending entry is mutated in place.

```javascript
function answerCheckIn(metrics, metricId, status) {
  const today = new Date().toISOString().split('T')[0]

  return metrics.map(metric => {
    if (metric.id !== metricId) return metric

    // Find today's entry — guaranteed to exist (it's either pending or already answered)
    const updatedHistory = metric.history.map(entry => {
      if (entry.date === today) {
        return { ...entry, status: status } // Overwrite pending (or re-answer)
      }
      return entry
    })

    const updated = { ...metric, history: updatedHistory }

    // Recalculate this metric's substreak
    updated.currentStreak = calculateSubstreak(updated)
    updated.bestStreak = calculateBestStreak(updated)

    return updated
  })
}
```

### 3. Main Streak Calculation (UPDATED)

The main streak now has two distinct behaviors depending on whether the date being evaluated is today or a past day.

**Today:** `pending` entries are ignored entirely. They do not count toward the score and do not count against it. The daily score is calculated only from metrics that have a real answer (done / missed / rest). If no metrics have been answered yet (all pending), today is skipped — it doesn't contribute to the streak but doesn't break it either.

**Past days:** Any entry that is still `pending` is treated as `missed`. A past day should never have pending entries under normal operation (the midnight flush handles this), but this serves as a safety net.

```javascript
function calculateMainStreak(metrics) {
  if (!metrics || metrics.length === 0) return 0

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split('T')[0]

  let currentDate = new Date(today)

  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const isToday = dateStr === todayStr

    let doneCount = 0
    let restCount = 0
    let missedCount = 0
    let pendingCount = 0

    for (const metric of metrics) {
      const entry = metric.history.find(h => h.date === dateStr)

      if (!entry) {
        // No entry at all for this date
        if (isToday) {
          // Shouldn't happen after initialization, but treat as pending
          pendingCount++
        } else {
          // Past day with no entry = missed
          missedCount++
        }
      } else {
        switch (entry.status) {
          case 'done':  doneCount++;    break
          case 'rest':  restCount++;    break
          case 'missed': missedCount++; break
          case 'pending':
            if (isToday) {
              pendingCount++ // Today's pending: ignore for scoring
            } else {
              missedCount++  // Past pending: treat as missed
            }
            break
        }
      }
    }

    // --- TODAY: special handling ---
    if (isToday) {
      const answeredCount = doneCount + restCount + missedCount

      if (answeredCount === 0) {
        // Nothing answered yet today. Skip today entirely.
        // Don't increment streak, don't break it. Just move on.
        currentDate.setDate(currentDate.getDate() - 1)
        continue
      }

      // Score is calculated only from answered metrics
      const dailyScore = (doneCount + restCount) / answeredCount

      if (dailyScore >= 0.5) {
        streak++
      } else {
        // More than half of answered metrics are missed. Streak broken.
        return streak
      }
    }

    // --- PAST DAYS: standard handling ---
    if (!isToday) {
      const totalMetrics = metrics.length
      const dailyScore = (doneCount + restCount) / totalMetrics

      if (dailyScore >= 0.5) {
        streak++
      } else {
        return streak
      }
    }

    // Move to previous day
    currentDate.setDate(currentDate.getDate() - 1)

    // Safety limit
    const daysDiff = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24))
    if (daysDiff > 365) break
  }

  return streak
}
```

### 4. Substreak Calculation (UPDATED)

Same principle. On today's date, pending is invisible. On past dates, pending is missed.

```javascript
function calculateSubstreak(metric) {
  if (!metric || !metric.history || metric.history.length === 0) return 0

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split('T')[0]

  let currentDate = new Date(today)

  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const isToday = dateStr === todayStr
    const entry = metric.history.find(h => h.date === dateStr)

    if (!entry) {
      if (isToday) {
        // No entry today at all — skip, don't break
        currentDate.setDate(currentDate.getDate() - 1)
        continue
      }
      // Past day, no entry = missed = break
      return streak
    }

    if (entry.status === 'pending') {
      if (isToday) {
        // Pending today — skip entirely, don't break
        currentDate.setDate(currentDate.getDate() - 1)
        continue
      }
      // Pending on a past day = missed = break
      return streak
    }

    if (entry.status === 'done') {
      streak++
    } else if (entry.status === 'rest') {
      // Rest: skip, no break, no increment
    } else if (entry.status === 'missed') {
      return streak
    }

    currentDate.setDate(currentDate.getDate() - 1)

    const daysDiff = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24))
    if (daysDiff > 365) break
  }

  return streak
}
```

### 5. Best Streak Calculation (UPDATED)

Best streak walks forward through history chronologically. Pending entries on past dates are treated as missed (streak breaker). Pending entries on today are skipped — they haven't resolved yet, so they don't affect the historical best.

```javascript
function calculateBestStreak(metric) {
  if (!metric || !metric.history || metric.history.length === 0) return 0

  const todayStr = new Date().toISOString().split('T')[0]

  let bestStreak = 0
  let currentStreak = 0

  const sortedHistory = [...metric.history].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  )

  for (const entry of sortedHistory) {
    // Skip today's pending — it hasn't resolved yet
    if (entry.date === todayStr && entry.status === 'pending') {
      continue
    }

    if (entry.status === 'done') {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else if (entry.status === 'rest') {
      // Rest doesn't break streak
      continue
    } else {
      // missed, or pending on a past date (shouldn't happen, but safe)
      currentStreak = 0
    }
  }

  return bestStreak
}
```

### 6. Midnight Flush (NEW)

This is the mechanism that converts any remaining `pending` entries into `missed` when a day ends. It runs on app load. It checks whether any past dates (anything before today) still have `pending` entries and overwrites them to `missed`.

```javascript
function flushStalePendingEntries(metrics) {
  const today = new Date().toISOString().split('T')[0]

  return metrics.map(metric => {
    const updatedHistory = metric.history.map(entry => {
      // If it's a pending entry on any date before today, flush it to missed
      if (entry.status === 'pending' && entry.date < today) {
        return { ...entry, status: 'missed' }
      }
      return entry
    })

    return { ...metric, history: updatedHistory }
  })
}
```

**When to call this:**
- On app load, before anything else runs
- Order of operations on load:
  1. Load data from storage
  2. Run `flushStalePendingEntries` (converts yesterday's leftover pending → missed)
  3. Run `initializeTodaysPendingEntries` (writes pending for today's unanswered metrics)
  4. Recalculate all streaks
  5. Render

### 7. Complete App Load Sequence (NEW)

```javascript
function initializeApp() {
  // 1. Load raw data
  let data = loadData()

  // 2. Flush any stale pending entries from past days → missed
  data.metrics = flushStalePendingEntries(data.metrics)

  // 3. Initialize pending entries for today (any metric missing today's entry gets one)
  data.metrics = initializeTodaysPendingEntries(data.metrics)

  // 4. Recalculate all streaks with the updated data
  data.metrics = data.metrics.map(metric => ({
    ...metric,
    currentStreak: calculateSubstreak(metric),
    bestStreak: calculateBestStreak(metric)
  }))
  data.mainStreak = calculateMainStreak(data.metrics)

  // 5. Save the flushed + initialized data back
  saveData(data)

  return data
}
```

---

## 🎨 UI CHANGES

### Metric Card — Pending State (NEW)

The pending state needs its own visual treatment in the Today's Check-In section. It must look distinct from an answered card but must not alarm the user. It's neutral. It's waiting.

**Copy:**

```
METRIC NAME: {metric.name}

No badge. No status text.

BUTTONS (visible, same as original unanswered state):
[Yes] [No] [Rest]

SUBSTREAK:
{metric.currentStreak} days
```

**Design:**

- Card border: 1px solid var(--border-subtle) — default, no color change
- Card background: var(--bg-tertiary) — same as default
- No status badge rendered
- Buttons are fully visible and interactive
- Visually identical to how unanswered cards looked in v1.0

The user does not need to know the word "pending" exists. From their perspective, it's simply a metric they haven't answered yet today. The pending status is an internal concept only.

### Metric Card — Missed State (UPDATED)

The original spec used "Skipped" as the label for the No button's resulting badge. This created ambiguity — "skipped" sounds like a choice, like rest. In the context of the pending fix, clarity matters more. The badge now reads "Missed" to match the status name and make the consequence explicit.

**Copy change:**

```
OLD: ✗ Skipped
NEW: ✗ Missed
```

**Design:** No change. Same red badge styling as before.

### Heatmap — Pending Cell (NEW)

The 30-day calendar heatmap needs a visual treatment for pending. On today's date, any metric that is still pending shows as a gray cell — visually distinct from done (green), rest (orange), missed (red), and empty/no-data days.

**Design:**

```
Pending cell:
- Background: var(--bg-tertiary)
- Border: 1px dashed var(--border-strong)   ← dashed, not solid. Signals "incomplete"
- Opacity: 0.6
- Border-radius: 4px
```

**Tooltip on hover:**

```
Date: {formattedDate}
Status: Pending — not yet answered today
```

### Progress Bar — Pending Handling (UPDATED)

The progress bar in Today's Check-In shows how much of today's check-in is complete. The original formula was:

```
progress = (doneCount + restCount) / totalMetrics
```

This is unchanged in meaning, but now `pending` metrics are explicitly excluded from the numerator. The denominator stays as total metrics. This means the progress bar starts at 0% and climbs as the user answers. It does not jump or behave erratically when the first metric is answered.

```javascript
function calculateTodayProgress(metrics) {
  const today = new Date().toISOString().split('T')[0]

  let answered = 0
  const total = metrics.length

  for (const metric of metrics) {
    const entry = metric.history.find(h => h.date === today)
    if (entry && entry.status !== 'pending') {
      answered++
    }
  }

  return total > 0 ? answered / total : 0
}
```

### Main Streak Hero — No Visual Change

The hero section does not change. The pending state does not affect what the hero displays. The streak number only reflects confirmed, resolved days. Today with pending metrics simply doesn't contribute to or subtract from the number shown. This is invisible to the user and exactly correct.

### Success Message — Adjusted Condition (UPDATED)

The "All done for today!" message previously triggered when all metrics had any answer. Now it must explicitly exclude pending:

```javascript
function isAllAnsweredToday(metrics) {
  const today = new Date().toISOString().split('T')[0]

  return metrics.every(metric => {
    const entry = metric.history.find(h => h.date === today)
    return entry && entry.status !== 'pending'
  })
}
```

---

## 📊 DATA STRUCTURE CHANGES

### History Entry (UPDATED)

The only change to the data structure is the addition of `pending` as a valid status value. Everything else — shape, keys, date format — stays identical.

**v1.0:**
```javascript
{ date: '2026-01-27', status: 'done' }   // status: 'done' | 'missed' | 'rest'
```

**v1.1:**
```javascript
{ date: '2026-01-27', status: 'done' }   // status: 'done' | 'missed' | 'rest' | 'pending'
```

### Example: Full Day Lifecycle

```javascript
// --- 11:00 AM, Jan 28 — App opens. User has 3 metrics. ---
// After flushStalePendingEntries + initializeTodaysPendingEntries:

metric1.history = [
  { date: '2026-01-27', status: 'done' },      // Yesterday — real answer
  { date: '2026-01-28', status: 'pending' }     // Today — system wrote this
]
metric2.history = [
  { date: '2026-01-27', status: 'done' },
  { date: '2026-01-28', status: 'pending' }
]
metric3.history = [
  { date: '2026-01-27', status: 'rest' },
  { date: '2026-01-28', status: 'pending' }
]

// Main streak calculation for today:
//   pending: 3, done: 0, rest: 0, missed: 0
//   answeredCount = 0 → skip today entirely
//   Check yesterday: done + rest = 3/3 = 100% → streak continues
// Result: streak holds at whatever it was. Nothing breaks.


// --- 11:15 AM — User marks metric1 as "done" ---

metric1.history = [
  { date: '2026-01-27', status: 'done' },
  { date: '2026-01-28', status: 'done' }        // Pending overwritten
]
// metric2 and metric3 still pending

// Main streak calculation for today:
//   pending: 2, done: 1, rest: 0, missed: 0
//   answeredCount = 1
//   dailyScore = 1/1 = 100% → today counts
// Result: streak holds. Pending metrics are invisible.


// --- 11:30 AM — User marks metric2 as "missed" ---

metric2.history = [
  { date: '2026-01-27', status: 'done' },
  { date: '2026-01-28', status: 'missed' }      // Pending overwritten
]

// Main streak calculation for today:
//   pending: 1, done: 1, rest: 0, missed: 1
//   answeredCount = 2
//   dailyScore = 1/2 = 50% → today still counts (≥ 0.5)
// Result: streak holds.


// --- 11:45 AM — User marks metric3 as "done" ---

metric3.history = [
  { date: '2026-01-27', status: 'rest' },
  { date: '2026-01-28', status: 'done' }        // Pending overwritten
]

// Main streak calculation for today:
//   pending: 0, done: 2, rest: 0, missed: 1
//   answeredCount = 3
//   dailyScore = 2/3 = 66% → today counts
// All answered → show success message
// Result: streak holds. Day complete.


// --- SCENARIO B: User never comes back. Midnight passes. ---
// Next day, app loads. flushStalePendingEntries runs:

metric2.history = [
  { date: '2026-01-27', status: 'done' },
  { date: '2026-01-28', status: 'missed' }      // Was pending, flushed to missed
]
metric3.history = [
  { date: '2026-01-27', status: 'rest' },
  { date: '2026-01-28', status: 'missed' }      // Was pending, flushed to missed
]

// Jan 28 now has: done: 1, missed: 2
// dailyScore = 1/3 = 33% → streak breaks on Jan 28
```

---

## 🎬 ANIMATION & INTERACTION CHANGES

No new animations are needed. The pending state is visually identical to the original "unanswered" card state — buttons visible, no badge. The transitions that already exist cover everything:

- **Answering a pending metric:** Same as answering any metric in v1.0. Buttons cross-fade to badge, card border changes color, progress bar updates. No change needed.
- **Streak holding while pending metrics exist:** The streak number simply doesn't change. No animation fires. This is correct — there's nothing to celebrate or mourn yet.
- **Streak breaking after midnight flush:** This only becomes visible the next time the user opens the app. At that point, the streak number will already reflect the broken state on load. The streak breaking animation (shake, red flash, skull) fires on load if the streak dropped to 0 since last session. This is handled by comparing the loaded streak value to the previous session's value.

### Load-Time Streak Drop Detection (NEW)

To properly trigger the streak-break animation when the user returns after a missed day, the app needs to know what the streak was last time it was open.

```javascript
// On save, store the current main streak value
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...data,
    lastKnownMainStreak: data.mainStreak  // NEW: snapshot the streak before closing
  }))
}

// On load, after recalculating:
function checkForStreakDrop(previousStreak, currentStreak) {
  if (previousStreak > 0 && currentStreak === 0) {
    // Streak was alive last session, now it's dead
    // Trigger: shake animation, red flash, skull icon
    return true
  }
  return false
}
```

---

## 🔄 MIGRATION

### Existing User Data

Users who already have data stored will not have `pending` entries in their history. This is fine. The migration is handled automatically by the load sequence:

1. `flushStalePendingEntries` runs first — it only touches entries with `status: 'pending'`. Existing data has none, so nothing changes.
2. `initializeTodaysPendingEntries` runs next — it checks if today has an entry for each metric. If not, it writes `pending`. This is the first time pending entries appear for existing users, and it happens naturally on their next app open.

No manual data migration script is needed. No existing history entries are modified. The system simply starts writing pending entries from today forward.

### Backward Compatibility

The streak calculation functions now handle four statuses instead of three. They do not break if they encounter data that only has three statuses. The `pending` case is additive — it adds a new branch to the switch/if logic. All existing `done`, `missed`, and `rest` entries continue to be processed exactly as before.

---

## ✅ UPDATED IMPLEMENTATION CHECKLIST

Everything from the original checklist still applies. The following items are added or modified:

**New items:**
- [ ] `pending` entries are written for all metrics on app load (today only)
- [ ] `pending` entries on past dates are flushed to `missed` on app load
- [ ] Answering a metric overwrites its `pending` entry (no duplicate entries for same date)
- [ ] Main streak ignores pending metrics on today's date
- [ ] Main streak treats pending on past dates as missed
- [ ] Substreak ignores pending on today, treats as missed on past dates
- [ ] Best streak skips today's pending entries
- [ ] Progress bar excludes pending from numerator
- [ ] "All done" success message only triggers when zero pending entries remain today
- [ ] Heatmap renders pending cells as gray with dashed border
- [ ] Heatmap tooltip shows "Pending — not yet answered today" for pending cells
- [ ] Streak-break animation fires on load if streak dropped since last session
- [ ] `lastKnownMainStreak` is saved alongside data

**Modified items:**
- [ ] "Skipped" badge text changed to "Missed" on metric cards
- [ ] Metric card in pending state shows buttons, no badge (visually identical to v1.0 unanswered state)

**Regression tests to run:**
- [ ] Mark all metrics done one day → open next day → answer first metric → streak does NOT break
- [ ] Mark all metrics done one day → don't open app next day → open two days later → streak IS broken
- [ ] Mark 3 out of 5 metrics as done, leave 2 pending → close app → reopen same day → pending metrics still show buttons
- [ ] Mark 3 out of 5 as done, 2 as missed → streak breaks correctly (3/5 = 60%, holds) — wait, 3 done + 0 rest = 3 answered positively out of 5 total answered = 60%. Streak holds.
- [ ] Mark 2 out of 5 as done, 3 as missed → streak breaks (2/5 = 40%, below 50%)
- [ ] Mark 1 as done, leave 4 pending, close app, reopen next day → Jan 28 flushed to 1 done + 4 missed = 20% → streak breaks

---

## 📋 SUMMARY OF ALL CHANGED FILES/FUNCTIONS

| Function / Component | Change Type | What Changed |
|---|---|---|
| `initializeTodaysPendingEntries` | NEW | Writes pending entries for unanswered metrics on today |
| `flushStalePendingEntries` | NEW | Converts past-date pending → missed on app load |
| `initializeApp` | NEW | Orchestrates the full load sequence in correct order |
| `calculateMainStreak` | UPDATED | Ignores pending on today, treats as missed on past days |
| `calculateSubstreak` | UPDATED | Same pending logic as main streak |
| `calculateBestStreak` | UPDATED | Skips today's pending entries |
| `answerCheckIn` | UPDATED | Overwrites pending entry instead of creating new one |
| `calculateTodayProgress` | UPDATED | Excludes pending from answered count |
| `isAllAnsweredToday` | UPDATED | Returns false if any pending entries remain |
| `checkForStreakDrop` | NEW | Detects streak death between sessions for animation |
| `saveData` | UPDATED | Stores `lastKnownMainStreak` snapshot |
| Metric Card (pending) | UI | Shows buttons, no badge — visually same as v1.0 unanswered |
| Metric Card (missed badge) | UI | Label changed from "Skipped" to "Missed" |
| Heatmap cell (pending) | UI | Gray background, dashed border, new tooltip text |
| Progress Bar | UI | Formula excludes pending, denominator stays total |

---

**Spec Version:** 1.1 (Bug Fix)
**Replaces:** Streak Logic section, Check-In Logic section, and relevant UI states from v1.0
**Backward Compatible:** Yes — existing user data requires no migration script
