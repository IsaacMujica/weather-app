const defaultElements = {
	max: '#maxTemp',
	min: '#minTemp',
	wind: '#windSpeed',
	humidity: '#humidity',
}

export function handleSelectDayWeatherClick(event, idElements = defaultElements) {
	const $hourCurrent  = event.currentTarget
	const $hourSelected = $hourCurrent.parentElement.querySelector('.dayWeather-item.is-selected')
	$hourSelected.classList.remove('is-selected')
	$hourCurrent.classList.add('is-selected')
	printDayWeather($hourCurrent, idElements)
}

export function printDayWeather($element, idElements = defaultElements) {
	for(let prop in idElements) {
		document.querySelector(idElements[prop])
			.querySelector('span').textContent = $element.getAttribute(`w-data-${prop}`)
	}
}