"use strict";

// This file is for general purpose functions
// Functions in this file:
//   (a) must be usable in any part of the system
//   (b) cannot know anything about our system
//   (c) must be copy+pastable into other projects with 0 changes and still work
// If a function does not satisfy all three of these conditions,
// it does NOT belong in this file!


//Returns true if the given string is null, undefined, empty string, or only white space
function isEmpty(str) {
    return !str || !str.trim();
}

function isString(s) { return s === "" + s; }

//2019-10-31: copied from https://stackoverflow.com/a/1421988/2336212
function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

//2023-02-27: constructed after consulting https://stackoverflow.com/q/14636536/2336212
function isInteger(n) { return isNumber(n) && Math.floor(n) === n; }

function $(id) {
    return document.getElementById(id);
}

Math.clamp = function (value, min, max) {
    if (min > max) {
        console.error("Min should be less than or equal to max!",
            "min:", min,
            "max:", max
        );
    }
    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );
}

let between = function (value, min, max) {
    return (min <= value && value <= max);
}

//Cuts decimals off the given value so that only the given number of places remains
Math.cut = function (value, places = 0) {
    let factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
}

//2024-01-30: copied from https://stackoverflow.com/a/9705160/2336212
function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
//2024-01-30: copied from https://stackoverflow.com/a/9705160/2336212
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function loopAngle(angle) {
    return (angle + 360 * Math.ceil(Math.abs(angle / 360))) % 360;
}

function loop(n, min, max) {
    const diff = max - min;
    return (n + diff * Math.ceil(Math.abs(n / diff))) % diff + min;
}

function getDisplayDate(date) {
    date ??= new Date();
    // MM/DD HH:MM
    return `${date.getMonth() + 1}/${date.getDate()}`
        + " "
        + `${date.getHours()}:${('' + date.getMinutes()).padStart(2, '0')}`;
}

function getDisplayDateToolTip(date) {
    date ??= new Date();
    // MM/DD/YYYY HH:MM
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        + " "
        + `${date.getHours()}:${('' + date.getMinutes()).padStart(2, '0')}`;
}


    //2022-07-19: copied from https://stackoverflow.com/a/19494146/2336212
    export function arrayEquals(array, arr1) {
        return array === arr1 ||
            array.length === arr1.length &&
            array.every((item, i) => item === arr1[i]);
    }

    export function arrayMin (array, minFunc = (val) => val) {
        return array.reduce(
            (acc, cur) => Math.min(minFunc(cur), acc),
            minFunc(array[0])
        );
    }
    export function arrayMax  (array, maxFunc = (val) => val) {
        return array.reduce(
            (acc, cur) => Math.max(maxFunc(cur), acc),
            maxFunc(array[0])
        );
    }

    export function arraySum(array, sumFunc = (val) => val) {
        return array.reduce(
            (acc, cur) => sumFunc(cur) + acc,
            0
        );
    }

    export function arrayRemove  (array, value) {
        let index = array.indexOf(value);
        if (index >= 0) {
            array.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Returns a new array with the duplicates removed
     */
    export function arrayRemoveDuplicates (array) {
        let arr = [];
        array.forEach(n => {
            if (!arr.includes(n)) {
                arr.push(n);
            }
        });
        return arr;
    }


/**
 * Returns a random number between min and max, inclusive
 * */
function randomRange(min, max) {
    if (min > max) {
        console.error("Min should be less than or equal to max!",
            "min:", min,
            "max:", max
        );
    }
    return (Math.random() * (max - min)) + min;
}

/**
 * Returns a random item from the given array
 * */
function randomItem(array) {
    if (!Array.isArray(array)) {
        console.error("Value must be an array!", array);
    }
    let index = randomRange(0, array.length - 1);
    return array[index];
}

/**
 * Returns a random valid index in the given array
 * */
function randomIndex(array) {
    if (!Array.isArray(array)) {
        console.error("Value must be an array!", array);
    }
    let index = randomRange(0, array.length - 1);
    return index;
}

function createImage(name, url) {
    let image = new Image();
    image.name = name;
    image.src = url;
    return image;
}

const PIXEL_TRANSPARENT = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC';

function isValidImage(imageURL) {
    return imageURL && imageURL !== PIXEL_TRANSPARENT;
}

const tempCanvas = document.createElement("canvas");
const tempCTX = tempCanvas.getContext('2d', { willReadFrequently: true });

function getImageData(img) {
    //2024-01-25: copied from https://stackoverflow.com/a/8751659/2336212
    let canvas = tempCanvas;
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = tempCTX;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    return ctx.getImageData(0, 0, img.width, img.height);
}

function imageHasTransparency(img, threshold = 254) {
    let data = getImageData(img).data;
    for (let i = 3; i < data.length; i += 4) {
        if (data[i] <= threshold) {
            return true;
        }
    }
    return false;
}

function flipImage(img, flipX, flipY) {
    let canvas = tempCanvas;
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = tempCTX;
    //2024-01-30: copied from https://stackoverflow.com/a/42856641/2336212
    ctx.save();  // save the current canvas state
    ctx.setTransform(
        (flipX) ? -1 : 1,
        0, // set the direction of x axis
        0,
        (flipY) ? -1 : 1,   // set the direction of y axis
        (flipX) ? img.width : 0, // set the x origin
        (flipY) ? img.height : 0   // set the y origin
    );
    ctx.drawImage(img, 0, 0);
    ctx.restore(); // restore the state as it was when this function was called
    //
    let newImage = new Image();
    newImage.src = canvas.toDataURL();
    return newImage;
}

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function copyObject(obj, stringify, prototype) {
    let obj2 = JSON.parse(JSON.stringify(obj, stringify));
    if (prototype) {
        Object.setPrototypeOf(obj2, prototype);
    }
    return obj2;
}

function inflateObject(obj, prototype, delegates = []) {

    //Early exit
    if (!obj) {
        console.error("Cannot inflate null obj!", obj);
        return false;
    }

    //Prototype
    Object.setPrototypeOf(obj, prototype);

    // //Delegates
    // for (let key of delegates) {
    //     obj[key] = new Delegate();
    // }

    return true;

}

//2024-03-05: copied from https://stackoverflow.com/a/16599668/2336212
export function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

export function getDateString() {
    return new Date().toISOString().slice(0, 10);
}


function getMemorySize(json) {
    if (!json) return 0;
    let size = json.length;
    return size;
}

/**
 * Gets the size display text for the given json string, or the given length
*/
function getMemorySizeText(json) {
    let length = (isNumber(json)) ? json : getMemorySize(json);
    let size = length * 2;
    if (size > 1000000) {
        size = Math.round(size / 100000) / 10;
        return size + " MB";
    }
    if (size > 1000) {
        size = Math.round(size / 1000);
        return size + " KB";
    }
    size = Math.round(size / 100) / 10;
    return size + " KB";
}

function validateIndexBounds(value, max, name) {
    name ??= "variable";
    let min = 0;
    if (value < min || max <= value) {
        console.error(`${name} is out of bounds [${min}, ${max - 1}]!:`, value);
        return false;
    }
    return true;
}

export function makeUserFacing(str) {
    return capitalizeFirstLetters(str.replaceAll("-", " "));
}

export function capitalizeFirstLetters(str) {
    return str
        .split(" ")
        .map(word => word.substring(0, 1).toUpperCase() + word.substring(1))
        .join(" ");
}

const REGEXP_FLOAT = new RegExp("-?(([0-9]+.?[0-9]*)|([0-9]*.?[0-9]+))", "g");
function cleanInput(value, regexp = REGEXP_FLOAT) {
    let parts = [];
    let matches = value.matchAll(regexp);
    for (let s of matches) {
        parts.push(s);
    }
    return parts.map(a => a[0]).join("");
}

function parseFloatInput(txt) {
    let f = parseFloat(txt);
    if (!isNumber(f)) {
        txt = cleanInput(txt, REGEXP_FLOAT);
        f = parseFloat(txt);
        if (!isNumber(f)) {
            f = undefined;
        }
    }
    return f;
}

function parseFootInchInput(txt) {
    let regexpstr = REGEXP_FLOAT.source + "\' *" + REGEXP_FLOAT.source + "\"";
    txt = cleanInput(txt, new RegExp(regexpstr, "g"));
    let split = txt.split(/["']/);
    let f = parseFloat(split[0]) + (parseFloat(split[1]) / 12);
    if (!isNumber(f)) {
        f = undefined;
    }
    return f;
}

function log(...params) {
    console.log(...params);
}
