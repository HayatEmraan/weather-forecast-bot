const { default: axios } = require("axios");

async function getWeatherData(lat, long) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=299718ce4e92b51dca4ccb2d9512e5de`
    );

    const middle = response?.data;
    const city = middle?.city;
    const cityName = city?.name;
    const country = city?.country;
    const sunrise = city?.sunrise;
    const sunset = city?.sunset;
    const timezone = city?.timezone;

    const weather = response?.data?.list[0];
    const temperature = Math.round(weather?.main.temp - 273.15);

    const temp_middle = response?.data?.list[0]?.main;
    const temp_min = Math.round(temp_middle?.temp_min - 273.15);
    const temp_max = Math.round(temp_middle?.temp_max - 273.15);

    const sunriseTime = new Date(sunrise * 1000);
    const sunriseLocalTime = sunriseTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const sunsetTime = new Date(sunset * 1000);
    const sunsetLocalTime = sunsetTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return {
      cityName,
      country,
      sunrise,
      sunriseLocalTime,
      sunsetLocalTime,
      temperature,
      temp_min,
      temp_max,
      timezone,
    };
  } catch (error) {
    return {
      failed: true,
      error: error,
    };
  }
}

module.exports = getWeatherData;
