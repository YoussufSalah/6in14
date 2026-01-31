# Energy Monitor — App Specification
**Protect The Machine**

---

## 🎯 App Purpose

**Core Question:** "How am I holding up?"

**Core Promise:** Track recovery. Spot burnout before it hits. Protect your most important asset — you.

**User Flow:**
1. User logs 3 daily metrics: Sleep, Mood, Fatigue
2. App shows 30-day trend line chart
3. User sees patterns: good weeks vs. crash weeks
4. App warns when metrics drop dangerously low
5. Simple daily check-in, powerful long-term insights

**The Philosophy:**
- You can't outwork burnout
- Recovery is a metric, not a luxury
- Data reveals patterns you can't feel in the moment

---

## 🎨 Visual Identity

**Accent Color:** Green (`#10b981`)
**Secondary Accent:** `#34d399` (lighter green)
**Background Tint:** `#1a2e24`
**Vibe:** Clinical. Precise. Health-focused but not medical.

**Key Visual Element:** 📊 Line chart showing 30-day trends with color-coded zones

---

## 📋 Page Structure

```
┌─────────────────────────────────────┐
│     NAVBAR (Universal)              │
├─────────────────────────────────────┤
│                                     │
│     TODAY'S CHECK-IN                │
│     - 3 Metric Inputs               │
│     - Sleep (hours slider)          │
│     - Mood (emoji picker)           │
│     - Fatigue (1-10 scale)          │
│     - [Submit] Button               │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     CURRENT STATUS                  │
│     - Today's metrics summary       │
│     - Warning alerts (if any)       │
│     - Streak count                  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     30-DAY TRENDS                   │
│     - Multi-line chart              │
│     - Sleep line                    │
│     - Mood line                     │
│     - Fatigue line                  │
│     - Danger zones highlighted      │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     INSIGHTS & PATTERNS             │
│     - Average metrics               │
│     - Best day / Worst day          │
│     - Consistency score             │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 SECTION 1: TODAY'S CHECK-IN

### Copy

**Section Title:**
```
Today's Energy Check-In
```

**Subtitle:**
```
{formattedDate} • Log your recovery metrics
```

**Sleep Input:**

```
LABEL: Sleep
How many hours did you sleep last night?

[Slider: 0 - 12 hours]

DISPLAY: {selectedHours}h

HELPER TEXT:
Ideal: 7-9 hours
```

**Mood Input:**

```
LABEL: Mood
How are you feeling today?

[Emoji Picker: 5 options]
😫 Terrible
😕 Low
😐 Okay
😊 Good
🔥 Excellent

SELECTED: {selectedEmoji} {selectedLabel}
```

**Fatigue Input:**

```
LABEL: Fatigue Level
How tired do you feel right now?

[Scale: 1 - 10]
1 = Energized, could run a marathon
10 = Exhausted, need to rest immediately

[Visual: 10 buttons/dots]

SELECTED: {selectedLevel}/10
```

**Submit Button:**

```
[If today not logged yet]
Log Today's Metrics

[If today already logged]
Update Today's Metrics
```

**Already Logged Message:**
```
✓ Today's metrics logged at {time}
You can update them anytime today.
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 800px
- Margin: 0 auto
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 8px

**Subtitle:**
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- Margin-bottom: 40px

**Metric Container:**
- Margin-bottom: 40px
- Last child: margin-bottom 0

**Label:**
- Font-size: text-base
- Font-weight: 600
- Color: white
- Margin-bottom: 12px
- Display: block

**Description Text:**
- Font-size: text-sm
- Color: text-secondary
- Margin-bottom: 16px
- Line-height: 1.5

---

### Sleep Input Design

**Slider Container:**
- Width: 100%
- Padding: 20px 0

**Slider Track:**
- Height: 8px
- Background: var(--bg-tertiary)
- Border-radius: 999px
- Position: relative

**Slider Fill (0 to current value):**
- Height: 8px
- Background: Linear gradient (var(--app-4-accent), var(--app-4-accent-light))
- Border-radius: 999px
- Transition: width 0.2s ease

**Slider Thumb:**
- Width: 24px
- Height: 24px
- Background: white
- Border: 3px solid var(--app-4-accent)
- Border-radius: 50%
- Cursor: grab
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3)
- Transition: transform 0.2s

**Slider Thumb Active:**
- Cursor: grabbing
- Transform: scale(1.2)

**Value Display (Above Slider):**
- Font-size: text-4xl
- Font: font-display, font-black
- Color: var(--app-4-accent)
- Text-align: center
- Margin-bottom: 8px

**Helper Text:**
- Font-size: text-xs
- Color: text-tertiary
- Text-align: center
- Margin-top: 12px
- Font-style: italic

**Color Coding (based on value):**
- 0-5 hours: Red accent (#ef4444)
- 6 hours: Orange accent (#f59e0b)
- 7-9 hours: Green accent (default)
- 10-12 hours: Blue accent (#3b82f6)

---

### Mood Input Design

**Emoji Grid:**
- Display: grid
- Grid-template-columns: repeat(5, 1fr)
- Gap: 12px
- Max-width: 500px

**Emoji Button:**
- Aspect-ratio: 1
- Background: var(--bg-tertiary)
- Border: 2px solid var(--border-subtle)
- Border-radius: 12px
- Font-size: 40px (desktop) / 32px (mobile)
- Cursor: pointer
- Transition: all 0.2s
- Display: flex
- Flex-direction: column
- Align-items: center
- Justify-content: center
- Padding: 16px 8px

**Emoji Button Hover:**
- Transform: translateY(-4px)
- Border-color: var(--app-4-accent)

**Emoji Button Selected:**
- Background: rgba(16, 185, 129, 0.1)
- Border: 2px solid var(--app-4-accent)
- Box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1)

**Emoji Label:**
- Font-size: text-xs
- Color: text-secondary
- Margin-top: 8px
- Text-align: center
- Font-weight: 500

**Emoji Label (Selected):**
- Color: var(--app-4-accent)
- Font-weight: 600

**Selected Display (Below Grid):**
- Font-size: text-lg
- Font: font-mono
- Color: var(--app-4-accent)
- Text-align: center
- Margin-top: 16px
- Font-weight: 600

---

### Fatigue Input Design

**Scale Container:**
- Display: flex
- Justify-content: space-between
- Align-items: center
- Gap: 8px
- Margin-top: 16px

**Scale Button:**
- Width: 44px (desktop) / 36px (mobile)
- Height: 44px (desktop) / 36px (mobile)
- Background: var(--bg-tertiary)
- Border: 2px solid var(--border-subtle)
- Border-radius: 8px
- Font-size: text-base
- Font-weight: 600
- Color: text-secondary
- Cursor: pointer
- Transition: all 0.2s
- Display: flex
- Align-items: center
- Justify-content: center

**Scale Button Hover:**
- Border-color: var(--app-4-accent)
- Color: white

**Scale Button Selected:**
- Background: var(--app-4-accent)
- Border-color: var(--app-4-accent)
- Color: white
- Transform: scale(1.1)

**Scale Button (All selected up to current):**
- Background: Linear gradient based on value
  - 1-3: Green (low fatigue)
  - 4-6: Orange (moderate)
  - 7-10: Red (high fatigue)

**Value Display (Below Scale):**
- Font-size: text-2xl
- Font: font-display, font-bold
- Text-align: center
- Margin-top: 16px
- Color: Based on value (green/orange/red)

**Description Text (Below Value):**
- Font-size: text-sm
- Color: text-tertiary
- Text-align: center
- Margin-top: 8px
- Font-style: italic
- Display description based on value:
  - 1-2: "Energized and ready"
  - 3-4: "Slightly tired but functional"
  - 5-6: "Moderately fatigued"
  - 7-8: "Very tired, need rest soon"
  - 9-10: "Exhausted, rest immediately"

---

### Submit Button Design

**Button:**
- Width: 100%
- Height: 56px
- Background: Linear gradient (var(--app-4-accent), var(--app-4-accent-light))
- Border: none
- Border-radius: 12px
- Color: white
- Font-size: text-lg
- Font-weight: 700
- Cursor: pointer
- Margin-top: 40px
- Transition: all 0.3s
- Box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2)

**Button Hover:**
- Transform: translateY(-2px)
- Box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3)

**Button Disabled:**
- Opacity: 0.5
- Cursor: not-allowed
- Transform: none

**Already Logged Message:**
- Background: rgba(16, 185, 129, 0.1)
- Border: 1px solid rgba(16, 185, 129, 0.2)
- Border-radius: 8px
- Padding: 12px 16px
- Font-size: text-sm
- Color: var(--app-4-accent)
- Text-align: center
- Margin-top: 24px
- Font: font-mono

---

## 💚 SECTION 2: CURRENT STATUS

### Copy

**Section Title:**
```
Today's Summary
```

**Metrics Display:**

```
SLEEP: {hours}h
STATUS: {Good / Fair / Poor}

MOOD: {emoji} {label}
STATUS: {Positive / Neutral / Low}

FATIGUE: {level}/10
STATUS: {Low / Moderate / High / Critical}
```

**Warning Alerts (if triggered):**

```
⚠️ ALERT: Low Sleep
You've slept less than 6 hours. Recovery is compromised.

⚠️ ALERT: High Fatigue
Fatigue level is critical (9-10). Rest is not optional.

⚠️ ALERT: Poor Mood Pattern
Mood has been low for 3+ consecutive days. Consider a break.
```

**Streak Display:**

```
🔥 {streakDays} day logging streak
Keep tracking to spot patterns early.
```

**No Data State:**

```
No metrics logged yet.
Log today's check-in above to start tracking.
```

### Design Specifications

**Section Container:**
- Padding: 40px 32px
- Max-width: 1000px
- Margin: 32px auto 0
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px

**Section Title:**
- Font-size: text-xl
- Font: font-display, font-bold
- Margin-bottom: 24px

**Metrics Grid:**
- Display: grid
- Grid: 3 columns (desktop), 1 column (mobile)
- Gap: 20px
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
- Color: var(--app-4-accent)
- Margin-bottom: 8px
- Line-height: 1

**Metric Label:**
- Font-size: text-xs
- Font: font-mono
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Color: text-tertiary
- Margin-bottom: 12px

**Metric Status:**
- Font-size: text-sm
- Font-weight: 600
- Padding: 6px 12px
- Border-radius: 6px
- Display: inline-block

**Status Colors:**
- Good/Positive/Low: Background rgba(16, 185, 129, 0.1), color var(--success)
- Fair/Neutral/Moderate: Background rgba(245, 158, 11, 0.1), color var(--warning)
- Poor/Low/High/Critical: Background rgba(239, 68, 68, 0.1), color var(--error)

**Warning Alerts Container:**
- Display: flex
- Flex-direction: column
- Gap: 12px
- Margin-bottom: 32px

**Alert Card:**
- Background: rgba(239, 68, 68, 0.1)
- Border-left: 4px solid var(--error)
- Border-radius: 8px
- Padding: 16px 20px
- Font-size: text-sm
- Color: white
- Line-height: 1.6

**Alert Title:**
- Font-weight: 700
- Color: var(--error)
- Margin-bottom: 6px
- Display: flex
- Align-items: center
- Gap: 8px

**Streak Display:**
- Background: rgba(16, 185, 129, 0.05)
- Border: 1px solid rgba(16, 185, 129, 0.2)
- Border-radius: 8px
- Padding: 16px
- Text-align: center
- Font-size: text-base
- Font: font-mono
- Color: var(--app-4-accent)

**Streak Number:**
- Font-size: text-2xl
- Font-weight: 700

**No Data State:**
- Text-align: center
- Color: text-tertiary
- Font-size: text-base
- Padding: 40px
- Font-style: italic

---

## 📊 SECTION 3: 30-DAY TRENDS

### Copy

**Section Title:**
```
30-Day Recovery Trends
```

**Subtitle:**
```
Track patterns. Spot burnout before it hits.
```

**Chart Legend:**
```
━━ Sleep (hours)
━━ Mood (1-5 scale)
━━ Fatigue (1-10 scale, inverted)
```

**Danger Zones (on chart):**
```
RED ZONE: Critical recovery needed
YELLOW ZONE: Watch closely
GREEN ZONE: Healthy range
```

**No Data State:**
```
Not enough data yet.
Log for 3+ days to see trends.
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
- Font-size: text-base
- Color: text-secondary
- Margin-bottom: 32px

**Chart Container:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px
- Padding: 32px
- Min-height: 400px

**Chart (Using Recharts):**
- Type: LineChart
- Data: Last 30 days
- Lines: 3 (Sleep, Mood, Fatigue)
- X-axis: Dates (show every 5 days)
- Y-axis: 0-12 scale (normalized)
- Grid: Subtle horizontal lines
- Tooltip: Show all 3 metrics for hovered date
- Responsive: true

**Line Colors:**
- Sleep: var(--app-4-accent) (green)
- Mood: #3b82f6 (blue)
- Fatigue: #f59e0b (orange) — inverted so low fatigue is high on chart

**Line Styles:**
- Stroke-width: 3px
- Dot size: 5px (on hover: 8px)
- Smooth: true (curved lines)

**Danger Zones (Background):**
- Red zone (0-2): rgba(239, 68, 68, 0.1)
- Yellow zone (2-4): rgba(245, 158, 11, 0.05)
- Green zone (4+): Normal background

**Legend:**
- Position: Top right
- Font-size: text-xs
- Font: font-mono
- Color: text-secondary
- Display: flex
- Gap: 16px

**Legend Item:**
- Display: flex
- Align-items: center
- Gap: 6px

**Legend Line:**
- Width: 20px
- Height: 3px
- Background: Line color
- Border-radius: 2px

**Tooltip (on hover):**
- Background: var(--bg-primary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 12px 16px
- Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3)

**Tooltip Content:**
- Date: text-sm, font-mono, text-tertiary
- Metrics: text-base, color based on line
- Each metric on new line
- Gap: 4px

**No Data State:**
- Text-align: center
- Color: text-tertiary
- Font-size: text-lg
- Padding: 80px 40px
- Font-style: italic

---

## 📈 SECTION 4: INSIGHTS & PATTERNS

### Copy

**Section Title:**
```
Insights (Last 30 Days)
```

**Average Metrics:**

```
AVERAGE SLEEP: {avgSleep}h per night
AVERAGE MOOD: {avgMood}/5
AVERAGE FATIGUE: {avgFatigue}/10
```

**Best & Worst Days:**

```
BEST DAY: {date}
Sleep: {hours}h, Mood: {emoji}, Fatigue: {level}/10

WORST DAY: {date}
Sleep: {hours}h, Mood: {emoji}, Fatigue: {level}/10
```

**Patterns Detected:**

```
[If detected] ⚠️ Sleep Deficit Pattern
Average sleep is {hours}h. You're {deficit}h below the 7h minimum.

[If detected] 🔄 Recovery Inconsistency
Sleep varies by {variance}h. Consistency builds better recovery.

[If detected] ⬇️ Downward Trend
Metrics declining over last 7 days. Time to prioritize rest.

[If no issues] ✅ Healthy Recovery
Metrics look good. Keep protecting the machine.
```

**Consistency Score:**

```
Consistency Score: {score}%
Based on how regularly you log and metric stability.
```

### Design Specifications

**Section Container:**
- Padding: 48px 32px
- Max-width: 1200px
- Margin: 32px auto 0

**Section Title:**
- Font-size: text-2xl
- Font: font-display, font-bold
- Margin-bottom: 32px

**Averages Grid:**
- Display: grid
- Grid: 3 columns (desktop), 1 column (mobile)
- Gap: 20px
- Margin-bottom: 40px

**Average Card:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 24px
- Text-align: center

**Average Value:**
- Font-size: text-4xl
- Font: font-display, font-black
- Color: var(--app-4-accent)
- Line-height: 1
- Margin-bottom: 8px

**Average Label:**
- Font-size: text-xs
- Font: font-mono
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Color: text-tertiary

**Best/Worst Container:**
- Display: grid
- Grid: 2 columns (desktop), 1 column (mobile)
- Gap: 20px
- Margin-bottom: 40px

**Day Card:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 24px

**Best Day Card:**
- Border-left: 4px solid var(--success)

**Worst Day Card:**
- Border-left: 4px solid var(--error)

**Day Title:**
- Font-size: text-sm
- Font: font-mono
- Text-transform: uppercase
- Letter-spacing: 0.1em
- Color: text-tertiary
- Margin-bottom: 12px

**Day Date:**
- Font-size: text-lg
- Font-weight: 700
- Color: white
- Margin-bottom: 16px

**Day Metrics:**
- Font-size: text-sm
- Color: text-secondary
- Line-height: 1.8

**Patterns Container:**
- Display: flex
- Flex-direction: column
- Gap: 16px
- Margin-bottom: 32px

**Pattern Card:**
- Background: var(--bg-tertiary)
- Border-left: 4px solid var(--warning)
- Border-radius: 8px
- Padding: 20px
- Font-size: text-base
- Line-height: 1.6

**Pattern Card (Healthy):**
- Border-left-color: var(--success)
- Background: rgba(16, 185, 129, 0.05)

**Pattern Title:**
- Font-weight: 700
- Margin-bottom: 8px
- Display: flex
- Align-items: center
- Gap: 8px

**Pattern Description:**
- Color: text-secondary
- Font-size: text-sm

**Consistency Score:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 24px
- Text-align: center

**Score Value:**
- Font-size: text-5xl
- Font: font-display, font-black
- Color: Based on score
  - 80-100%: var(--success)
  - 60-79%: var(--warning)
  - <60%: var(--error)
- Line-height: 1
- Margin-bottom: 8px

**Score Label:**
- Font-size: text-base
- Color: text-secondary

---

## 🧮 CALCULATION LOGIC

### Metric Normalization

**Sleep (0-12 hours):**
- Raw value: 0-12
- Ideal range: 7-9 hours
- Status:
  - 0-5h: "Poor"
  - 6h: "Fair"
  - 7-9h: "Good"
  - 10-12h: "Fair" (too much)

**Mood (Emoji to numeric):**
- 😫 Terrible: 1
- 😕 Low: 2
- 😐 Okay: 3
- 😊 Good: 4
- 🔥 Excellent: 5
- Status:
  - 1-2: "Low"
  - 3: "Neutral"
  - 4-5: "Positive"

**Fatigue (1-10 scale):**
- Raw value: 1-10
- Lower is better (inverted for chart display)
- Status:
  - 1-3: "Low" (good)
  - 4-6: "Moderate"
  - 7-8: "High"
  - 9-10: "Critical"

### Alert Triggers

```javascript
// Sleep alert
if (sleep < 6) {
  alerts.push({
    type: 'warning',
    title: 'Low Sleep',
    message: `You've slept less than 6 hours. Recovery is compromised.`
  })
}

// Fatigue alert
if (fatigue >= 9) {
  alerts.push({
    type: 'critical',
    title: 'High Fatigue',
    message: 'Fatigue level is critical (9-10). Rest is not optional.'
  })
}

// Mood pattern alert (3+ consecutive low days)
const last3Days = getLastNDays(3)
const allLowMood = last3Days.every(day => day.mood <= 2)
if (allLowMood) {
  alerts.push({
    type: 'warning',
    title: 'Poor Mood Pattern',
    message: "Mood has been low for 3+ consecutive days. Consider a break."
  })
}
```

### Pattern Detection

```javascript
function detectPatterns(last30Days) {
  const patterns = []
  
  // Sleep deficit
  const avgSleep = calculateAverage(last30Days.map(d => d.sleep))
  if (avgSleep < 7) {
    const deficit = 7 - avgSleep
    patterns.push({
      type: 'warning',
      title: 'Sleep Deficit Pattern',
      message: `Average sleep is ${avgSleep.toFixed(1)}h. You're ${deficit.toFixed(1)}h below the 7h minimum.`
    })
  }
  
  // Sleep inconsistency
  const sleepVariance = calculateStandardDeviation(last30Days.map(d => d.sleep))
  if (sleepVariance > 2) {
    patterns.push({
      type: 'warning',
      title: 'Recovery Inconsistency',
      message: `Sleep varies by ${sleepVariance.toFixed(1)}h. Consistency builds better recovery.`
    })
  }
  
  // Downward trend (last 7 days)
  const last7 = last30Days.slice(-7)
  const first3Avg = calculateAverage(last7.slice(0, 3).map(d => d.sleep))
  const last3Avg = calculateAverage(last7.slice(-3).map(d => d.sleep))
  if (last3Avg < first3Avg - 1) {
    patterns.push({
      type: 'critical',
      title: 'Downward Trend',
      message: 'Metrics declining over last 7 days. Time to prioritize rest.'
    })
  }
  
  // Healthy state
  if (patterns.length === 0) {
    patterns.push({
      type: 'success',
      title: 'Healthy Recovery',
      message: 'Metrics look good. Keep protecting the machine.'
    })
  }
  
  return patterns
}
```

### Consistency Score

```javascript
function calculateConsistencyScore(last30Days) {
  // Two factors:
  // 1. Logging frequency (how many days logged out of 30)
  // 2. Metric stability (low variance = high score)
  
  const loggingRate = last30Days.length / 30
  
  const sleepVariance = calculateStandardDeviation(last30Days.map(d => d.sleep))
  const moodVariance = calculateStandardDeviation(last30Days.map(d => d.mood))
  const fatigueVariance = calculateStandardDeviation(last30Days.map(d => d.fatigue))
  
  // Lower variance = more consistent = higher score
  const stabilityScore = 1 - (sleepVariance / 12 + moodVariance / 5 + fatigueVariance / 10) / 3
  
  // Weighted average: 60% logging, 40% stability
  const finalScore = (loggingRate * 0.6 + stabilityScore * 0.4) * 100
  
  return Math.round(finalScore)
}
```

### Best & Worst Day Calculation

```javascript
function findBestAndWorstDays(last30Days) {
  // Calculate composite score for each day
  const daysWithScores = last30Days.map(day => {
    // Normalize all to 0-1 scale
    const sleepScore = Math.min(day.sleep / 9, 1) // 9h = perfect
    const moodScore = day.mood / 5
    const fatigueScore = (10 - day.fatigue) / 10 // Invert fatigue
    
    const compositeScore = (sleepScore + moodScore + fatigueScore) / 3
    
    return {
      ...day,
      score: compositeScore
    }
  })
  
  // Sort by score
  const sorted = daysWithScores.sort((a, b) => b.score - a.score)
  
  return {
    best: sorted[0],
    worst: sorted[sorted.length - 1]
  }
}
```

### Data Structure

```javascript
{
  entries: [
    {
      date: '2026-01-27', // YYYY-MM-DD
      sleep: 7.5,
      mood: 4, // 1-5 (from emoji)
      fatigue: 3, // 1-10
      timestamp: '2026-01-27T09:15:00Z'
    },
    {
      date: '2026-01-26',
      sleep: 6,
      mood: 2,
      fatigue: 8,
      timestamp: '2026-01-26T10:30:00Z'
    }
    // ... more entries
  ],
  streak: 12 // Consecutive days logged
}
```

---

## 🎬 USER INTERACTIONS & ANIMATIONS

### Logging Metrics

**Flow:**
1. User adjusts sleep slider
2. Value updates in real-time with color coding
3. User selects mood emoji
4. Selected emoji scales up, others dim
5. User clicks fatigue level
6. All levels up to selected fill with color
7. User clicks "Log Today's Metrics"
8. Button shows loading spinner
9. Success animation: Green checkmark
10. Metrics appear in Current Status section
11. Chart updates with new data point
12. Success toast: "✓ Metrics logged!" (2 seconds)

**Animation:**
- Slider: Value counts up/down smoothly, 200ms
- Emoji selection: Scale 1 → 1.2 → 1, 300ms
- Fatigue fill: Cascade from 1 to selected, 50ms each
- Submit button: Ripple effect, then scale down
- Chart: New point fades in, line draws to it, 500ms
- Success toast: Slide in from top, 300ms

### Updating Metrics (Same Day)

**Flow:**
1. User changes any metric
2. "Update" button becomes enabled
3. User clicks update
4. Values smoothly transition
5. Chart updates
6. Status cards update
7. Toast: "✓ Metrics updated"

**Animation:**
- Value transition: Count up/down, 400ms
- Chart: Point moves to new position, 500ms ease
- Status cards: Flip animation, 300ms

### Alert Appearance

**Flow:**
1. User logs metrics that trigger alert
2. After submission, alert card slides in
3. Alert icon pulses
4. If critical, add subtle shake
5. Card remains until metrics improve

**Animation:**
- Slide in: translateY(-20px) → 0, 400ms
- Icon pulse: Scale 1 → 1.2 → 1, 1s infinite
- Critical shake: translateX(-5px → 5px → 0), 400ms, 2 iterations

### Streak Increment

**Flow:**
1. User logs for consecutive day
2. Streak number counts up
3. Flame emoji animates
4. Brief confetti (subtle, 5-10 particles)
5. Achievement toast if milestone (7, 30, 100 days)

**Animation:**
- Number count up: 500ms
- Flame: Bounce, 400ms
- Confetti: Rise and fade, 1s
- Milestone toast: Slide in with larger icon, 3s duration

### Chart Interaction

**Flow:**
1. User hovers over chart
2. Vertical line appears at cursor
3. Tooltip shows all 3 metrics for that date
4. Dots on lines highlight
5. User moves mouse away
6. Tooltip fades out

**Animation:**
- Vertical line: Fade in, 150ms
- Tooltip: Fade in + translateY(-5px → 0), 200ms
- Dots: Scale 1 → 1.6, 200ms
- Fade out: 150ms

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 640px)

**Check-in Section:**
- Full width inputs
- Emoji grid: 3×2 (3 on top, 2 on bottom, centered)
- Fatigue scale: 2 rows of 5
- Submit button: Full width

**Current Status:**
- Metrics stack vertically (1 column)
- Alerts full width

**Chart:**
- Height: 300px (shorter)
- Show every 10 days on X-axis
- Simplified legend (icons only)

**Insights:**
- Averages: 1 column
- Best/Worst: 1 column stack
- Patterns: Full width

### Tablet (641-1024px)

**Check-in Section:**
- Maintain desktop layout
- Slightly smaller emoji size

**Current Status:**
- 3 columns maintained

**Chart:**
- Height: 350px
- Show every 7 days

**Insights:**
- 3 columns for averages
- 2 columns for best/worst

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
const STORAGE_KEY = 'energy_monitor_data'

// Save data
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Load data
function loadData() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : { entries: [], streak: 0 }
}
```

**Auto-Save:**
- Save immediately after logging metrics
- Save after updating metrics
- No debouncing needed (infrequent writes)

---

## ⚡ PERFORMANCE OPTIMIZATIONS

1. **Memoize chart data** — Only recalculate when entries change
2. **Lazy load chart library** — Load recharts only when needed
3. **Debounce slider** — Update display immediately, save after 500ms
4. **Cache calculations** — Store averages, patterns until data changes
5. **Limit chart data** — Always show max 30 days (trim older)

---

## 🎯 EDGE CASES & HANDLING

### What if user logs multiple times same day?

- Always allow updates
- Overwrite existing entry for that date
- Show "Update" button instead of "Log"
- Keep timestamp of latest update

### What if user has gaps in logging?

- Streak resets to 0 on first gap
- Chart shows gaps (no line between points with >1 day gap)
- Insights still calculate from available data
- Minimum 3 days needed to show trends

### What if all metrics are "perfect"?

- No alerts
- Show "Healthy Recovery" pattern
- High consistency score
- Celebrate in insights section

### What if user consistently logs terrible metrics?

- Show multiple warnings
- Pattern detection highlights downward trend
- Suggest taking action (but don't be preachy)
- Data speaks for itself

### What if user changes timezone?

- Use local date for display
- Store dates in YYYY-MM-DD format (no time zone)
- Each day is based on user's local midnight

### What if user has exactly 0 hours sleep?

- Allow it (all-nighter, unusual but possible)
- Trigger critical sleep alert
- Don't assume data error

### What if mood is same for 30 days straight?

- It's possible (stable mood)
- Don't flag as issue
- High consistency score
- Only flag if consistently low (1-2)

---

## ✅ IMPLEMENTATION CHECKLIST

**Functionality:**
- [ ] Can log sleep (slider 0-12)
- [ ] Can select mood (5 emojis)
- [ ] Can select fatigue (1-10 scale)
- [ ] Can submit metrics
- [ ] Can update same-day metrics
- [ ] Alerts trigger correctly
- [ ] Streak increments on consecutive days
- [ ] Streak resets on gap
- [ ] Chart displays 30 days
- [ ] Chart shows all 3 metrics
- [ ] Averages calculate correctly
- [ ] Best/worst days detected
- [ ] Patterns detected
- [ ] Consistency score calculated
- [ ] Data persists on reload

**Design:**
- [ ] Green accent color consistent
- [ ] Sleep slider color-coded
- [ ] Mood emojis interactive
- [ ] Fatigue scale fills correctly
- [ ] Status cards show correct colors
- [ ] Alerts appear with correct severity
- [ ] Chart renders properly
- [ ] Chart tooltip works
- [ ] All animations smooth (60fps)
- [ ] Mobile responsive (375px, 414px)
- [ ] Tablet responsive (768px)
- [ ] Desktop responsive (1280px+)

**Polish:**
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] No console errors
- [ ] All copy proofread
- [ ] Emoji accessibility labels
- [ ] Chart accessible
- [ ] Success toasts appear
- [ ] Milestone celebrations work

---

## 🚀 QUICK START CODE SCAFFOLD

```jsx
// EnergyMonitor.jsx
import { useState, useEffect } from 'react'
import { Layout } from '@/components/universal/Layout'
import { TodaysCheckIn } from './components/TodaysCheckIn'
import { CurrentStatus } from './components/CurrentStatus'
import { TrendsChart } from './components/TrendsChart'
import { Insights } from './components/Insights'
import { detectAlerts, detectPatterns, calculateConsistency } from './utils/analysis'
import { loadData, saveData } from './utils/storage'

export function EnergyMonitor() {
  const [data, setData] = useState({ entries: [], streak: 0 })
  const [todayEntry, setTodayEntry] = useState(null)
  
  useEffect(() => {
    const loaded = loadData()
    setData(loaded)
    
    // Find today's entry if exists
    const today = new Date().toISOString().split('T')[0]
    const entry = loaded.entries.find(e => e.date === today)
    if (entry) {
      setTodayEntry(entry)
    }
  }, [])
  
  useEffect(() => {
    if (data.entries.length > 0) {
      saveData(data)
    }
  }, [data])
  
  const handleLogMetrics = (metrics) => {
    const today = new Date().toISOString().split('T')[0]
    const timestamp = new Date().toISOString()
    
    const newEntry = {
      date: today,
      sleep: metrics.sleep,
      mood: metrics.mood,
      fatigue: metrics.fatigue,
      timestamp
    }
    
    // Check if updating existing entry
    const existingIndex = data.entries.findIndex(e => e.date === today)
    
    let updatedEntries
    if (existingIndex >= 0) {
      updatedEntries = [...data.entries]
      updatedEntries[existingIndex] = newEntry
    } else {
      updatedEntries = [...data.entries, newEntry]
    }
    
    // Calculate new streak
    const newStreak = calculateStreak(updatedEntries)
    
    setData({
      entries: updatedEntries,
      streak: newStreak
    })
    
    setTodayEntry(newEntry)
  }
  
  const alerts = todayEntry ? detectAlerts(todayEntry, data.entries) : []
  const last30 = data.entries.slice(-30)
  const patterns = last30.length >= 3 ? detectPatterns(last30) : []
  const consistency = last30.length >= 3 ? calculateConsistency(last30) : 0
  
  return (
    <Layout appAccent="var(--app-4-accent)" appName="Energy Monitor">
      <TodaysCheckIn
        existingEntry={todayEntry}
        onSubmit={handleLogMetrics}
      />
      
      <CurrentStatus
        entry={todayEntry}
        alerts={alerts}
        streak={data.streak}
      />
      
      <TrendsChart
        data={last30}
      />
      
      <Insights
        data={last30}
        patterns={patterns}
        consistency={consistency}
      />
    </Layout>
  )
}

function calculateStreak(entries) {
  if (entries.length === 0) return 0
  
  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today)
    checkDate.setDate(today.getDate() - i)
    const dateStr = checkDate.toISOString().split('T')[0]
    
    const hasEntry = entries.some(e => e.date === dateStr)
    if (hasEntry) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}
```

---

## 📊 SUCCESS METRICS

**User Engagement:**
- Daily logging rate: > 60%
- Average entries per user: > 20/month
- Streak retention (7 days): > 50%
- Streak retention (30 days): > 25%

**Performance:**
- Page load: < 1 second
- Chart render: < 300ms
- Slider responsiveness: < 50ms
- Metric submission: < 200ms

**Quality:**
- Zero data loss
- Accurate calculations
- Correct alert triggers
- Proper timezone handling

---

## 🎯 COPY PRINCIPLES USED

1. **Clinical precision** — "Energy Monitor" not "Wellness Tracker"
2. **Protect not optimize** — "Protect the machine" not "Maximize performance"
3. **Data-driven** — "Track patterns" not "Feel better"
4. **Honest warnings** — "Rest is not optional" not "Consider resting"
5. **Athlete mindset** — Recovery as metric, not luxury

This app doesn't motivate with positivity. It uses data to show you what you're doing to yourself. The numbers don't lie.

---

**App Spec Version:** 1.0  
**Ready to build:** YES  
**Estimated build time:** 10-12 hours  
**Priority:** 4/6
