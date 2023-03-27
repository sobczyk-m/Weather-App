type Date = "hour" | "dayOfMonth"

export function formatTime(unixTime: number, timezone: string, dateFormat: Date) {
    console.log(timezone)
    const chooseDateFormat = (): Object => {
        switch (dateFormat) {
            case "hour":
                return {
                    timezone: timezone,
                    hour: "numeric",
                    minute: "numeric",
                    hour12: false
                }
            case "dayOfMonth":
                return {
                    timeZone: timezone,
                    month: "numeric",
                    day: "numeric",
                    hour12: false
                }
        }
    }

    const dtFormat = new Intl.DateTimeFormat('pl-PL', chooseDateFormat());

    return dtFormat.format(new Date(unixTime * 1e3));
}