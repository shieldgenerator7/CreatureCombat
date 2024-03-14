"use strict";

export const VECTOR2_ZERO = new Vector2(0, 0);

class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }
}
export default Vector2;
