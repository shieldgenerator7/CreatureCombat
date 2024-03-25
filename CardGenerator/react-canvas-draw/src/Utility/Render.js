"use strict";

import { FIT_WHOLE, FIT_WIDTH, FIT_HEIGHT, FIT_FILL } from "../Data/Creature";
import { DRAWLAYER_BOX, DRAWLAYER_CIRCLE, DRAWLAYER_IMAGE, DRAWLAYER_TEXT } from "../Data/DrawLayer";
import Vector2, { VECTOR2_ZERO } from "../Data/Vector2";
import { VERSION } from "../Version";
import { arraySort, getDateString, getLines } from "./Utility";

//
// Renders the given card to the given canvas with the given draw layers
//

export const RESOLUTION = 300;

export function renderCard(card, canvas, drawData) {
    const context = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    //Process layers
    drawData.forEach(draw => {
        switch (draw.type) {
            case DRAWLAYER_BOX:
                context.fillStyle = draw.getInfo(card) ?? draw.color;
                context.fillRect(draw.position.x, draw.position.y, draw.size.x, draw.size.y);
                break;
            case DRAWLAYER_CIRCLE:
                context.beginPath();
                context.arc(
                    draw.position.x,
                    draw.position.y,
                    draw.size.x,
                    0,
                    2 * Math.PI
                );
                context.fillStyle = draw.getInfo(card) ?? draw.color;
                context.fill();
                break;
            case DRAWLAYER_IMAGE:
                let img = draw.getInfo(card);
                if (!img) { return; }
                //fit picture
                let pos = draw.position.clone();
                let size = draw.size.clone();
                let width = img.width;
                let height = img.height;
                let spos = VECTOR2_ZERO.clone();
                let ssize = new Vector2(img.width, img.height);
                if (width != size.x || height != size.y) {
                    let wRatio = size.x / width;
                    let hRatio = size.y / height;
                    const fitWidth = () => {
                        let newHeight = height * wRatio;
                        let newY = pos.y + (size.y - newHeight) / 2;
                        if (newHeight > size.y) {
                            let diff = (newHeight - size.y) / wRatio;
                            ssize.y = height - diff;
                            spos.y = 0 + diff / 2;
                        }
                        else {
                            size.y = newHeight;
                            pos.y = newY;
                        }
                    }
                    const fitHeight = () => {
                        let newWidth = width * hRatio;
                        let newX = pos.x + (size.x - newWidth) / 2;
                        if (newWidth > size.x) {
                            let diff = (newWidth - size.x) / hRatio;
                            ssize.x = width - diff;
                            spos.x = 0 + diff / 2;
                        }
                        else {
                            size.x = newWidth;
                            pos.x = newX;
                        }
                    }
                    switch (card.imageFit) {
                        case FIT_WHOLE:
                            if (wRatio < hRatio) {
                                fitWidth();
                            }
                            else {
                                fitHeight();
                            }
                            break;
                        case FIT_FILL:
                            if (wRatio > hRatio) {
                                fitWidth();
                            }
                            else {
                                fitHeight();
                            }
                            break;
                        case FIT_WIDTH:
                            fitWidth();
                            break;
                        case FIT_HEIGHT:
                            fitHeight();
                            break;
                        default:
                            console.error("unknown fit:", card.imageFit);
                    }

                }
                //draw
                context.drawImage(
                    img,
                    spos.x, spos.y, ssize.x, ssize.y,
                    pos.x, pos.y, size.x, size.y,
                );
                break;
            case DRAWLAYER_TEXT:
                const text = draw.getInfo(card);
                const format = draw.getFormat(card) ?? {};
                const padding = format.padding ?? draw.size.y * 0.05;
                let fontSize = draw.size.y - (padding * 2);
                context.font = `${fontSize}px Arial`;
                const measurement = context.measureText(text);
                let x;
                const padLeft = format.padding_left ?? padding;
                const padRight = format.padding_right ?? padding;
                const textalign = format.text_align ?? "left";
                switch (textalign) {
                    case "left":
                        x = draw.position.x + padLeft;
                        break;
                    case "right":
                        x = draw.position.x + draw.size.x - measurement.width - padRight;
                        break;
                    case "center":
                        let diff = draw.size.x - measurement.width - padLeft - padRight;
                        x = draw.position.x + diff / 2 + padLeft;
                        break;
                    default:
                        console.error("unknown textalign value: ", textalign);
                }
                let y = draw.position.y + draw.size.y - (padding * 1.3);
                context.fillStyle = draw.getColor(card) ?? draw.color;
                context.fillText(text, x, y);
                break;
            default:
                console.error("unknown draw layer type:", draw.type);
        }
    });

    // Back Boxes
    const bufferBase = 0.1 * RESOLUTION;
    const textRow = 0.25 * RESOLUTION;

    //Ability Cost (TEST)
    // context.beginPath();
    // context.arc(
    //     bufferBase * 8.35,
    //     textRow * 10.4,
    //     15,
    //     0,
    //     2 * Math.PI
    // );
    // context.fillStyle = 'grey';
    // context.fill();

    // text

    context.fillStyle = card.colors[3];
    let fontSize;

    //Ability Box (Rest Count, Abilities, Flavor Text)
    context.fillStyle = card.colors[4];
    fontSize = 0.3;
    context.font = `${textRow * fontSize}px Arial`;
    let abilityStartY = textRow * 10.5;
    const MAX_WIDTH_TEXT = width - bufferBase * 4;
    let remindersSeen = [];
    let restLines = getLines(context, card.getRestText(true), MAX_WIDTH_TEXT);
    let flavorLines = getLines(context, `_${card.flavorText.trim()}_`, MAX_WIDTH_TEXT)
        .filter(l => l);
    let abilityLines = [
        restLines,
        card.abilities
            .map(ability => {
                let reqsym = ability.RequirementSymbol;
                if (reqsym && !remindersSeen.includes(reqsym)) {
                    remindersSeen.push(reqsym);
                    return ability.FullTextWithReminders;
                }
                return ability.FullText;
            })
            .map(text => getLines(context, text, MAX_WIDTH_TEXT)),
        flavorLines
    ]
        .flat(Infinity)
        .filter(l => l);
    if (abilityLines.length > 5) {
        restLines = getLines(context, card.getRestText(false), MAX_WIDTH_TEXT);
        abilityLines = [
            restLines,
            card.abilities
                .map(ability => ability.FullText)
                .map(text => getLines(context, text, MAX_WIDTH_TEXT)),
            flavorLines
        ]
            .flat(Infinity)
            .filter(l => l);
    }
    const LINEHEIGHT = 0.1 * RESOLUTION;
    let bold = false;
    let italic = false;
    abilityLines.forEach((line, i) => {
        context.font = `${textRow * fontSize}px Arial`;
        //bold fill change
        const boldSymbol = "*";
        const italicSymbol = "_";
        let x = 0 + bufferBase * 2;
        [...line].forEach(char => {
            if (char == boldSymbol) {
                bold = !bold;
            }
            else if (char == italicSymbol) {
                italic = !italic;
            }
            //write char
            else {
                context.font = `${(bold) ? "bold " : ""}${(italic) ? "italic " : ""}${textRow * fontSize}px Arial`;
                context.fillText(
                    char,
                    x,
                    abilityStartY + LINEHEIGHT * i
                );
                x += context.measureText(char).width;
            }
        });
    });
    //Ability Cost (TEST)
    // context.fillStyle = 'white';
    // fontSize = 0.3;
    // context.font = `${textRow * fontSize}px Arial`;
    // context.fillText(
    //     "-1",
    //     0 + bufferBase * 8,
    //     textRow * 10.5
    // );
    //

    //Biome Modifiers
    context.fillStyle = card.colors[4];
    fontSize = 0.35;
    context.font = `${textRow * fontSize}px Arial`;
    let bmStartY = height - bufferBase * 3.5 - fontSize * 70;
    let bmLineHeight = 0.1 * RESOLUTION;
    let bmStartX = 0 + bufferBase * 4.7;
    let bmBufferX = width * 0.15;
    let bmModOffset = bmBufferX * 0.15;
    let bmList = [...card.biomeModifiers];
    arraySort(bmList, (bm) => bm.modifier * -1);
    bmList.forEach((bm, i) => {
        let drawX = bmStartX + bmBufferX * i;
        context.fillText(
            bm.biome?.trim() || `[biome ${i + 1}]`,
            drawX,
            bmStartY
        );
        context.fillText(
            ((bm.modifier > 0) ? "+" : "") + bm.modifier,
            drawX + bmModOffset,
            bmStartY + bmLineHeight
        )
    });
    //Card Info
    let creditsX = 0 + bufferBase * 2.9;
    let creditsY = height - bufferBase * 1.4;
    context.fillStyle = 'white';
    fontSize = 0.2;
    context.font = `${textRow * fontSize}px Arial`;
    context.fillText(
        "Id: " + card.id,
        creditsX,
        creditsY
    );
    context.fillText(
        "Variant: " + card.variant,
        creditsX + bufferBase * 6,
        creditsY
    );
    const oneOrBoth = (saved, current, extra = "") => {
        let str = `${extra}${saved}`;
        if (saved != current) {
            str += ` - ${extra}${current}`;
        }
        return str;
    }
    let dateString = oneOrBoth(card.creationDate, getDateString());
    context.fillText(
        `Creation Date: ${dateString}`,
        creditsX + bufferBase * 12,
        creditsY
    );
    let versionString = oneOrBoth(card.editorVersion, VERSION, "v");
    context.fillText(
        `www.creaturecombat.io           ${versionString}`,
        creditsX + bufferBase * 0.2,
        creditsY + bufferBase / 2
    );
}
