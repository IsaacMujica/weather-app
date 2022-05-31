import { defaultConfig, isHTMLElement, logger, checkMobile, pageY, setAnimation, setWidgetPosition } from './utils/draggable.js'

export default function draggable($element, config = defaultConfig) {
	isHTMLElement($element)

	let isOpen = config.open
	let isDragging = false
	let isPointing = false

	const elementRect        = $element.getBoundingClientRect()
	const ELEMENT_BLOCK_SIZE = elementRect.height
	const $marker            = $element.querySelector('[data-marker]')
	const MARKER_BLOCK_SIZE  = $marker.getBoundingClientRect().height

	const VISIBLE_Y_POSITION = 0
	const HIDDEN_Y_POSITION  = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
	let widgetPosition       = VISIBLE_Y_POSITION
	let startY = 0

	isOpen ? open() : close()

	if (config.animatable) {
		setAnimation($element)
	}

	/**
	 * BINDING EVENT HANDLERS TO $marker
	 */
	$marker.addEventListener('click', handleClick)
	if (checkMobile()) {
		$marker.addEventListener('pointerdown', handlePointerDown)
		$marker.addEventListener('pointerup', handlePointerUp)
		$marker.addEventListener('pointerout', handlePointerOut)
		$marker.addEventListener('pointercancel', handlePointerCancel)
		$marker.addEventListener('pointermove', handlePointerMove)
	}

	/**
	 * CLICK EVENT HANDLERS
	 */

	function handleClick(event) {
		toggle(event)
	}

	/**
	 * POINTER EVENT HANDLERS
	 */

	function handlePointerDown(event) {
		startDrag(event)
	}

	function handlePointerUp(event) {
		dragEnd(event)
	}

	function handlePointerOut(event) {
		dragEnd(event)
	}

	function handlePointerCancel(event) {
		dragEnd(event)
	}

	function handlePointerMove(event) {
		drag(event)
	}

	/**
	 * DRAGGABLE UTILITIES
	 */

	function startDrag(event) {
		isDragging = true
		startY     = pageY(event)
	}

	function dragEnd() {
		isDragging = false
		bounce()
	}

	function drag(event) {
		const cursorY   = pageY(event)
		const movementY = cursorY - startY
		widgetPosition += movementY
		startY = cursorY
		if (widgetPosition > HIDDEN_Y_POSITION) return false
		setWidgetPosition($element, widgetPosition)
	}

	function bounce() {
		if (widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
			return open()
		}
		return close()
	}

	function toggle() {
		if (!isDragging) {
			if (!isOpen) return open()
			return close()
		}
	}
	
	function open() {
		isOpen = true
		widgetPosition = VISIBLE_Y_POSITION
		setWidgetPosition($element, widgetPosition)
	}
	
	function close() {
		isOpen = false
		widgetPosition = HIDDEN_Y_POSITION
		setWidgetPosition($element, widgetPosition)
	}
}