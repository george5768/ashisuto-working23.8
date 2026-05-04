/**
 * Date Formatting Utility
 * 
 * How to import:
 * import { DateFormatUtil, normalizeDate } from "@/utils/DateFormatUtil";
 * 
 * How to use:
 * DateFormatUtil(new Date(), 1);
 */

export function DateFormatUtil(date: Date, selection: number): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return ''; // Return an empty string if it's not a valid date
    }

    let returnSelector: string;

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    // Internal helper function
    function getOrdinalSuffix(n: number): string {
        if (n > 3 && n < 21) return 'th'; // For 11th to 19th
        switch (n % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    switch (selection) {
        case 1: // 1 Jan
            returnSelector = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            break;
        case 2: // 01 Jan
            returnSelector = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
            break;
        case 3: // 1 January
            returnSelector = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
            break;
        case 4: // 01 January
            returnSelector = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });
            break;
        case 5: // 1 Jan 23
            returnSelector = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
            break;
        case 6: // 1 Jan 2023
            returnSelector = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            break;
        case 7: // 01 Jan 2023
            returnSelector = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            break;
        case 8: // 01/01/23
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date);
            break;
        case 9: // 1/1/23
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'numeric', year: '2-digit' }).format(date).replace(/\b0/g, '');
            break;
        case 10: // 01/01/2023
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
            break;
        case 11: // 1/1/2023
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date).replace(/\b0/g, '');
            break;
        case 12: // 01.01.23
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date).replace(/\//g, '.');
            break;
        case 13: // 01.01.2023
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date).replace(/\//g, '.');
            break;
        case 14: // 01-01-23
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(date).replace(/\//g, '-');
            break;
        case 15: // 01-01-2023
            returnSelector = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date).replace(/\//g, '-');
            break;
        case 16: // 2023-01-01 [mostly use for useEffect loadData date format - to retrieve date from db]
            returnSelector = date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
            break;
        case 17: // 1st of January 2023
            returnSelector = `${day}${getOrdinalSuffix(day)} of ${month} ${year}`;
            break;
        case 18: // 1st January 2023
            returnSelector = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
            break;
        case 19: // 1st JANUARY 2023
            returnSelector = `${day}${getOrdinalSuffix(day)} ${month.toUpperCase()} ${year}`;
            break;
        case 20: // January 2023 (Month yyyy)
            returnSelector = `${month} ${year}`; 
            break;
        case 21: // January 23 (Month yy)
            returnSelector = `${month} ${year.toString().slice(-2)}`; 
            break;
        case 22: // JANUARY 2023 (Month.toUpperCase yyyy)
            returnSelector = `${month.toUpperCase()} ${year}`;
            break;
        case 23: // JANUARY 23 (Month.toUpperCase yy)
            returnSelector = `${month.toUpperCase()} ${year.toString().slice(-2)}`;
            break;
        case 24: // Jan 23
            returnSelector = date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
            break;
        case 25: // Jan
            returnSelector = date.toLocaleString("en-US", { month: "short" });
            break;
        default: // 1 Jan 23
            returnSelector = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
    }

    return returnSelector;
}

// Helper to normalize dates (set time to midnight)
export function normalizeDate(date: string | number | Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0); 
    return normalized;
}