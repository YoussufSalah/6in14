# 6-in-14 Landing Page
**Complete Copy + Design Specification**

---

## 🎯 Page Strategy

**Goal:** Get visitors to sign up immediately. No fluff, no corporate speak. Just raw value.

**Target Audience:** Builders, grinders, people who ship. Not dreamers.

**Tone:** Direct. Confident. Almost aggressive. Gen-Z authenticity.

---

## 📋 Page Structure

```
1. Hero Section (Above fold)
2. Problem Agitation Section
3. The 6 Apps Grid
4. How It Works (3 steps)
5. Social Proof / Stats
6. Final CTA
7. Footer
```

---

## 🎨 SECTION 1: HERO

### Copy

**Pre-headline** (small, uppercase, accent color)
```
BUILT IN 14 DAYS. SHIPS TODAY.
```

**Main Headline** (Huge, bold, 2-3 lines max)
```
Stop planning.
Start executing.
6 micro-apps. Zero excuses.
```

**Subheadline** (Medium size, secondary text color)
```
Decision paralysis kills more dreams than failure ever will.
Get your command center for focus, execution, and relentless progress.
```

**CTA Buttons**
```
[Primary Button] Start Free →
[Secondary Button - Ghost] See The Apps
```

**Trust Badge** (Small text below buttons)
```
No credit card. No bullshit. Just build.
```

### Design Specifications

**Layout:**
- Full viewport height (100vh)
- Content centered vertically and horizontally
- Max-width: 800px for text content
- Background: Subtle animated gradient mesh
  - Base: var(--bg-primary)
  - Accents: Mix of all 6 app colors at 5% opacity
  - Slow, organic movement (60s animation loop)

**Typography Hierarchy:**
- Pre-headline: text-sm, font-mono, uppercase, letter-spacing: 0.15em, accent color
- Headline: text-5xl (mobile) / text-6xl (desktop), font-display, font-black, line-height: 1.1
- Subheadline: text-lg / text-xl, font-body, text-secondary, line-height: 1.6
- Max width for headline: 700px

**Visual Elements:**
- Floating app icons in background (subtle, 10% opacity, slow float animation)
- Cursor follows with subtle gradient trail (desktop only)
- Grain texture overlay (2% opacity) for depth

**Button Styling:**
- Primary: 56px height, text-lg, full accent gradient, white text
- Secondary: Same size, outline, ghost effect on hover
- Both buttons: 200px min-width, rounded-lg
- Gap between buttons: 16px

---

## 🎨 SECTION 2: PROBLEM AGITATION

### Copy

**Section Headline** (Centered, bold)
```
You're grinding. But are you winning?
```

**Problem Grid** (3 columns on desktop, 1 on mobile)

**Problem 1:**
```
❌ Every morning: "What should I work on?"
You waste 30 minutes deciding. That's 182 hours per year on analysis paralysis.
```

**Problem 2:**
```
❌ Streaks break. Momentum dies.
No visible accountability = weak discipline. You know this.
```

**Problem 3:**
```
❌ Weekly plans stay in your head.
Mental plans decay by Tuesday. By Friday, you forgot what mattered.
```

**Problem 4:**
```
❌ Burnout sneaks up.
You grind without measuring recovery. Then crash. Then restart. Endless cycle.
```

**Problem 5:**
```
❌ Small tasks slip through.
Legal pages. Emails. Updates. Not urgent = never done = costly mistakes.
```

**Problem 6:**
```
❌ Grinding without proof.
You work hard. But do you see the growth? Motivation leaks without data.
```

**Transition Line** (Centered, accent color, medium size)
```
→ These aren't minor issues. They're execution killers.
```

### Design Specifications

**Layout:**
- Padding: 120px vertical, 80px horizontal
- Background: var(--bg-secondary)
- Max-width: 1200px container

**Section Headline:**
- text-4xl, font-display, centered
- Margin-bottom: 64px
- Gradient text effect (white to accent)

**Problem Cards:**
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 24px
- Each card:
  - Background: var(--bg-tertiary)
  - Border: 1px solid var(--border-subtle)
  - Padding: 32px
  - Border-radius: 12px
  - Height: Equal across row (use flexbox)
  - Hover: Lift 4px, border glows with subtle red

**Card Typography:**
- Emoji/Icon: text-2xl, margin-bottom: 12px
- Title: text-lg, font-semibold, margin-bottom: 8px
- Description: text-base, text-secondary, line-height: 1.6

**Transition Line:**
- Margin-top: 64px
- text-xl, font-mono, accent color
- Centered with arrow animation (→ moves right 4px on loop)

---

## 🎨 SECTION 3: THE 6 APPS GRID

### Copy

**Section Headline**
```
Your new operating system.
```

**Section Subheadline**
```
6 micro-apps. One login. Total clarity.
```

**App Cards** (Each app gets a card)

**App 1: Decision Fatigue**
```
ICON: 🎯
NAME: Decision Fatigue
TAGLINE: "Tell me my mission for today."
DESCRIPTION: One command. One priority. Zero wasted energy deciding what matters.
```

**App 2: Streak Commander**
```
ICON: 🔥
NAME: Streak Commander
TAGLINE: "Don't let the chain break."
DESCRIPTION: Visual accountability. Current streaks for work, training, posting. Red warning when broken.
```

**App 3: Weekly War Map**
```
ICON: ⚔️
NAME: Weekly War Map
TAGLINE: "Commit. Execute. Repeat."
DESCRIPTION: 3 priorities. 5 tasks each. Locked for 7 days. Mental plans decay. This doesn't.
```

**App 4: Energy Monitor**
```
ICON: ⚡
NAME: Energy Monitor
TAGLINE: "Protect the machine."
DESCRIPTION: Track sleep, mood, fatigue. See trends. Avoid burnout before it hits.
```

**App 5: Silent Reminders**
```
ICON: 🔔
NAME: Silent Reminders
TAGLINE: "Nothing slips."
DESCRIPTION: One-time reminders. Daily summary. No notification spam. Critical tasks never forgotten.
```

**App 6: Progress Radar**
```
ICON: 📊
NAME: Progress Radar
TAGLINE: "Proof you're leveling up."
DESCRIPTION: Weekly inputs: users, revenue, posts, training. Auto-graph. Visual proof you're growing.
```

### Design Specifications

**Layout:**
- Padding: 120px vertical
- Background: var(--bg-primary)
- Max-width: 1400px container

**Section Header:**
- Headline: text-5xl, font-display, centered
- Subheadline: text-xl, text-secondary, centered, margin-top: 16px
- Margin-bottom: 80px

**App Grid:**
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 32px
- Equal height cards

**App Card Design:**
- Background: Gradient from app-specific bg-color to transparent
- Border: 2px solid transparent
- Border-radius: 16px
- Padding: 40px
- Transition: all 0.3s ease

**Card Hover State:**
- Border: 2px solid app-accent-color
- Transform: translateY(-8px)
- Box-shadow: 0 16px 48px rgba(app-accent-color, 0.2)
- Icon scales to 1.1

**Card Content:**
- Icon: text-4xl, margin-bottom: 16px
- Name: text-2xl, font-display, font-bold, app-accent-color
- Tagline: text-sm, font-mono, text-secondary, italic, margin: 8px 0
- Description: text-base, text-secondary, line-height: 1.6, margin-top: 12px

**Visual Enhancement:**
- Each card has subtle glow from app color (8px blur, 5% opacity)
- On hover, glow intensifies to 15% opacity
- Stagger animation on page load (each card fades in with 100ms delay)

---

## 🎨 SECTION 4: HOW IT WORKS

### Copy

**Section Headline**
```
3 steps. That's it.
```

**Step 1**
```
STEP: 01
TITLE: Sign up. Once.
DESCRIPTION: Email + password. 30 seconds. Access all 6 apps instantly.
```

**Step 2**
```
STEP: 02
TITLE: Pick your weapon.
DESCRIPTION: Start with Decision Fatigue. Or jump straight to Weekly War Map. Your call.
```

**Step 3**
```
STEP: 03
TITLE: Execute daily.
DESCRIPTION: No setup. No learning curve. Just open and use. Every day.
```

**Bottom Line** (Centered, accent color)
```
→ Built for speed. Designed for grinders.
```

### Design Specifications

**Layout:**
- Padding: 120px vertical
- Background: var(--bg-secondary)
- Max-width: 1000px container
- Centered content

**Section Headline:**
- text-4xl, font-display, centered
- Margin-bottom: 80px

**Steps Layout:**
- Horizontal flow on desktop (3 columns)
- Vertical stack on mobile
- Connected with animated line (gradient, subtle pulse)

**Step Card:**
- No background (transparent)
- Text alignment: center
- Width: 280px each

**Step Number:**
- Font: font-mono
- Size: text-xs
- Color: accent (cycles through all 6 app colors)
- Letter-spacing: 0.2em
- Margin-bottom: 16px

**Step Title:**
- text-2xl, font-display, font-bold
- Margin-bottom: 12px

**Step Description:**
- text-base, text-secondary
- Line-height: 1.6
- Max-width: 240px (centered)

**Connecting Line:**
- Desktop: Horizontal line between cards
- Mobile: Vertical line down left side
- Style: 2px dashed, var(--border-strong)
- Gradient effect with app colors

**Bottom Line:**
- Margin-top: 64px
- text-lg, font-mono
- Accent gradient text

---

## 🎨 SECTION 5: SOCIAL PROOF / STATS

### Copy

**Stats Grid** (4 metrics, clean and bold)

```
Stat 1:
NUMBER: 6
LABEL: Micro-apps
SUBLABEL: One platform

Stat 2:
NUMBER: 14
LABEL: Days to build
SUBLABEL: Zero shortcuts

Stat 3:
NUMBER: 1
LABEL: Login
SUBLABEL: Access everything

Stat 4:
NUMBER: 0
LABEL: Bullshit
SUBLABEL: Just execution
```

**Quote Section** (If you have testimonials later, leave space. For now, personal statement)

```
"I built this because I was tired of productivity apps that feel like work.
These 6 apps do one thing each. Perfectly. No bloat. No friction.
Just tools that make you move faster."

— [Your Name], Builder
```

### Design Specifications

**Layout:**
- Padding: 100px vertical
- Background: var(--bg-primary)
- Max-width: 1200px container

**Stats Grid:**
- 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Gap: 48px
- Center aligned

**Stat Card:**
- Text alignment: center
- No background, no border (floating text)

**Number:**
- text-6xl (desktop) / text-5xl (mobile)
- font-display, font-black
- Gradient text (white to accent)
- Counter animation on scroll into view (counts up)

**Label:**
- text-xl, font-semibold
- Margin-top: 8px
- White color

**Sublabel:**
- text-sm, text-tertiary
- Margin-top: 4px

**Quote Section:**
- Margin-top: 80px
- Max-width: 700px
- Centered
- Border-left: 4px solid accent
- Padding-left: 32px

**Quote Text:**
- text-xl, italic, line-height: 1.7
- Text-secondary
- Font-body

**Attribution:**
- text-base, font-mono
- Margin-top: 24px
- Accent color

---

## 🎨 SECTION 6: FINAL CTA

### Copy

**Headline**
```
Stop planning. Start shipping.
```

**Subheadline**
```
6 apps. 1 platform. 0 excuses left.
```

**CTA Button Text**
```
Get Started Free →
```

**Small Print Below**
```
No credit card required. Cancel anytime. Built by a builder, for builders.
```

### Design Specifications

**Layout:**
- Padding: 160px vertical
- Background: Radial gradient from center
  - Center: var(--bg-secondary)
  - Edges: var(--bg-primary)
- Max-width: 700px container
- Centered content

**Headline:**
- text-5xl (desktop) / text-4xl (mobile)
- font-display, font-black
- Centered
- Margin-bottom: 16px

**Subheadline:**
- text-xl
- text-secondary
- Centered
- Margin-bottom: 48px

**CTA Button:**
- Height: 64px
- Padding: 0 64px
- text-xl, font-semibold
- Full gradient (all 6 app colors mixed)
- White text
- Rounded-xl
- Hover: Scale 1.05, glow effect
- Pulse animation (subtle, infinite)

**Small Print:**
- text-sm, text-tertiary
- Margin-top: 24px
- Centered

**Background Effect:**
- Floating geometric shapes (slow rotation)
- Gradient orbs (blurred, 30% opacity)
- Subtle particle effect (optional, don't overdo)

---

## 🎨 SECTION 7: FOOTER

### Copy

**Left Column**
```
LOGO/NAME: 6-in-14

TAGLINE: Built in 14 days. Ships forever.

COPYRIGHT: © 2026 6-in-14. All rights reserved.
```

**Center Column - Quick Links**
```
TITLE: Platform

LINKS:
- All Apps
- How It Works
- Pricing (if applicable)
```

**Right Column - Account**
```
TITLE: Account

LINKS:
- Sign Up
- Log In
- Support
```

**Social Links** (Icons only, no text)
```
Twitter/X
GitHub
LinkedIn (if relevant)
```

### Design Specifications

**Layout:**
- Padding: 64px vertical
- Background: var(--bg-secondary)
- Border-top: 1px solid var(--border-subtle)
- Max-width: 1200px container

**Grid:**
- 3 columns (desktop)
- 1 column (mobile, stacked)
- Gap: 64px

**Left Column:**
- Logo: text-2xl, font-display, font-bold
- Tagline: text-sm, text-tertiary, margin-top: 8px
- Copyright: text-xs, text-tertiary, margin-top: 32px

**Center & Right Columns:**
- Title: text-xs, uppercase, letter-spacing: 0.1em, text-tertiary, margin-bottom: 16px
- Links: text-sm, text-secondary, line-height: 2
- Link hover: text-primary, underline

**Social Links:**
- Horizontal row
- Icon size: 20px
- Gap: 16px
- Color: text-secondary
- Hover: accent color, transform scale(1.1)
- Margin-top: 32px (in left column)

---

## 🎨 GLOBAL DESIGN ELEMENTS

### Page-Wide Effects

**Cursor Trail** (Desktop only)
- Gradient circle follows cursor
- 20px diameter, blurred
- Mix of current section's accent color
- Opacity: 0.1
- Disabled on mobile

**Scroll Progress Indicator**
- Fixed top, 3px height
- Gradient fills left to right as user scrolls
- Uses all 6 app colors in gradient
- Z-index: 9999

**Micro-interactions**
- All buttons have ripple effect on click
- Links have underline slide animation
- Cards have subtle tilt on hover (3deg max)
- Smooth scroll behavior enabled

**Loading State**
- If page has any async content
- Skeleton screens with shimmer
- Brand accent color for shimmer gradient

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile Optimizations (< 640px)

**Hero Section:**
- Reduce headline to text-4xl
- Stack buttons vertically (full width)
- Reduce viewport height to 90vh (account for mobile browsers)

**Problem Grid:**
- Single column
- Reduce padding to 60px vertical

**App Grid:**
- Single column
- Increase card padding to 32px
- Keep hover effects (they work on tap)

**How It Works:**
- Vertical layout with connecting line on left
- Reduce step spacing

**Stats:**
- 2x2 grid instead of 4 columns
- Reduce number size to text-5xl

**Footer:**
- Single column, stacked
- Center align all content

### Tablet (641px - 1024px)

**App Grid:**
- 2 columns
- Maintain spacing

**Problem Grid:**
- 2 columns

**Stats:**
- 4 columns maintained OR 2x2 (test both)

---

## 🎨 COLOR USAGE STRATEGY

**Per Section:**
- Hero: Purple accent (App 1 - Decision Fatigue)
- Problem: Red tints (errors, warnings)
- Apps Grid: Each card uses its own app accent
- How It Works: Cycle through all 6 accents for step numbers
- Stats: Gradient mixing all 6 colors
- CTA: Full gradient with all 6 colors
- Footer: Neutral (no accent)

**Why this works:**
- Introduces each app color naturally
- Creates visual rhythm down the page
- Hero uses purple (first app) = natural entry point
- CTA uses all = represents complete platform

---

## ✅ IMPLEMENTATION CHECKLIST

Before shipping the landing page:

- [ ] All copy proofread (no typos, consistent voice)
- [ ] Buttons have clear hover/active states
- [ ] Mobile tested at 375px, 414px, 390px widths
- [ ] Tablet tested at 768px, 834px
- [ ] Desktop tested at 1280px, 1440px, 1920px
- [ ] Animations are smooth (60fps, no jank)
- [ ] Images optimized (if any added later)
- [ ] Fonts loaded properly (fallbacks defined)
- [ ] Scroll behavior is smooth
- [ ] CTA buttons go to correct /signup route
- [ ] All links work
- [ ] Page loads in < 2 seconds
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] Meta tags set (title, description, OG image)
- [ ] Favicon added

---

## 🚀 QUICK START CODE SCAFFOLD

```jsx
// LandingPage.jsx
import { Hero } from './sections/Hero'
import { Problems } from './sections/Problems'
import { AppsGrid } from './sections/AppsGrid'
import { HowItWorks } from './sections/HowItWorks'
import { Stats } from './sections/Stats'
import { FinalCTA } from './sections/FinalCTA'
import { Footer } from './sections/Footer'

export function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />
      <Problems />
      <AppsGrid />
      <HowItWorks />
      <Stats />
      <FinalCTA />
      <Footer />
    </div>
  )
}
```

**CSS Structure:**
```css
/* landing.css */

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

/* Animated background */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 50%, 
    rgba(168, 85, 247, 0.05) 0%, 
    transparent 50%
  );
  animation: pulse 10s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* [Continue for each section...] */
```

---

## 📊 EXPECTED METRICS

**Performance Goals:**
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Total Page Size: < 500KB

**Conversion Goals:**
- Hero CTA click rate: > 15%
- Scroll to Apps Grid: > 60%
- Final CTA click rate: > 8%
- Overall signup rate: > 3%

---

## 🎯 COPY PRINCIPLES USED

1. **Direct, not polite** — "Stop planning" not "Consider starting"
2. **Problem-first** — Agitate before solving
3. **Numerical specificity** — "6 apps" "14 days" "182 hours wasted"
4. **Active voice** — "You waste time" not "Time is wasted"
5. **No corporate speak** — "Zero bullshit" not "Streamlined experience"
6. **Imperative commands** — "Start shipping" not "You can start shipping"
7. **Social proof through action** — "Built in 14 days" not "Trusted by thousands"

This copy doesn't ask. It tells. Just like the product.

---

**Landing Page Spec Version:** 1.0  
**Ready to build:** YES  
**Estimated build time:** 6-8 hours for full implementation
