export function getFormatDataWhithSlashFullMonth(dateStr: string): string {
    const date = new Date(dateStr);

    const formatted = new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date);
    const parts = formatted.split(" ");
    if (parts.length > 3) {
        const result = `${parts[0]} / ${capitalizeFirstLetter(parts[1]).slice(
            0,
            3
        )} / ${parts[2]}`;
        return result;
    } else {
        console.error("failed formatted.split", parts);
        return "";
    }
}

export function getFormatDataWhithSlashNumberMonth(dateStr: string): string {
    const date = new Date(dateStr);

    const formatted: string = new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
    const parts = formatted.split(".");
    if (parts.length >= 3) {
        const result = `${parts[0]} / ${parts[1]} / ${parts[2]}`;
        return result;
    } else {
        console.error("failed formatted.split", parts);
        return "";
    }
}

export function getFormatDate(date: Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}

export function getFormatTime(date: Date): string {
    return new Intl.DateTimeFormat("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function getFormatDay(date: Date) {
    let day = new Intl.DateTimeFormat("ru-RU", {
        weekday: "long",
    }).format(date);
    day = capitalizeFirstLetter(day);
    return day;
}

export function getFormatDataToDayMonth(dateStr: string): string {
    const date = new Date(dateStr);
    const day = String(date.getDay()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const result = `${day} / ${month}`;
    return result;
}

export function getFormatNumber(num: number): string {
    const formattedNum = new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })
        .format(num)
        .replace(",", ".");
    return formattedNum;
}

function capitalizeFirstLetter(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
}
