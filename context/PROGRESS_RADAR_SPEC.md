# Progress Radar — App Specification
**Proof You're Leveling Up**

---

## 🎯 App Purpose

**Core Question:** "Am I actually growing?"

**Core Promise:** Track the metrics that matter. See the trend lines. Visualize momentum. Get proof you're leveling up — or warning you're stalling.

**User Flow:**
1. Every Sunday (or any day the user chooses), log 4 weekly metrics
2. Metrics: Users, Revenue, Posts, Training
3. App generates a multi-line chart showing last 12 weeks
4. Trend analysis highlights growth, stalls, and breakthroughs
5. Week-over-week comparison shows progress or regression

**The Philosophy:**
- What gets measured gets managed
- Motivation leaks without visible proof of growth
- Grind becomes sustainable when you see the graph going up and to the right

---

## 🎨 Visual Identity

**Accent Color:** Pink (`#ec4899`)
**Secondary Accent:** `#f472b6` (lighter pink)
**Background Tint:** `#2e1a24`
**Vibe:** Data-driven. Analytical. Growth-obsessed. Clean charts, sharp insights.

**Key Visual Element:** 📊 Multi-line chart with trend indicators

---

## 📋 Page Structure

```
┌─────────────────────────────────────┐
│     NAVBAR (Universal)              │
├─────────────────────────────────────┤
│                                     │
│     CURRENT WEEK BANNER             │
│     - Week range                    │
│     - Input status                  │
│     - Last logged date              │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     WEEKLY INPUT FORM               │
│     (If current week not logged)    │
│     - Users (number)                │
│     - Revenue (currency)            │
│     - Posts (number)                │
│     - Training Sessions (number)    │
│     - [Log This Week] Button        │
│                                     │
│     OR                              │
│                                     │
│     WEEK SUMMARY CARD               │
│     (If current week logged)        │
│     - 4 metrics displayed           │
│     - [Edit Week] Button            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     12-WEEK TREND CHART             │
│     - 4 lines (one per metric)      │
│     - Normalized scales             │
│     - Hover tooltips                │
│     - Growth indicators             │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     INSIGHTS & ANALYSIS             │
│     - Week-over-week comparison     │
│     - Best week / Worst week        │
│     - Momentum score                │
│     - Trend direction               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     WEEKLY HISTORY                  │
│     - Expandable week cards         │
│     - All 4 metrics per week        │
│     - Edit/delete options           │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 SECTION 1: CURRENT WEEK BANNER

### Copy

**State A: Current Week Not Logged**

```
WEEK RANGE:
Week of {startDate} - {endDate}

STATUS:
📝 Not logged yet

CALL TO ACTION:
Log your numbers below to track this week's progress.
```

**State B: Current Week Logged**

```
WEEK RANGE:
Week of {startDate} - {endDate}

STATUS:
✅ Week logged on {loggedDate}

SUBTEXT:
Come back next week to continue tracking.
```

### Design Specifications

**Banner Container:**
- Padding: 24px 32px
- Max-width: 1200px
- Margin: 0 auto 32px
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px

**Week Range:**
- Font-size: text-lg
- Font: font-display, font-bold
- Color: white
- Margin-bottom: 8px

**Status Row:**
- Display: flex
- Align-items: center
- Gap: 8px
- Margin-bottom: 6px

**Status (Not Logged):**
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary

**Status (Logged):**
- Font-size: text-sm
- Font: font-mono
- Color: var(--success)
- Font-weight: 600

**Subtext/Call to Action:**
- Font-size: text-sm
- Color: text-tertiary
- Line-height: 1.5

---

## ➕ SECTION 2: WEEKLY INPUT FORM

### Copy

**Section Title:**
```
Log This Week's Numbers
```

**Instructions:**
```
Enter your metrics for the week. Be honest. Growth shows in the trend, not a single week.
```

**Form Fields:**

```
Field 1 — USERS:
Label: Users
Placeholder: e.g., 142
Helper: Total users, active users, signups — pick one metric and stick with it.
Unit: none (just a number)

Field 2 — REVENUE:
Label: Revenue
Placeholder: e.g., 1250.00
Helper: Total revenue this week. Use the same currency every time.
Unit: $ (configurable — user can set currency symbol)

Field 3 — POSTS:
Label: Content Posted
Placeholder: e.g., 5
Helper: Blog posts, tweets, videos — whatever you're creating.
Unit: posts

Field 4 — TRAINING:
Label: Training Sessions
Placeholder: e.g., 4
Helper: Gym, sports, workouts. Sessions completed this week.
Unit: sessions
```

**Action Button:**
```
Log This Week
```

**Note Below Button:**
```
You can edit this week's data anytime before next week starts.
```

### Design Specifications

**Section Container:**
- Padding: 40px 32px
- Max-width: 800px
- Margin: 0 auto 32px
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 12px

**Instructions:**
- Font-size: text-base
- Color: text-secondary
- Margin-bottom: 32px
- Line-height: 1.6

**Form Grid:**
- Display: grid
- Grid-template-columns: repeat(2, 1fr) (desktop) / 1 column (mobile)
- Gap: 24px
- Margin-bottom: 32px

**Input Group:**
- Display: flex
- Flex-direction: column

**Label:**
- Font-size: text-sm
- Font-weight: 600
- Color: white
- Margin-bottom: 8px

**Input Field:**
- Width: 100%
- Height: 48px
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 0 16px
- Color: white
- Font-size: text-lg
- Font: font-mono
- Transition: all 0.2s

**Input Field Focus:**
- Border-color: var(--app-6-accent)
- Box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.15)
- Outline: none

**Helper Text:**
- Font-size: text-xs
- Color: text-tertiary
- Margin-top: 6px
- Line-height: 1.4

**Action Button:**
- Width: 100%
- Height: 56px
- Background: Linear gradient (var(--app-6-accent), var(--app-6-accent-light))
- Border: none
- Border-radius: 12px
- Color: white
- Font-size: text-lg
- Font-weight: 700
- Cursor: pointer
- Transition: all 0.3s
- Box-shadow: 0 4px 16px rgba(236, 72, 153, 0.25)

**Button Hover:**
- Transform: translateY(-2px)
- Box-shadow: 0 8px 24px rgba(236, 72, 153, 0.35)

**Button Disabled:**
- Opacity: 0.5
- Cursor: not-allowed
- Transform: none

**Note:**
- Font-size: text-xs
- Color: text-tertiary
- Text-align: center
- Margin-top: 16px
- Font-style: italic

---

## ✅ SECTION 3: WEEK SUMMARY CARD (Alternative to Form)

This replaces the input form when the current week is already logged.

### Copy

```
TITLE:
This Week's Numbers

METRICS (4 columns):
Users: {users}
Revenue: ${revenue}
Posts: {posts}
Training: {training} sessions

COMPARISON (if previous week exists):
vs. Last Week:
Users: {change}% ↑/↓
Revenue: {change}% ↑/↓
Posts: {change}% ↑/↓
Training: {change}% ↑/↓

ACTION:
[Button] Edit This Week
```

### Design Specifications

**Card Container:**
- Padding: 32px
- Max-width: 1000px
- Margin: 0 auto 32px
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px

**Title:**
- Font-size: text-xl
- Font: font-display, font-bold
- Margin-bottom: 24px

**Metrics Grid:**
- Display: grid
- Grid-template-columns: repeat(4, 1fr) (desktop) / repeat(2, 1fr) (mobile)
- Gap: 24px
- Margin-bottom: 32px

**Metric Card:**
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 20px
- Text-align: center

**Metric Value:**
- Font-size: text-3xl
- Font: font-display, font-black
- Color: var(--app-6-accent)
- Line-height: 1
- Margin-bottom: 8px

**Metric Label:**
- Font-size: text-xs
- Font: font-mono
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Color: text-tertiary

**Comparison Section:**
- Padding-top: 24px
- Border-top: 1px solid var(--border-subtle)
- Margin-bottom: 24px

**Comparison Title:**
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- Margin-bottom: 16px

**Comparison Grid:**
- Display: grid
- Grid-template-columns: repeat(2, 1fr) (desktop) / 1 column (mobile)
- Gap: 12px

**Comparison Item:**
- Display: flex
- Justify-content: space-between
- Align-items: center
- Font-size: text-sm
- Padding: 8px 12px
- Background: rgba(236, 72, 153, 0.05)
- Border-radius: 6px

**Comparison Label:**
- Color: text-secondary

**Comparison Value:**
- Font: font-mono
- Font-weight: 600
- Display: flex
- Align-items: center
- Gap: 4px

**Positive Change (↑):**
- Color: var(--success)

**Negative Change (↓):**
- Color: var(--error)

**No Change (→):**
- Color: text-tertiary

**Edit Button:**
- Width: auto
- Height: 44px
- Padding: 0 24px
- Background: transparent
- Border: 1px solid var(--app-6-accent)
- Border-radius: 8px
- Color: var(--app-6-accent)
- Font-size: text-base
- Font-weight: 600
- Cursor: pointer
- Transition: all 0.2s

**Edit Button Hover:**
- Background: rgba(236, 72, 153, 0.1)

---

## 📊 SECTION 4: 12-WEEK TREND CHART

### Copy

**Section Title:**
```
12-Week Trend
```

**Subtitle:**
```
Your progress visualized. All metrics normalized to show relative growth.
```

**Chart Legend:**
```
━━ Users
━━ Revenue
━━ Posts
━━ Training
```

**Empty State (< 2 weeks of data):**
```
Not enough data yet.
Log at least 2 weeks to see your trend.
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 1400px
- Margin: 32px auto 0

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 8px

**Subtitle:**
- Font-size: text-base
- Color: text-secondary
- Margin-bottom: 32px

**Chart Container:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px
- Padding: 32px
- Min-height: 500px

**Chart (Using Recharts):**
- Type: LineChart
- Data: Last 12 weeks (or all available if < 12)
- Lines: 4 (Users, Revenue, Posts, Training)
- X-axis: Week labels ("Week of Jan 15", "Week of Jan 22", etc.)
- Y-axis: Normalized 0-100 scale (each metric scaled independently to its own min/max)
- Grid: Horizontal lines only, subtle
- Tooltip: Show all 4 metrics + week range on hover
- Responsive: true

**Line Colors:**
- Users: #3b82f6 (blue)
- Revenue: #10b981 (green)
- Posts: #f59e0b (orange)
- Training: var(--app-6-accent) (pink)

**Line Styles:**
- Stroke-width: 3px
- Dot size: 6px (on hover: 10px)
- Smooth: true (curved lines, not jagged)
- Stroke-dasharray: none (all solid lines)

**Growth Indicators (NEW feature):**
- If a metric's latest value is > 20% higher than 12 weeks ago:
  - Add a subtle upward arrow icon next to that metric in the legend
  - Glow effect on that line

**Legend:**
- Position: Top right (desktop) / Bottom (mobile)
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- Display: flex
- Gap: 20px
- Flex-wrap: wrap

**Legend Item:**
- Display: flex
- Align-items: center
- Gap: 8px
- Cursor: pointer (click to toggle line visibility)

**Legend Line:**
- Width: 24px
- Height: 3px
- Background: Line color
- Border-radius: 2px

**Legend Item (Line Hidden):**
- Opacity: 0.3
- Text has strikethrough

**Tooltip (on hover):**
- Background: var(--bg-primary)
- Border: 2px solid var(--app-6-accent)
- Border-radius: 8px
- Padding: 16px
- Box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5)

**Tooltip Content:**
- Week range: text-sm, font-mono, text-tertiary, margin-bottom: 12px
- Each metric:
  - Label: text-xs, color based on line color
  - Value: text-base, font-bold, white
  - Gap: 6px between metrics

**Empty State:**
- Text-align: center
- Color: text-tertiary
- Font-size: text-lg
- Padding: 100px 40px
- Font-style: italic

---

## 📈 SECTION 5: INSIGHTS & ANALYSIS

### Copy

**Section Title:**
```
Insights (Last 12 Weeks)
```

**Metric: Momentum Score**

```
LABEL: Momentum Score

VALUE: {score}/100

EXPLANATION:
Based on consistency and growth across all metrics.
{description based on score — see logic below}
```

**Metric: Week-over-Week**

```
LABEL: vs. Last Week

USERS: {change}% {direction}
REVENUE: {change}% {direction}
POSTS: {change}% {direction}
TRAINING: {change}% {direction}

OVERALL: {net direction}
```

**Metric: Best Week**

```
LABEL: Best Week

WEEK: {weekRange}

HIGHLIGHTS:
- Users: {value}
- Revenue: ${value}
- Posts: {value}
- Training: {value}
```

**Metric: Worst Week**

```
LABEL: Needs Improvement

WEEK: {weekRange}

LOWLIGHTS:
- Users: {value}
- Revenue: ${value}
- Posts: {value}
- Training: {value}
```

**Trend Patterns Detected:**

```
[If detected] 🚀 Strong Growth Trajectory
All metrics trending upward. Keep the momentum.

[If detected] 📉 Stalling Pattern
Growth has plateaued over the last 4 weeks. Time to push harder.

[If detected] ⚠️ Revenue Declining
Revenue is down 15% from peak. Focus needed.

[If detected] ✅ Consistency Win
You've logged 12 consecutive weeks. Data compounds.

[If no issues] 📊 Steady Progress
Metrics are stable. Look for breakthrough opportunities.
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 1400px
- Margin: 32px auto 0

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 32px

**Insights Grid:**
- Display: grid
- Grid: 2 columns (desktop) / 1 column (mobile)
- Gap: 24px
- Margin-bottom: 40px

**Insight Card:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px
- Padding: 28px
- Display: flex
- Flex-direction: column

**Card Label:**
- Font-size: text-xs
- Font: font-mono
- Text-transform: uppercase
- Letter-spacing: 0.15em
- Color: text-tertiary
- Margin-bottom: 12px

**Card Value (Momentum Score):**
- Font-size: text-5xl
- Font: font-display, font-black
- Color: Based on score:
  - 80-100: var(--success)
  - 60-79: var(--app-6-accent)
  - 40-59: var(--warning)
  - 0-39: var(--error)
- Line-height: 1
- Margin-bottom: 16px

**Card Explanation:**
- Font-size: text-sm
- Color: text-secondary
- Line-height: 1.6

**Week-over-Week Card:**
- Display: flex
- Flex-direction: column
- Gap: 12px

**WoW Item:**
- Display: flex
- Justify-content: space-between
- Align-items: center
- Padding: 10px 0
- Border-bottom: 1px solid var(--border-subtle)

**WoW Item (last child):**
- Border-bottom: none

**WoW Label:**
- Font-size: text-sm
- Color: text-secondary

**WoW Value:**
- Font-size: text-base
- Font: font-mono
- Font-weight: 700
- Display: flex
- Align-items: center
- Gap: 6px

**Best/Worst Week Cards:**
- Similar structure to Momentum card
- Week range: text-lg, font-bold, margin-bottom: 16px
- Highlights list: text-sm, line-height: 1.8, gap: 8px

**Trend Patterns Container:**
- Display: flex
- Flex-direction: column
- Gap: 16px

**Pattern Card:**
- Background: var(--bg-tertiary)
- Border-left: 4px solid var(--app-6-accent)
- Border-radius: 8px
- Padding: 20px
- Font-size: text-base
- Line-height: 1.6

**Pattern Card (Growth):**
- Border-left-color: var(--success)
- Background: rgba(34, 197, 94, 0.05)

**Pattern Card (Warning):**
- Border-left-color: var(--warning)
- Background: rgba(245, 158, 11, 0.05)

**Pattern Card (Critical):**
- Border-left-color: var(--error)
- Background: rgba(239, 68, 68, 0.05)

**Pattern Title:**
- Font-weight: 700
- Margin-bottom: 8px
- Display: flex
- Align-items: center
- Gap: 8px

**Pattern Description:**
- Color: text-secondary
- Font-size: text-sm

---

## 📜 SECTION 6: WEEKLY HISTORY

### Copy

**Section Title:**
```
All Weeks ({count})
```

**Week Card (Collapsed):**

```
WEEK RANGE: {startDate} - {endDate}

QUICK SUMMARY:
Users: {value} | Revenue: ${value} | Posts: {value} | Training: {value}

ACTIONS:
[Icon] Expand
[Icon] Edit
[Icon] Delete
```

**Week Card (Expanded):**

```
WEEK RANGE: {startDate} - {endDate}

DETAILED METRICS:
Users: {value}
Revenue: ${value}
Posts: {value}
Training: {value}

WEEK-OVER-WEEK:
{comparison data if previous week exists}

ACTIONS:
[Icon] Collapse
[Icon] Edit
[Icon] Delete
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px 64px
- Max-width: 1000px
- Margin: 32px auto 0

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 24px

**Week Cards List:**
- Display: flex
- Flex-direction: column
- Gap: 16px

**Week Card (Collapsed):**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 20px 24px
- Transition: all 0.2s

**Week Card Hover:**
- Border-color: var(--app-6-accent)
- Background: rgba(236, 72, 153, 0.03)

**Week Range:**
- Font-size: text-base
- Font: font-display, font-bold
- Margin-bottom: 12px

**Quick Summary:**
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- Display: flex
- Gap: 12px
- Flex-wrap: wrap

**Quick Summary Item:**
- White-space: nowrap

**Actions Row:**
- Display: flex
- Gap: 8px
- Margin-top: 12px

**Action Icon Button:**
- Width: 32px
- Height: 32px
- Background: transparent
- Border: 1px solid var(--border-subtle)
- Border-radius: 6px
- Color: text-secondary
- Cursor: pointer
- Transition: all 0.2s
- Display: flex
- Align-items: center
- Justify-content: center

**Expand Icon Hover:**
- Border-color: var(--app-6-accent)
- Color: var(--app-6-accent)
- Background: rgba(236, 72, 153, 0.1)

**Edit Icon Hover:**
- Border-color: var(--info)
- Color: var(--info)
- Background: rgba(59, 130, 246, 0.1)

**Delete Icon Hover:**
- Border-color: var(--error)
- Color: var(--error)
- Background: rgba(239, 68, 68, 0.1)

**Week Card (Expanded):**
- Padding: 28px
- Background: Linear gradient from var(--bg-secondary) to rgba(236, 72, 153, 0.05)

**Detailed Metrics Grid:**
- Display: grid
- Grid: 2 columns (desktop) / 1 column (mobile)
- Gap: 16px
- Margin: 20px 0

**Metric Row:**
- Display: flex
- Justify-content: space-between
- Padding: 12px
- Background: var(--bg-tertiary)
- Border-radius: 6px

**Metric Label:**
- Font-size: text-sm
- Color: text-secondary

**Metric Value:**
- Font-size: text-lg
- Font: font-mono
- Font-weight: 700
- Color: white

---

## 🧮 CALCULATION LOGIC

### Week Determination

**Week starts:** Sunday 00:00 local time  
**Week ends:** Saturday 23:59 local time

```javascript
function getCurrentWeekRange() {
  const now = new Date()
  const dayOfWeek = now.getDay() // 0 = Sunday
  
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - dayOfWeek)
  sunday.setHours(0, 0, 0, 0)
  
  const saturday = new Date(sunday)
  saturday.setDate(sunday.getDate() + 6)
  saturday.setHours(23, 59, 59, 999)
  
  return {
    start: sunday,
    end: saturday,
    weekId: sunday.toISOString().split('T')[0] // YYYY-MM-DD of Sunday
  }
}
```

### Momentum Score Calculation

Momentum is a composite score (0-100) based on:
1. **Consistency** (40%) — How many consecutive weeks logged
2. **Growth rate** (40%) — Average % increase across all metrics
3. **Recency** (20%) — How recent is the latest entry

```javascript
function calculateMomentumScore(weeks) {
  if (weeks.length < 2) return 0
  
  // 1. Consistency Score (40%)
  const consistencyScore = Math.min(weeks.length / 12, 1) * 40
  
  // 2. Growth Rate Score (40%)
  const latest = weeks[weeks.length - 1]
  const baseline = weeks[0]
  
  const metrics = ['users', 'revenue', 'posts', 'training']
  let totalGrowth = 0
  let validMetrics = 0
  
  metrics.forEach(metric => {
    if (baseline[metric] > 0) {
      const growth = ((latest[metric] - baseline[metric]) / baseline[metric]) * 100
      totalGrowth += Math.max(growth, 0) // Only count positive growth
      validMetrics++
    }
  })
  
  const avgGrowth = validMetrics > 0 ? totalGrowth / validMetrics : 0
  const growthScore = Math.min(avgGrowth / 2, 40) // Cap at 40, normalize by dividing by 2
  
  // 3. Recency Score (20%)
  const daysSinceLastEntry = Math.floor((new Date() - new Date(latest.weekId)) / (1000 * 60 * 60 * 24))
  const recencyScore = daysSinceLastEntry <= 7 ? 20 : 
                       daysSinceLastEntry <= 14 ? 15 :
                       daysSinceLastEntry <= 21 ? 10 : 5
  
  return Math.round(consistencyScore + growthScore + recencyScore)
}
```

### Week-over-Week Comparison

```javascript
function calculateWoWChange(currentWeek, previousWeek) {
  const metrics = ['users', 'revenue', 'posts', 'training']
  const changes = {}
  
  metrics.forEach(metric => {
    const current = currentWeek[metric]
    const previous = previousWeek[metric]
    
    if (previous === 0) {
      changes[metric] = current > 0 ? { percent: 100, direction: 'up' } : { percent: 0, direction: 'flat' }
    } else {
      const percent = ((current - previous) / previous) * 100
      changes[metric] = {
        percent: Math.abs(Math.round(percent)),
        direction: percent > 0 ? 'up' : percent < 0 ? 'down' : 'flat'
      }
    }
  })
  
  return changes
}
```

### Best/Worst Week Detection

```javascript
function findBestAndWorstWeeks(weeks) {
  if (weeks.length === 0) return { best: null, worst: null }
  
  // Calculate composite score for each week
  const weeksWithScores = weeks.map(week => {
    const composite = week.users + week.revenue + week.posts + week.training
    return { ...week, composite }
  })
  
  const sorted = weeksWithScores.sort((a, b) => b.composite - a.composite)
  
  return {
    best: sorted[0],
    worst: sorted[sorted.length - 1]
  }
}
```

### Trend Pattern Detection

```javascript
function detectTrendPatterns(weeks) {
  if (weeks.length < 4) return []
  
  const patterns = []
  const metrics = ['users', 'revenue', 'posts', 'training']
  
  // 1. Strong growth (all metrics up >10% in last 4 weeks)
  const last4 = weeks.slice(-4)
  const first4 = weeks.slice(0, 4)
  
  const allGrowing = metrics.every(metric => {
    const latestAvg = last4.reduce((sum, w) => sum + w[metric], 0) / 4
    const earliestAvg = first4.reduce((sum, w) => sum + w[metric], 0) / 4
    return earliestAvg > 0 && (latestAvg / earliestAvg) > 1.1
  })
  
  if (allGrowing) {
    patterns.push({
      type: 'success',
      title: 'Strong Growth Trajectory',
      message: 'All metrics trending upward. Keep the momentum.'
    })
  }
  
  // 2. Stalling (last 4 weeks within 5% of each other)
  const recentVariance = metrics.some(metric => {
    const values = last4.map(w => w[metric])
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    const maxDiff = Math.max(...values) - Math.min(...values)
    return avg > 0 && (maxDiff / avg) < 0.05
  })
  
  if (recentVariance && !allGrowing) {
    patterns.push({
      type: 'warning',
      title: 'Stalling Pattern',
      message: 'Growth has plateaued over the last 4 weeks. Time to push harder.'
    })
  }
  
  // 3. Revenue declining
  if (weeks.length >= 4) {
    const peak = Math.max(...weeks.map(w => w.revenue))
    const latest = weeks[weeks.length - 1].revenue
    
    if (peak > 0 && latest < peak * 0.85) {
      const decline = Math.round(((peak - latest) / peak) * 100)
      patterns.push({
        type: 'critical',
        title: 'Revenue Declining',
        message: `Revenue is down ${decline}% from peak. Focus needed.`
      })
    }
  }
  
  // 4. Consistency win (12+ consecutive weeks)
  if (weeks.length >= 12) {
    patterns.push({
      type: 'success',
      title: 'Consistency Win',
      message: "You've logged 12 consecutive weeks. Data compounds."
    })
  }
  
  // 5. Default
  if (patterns.length === 0) {
    patterns.push({
      type: 'neutral',
      title: 'Steady Progress',
      message: 'Metrics are stable. Look for breakthrough opportunities.'
    })
  }
  
  return patterns
}
```

### Chart Data Normalization

Each metric is scaled to 0-100 independently so they can be displayed on the same chart.

```javascript
function normalizeChartData(weeks) {
  const metrics = ['users', 'revenue', 'posts', 'training']
  
  // Find min/max for each metric
  const ranges = {}
  metrics.forEach(metric => {
    const values = weeks.map(w => w[metric])
    ranges[metric] = {
      min: Math.min(...values),
      max: Math.max(...values)
    }
  })
  
  // Normalize each week
  return weeks.map(week => {
    const normalized = { weekId: week.weekId }
    
    metrics.forEach(metric => {
      const range = ranges[metric].max - ranges[metric].min
      if (range === 0) {
        normalized[metric] = 50 // All values same, put at midpoint
      } else {
        normalized[metric] = ((week[metric] - ranges[metric].min) / range) * 100
      }
    })
    
    return normalized
  })
}
```

### Data Structure

```javascript
// Single week entry
{
  weekId: '2026-01-26', // Sunday's date (YYYY-MM-DD)
  users: 142,
  revenue: 1250.50,
  posts: 5,
  training: 4,
  loggedAt: '2026-01-30T14:22:00Z'
}

// Full app state (localStorage)
{
  weeks: [week1, week2, ...],
  currencySymbol: '$', // User-configurable
  lastKnownWeekId: '2026-01-26'
}
```

---

## 🎬 USER INTERACTIONS & ANIMATIONS

### Logging Current Week

**Flow:**
1. User fills in 4 metrics
2. Clicks "Log This Week"
3. Button shows loading spinner briefly
4. Form fades out
5. Week Summary Card fades in with slide-up animation
6. Chart updates with new data point
7. New line segment draws from previous week to current
8. Insights recalculate and update
9. Success toast: "📊 Week logged!" (2 seconds)

**Animation:**
- Form fade out: opacity 1 → 0, 300ms
- Summary fade in: opacity 0 → 1, translateY(20px) → 0, 400ms
- Chart line draw: Animated path, 600ms ease-out
- New data point: Scale 0 → 1.2 → 1, 400ms

### Editing a Week

**Flow:**
1. User clicks "Edit" on summary card or history card
2. Card transforms into editable form
3. Current values pre-filled
4. User modifies values
5. Clicks "Save Changes"
6. Form transforms back to summary
7. Chart updates (if current week)
8. Insights recalculate
9. Success toast: "✓ Week updated" (2 seconds)

**Animation:**
- Transform to form: Height transition, 300ms
- Fields slide in: stagger each by 50ms
- Transform back: Reverse animation
- Chart update: Smooth transition of line position, 500ms

### Deleting a Week

**Flow:**
1. User clicks delete icon on history card
2. Confirmation appears inline: "Delete this week? This cannot be undone."
3. User confirms
4. Card slides out to the right
5. Remaining cards slide up to fill gap
6. Chart updates (line segment removed)
7. Insights recalculate
8. Toast: "Week deleted" (2 seconds, warning color)

**Animation:**
- Confirmation: Height expand, 200ms
- Card exit: translateX(100%) + opacity 0, 350ms
- Gap close: All cards translateY upward, 300ms ease-in-out
- Chart: Line fades out, 400ms

### Chart Interaction

**Flow:**
1. User hovers over chart
2. Vertical crosshair appears at cursor X position
3. All 4 data points for that week highlight
4. Tooltip appears showing week + all 4 metrics
5. User moves mouse away
6. Crosshair and tooltip fade out

**Animation:**
- Crosshair: Fade in, 100ms
- Tooltip: Fade in + translateY(-5px → 0), 150ms
- Data points: Scale 1 → 1.6, 150ms
- Fade out: 100ms

### Legend Toggle

**Flow:**
1. User clicks a metric in the legend
2. That line fades out from the chart
3. Legend item dims and gets strikethrough
4. User clicks again
5. Line fades back in
6. Legend item restores

**Animation:**
- Line fade: opacity 1 → 0 (or 0 → 1), 250ms
- Legend dim: opacity 1 → 0.3, 200ms
- Strikethrough: Width 0 → 100%, 200ms

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 640px)

**Input Form:**
- Grid becomes 1 column (fields stack)
- Full width inputs

**Week Summary:**
- Metrics grid: 2×2 instead of 4 columns
- Comparison hidden (too cramped)

**Chart:**
- Height: 350px (shorter than desktop)
- X-axis labels: Show only every other week
- Legend moves to bottom, full width

**Insights Grid:**
- 1 column (cards stack)

**History Cards:**
- Full width
- Quick summary wraps to multiple lines

### Tablet (641-1024px)

**Input Form:**
- 2 column grid maintained

**Chart:**
- Height: 450px
- Show all week labels

**Insights:**
- 2 column grid maintained

### Desktop (1025px+)

**All sections:**
- Max widths enforced
- Full spacing
- Hover effects enabled

---

## 💾 DATA PERSISTENCE

### Storage Strategy

**localStorage for MVP:**

```javascript
const STORAGE_KEY = 'progress_radar_data'

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {
    weeks: [],
    currencySymbol: '$',
    lastKnownWeekId: null
  }
}
```

**Auto-save:**
- Save immediately after logging/editing a week
- No debouncing needed (infrequent writes)

---

## ⚡ PERFORMANCE OPTIMIZATIONS

1. **Memoize chart data** — Only recalculate normalization when weeks array changes
2. **Memoize insights** — Cache momentum score, patterns, etc.
3. **Lazy load Recharts** — Code-split the chart library
4. **Limit chart to 12 weeks** — Don't render 100+ weeks even if data exists
5. **Virtual scrolling for history** — If > 50 weeks (unlikely but safe)

---

## 🎯 EDGE CASES & HANDLING

### What if user logs the same week twice?

- Overwrite the existing entry for that weekId
- Show "Update Week" instead of "Log Week" if entry exists
- No duplicate weeks possible

### What if user has only 1 week of data?

- Chart shows single data point (no line yet)
- Insights section shows reduced set (no WoW, no trends)
- Message: "Log 2+ weeks to see trends"

### What if user enters 0 for all metrics?

- Allow it (valid data — sometimes you have an off week)
- Chart plots it accurately
- Insights note the dip but don't break

### What if user enters negative revenue?

- Allow it (refunds, chargebacks happen)
- Chart handles negative values correctly
- Insights flag it if significant

### What if user skips multiple weeks?

- Chart shows gaps (no line segment between non-consecutive weeks)
- Insights only consider available data
- Momentum score penalized by recency component

### What if user deletes all weeks?

- Empty state appears
- Chart hidden
- Insights hidden
- Only input form visible

### What if user changes currency symbol mid-way?

- New symbol applies going forward
- Old weeks keep their original logged values (numbers don't change)
- Potential confusion — but no data corruption
- Consider: Show currency symbol per week in history (future enhancement)

### What if user logs a future week?

- Validate on submission: weekId must be <= current week
- Show error: "You can't log a week that hasn't started yet"

### What if today is Saturday and user hasn't logged this week?

- Current week is still this week (doesn't roll over until Sunday)
- Banner shows "Not logged yet"
- User can still log before midnight

---

## ✅ IMPLEMENTATION CHECKLIST

**Functionality:**
- [ ] Can log current week with 4 metrics
- [ ] Can edit current week
- [ ] Can edit past weeks
- [ ] Can delete weeks with confirmation
- [ ] Weeks sorted chronologically
- [ ] Current week detection works correctly
- [ ] Week-over-week comparison calculates correctly
- [ ] Momentum score calculates correctly
- [ ] Best/worst week detected correctly
- [ ] Trend patterns detected correctly
- [ ] Chart normalizes data correctly
- [ ] Chart shows last 12 weeks (or all if < 12)
- [ ] Chart legend toggles work
- [ ] Chart tooltip shows all 4 metrics
- [ ] Data persists on reload
- [ ] Currency symbol configurable

**Design:**
- [ ] Pink accent color consistent
- [ ] Input form layout correct
- [ ] Week summary card shows comparison
- [ ] Chart renders properly
- [ ] Chart lines smooth and colored correctly
- [ ] Insights cards styled correctly
- [ ] History cards expand/collapse
- [ ] All animations smooth (60fps)
- [ ] Mobile responsive (375px, 414px)
- [ ] Tablet responsive (768px)
- [ ] Desktop responsive (1280px+)
- [ ] Hover states work

**Polish:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] No console errors
- [ ] All copy proofread
- [ ] Validation messages clear
- [ ] Success/error toasts appear
- [ ] Empty states styled

---

## 🚀 QUICK START CODE SCAFFOLD

```jsx
// ProgressRadar.jsx
import { useState, useEffect } from 'react'
import { Layout } from '@/components/universal/Layout'
import { WeekBanner } from './components/WeekBanner'
import { WeeklyInputForm } from './components/WeeklyInputForm'
import { WeekSummaryCard } from './components/WeekSummaryCard'
import { TrendChart } from './components/TrendChart'
import { Insights } from './components/Insights'
import { WeeklyHistory } from './components/WeeklyHistory'
import { getCurrentWeekRange, calculateMomentumScore, detectTrendPatterns } from './utils/calculations'
import { loadData, saveData } from './utils/storage'

export function ProgressRadar() {
  const [weeks, setWeeks] = useState([])
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [currentWeek, setCurrentWeek] = useState(null)

  useEffect(() => {
    const week = getCurrentWeekRange()
    setCurrentWeek(week)
    
    const data = loadData()
    setWeeks(data.weeks)
    setCurrencySymbol(data.currencySymbol)
  }, [])

  useEffect(() => {
    if (weeks.length > 0) {
      saveData({ weeks, currencySymbol })
    }
  }, [weeks, currencySymbol])

  const currentWeekData = weeks.find(w => w.weekId === currentWeek?.weekId)

  const handleLogWeek = (metrics) => {
    const weekEntry = {
      weekId: currentWeek.weekId,
      users: metrics.users,
      revenue: metrics.revenue,
      posts: metrics.posts,
      training: metrics.training,
      loggedAt: new Date().toISOString()
    }

    if (currentWeekData) {
      // Update existing
      setWeeks(weeks.map(w => w.weekId === currentWeek.weekId ? weekEntry : w))
    } else {
      // Add new
      setWeeks([...weeks, weekEntry])
    }
  }

  const handleDeleteWeek = (weekId) => {
    setWeeks(weeks.filter(w => w.weekId !== weekId))
  }

  const last12Weeks = weeks.slice(-12)
  const momentumScore = calculateMomentumScore(weeks)
  const patterns = detectTrendPatterns(weeks)

  return (
    <Layout appAccent="var(--app-6-accent)" appName="Progress Radar">
      <WeekBanner
        currentWeek={currentWeek}
        hasData={!!currentWeekData}
        loggedDate={currentWeekData?.loggedAt}
      />

      {!currentWeekData ? (
        <WeeklyInputForm
          onSubmit={handleLogWeek}
          currencySymbol={currencySymbol}
        />
      ) : (
        <WeekSummaryCard
          weekData={currentWeekData}
          previousWeek={weeks[weeks.length - 2]}
          currencySymbol={currencySymbol}
          onEdit={() => {/* Switch to edit mode */}}
        />
      )}

      {weeks.length >= 2 && (
        <>
          <TrendChart
            weeks={last12Weeks}
            currencySymbol={currencySymbol}
          />

          <Insights
            weeks={weeks}
            momentumScore={momentumScore}
            patterns={patterns}
            currencySymbol={currencySymbol}
          />
        </>
      )}

      <WeeklyHistory
        weeks={weeks}
        currencySymbol={currencySymbol}
        onEdit={handleLogWeek}
        onDelete={handleDeleteWeek}
      />
    </Layout>
  )
}
```

---

## 📊 SUCCESS METRICS

**User Engagement:**
- Weekly logging rate: > 80%
- Average weeks logged per user: > 8
- Consecutive weeks: > 6
- Time on page: 2-4 minutes (viewing trends)

**Performance:**
- Page load: < 1 second
- Chart render: < 300ms
- Week logging: < 200ms
- Smooth animations: 60fps

**Quality:**
- Zero data loss
- Accurate calculations
- Correct trend detection
- Responsive at all sizes

---

## 🎯 COPY PRINCIPLES USED

1. **Data-driven language** — "Proof you're leveling up" not "Feel better about yourself"
2. **Honest about stalls** — "Stalling pattern" not "Room for improvement"
3. **Growth obsession** — "Momentum" "Trajectory" "Breakthrough"
4. **Numbers speak** — Let the chart show the truth, copy supports it
5. **Directness** — "Needs improvement" not "Areas to focus on"

This app doesn't hand-wave or soften. The graph goes up or it doesn't. Momentum is real or it isn't. The data tells the story.

---

**App Spec Version:** 1.0  
**Ready to build:** YES  
**Estimated build time:** 10-12 hours  
**Priority:** 6/6 (Final app)
