"use strict";

class AbilityAtom{
    constructor(name, text, costFunc) {
        this.name = name;
        this.text = text;
        this.costFunc = costFunc;
    }

    getCost(x) {
        return this.costFunc(x);
    }

    getText(x) {
        return this.text.replaceAll("X", x);
    }
}
export default AbilityAtom;
