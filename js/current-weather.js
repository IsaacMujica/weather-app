import { getWeather } from './services/weather-api.js'
import { formatDate, formatTemp, solarStatus } from './utils/format-data.js'
import { getCurrentCoords } from './utils/geolocation.js'
import { weatherConditionCodes } from './constants.js'
// console.info(weather)

function setCurrentDate($el, date) {
	date = date ?? new Date()
	setTextContent($el, formatDate(date))
}

function setTextContent($el, text = '') {
	$el.textContent = text
}

function setStyles($el, prop, value = '') {
	$el.style[prop] = value
}

function setBackground($el, status = 'morning', weatherType = 'clean') {
	const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ?
		'@2x' :
		'';
	setStyles($el, 'background-image', `url('./images/${status}-${weatherType}${size}.jpg')`)
}

function showCurrentWeather($app, $loading) {
	$app.hidden     = false
	$loading.hidden = true
}

function configCurrentWeather(weather) {
	const $app     = document.querySelector('#app')
	const $loading = document.querySelector('#loading')
	/**
	 * Date
	 */
	const $currentWeatherDate = document.querySelector('#current-weather-date')
	setCurrentDate($currentWeatherDate)
	/**
	 * City
	 */
	const $currentWeatherCity = document.querySelector('#current-weather-city')
	const city                = weather.name
	setTextContent($currentWeatherCity, city)
	/**
	 * Temp
	 */
	const $currentWeatherTemp = document.querySelector('#current-weather-temp')
	const temp                = weather.main.temp
	setTextContent($currentWeatherTemp, formatTemp(temp))
	/**
	 * background
	 */
	const status = solarStatus(weather.sys.sunrise, weather.sys.sunset)
	const weatherType = weatherConditionCodes[String(weather.weather[0].id).charAt()]
	setBackground($app, status, weatherType)
	/**
	 * Loader
	 */
	showCurrentWeather($app, $loading)
}

export default async function currentWeather() {
	/**
	 * GEO DATA USER
	 */
	const { lat, lon, isError, message } = await getCurrentCoords()
	if (isError) return console.info(message)
	/**
	 * API WEATHER
	 */
	const { data, isError: weatherIsError, message: weatherMessage } = await getWeather(lat, lon)
	if (weatherIsError) return console.info(weatherMessage)
	/**
	 * CONFIG
	 */
	configCurrentWeather(data)
}