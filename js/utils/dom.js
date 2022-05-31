export function createDom(string) {
	const parser = new DOMParser()
	return parser.parseFromString(string, 'text/html').body.firstChild
}