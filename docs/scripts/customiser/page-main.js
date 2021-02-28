import * as render from "./render.js"

// Instead of using relative URLs, we're using absolute URLs for portability.
const BASE_URL = "https://elttob.github.io/Vanilla-Dev/icons/"

let icondata
let palettes

let activePalette

/**
 * Changes the currently active colour palette.
 * @param {*} palette - The palette object to use.
 */
function setActivePalette(palette) {
	document.documentElement.className = "theme-" + palette.page_colours
	activePalette = palette

	const paletteOptions = document.querySelectorAll("input[name=theme][type=radio]")

	for(const paletteOption of paletteOptions) {
		paletteOption.checked = paletteOption.value == palette.id
	}
}

/**
 * Initialises the palette options on the customiser page.
 */
function initPalettes() {
	let userTheme = "light";
	if(window.matchMedia != null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		userTheme = "dark";
	}

	setActivePalette(palettes.palettes[palettes.defaults[userTheme]])

	const paletteOptions = document.querySelectorAll("input[name=theme][type=radio]")

	for(const paletteOption of paletteOptions) {
		paletteOption.addEventListener('click', () => {
			setActivePalette(palettes.palettes[paletteOption.value])
		})
	}
}

/**
 * Initialises the main page asynchronously.
 */
async function init() {
	icondata = await fetch(BASE_URL + "icondata.json").then(response => response.json())
	palettes = await fetch(BASE_URL + "palettes.json").then(response => response.json())

	await render.init()

	initPalettes()

	document.querySelector("#page-loading").className = "done"
}

init()