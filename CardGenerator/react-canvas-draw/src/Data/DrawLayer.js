"use strict";

import Vector2, { VECTOR2_ZERO } from "./Vector2";

export const DRAWLAYER_BOX = "box";
export const DRAWLAYER_CIRCLE = "circle";
export const DRAWLAYER_IMAGE = "image";
export const DRAWLAYER_TEXT = "text";

class DrawLayer {
    constructor(type, color = 'black', pos = VECTOR2_ZERO, size = VECTOR2_ZERO, infoFunc, colorFunc) {
        this.type = type;
        this.color = color;
        this.position = pos.clone();
        this.size = size.clone();
        this.infoFunc = infoFunc;
        this.colorFunc = colorFunc;
    }

    getInfo(card) {
        return this.infoFunc?.(card);
    }

    getColor(card) {
        return this.colorFunc?.(card);
    }
}

export default DrawLayer;
