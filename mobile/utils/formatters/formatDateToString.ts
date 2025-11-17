import { createDateFromString } from "../dateRelated/createDateFromString";

export const formatDateStringToStringWithBar = (input: string | Date): string => {
    let d: Date;

    if (typeof input === 'string') {
        d = createDateFromString(input);
    } else {
        // input is already a Date
        d = new Date(input.getFullYear(), input.getMonth(), input.getDate());
    }

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};
