"use strict";

import DrawLayer, { DRAWLAYER_BOX, DRAWLAYER_IMAGE } from "./DrawLayer";
import Vector2, { VECTOR2_ZERO } from "./Vector2";

export function generateCardSkin(width, height, margin, padding) {
    const rowheight = height / 17;
    const marginWidth = width - margin * 2;
    const markersY = [
        margin + rowheight * 2.4,
        margin + rowheight * 3.4,
        margin + rowheight * 11.4,
        margin + rowheight * 15.4,
    ];
    let cardSkin = [
        //black
        new DrawLayer(
            DRAWLAYER_BOX,
            'black',
            VECTOR2_ZERO,
            new Vector2(width, height),
        ),
        //background
        new DrawLayer(
            DRAWLAYER_BOX,
            'white',
            new Vector2(margin, margin),
            new Vector2(marginWidth, height - margin * 2),
            (card) => card.colors[0]
        ),
        //image
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(margin, markersY[1]),
            new Vector2(marginWidth, markersY[2]-markersY[1]),
            (card) => card.imgPortrait
        ),
        //type bg
        new DrawLayer(
            DRAWLAYER_BOX,
            '#dbd69e',
            new Vector2(margin, markersY[0]),
            new Vector2(marginWidth, markersY[1]-markersY[0]),
            (card) => card.colors[1]
        ),
        //text area bg
        new DrawLayer(
            DRAWLAYER_BOX,
            '#dbd69e',
            new Vector2(margin, markersY[2]),
            new Vector2(marginWidth, markersY[3]-markersY[2]),
            (card) => card.colors[1]
        ),
        //text border
        new DrawLayer(
            DRAWLAYER_BOX,
            'black',
            new Vector2(margin, markersY[2]),
            new Vector2(marginWidth, rowheight * 0.2)
        ),
        //card info bg
        new DrawLayer(
            DRAWLAYER_BOX,
            'black',
            new Vector2(margin, markersY[3]),
            new Vector2(marginWidth, rowheight * 2)
        ),
    ];
    return cardSkin;
}
