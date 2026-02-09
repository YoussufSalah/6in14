import { format } from "date-fns";

export type MetricStatus = "done" | "missed" | "rest" | "pending" | "none";

export interface Metric {
    id: string;
    name: string;
    history: Record<string, MetricStatus>; // YYYY-MM-DD -> status
    currentStreak?: number;
    bestStreak?: number;
}

/**
 * Calculates a single metric's current substreak.
 */
export function calculateSubstreak(metric: Metric): number {
    if (!metric || !metric.history) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = format(today, "yyyy-MM-dd");

    let currentDate = new Date(today);

    while (true) {
        const dateStr = format(currentDate, "yyyy-MM-dd");
        const isToday = dateStr === todayStr;
        const status = metric.history[dateStr];

        if (!status || status === "none") {
            if (isToday) {
                currentDate.setDate(currentDate.getDate() - 1);
                continue;
            }
            return streak;
        }

        if (status === "pending") {
            if (isToday) {
                currentDate.setDate(currentDate.getDate() - 1);
                continue;
            }
            return streak;
        }

        if (status === "done") {
            streak++;
        } else if (status === "rest") {
            // Rest: skip, no break
        } else if (status === "missed") {
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
 */
export function calculateBestStreak(metric: Metric): number {
    if (!metric || !metric.history) return 0;

    const todayStr = format(new Date(), "yyyy-MM-dd");
    const sortedDates = Object.keys(metric.history).sort();

    let bestStreak = 0;
    let runningStreak = 0;

    for (const dateStr of sortedDates) {
        const status = metric.history[dateStr];
        
        if (dateStr === todayStr && status === "pending") {
            continue;
        }

        if (status === "done") {
            runningStreak++;
            bestStreak = Math.max(bestStreak, runningStreak);
        } else if (status === "rest") {
            continue;
        } else {
            runningStreak = 0;
        }
    }

    return bestStreak;
}

/**
 * Compatibility wrapper.
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

        for (const metric of metrics) {
            const status = metric.history[dateStr];

            if (!status || status === "none" || (status === "pending" && !isToday)) {
                missedCount++;
            } else if (status === "pending" && isToday) {
                // skip for now
            } else if (status === "done") {
                doneCount++;
            } else if (status === "rest") {
                restCount++;
            } else if (status === "missed") {
                missedCount++;
            }
        }

        if (isToday) {
            const answeredCount = doneCount + restCount + missedCount;
            if (answeredCount === 0) {
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

    // Calculate best streak
    const allDatesSet = new Set<string>();
    metrics.forEach((m) => Object.keys(m.history).forEach(d => allDatesSet.add(d)));
    const allDates = Array.from(allDatesSet).sort();

    let best = 0;
    let running = 0;

    allDates.forEach((dateStr) => {
        let doneRest = 0;
        metrics.forEach((m) => {
            const status = m.history[dateStr];
            if (status === "done" || status === "rest") doneRest++;
        });

        if (doneRest / metrics.length >= 0.5) {
            running++;
            best = Math.max(best, running);
        } else {
            if (dateStr === todayStr) {
                const anyAnswered = metrics.some((m) => {
                    const s = m.history[dateStr];
                    return s && s !== "pending" && s !== "none";
                });
                if (!anyAnswered) return;
            }
            running = 0;
        }
    });

    return { current: currentStreak, best };
}
