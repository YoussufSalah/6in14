# Streak Commander — App Specification
**Visual Accountability System**

---

## 🎯 App Purpose

**Core Question:** "Did I show up today?"

**Core Promise:** See your consistency. Break the chain, feel the pain. Keep it alive, build momentum.

**User Flow:**
1. User creates metrics they want to track (Training, Posting, Coding, etc.)
2. Every day, app asks: "Did you do X today?" for each metric
3. User answers: Yes / No / Rest
4. App shows Main Streak + Individual Substreaks
5. Visual feedback: Green glow for active, Red warning for broken

---

## 🎨 Visual Identity

**Accent Color:** Orange (`#fb923c`)
**Secondary Accent:** `#fdba74` (lighter orange)
**Background Tint:** `#2a1f1a`
**Vibe:** Fire. Urgency. Momentum. Don't break the chain.

**Key Visual Element:** 🔥 Flame emoji + streak counter (large, animated)

---

## 📋 Page Structure

```
┌─────────────────────────────────────┐
│     NAVBAR (Universal)              │
├─────────────────────────────────────┤
│                                     │
│     MAIN STREAK HERO                │
│     - Flame icon                    │
│     - Current streak number         │
│     - Status message                │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     TODAY'S CHECK-IN                │
│     - List of all metrics           │
│     - Yes/No/Rest buttons           │
│     - Progress bar                  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     INDIVIDUAL STREAKS              │
│     - Each metric's substreak       │
│     - 30-day calendar heatmap       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     MANAGE METRICS                  │
│     - Add new metric button         │
│     - Edit/delete existing          │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 SECTION 1: MAIN STREAK HERO

### Copy

**State A: Active Streak (≥1 day)**

```
FLAME ICON: 🔥 (Large, animated pulse)

STREAK NUMBER: {streakDays}
LABEL: day streak

STATUS MESSAGE: "The chain is alive. Don't break it."

SUBTEXT: 
{completedToday}/{totalMetrics} tasks completed today
```

**State B: Broken Streak (0 days)**

```
ICON: 💀 (Skull, or broken chain icon)

STREAK NUMBER: 0
LABEL: days

STATUS MESSAGE: "You broke the chain."

SUBTEXT:
Start again today. Every champion has restart days.

ACTION:
[Button] Start New Streak
```

**State C: No Metrics Yet (Empty State)**

```
ICON: 🔥 (Gray, no animation)

HEADLINE: "Build your streak."

SUBTEXT:
Add metrics you want to track daily. Training, posting, coding—whatever moves you forward.

ACTION:
[Primary Button] Add First Metric
```

### Design Specifications

**Hero Container:**
- Padding: 64px 32px
- Background: Radial gradient from center
  - Center: `rgba(251, 146, 60, 0.15)` (orange glow)
  - Edges: transparent
- Max-width: 600px
- Margin: 32px auto
- Text-align: center

**State A Design (Active Streak):**

**Flame Icon:**
- Font-size: 120px (desktop) / 80px (mobile)
- Animation: Continuous pulse (scale 1 → 1.05 → 1, 2s infinite)
- Filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.5))

**Streak Number:**
- Font-size: text-6xl (desktop) / text-5xl (mobile)
- Font: font-display, font-black
- Color: var(--app-2-accent)
- Line-height: 1
- Margin-bottom: 8px

**Label:**
- Font-size: text-xl
- Font: font-mono
- Color: text-secondary
- Text-transform: lowercase
- Letter-spacing: 0.05em

**Status Message:**
- Font-size: text-lg
- Color: white
- Margin-top: 24px
- Font-weight: 600

**Subtext:**
- Font-size: text-base
- Color: text-secondary
- Margin-top: 12px
- Font: font-mono

**State B Design (Broken Streak):**

**Icon:**
- Font-size: 100px
- No animation
- Opacity: 0.6
- Grayscale filter

**Streak Number:**
- Same size as State A
- Color: var(--error) (red)

**Status Message:**
- Color: var(--error)
- Font-weight: bold

**Subtext:**
- Color: text-tertiary
- Font-style: italic
- Line-height: 1.6

**Action Button:**
- Height: 56px
- Padding: 0 32px
- Background: var(--app-2-accent)
- Border-radius: 12px
- Margin-top: 32px
- Font-size: text-lg
- Font-weight: 600

**State C Design (Empty):**
- Similar to State B but with orange accent
- Button uses primary orange color

---

## 📋 SECTION 2: TODAY'S CHECK-IN

### Copy

**Section Title:**
```
Today's Check-In
```

**Subtitle:**
```
{formattedDate} • {completedCount}/{totalMetrics} complete
```

**Progress Indicator:**
```
[Progress Bar] {percentage}%
Today's Score: {completedCount + restCount} / {totalMetrics}
```

**Metric Card (Each item):**

```
METRIC NAME: {metric.name}

STATUS (if answered):
✓ Done | ✗ Skipped | 🛌 Rest

BUTTONS (if not answered today):
[Yes] [No] [Rest]

CURRENT SUBSTREAK:
{metric.currentStreak} days
```

**Call to Action (if not all answered):**
```
Complete today's check-in to maintain your streak!
```

**Success Message (if all answered):**
```
✅ All done for today! Come back tomorrow.
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 800px
- Margin: 0 auto
- Background: var(--bg-secondary)
- Border-radius: 16px
- Border: 1px solid var(--border-subtle)

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 8px

**Subtitle:**
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- Margin-bottom: 24px

**Progress Bar Container:**
- Width: 100%
- Height: 8px
- Background: var(--bg-tertiary)
- Border-radius: 999px
- Margin-bottom: 24px
- Overflow: hidden

**Progress Bar Fill:**
- Height: 100%
- Background: Linear gradient (var(--app-2-accent), var(--app-2-accent-light))
- Border-radius: 999px
- Transition: width 0.5s ease-out
- Animation: Shimmer effect on completion

**Progress Text:**
- Font-size: text-sm
- Font: font-mono
- Color: var(--app-2-accent)
- Margin-top: 8px
- Text-align: center

**Metrics List:**
- Display: flex
- Flex-direction: column
- Gap: 16px

**Metric Card:**
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 20px
- Display: flex
- Justify-content: space-between
- Align-items: center
- Transition: all 0.2s ease

**Metric Card (Answered):**
- Border-color: Based on answer
  - Yes: var(--success)
  - No: var(--error)
  - Rest: var(--warning)
- Background: Slight tint of answer color (5% opacity)

**Metric Name:**
- Font-size: text-lg
- Font-weight: 600
- Color: white

**Status Badge:**
- Display: inline-flex
- Align-items: center
- Gap: 6px
- Font-size: text-sm
- Font: font-mono
- Padding: 6px 12px
- Border-radius: 6px
- Background: Based on status
  - Done: rgba(34, 197, 94, 0.1), green text
  - Skipped: rgba(239, 68, 68, 0.1), red text
  - Rest: rgba(245, 158, 11, 0.1), orange text

**Action Buttons (Yes/No/Rest):**
- Display: flex
- Gap: 8px

**Button Base:**
- Height: 40px
- Padding: 0 20px
- Border-radius: 8px
- Font-size: text-sm
- Font-weight: 600
- Border: 2px solid transparent
- Transition: all 0.2s ease

**Yes Button:**
- Background: transparent
- Border-color: var(--border-subtle)
- Color: text-secondary
- Hover: Border var(--success), color var(--success), background rgba(34, 197, 94, 0.1)

**No Button:**
- Same as Yes but hover uses var(--error) and red colors

**Rest Button:**
- Same as Yes but hover uses var(--warning) and orange colors

**Current Substreak Display:**
- Font-size: text-xs
- Font: font-mono
- Color: text-tertiary
- Margin-top: 8px

**Call to Action / Success Message:**
- Text-align: center
- Margin-top: 24px
- Padding: 16px
- Background: rgba(251, 146, 60, 0.05)
- Border-radius: 8px
- Font-size: text-sm
- Font-weight: 500

---

## 📊 SECTION 3: INDIVIDUAL STREAKS

### Copy

**Section Title:**
```
Individual Streaks
```

**Subtitle:**
```
Each metric's performance over the last 30 days
```

**Metric Streak Card (Each metric):**

```
METRIC NAME: {metric.name}

CURRENT STREAK: {currentStreak} days
BEST STREAK: {bestStreak} days

30-DAY CALENDAR:
[Heat map showing last 30 days]

STATS:
✓ {doneCount} days | 🛌 {restCount} days | ✗ {missedCount} days
Completion Rate: {completionRate}%
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 1200px
- Margin: 32px auto 0

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 8px

**Subtitle:**
- Font-size: text-sm
- Color: text-secondary
- Margin-bottom: 32px

**Metrics Grid:**
- Display: grid
- Grid: 1 column (mobile), 2 columns (tablet), 2 columns (desktop)
- Gap: 24px

**Metric Streak Card:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px
- Padding: 24px
- Transition: all 0.2s ease

**Card Hover:**
- Border-color: var(--app-2-accent)
- Transform: translateY(-2px)
- Box-shadow: 0 8px 24px rgba(251, 146, 60, 0.1)

**Metric Name (in card):**
- Font-size: text-xl
- Font: font-display, font-bold
- Margin-bottom: 16px
- Color: white

**Streak Stats Row:**
- Display: flex
- Gap: 24px
- Margin-bottom: 20px

**Streak Stat:**
- Display: flex
- Flex-direction: column

**Stat Number:**
- Font-size: text-3xl
- Font: font-display, font-black
- Color: var(--app-2-accent)
- Line-height: 1

**Stat Label:**
- Font-size: text-xs
- Font: font-mono
- Color: text-secondary
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Margin-top: 4px

**30-Day Calendar Heatmap:**
- Display: grid
- Grid-template-columns: repeat(7, 1fr)
- Gap: 4px
- Margin-bottom: 20px

**Calendar Day Cell:**
- Aspect-ratio: 1
- Border-radius: 4px
- Border: 1px solid var(--border-subtle)
- Background: Based on status
  - Not reached yet: var(--bg-tertiary), opacity 0.3
  - Done: var(--success), opacity varies (0.3 to 1.0 based on consistency)
  - Rest: var(--warning), opacity 0.4
  - Missed: var(--error), opacity 0.3
  - No data: var(--bg-tertiary)
- Transition: all 0.2s ease
- Cursor: pointer

**Calendar Day Hover:**
- Transform: scale(1.15)
- Z-index: 10
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3)

**Calendar Tooltip (on hover):**
- Position: absolute
- Background: var(--bg-primary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 6px
- Padding: 8px 12px
- Font-size: text-xs
- White-space: nowrap
- Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5)
- Z-index: 100

**Stats Summary Row:**
- Display: flex
- Gap: 16px
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- Flex-wrap: wrap

**Completion Rate:**
- Color: Based on percentage
  - ≥80%: var(--success)
  - 50-79%: var(--warning)
  - <50%: var(--error)
- Font-weight: 600

---

## ⚙️ SECTION 4: MANAGE METRICS

### Copy

**Section Title:**
```
Your Metrics
```

**Metric Management Card:**

```
METRIC NAME: {metric.name}

ACTIONS:
[Icon] Edit
[Icon] Delete
```

**Add New Button:**
```
+ Add New Metric
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 800px
- Margin: 32px auto

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 24px

**Metrics List:**
- Display: flex
- Flex-direction: column
- Gap: 12px
- Margin-bottom: 24px

**Metric Management Card:**
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 16px 20px
- Display: flex
- Justify-content: space-between
- Align-items: center
- Transition: all 0.2s ease

**Card Hover:**
- Border-color: var(--border-strong)

**Metric Name (in management):**
- Font-size: text-base
- Font-weight: 600
- Color: white

**Actions Row:**
- Display: flex
- Gap: 8px

**Action Icon Button:**
- Width: 36px
- Height: 36px
- Background: transparent
- Border: 1px solid var(--border-subtle)
- Border-radius: 6px
- Color: text-secondary
- Cursor: pointer
- Transition: all 0.2s ease
- Display: flex
- Align-items: center
- Justify-content: center

**Edit Icon Hover:**
- Border-color: var(--app-2-accent)
- Color: var(--app-2-accent)
- Background: rgba(251, 146, 60, 0.1)

**Delete Icon Hover:**
- Border-color: var(--error)
- Color: var(--error)
- Background: rgba(239, 68, 68, 0.1)

**Add New Button:**
- Width: 100%
- Height: 56px
- Background: transparent
- Border: 2px dashed var(--border-strong)
- Border-radius: 12px
- Color: text-secondary
- Font-size: text-base
- Font-weight: 600
- Cursor: pointer
- Transition: all 0.2s ease

**Add New Hover:**
- Border-color: var(--app-2-accent)
- Color: var(--app-2-accent)
- Background: rgba(251, 146, 60, 0.05)

---

## ➕ MODAL: ADD/EDIT METRIC

### Copy

**Modal Title (Add Mode):**
```
Add New Metric
```

**Modal Title (Edit Mode):**
```
Edit Metric
```

**Form Field:**

```
Label: Metric Name
Placeholder: e.g., Training, Posting on X, Coding
Helper: What do you want to track daily?
Max Length: 30 characters
```

**Action Buttons:**
```
[Secondary] Cancel
[Primary] {mode === 'add' ? 'Add Metric' : 'Save Changes'}
```

### Design Specifications

**Modal Overlay:**
- Position: fixed, inset: 0
- Background: rgba(0, 0, 0, 0.8)
- Backdrop-filter: blur(4px)
- Z-index: 1000
- Display: flex
- Align-items: center
- Justify-content: center
- Padding: 20px

**Modal Container:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px
- Max-width: 500px
- Width: 100%
- Box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5)

**Modal Header:**
- Padding: 24px 32px
- Border-bottom: 1px solid var(--border-subtle)
- Display: flex
- Justify-content: space-between
- Align-items: center

**Modal Title:**
- Font-size: text-2xl
- Font: font-display, font-bold

**Close Button:**
- Width: 32px
- Height: 32px
- Background: transparent
- Border: none
- Color: text-secondary
- Cursor: pointer
- Border-radius: 6px
- Transition: all 0.2s

**Close Hover:**
- Background: var(--bg-tertiary)
- Color: white

**Modal Body:**
- Padding: 32px

**Form Field:**
- Margin-bottom: 24px

**Label:**
- Font-size: text-sm
- Font-weight: 600
- Color: white
- Margin-bottom: 8px
- Display: block

**Text Input:**
- Width: 100%
- Height: 48px
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 0 16px
- Color: white
- Font-size: text-base
- Transition: all 0.2s

**Input Focus:**
- Border-color: var(--app-2-accent)
- Outline: none
- Box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1)

**Helper Text:**
- Font-size: text-xs
- Color: text-tertiary
- Margin-top: 6px

**Character Counter:**
- Font-size: text-xs
- Font: font-mono
- Color: text-tertiary
- Float: right
- Margin-top: 6px

**Modal Footer:**
- Padding: 24px 32px
- Border-top: 1px solid var(--border-subtle)
- Display: flex
- Gap: 12px
- Justify-content: flex-end

**Footer Buttons:**
- Height: 48px
- Padding: 0 24px
- Border-radius: 8px
- Font-weight: 600

---

## 🧮 STREAK LOGIC

### Data Structure

```javascript
// Metric object
{
  id: 'uuid-v4',
  name: 'Training',
  createdAt: '2026-01-15T00:00:00Z',
  history: [
    {
      date: '2026-01-15', // YYYY-MM-DD
      status: 'done' // 'done' | 'missed' | 'rest'
    },
    {
      date: '2026-01-16',
      status: 'rest'
    },
    // ... more entries
  ],
  currentStreak: 5,
  bestStreak: 12
}

// App state
{
  metrics: [metric1, metric2, ...],
  mainStreak: 5,
  bestMainStreak: 12,
  lastCheckinDate: '2026-01-27'
}
```

### Main Streak Calculation

**Rules:**
1. Calculate daily score: (doneCount + restCount) / totalMetrics
2. If score ≥ 0.5 (50%+), day counts toward streak
3. If score < 0.5, streak resets to 0
4. Streak only counts consecutive days where score ≥ 0.5

**Logic:**

```javascript
function calculateMainStreak(metrics) {
  if (!metrics || metrics.length === 0) return 0
  
  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Start from today and work backwards
  let currentDate = new Date(today)
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0]
    
    let doneCount = 0
    let restCount = 0
    let totalMetrics = metrics.length
    
    // Check each metric for this date
    for (const metric of metrics) {
      const entry = metric.history.find(h => h.date === dateStr)
      if (entry) {
        if (entry.status === 'done') doneCount++
        if (entry.status === 'rest') restCount++
      } else {
        // No entry for this date, streak might be broken
        // But if it's today and not yet answered, don't count as broken
        const isToday = dateStr === today.toISOString().split('T')[0]
        if (!isToday) {
          // No data for past date = missed = streak broken
          return streak
        }
      }
    }
    
    // Calculate daily score
    const dailyScore = (doneCount + restCount) / totalMetrics
    
    // Check if day qualifies (50%+ completion)
    if (dailyScore >= 0.5) {
      streak++
    } else {
      // Streak broken
      return streak
    }
    
    // Move to previous day
    currentDate.setDate(currentDate.getDate() - 1)
    
    // Safety: Don't go back more than 365 days
    const daysDiff = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24))
    if (daysDiff > 365) break
  }
  
  return streak
}
```

### Individual Substreak Calculation

**Rules:**
1. For each metric, count consecutive "done" days
2. "Rest" days do NOT count toward streak but do NOT break it
3. "Missed" days break the streak
4. Count backwards from today

**Logic:**

```javascript
function calculateSubstreak(metric) {
  if (!metric || !metric.history || metric.history.length === 0) return 0
  
  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let currentDate = new Date(today)
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const entry = metric.history.find(h => h.date === dateStr)
    
    if (!entry) {
      // No entry for this date
      const isToday = dateStr === today.toISOString().split('T')[0]
      if (!isToday) {
        // Past date with no entry = missed = streak broken
        return streak
      }
      // If it's today and no entry yet, don't count as broken
      // Just stop counting here
      return streak
    }
    
    if (entry.status === 'done') {
      streak++
    } else if (entry.status === 'rest') {
      // Rest doesn't break streak, but doesn't increment it
      // Continue checking previous days
    } else if (entry.status === 'missed') {
      // Missed breaks the streak
      return streak
    }
    
    // Move to previous day
    currentDate.setDate(currentDate.getDate() - 1)
    
    // Safety: Don't go back more than 365 days
    const daysDiff = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24))
    if (daysDiff > 365) break
  }
  
  return streak
}
```

### Best Streak Tracking

**Logic:**

```javascript
function calculateBestStreak(metric) {
  if (!metric || !metric.history || metric.history.length === 0) return 0
  
  let bestStreak = 0
  let currentStreak = 0
  
  // Sort history by date (oldest first)
  const sortedHistory = [...metric.history].sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  )
  
  for (const entry of sortedHistory) {
    if (entry.status === 'done') {
      currentStreak++
      bestStreak = Math.max(bestStreak, currentStreak)
    } else if (entry.status === 'rest') {
      // Rest doesn't break streak
      continue
    } else {
      // Missed breaks streak
      currentStreak = 0
    }
  }
  
  return bestStreak
}
```

### Daily Check-in Logic

**Flow:**

```javascript
function answerCheckIn(metricId, status) {
  const today = new Date().toISOString().split('T')[0]
  
  // Find metric
  const metric = metrics.find(m => m.id === metricId)
  if (!metric) return
  
  // Check if already answered today
  const existingEntry = metric.history.find(h => h.date === today)
  
  if (existingEntry) {
    // Update existing entry
    existingEntry.status = status
  } else {
    // Add new entry
    metric.history.push({
      date: today,
      status: status
    })
  }
  
  // Recalculate streaks
  metric.currentStreak = calculateSubstreak(metric)
  metric.bestStreak = calculateBestStreak(metric)
  
  // Recalculate main streak
  const mainStreak = calculateMainStreak(metrics)
  
  // Save to storage
  saveToStorage()
  
  // Check if all metrics answered
  const allAnswered = checkIfAllMetricsAnsweredToday()
  if (allAnswered) {
    // Show success message
    // Trigger confetti if streak increased
  }
}
```

---

## 🎬 USER INTERACTIONS & ANIMATIONS

### Adding a Metric

**Flow:**
1. Click "Add New Metric" button
2. Modal fades in
3. Input field auto-focused
4. User types metric name
5. Click "Add Metric"
6. Modal closes with fade
7. New metric card appears in Today's Check-in section
8. New metric card appears in Individual Streaks section
9. Success toast: "Metric added! 🔥" (2 seconds)

**Animation:**
- Modal entrance: opacity 0 → 1, scale 0.95 → 1, 250ms
- New card: slide down from top + fade in, 300ms
- Stagger if multiple cards

### Answering Check-in (Yes/No/Rest)

**Flow:**
1. User clicks one of three buttons
2. Buttons fade out
3. Status badge fades in with color
4. Card border changes color
5. Progress bar updates
6. If all answered: Confetti + success message
7. Main streak counter updates (if changed)
8. Substreak counter updates

**Animation:**
- Button → Badge transition: Cross-fade, 200ms
- Card border color: Transition 300ms
- Progress bar fill: Width transition 500ms ease-out
- Streak number: Count up animation if increased, shake if maintained
- Confetti: If main streak increased

### Streak Breaking

**Flow:**
1. User answers with too many "No"s (main streak < 50%)
2. Main streak counter shakes violently
3. Number turns red
4. Fire emoji disappears, skull appears
5. Background briefly flashes red
6. Warning message appears
7. Haptic feedback (if mobile)

**Animation:**
- Shake: translateX(-10px) → (+10px) → 0, 400ms, 3 iterations
- Color change: Transition 300ms
- Icon swap: Cross-fade, 500ms
- Flash: Red overlay opacity 0 → 0.1 → 0, 600ms

### Calendar Heatmap Interaction

**Flow:**
1. User hovers over day cell
2. Cell scales up slightly
3. Tooltip appears showing date + status
4. User moves mouse away
5. Cell scales back
6. Tooltip fades out

**Animation:**
- Scale: 1 → 1.15, 150ms ease-out
- Tooltip: opacity 0 → 1, translateY(5px) → 0, 200ms

### Deleting a Metric

**Flow:**
1. Click delete icon
2. Confirmation modal appears: "Delete {metricName}? This will erase all history."
3. User confirms
4. Card fades out and slides up
5. Other cards slide to fill gap
6. Success toast: "Metric deleted" (2 seconds, red)

**Animation:**
- Card exit: opacity 1 → 0, translateY(0) → (-20px), 300ms
- Gap fill: All cards below translateY upward, 300ms ease-in-out

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 640px)

**Main Streak Hero:**
- Reduce flame to 80px
- Streak number: text-5xl
- Reduce padding to 40px vertical

**Today's Check-In:**
- Metric cards stack vertically
- Buttons stack vertically within card (full width each)
- Reduce padding

**Individual Streaks:**
- 1 column grid
- Calendar: Maintain 7 columns (days of week)
- Reduce cell size

**Manage Metrics:**
- Full width cards

### Tablet (641-1024px)

**Individual Streaks:**
- 2 column grid
- Maintain card sizes

### Desktop (1025px+)

**All sections:**
- Max widths enforced
- Hover effects enabled

---

## 💾 DATA PERSISTENCE

### Storage Strategy

**localStorage for MVP:**

```javascript
const STORAGE_KEY = 'streak_commander_data'

// Save data
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Load data
function loadData() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {
    metrics: [],
    mainStreak: 0,
    bestMainStreak: 0,
    lastCheckinDate: null
  }
}
```

**Data Structure:**
```javascript
{
  metrics: [
    {
      id: 'uuid',
      name: 'Training',
      createdAt: '2026-01-15T00:00:00Z',
      history: [
        { date: '2026-01-15', status: 'done' },
        { date: '2026-01-16', status: 'rest' },
        { date: '2026-01-17', status: 'done' }
      ],
      currentStreak: 2,
      bestStreak: 5
    }
  ],
  mainStreak: 2,
  bestMainStreak: 10,
  lastCheckinDate: '2026-01-27'
}
```

---

## ⚡ PERFORMANCE OPTIMIZATIONS

1. **Lazy load calendar** — Only render visible month
2. **Memoize calculations** — Cache streak calculations
3. **Debounce saves** — Don't save on every state change
4. **Virtual scrolling** — If > 20 metrics (unlikely)
5. **Optimize animations** — Use CSS transforms only

---

## 🎯 EDGE CASES & HANDLING

### What if user doesn't check in for a day?

- Main streak: If they come back and it's been > 1 day, show broken streak
- Don't backfill — can't lie about past days
- Show message: "You missed yesterday. Streak reset to 0."

### What if user changes timezone?

- Use UTC dates for consistency
- Show dates in user's local timezone for display
- But store/compare in UTC

### What if user adds a new metric mid-streak?

- New metric starts with 0 streak
- Doesn't affect main streak calculation for that day
- Only counts in main streak from day it was added

### What if user edits metric name?

- Only name changes
- All history preserved
- Streaks unaffected

### What if user deletes metric then re-adds same name?

- Treat as new metric
- No history
- Fresh start

### What if it's 11:59 PM and user hasn't checked in?

- Still counts as "today" until midnight
- After midnight, becomes "yesterday" (missed)
- Use local time for day boundaries

---

## ✅ IMPLEMENTATION CHECKLIST

**Functionality:**
- [ ] Can add new metric
- [ ] Can edit metric name
- [ ] Can delete metric with confirmation
- [ ] Can answer check-in (Yes/No/Rest)
- [ ] Can change answer for today
- [ ] Main streak calculates correctly (50% rule)
- [ ] Substreaks calculate correctly (done only, rest doesn't break)
- [ ] Best streak tracked correctly
- [ ] Progress bar updates in real-time
- [ ] Calendar heatmap shows last 30 days
- [ ] Calendar tooltips work
- [ ] Empty states work (no metrics, all answered)
- [ ] Data persists on reload

**Design:**
- [ ] Orange accent color consistent
- [ ] Fire animation pulses on active streak
- [ ] Skull appears on broken streak
- [ ] All animations smooth
- [ ] Mobile responsive (375px, 414px)
- [ ] Tablet responsive (768px)
- [ ] Desktop responsive (1280px+)
- [ ] Hover states work
- [ ] Confetti on streak increase
- [ ] Red flash on streak break

**Polish:**
- [ ] Keyboard navigation
- [ ] Screen reader friendly
- [ ] No console errors
- [ ] All copy proofread
- [ ] Timezone handling correct
- [ ] Edge cases handled

---

## 🚀 QUICK START CODE SCAFFOLD

```jsx
// StreakCommander.jsx
import { useState, useEffect } from 'react'
import { Layout } from '@/components/universal/Layout'
import { MainStreakHero } from './components/MainStreakHero'
import { TodaysCheckIn } from './components/TodaysCheckIn'
import { IndividualStreaks } from './components/IndividualStreaks'
import { ManageMetrics } from './components/ManageMetrics'
import { MetricModal } from './components/MetricModal'
import { calculateMainStreak, calculateSubstreak } from './utils/streaks'
import { loadData, saveData } from './utils/storage'

export function StreakCommander() {
  const [data, setData] = useState({ metrics: [], mainStreak: 0 })
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMetric, setEditingMetric] = useState(null)
  
  useEffect(() => {
    const loaded = loadData()
    // Recalculate all streaks on load
    const updatedMetrics = loaded.metrics.map(m => ({
      ...m,
      currentStreak: calculateSubstreak(m),
      bestStreak: calculateBestStreak(m)
    }))
    const mainStreak = calculateMainStreak(updatedMetrics)
    setData({ ...loaded, metrics: updatedMetrics, mainStreak })
  }, [])
  
  useEffect(() => {
    if (data.metrics.length > 0) {
      saveData(data)
    }
  }, [data])
  
  const handleAnswerCheckIn = (metricId, status) => {
    const today = new Date().toISOString().split('T')[0]
    
    const updatedMetrics = data.metrics.map(metric => {
      if (metric.id === metricId) {
        const existingEntry = metric.history.find(h => h.date === today)
        
        if (existingEntry) {
          existingEntry.status = status
        } else {
          metric.history.push({ date: today, status })
        }
        
        return {
          ...metric,
          currentStreak: calculateSubstreak(metric),
          bestStreak: calculateBestStreak(metric)
        }
      }
      return metric
    })
    
    const mainStreak = calculateMainStreak(updatedMetrics)
    
    setData({ ...data, metrics: updatedMetrics, mainStreak })
  }
  
  // ... more handlers
  
  return (
    <Layout appAccent="var(--app-2-accent)" appName="Streak Commander">
      <MainStreakHero 
        streak={data.mainStreak}
        metrics={data.metrics}
      />
      
      <TodaysCheckIn
        metrics={data.metrics}
        onAnswer={handleAnswerCheckIn}
      />
      
      <IndividualStreaks metrics={data.metrics} />
      
      <ManageMetrics
        metrics={data.metrics}
        onEdit={(m) => { setEditingMetric(m); setModalOpen(true) }}
        onDelete={handleDeleteMetric}
        onAddNew={() => setModalOpen(true)}
      />
      
      {modalOpen && (
        <MetricModal
          metric={editingMetric}
          onSave={editingMetric ? handleEditMetric : handleAddMetric}
          onClose={() => { setModalOpen(false); setEditingMetric(null) }}
        />
      )}
    </Layout>
  )
}
```

---

## 📊 SUCCESS METRICS

**User Engagement:**
- Average metrics per user: 3-5
- Daily check-in rate: > 70%
- Streak survival rate (30 days): > 40%
- Time on page: < 1 minute (fast check-in)

**Performance:**
- Page load: < 1 second
- Check-in response: < 100ms
- Calendar render: < 200ms

**Quality:**
- Zero data loss
- Accurate streak calculations
- Works offline (localStorage)

---

## 🎯 COPY PRINCIPLES USED

1. **Aggressive motivation** — "Don't break the chain"
2. **Clear stakes** — "You broke the chain" (not softened)
3. **Fire imagery** — Creates urgency and momentum
4. **Minimal words** — "Yes/No/Rest" not "Did you complete this?"
5. **Direct accountability** — Shows exactly what you did/didn't do

This app doesn't motivate with carrots. It uses fire and streaks to create real accountability.

---

**App Spec Version:** 1.0  
**Ready to build:** YES  
**Estimated build time:** 10-12 hours  
**Priority:** 2/6
