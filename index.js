import "./themePicker.js";
import { TinyColor, mostReadable } from "https://cdn.jsdelivr.net/npm/@ctrl/tinycolor@4.0/+esm";
import slimSelect from "https://cdn.jsdelivr.net/npm/slim-select@2.6/+esm";
import { themePicker } from "./themePicker.js";
(() => {
    themePicker();
    const select = new slimSelect({
        select: "#format",
        settings: { showSearch: false },
        events: { afterChange: (newVal) => setColorNameFormat(newVal[0].value) }
    });
    const validColorNameFormats = ["rgb", "prgb", "hex6", "hsl", "hsv", "off"];
    const defaultColorNameFormat = "rgb";
    select.setSelected(defaultColorNameFormat);
    const themePickerButtons = document.querySelectorAll(".theme-picker button");
    const boxes = document.body.querySelectorAll(".box:nth-child(n+2)");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', e => {
            const style = window.getComputedStyle(e.target);
            const bgColor = style.getPropertyValue('background-color');
            document.body.style.backgroundColor = bgColor;
            themePickerButtons[0].style.textDecoration = "none";
            themePickerButtons[1].style.textDecoration = "none";
            themePickerButtons[2].style.textDecoration = "underline";
        });
    }
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
    const containers = document.querySelectorAll("body .container");
    containers.forEach((container, outerIndex) => {
        const boxes = container.getElementsByClassName("box");
        [...boxes].forEach((box, innerIndex) => {
            if (innerIndex === 0)
                box.textContent = `DR ${outerIndex + 1}`;
            else {
                const color = drColors[outerIndex][innerIndex - 1];
                box.style.backgroundColor = color;
                const colorObj = new TinyColor(color);
                const contrastColor = mostReadable(colorObj, drColors[outerIndex]);
                if (typeof contrastColor === "string")
                    box.style.color = contrastColor;
                box.textContent = colorObj.toString(defaultColorNameFormat);
            }
        });
    });
    function setColorNameFormat(format) {
        if (validColorNameFormats.includes(format)) {
            const boxes = document.querySelectorAll(".box:nth-child(n+2)");
            [...boxes].forEach(box => {
                if (format === "off")
                    box.textContent = "";
                else {
                    const color = new TinyColor(box.style.backgroundColor);
                    const colorString = color.toString(format);
                    box.textContent = colorString;
                }
            });
        }
    }
    document.body.hidden = false;
})();
//# sourceMappingURL=index.js.map