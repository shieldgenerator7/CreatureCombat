"use strict";

import { abilityAtoms } from "../AbilityData";
import AbilityLine from "../AbilityLine";

class Ability {
    constructor(name, codeText, params) {
        this.name = name;
        this.codeText = codeText;
        this.lines = this.codeText.split("\n").slice(1).map(line => new AbilityLine);
        this.params = params;
    }

    get FullText() {
        let sentenceStart = true;
        let text = this.lines.forEach((line, i, arr) => {
            let atom = abilityAtoms[line.atom];
            let segment = atom.text;
            //Object.getOwnPropertyNames().forEach();
            atom.params.forEach(([key, value], j) => {
                segment.replace(`{${key}}`, params[i][j]);
                //...
            })
            //...
        });
    }
}
