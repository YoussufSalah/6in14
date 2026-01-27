# 6-in-14 Design System
**Universal Design Foundation for Micro-Apps Platform**

---

## 🎯 Design Philosophy

**"Brutal clarity meets relentless execution"**

This isn't another productivity dashboard. This is a command center for someone who ships. The aesthetic: **Neo-Brutalist Productivity** — sharp edges, high contrast, zero bullshit, maximum signal.

### Core Principles
1. **Instant Recognition** — Each app has a unique color signature within the system
2. **Zero Friction** — Every action is 1-2 clicks max
3. **Feedback First** — Visual state changes happen immediately
4. **Mobile-Native Thinking** — Touch targets, thumb zones, portrait-first

---

## 🎨 Visual Identity

### Color System

**Universal Palette**
```css
:root {
  /* Base — Dark theme primary */
  --bg-primary: #0a0a0a;
  --bg-secondary: #141414;
  --bg-tertiary: #1f1f1f;
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: #a3a3a3;
  --text-tertiary: #737373;
  
  /* Borders & Dividers */
  --border-subtle: #262626;
  --border-strong: #404040;
  
  /* System States */
  --success: #22c55e;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

**App-Specific Accent Colors** (for differentiation)
```css
/* 1. Decision Fatigue — Purple */
--app-1-accent: #a855f7;
--app-1-accent-light: #c084fc;
--app-1-bg: #1e1b2e;

/* 2. Streak Commander — Orange */
--app-2-accent: #fb923c;
--app-2-accent-light: #fdba74;
--app-2-bg: #2a1f1a;

/* 3. Weekly War Map — Blue */
--app-3-accent: #3b82f6;
--app-3-accent-light: #60a5fa;
--app-3-bg: #1a202e;

/* 4. Energy Monitor — Green */
--app-4-accent: #10b981;
--app-4-accent-light: #34d399;
--app-4-bg: #1a2e24;

/* 5. Silent Reminders — Yellow */
--app-5-accent: #eab308;
--app-5-accent-light: #fde047;
--app-5-bg: #2e2a1a;

/* 6. Progress Radar — Pink */
--app-6-accent: #ec4899;
--app-6-accent-light: #f472b6;
--app-6-bg: #2e1a24;
```

### Typography

**Font Stack**
```css
/* Display/Headings — Sharp, geometric, commanding */
--font-display: 'Space Mono', 'Courier New', monospace;

/* Body — Clean, readable, modern */
--font-body: 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif;

/* Data/Numbers — Tabular, precise */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

**Type Scale**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

**Font Weights**
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;
```

---

## 📐 Spacing & Layout

### Spacing Scale
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Container Widths
```css
--container-sm: 640px;  /* Mobile */
--container-md: 768px;  /* Tablet */
--container-lg: 1024px; /* Desktop */
--container-xl: 1280px; /* Wide */
```

### Border Radius
```css
--radius-sm: 0.25rem;  /* 4px - subtle */
--radius-md: 0.5rem;   /* 8px - standard */
--radius-lg: 0.75rem;  /* 12px - cards */
--radius-xl: 1rem;     /* 16px - prominent */
--radius-full: 9999px; /* Pills/badges */
```

---

## 🧩 Component Library

### 1. Navigation Bar (Universal)

**Structure:**
- Fixed top, 60px height
- App switcher (left) → Logo/Title (center) → User menu (right)
- Active app indicator with accent color underline

```jsx
<nav className="nav-universal">
  <button className="app-switcher">⚡ Apps</button>
  <h1 className="nav-title">Decision Fatigue</h1>
  <button className="user-menu">
    <Avatar />
  </button>
</nav>
```

**Visual Treatment:**
- Background: var(--bg-secondary)
- Border-bottom: 2px solid var(--border-subtle)
- Glassmorphism effect on scroll: backdrop-blur(12px) + opacity 0.95

### 2. App Switcher Modal

**Behavior:**
- Opens as fullscreen modal on mobile
- Grid layout: 2×3 on mobile, 3×2 on desktop
- Each app card shows: Icon, Name, Accent color, Quick status

```jsx
<div className="app-grid">
  {apps.map(app => (
    <AppCard
      icon={app.icon}
      name={app.name}
      accent={app.accent}
      status={app.quickStatus}
    />
  ))}
</div>
```

**Card Design:**
- 120px × 140px minimum
- Background gradient: var(--app-bg) to transparent
- Hover: Scale 1.05, border glow with accent color
- Active state: Border 2px solid accent

### 3. Primary Action Button

**Variants:**
1. **Default** — Filled with accent color
2. **Secondary** — Outline with accent color
3. **Ghost** — Text only with accent color
4. **Danger** — Filled with error color

```css
.btn-primary {
  height: 48px;
  padding: 0 24px;
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--accent-rgb), 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}
```

### 4. Input Fields

**Text Input:**
```jsx
<div className="input-group">
  <label className="input-label">Task Name</label>
  <input 
    type="text"
    className="input-field"
    placeholder="Enter task..."
  />
  <span className="input-hint">Max 60 characters</span>
</div>
```

**Styling:**
- Height: 44px
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Focus: Border var(--accent), outline none, box-shadow glow
- Padding: 12px 16px

### 5. Cards & Containers

**Standard Card:**
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: border-color 0.2s ease;
}

.card:hover {
  border-color: var(--border-strong);
}

.card-elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
```

### 6. Status Indicators

**Streak/Progress Badges:**
```jsx
<div className="status-badge">
  <span className="badge-value">7</span>
  <span className="badge-label">day streak</span>
</div>
```

**Visual States:**
- Active: Green glow
- Warning: Orange pulse animation
- Broken/Error: Red with shake animation
- Neutral: Gray

### 7. Data Visualization

**Chart Container:**
- Always use recharts library
- Dark theme optimized
- Accent color for primary data
- Gradient fills with opacity 0.1-0.3
- Grid lines: var(--border-subtle)
- Tooltips: Dark bg with accent border

---

## 🔐 Universal Auth System

### Auth Pages Layout

**Structure:**
```
┌────────────────────────────────┐
│                                │
│     [LOGO + PLATFORM NAME]     │
│                                │
│    ┌──────────────────┐        │
│    │   AUTH CARD      │        │
│    │                  │        │
│    │  [Form Fields]   │        │
│    │                  │        │
│    │  [Action BTN]    │        │
│    │                  │        │
│    │  [Alt Links]     │        │
│    └──────────────────┘        │
│                                │
└────────────────────────────────┘
```

**Pages Needed:**
1. `/login` — Email + Password
2. `/signup` — Email + Password + Name
3. `/forgot-password` — Email input
4. `/reset-password` — New password form

**Auth Flow:**
- Login → Store JWT + user data → Redirect to last visited app or Decision Fatigue
- Session persists across all 6 apps
- Auth check on every app mount
- Automatic token refresh

**Storage Strategy:**
```javascript
// localStorage keys
AUTH_TOKEN = '6in14_auth_token'
USER_DATA = '6in14_user_data'
LAST_APP = '6in14_last_app'
```

---

## 📱 Responsive Behavior

### Breakpoints
```css
--mobile: 0-640px
--tablet: 641-1024px
--desktop: 1025px+
```

### Mobile-First Rules
1. **Touch Targets:** Minimum 44×44px
2. **Bottom Navigation:** Sticky app switcher at bottom on mobile
3. **Forms:** Full-width inputs, larger text (16px to prevent zoom)
4. **Spacing:** Reduce by 25% on mobile
5. **Typography:** Scale down one step on mobile (text-2xl → text-xl)

---

## 🎬 Motion & Animations

### Timing Functions
```css
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
--ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
--ease-accelerate: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration Scale
```css
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;
```

### Key Animations

**Page Transitions:**
- Fade in + slide up 20px
- Duration: 350ms ease-decelerate

**Success States:**
- Scale pulse 1 → 1.05 → 1
- Green glow flash
- Haptic feedback (if available)

**Error States:**
- Horizontal shake (3 iterations, 5px amplitude)
- Red border flash
- Duration: 400ms

**Loading States:**
- Skeleton screens with shimmer
- Spinner: Rotating accent-colored circle
- Never show "Loading..." text alone

---

## 🎯 App-Specific Design Notes

### 1. Decision Fatigue
**Primary Component:** Large card with single task
- Font size: text-4xl for task name
- Purple gradient background on card
- Massive "Done" button (full width, 60px height)
- Refresh button in corner (circular, 48px)

### 2. Streak Commander
**Primary Component:** Streak counter
- Centered huge number (text-5xl, bold)
- Flame emoji 🔥 animation on active streak
- 3 category pills (Work, Training, Posts)
- Calendar heat map below (last 30 days)

### 3. Weekly War Map
**Primary Component:** Task board
- 3 columns (Priority 1, 2, 3)
- Drag-and-drop enabled
- Lock icon when week is committed
- Progress bar: X/15 tasks complete

### 4. Energy Monitor
**Primary Component:** Daily entry form
- Slider inputs for Sleep (0-12h)
- Emoji picker for Mood (😫 to 🔥)
- Fatigue scale (1-10)
- Line chart showing 30-day trend below

### 5. Silent Reminders
**Primary Component:** Reminder list
- Minimal cards, checkbox + text
- Date badge (Today, Tomorrow, Next Week)
- Swipe-to-delete on mobile
- Daily digest banner at top

### 6. Progress Radar
**Primary Component:** Multi-metric chart
- Radar/spider chart showing 4 metrics
- Week-over-week comparison
- Metric cards below chart (Users, Revenue, Posts, Training)
- Green/Red indicator for trend

---

## 🛠 Technical Implementation

### Tech Stack Recommendation
```
Frontend: React 18+ with Vite
Styling: Tailwind CSS + CSS Modules for complex components
State: Zustand (lightweight, perfect for micro-apps)
Auth: JWT with HttpOnly cookies
Backend: Supabase or Firebase (fast setup)
Charts: Recharts
Icons: Lucide React
Fonts: Google Fonts (Space Mono, Inter Tight)
```

### File Structure
```
/src
  /components
    /universal
      - NavBar.jsx
      - AppSwitcher.jsx
      - Button.jsx
      - Input.jsx
      - Card.jsx
    /auth
      - Login.jsx
      - SignUp.jsx
  /apps
    /decision-fatigue
      - index.jsx
      - TaskCard.jsx
    /streak-commander
      - index.jsx
      - StreakDisplay.jsx
    /weekly-war-map
      - index.jsx
      - TaskBoard.jsx
    /energy-monitor
      - index.jsx
      - EnergyForm.jsx
    /silent-reminders
      - index.jsx
      - ReminderList.jsx
    /progress-radar
      - index.jsx
      - RadarChart.jsx
  /styles
    - variables.css (all design tokens)
    - global.css
  /utils
    - auth.js
    - api.js
  /store
    - authStore.js
    - appStore.js
```

### Universal Layout Component
```jsx
// Layout.jsx
export function Layout({ children, appAccent, appName }) {
  return (
    <div className="min-h-screen bg-primary" 
         style={{'--current-accent': appAccent}}>
      <NavBar appName={appName} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
```

---

## ✅ Design Checklist (Per App)

Before shipping each app:

- [ ] Uses correct accent color from system
- [ ] Navigation works with app switcher
- [ ] Auth token check on mount
- [ ] Mobile responsive (test at 375px width)
- [ ] All buttons have hover/active states
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Success feedback visible
- [ ] Typography scale respected
- [ ] Spacing consistent with system
- [ ] Dark theme optimized
- [ ] Animations smooth (60fps)

---

## 🚀 Quick Start Code Template

```jsx
// Example: Decision Fatigue App
import { Layout } from '@/components/universal/Layout'
import { Button } from '@/components/universal/Button'
import { Card } from '@/components/universal/Card'

export function DecisionFatigue() {
  const [task, setTask] = useState(null)
  
  return (
    <Layout 
      appAccent="var(--app-1-accent)"
      appName="Decision Fatigue"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-purple-900/20 to-transparent">
          {task ? (
            <>
              <h2 className="text-4xl font-bold mb-6">
                {task.name}
              </h2>
              <p className="text-secondary mb-8">
                {task.description}
              </p>
              <Button 
                variant="primary"
                size="large"
                fullWidth
                onClick={handleComplete}
              >
                Mark Complete
              </Button>
            </>
          ) : (
            <Button onClick={fetchTodayTask}>
              Tell me my mission for today
            </Button>
          )}
        </Card>
      </div>
    </Layout>
  )
}
```

---

## 🎨 Final Design Principles Summary

1. **Consistency Over Creativity** — Stick to the system ruthlessly
2. **Speed Over Features** — Each app does ONE thing perfectly
3. **Feedback Over Silence** — Every action gets immediate visual response
4. **Mobile Over Desktop** — Think thumb-first
5. **Dark Over Light** — Optimized for late-night grind sessions
6. **Data Over Decoration** — Show metrics, not fancy graphics

Ship fast. Ship clean. Ship with the system.

---

**Design System Version:** 1.0  
**Last Updated:** January 2026  
**Owner:** 6-in-14 Challenge
