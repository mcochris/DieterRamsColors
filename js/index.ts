/**
 *	@fileOverview Dieter Rams color picker
 *	@version 1.0.0
 *	@license MIT
 *	@see {@link https://twitter.com/cgpov/status/1211658818767261702?s=20|Twitter thread}
 *
 *	@todo Theme picker does not reset font color when switching themes
 */

import themePicker from "./themePicker.js"
//	eslint-disable-next-line @typescript-eslint/ban-ts-comment
//	@ts-ignore
import { TinyColor, mostReadable } from "./tinycolor.js"
//	eslint-disable-next-line @typescript-eslint/ban-ts-comment
//	@ts-ignore
import slimSelect from "./slimselect.js"

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
	const drColorsFlat = drColors.flat()

	const containers = document.querySelectorAll("body .container") as NodeListOf<HTMLDivElement>
	const boxes = document.body.getElementsByClassName("box") as HTMLCollectionOf<HTMLDivElement>
	const textElements = document.body.getElementsByClassName("text") as HTMLCollectionOf<HTMLDivElement>

	//	Loop through all the boxes in all the containers and set their background color and text content
	//	This forEach block is only run when the page refreshes
	containers.forEach((container, outerIndex) => {
		const boxes = container.getElementsByClassName("box") as HTMLCollectionOf<HTMLDivElement>
		[...boxes].forEach((box, innerIndex) => {
			const color = drColors[outerIndex][innerIndex]
			box.style.backgroundColor = color
			const colorObj = new TinyColor(color)
			const contrastColor = mostReadable(colorObj, drColorsFlat).toString(defaultColorNameFormat)
			if (typeof contrastColor === "string")
				box.style.color = contrastColor
			box.textContent = colorObj.toString(defaultColorNameFormat)
			// }
		})
	})

	//	Define what to do when one of the color boxes are clicked
	//	First, set the document body background color to the color of the box that was clicked
	//	Second, set the text decoration of the theme picker buttons to none, and underline the third one
	//	Third, set all the text color to an appropriate color to contrast with the new background color
	// const boxes = document.body.querySelectorAll(".box:nth-child(n+2)") as NodeListOf<HTMLDivElement>

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
			const newColor = mostReadable(color, drColorsFlat)
			if (typeof newColor.toString("rgb") === "string")
				[...textElements].forEach(textElement => textElement.style.color = newColor)
		})
	}

	/**
	 * @description Define what to do when the the color name format changes
	 * @param format string, the new color name format (e.g. "rgb", "hex6", "off")
	 * @returns void
	 * @example setColorNameFormat("rgb")
	 */
	function setColorNameFormat(format: string): void {
		if (validColorNameFormats.includes(format) === false) {
			console.error(`Invalid color name format: ${format}`)
			return
		}
		[...boxes].forEach(box => {
			if (format === "off")
				box.textContent = ""
			else {
				const color = new TinyColor(box.style.backgroundColor)
				const newColor = mostReadable(color, drColorsFlat)
				box.style.color = newColor.toString(format)
				box.textContent = newColor.toString(format)
			}
		})
	}
})()