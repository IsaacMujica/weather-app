import { createDom } from '../utils/dom.js'
import { formatTemp, formatDate, formatWeatherIcon, formatHumidity, formatWindSpeed } from '../utils/format-data.js'
import { createHourlyTime } from './hourly-weather.js'
import { handleSelectDayWeatherClick, printDayWeather } from '../hourly.js'

function periodTimeTemplate(config, index) {
	const { hour, icon, temp, description, max, min, wind, humidity } = config
	return `
		<li id="dayWeather-item-${index}" class="dayWeather-item" role="tab" w-data-max="${max}" w-data-min="${min}" w-data-wind="${wind}" w-data-humidity="${humidity}">
			<span class="dayWeather-time">${hour}</span>
			<img class="dayWeather-icon" weight="48" height="48" src="${icon}" alt="moderate" rain="">
			<span class="dayWeather-temp">${temp}</span>
		</li>
	`
}

export function createPeriodTime(weather, index) {
	//debugger
	const dateOptions = {
		hour: 'numeric',
		hour12: true
	}
	const config = {
		hour: formatDate(new Date(weather.dt * 1000), dateOptions),
		temp: formatTemp(weather.main.temp),
		icon: formatWeatherIcon(weather.weather[0].icon),
		description: weather.weather[0].description,
		min: formatTemp(weather.main.temp_min),
		max: formatTemp(weather.main.temp_max),
		wind: formatWindSpeed(weather.wind.speed),
		humidity: formatHumidity(weather.main.humidity),
	}
	const $weather = createDom(periodTimeTemplate(config, index))
	$weather.addEventListener('click', handleSelectDayWeatherClick)
	if (index === 0)
		$weather.classList.add('is-selected')
	return $weather
}