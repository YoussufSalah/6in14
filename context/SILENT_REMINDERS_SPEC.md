# Silent Reminders — App Specification
**Nothing Slips**

---

## 🎯 App Purpose

**Core Question:** "Did I forget anything?"

**Core Promise:** Add it once. Get reminded exactly once. Nothing slips through.

**User Flow:**
1. User adds a reminder with a name and a date/time
2. App requests notification permission (once, ever)
3. A Service Worker schedules the notification
4. At the set time, the notification fires — even if the app is closed
5. Reminder moves to "fired" state. It does not repeat.

**The Philosophy:**
- One-time reminders only. No recurring noise.
- Set it and forget it. The app does the remembering.
- Fired reminders stay visible so you can see what already went off.

---

## ⚠️ CRITICAL: HOW BROWSER NOTIFICATIONS ACTUALLY WORK

Before building anything, you need to understand the constraints. This is not optional reading — the entire architecture of this app depends on it.

### The Problem with Tabs

A `setTimeout` or `setInterval` inside a React component only runs while the browser tab is open and active. If the user closes the tab, navigates away, or the browser kills the tab to save memory, your timer dies. The notification never fires.

This is why the app requires a **Service Worker**. A Service Worker is a background script that the browser keeps alive independently of any tab. It can receive scheduled wake-ups and fire notifications even when your app is completely closed.

### The Permission Problem

`Notification.requestPermission()` is a one-time ask. Once the user clicks "Allow" or "Deny," the browser remembers that decision for the entire origin (your domain). You cannot ask again. If they deny, the only way to change it is for the user to go into their browser settings manually. The app must handle all three states: `default` (never asked), `granted`, `denied`.

### What This Means for the App

1. The app must register a Service Worker on first load
2. Permission must be requested before any reminder is scheduled
3. All scheduling logic lives in the Service Worker, not in React
4. React's job is to collect the data and hand it off to the Service Worker
5. The Service Worker's job is to fire the notification at the right time

---

## 🎨 Visual Identity

**Accent Color:** Yellow (`#eab308`)
**Secondary Accent:** `#fde047` (lighter yellow)
**Background Tint:** `#2e2a1a`
**Vibe:** Quiet. Precise. Minimal. A silent sentinel that does its job and nothing more.

**Key Visual Element:** 🔔 Bell icon — subtle, not alarming

---

## 📋 Page Structure

```
┌─────────────────────────────────────┐
│     NAVBAR (Universal)              │
├─────────────────────────────────────┤
│                                     │
│     NOTIFICATION STATUS BANNER      │
│     - Permission state              │
│     - Service Worker state          │
│     (Only visible if there's an     │
│      issue. Hidden when all good.)  │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     ADD REMINDER FORM               │
│     - Reminder text input           │
│     - Date + Time picker            │
│     - [Add Reminder] Button         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     ACTIVE REMINDERS                │
│     - Sorted by soonest first       │
│     - Time remaining countdown      │
│     - Delete button                 │
│                                     │
├─────────────────────────────────────┤
│                                     │
│     FIRED REMINDERS                 │
│     - Greyed out, struck through    │
│     - When it fired                 │
│     - Clear all option              │
│                                     │
└─────────────────────────────────────┘
```

---

## 📝 SECTION 1: NOTIFICATION STATUS BANNER

This banner is contextual. It only appears when something needs the user's attention. When notifications are fully working, it is completely hidden.

### States

**State A: Permission Not Yet Asked (first visit)**

```
ICON: 🔔

TEXT:
Notifications are off. Enable them so nothing slips.

ACTION:
[Button] Allow Notifications
```

**State B: Permission Denied**

```
ICON: 🚫

TEXT:
Notifications are blocked. You need to allow them in your browser settings.

ACTION:
[Button] How to Enable →  (opens instructions)
```

**State C: Service Worker Failed to Register**

```
ICON: ⚠️

TEXT:
Background reminders aren't working. Reminders will only fire while this app is open.

ACTION:
[Button] Retry Setup
```

**State D: All Good (hidden)**

```
// Nothing rendered. Banner does not exist in DOM.
```

### Design Specifications

**Banner Container:**
- Position: relative (not fixed — flows with page)
- Margin: 0 auto 32px
- Max-width: 800px
- Padding: 20px 24px
- Border-radius: 12px
- Display: flex
- Align-items: flex-start
- Gap: 16px

**State A (Permission Default):**
- Background: rgba(234, 179, 8, 0.1)
- Border: 1px solid rgba(234, 179, 8, 0.3)

**State B (Permission Denied):**
- Background: rgba(239, 68, 68, 0.1)
- Border: 1px solid rgba(239, 68, 68, 0.3)

**State C (SW Failed):**
- Background: rgba(245, 158, 11, 0.1)
- Border: 1px solid rgba(245, 158, 11, 0.3)

**Icon:**
- Font-size: 24px
- Min-width: 24px
- Margin-top: 2px (optical alignment with first line of text)

**Text:**
- Font-size: text-sm
- Color: white
- Line-height: 1.6
- Flex: 1

**Action Button:**
- Margin-top: 12px
- Height: 36px
- Padding: 0 16px
- Border-radius: 6px
- Font-size: text-sm
- Font-weight: 600

**State A Button:**
- Background: var(--app-5-accent)
- Color: #000000 (black text on yellow — high contrast)

**State B Button:**
- Background: transparent
- Border: 1px solid var(--error)
- Color: var(--error)

**State C Button:**
- Background: var(--warning)
- Color: #000000

---

## ➕ SECTION 2: ADD REMINDER FORM

### Copy

**Section Title:**
```
New Reminder
```

**Form Fields:**

```
Field 1 — WHAT:
Label: What do you need to remember?
Placeholder: e.g., Email the lawyer, Update app store listing
Helper: Be specific. You'll see exactly this in the notification.

Field 2 — WHEN:
Label: Remind me on
[Date Picker] [Time Picker]
Helper: Pick a date and time. The notification fires once at exactly this moment.

VALIDATION MESSAGE (if time is in the past):
⚠️ That time has already passed. Pick a future date and time.
```

**Action Button:**
```
[If notifications granted]
+ Add Reminder

[If notifications not granted]
Enable Notifications First →
```

### Design Specifications

**Section Container:**
- Padding: 40px 32px
- Max-width: 800px
- Margin: 0 auto
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 16px

**Section Title:**
- Font-size: text-xl
- Font: font-display, font-bold
- Margin-bottom: 24px

**Form Fields:**
- Display: flex
- Flex-direction: column
- Gap: 20px

**Label:**
- Font-size: text-sm
- Font-weight: 600
- Color: white
- Margin-bottom: 8px
- Display: block

**Text Input (What):**
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
- Border-color: var(--app-5-accent)
- Box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.15)
- Outline: none

**Date + Time Row:**
- Display: flex
- Gap: 12px
- On mobile: flex-direction column (stack)

**Date Input:**
- Flex: 1
- Height: 48px
- Background: var(--bg-tertiary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 8px
- Padding: 0 16px
- Color: white
- Font-size: text-base
- Appearance: none (custom styled)
- Cursor: pointer

**Time Input:**
- Width: 160px (desktop) / 100% (mobile)
- Same styling as Date Input

**Date/Time Input Focus:**
- Border-color: var(--app-5-accent)
- Box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.15)
- Outline: none

**Helper Text:**
- Font-size: text-xs
- Color: text-tertiary
- Margin-top: 6px
- Line-height: 1.5

**Validation Message:**
- Font-size: text-sm
- Color: var(--error)
- Margin-top: 8px
- Display: flex
- Align-items: center
- Gap: 6px
- Font: font-mono

**Action Button (Notifications Granted):**
- Width: 100%
- Height: 52px
- Background: var(--app-5-accent)
- Border: none
- Border-radius: 10px
- Color: #000000
- Font-size: text-base
- Font-weight: 700
- Cursor: pointer
- Margin-top: 8px
- Transition: all 0.2s

**Action Button Hover:**
- Background: var(--app-5-accent-light)
- Transform: translateY(-2px)
- Box-shadow: 0 4px 16px rgba(234, 179, 8, 0.25)

**Action Button Disabled:**
- Opacity: 0.4
- Cursor: not-allowed
- Transform: none

**Action Button (Notifications Not Granted):**
- Background: transparent
- Border: 1px solid var(--app-5-accent)
- Color: var(--app-5-accent)
- Clicking this triggers the permission request

---

## 🔔 SECTION 3: ACTIVE REMINDERS

### Copy

**Section Title:**
```
Active ({count})
```

**Empty State:**
```
ICON: 🔔 (subtle, gray)

TEXT:
No active reminders. Add one above.
```

**Reminder Card:**

```
TEXT: {reminder.text}

TIME REMAINING:
{timeDisplay}   ← dynamic, see format rules below

ACTIONS:
[Icon] Delete
```

**Time Display Format Rules:**

```
If > 7 days away:
  "Feb 14 at 3:00 PM"

If 2-7 days away:
  "In 3 days, 3:00 PM"

If today but > 1 hour away:
  "Today at 3:00 PM"

If < 1 hour away:
  "In 42 minutes"

If < 1 minute away:
  "Firing now..."
```

### Design Specifications

**Section Container:**
- Padding: 40px 32px
- Max-width: 800px
- Margin: 32px auto 0

**Section Title:**
- Font-size: text-xl
- Font: font-display, font-bold
- Margin-bottom: 20px
- Display: flex
- Align-items: center
- Gap: 10px

**Count Badge:**
- Background: rgba(234, 179, 8, 0.15)
- Border: 1px solid rgba(234, 179, 8, 0.3)
- Color: var(--app-5-accent)
- Padding: 2px 10px
- Border-radius: 999px
- Font-size: text-xs
- Font: font-mono
- Font-weight: 600

**Empty State:**
- Padding: 48px 24px
- Text-align: center
- Color: text-tertiary
- Font-size: text-base
- Font-style: italic

**Empty State Icon:**
- Font-size: 40px
- Opacity: 0.3
- Margin-bottom: 12px

**Reminders List:**
- Display: flex
- Flex-direction: column
- Gap: 12px

**Reminder Card:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 18px 20px
- Display: flex
- Justify-content: space-between
- Align-items: flex-start
- Gap: 16px
- Transition: all 0.2s

**Reminder Card Hover:**
- Border-color: var(--app-5-accent)
- Background: rgba(234, 179, 8, 0.03)

**Reminder Card (Firing Soon — < 1 hour):**
- Border-color: var(--app-5-accent)
- Background: rgba(234, 179, 8, 0.08)
- Animation: Pulse border (opacity 0.3 → 1 → 0.3, 2s infinite)

**Reminder Text:**
- Font-size: text-base
- Font-weight: 600
- Color: white
- Line-height: 1.4
- Flex: 1

**Time Remaining:**
- Font-size: text-sm
- Font: font-mono
- Color: text-secondary
- White-space: nowrap
- Margin-top: 6px

**Time Remaining (< 1 hour):**
- Color: var(--app-5-accent)
- Font-weight: 600

**Time Remaining (< 10 minutes):**
- Color: var(--warning)
- Animation: Pulse text opacity (0.6 → 1 → 0.6, 1s infinite)

**Delete Button:**
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
- Min-width: 32px

**Delete Button Hover:**
- Border-color: var(--error)
- Color: var(--error)
- Background: rgba(239, 68, 68, 0.1)

---

## ✅ SECTION 4: FIRED REMINDERS

### Copy

**Section Title:**
```
Already Fired ({count})
```

**Empty State:**
```
No fired reminders yet.
```

**Fired Reminder Card:**

```
TEXT: {reminder.text} (struck through)

FIRED AT:
Fired {timeAgo}   ← e.g., "Fired 2 hours ago" or "Fired Jan 27 at 3:00 PM"

ACTIONS:
[Icon] Delete
```

**Clear All Button (only if count > 0):**
```
Clear All Fired
```

### Design Specifications

**Section Container:**
- Padding: 40px 32px 64px
- Max-width: 800px
- Margin: 32px auto 0

**Section Title:**
- Font-size: text-xl
- Font: font-display, font-bold
- Margin-bottom: 20px
- Display: flex
- Align-items: center
- Justify-content: space-between

**Count Badge:**
- Same as Active section count badge
- Color: text-tertiary
- Border-color: var(--border-subtle)
- Background: rgba(115, 115, 115, 0.1)

**Clear All Button:**
- Background: transparent
- Border: none
- Color: text-tertiary
- Font-size: text-sm
- Font: font-mono
- Cursor: pointer
- Transition: color 0.2s

**Clear All Hover:**
- Color: var(--error)

**Empty State:**
- Padding: 24px
- Color: text-tertiary
- Font-size: text-sm
- Font-style: italic

**Fired Reminder Card:**
- Background: var(--bg-secondary)
- Border: 1px solid var(--border-subtle)
- Border-radius: 12px
- Padding: 18px 20px
- Display: flex
- Justify-content: space-between
- Align-items: flex-start
- Gap: 16px
- Opacity: 0.5

**Fired Reminder Text:**
- Font-size: text-base
- Color: text-secondary
- Text-decoration: line-through
- Line-height: 1.4

**Fired At Text:**
- Font-size: text-xs
- Font: font-mono
- Color: text-tertiary
- Margin-top: 6px

**Delete Button:**
- Same as Active section delete button

---

## 🧮 NOTIFICATION & SERVICE WORKER LOGIC

### Service Worker Registration

The Service Worker must be registered on app load — before anything else. It is a separate JavaScript file that the browser downloads and installs independently.

```javascript
// In your main app component, on mount:
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', registration.scope)
      return true
    } catch (error) {
      console.error('Service Worker registration failed:', error)
      return false
    }
  }
  return false // Browser doesn't support Service Workers
}
```

### Permission Request

Request permission only when the user tries to add a reminder and hasn't granted it yet. Never ask preemptively on page load. That's annoying and gets denied.

```javascript
async function requestNotificationPermission() {
  if (Notification.permission === 'granted') {
    return 'granted'
  }

  if (Notification.permission === 'denied') {
    return 'denied' // Can't ask again. User must go to browser settings.
  }

  // Permission is 'default' — safe to ask
  const permission = await Notification.requestPermission()
  return permission // 'granted' or 'denied'
}
```

### Scheduling a Reminder

React does not schedule notifications. It hands the data to the Service Worker via `postMessage`. The Service Worker owns all timing logic.

```javascript
// In React — when user clicks "Add Reminder":
function scheduleReminder(reminder) {
  if (!navigator.serviceWorker.controller) {
    console.error('Service Worker not ready')
    return false
  }

  navigator.serviceWorker.controller.postMessage({
    type: 'SCHEDULE_REMINDER',
    payload: {
      id: reminder.id,
      text: reminder.text,
      fireAt: reminder.fireAt // ISO 8601 string: '2026-02-14T15:00:00'
    }
  })

  return true
}
```

### Canceling a Reminder

When the user deletes an active reminder, React tells the Service Worker to cancel it.

```javascript
// In React — when user clicks delete on an active reminder:
function cancelReminder(reminderId) {
  if (!navigator.serviceWorker.controller) return

  navigator.serviceWorker.controller.postMessage({
    type: 'CANCEL_REMINDER',
    payload: { id: reminderId }
  })
}
```

### The Service Worker (sw.js)

This is the entire Service Worker. It lives at the root of your project (`/sw.js` or `/public/sw.js`). It maintains an in-memory list of scheduled reminders and uses `setTimeout` internally. Crucially, Service Workers can keep running even when no tabs are open — the browser wakes them up when needed.

```javascript
// sw.js

// In-memory store of pending reminders
// { id: string, text: string, fireAt: string, timeoutId: number }
let scheduledReminders = []

// Listen for messages from the app
self.addEventListener('message', (event) => {
  switch (event.data.type) {

    case 'SCHEDULE_REMINDER': {
      const { id, text, fireAt } = event.data.payload
      scheduleNotification(id, text, fireAt)
      break
    }

    case 'CANCEL_REMINDER': {
      const { id } = event.data.payload
      cancelNotification(id)
      break
    }

    case 'GET_SCHEDULED': {
      // App is asking what's currently scheduled (for sync on load)
      event.ports[0].postMessage({
        type: 'SCHEDULED_LIST',
        payload: scheduledReminders.map(r => ({ id: r.id, fireAt: r.fireAt }))
      })
      break
    }
  }
})

function scheduleNotification(id, text, fireAt) {
  const now = new Date().getTime()
  const target = new Date(fireAt).getTime()
  const delay = target - now

  if (delay <= 0) {
    // Time already passed — fire immediately
    fireNotification(id, text)
    return
  }

  const timeoutId = setTimeout(() => {
    fireNotification(id, text)
  }, delay)

  scheduledReminders.push({ id, text, fireAt, timeoutId })
}

function cancelNotification(id) {
  const index = scheduledReminders.findIndex(r => r.id === id)
  if (index === -1) return

  clearTimeout(scheduledReminders[index].timeoutId)
  scheduledReminders.splice(index, 1)
}

function fireNotification(id, text) {
  // Show the notification
  self.registration.showNotification('Silent Reminders', {
    body: text,
    icon: '/icons/notification-icon.png', // 256x256 icon
    badge: '/icons/badge-icon.png',        // 96x96 monochrome badge (Android)
    tag: id,                               // Prevents duplicate notifications
    requireInteraction: false,             // Auto-dismiss after a few seconds
    silent: false                          // Play default notification sound
  })

  // Remove from scheduled list
  scheduledReminders = scheduledReminders.filter(r => r.id !== id)

  // Notify the app that this reminder fired (if app is open)
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'REMINDER_FIRED',
        payload: { id }
      })
    })
  })
}

// Handle notification click — bring the app to focus
self.addEventListener('notificationclick', (event) => {
  event.preventDefault()

  self.clients.matchAll().then(clients => {
    if (clients.length > 0) {
      // App is open — focus it
      clients[0].focus()
    } else {
      // App is closed — open it
      self.clients.openWindow('/')
    }
  })
})
```

### App Listening for "REMINDER_FIRED"

React needs to know when a reminder fires so it can move it from Active to Fired in the UI. It listens for messages from the Service Worker.

```javascript
// In your main app component, on mount:
useEffect(() => {
  function handleSWMessage(event) {
    if (event.data.type === 'REMINDER_FIRED') {
      const { id } = event.data.payload
      markReminderAsFired(id) // Updates state + localStorage
    }
  }

  navigator.serviceWorker.addEventListener('message', handleSWMessage)

  return () => {
    navigator.serviceWorker.removeEventListener('message', handleSWMessage)
  }
}, [])
```

### Sync on App Load

When the app opens, it needs to reconcile its localStorage data with what the Service Worker actually has scheduled. If the app crashed or was force-closed, some reminders might be in localStorage but not in the Service Worker's memory. Re-schedule them.

```javascript
async function syncReminderState(reminders) {
  // Get what the Service Worker currently has scheduled
  const swScheduled = await getServiceWorkerScheduledList()
  const swIds = new Set(swScheduled.map(r => r.id))

  const now = new Date()

  for (const reminder of reminders) {
    if (reminder.status === 'fired') continue // Already done

    const fireAt = new Date(reminder.fireAt)

    if (fireAt <= now) {
      // Time has passed and it wasn't marked as fired
      // Either it fired while app was closed (SW notified but we missed it)
      // or the app was dead and it never fired
      // Mark as fired now
      markReminderAsFired(reminder.id)
      continue
    }

    if (!swIds.has(reminder.id)) {
      // Active reminder not in SW — re-schedule it
      scheduleReminder(reminder)
    }
  }
}

// Helper: ask Service Worker what it has
function getServiceWorkerScheduledList() {
  return new Promise((resolve) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data.type === 'SCHEDULED_LIST') {
        resolve(event.data.payload)
      }
    }

    navigator.serviceWorker.controller.postMessage(
      { type: 'GET_SCHEDULED' },
      [channel.port2]
    )
  })
}
```

### Data Structure

```javascript
// Single reminder
{
  id: 'uuid-v4',
  text: 'Email the lawyer about the contract',
  fireAt: '2026-02-14T15:00:00',  // ISO 8601, local time
  status: 'active',                // 'active' | 'fired'
  createdAt: '2026-02-01T10:30:00',
  firedAt: null                    // Set when status becomes 'fired'
}

// Full app state (localStorage)
{
  reminders: [reminder1, reminder2, ...],
  notificationPermission: 'granted', // Cached — mirror of Notification.permission
  serviceWorkerRegistered: true
}
```

---

## 🎬 USER INTERACTIONS & ANIMATIONS

### Adding a Reminder

**Flow:**
1. User types reminder text
2. User picks date and time
3. User clicks "Add Reminder"
4. If permission not granted: Permission request fires first. On grant, proceed. On deny, show denied banner.
5. If permission granted: Reminder is saved to localStorage, message sent to Service Worker
6. Button briefly shows checkmark
7. Form clears
8. New reminder card slides into the Active list at the correct position (sorted by soonest first)
9. Success toast: "🔔 Reminder set" (2 seconds)

**Animation:**
- Button checkmark: Scale 0.8 → 1, 200ms
- Form clear: Fields fade to empty, 300ms
- New card entrance: translateY(-12px) → 0, opacity 0 → 1, 300ms ease-out
- Toast: Slide in from top, 300ms

### Deleting an Active Reminder

**Flow:**
1. User clicks delete icon
2. Icon briefly turns red
3. Confirmation: inline — card shrinks and shows "Delete this reminder?" with [Yes] [Cancel]
4. User clicks Yes
5. Card slides out to the right + fades
6. Cancel message sent to Service Worker
7. Remaining cards slide up to fill gap

**Animation:**
- Confirmation reveal: Height 0 → full, 250ms ease-out
- Card exit: translateX(60px) + opacity 0, 300ms ease-in
- Gap close: Cards above slide down, 250ms ease-in-out

### Reminder Fires (App Is Open)

**Flow:**
1. Service Worker fires the notification
2. Service Worker sends `REMINDER_FIRED` message to app
3. App receives message, finds the card in Active list
4. Card border flashes yellow briefly
5. Card slides down out of Active list
6. Card reappears at the top of the Fired list with a "just fired" highlight
7. Highlight fades after 3 seconds
8. Active count badge decrements, Fired count badge increments

**Animation:**
- Flash: Border yellow opacity 0 → 1 → 0, 500ms
- Exit Active: translateY(20px) + opacity 0, 350ms
- Enter Fired: Card appears at top, scale 0.96 → 1 + opacity 0 → 1, 300ms
- Highlight: Background yellow 0.15 opacity → 0, 3000ms ease-out
- Count badges: Number counts down/up, 300ms

### Reminder Fires (App Is Closed)

**Flow:**
1. Service Worker fires the notification
2. User taps notification on their phone / clicks it on desktop
3. App opens (or comes to focus)
4. On load, sync logic detects the reminder's time has passed
5. Reminder is moved to Fired with `firedAt` set to now
6. User sees it already in the Fired section — no animation needed, it's a load state

### Permission Request Flow

**Flow:**
1. User clicks "Add Reminder" (or "Allow Notifications" on the banner)
2. Browser shows its native permission popup (you cannot style this — it's the browser's UI)
3. If granted: Banner disappears. Form button changes to active "Add Reminder" state. If they were mid-add, the reminder is saved immediately.
4. If denied: Banner changes to the denied state. Form button changes to "Enable Notifications First →"

**Animation:**
- Banner disappear: Height → 0 + opacity → 0, 300ms
- Banner state change: Cross-fade between states, 250ms

---

## 🔄 TIME COUNTDOWN LOGIC

The Active reminders show a live countdown. This updates every second for reminders under 1 minute, every 30 seconds for reminders under 1 hour, and every minute otherwise. This keeps the UI responsive without hammering performance.

```javascript
function formatTimeRemaining(fireAt) {
  const now = new Date()
  const target = new Date(fireAt)
  const diffMs = target - now

  if (diffMs <= 0) return 'Firing now...'

  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  // More than 7 days: show full date
  if (diffDays > 7) {
    return target.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }) + ' at ' + target.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // 2-7 days
  if (diffDays >= 2) {
    return `In ${diffDays} days, ` + target.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // Tomorrow
  if (diffDays === 1) {
    return `Tomorrow at ` + target.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // Today, more than 1 hour
  if (diffHours >= 1) {
    return `Today at ` + target.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // Less than 1 hour
  if (diffMinutes >= 1) {
    return `In ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
  }

  // Less than 1 minute
  return `In ${diffSeconds} second${diffSeconds !== 1 ? 's' : ''}`
}

// Update interval logic
function getUpdateInterval(fireAt) {
  const diffMs = new Date(fireAt) - new Date()
  const diffMinutes = diffMs / 1000 / 60

  if (diffMinutes < 1) return 1000      // Every second
  if (diffMinutes < 60) return 30000    // Every 30 seconds
  return 60000                           // Every minute
}
```

---

## 📱 RESPONSIVE BEHAVIOR

### Mobile (< 640px)

**Add Form:**
- Date and Time inputs stack vertically (full width each)
- Button full width

**Active Reminders:**
- Cards full width
- Delete button: Swipe-to-reveal on mobile (swipe card left to expose delete button)
- Alternatively: Long-press to show delete

**Fired Reminders:**
- Same card layout, full width
- Clear All button full width

### Tablet (641-1024px)

- Maintain single column layout
- Increase max-width to 860px

### Desktop (1025px+)

- Max-width: 800px
- Centered
- Hover effects on cards and buttons

---

## 💾 DATA PERSISTENCE

### Storage Strategy

**localStorage for reminder data:**

```javascript
const STORAGE_KEY = 'silent_reminders_data'

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : {
    reminders: [],
    notificationPermission: Notification.permission,
    serviceWorkerRegistered: false
  }
}
```

**Service Worker persistence:**

The Service Worker's `scheduledReminders` array is in-memory only. It dies if the browser fully kills the worker (rare, but possible on mobile after extended inactivity). The sync-on-load function handles this — when the app opens, it re-schedules any active reminders that are missing from the Service Worker.

---

## ⚡ PERFORMANCE OPTIMIZATIONS

1. **Adaptive countdown intervals** — Don't update every second for reminders hours away
2. **Lazy Service Worker registration** — Register on first load, not on every render
3. **Batch localStorage writes** — Debounce saves by 500ms
4. **Don't render Fired section if empty** — No empty state DOM at all
5. **Virtualize long lists** — If user has 50+ fired reminders (unlikely but safe)

---

## 🎯 EDGE CASES & HANDLING

### What if the browser doesn't support Service Workers?

- Show a persistent warning banner (State C from Section 1)
- Fall back to `setTimeout` in React — reminders will only fire while the tab is open
- Be honest about this in the UI: "Reminders will only fire while this app is open"

### What if the user denies notification permission?

- Show the denied banner permanently
- Reminders can still be added and stored (they won't notify)
- Button text changes to "Enable Notifications First →"
- Include clear instructions on how to re-enable in browser settings

### What if the user sets a reminder for the past?

- Validate on form submission
- Show inline error: "That time has already passed. Pick a future date and time."
- Do not allow submission

### What if two reminders are set for the exact same time?

- Both fire. Both notifications appear (browsers handle this fine — the `tag` field is unique per reminder via the ID)
- Both move to Fired simultaneously

### What if the app is force-closed and the Service Worker dies?

- Sync on load detects the gap
- Any active reminder whose time has passed gets marked as fired
- Any active reminder whose time hasn't passed gets re-scheduled with the Service Worker

### What if the user clears browser data?

- localStorage is wiped. Service Worker may or may not survive (depends on browser)
- App starts fresh. Old reminders are gone. Nothing to recover.
- This is acceptable — reminders are ephemeral by design

### What if the reminder text is very long?

- No hard character limit, but the notification body has a practical limit (~100 characters on most platforms before truncation)
- Show a soft warning in the helper text: "Notifications may truncate long text"
- Card UI handles long text with line wrapping

### What if the user has hundreds of fired reminders?

- "Clear All Fired" button handles this
- Fired reminders auto-clear after 30 days on app load (background cleanup)

```javascript
function clearOldFiredReminders(reminders) {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  return reminders.filter(r => {
    if (r.status !== 'fired') return true // Keep all active
    return new Date(r.firedAt) > thirtyDaysAgo // Keep fired within 30 days
  })
}
```

---

## ✅ IMPLEMENTATION CHECKLIST

**Functionality:**
- [ ] Service Worker registers successfully
- [ ] Notification permission is requested at the right moment (not on load)
- [ ] Permission denied state is handled correctly
- [ ] Can add reminder with text + date + time
- [ ] Past date/time validation works
- [ ] Reminder is saved to localStorage
- [ ] Reminder is scheduled in Service Worker
- [ ] Notification fires at the correct time
- [ ] Notification fires when app is closed
- [ ] Clicking notification brings app to focus / opens it
- [ ] App receives REMINDER_FIRED message and updates UI
- [ ] Sync on load re-schedules missing reminders
- [ ] Sync on load marks past-due reminders as fired
- [ ] Can delete active reminder (cancels Service Worker timeout)
- [ ] Can delete fired reminder
- [ ] Can clear all fired reminders
- [ ] Fired reminders older than 30 days auto-clear
- [ ] Active reminders sorted by soonest first
- [ ] Countdown updates at correct intervals
- [ ] Data persists on reload

**Design:**
- [ ] Yellow accent color consistent
- [ ] Banner only shows when there's an issue
- [ ] Reminder cards have correct hover states
- [ ] Firing-soon cards pulse
- [ ] Countdown color changes (white → yellow → orange)
- [ ] Fired cards are visually distinct (struck through, dimmed)
- [ ] All animations smooth (60fps)
- [ ] Mobile responsive (375px, 414px)
- [ ] Tablet responsive (768px)
- [ ] Desktop responsive (1280px+)

**Polish:**
- [ ] Notification icon exists (256x256)
- [ ] Badge icon exists (96x96 monochrome)
- [ ] Toast messages appear correctly
- [ ] Form clears after successful add
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] No console errors

---

## 🚀 QUICK START CODE SCAFFOLD

```jsx
// SilentReminders.jsx
import { useState, useEffect, useCallback } from 'react'
import { Layout } from '@/components/universal/Layout'
import { NotificationBanner } from './components/NotificationBanner'
import { AddReminderForm } from './components/AddReminderForm'
import { ActiveReminders } from './components/ActiveReminders'
import { FiredReminders } from './components/FiredReminders'
import { registerServiceWorker, scheduleReminder, cancelReminder, syncReminderState } from './utils/notifications'
import { loadData, saveData } from './utils/storage'

export function SilentReminders() {
  const [reminders, setReminders] = useState([])
  const [permission, setPermission] = useState(Notification.permission)
  const [swReady, setSWReady] = useState(false)

  // Initialize Service Worker + sync state
  useEffect(() => {
    async function init() {
      const registered = await registerServiceWorker()
      setSWReady(registered)

      const data = loadData()
      const cleaned = clearOldFiredReminders(data.reminders)
      setReminders(cleaned)

      if (registered) {
        await syncReminderState(cleaned)
      }
    }
    init()
  }, [])

  // Listen for REMINDER_FIRED from Service Worker
  useEffect(() => {
    function handleMessage(event) {
      if (event.data.type === 'REMINDER_FIRED') {
        markAsFired(event.data.payload.id)
      }
    }
    navigator.serviceWorker.addEventListener('message', handleMessage)
    return () => navigator.serviceWorker.removeEventListener('message', handleMessage)
  }, [])

  // Save to localStorage whenever reminders change
  useEffect(() => {
    saveData({ reminders, notificationPermission: permission, serviceWorkerRegistered: swReady })
  }, [reminders, permission, swReady])

  const markAsFired = useCallback((id) => {
    setReminders(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'fired', firedAt: new Date().toISOString() } : r
    ))
  }, [])

  const handleAddReminder = async (text, fireAt) => {
    // Request permission if needed
    if (permission !== 'granted') {
      const result = await Notification.requestPermission()
      setPermission(result)
      if (result !== 'granted') return
    }

    const reminder = {
      id: crypto.randomUUID(),
      text,
      fireAt,
      status: 'active',
      createdAt: new Date().toISOString(),
      firedAt: null
    }

    scheduleReminder(reminder)
    setReminders(prev => [...prev, reminder])
  }

  const handleDeleteReminder = (id) => {
    const reminder = reminders.find(r => r.id === id)
    if (reminder?.status === 'active') {
      cancelReminder(id)
    }
    setReminders(prev => prev.filter(r => r.id !== id))
  }

  const handleClearAllFired = () => {
    setReminders(prev => prev.filter(r => r.status !== 'fired'))
  }

  const activeReminders = reminders
    .filter(r => r.status === 'active')
    .sort((a, b) => new Date(a.fireAt) - new Date(b.fireAt))

  const firedReminders = reminders
    .filter(r => r.status === 'fired')
    .sort((a, b) => new Date(b.firedAt) - new Date(a.firedAt))

  return (
    <Layout appAccent="var(--app-5-accent)" appName="Silent Reminders">
      <NotificationBanner
        permission={permission}
        swReady={swReady}
        onRequestPermission={() => Notification.requestPermission().then(setPermission)}
        onRetrySW={() => registerServiceWorker().then(setSWReady)}
      />

      <AddReminderForm
        permission={permission}
        onAdd={handleAddReminder}
        onRequestPermission={() => Notification.requestPermission().then(setPermission)}
      />

      <ActiveReminders
        reminders={activeReminders}
        onDelete={handleDeleteReminder}
      />

      <FiredReminders
        reminders={firedReminders}
        onDelete={handleDeleteReminder}
        onClearAll={handleClearAllFired}
      />
    </Layout>
  )
}
```

---

## 📊 SUCCESS METRICS

**User Engagement:**
- Permission grant rate: > 70%
- Average reminders per user: 3-8
- Notification fire accuracy: 100% (within 1 minute of set time)
- Reminder completion (notification received): > 90%

**Performance:**
- Page load: < 1 second
- Reminder add: < 200ms
- Service Worker registration: < 500ms
- Countdown update: No visible lag

**Quality:**
- Zero missed notifications (when permission granted + SW active)
- Zero duplicate notifications
- Correct sync after app restart
- Works on iOS Safari, Chrome, Firefox, Edge

---

## 🎯 COPY PRINCIPLES USED

1. **Silent confidence** — "Nothing slips" not "Never forget again"
2. **Honest constraints** — Tells user exactly what's happening with permissions
3. **Minimal interaction** — Add it, forget it. The app does the rest.
4. **No spam language** — "One-time" is repeated because it matters. No recurring noise.
5. **Direct labels** — "Fired" not "Completed." It fired. That's what happened.

This app doesn't nag. It doesn't remind you to set reminders. It waits quietly, fires once, and moves on.

---

**App Spec Version:** 1.0  
**Ready to build:** YES  
**Estimated build time:** 8-10 hours  
**Priority:** 5/6
