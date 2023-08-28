/**
 * @todo Fix color ID to contrast well with card background color
 * @todo Fix font color outside of cards (e..g title, menu, theme pickers) to contrast with background color
 * @todo Add color format name changer https://github.com/scttcper/tinycolor and https://slimselectjs.com/
 * @todo Highlight color name format to "defaultColorNameFormat" constant on startup (done)
 */

import "./themePicker.js"
//	eslint-disable-next-line @typescript-eslint/ban-ts-comment
//	@ts-ignore
import { TinyColor, mostReadable } from "https://cdn.jsdelivr.net/npm/@ctrl/tinycolor@4.0/+esm"
//	eslint-disable-next-line @typescript-eslint/ban-ts-comment
//	@ts-ignore
import slimSelect from "https://cdn.jsdelivr.net/npm/slim-select@2.6/+esm"
import { themePicker } from "./themePicker.js"

(() => {
	//	Initialize theme picker
	themePicker()

	//	Initialize slimSelect color name format selector and define what to do when the format changes
	new slimSelect({
		select: "#format",
		settings: { showSearch: false },
		events: { afterChange: (newVal: slimSelect) => setColorNameFormat(newVal[0].value) }
	})

	//	Define valid color name formats and default color name format and automatically select it in the menu
	const validColorNameFormats = ["rgb", "prgb", "hex6", "hsl", "hsv", "off"]
	const defaultColorNameFormat = "rgb"

	//	Define theme picker buttons
	const themePickerButtons = document.querySelectorAll(".theme-picker button") as NodeListOf<HTMLButtonElement>

	//	Define Dieter Ram colors
	const drColors = [
		["#aab7bf", "#736356", "#bfb1a8", "#ad1d1d", "#261201"],
		["#84754a", "#3a3124", "#96937d", "#b9ada4", "#0d0000"],
		["#bf7c2a", "#c09c6f", "#5f503e", "#9c9c9c", "#e1e4e1"],
		["#84764b", "#b7b183", "#372e2d", "#bcb3a6", "#dbd7d3"],
		["#af2e1b", "#cc6324", "#3b4b59", "#bfa07a", "#d9c3b0"],
		["#ed8008", "#ed3f1c", "#bf1b1b", "#736b1e", "#d9d2c6"],
		["#ae2f25", "#e15e3e", "#315b7b", "#292a2e", "#50474c"],
		["#a43f14", "#bd7033", "#d8a367", "#bebab0", "#9a9a9a"],
		["#c5441f", "#f07032", "#40341f", "#8b8178", "#d9cab8"],
		["#0d703f", "#f1b73a", "#e6423a", "#5b4a3b", "#d3d8d2"]
	]

	const containers = document.querySelectorAll("body .container") as NodeListOf<HTMLDivElement>

	//	Loop through all the boxes in all the containers and set their background color and text content
	//	This forEach block is only run when the page refreshes
	containers.forEach((container, outerIndex) => {
		const boxes = container.getElementsByClassName("box") as HTMLCollectionOf<HTMLDivElement>
			;[...boxes].forEach((box, innerIndex) => {
				if (innerIndex === 0)
					box.textContent = `DR ${outerIndex + 1}`
				else {
					const color = drColors[outerIndex][innerIndex - 1]
					box.style.backgroundColor = color
					const colorObj = new TinyColor(color)
					const contrastColor = mostReadable(colorObj, drColors[outerIndex])
					if (typeof contrastColor === "string")
						box.style.color = contrastColor
					box.textContent = colorObj.toString(defaultColorNameFormat)
				}
			})
	})

	//	Define what to do when one of the color boxes are clicked
	//	First, set the document body background color to the color of the box that was clicked
	//	Second, set the text decoration of the theme picker buttons to none, and underline the third one
	//	Third, set all the text color to an appropriate color to contrast with the new background color
	const boxes = document.body.querySelectorAll(".box:nth-child(n+2)") as NodeListOf<HTMLDivElement>
	const textElements = document.body.getElementsByClassName("text") as HTMLCollectionOf<HTMLDivElement>

	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('click', e => {
			//	First:
			const style = getComputedStyle(e.target as Element);
			const bgColor = style.getPropertyValue('background-color');
			document.body.style.backgroundColor = bgColor;
			//	Second:
			themePickerButtons[0].style.textDecoration = "none"
			themePickerButtons[1].style.textDecoration = "none"
			themePickerButtons[2].style.textDecoration = "underline"
			//	Third:
			const color = new TinyColor(bgColor)
			const newColor = mostReadable(color, drColors.flat())
			if (typeof newColor.toString("rgb") === "string")
				[...textElements].forEach(textElement => textElement.style.color = newColor)
		})
	}

	//	Define what to do when the the color name format changes
	function setColorNameFormat(format: string) {
		if (validColorNameFormats.includes(format)) {
			// const boxes = document.querySelectorAll(".box:nth-child(n+2)") as NodeListOf<HTMLDivElement>
			const boxes = document.getElementsByClassName("box") as HTMLCollectionOf<HTMLDivElement>
				;[...boxes].forEach((box, index) => {
					const color = new TinyColor(box.style.backgroundColor)
					const colorString = color.toString(format)
					if (index === 0)
						box.style.color = colorString
					else if (format === "off")
						box.textContent = ""
					else
						box.textContent = colorString
				})
		}
	}

	document.body.hidden = false
})()