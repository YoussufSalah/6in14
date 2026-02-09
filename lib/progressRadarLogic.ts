import {
    startOfWeek,
    endOfWeek,
    format,
    subWeeks,
    isSameWeek,
    differenceInWeeks,
} from "date-fns";

export interface WeeklyEntry {
    id: string;
    weekStart: string; // ISO date string for Sunday
    weekEnd: string; // ISO date string for Saturday
    metrics: {
        users: number;
        revenue: number;
        posts: number;
        training: number;
    };
    loggedDate: string; // ISO timestamp
}

export function getWeekRange(date: Date = new Date()) {
    const start = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
    const end = endOfWeek(date, { weekStartsOn: 0 }); // Saturday

    return {
        start: format(start, "yyyy-MM-dd"),
        end: format(end, "yyyy-MM-dd"),
        display: `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`,
    };
}

export function calculateWoW(current: number, previous: number) {
    if (previous === 0) return current > 0 ? 100 : 0;
    const change = ((current - previous) / previous) * 100;
    return Number(change.toFixed(1));
}

export function normalizeData(entries: WeeklyEntry[]) {
    if (entries.length === 0) return [];

    // Sort by date ascending for the chart
    const sorted = [...entries].sort((a, b) =>
        a.weekStart.localeCompare(b.weekStart),
    );
    const last12 = sorted.slice(-12);

    const getMinMax = (key: keyof WeeklyEntry["metrics"]) => {
        const values = last12.map((e) => e.metrics[key]);
        return {
            min: Math.min(...values),
            max: Math.max(...values),
        };
    };

    const usersBounds = getMinMax("users");
    const revenueBounds = getMinMax("revenue");
    const postsBounds = getMinMax("posts");
    const trainingBounds = getMinMax("training");

    const normalize = (val: number, min: number, max: number) => {
        if (max === min) return 50; // Flat line in middle if no variation
        return ((val - min) / (max - min)) * 100;
    };

    return last12.map((e) => ({
        weekLabel: format(new Date(e.weekStart), "MMM d"),
        fullWeek: `${format(new Date(e.weekStart), "MMM d")} - ${format(new Date(e.weekEnd), "MMM d")}`,
        users: normalize(e.metrics.users, usersBounds.min, usersBounds.max),
        revenue: normalize(
            e.metrics.revenue,
            revenueBounds.min,
            revenueBounds.max,
        ),
        posts: normalize(e.metrics.posts, postsBounds.min, postsBounds.max),
        training: normalize(
            e.metrics.training,
            trainingBounds.min,
            trainingBounds.max,
        ),
        raw: e.metrics,
    }));
}

export function calculateMomentumScore(entries: WeeklyEntry[]) {
    if (entries.length < 2) return 0;

    const sorted = [...entries].sort((a, b) =>
        b.weekStart.localeCompare(a.weekStart),
    );
    const current = sorted[0].metrics;
    const prev = sorted[1].metrics;

    // Consistency points (max 40)
    // How many consecutive weeks logged in the last 12?
    let consecutive = 0;
    for (let i = 0; i < Math.min(sorted.length, 12); i++) {
        if (i === 0) {
            consecutive++;
            continue;
        }
        const derivedPrevWeek = subWeeks(new Date(sorted[i - 1].weekStart), 1);
        const actualPrevWeek = new Date(sorted[i].weekStart);
        if (isSameWeek(derivedPrevWeek, actualPrevWeek)) {
            consecutive++;
        } else {
            break;
        }
    }
    const consistencyScore = (consecutive / 12) * 40;

    // Growth points (max 60)
    const growthMetrics = [
        calculateWoW(current.users, prev.users),
        calculateWoW(current.revenue, prev.revenue),
        calculateWoW(current.posts, prev.posts),
        calculateWoW(current.training, prev.training),
    ];

    const positiveGrowthCount = growthMetrics.filter((g) => g > 0).length;
    const growthScore = (positiveGrowthCount / 4) * 60;

    return Math.round(consistencyScore + growthScore);
}

export function detectPatterns(entries: WeeklyEntry[]) {
    if (entries.length < 2) return [];

    const patterns = [];
    const sorted = [...entries].sort((a, b) =>
        b.weekStart.localeCompare(a.weekStart),
    );
    const current = sorted[0].metrics;
    const last4 = sorted.slice(0, 4);

    // 1. Strong Growth
    const allUp = ["users", "revenue", "posts", "training"].every((key) => {
        const metricKey = key as keyof WeeklyEntry["metrics"];
        return (
            sorted[0].metrics[metricKey] >= (sorted[1]?.metrics[metricKey] || 0)
        );
    });
    if (allUp && entries.length >= 2) {
        patterns.push({
            type: "growth",
            title: "🚀 Strong Growth Trajectory",
            description: "All metrics trending upward. Keep the momentum.",
        });
    }

    // 2. Stalling Pattern
    if (last4.length === 4) {
        const isStalling = ["users", "revenue"].every((key) => {
            const metricKey = key as keyof WeeklyEntry["metrics"];
            const max = Math.max(...last4.map((e) => e.metrics[metricKey]));
            const min = Math.min(...last4.map((e) => e.metrics[metricKey]));
            if (max === 0) return false;
            return (max - min) / max < 0.05; // Less than 5% variation over 4 weeks
        });
        if (isStalling) {
            patterns.push({
                type: "warning",
                title: "📉 Stalling Pattern",
                description:
                    "Growth has plateaued over the last 4 weeks. Time to push harder.",
            });
        }
    }

    // 3. Revenue Declining
    if (sorted.length >= 3) {
        const rev1 = sorted[0].metrics.revenue;
        const rev2 = sorted[1].metrics.revenue;
        const rev3 = sorted[2].metrics.revenue;
        if (rev1 < rev2 && rev2 < rev3) {
            patterns.push({
                type: "critical",
                title: "⚠️ Revenue Declining",
                description:
                    "Revenue is down for 2 consecutive weeks. Focus needed.",
            });
        }
    }

    // 4. Consistency Win
    if (entries.length >= 12) {
        patterns.push({
            type: "growth",
            title: "✅ Consistency Win",
            description: "You've logged 12+ weeks. Data compounds.",
        });
    }

    if (patterns.length === 0) {
        patterns.push({
            type: "info",
            title: "📊 Steady Progress",
            description:
                "Metrics are stable. Look for breakthrough opportunities.",
        });
    }

    return patterns;
}
