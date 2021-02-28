import * as render from "./render.js"

// Instead of using relative URLs, we're using absolute URLs for portability.
const BASE_URL = "https://elttob.github.io/Vanilla-Dev/icons/"

let icondata
let palettes

/**
 * Initialises the main page asynchronously.
 */
export async function init() {
	icondata = await fetch(BASE_URL + "icondata.json").then(response => response.json())
	palettes = await fetch(BASE_URL + "palettes.json").then(response => response.json())

	await render.init()

	alert("Loaded " + icondata.length + " icons and " + palettes.palettes.length + " palettes")

	document.querySelector("#page-loading").className = "done"
}

init()