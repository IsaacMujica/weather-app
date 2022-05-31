import { createDom } from '../utils/dom.js'
import { formatTemp, formatDate, formatWeatherIcon, formatHumidity, formatWindSpeed } from '../utils/format-data.js'

function hourlyTimeTemplate(config) {
	const { max, min, wind, humidity } = config
	return `
        <div class="hourlyWeather">
          <div class="hourlyWeather-section">
            <div id="maxTemp" class="hourlyWeather-section-text">
              Máx: <span>${max}</span>
            </div>
          </div>
          <div class="hourlyWeather-section">
            <div id="minTemp" class="hourlyWeather-section-text">
              MÍn: <span>${min}</span>
            </div>
          </div>
          <div class="hourlyWeather-section">
            <div id="windSpeed" class="hourlyWeather-section-text">
              Viento: <span>${wind}</span>
            </div>
          </div>
          <div class="hourlyWeather-section">
            <div id="humidity" class="hourlyWeather-section-text">
              Humedad: <span>${humidity}</span>
            </div>
          </div>
        </div>
	`
}

export function createHourlyTime(weather, index) {
	const config = {
		min: formatTemp(weather.main.temp_min),
		max: formatTemp(weather.main.temp_max),
		wind: formatWindSpeed(weather.wind.speed),
		humidity: formatHumidity(weather.main.humidity)
	}
	const $weather = createDom(hourlyTimeTemplate(config))
	return $weather
}