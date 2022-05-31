import { printDayWeather } from './hourly.js'

const $tabContainer = document.querySelector('#tabs')
const $tabList = $tabContainer.querySelectorAll('.tab')

const today   = new Date()
let weekday = today.getDay()
const week = [
	'Domingo',
	'Lunes',
	'Martes',
	'Miércoles',
	'Jueves',
	'Viernes',
	'Sábado',
]

function nextDay(day) {
	if (day === 6) return 0
	return day + 1
}

$tabList.forEach(($tab, index) => {
	$tab.addEventListener('click', handleSelectTabClick)
	if (index === 0) {
		$tab.textContent = 'Hoy'
		weekday = nextDay(weekday)
		return false
	}
	$tab.textContent = week[weekday]
	weekday = nextDay(weekday)
})

function handleSelectTabClick(event) {
	const $tabSelected    = event.currentTarget
	const $tabActive      = document.querySelector('.tab[aria-selected="true"]')
	const $tabPanel       = document.querySelector(`[aria-labelledby="${$tabSelected.id}"`)
	const $tabPanelActive = document.querySelector('.tabPanel:not([hidden])')
	if ($tabSelected.id != $tabActive.id) {
		$tabActive.removeAttribute('aria-selected')
		$tabSelected.setAttribute('aria-selected', true)
		$tabPanel.hidden       = false
		$tabPanelActive.hidden = true

		const $hourSelected = $tabPanel.querySelector('.dayWeather-item.is-selected')
		printDayWeather($hourSelected)
	}
}