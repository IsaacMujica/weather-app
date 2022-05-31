import { defaultConfig, isHTMLElement, logger, checkMobile, pageY, setAnimation, setWidgetPosition } from './utils/draggable.js'
import draggable from './draggable.js'

const defaultOptions = {
	appContainer: document.querySelector('body'),
	target: document.querySelector('.weeklyWeather'),
	targetMarker: document.querySelector('[data-marker]'),
}

export function draggableGlobal(options = defaultOptions, config = defaultConfig) {
	const {
		appContainer: $element,
		target: $target,
		targetMarker: $marker
	} = options

	/**
	 * HTMLELEMENT VALIDATION
	 */
	isHTMLElement($element)
	isHTMLElement($target)
	isHTMLElement($marker)

	draggable($target)


	/**
	 * DEFAULT ELEMENT STATES
	 */
	let isElementPointing     = false
	let isElementPointedValid = false

	/**
	 * DEFAULT TARGET STATES
	 */
	let isTargetOpen = config.open

	/**
	 * DEFAULT VARIABLES AND CONSTANTS TO $target
	 */
	const targetRect        = $target.getBoundingClientRect()
	const TARGET_BLOCK_SIZE = targetRect.height
	const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height

	const VISIBLE_Y_POSITION = 0
	const HIDDEN_Y_POSITION  = TARGET_BLOCK_SIZE - MARKER_BLOCK_SIZE
	let targetWidgetPosition = VISIBLE_Y_POSITION
	let targetStartY = 0

	/**
	 * BINDING EVENT HANDLERS TO $element
	 */
	if (!checkMobile()) {
		$element.addEventListener('pointerdown', handleElementPointerDown)
		$element.addEventListener('pointerup', handleElementPointerUp)
		$element.addEventListener('pointerout', handleElementPointerOut)
		$element.addEventListener('pointercancel', handleElementPointerCancel)
		$element.addEventListener('pointermove', handleElementPointerMove)
		window.addEventListener('blur', handleWindowBlur)
	}

	/**
	 * ELEMENT POINTER EVENT HANDLERS
	 */

	function handleElementPointerDown(event) {
		isElementPointing = true
		isElementPointedValid = false
		if (checkValidMarker(event)) {
			isElementPointedValid = true
			startDrag(event)
		}
	}

	function handleElementPointerUp(event) {
		isElementPointing = false
		dragEnd(event)
	}

	function handleElementPointerOut(event) {
		if (!checkValidPointer(event)) {
			dragEnd(event)
		}
	}

	function handleElementPointerCancel(event) {
		dragEnd(event)
	}

	function handleElementPointerMove(event) {
		// logger(isElementPointedValid, !checkMobile(), isElementPointing)
		if (isElementPointedValid && isElementPointing) {
			drag(event)
		}
	}

	function handleWindowBlur(event) {
		isElementPointing = false
		isElementPointedValid = false
		open()
	}

	/**
	 * DRAGGABLE UTILITIES
	 */

	function startDrag(event) {
		targetStartY = pageY(event)
	}

	function dragEnd() {
		bounce()
	}

	function drag(event) {
		const cursorY   = pageY(event)
		const movementY = cursorY - targetStartY
		targetWidgetPosition += movementY
		targetStartY = cursorY
		if (targetWidgetPosition > HIDDEN_Y_POSITION) return false
		setWidgetPosition($target, targetWidgetPosition)
	}

	function bounce() {
		if (targetWidgetPosition < TARGET_BLOCK_SIZE / 2) {
			return open()
		}
		return close()
	}
	
	function open() {
		isTargetOpen = true
		targetWidgetPosition = VISIBLE_Y_POSITION
		setWidgetPosition($element, targetWidgetPosition)
	}
	
	function close() {
		isTargetOpen = false
		targetWidgetPosition = HIDDEN_Y_POSITION
		setWidgetPosition($element, targetWidgetPosition)
	}

	/**
	 * ENGINE UTILITIES
	 */
	function checkValidMarker(event) {
		return event.target === $marker
	}
	function checkValidPointer(event) {
		return $element.contains(event.target) || event.target === $element
	}
}