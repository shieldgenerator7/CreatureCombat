"use strict";

class AbilityAtom {
    constructor(name, text, costFunc, symbol) {
        this.name = name;
        this.text = text;
        this.costFunc = costFunc;
        this.symbol = symbol;
    }

    getCost(...x) {
        return this.costFunc(...x);
    }

    getText(x) {
        return this.text.replaceAll("X", x);
    }

    getSymbol(x) {
        return this.symbol?.replaceAll("X", x)
            ?? this.getText(x);
    }
}
export default AbilityAtom;
