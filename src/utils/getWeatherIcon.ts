type Size = "small" | "medium" | "large"

export const getWeatherIcon = (iconCode: string, iconSize: Size) => {
    const iconUrl = "https://openweathermap.org/img/wn/"
    const chooseSize = () => {
        switch (iconSize) {
            case "small":
                return ""
            case "medium":
                return "@2x"
            case "large":
                return "@4x"
        }
    }

    return iconUrl + iconCode + chooseSize() + ".png"
}