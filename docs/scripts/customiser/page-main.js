import * as render from "./render.js"

/**
 * Initialises the main page asynchronously.
 */
export async function init() {
	await render.init()

	alert("Hello!")

	document.querySelector("#page-loading").className = "done"
}

init()