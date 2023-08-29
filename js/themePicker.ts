export function themePicker() {
	const themePickerButtons = document.querySelectorAll(".theme-picker button") as NodeListOf<HTMLButtonElement>

	themePickerButtons[0].addEventListener("click", () => {
		themePickerButtons[0].style.textDecoration = "underline"
		themePickerButtons[1].style.textDecoration = "none"
		themePickerButtons[2].style.textDecoration = "none"
		if (document.body.attributes.getNamedItem("style") !== null)
			document.body.attributes.removeNamedItem("style")
		document.body.classList.remove("dark-theme")
		document.body.classList.add("light-theme")
	})

	themePickerButtons[1].addEventListener("click", () => {
		themePickerButtons[0].style.textDecoration = "none"
		themePickerButtons[1].style.textDecoration = "underline"
		themePickerButtons[2].style.textDecoration = "none"
		if (document.body.attributes.getNamedItem("style") !== null)
			document.body.attributes.removeNamedItem("style")
		document.body.classList.remove("light-theme")
		document.body.classList.add("dark-theme")
	})
}