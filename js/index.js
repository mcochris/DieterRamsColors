import themePicker from "./themePicker.js";
//	https://github.com/bgrins/TinyColor
//	@ts-expect-error - tinycolor2 is not a module
import tinycolor from "./tinycolor2.js";
{ //	Initialize theme picker
    themePicker();
    //	Define format picker buttons and default format
    const formatPickerButtons = document.querySelectorAll(".format-picker button");
    const defaultColorNameFormat = "rgb";
    //	Define theme picker buttons
    const themePickerButtons = document.querySelectorAll(".theme-picker button");
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
    ];
    //	Text colors for each Dieter Ram color box
    const drColorsText = [
        ["#0d0000", "#e1e4e1", "#0d0000", "#e1e4e1", "#e1e4e1"],
        ["#0d0000", "#e1e4e1", "#0d0000", "#0d0000", "#e1e4e1"],
        ["#0d0000", "#0d0000", "#e1e4e1", "#0d0000", "#0d0000"],
        ["#0d0000", "#0d0000", "#e1e4e1", "#0d0000", "#0d0000"],
        ["#e1e4e1", "#0d0000", "#e1e4e1", "#0d0000", "#0d0000"],
        ["#0d0000", "#0d0000", "#e1e4e1", "#e1e4e1", "#0d0000"],
        ["#e1e4e1", "#0d0000", "#e1e4e1", "#e1e4e1", "#e1e4e1"],
        ["#e1e4e1", "#0d0000", "#0d0000", "#0d0000", "#0d0000"],
        ["#0d0000", "#0d0000", "#e1e4e1", "#0d0000", "#0d0000"],
        ["#e1e4e1", "#0d0000", "#0d0000", "#e1e4e1", "#0d0000"]
    ];
    //	containers: all the rows of color boxes
    //	boxes: all the color boxes
    //	textElements: all the text elements in the body
    const containers = document.querySelectorAll("body .container");
    const boxes = document.body.getElementsByClassName("box");
    const textElements = document.body.getElementsByClassName("text");
    //	Loop through all the boxes in all the containers and set their background color and text content
    containers.forEach((container, outerIndex) => {
        const boxes = container.getElementsByClassName("box");
        [...boxes].forEach((box, innerIndex) => {
            const color = drColors[outerIndex][innerIndex];
            box.style.backgroundColor = color;
            const colorObj = new tinycolor(color);
            box.style.color = drColorsText[outerIndex][innerIndex];
            box.textContent = colorObj.toString(defaultColorNameFormat);
        });
    });
    //	Define what to do when one of the color boxes are clicked
    //	First, set the document body background color to the color of the box that was clicked
    //	Second, set the text decoration of the theme picker buttons to none, and underline the third one
    //	Third, set the body text color to the appropriate color to contrast with the new background color
    for (let i = 0; i < boxes.length; i++)
        boxes[i].addEventListener('click', e => {
            e.preventDefault();
            //	First:
            const style = getComputedStyle(e.target);
            const bgColor = style.getPropertyValue('background-color');
            document.body.style.backgroundColor = bgColor;
            //	Second:
            themePickerButtons[0].style.textDecoration = "none";
            themePickerButtons[1].style.textDecoration = "none";
            themePickerButtons[2].style.textDecoration = "underline";
            //	Third:
            const color = new tinycolor(bgColor);
            const newColor = tinycolor.mostReadable(color, drColors.flat()).toString();
            [...textElements].forEach(textElement => textElement.style.color = newColor.toString("rgb"));
        });
    //	Define what to do when one of the format picker buttons are clicked
    //	First, set the text decoration of the default format underline and all the others to none
    //	Second, add a eventlistener to each format button
    //	Third, set the text decoration of all the format buttons to "none" to un-underline previous selection
    //	Fourth, set the text decoration of the format button that was clicked to "underline"
    //	Fifth, loop through all the boxes and set the text content to the selected format
    for (let i = 0; i < formatPickerButtons.length; i++) {
        //	First:
        if (formatPickerButtons[i].value === defaultColorNameFormat)
            formatPickerButtons[i].style.textDecoration = "underline";
        else
            formatPickerButtons[i].style.textDecoration = "none";
        //	Second:
        formatPickerButtons[i].addEventListener("click", e => {
            e.preventDefault();
            const format = e.target.value;
            if (format === undefined) {
                console.error("Invalid color name format");
                return;
            }
            //	Third:
            for (let j = 0; j < formatPickerButtons.length; j++)
                formatPickerButtons[j].style.textDecoration = "none";
            //	Fourth:
            e.target.style.textDecoration = "underline";
            //	Fifth:
            containers.forEach((container, outerIndex) => {
                const boxes = container.getElementsByClassName("box");
                [...boxes].forEach((box, innerIndex) => {
                    if (format === "off")
                        box.textContent = "";
                    else {
                        box.style.color = drColorsText[outerIndex][innerIndex];
                        box.textContent = tinycolor(drColors[outerIndex][innerIndex]).toString(format);
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=index.js.map