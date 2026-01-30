# Weekly War Map — App Specification
**Commit. Execute. Repeat.**

---

## 🎯 App Purpose

**Core Question:** "What are my 3 battles this week?"

**Core Promise:** Lock in your priorities. No distractions. No scope creep. Just execution.

**User Flow:**
1. Every Sunday (or week start), user sets 3 priority tasks
2. For each task, add up to 5 subtasks
3. Week locks — no edits, no additions, no deletions
4. User checks off subtasks as they complete them
5. Task completes only when all its subtasks are done
6. Week unlocks when all 3 tasks are complete OR new week starts

**The Lock Mechanism:**
- Once submitted, the week is LOCKED
- This creates commitment
- Forces focus on what was chosen
- No escape until completion or week reset

---

## 🎨 Visual Identity

**Accent Color:** Blue (`#3b82f6`)
**Secondary Accent:** `#60a5fa` (lighter blue)
**Background Tint:** `#1a202e`
**Vibe:** Military precision. Strategic. Locked and loaded.

**Key Visual Element:** 🔒 Lock icon when committed, ⚔️ Sword for battles

---

## 📋 Page Structure

```
┌─────────────────────────────────────┐
│     NAVBAR (Universal)              │
├─────────────────────────────────────┤
│                                     │
│     WEEK HEADER                     │
│     - Week range                    │
│     - Lock status                   │
│     - Progress indicator            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     STATE 1: PLANNING               │
│     (Sunday - Before Commit)        │
│     - 3 Task Input Forms            │
│     - 5 Subtasks per Task           │
│     - [Commit Week] Button          │
│                                     │
│     OR                              │
│                                     │
│     STATE 2: EXECUTION              │
│     (Monday-Saturday - Locked)      │
│     - 3 Task Cards (Read-only)      │
│     - Subtask Checkboxes            │
│     - Progress bars                 │
│     - Lock indicator                │
│                                     │
│     OR                              │
│                                     │
│     STATE 3: COMPLETED              │
│     (All tasks done)                │
│     - Victory message               │
│     - Summary stats                 │
│     - [Start Next Week] Button      │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 SECTION 1: WEEK HEADER

### Copy

**State A: Planning Mode (Unlocked)**

```
WEEK LABEL:
Week of {startDate} - {endDate}

STATUS BADGE:
🔓 Planning Mode

SUBTITLE:
Set your 3 priorities. Lock them in.
```

**State B: Execution Mode (Locked)**

```
WEEK LABEL:
Week of {startDate} - {endDate}

STATUS BADGE:
🔒 Locked

PROGRESS:
{completedTasks}/3 Tasks Complete • {completedSubtasks}/{totalSubtasks} Subtasks Done

TIME REMAINING:
{daysLeft} days left in this week
```

**State C: Completed**

```
WEEK LABEL:
Week of {startDate} - {endDate}

STATUS BADGE:
✅ Completed

SUBTITLE:
All 3 tasks conquered. Excellent execution.
```

### Design Specifications

**Header Container:**
- Padding: 32px horizontal, 24px vertical
- Max-width: 1200px
- Margin: 0 auto
- Border-bottom: 1px solid var(--border-subtle)

**Week Label:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Color: white
- Margin-bottom: 8px

**Status Badge:**
- Display: inline-flex
- Align-items: center
- Gap: 8px
- Padding: 8px 16px
- Border-radius: 8px
- Font-size: text-sm
- Font: font-mono
- Font-weight: 600
- Margin-bottom: 12px

**Badge Colors:**
- Planning: Background rgba(59, 130, 246, 0.1), border 1px solid rgba(59, 130, 246, 0.3), color var(--app-3-accent)
- Locked: Background rgba(239, 68, 68, 0.1), border 1px solid rgba(239, 68, 68, 0.3), color var(--error)
- Completed: Background rgba(34, 197, 94, 0.1), border 1px solid rgba(34, 197, 94, 0.3), color var(--success)

**Progress Text:**
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- Margin-bottom: 6px

**Progress Numbers:**
- Color: var(--app-3-accent)
- Font-weight: 600

**Time Remaining:**
- Font-size: text-xs
- Color: text-tertiary

**Subtitle:**
- Font-size: text-base
- Color: text-secondary
- Line-height: 1.5

---

## 🎯 SECTION 2: PLANNING MODE (State 1)

### Copy

**Section Title:**
```
Your 3 Priorities This Week
```

**Instruction Text:**
```
Choose wisely. Once committed, no changes until the week ends.
```

**Task Input (3 instances):**

```
PRIORITY {1/2/3}

Task Name:
[Input field]
Placeholder: "e.g., Launch Framo MVP, Complete React Course Module 3"
Max 80 characters

Subtasks (up to 5):
[Subtask 1 input]
[Subtask 2 input]
[Subtask 3 input]
[+ Add Subtask] (if < 5)
```

**Commit Button:**
```
🔒 Commit Week — Lock These Priorities
```

**Warning Text (below button):**
```
⚠️ Once locked, you cannot edit or add tasks until next week or completion.
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 1000px
- Margin: 32px auto

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 12px
- Text-align: center

**Instruction Text:**
- Font-size: text-base
- Color: text-secondary
- Text-align: center
- Margin-bottom: 48px
- Font-style: italic

**Tasks Container:**
- Display: flex
- Flex-direction: column
- Gap: 32px

**Task Card (Planning):**
- Background: var(--bg-secondary)
- Border: 2px solid var(--border-subtle)
- Border-radius: 16px
- Padding: 32px
- Transition: all 0.2s ease

**Priority Badge:**
- Display: inline-flex
- Padding: 6px 12px
- Background: var(--bg-tertiary)
- Border: 1px solid var(--app-3-accent)
- Border-radius: 6px
- Font-size: text-xs
- Font: font-mono
- Font-weight: 700
- Color: var(--app-3-accent)
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Margin-bottom: 20px

**Task Name Input:**
- Width: 100%
- Height: 56px
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 0 20px
- Color: white
- Font-size: text-lg
- Font-weight: 600
- Margin-bottom: 24px
- Transition: all 0.2s

**Task Name Input Focus:**
- Border-color: var(--app-3-accent)
- Box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1)
- Outline: none

**Subtasks Label:**
- Font-size: text-sm
- Font-weight: 600
- Color: text-secondary
- Margin-bottom: 12px
- Display: block

**Subtasks Container:**
- Display: flex
- Flex-direction: column
- Gap: 10px

**Subtask Input:**
- Width: 100%
- Height: 44px
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 0 16px
- Color: white
- Font-size: text-base
- Transition: all 0.2s

**Subtask Input Focus:**
- Border-color: var(--app-3-accent)
- Box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1)
- Outline: none

**Add Subtask Button:**
- Width: 100%
- Height: 40px
- Background: transparent
- Border: 1px dashed var(--border-strong)
- Border-radius: 8px
- Color: text-secondary
- Font-size: text-sm
- Font-weight: 500
- Cursor: pointer
- Margin-top: 6px
- Transition: all 0.2s

**Add Subtask Hover:**
- Border-color: var(--app-3-accent)
- Color: var(--app-3-accent)
- Background: rgba(59, 130, 246, 0.05)

**Remove Subtask Button:**
- Position: absolute
- Right: 12px
- Top: 50%
- Transform: translateY(-50%)
- Width: 24px
- Height: 24px
- Background: transparent
- Border: none
- Color: text-tertiary
- Cursor: pointer
- Opacity: 0
- Transition: all 0.2s

**Subtask Input Container (wrapper for remove button):**
- Position: relative

**Subtask Input Container Hover:**
- Remove button opacity: 1

**Commit Button:**
- Width: 100%
- Max-width: 500px
- Height: 64px
- Background: Linear gradient (var(--app-3-accent), var(--app-3-accent-light))
- Border: none
- Border-radius: 12px
- Color: white
- Font-size: text-lg
- Font-weight: 700
- Cursor: pointer
- Margin: 48px auto 16px
- Display: flex
- Align-items: center
- Justify-content: center
- Gap: 12px
- Transition: all 0.3s
- Box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2)

**Commit Button Hover:**
- Transform: translateY(-2px)
- Box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3)

**Commit Button Disabled:**
- Opacity: 0.5
- Cursor: not-allowed
- Transform: none

**Warning Text:**
- Font-size: text-sm
- Color: var(--warning)
- Text-align: center
- Font: font-mono
- Line-height: 1.6
- Max-width: 500px
- Margin: 0 auto

---

## ⚔️ SECTION 3: EXECUTION MODE (State 2)

### Copy

**Section Title:**
```
This Week's Battles
```

**Lock Message:**
```
🔒 Week is locked. Focus on execution.
```

**Task Card Header:**

```
PRIORITY {1/2/3}
TASK NAME: {taskName}

PROGRESS: {completedSubtasks}/5 subtasks complete
[Progress Bar]

STATUS:
[If all subtasks done] ✅ COMPLETE
[If in progress] 🔄 IN PROGRESS
```

**Subtask Items:**

```
☐ {subtaskName} (unchecked)
☑ {subtaskName} (checked)
```

**Overall Progress:**
```
Week Progress: {completedTasks}/3 Tasks • {completedSubtasks}/15 Subtasks
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 1200px
- Margin: 32px auto

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 12px
- Text-align: center

**Lock Message:**
- Font-size: text-base
- Color: var(--error)
- Text-align: center
- Font: font-mono
- Margin-bottom: 48px
- Display: flex
- Align-items: center
- Justify-content: center
- Gap: 8px

**Tasks Grid:**
- Display: grid
- Grid: 1 column (mobile), 1 column (tablet), 3 columns (desktop)
- Gap: 24px

**Task Card (Execution):**
- Background: var(--bg-secondary)
- Border: 2px solid var(--border-subtle)
- Border-radius: 16px
- Padding: 24px
- Height: fit-content
- Transition: all 0.2s

**Task Card (Completed):**
- Border-color: var(--success)
- Background: Linear gradient (rgba(34, 197, 94, 0.05), transparent)

**Task Card Hover:**
- Border-color: var(--app-3-accent)
- Transform: translateY(-2px)
- Box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1)

**Priority Badge (Execution):**
- Same as planning mode
- Margin-bottom: 16px

**Task Name (Execution):**
- Font-size: text-xl
- Font: font-display, font-bold
- Color: white
- Margin-bottom: 16px
- Line-height: 1.3

**Progress Text:**
- Font-size: text-xs
- Font: font-mono
- Color: text-secondary
- Margin-bottom: 8px

**Progress Bar Container:**
- Width: 100%
- Height: 6px
- Background: var(--bg-tertiary)
- Border-radius: 999px
- Overflow: hidden
- Margin-bottom: 16px

**Progress Bar Fill:**
- Height: 100%
- Background: Linear gradient (var(--app-3-accent), var(--app-3-accent-light))
- Border-radius: 999px
- Transition: width 0.4s ease-out

**Status Badge:**
- Display: inline-flex
- Align-items: center
- Gap: 6px
- Padding: 6px 12px
- Border-radius: 6px
- Font-size: text-xs
- Font: font-mono
- Font-weight: 600
- Margin-bottom: 20px

**Status Complete:**
- Background: rgba(34, 197, 94, 0.1)
- Border: 1px solid var(--success)
- Color: var(--success)

**Status In Progress:**
- Background: rgba(59, 130, 246, 0.1)
- Border: 1px solid var(--app-3-accent)
- Color: var(--app-3-accent)

**Subtasks List:**
- Display: flex
- Flex-direction: column
- Gap: 12px

**Subtask Item:**
- Display: flex
- Align-items: flex-start
- Gap: 12px
- Padding: 10px
- Background: var(--bg-tertiary)
- Border-radius: 8px
- Cursor: pointer
- Transition: all 0.2s
- Position: relative

**Subtask Item Hover:**
- Background: rgba(59, 130, 246, 0.05)

**Subtask Item (Checked):**
- Background: rgba(34, 197, 94, 0.05)
- Opacity: 0.7

**Checkbox:**
- Width: 20px
- Height: 20px
- Min-width: 20px
- Border: 2px solid var(--border-strong)
- Border-radius: 4px
- Background: transparent
- Cursor: pointer
- Transition: all 0.2s
- Display: flex
- Align-items: center
- Justify-content: center

**Checkbox (Checked):**
- Background: var(--app-3-accent)
- Border-color: var(--app-3-accent)

**Checkbox Icon (Checked):**
- Content: "✓"
- Color: white
- Font-size: 14px
- Font-weight: bold

**Subtask Text:**
- Font-size: text-sm
- Color: white
- Line-height: 1.5
- Flex: 1

**Subtask Text (Checked):**
- Text-decoration: line-through
- Color: text-tertiary

**Overall Progress (Bottom):**
- Margin-top: 48px
- Padding: 24px
- Background: rgba(59, 130, 246, 0.05)
- Border: 1px solid rgba(59, 130, 246, 0.2)
- Border-radius: 12px
- Text-align: center
- Font-size: text-lg
- Font: font-mono
- Color: var(--app-3-accent)
- Font-weight: 600

---

## 🏆 SECTION 4: COMPLETED STATE (State 3)

### Copy

**Victory Icon:**
```
🏆
```

**Headline:**
```
Week Conquered.
```

**Subtext:**
```
All 3 priorities executed. {totalSubtasks} subtasks completed.
```

**Stats Summary:**

```
WEEK STATS:

Tasks Completed: 3/3
Subtasks Completed: {total}/15
Completion Rate: 100%
Days Taken: {daysTaken}/7
```

**Action Button:**
```
Start Next Week
```

**Or (if it's not Sunday yet):**
```
Next week planning opens on {nextSunday}
```

### Design Specifications

**Completed Container:**
- Padding: 80px 32px
- Max-width: 700px
- Margin: 0 auto
- Text-align: center

**Victory Icon:**
- Font-size: 120px
- Margin-bottom: 24px
- Animation: Bounce in on render (scale 0 → 1.2 → 1, 600ms)

**Headline:**
- Font-size: text-5xl
- Font: font-display, font-black
- Color: var(--success)
- Margin-bottom: 16px

**Subtext:**
- Font-size: text-xl
- Color: text-secondary
- Line-height: 1.6
- Margin-bottom: 48px

**Stats Container:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px
- Padding: 32px
- Margin-bottom: 48px

**Stats Title:**
- Font-size: text-sm
- Font: font-mono
- Text-transform: uppercase
- Letter-spacing: 0.15em
- Color: text-tertiary
- Margin-bottom: 24px

**Stats Grid:**
- Display: grid
- Grid-template-columns: repeat(2, 1fr)
- Gap: 24px

**Stat Item:**
- Display: flex
- Flex-direction: column
- Align-items: center

**Stat Value:**
- Font-size: text-3xl
- Font: font-display, font-black
- Color: var(--success)
- Line-height: 1
- Margin-bottom: 8px

**Stat Label:**
- Font-size: text-xs
- Color: text-secondary
- Text-transform: uppercase
- Letter-spacing: 0.1em

**Action Button:**
- Width: 100%
- Max-width: 400px
- Height: 64px
- Background: Linear gradient (var(--app-3-accent), var(--app-3-accent-light))
- Border: none
- Border-radius: 12px
- Color: white
- Font-size: text-lg
- Font-weight: 700
- Cursor: pointer
- Transition: all 0.3s
- Box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2)

**Action Button Hover:**
- Transform: translateY(-2px)
- Box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3)

**Wait Message:**
- Font-size: text-base
- Color: text-tertiary
- Font: font-mono
- Line-height: 1.6

---

## 🔒 LOCK LOGIC & WEEK MANAGEMENT

### Week Determination

**Week Start:** Sunday 00:00 local time
**Week End:** Saturday 23:59 local time

```javascript
function getCurrentWeekRange() {
  const now = new Date()
  
  // Find the most recent Sunday
  const dayOfWeek = now.getDay() // 0 = Sunday
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - dayOfWeek)
  sunday.setHours(0, 0, 0, 0)
  
  // Find the upcoming Saturday
  const saturday = new Date(sunday)
  saturday.setDate(sunday.getDate() + 6)
  saturday.setHours(23, 59, 59, 999)
  
  return {
    start: sunday,
    end: saturday,
    weekId: sunday.toISOString().split('T')[0] // Use Sunday's date as unique week ID
  }
}
```

### State Determination

```javascript
function determineWeekState(weekData, currentWeek) {
  // Check if there's data for current week
  if (!weekData || weekData.weekId !== currentWeek.weekId) {
    // No data for this week yet
    return 'PLANNING'
  }
  
  // Check if week is locked
  if (weekData.locked) {
    // Check if all tasks are complete
    const allComplete = weekData.tasks.every(task => 
      task.subtasks.every(subtask => subtask.completed)
    )
    
    if (allComplete) {
      return 'COMPLETED'
    }
    
    return 'EXECUTION'
  }
  
  // Week exists but not locked yet
  return 'PLANNING'
}
```

### Lock Mechanism

**Conditions to Lock:**
1. At least 1 task with task name filled
2. Each task with name must have at least 1 subtask
3. User clicks "Commit Week" button

```javascript
function canLockWeek(tasks) {
  // Filter tasks that have a name
  const namedTasks = tasks.filter(t => t.name && t.name.trim() !== '')
  
  // Must have at least 1 task
  if (namedTasks.length === 0) return false
  
  // Each named task must have at least 1 subtask
  for (const task of namedTasks) {
    const filledSubtasks = task.subtasks.filter(s => s && s.trim() !== '')
    if (filledSubtasks.length === 0) return false
  }
  
  return true
}

function lockWeek(weekData) {
  return {
    ...weekData,
    locked: true,
    lockedAt: new Date().toISOString()
  }
}
```

### Unlock Conditions

**Week unlocks when:**
1. All 3 tasks completed (all subtasks checked)
2. New week starts (it's Sunday and current weekId ≠ stored weekId)

```javascript
function shouldUnlock(weekData, currentWeek) {
  // Check if new week started
  if (weekData.weekId !== currentWeek.weekId) {
    return true
  }
  
  // Check if all tasks complete
  const allComplete = weekData.tasks.every(task =>
    task.subtasks.every(subtask => subtask.completed)
  )
  
  return allComplete
}
```

### Data Structure

```javascript
{
  weekId: '2026-01-26', // Sunday's date (YYYY-MM-DD)
  locked: true,
  lockedAt: '2026-01-26T14:32:00Z',
  tasks: [
    {
      id: 'uuid-1',
      name: 'Launch Framo MVP',
      priority: 1,
      subtasks: [
        { id: 'uuid-sub-1', text: 'Finish auth system', completed: true },
        { id: 'uuid-sub-2', text: 'Deploy to production', completed: false },
        { id: 'uuid-sub-3', text: 'Add analytics', completed: false }
      ],
      completed: false, // Auto-calculated from subtasks
      completedAt: null
    },
    {
      id: 'uuid-2',
      name: 'Complete React Course Module 3',
      priority: 2,
      subtasks: [
        { id: 'uuid-sub-4', text: 'Watch all videos', completed: true },
        { id: 'uuid-sub-5', text: 'Build practice project', completed: true },
        { id: 'uuid-sub-6', text: 'Complete quiz', completed: true }
      ],
      completed: true,
      completedAt: '2026-01-28T18:45:00Z'
    },
    {
      id: 'uuid-3',
      name: 'Train 5x this week',
      priority: 3,
      subtasks: [
        { id: 'uuid-sub-7', text: 'Monday session', completed: true },
        { id: 'uuid-sub-8', text: 'Wednesday session', completed: false },
        { id: 'uuid-sub-9', text: 'Friday session', completed: false },
        { id: 'uuid-sub-10', text: 'Saturday session', completed: false }
      ],
      completed: false,
      completedAt: null
    }
  ],
  completedAt: null // Set when all tasks complete
}
```

---

## 🎬 USER INTERACTIONS & ANIMATIONS

### Locking the Week

**Flow:**
1. User fills in tasks and subtasks
2. Clicks "Commit Week" button
3. Confirmation modal appears: "Lock this week? You can't edit until completion or next week."
4. User confirms
5. Button shows loading spinner
6. Screen transitions with lock animation
7. Lock icon appears with click sound effect
8. Cards transform from input fields to read-only display
9. Success message: "🔒 Week locked. Execute with focus."

**Animation:**
- Modal: Fade in + scale 0.95 → 1, 250ms
- Lock icon: Rotate 360deg + scale 0 → 1.2 → 1, 500ms
- Cards transformation: Morph inputs to display, 400ms
- Lock sound: Click/lock sound effect (optional)

### Checking Off Subtask

**Flow:**
1. User clicks checkbox or subtask item
2. Checkbox animates check mark
3. Text strikes through
4. Progress bar updates
5. If all subtasks in task done: Task completion animation
6. If all tasks done: Week completion celebration

**Animation:**
- Checkbox: Scale 0.8 → 1.1 → 1, 300ms
- Checkmark: Draw animation (stroke-dashoffset), 250ms
- Strike-through: Width 0% → 100%, 300ms
- Progress bar: Width transition, 400ms ease-out
- Task complete: Green glow pulse, 600ms

### Task Completion

**Flow:**
1. Last subtask in task checked
2. Task card border pulses green
3. "✅ COMPLETE" badge appears
4. Confetti burst (brief, localized to card)
5. Card slightly elevates
6. Success sound (optional)

**Animation:**
- Border pulse: Green opacity 0 → 1 → 0.3, 800ms
- Badge: Slide in from top, 300ms
- Confetti: 15-20 particles, 1s duration
- Elevation: translateY(-4px), 300ms

### Week Completion

**Flow:**
1. Last subtask of last task checked
2. All cards pulse green simultaneously
3. Screen fades to completed state
4. Trophy icon bounces in
5. Confetti explosion (full screen)
6. Victory message appears
7. Stats count up

**Animation:**
- Cards pulse: Synchronized green flash, 600ms
- Fade transition: Opacity 1 → 0, 400ms
- Trophy bounce: Scale 0 → 1.2 → 0.9 → 1, 800ms
- Confetti: 50-100 particles, 2s duration
- Stats count: Number count up, 800ms

### Starting New Week

**Flow:**
1. User clicks "Start Next Week" (if available)
2. Confirmation: "Start planning next week?"
3. User confirms
4. Completed state fades out
5. Planning mode fades in
6. Fresh empty forms appear
7. Focus auto-set to first task name input

**Animation:**
- Fade out: Opacity 1 → 0, 300ms
- Fade in: Opacity 0 → 1, 300ms
- Forms appear: Stagger each form 100ms delay

### Auto-Unlock on New Week

**Flow:**
1. User visits app on new Sunday
2. App detects new week
3. Shows transition message: "New week started. Last week archived."
4. Unlocks automatically
5. Shows planning mode
6. Option to view last week's results

**Animation:**
- Transition message: Slide down from top, 400ms
- Auto-fade after 3 seconds

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 640px)

**Planning Mode:**
- Single column layout
- Full width task cards
- Stack subtasks vertically
- Commit button full width

**Execution Mode:**
- Single column grid (tasks stack)
- Full width task cards
- Checkboxes slightly larger (easier tap)

**Completed State:**
- Trophy icon: 80px
- Stats grid: 2x2
- Full width button

### Tablet (641-1024px)

**Execution Mode:**
- 2 column grid (if 2 tasks)
- 3 column grid (if 3 tasks)
- Maintain spacing

### Desktop (1025px+)

**Planning Mode:**
- Centered, max-width 1000px
- Comfortable spacing

**Execution Mode:**
- 3 column grid (one per task)
- Equal height cards

---

## 💾 DATA PERSISTENCE

### Storage Strategy

**localStorage for MVP:**

```javascript
const STORAGE_KEY = 'weekly_war_map_data'

// Save week data
function saveWeekData(weekData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(weekData))
}

// Load week data
function loadWeekData() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

// Archive completed week
function archiveWeek(weekData) {
  const archiveKey = `weekly_war_map_archive_${weekData.weekId}`
  localStorage.setItem(archiveKey, JSON.stringify(weekData))
}
```

### Auto-Save

- Save on every subtask check/uncheck
- Save on task name change (planning mode)
- Save on subtask add/remove (planning mode)
- Save on lock action

---

## ⚡ PERFORMANCE OPTIMIZATIONS

1. **Debounce input saves** — Save after 500ms of no typing
2. **Memoize calculations** — Cache completed counts
3. **Virtual scrolling** — Not needed (max 3 tasks)
4. **Optimize re-renders** — Use React.memo on task cards
5. **Lazy load confetti** — Only load library when needed

---

## 🎯 EDGE CASES & HANDLING

### What if user tries to edit during locked week?

- Show toast: "🔒 Week is locked. Focus on execution, not planning."
- All input fields disabled, grayed out
- Only checkboxes are interactive

### What if user manually changes system date?

- Use server time if available
- Otherwise, trust local time (it's their own accountability)
- Don't worry about gaming the system — they're only cheating themselves

### What if week has no tasks (all empty)?

- Don't allow locking
- Commit button stays disabled
- Show helper text: "Add at least 1 task to commit"

### What if user adds only 1 or 2 tasks (not 3)?

- That's fine, allow it
- Progress shows X/X (where X is number of tasks they committed)
- Example: 2 tasks committed = "2/2 Tasks Complete"

### What if user deletes all subtasks?

- Require at least 1 subtask per task
- Don't allow removing last subtask
- Show message: "Task must have at least 1 subtask"

### What if it's mid-week and they haven't committed yet?

- Still allow planning mode
- Show warning: "It's {currentDay}. Lock your week now to stay on track."
- Can lock any time before Saturday ends

### What if user completes week early (like Tuesday)?

- Show completed state immediately
- Celebrate the early win
- Show option: "Start Next Week" but grayed out if not Sunday yet
- Message: "Early victory! Next planning opens {nextSunday}"

---

## ✅ IMPLEMENTATION CHECKLIST

**Functionality:**
- [ ] Can add task names (up to 3)
- [ ] Can add subtasks per task (up to 5)
- [ ] Can remove subtasks (if > 1)
- [ ] Can commit/lock week
- [ ] Can check/uncheck subtasks (execution mode)
- [ ] Cannot edit when locked
- [ ] Task auto-completes when all subtasks done
- [ ] Week auto-completes when all tasks done
- [ ] Week auto-unlocks on new Sunday
- [ ] Progress bar updates correctly
- [ ] Stats calculate correctly
- [ ] Data persists on reload
- [ ] Can view completed state
- [ ] Can start new week (if Sunday)

**Design:**
- [ ] Blue accent color consistent
- [ ] Lock icon appears correctly
- [ ] Planning mode layout correct
- [ ] Execution mode layout correct
- [ ] Completed state layout correct
- [ ] Progress bars animate smoothly
- [ ] Checkboxes work properly
- [ ] All animations smooth (60fps)
- [ ] Confetti triggers correctly
- [ ] Mobile responsive (375px, 414px)
- [ ] Tablet responsive (768px)
- [ ] Desktop responsive (1280px+)

**Polish:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] No console errors
- [ ] All copy proofread
- [ ] Confirmation modals work
- [ ] Toast messages appear
- [ ] Sound effects (optional)
- [ ] Archive system works

---

## 🚀 QUICK START CODE SCAFFOLD

```jsx
// WeeklyWarMap.jsx
import { useState, useEffect } from 'react'
import { Layout } from '@/components/universal/Layout'
import { WeekHeader } from './components/WeekHeader'
import { PlanningMode } from './components/PlanningMode'
import { ExecutionMode } from './components/ExecutionMode'
import { CompletedState } from './components/CompletedState'
import { getCurrentWeekRange, determineWeekState } from './utils/weekLogic'
import { loadWeekData, saveWeekData } from './utils/storage'

export function WeeklyWarMap() {
  const [weekData, setWeekData] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(null)
  const [weekState, setWeekState] = useState('PLANNING')
  
  useEffect(() => {
    const week = getCurrentWeekRange()
    setCurrentWeek(week)
    
    const data = loadWeekData()
    
    // Check if data is for current week
    if (data && data.weekId === week.weekId) {
      setWeekData(data)
    } else {
      // New week or no data
      setWeekData({
        weekId: week.weekId,
        locked: false,
        tasks: [
          { id: crypto.randomUUID(), name: '', priority: 1, subtasks: [''], completed: false },
          { id: crypto.randomUUID(), name: '', priority: 2, subtasks: [''], completed: false },
          { id: crypto.randomUUID(), name: '', priority: 3, subtasks: [''], completed: false }
        ]
      })
    }
  }, [])
  
  useEffect(() => {
    if (weekData && currentWeek) {
      const state = determineWeekState(weekData, currentWeek)
      setWeekState(state)
    }
  }, [weekData, currentWeek])
  
  useEffect(() => {
    if (weekData) {
      saveWeekData(weekData)
    }
  }, [weekData])
  
  const handleLockWeek = () => {
    setWeekData({
      ...weekData,
      locked: true,
      lockedAt: new Date().toISOString()
    })
  }
  
  const handleToggleSubtask = (taskId, subtaskId) => {
    setWeekData(prev => ({
      ...prev,
      tasks: prev.tasks.map(task => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map(sub =>
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          )
          const allComplete = updatedSubtasks.every(s => s.completed)
          return {
            ...task,
            subtasks: updatedSubtasks,
            completed: allComplete,
            completedAt: allComplete ? new Date().toISOString() : null
          }
        }
        return task
      })
    }))
  }
  
  return (
    <Layout appAccent="var(--app-3-accent)" appName="Weekly War Map">
      <WeekHeader 
        weekRange={currentWeek}
        weekState={weekState}
        weekData={weekData}
      />
      
      {weekState === 'PLANNING' && (
        <PlanningMode
          weekData={weekData}
          onUpdateWeekData={setWeekData}
          onLock={handleLockWeek}
        />
      )}
      
      {weekState === 'EXECUTION' && (
        <ExecutionMode
          weekData={weekData}
          onToggleSubtask={handleToggleSubtask}
        />
      )}
      
      {weekState === 'COMPLETED' && (
        <CompletedState
          weekData={weekData}
          currentWeek={currentWeek}
        />
      )}
    </Layout>
  )
}
```

---

## 📊 SUCCESS METRICS

**User Engagement:**
- Weekly planning rate: > 80%
- Week completion rate: > 50%
- Average tasks per week: 2-3
- Average subtasks per task: 3-4

**Performance:**
- Page load: < 1 second
- Lock action: < 500ms
- Checkbox toggle: < 100ms
- Smooth animations: 60fps

**Quality:**
- Zero data loss
- Accurate state management
- Correct week calculations
- No date/time bugs

---

## 🎯 COPY PRINCIPLES USED

1. **Military precision** — "Weekly War Map" "Battles" "Execute"
2. **Lock metaphor** — Creates psychological commitment
3. **No escape clauses** — "Once locked, you cannot edit"
4. **Victory language** — "Week Conquered" not "Week Finished"
5. **Urgency** — "It's Wednesday. Lock your week now."

This app doesn't suggest or recommend. It commands and locks. You commit or you don't. There's no middle ground.

---

**App Spec Version:** 1.0  
**Ready to build:** YES  
**Estimated build time:** 12-14 hours  
**Priority:** 3/6
