export const createDateFromString = (dateString: string | Date | null | undefined): Date => {
    // If input is already a Date, return a copy
    if (dateString instanceof Date) {
        return new Date(dateString.getTime());
    }

    // Normalize to a string so we can safely use string methods
    const raw = typeof dateString === 'string' ? dateString : (dateString == null ? '' : String(dateString));

    // Handle common cases:
    // - 'YYYY-MM-DD'
    // - 'YYYY-MM-DDTHH:mm:ssZ' (ISO)
    // We only care about the calendar day; slice to first 10 chars when pattern starts with YYYY-
    const s = /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.slice(0, 10) : raw;

    let d: Date;

    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
        const [yStr, mStr, dStr] = s.split('-');
        const y = Number(yStr);
        const m = Number(mStr) - 1;
        const day = Number(dStr);
        d = new Date(y, m, day); // construct as local date
    } else {
        // Fallback for other string formats
        d = new Date(s);
    }

    return d;
}