const defaultDateOptions = {
	day: 'numeric',
	weekday: 'long',
	month: 'long',
}

export function solarStatus(sunriseTime, sunsetTime) {
	const currentHours = new Date().getHours()
	const sunriseHours = new Date(sunriseTime * 1000).getHours()
	const sunsetHours  = new Date(sunsetTime * 1000).getHours()
	return currentHours >= sunriseTime && currentHours < sunsetTime ? 'morning' : 'night';
}

export function formatDate(date, options = defaultDateOptions) {
	return new Intl.DateTimeFormat('es', options).format(date)
}

export function formatWeatherIcon(icon) {
	return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export function formatTemp(value = '0') {
	return `${Math.round(value)}°`
}

export function formatHumidity(value = '0') {
	return `${value}%`
}

export function formatWindSpeed(value = 0) {
	value = Number(value) * 3.6
	return `${Math.round(value)} Km/h`
}

export function formatWeekList(rawData) {
	let dayList    = []
	const weekList = []
	rawData.forEach((item, index) => {
		dayList.push(item)
		if ((index + 1) % 8 === 0) {
			weekList.push(dayList)
			dayList = []
		}
	});
	return weekList
}