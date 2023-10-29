import themePicker from "./themePicker.js";
import { TinyColor, mostReadable } from "@ctrl/tinycolor";
themePicker();
const formatPickerButtons = document.querySelectorAll(".format-picker button");
const defaultColorNameFormat = "rgb";
const themePickerButtons = document.querySelectorAll(".theme-picker button");
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
];
const drColorsFlat = drColors.flat();
const containers = document.querySelectorAll("body .container");
const boxes = document.body.getElementsByClassName("box");
const textElements = document.body.getElementsByClassName("text");
containers.forEach((container, outerIndex) => {
    const boxes = container.getElementsByClassName("box");
    if (boxes) {
        [...boxes].forEach((box, innerIndex) => {
            const color = drColors[outerIndex][innerIndex];
            box.style.backgroundColor = color;
            const colorObj = new TinyColor(color);
            const contrastColor = mostReadable(colorObj, drColorsFlat)?.toString(defaultColorNameFormat);
            if (typeof contrastColor === "string")
                box.style.color = contrastColor;
            box.textContent = colorObj.toString(defaultColorNameFormat);
        });
    }
});
for (let i = 0; i < boxes.length; i++)
    boxes[i].addEventListener('click', e => {
        const style = getComputedStyle(e.target);
        const bgColor = style.getPropertyValue('background-color');
        document.body.style.backgroundColor = bgColor;
        themePickerButtons[0].style.textDecoration = "none";
        themePickerButtons[1].style.textDecoration = "none";
        themePickerButtons[2].style.textDecoration = "underline";
        const color = new TinyColor(bgColor);
        const newColor = mostReadable(color, drColorsFlat);
        if (newColor !== null && typeof newColor.toString("rgb") === "string") {
            [...textElements].forEach(textElement => textElement.style.color = newColor.toString("rgb"));
        }
    });
for (let i = 0; i < formatPickerButtons.length; i++) {
    if (formatPickerButtons[i].value === defaultColorNameFormat)
        formatPickerButtons[i].style.textDecoration = "underline";
    else
        formatPickerButtons[i].style.textDecoration = "none";
    formatPickerButtons[i].addEventListener("click", e => {
        const format = e.target.value;
        if (format === undefined) {
            console.error("Invalid color name format");
            return;
        }
        for (let i = 0; i < formatPickerButtons.length; i++) {
            formatPickerButtons[i].style.textDecoration = "none";
        }
        e.target.style.textDecoration = "underline";
        [...boxes].forEach(box => {
            if (format === "off") {
                box.textContent = "";
            }
            else {
                const color = new TinyColor(box.style.backgroundColor);
                const newColor = mostReadable(color, drColorsFlat);
                if (newColor !== null) {
                    box.style.color = newColor.format;
                    box.textContent = newColor.format;
                }
            }
        });
    });
}
//# sourceMappingURL=index.js.map