"use strict";

import { abilityAtoms } from "../AbilityData";
import AbilityLine from "../AbilityLine";

const stringifyAbility = [
    "name",
    "codeText",
    "params",
]

class Ability {
    constructor(name, codeText, params) {
        this.name = name;
        this.codeText = codeText;
        this.lines = this.codeText
            .split("\n")
            .slice(1)
            .map(line => new AbilityLine(line));
        this.params = params;
    }

    get FullText() {
        let sentenceStart = true;
        let text = this.lines.map((line, i, arr) => {
            let atom = abilityAtoms[line.atom];
            let segment = atom.text.trim();
            //Object.getOwnPropertyNames().forEach();
            atom.params.forEach(([key, value], j) => {
                segment.replace(`{${key}}`, params[i][j]);
            })
            if (sentenceStart) {
                segment = segment.substring(0, 1).toUpperCase() + segment.substring(1);
                sentenceStart = false;
            }
            let sentenceEnd = true;//TODO: make this check current and next line
            if (sentenceEnd) {
                segment += ".";
                sentenceStart = true;
            }
            return segment;
        })
            .join(" ");
    }
}
export default Ability;