import { WEATHER_SITE_NAME, WEATHER_SITE, WEATHER_API_URL_BASE, WEATHER_API_VERSION, WEATHER_API_KEY, WEATHER_TYPE_DICTIONARY, weatherRequestOptions } from '../constants.js'

export async function getWeather(lat, lon, request = 'weather') {
  if (!WEATHER_API_KEY) {
    return {
      data: null,
      isError: true,
      message: `Debes indicar una llave para la API de ${WEATHER_SITE_NAME}`,
    }
  }
  let baseOptions = `lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  const response = await fetch(`${WEATHER_API_URL_BASE}/${WEATHER_API_VERSION}/${WEATHER_TYPE_DICTIONARY[request]}?${baseOptions}`, weatherRequestOptions)
  if (!response.ok) return {
    data: null,
    isError: true,
    message: `Error al conectar con ${WEATHER_SITE_NAME}, en la petición ${request}, con respuesta ${response.statusText}`,
  }
  const data = await response.json();
  return {
    data,
    isError: false,
    message: `Conexión exitosa con ${WEATHER_SITE_NAME}`,
  }
}