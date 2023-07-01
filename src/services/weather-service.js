// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

let openweathermapkey = import.meta.env.VITE_OPENWEATHERMAP_KEY;

export const weatherService = {
    async getWeather(lat, lng) {
        try {
            let conditions;
            const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${openweathermapkey}`;

            await fetch(requestUrl, {
                mode: "cors"
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    conditions = data;
                });

            let weather = {
                weatherName: conditions.weather[0].main,
                weatherDescription: conditions.weather[0].description,
                temperature: conditions.main.temp,
                windSpeed: conditions.wind.speed,
                visibility: conditions.visibility,
                clouds: conditions.clouds.all
            };

            // Capitalize first letter of weather description
            weather.weatherDescription = weather.weatherDescription.charAt(0).toUpperCase() + weather.weatherDescription.slice(1);

            // add °C to temperature
            weather.temperature = weather.temperature + "°C";

            // add km/h to wind speed
            weather.windSpeed = weather.windSpeed + " km/h";

            // divide by 1000 to get km from m and add km to visibility
            weather.visibility = (weather.visibility / 1000) + " km";

            // add % to clouds
            weather.clouds = weather.clouds + "%";

            return weather;
        } catch (error) {
            return [];
        }
    }
};