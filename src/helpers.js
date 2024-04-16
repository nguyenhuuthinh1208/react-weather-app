export default function parsetWeatherData(data) {
  return [parseCurrentWeather(data), parseDailyWeather(data)];
}

function parseCurrentWeather({ current_weather, daily }) {
  const {
    temperature: currentTemp,
    windspeed: windSpeed,
    weathercode: iconCode,
    time: timestamp,
  } = current_weather;

  const {
    apparent_temperature_max: [highTemp],
    apparent_temperature_min: [lowTemp],
    precipitation_sum: [precip],
  } = daily;

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(highTemp),
    lowTemp: Math.round(lowTemp),
    windSpeed: Math.round(windSpeed),
    precip: Math.round(precip * 10),
    timestamp: timestamp * 1000,
    iconCode,
  };
}

function parseDailyWeather({ daily }) {
  return daily.time.map((time, index) => {
    return {
      timestamp: time * 1000,
      iconCode: daily.weathercode[index],
      maxTemp: Math.round(daily.apparent_temperature_max[index]),
    };
  });
}
