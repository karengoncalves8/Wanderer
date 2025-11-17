// Ensure date-only values don't shift a day when serialized across timezones
// Produces an ISO string pinned to 12:00:00Z to avoid -/+ timezone shifts changing the calendar day
export const normalizeDateForAPI = (input: Date | string): string => {
  let d: Date;
  if (typeof input === 'string') {
    // If string is just a date (YYYY-MM-DD or DD/MM/YYYY), try to parse sensibly
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      return `${input}T12:00:00.000Z`;
    }
    // Fallback: new Date on string
    d = new Date(input);
  } else {
    d = new Date(input.getFullYear(), input.getMonth(), input.getDate());
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T12:00:00.000Z`;
};
