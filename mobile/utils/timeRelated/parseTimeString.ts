    // Helper to parse stored time strings ("HH:mm:ss") into Date objects for the time picker
    export const parseTime = (t: string | Date | undefined | null): Date | null => {
        if (!t) return null;
        if (typeof t === 'string') {
            // Build an ISO-like time on a fixed date to avoid date shifts
            try {
                return new Date(`1970-01-01T${t}`);
            } catch (e) {
                return null;
            }
        }
        if (t instanceof Date) return t;
        return null;
    };