{
	const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
	const themePickerButtons = document.querySelectorAll(".theme-picker button") as NodeListOf<HTMLButtonElement>;

	if (darkThemeMq.matches) {
		document.body.classList.add("dark-theme");
		themePickerButtons[1].style.textDecoration = "underline";
	} else {
		document.body.classList.add("light-theme");
		themePickerButtons[0].style.textDecoration = "underline";
	}
}