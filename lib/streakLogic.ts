import { format, subDays } from "date-fns";

export type MetricStatus = "done" | "missed" | "rest" | "pending" | "none";

export interface HistoryEntry {
    date: string; // YYYY-MM-DD
    status: MetricStatus;
}

export interface Metric {
    id: string;
    name: string;
    createdAt: string;
    history: HistoryEntry[];
    currentStreak: number;
    bestStreak: number;
}

/**
 * Calculates a single metric's current substreak.
 * Today's 'pending' entries are ignored (streak holds).
 * Past 'pending' entries are treated as missed (streak breaks).
 */
export function calculateSubstreak(metric: Metric): number {
    if (!metric || !metric.history || metric.history.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = format(today, "yyyy-MM-dd");

    let currentDate = new Date(today);

    while (true) {
        const dateStr = format(currentDate, "yyyy-MM-dd");
        const isToday = dateStr === todayStr;
        const entry = metric.history.find((h) => h.date === dateStr);

        if (!entry) {
            if (isToday) {
                // No entry today at all — skip, don't break
                currentDate.setDate(currentDate.getDate() - 1);
                continue;
            }
            // Past day, no entry = missed = break
            return streak;
        }

        if (entry.status === "pending") {
            if (isToday) {
                // Pending today — skip entirely, don't break
                currentDate.setDate(currentDate.getDate() - 1);
                continue;
            }
            // Pending on a past day = missed = break
            return streak;
        }

        if (entry.status === "done") {
            streak++;
        } else if (entry.status === "rest") {
            // Rest: skip, no break, no increment
        } else if (entry.status === "missed") {
            return streak;
        }

        currentDate.setDate(currentDate.getDate() - 1);

        const daysDiff = Math.floor(
            (today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (daysDiff > 365) break;
    }

    return streak;
}

/**
 * Calculates a single metric's best historical streak.
 * Skips today's pending entries.
 */
export function calculateBestStreak(metric: Metric): number {
    if (!metric || !metric.history || metric.history.length === 0) return 0;

    const todayStr = format(new Date(), "yyyy-MM-dd");

    let bestStreak = 0;
    let runningStreak = 0;

    const sortedHistory = [...metric.history].sort((a, b) =>
        a.date.localeCompare(b.date),
    );

    for (const entry of sortedHistory) {
        // Skip today's pending — it hasn't resolved yet
        if (entry.date === todayStr && entry.status === "pending") {
            continue;
        }

        if (entry.status === "done") {
            runningStreak++;
            bestStreak = Math.max(bestStreak, runningStreak);
        } else if (entry.status === "rest") {
            // Rest doesn't break streak
            continue;
        } else {
            // missed, or pending on a past date
            runningStreak = 0;
        }
    }

    return bestStreak;
}

/**
 * Compatibility wrapper for the old calculateMetricStreak signature.
 */
export function calculateMetricStreak(metric: Metric): {
    current: number;
    best: number;
} {
    return {
        current: calculateSubstreak(metric),
        best: calculateBestStreak(metric),
    };
}

/**
 * Calculates the main overall streak.
 * Today: 'pending' entries are ignored for scoring.
 * Past: 'pending' entries are treated as missed.
 */
export function calculateMainStreak(metrics: Metric[]): {
    current: number;
    best: number;
} {
    if (!metrics || metrics.length === 0) return { current: 0, best: 0 };

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = format(today, "yyyy-MM-dd");

    let evalDate = new Date(today);
    let streakBroken = false;

    // Calculate current streak
    while (!streakBroken) {
        const dateStr = format(evalDate, "yyyy-MM-dd");
        const isToday = dateStr === todayStr;

        let doneCount = 0;
        let restCount = 0;
        let missedCount = 0;
        let pendingCount = 0;

        for (const metric of metrics) {
            const entry = metric.history.find((h) => h.date === dateStr);

            if (!entry) {
                if (isToday) pendingCount++;
                else missedCount++;
            } else {
                switch (entry.status) {
                    case "done":
                        doneCount++;
                        break;
                    case "rest":
                        restCount++;
                        break;
                    case "missed":
                        missedCount++;
                        break;
                    case "pending":
                        if (isToday) pendingCount++;
                        else missedCount++;
                        break;
                }
            }
        }

        if (isToday) {
            const answeredCount = doneCount + restCount + missedCount;
            if (answeredCount === 0) {
                // Nothing answered today, just move to yesterday
                evalDate.setDate(evalDate.getDate() - 1);
                continue;
            }

            const dailyScore = (doneCount + restCount) / answeredCount;
            if (dailyScore >= 0.5) {
                currentStreak++;
            } else {
                streakBroken = true;
            }
        } else {
            const dailyScore = (doneCount + restCount) / metrics.length;
            if (dailyScore >= 0.5) {
                currentStreak++;
            } else {
                streakBroken = true;
            }
        }

        if (!streakBroken) {
            evalDate.setDate(evalDate.getDate() - 1);
            const daysDiff = Math.floor(
                (today.getTime() - evalDate.getTime()) / (1000 * 60 * 60 * 24),
            );
            if (daysDiff > 365) break;
        }
    }

    // Calculate best streak (Simplified: we'd need to pre-calculate all daily isPassing states)
    // Get all unique dates
    const allDatesSet = new Set<string>();
    metrics.forEach((m) => m.history.forEach((h) => allDatesSet.add(h.date)));
    const allDates = Array.from(allDatesSet).sort();

    let best = 0;
    let running = 0;

    allDates.forEach((dateStr) => {
        // Skip today's pending resolution if it would break a best streak prematurely
        // (though best streak is usually based on finalized days)
        if (dateStr === todayStr) {
            // For best streak, we only count today if it's passing
            // But if we're mid-best-streak and today is pending, it shouldn't reset to 0 yet.
            // However, typical 'best streak' only includes completed/finalized segments.
        }

        let doneRest = 0;
        metrics.forEach((m) => {
            const entry = m.history.find((h) => h.date === dateStr);
            if (entry && (entry.status === "done" || entry.status === "rest"))
                doneRest++;
        });

        if (doneRest / metrics.length >= 0.5) {
            running++;
            best = Math.max(best, running);
        } else {
            // If it's today and pending, don't reset best streak running count yet
            if (dateStr === todayStr) {
                const anyAnswered = metrics.some((m) => {
                    const e = m.history.find((h) => h.date === dateStr);
                    return e && e.status !== "pending";
                });
                if (!anyAnswered) return;
            }
            running = 0;
        }
    });

    return { current: currentStreak, best };
}
