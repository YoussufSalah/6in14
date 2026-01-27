# Decision Fatigue — App Specification
**Dead Simple Priority Calculator**

---

## 🎯 App Purpose

**One Question Answered:** "What should I work on right now?"

**Core Promise:** Input all your goals once. Get one clear answer. Zero decision fatigue.

**User Flow:**
1. User adds goals (as many as they want)
2. For each goal: Name + Priority + Deadline + Impact
3. System calculates scores
4. System shows THE ONE goal to work on today
5. User marks it done or defers to tomorrow

---

## 🎨 Visual Identity

**Accent Color:** Purple (`#a855f7`)
**Background Tint:** `#1e1b2e`
**Vibe:** Focused, commanding, almost meditative

**Key Visual Element:** Large glowing card for "The One Task"

---

## 📋 Page Structure

```
┌─────────────────────────────────────┐
│     NAVBAR (Universal)              │
├─────────────────────────────────────┤
│                                     │
│     PAGE HEADER                     │
│     - Title                         │
│     - Subtitle                      │
│     - Quick Stats                   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     THE ONE TASK CARD               │
│     (If goals exist)                │
│     OR                              │
│     EMPTY STATE                     │
│     (If no goals)                   │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     ALL GOALS LIST                  │
│     - Sorted by score               │
│     - Editable inline               │
│     - Add new goal button           │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 SECTION 1: PAGE HEADER

### Copy

**Page Title**
```
Decision Fatigue
```

**Subtitle**
```
Your mission for today, calculated from your goals.
```

**Quick Stats** (If goals exist)
```
{goalCount} active goals • Top priority locked
```

**Quick Stats** (If no goals)
```
No goals yet. Add your first one below.
```

### Design Specifications

**Layout:**
- Padding: 32px horizontal, 24px vertical
- Max-width: 1200px
- Margin: 0 auto

**Title:**
- text-3xl, font-display, font-bold
- Color: white
- Margin-bottom: 8px

**Subtitle:**
- text-base, text-secondary
- Line-height: 1.5

**Quick Stats:**
- text-sm, font-mono
- Color: var(--app-1-accent)
- Margin-top: 12px
- Display: flex, gap: 12px
- Bullet separator: • (using ::before pseudo-element)

---

## 🎯 SECTION 2: THE ONE TASK CARD

### States

**State A: Goal Exists (Primary State)**

**Copy:**

```
LABEL (Small, uppercase):
YOUR MISSION TODAY

TASK NAME (Large, bold):
{goal.name}

METADATA ROW:
Priority: {priority} • Deadline: {daysLeft} days • Impact: {impact}

SCORE DISPLAY:
Score: {calculatedScore.toFixed(2)} / 100

ACTION BUTTONS:
[Primary Button] Mark Complete
[Secondary Button] Skip Today
```

**State B: All Goals Completed**

**Copy:**

```
ICON: ✅ (Large)

HEADLINE:
All clear.

SUBTEXT:
You've completed or skipped all goals for today. Add new goals or come back tomorrow.

ACTION:
[Ghost Button] Add New Goal
```

**State C: No Goals Yet (Empty State)**

**Copy:**

```
ICON: 🎯 (Large)

HEADLINE:
Add your first goal.

SUBTEXT:
Tell me what you're working on, and I'll tell you what to focus on first.

ACTION:
[Primary Button] Add Goal
```

### Design Specifications

**Card Container:**
- Background: Gradient from `rgba(168, 85, 247, 0.1)` to transparent
- Border: 2px solid `rgba(168, 85, 247, 0.3)`
- Border-radius: 16px
- Padding: 48px
- Max-width: 800px
- Margin: 32px auto
- Box-shadow: 0 8px 32px `rgba(168, 85, 247, 0.15)`
- Backdrop-filter: blur(8px) (glassmorphism effect)

**State A Design:**

**Label:**
- text-xs, font-mono, uppercase
- Letter-spacing: 0.15em
- Color: var(--app-1-accent-light)
- Margin-bottom: 16px
- Opacity: 0.8

**Task Name:**
- text-4xl (desktop) / text-3xl (mobile)
- font-display, font-bold
- Color: white
- Line-height: 1.2
- Margin-bottom: 24px
- Max-width: 100%
- Word-break: break-word

**Metadata Row:**
- text-sm, font-body
- Color: text-secondary
- Display: flex, gap: 16px
- Flex-wrap: wrap
- Margin-bottom: 16px

**Each Metadata Item:**
- Display: inline-flex, align-items: center
- Gap: 4px
- Separator: • (middle dot)

**Score Display:**
- text-lg, font-mono
- Color: var(--app-1-accent)
- Margin-bottom: 32px
- Font-weight: 600

**Action Buttons:**
- Display: flex, gap: 16px
- Flex-wrap: wrap (mobile)
- Primary button: 48px height, purple background
- Secondary button: 48px height, outline only
- Both: min-width 160px

**State B & C Design:**

**Icon:**
- text-6xl
- Margin-bottom: 24px
- Text-align: center

**Headline:**
- text-3xl, font-display, font-bold
- Text-align: center
- Margin-bottom: 12px

**Subtext:**
- text-base, text-secondary
- Text-align: center
- Max-width: 500px
- Margin: 0 auto 32px

**Action Button:**
- Centered
- Min-width: 200px

---

## 📊 SECTION 3: ALL GOALS LIST

### Copy

**Section Header**
```
All Goals ({goalCount})
```

**Sort Toggle**
```
[Dropdown or Toggle]
Sort by: Score (High to Low) | Deadline (Soonest First) | Recently Added
```

**Goal Card (Each Item):**
```
RANK BADGE: #{rank}

GOAL NAME: {goal.name}

METADATA:
Priority: {priority} • {daysLeft} days left • Impact: {impact}

SCORE: {score}/100

ACTIONS:
[Icon Button] Edit
[Icon Button] Delete
```

**Add New Goal Button:**
```
+ Add Another Goal
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 1200px
- Margin: 0 auto

**Section Header:**
- text-2xl, font-display, font-bold
- Margin-bottom: 24px
- Display: flex, justify-content: space-between, align-items: center

**Sort Toggle:**
- text-sm, font-body
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 8px 16px
- Cursor: pointer

**Goals List:**
- Display: grid
- Grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Gap: 20px
- Margin-bottom: 32px

**Goal Card:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 24px
- Position: relative
- Transition: all 0.2s ease

**Goal Card Hover:**
- Border-color: var(--app-1-accent)
- Transform: translateY(-2px)
- Box-shadow: 0 4px 16px rgba(168, 85, 247, 0.1)

**Rank Badge:**
- Position: absolute
- Top: 12px
- Right: 12px
- Width: 32px
- Height: 32px
- Border-radius: 50%
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Display: flex
- Align-items: center
- Justify-content: center
- Font-size: text-xs
- Font-weight: 600
- Color: text-secondary

**Rank Badge (Top 3):**
- #1: Background gradient gold, border gold
- #2: Background gradient silver, border silver  
- #3: Background gradient bronze, border bronze

**Goal Name:**
- text-lg, font-semibold
- Margin-bottom: 12px
- Color: white
- Line-height: 1.3

**Metadata:**
- text-xs, text-secondary
- Margin-bottom: 12px
- Line-height: 1.8

**Score:**
- text-sm, font-mono
- Color: var(--app-1-accent)
- Font-weight: 600
- Margin-bottom: 16px

**Actions Row:**
- Display: flex
- Gap: 8px
- Margin-top: auto

**Action Icons:**
- Width: 32px, Height: 32px
- Background: transparent
- Border: 1px solid var(--border-subtle)
- Border-radius: 6px
- Color: text-secondary
- Cursor: pointer
- Transition: all 0.2s ease

**Action Icons Hover:**
- Border-color: var(--app-1-accent)
- Color: var(--app-1-accent)
- Background: rgba(168, 85, 247, 0.1)

**Add Goal Button:**
- Full width
- Height: 56px
- Background: transparent
- Border: 2px dashed var(--border-strong)
- Border-radius: 12px
- Color: text-secondary
- Font-size: text-base
- Font-weight: 500
- Cursor: pointer
- Transition: all 0.2s ease

**Add Goal Button Hover:**
- Border-color: var(--app-1-accent)
- Color: var(--app-1-accent)
- Background: rgba(168, 85, 247, 0.05)

---

## ➕ MODAL: ADD/EDIT GOAL

### Copy

**Modal Title (Add Mode)**
```
Add New Goal
```

**Modal Title (Edit Mode)**
```
Edit Goal
```

**Form Fields:**

```
Field 1 - GOAL NAME:
Label: What are you working on?
Placeholder: e.g., Launch Framo MVP, Complete React course
Helper text: Be specific. This is what you'll see every day.

Field 2 - PRIORITY:
Label: Priority Level
Options (Radio/Select):
○ Low (33%)
○ Medium (66%)
○ High (100%)
○ Custom: [___]% (0-100)
Helper text: How important is this compared to everything else?

Field 3 - DEADLINE:
Label: Deadline
Input: Date picker
Helper text: When does this need to be done?
Display after selection: {daysLeft} days from today

Field 4 - IMPACT:
Label: Impact Level
Options (Radio/Select):
○ Low (33%)
○ Medium (66%)
○ High (100%)
○ Custom: [___]% (0-100)
Helper text: What changes when this is done?

CALCULATED PREVIEW:
Estimated Score: {liveCalculatedScore}/100
```

**Action Buttons:**
```
[Secondary] Cancel
[Primary] {mode === 'add' ? 'Add Goal' : 'Save Changes'}
```

### Design Specifications

**Modal Overlay:**
- Position: fixed, inset: 0
- Background: rgba(0, 0, 0, 0.8)
- Backdrop-filter: blur(4px)
- Z-index: 1000
- Display: flex, align-items: center, justify-content: center
- Padding: 20px

**Modal Container:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px
- Max-width: 600px
- Width: 100%
- Max-height: 90vh
- Overflow-y: auto
- Box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5)

**Modal Header:**
- Padding: 24px 32px
- Border-bottom: 1px solid var(--border-subtle)
- Display: flex
- Justify-content: space-between
- Align-items: center

**Modal Title:**
- text-2xl, font-display, font-bold

**Close Button:**
- Width: 32px, Height: 32px
- Background: transparent
- Border: none
- Color: text-secondary
- Cursor: pointer
- Border-radius: 6px
- Transition: all 0.2s

**Close Button Hover:**
- Background: var(--bg-tertiary)
- Color: white

**Modal Body:**
- Padding: 32px

**Form Field:**
- Margin-bottom: 24px

**Label:**
- text-sm, font-semibold
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

**Text Input Focus:**
- Border-color: var(--app-1-accent)
- Outline: none
- Box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1)

**Radio/Select Group:**
- Display: grid
- Grid-template-columns: repeat(3, 1fr)
- Gap: 12px
- Margin-bottom: 12px

**Radio Option:**
- Background: var(--bg-tertiary)
- Border: 2px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 12px
- Text-align: center
- Cursor: pointer
- Transition: all 0.2s
- Font-size: text-sm

**Radio Option Selected:**
- Border-color: var(--app-1-accent)
- Background: rgba(168, 85, 247, 0.1)
- Color: var(--app-1-accent)

**Custom Input (percentage):**
- Width: 100%
- Height: 40px
- Margin-top: 12px
- Display: none (shows when "Custom" is selected)

**Helper Text:**
- text-xs, text-tertiary
- Margin-top: 6px
- Line-height: 1.4

**Days Left Display:**
- text-sm, font-mono
- Color: var(--app-1-accent)
- Margin-top: 6px

**Calculated Preview Box:**
- Background: rgba(168, 85, 247, 0.1)
- Border: 1px solid rgba(168, 85, 247, 0.3)
- Border-radius: 8px
- Padding: 16px
- Margin-top: 24px
- Text-align: center

**Preview Text:**
- text-lg, font-mono
- Color: var(--app-1-accent)
- Font-weight: 600

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

---

## 🧮 SCORING ALGORITHM

### Input Values

**Priority:**
- Low = 33%
- Medium = 66%
- High = 100%
- Custom = User input (0-100%)

**Deadline:**
- Calculate days remaining: `daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))`
- Convert to urgency score:
  - Overdue (< 0 days): 100%
  - 1-3 days: 90%
  - 4-7 days: 75%
  - 8-14 days: 60%
  - 15-30 days: 40%
  - 31-60 days: 25%
  - 61+ days: 10%

**Impact:**
- Low = 33%
- Medium = 66%
- High = 100%
- Custom = User input (0-100%)

### Calculation Logic

```javascript
// Weights (how much each factor matters)
const WEIGHTS = {
  priority: 0.3,    // 30% of total score
  deadline: 0.5,    // 50% of total score (most important)
  impact: 0.2       // 20% of total score
}

// Convert text values to percentages
function normalizeValue(value, type) {
  if (typeof value === 'number') return value / 100
  
  const map = {
    'low': 0.33,
    'medium': 0.66,
    'high': 1.0
  }
  
  return map[value.toLowerCase()] || 0.5
}

// Calculate urgency from deadline
function calculateUrgency(deadlineDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const deadline = new Date(deadlineDate)
  deadline.setHours(0, 0, 0, 0)
  
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  
  if (daysLeft < 0) return 1.0       // Overdue
  if (daysLeft <= 3) return 0.9      // Very urgent
  if (daysLeft <= 7) return 0.75     // Urgent
  if (daysLeft <= 14) return 0.6     // Moderately urgent
  if (daysLeft <= 30) return 0.4     // Some urgency
  if (daysLeft <= 60) return 0.25    // Low urgency
  return 0.1                         // Very low urgency
}

// Main calculation
function calculateGoalScore(goal) {
  const priorityScore = normalizeValue(goal.priority, 'priority')
  const urgencyScore = calculateUrgency(goal.deadline)
  const impactScore = normalizeValue(goal.impact, 'impact')
  
  const finalScore = (
    (priorityScore * WEIGHTS.priority) +
    (urgencyScore * WEIGHTS.deadline) +
    (impactScore * WEIGHTS.impact)
  ) * 100
  
  return Math.round(finalScore * 100) / 100 // Round to 2 decimals
}

// Get top goal
function getTopGoal(goals) {
  if (!goals || goals.length === 0) return null
  
  const goalsWithScores = goals.map(goal => ({
    ...goal,
    score: calculateGoalScore(goal),
    daysLeft: Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24))
  }))
  
  // Sort by score descending
  goalsWithScores.sort((a, b) => b.score - a.score)
  
  return goalsWithScores[0]
}
```

### Why These Weights?

**Deadline gets 50% because:**
- Urgency is the killer. Miss a deadline = real consequences
- Overdue tasks need immediate attention
- Creates natural forcing function

**Priority gets 30% because:**
- User knows context we don't
- Important for long-term goals with distant deadlines
- Balances urgency with strategic importance

**Impact gets 20% because:**
- Prevents "busy work" from dominating
- Ensures high-leverage tasks get attention
- Smallest weight because it's most subjective

**Example Scenarios:**

```
Goal A: Priority High (100%), Deadline Tomorrow (90%), Impact High (100%)
Score = (1.0 * 0.3) + (0.9 * 0.5) + (1.0 * 0.2) = 0.3 + 0.45 + 0.2 = 0.95 * 100 = 95

Goal B: Priority Medium (66%), Deadline 30 days (40%), Impact Low (33%)
Score = (0.66 * 0.3) + (0.4 * 0.5) + (0.33 * 0.2) = 0.198 + 0.2 + 0.066 = 0.464 * 100 = 46.4

Goal C: Priority Low (33%), Deadline Overdue (100%), Impact Medium (66%)
Score = (0.33 * 0.3) + (1.0 * 0.5) + (0.66 * 0.2) = 0.099 + 0.5 + 0.132 = 0.731 * 100 = 73.1

Winner: Goal A (95) — High priority, urgent deadline, high impact
```

---

## 🎬 USER INTERACTIONS & ANIMATIONS

### Adding a Goal

**Flow:**
1. Click "Add Goal" button
2. Modal slides up from bottom (mobile) or fades in center (desktop)
3. Focus automatically on "Goal Name" field
4. As user types/selects, live score preview updates
5. Click "Add Goal" → Modal closes with fade out
6. New goal card animates in at bottom of list
7. If this is first goal, "The One Task" card fades in
8. Success toast: "Goal added!" (2 seconds, purple)

**Animation Details:**
- Modal entrance: translateY(100%) → translateY(0), 300ms ease-out
- Score preview: Number counts up from 0 to calculated value, 400ms
- New card: opacity 0 → 1, scale 0.95 → 1, 250ms ease-out

### Editing a Goal

**Flow:**
1. Click edit icon on goal card
2. Modal opens with pre-filled values
3. User makes changes
4. Live score preview updates
5. Click "Save Changes" → Modal closes
6. Goal card updates with subtle flash animation
7. If score changed significantly, card re-sorts in list with smooth transition
8. Success toast: "Goal updated!" (2 seconds, purple)

**Animation Details:**
- Card update: Background flash purple 0.2 opacity → 0, 500ms
- Re-sort: All cards slide to new positions, 400ms ease-in-out
- Stagger: Each card delayed by 50ms

### Deleting a Goal

**Flow:**
1. Click delete icon on goal card
2. Confirmation prompt appears (inline or modal)
3. User confirms
4. Card slides out to the right and fades
5. Remaining cards slide up to fill gap
6. If deleted goal was "The One", next highest appears with fade in
7. Success toast: "Goal deleted" (2 seconds, red)

**Animation Details:**
- Card exit: translateX(100%), opacity 0, 300ms ease-in
- Gap close: All below cards translateY(-100% of card height), 300ms ease-in-out
- Next card appearance: scale 0.95 → 1, opacity 0 → 1, 400ms

### Completing a Goal

**Flow:**
1. User clicks "Mark Complete" on The One Task card
2. Card flashes green
3. Confetti animation (brief, celebratory)
4. Card slides up and fades out
5. Next highest goal slides in from bottom
6. Goal moves to "Completed" section (if you add this later) or removes from list
7. Success toast: "🔥 Goal completed!" (3 seconds, green)

**Animation Details:**
- Completion flash: Background green 0.3 opacity → 0, 600ms
- Confetti: 20-30 particles, random colors, gravity fall, 1500ms
- Card exit: translateY(-120%), opacity 0, 400ms ease-in
- Next card entrance: translateY(120%) → translateY(0), 400ms ease-out

### Skipping for Today

**Flow:**
1. User clicks "Skip Today"
2. Card slides to the right and fades slightly
3. Next goal slides in from left
4. Skipped goal moves to bottom of list with lower opacity
5. Info toast: "Skipped for today. Shows again tomorrow." (3 seconds)

**Animation Details:**
- Skip slide: translateX(50%), opacity 0.3, 300ms
- Next entrance: translateX(-50%) → translateX(0), 300ms
- List re-sort: Smooth position changes, 400ms

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 640px)

**Page Header:**
- Padding: 20px 16px
- Title: text-2xl
- Stats: Stack vertically, no bullets

**The One Task Card:**
- Padding: 32px 24px
- Task name: text-3xl
- Metadata: Stack vertically
- Buttons: Full width, stacked

**Goals List:**
- Grid: 1 column
- Padding: 24px 16px

**Modal:**
- Full screen on mobile
- Slide up from bottom animation
- Close button becomes "X" in top right
- Radio options: 3 columns → 1 column (stacked)

### Tablet (641-1024px)

**Goals List:**
- Grid: 2 columns
- Maintain spacing

**Modal:**
- Max-width: 90vw
- Centered

### Desktop (1025px+)

**Goals List:**
- Grid: 3 columns
- Hover effects enabled

**Modal:**
- Max-width: 600px
- Centered

---

## 💾 DATA PERSISTENCE

### Storage Strategy

**Use localStorage for MVP:**
```javascript
const STORAGE_KEY = 'decision_fatigue_goals'

// Save goals
function saveGoals(goals) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals))
}

// Load goals
function loadGoals() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}
```

**Data Structure:**
```javascript
{
  id: 'uuid-v4',
  name: 'Launch Framo MVP',
  priority: 'high', // or number 0-100
  deadline: '2026-02-15', // ISO date string
  impact: 'high', // or number 0-100
  createdAt: '2026-01-27T10:30:00Z',
  completedAt: null,
  skippedDates: ['2026-01-28'], // Array of dates when skipped
  score: 95 // Calculated, not stored (computed on load)
}
```

**Future: Backend Migration**
- Use Supabase or Firebase
- User authentication from universal auth
- Goals table with user_id foreign key
- Real-time sync across devices

---

## ⚡ PERFORMANCE OPTIMIZATIONS

1. **Lazy load modal** — Only render when opened
2. **Debounce live score preview** — Calculate after 300ms of no input
3. **Virtual scrolling** — If > 50 goals (unlikely but future-proof)
4. **Memoize calculations** — Cache scores until inputs change
5. **Optimize re-renders** — Use React.memo on goal cards

---

## ✅ IMPLEMENTATION CHECKLIST

Before shipping Decision Fatigue:

**Functionality:**
- [ ] Can add goal with all 4 fields
- [ ] Can edit existing goal
- [ ] Can delete goal with confirmation
- [ ] Score calculates correctly
- [ ] Top goal displays in The One Task card
- [ ] Can mark goal complete
- [ ] Can skip goal for today
- [ ] Empty states work (no goals, all completed)
- [ ] Live score preview works in modal
- [ ] Days left calculates correctly
- [ ] Data persists on page reload

**Design:**
- [ ] Purple accent color used consistently
- [ ] All animations smooth (60fps)
- [ ] Modal is accessible (focus trap, ESC to close)
- [ ] Mobile responsive at 375px, 414px
- [ ] Tablet responsive at 768px
- [ ] Desktop responsive at 1280px+
- [ ] Hover states on all interactive elements
- [ ] Loading states (if async operations)
- [ ] Error states handled gracefully
- [ ] Success/info toasts appear correctly

**Polish:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (ARIA labels)
- [ ] No console errors
- [ ] No visual bugs
- [ ] Confetti animation works
- [ ] All copy proofread
- [ ] Consistent spacing throughout

---

## 🚀 QUICK START CODE SCAFFOLD

```jsx
// DecisionFatigue.jsx
import { useState, useEffect } from 'react'
import { Layout } from '@/components/universal/Layout'
import { TheOneTaskCard } from './components/TheOneTaskCard'
import { GoalsList } from './components/GoalsList'
import { GoalModal } from './components/GoalModal'
import { calculateGoalScore, getTopGoal } from './utils/scoring'
import { loadGoals, saveGoals } from './utils/storage'

export function DecisionFatigue() {
  const [goals, setGoals] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  
  useEffect(() => {
    setGoals(loadGoals())
  }, [])
  
  useEffect(() => {
    if (goals.length > 0) {
      saveGoals(goals)
    }
  }, [goals])
  
  const topGoal = getTopGoal(goals)
  
  const handleAddGoal = (goalData) => {
    const newGoal = {
      id: crypto.randomUUID(),
      ...goalData,
      createdAt: new Date().toISOString(),
      completedAt: null,
      skippedDates: []
    }
    setGoals([...goals, newGoal])
    setModalOpen(false)
  }
  
  const handleEditGoal = (goalData) => {
    setGoals(goals.map(g => 
      g.id === editingGoal.id ? { ...g, ...goalData } : g
    ))
    setModalOpen(false)
    setEditingGoal(null)
  }
  
  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(g => g.id !== goalId))
  }
  
  const handleCompleteGoal = (goalId) => {
    setGoals(goals.map(g =>
      g.id === goalId 
        ? { ...g, completedAt: new Date().toISOString() }
        : g
    ))
  }
  
  const handleSkipGoal = (goalId) => {
    const today = new Date().toISOString().split('T')[0]
    setGoals(goals.map(g =>
      g.id === goalId
        ? { ...g, skippedDates: [...g.skippedDates, today] }
        : g
    ))
  }
  
  return (
    <Layout appAccent="var(--app-1-accent)" appName="Decision Fatigue">
      <div className="page-header">
        <h1>Decision Fatigue</h1>
        <p>Your mission for today, calculated from your goals.</p>
        <span className="quick-stats">
          {goals.length} active goals {topGoal && '• Top priority locked'}
        </span>
      </div>
      
      <TheOneTaskCard
        goal={topGoal}
        onComplete={handleCompleteGoal}
        onSkip={handleSkipGoal}
        onAddGoal={() => setModalOpen(true)}
      />
      
      <GoalsList
        goals={goals}
        onEdit={(goal) => { setEditingGoal(goal); setModalOpen(true) }}
        onDelete={handleDeleteGoal}
        onAddNew={() => setModalOpen(true)}
      />
      
      {modalOpen && (
        <GoalModal
          goal={editingGoal}
          onSave={editingGoal ? handleEditGoal : handleAddGoal}
          onClose={() => { setModalOpen(false); setEditingGoal(null) }}
        />
      )}
    </Layout>
  )
}
```

---

## 📊 SUCCESS METRICS

**User Engagement:**
- Average goals per user: 5-8
- Daily return rate: > 60%
- Average time on page: 2-3 minutes
- Completion rate: > 40% of shown goals

**Performance:**
- Page load: < 1 second
- Modal open time: < 200ms
- Score calculation: < 50ms
- Animation smoothness: 60fps

**Quality:**
- Zero crashes
- < 1% error rate
- Accessible (WCAG AA)
- Works on iOS Safari, Chrome, Firefox

---

## 🎯 COPY PRINCIPLES USED

1. **Imperative commands** — "Mark Complete" not "You can mark this complete"
2. **Zero fluff** — Every word earns its place
3. **Confidence** — "YOUR MISSION TODAY" not "Here's a suggestion"
4. **Clear outcomes** — User always knows what happens next
5. **Honest helper text** — Explains why, not just what

This app doesn't suggest. It commands. Just like the product.

---

**App Spec Version:** 1.0  
**Ready to build:** YES  
**Estimated build time:** 8-10 hours for full implementation  
**Priority:** 1/6 (First app to ship)
