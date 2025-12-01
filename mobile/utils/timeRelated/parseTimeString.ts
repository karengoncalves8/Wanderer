// Convert 12-hour format with seconds (e.g., "4:00 PM:00") to 24-hour format ("HH:mm:ss")
export const convert12to24HourFormat = (time12h: string): string => {
    if (!time12h) return '';
    
    try {
        // Handle the specific format "4:00 PM:00"
        if (time12h.includes(' ')) {
            const [timePart, periodPart] = time12h.split(' ');
            if (periodPart && (periodPart.startsWith('AM') || periodPart.startsWith('PM'))) {
                const period = periodPart.substring(0, 2);
                const seconds = periodPart.split(':')[1] || '00';
                
                let [hours, minutes] = timePart.split(':').map(Number);
                
                // Convert to 24-hour format
                if (period === 'PM' && hours < 12) {
                    hours += 12;
                } else if (period === 'AM' && hours === 12) {
                    hours = 0;
                }
                
                return [
                    hours.toString().padStart(2, '0'),
                    (minutes || 0).toString().padStart(2, '0'),
                    seconds.padStart(2, '0')
                ].join(':');
            }
        }
        
        // Fallback for other formats
        const cleanTime = time12h.replace(/\s+/g, ' ').trim();
        const timeMatch = cleanTime.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AP]M)?/i);
        
        if (!timeMatch) return '';
        
        let [_, hours, minutes, seconds = '00', period = ''] = timeMatch;
        let hours24 = parseInt(hours, 10);
        
        if (period) {
            if (period.toUpperCase() === 'PM' && hours24 < 12) {
                hours24 += 12;
            } else if (period.toUpperCase() === 'AM' && hours24 === 12) {
                hours24 = 0;
            }
        }
        
        return [
            hours24.toString().padStart(2, '0'),
            minutes.padStart(2, '0'),
            seconds.padStart(2, '0')
        ].join(':');
    } catch (e) {
        console.error('Error converting time format:', e);
        return '';
    }
};

// Helper to parse stored time strings into Date objects for the time picker
export const parseTime = (t: string | Date | undefined | null): Date | null => {
    if (!t) return null;
    
    if (typeof t === 'string') {
        try {
            // If the time is in 12-hour format with AM/PM, convert it first
            if (t.match(/[AP]M/i)) {
                const time24 = convert12to24HourFormat(t);
                return new Date(`1970-01-01T${time24}`);
            }
            // Otherwise, try to parse directly
            return new Date(`1970-01-01T${t}`);
        } catch (e) {
            console.warn('Failed to parse time:', t, e);
            return null;
        }
    }
    
    if (t instanceof Date) return t;
    return null;
};