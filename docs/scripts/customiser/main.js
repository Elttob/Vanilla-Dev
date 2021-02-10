// Vanilla Icon Customiser v2
// by Elttob

// Instead of using relative URLs, we're using absolute URLs for portability.
const BASE_URL = "https://elttob.github.io/Vanilla-Dev/icons/"

let iconData = null
let palettes = null
let iconSheet = null

// Utility function for loading an image with Promise syntax
function loadImage(url) {
	return new Promise((resolve, reject) => {
		let image = new Image()
		image.onload = () => resolve(image)
		image.onerror = reject
		image.src = url
	});
}

// The entry point of the program - the main code is placed in this function for
// cleanliness, and also to enable usage of async/await features.
async function run() {
	iconData = await fetch(BASE_URL + "icondata.json").then(response => response.json())
	palettes = await fetch(BASE_URL + "palettes.json").then(response => response.json())
	iconSheet = await loadImage(BASE_URL + "icons.svg")

	alert(iconSheet)
}

run().catch(handleFatalError)