// Vanilla Icon Exporter v2
// MIT License (c) Elttob 2021

import * as render from "./render.js"
import JSZip from "../libs/jszip.min.js"

let exportCanvas = document.createElement("canvas")
let exportIconCanvas = document.createElement("canvas")

// adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRGB(hex) {
	let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}


function renderExportBuffer(iconList, palette, overrideColour, exportResolution) {
	let context = exportCanvas.getContext("2d")
	exportCanvas.width = iconList.length * exportResolution
	exportCanvas.height = exportResolution

	context.save()
	try {
		context.clearRect(0, 0, exportBufferContext.canvas.width, exportBufferContext.canvas.height)
		
		let index = 0
		for(const iconData of iconList) {
			let colour = iconData.colour

			if(overrideColour != null) {
				colour = overrideColour
			}

			let rgbColour = hexToRGB(palette.colours[colour])

			render.renderIcon(context, iconData.icon, index * exportResolution, 0, exportResolution, rgbColour)

			index++
		}
	} finally {
		context.restore()
	}
}

export async function exportBlob(iconList, palette, overrideColour, exportResolution) {
	renderExportBuffer(iconList, palette, overrideColour, exportResolution)

	let iconPromises = []
	
	let context = exportIconCanvas.getContext("2d")
	exportIconCanvas.width = exportResolution
	exportIconCanvas.height = exportResolution

	for(let iconIndex = 0; iconIndex < iconSetSize; iconIndex++) {
		context.save()
		try {
			context.clearRect(0, 0, exportResolution, exportResolution)
			context.drawImage(exportCanvas, iconIndex * exportResolution, 0, exportResolution, exportResolution, 0, 0, exportResolution, exportResolution)
			iconPromises[iconIndex] = new Promise(resolve => exportIconCanvas.toBlob(resolve))
		} finally {
			context.restore()
		}
	}

	let iconBlobs = await Promise.all(iconPromises)
	let iconsheetBlob = await new Promise(resolve => exportCanvas.toBlob(resolve))
	
	let zip = new JSZip()

	zip.file("ClassImages.png", iconsheetBlob)
	let modManagerFolder = zip.folder("ModManagerIcons")

	for(let iconIndex=0; iconIndex < iconSetSize; iconIndex++) {
		modManagerFolder.file("explorer-icon-" + iconIndex + ".png", iconBlobs[iconIndex])
	}

	let zipBlob = await zip.generateAsync({type: "blob"})
	return zipBlob
}