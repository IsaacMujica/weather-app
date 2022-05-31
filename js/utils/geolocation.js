function geolocationSupport() {
	return 'geolocation' in navigator
}

const defaultOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximunAge: 120000
}

export function getCurrentPosition(options = defaultOptions) {
	if (!geolocationSupport()) throw new Error('No hay soporte de Geolocalización en tu navegador.')

	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(position => {
			resolve(position)
		}, () => {
			reject(new Error('No se ha podido obtener tu ubicación, favor de activar la geolocalización en tu dispositivo.'))
		}, options)
	})
}

export async function getCurrentCoords(options = defaultOptions) {
	try {
		const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
		return { lat, lon, isError: false, message: 'OK' }
	} catch(error) {
		return { lat: undefined, lon: undefined, isError: true, message: error.message }
	}
}