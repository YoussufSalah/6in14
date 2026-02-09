// public/sw.js

// In-memory store of pending reminders for the current session
// { id: string, text: string, fireAt: string, timeoutId: number }
let scheduledReminders = [];

// Listen for messages from the app
self.addEventListener("message", (event) => {
    if (!event.data) return;

    switch (event.data.type) {
        case "SCHEDULE_REMINDER": {
            const { id, text, fireAt } = event.data.payload;
            scheduleNotification(id, text, fireAt);
            break;
        }

        case "CANCEL_REMINDER": {
            const { id } = event.data.payload;
            cancelNotification(id);
            break;
        }

        case "GET_SCHEDULED": {
            if (event.ports && event.ports[0]) {
                event.ports[0].postMessage({
                    type: "SCHEDULED_LIST",
                    payload: scheduledReminders.map((r) => ({
                        id: r.id,
                        fireAt: r.fireAt,
                    })),
                });
            }
            break;
        }
    }
});

function scheduleNotification(id, text, fireAt) {
    const now = Date.now();
    const target = new Date(fireAt).getTime();
    const delay = target - now;

    // Clear existing if any (re-scheduling)
    cancelNotification(id);

    if (delay <= 0) {
        fireNotification(id, text);
        return;
    }

    const timeoutId = setTimeout(() => {
        fireNotification(id, text);
    }, delay);

    scheduledReminders.push({ id, text, fireAt, timeoutId });
}

function cancelNotification(id) {
    const index = scheduledReminders.findIndex((r) => r.id === id);
    if (index === -1) return;

    clearTimeout(scheduledReminders[index].timeoutId);
    scheduledReminders.splice(index, 1);
}

function fireNotification(id, text) {
    self.registration.showNotification("Silent Reminders", {
        body: text,
        tag: id,
        requireInteraction: true, // Keep it visible until the user interacts or it times out
        silent: false,
        vibrate: [200, 100, 200],
    });

    scheduledReminders = scheduledReminders.filter((r) => r.id !== id);

    // Notify all open tabs
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            client.postMessage({
                type: "REMINDER_FIRED",
                payload: { id },
            });
        });
    });
}

// Handle notification click
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    event.waitUntil(
        self.clients.matchAll({ type: "window" }).then((clients) => {
            for (const client of clients) {
                if (
                    client.url.includes("/silent-reminders") &&
                    "focus" in client
                ) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow("/silent-reminders");
            }
        }),
    );
});

// Self-install and activate
self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});
