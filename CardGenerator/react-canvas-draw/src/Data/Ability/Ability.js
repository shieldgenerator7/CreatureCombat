"use strict";

import { capitalizeFirstLetters } from "../../Utility/Utility";
import { abilityAtoms } from "../AbilityData";
import AbilityLine from "../AbilityLine";

const stringifyAbility = [
    "name",
    "codeText",
    "params",
]

export const DISPLAY_LINE_FULL = "full";
export const DISPLAY_LINE_KEYWORD_WITH_REMINDER = "keyword with reminder";
export const DISPLAY_LINE_KEYWORD_ONLY = "keyword only";

class Ability {
    constructor(name, codeText, params) {
        this.name = name;
        this.codeText = codeText;
        this.params = params;
        this.lineDisplayOptions = undefined;
        this.init();
    }
    init() {
        this.lines = this.codeText
            .split("\n")
            .slice(1)
            .map(line => new AbilityLine(line));
        this.lineDisplayOptions ??= this.lines.map(l => DISPLAY_LINE_FULL);
    }

    get FullText() {
        let sentenceStart = true;
        let reminders = {};
        let text =`*${this.name}*   `+
            this.lines.map((line, i, arr) => {
            let atom = line.atom;
            if (!atom) {
                return `[Unknown atom: "${line.atomName}"]`;
            }
                let segment = "";
                switch (this.lineDisplayOptions[i]) {
                    case DISPLAY_LINE_FULL:
                        segment = atom.text.trim();
                        break;
                    case DISPLAY_LINE_KEYWORD_WITH_REMINDER:
                        let name = `*${atom.name.trim()}*`;
                        segment = name;
                        reminders[name] = atom.text.trim();
                        break;
                    case DISPLAY_LINE_KEYWORD_ONLY:
                        segment = `*${atom.name.trim()}*`;
                        break;
                }
            let j = 0;
            for (const [key, value] of Object.entries(atom.params)) {
                segment = segment.replaceAll(`{${key}}`, this.params[i]?.[j]);
                j++;
            }
            if (sentenceStart) {
                segment = capitalizeFirstLetters(segment, false, segment.match(/[a-zA-Z0-9\-]/).index+1);
                sentenceStart = false;
            }
            let sentenceEnd = true;//TODO: make this check current and next line
            if (sentenceEnd) {
                segment += ".";
                sentenceStart = true;
            }
            return segment;
            })
            .concat(
                Object.entries(reminders).map(([key, value]) => {
                    return `_${capitalizeFirstLetters( key)}: ${capitalizeFirstLetters(value,false)}._`;
                })
        )
            .flat(Infinity)
            .join(" ");
        return text;
    }
    updateDNA() {
        console.log("updateDNA_1", this.codeText);
        this.codeText = `${this.name}
        ${this.lines.map((line, i) =>
            line.getString()
        ).join("\n")}`;
        console.log("updateDNA_2", this.codeText);
    }
}
export default Ability;
export function newAbility(name, codeText, params) {
    return new Ability(name, codeText, params);
}

export function inflateAbility(ability) {
    Object.setPrototypeOf(ability, Ability.prototype);
    ability.init();
}
