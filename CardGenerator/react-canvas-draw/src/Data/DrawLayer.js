"use strict";

import Vector2, { VECTOR2_ZERO } from "./Vector2";

export const DRAWLAYER_BOX = "box";
export const DRAWLAYER_CIRCLE = "circle";
export const DRAWLAYER_IMAGE = "image";

class DrawLayer {
    constructor(type, color = 'black', pos = VECTOR2_ZERO, size = VECTOR2_ZERO, infoFunc) {
        this.type = type;
        this.color = color;
        this.position = pos.clone();
        this.size = size.clone();
        this.infoFunc = infoFunc;
    }

    getInfo(card) {
        return this.infoFunc?.(card);
    }
}

export default DrawLayer;
