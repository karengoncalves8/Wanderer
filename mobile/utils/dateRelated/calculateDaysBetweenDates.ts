/**
 * calculateDaysBetweenDates.ts
 *
 * Utility to calculate number of days between two dates.
 *
 * - Accepts Date | string | number inputs (strings/nums passed to Date).
 * - By default uses UTC-midnight normalization to avoid DST issues.
 * - Returns an integer number of days.
 *
 * Options:
 *  - inclusive (default false): if true, include both start and end in the count.
 *  - absolute (default true): if true, result is non-negative.
 *  - useUTC (default true): if true normalize to UTC midnight; otherwise use local midnight.
 */
import { createDateFromString } from '../dateRelated/createDateFromString';
type InputDate = Date | string | number;

export interface DaysBetweenOptions {
    inclusive?: boolean;
    absolute?: boolean;
    useUTC?: boolean;
}

function midnightTime(d: Date, useUTC: boolean): number {
    if (useUTC) {
        return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    } else {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }
}

/**
 * Calculate days between two dates.
 * Returns an integer number of days (abs by default).
 */
export function calculateDaysBetweenDates(
    start: InputDate,
    end: InputDate,
    options: DaysBetweenOptions = {}
): number {
    const { inclusive = false, absolute = true, useUTC = true } = options;

    const s = createDateFromString(start as string);
    const e = createDateFromString(end as string);

    const diffMs = midnightTime(e, useUTC) - midnightTime(s, useUTC);
    const rawDays = diffMs / 86400000; // 1000 * 60 * 60 * 24

    let days = rawDays;

    if (absolute) days = Math.abs(days);

    if (inclusive) {
        days = days >= 0 ? days + 1 : days - 1;
        if (absolute) days = Math.abs(days);
    }

    // Should be integer; round to guard against floating point edge-cases
    return Math.round(days);
}