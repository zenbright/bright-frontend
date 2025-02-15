export function formatDate(date: Date): string {
    // Array of month names
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    // Get month, day, and year from the Date object
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
}
