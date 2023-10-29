import themePicker from "./themePicker.js"
import { TinyColor, mostReadable } from "@ctrl/tinycolor"

//	Initialize theme picker
themePicker()

//	Define format picker buttons and default format
const formatPickerButtons = document.querySelectorAll(".format-picker button") as NodeListOf<HTMLButtonElement>
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
containers.forEach((container, outerIndex) => {
	const boxes = container.getElementsByClassName("box") as HTMLCollectionOf<HTMLDivElement>
	if (boxes) {
		[...boxes].forEach((box, innerIndex) => {
			const color = drColors[outerIndex][innerIndex]
			box.style.backgroundColor = color
			const colorObj = new TinyColor(color)
			const contrastColor = mostReadable(colorObj, drColorsFlat)?.toString(defaultColorNameFormat)
			if (typeof contrastColor === "string")
				box.style.color = contrastColor
			box.textContent = colorObj.toString(defaultColorNameFormat)
		})
	}
})

//	Define what to do when one of the color boxes are clicked
//	First, set the document body background color to the color of the box that was clicked
//	Second, set the text decoration of the theme picker buttons to none, and underline the third one
//	Third, set all the text color to an appropriate color to contrast with the new background color
for (let i = 0; i < boxes.length; i++)
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
		if (newColor !== null && typeof newColor.toString("rgb") === "string") {
			[...textElements].forEach(textElement => textElement.style.color = newColor.toString("rgb"))
		}
		//	Change the font color and background of the format pull-down selector
	})

//	Define what to do when one of the format picker buttons are clicked
//	First, set the text decoration of the default format underline and all the others to none
//	Second, add a eventlistener to each format button
//	Third, set the text decoration of all the format buttons to "none" to un-underline previous selection
//	Fourth, set the text decoration of the format button that was clicked to "underline"
//	Fifth, loop through all the boxes and set the text content to the selected format
for (let i = 0; i < formatPickerButtons.length; i++) {
	if (formatPickerButtons[i].value === defaultColorNameFormat)
		formatPickerButtons[i].style.textDecoration = "underline"
	else
		formatPickerButtons[i].style.textDecoration = "none"

	formatPickerButtons[i].addEventListener("click", e => {
		const format = (e.target as HTMLButtonElement).value;
		if (format === undefined) {
			console.error("Invalid color name format")
			return
		}

		for (let i = 0; i < formatPickerButtons.length; i++) {
			formatPickerButtons[i].style.textDecoration = "none"
		}

		(e.target as HTMLButtonElement).style.textDecoration = "underline";

		[...boxes].forEach(box => {
			if (format === "off") {
				box.textContent = ""
			} else {
				const color = new TinyColor(box.style.backgroundColor)
				const newColor = mostReadable(color, drColorsFlat)

				if (newColor !== null) {
					box.style.color = newColor.format
					box.textContent = newColor.format
				}
			}
		})
	})
}
