import { getWeather } from '../services/weather-api.js'
import { formatWeekList } from '../utils/format-data.js'
import { getCurrentCoords } from '../utils/geolocation.js'
import { createDom } from '../utils/dom.js'
import { createPeriodTime } from './period-time.js'
import { createHourlyTime } from './hourly-weather.js'
// import draggable from './draggable.js'
import { draggableGlobal } from '../draggable-global.js'

function tabPanelTemplate(items, id) {
	return `
		<div class="tabPanel" tabindex="${id}" aria-labelledby="tab-${id}">
	      <div class="dayWeather" id="dayWeather-${id}">
	        <ul class="dayWeather-list" id="dayWeather-list-${id}"></ul>
	      </div>
	    </div>
    `
}

function createTabPanel(item, id) {
	const $panel = createDom(tabPanelTemplate(item, id))
	if (id > 0) $panel.hidden = true
	return $panel
}

function configWeeklyWeather(weekList) {
	const $container = document.querySelector('#tabs')
	const $hourly = createHourlyTime(weekList[0][0])
	weekList.forEach((day, id) => {
		const $panel = createTabPanel(day, id)
		$container.append($panel)
		$container.append($hourly)
		day.forEach((weather, weatherIndex) => {
			$panel.querySelector('.dayWeather-list').append(createPeriodTime(weather, weatherIndex))
		})
	});
}

export default async function weeklyWeather() {
	const $container = document.querySelector('.weeklyWeather')
	/**
	 * GEO DATA USER
	 */
	const { lat, lon, isError, message } = await getCurrentCoords()
	if (isError) return console.info(message)
	/**
	 * API WEATHER
	 */
	const { data, isError: weatherIsError, message: weatherMessage } = await getWeather(lat, lon, 'forecast')
	if (weatherIsError) return console.info(weatherMessage)
	/**
	 * CONFIG
	 */
	const weekList = formatWeekList(data.list)
	configWeeklyWeather(weekList)
	draggableGlobal()
}