"use strict";

import { capitalizeFirstLetters, clamp, isNumber } from "../../Utility/Utility";
import { LINETYPE_EFFECT } from "../AbilityConstants";
import { abilityAtoms } from "../AbilityData";
import AbilityLine from "../AbilityLine";

const stringifyAbility = [
    "name",
    "codeText",
    "params",
]

export const DISPLAY_LINE_FULL = "full";
export const DISPLAY_LINE_KEYWORD_WITH_REMINDER = "reminder";
export const DISPLAY_LINE_KEYWORD_ONLY = "keyword";

class Ability {
    constructor(name, codeText, params) {
        this.name = name ?? "";
        this.codeText = codeText ?? name;
        this.params = params ?? [];
        this.init();
    }
    init() {
        this.lines = this.codeText
            ?.split("\n")
            .slice(1)
            .map(line => new AbilityLine(line))
            ?? [];
        this.params ??= [];
        this.lines.forEach((l, i) => {
            this.params[i] ??= l.params ?? [];
        })
        this.colonIndex = this.lines.indexOf(this.lines.find(l => l.type == LINETYPE_EFFECT)) - 1;
        this.lineDisplayOptions ??= [];
        this.lines.forEach((l, i) => {
            this.lineDisplayOptions[i] ??= DISPLAY_LINE_FULL;
        })
    }

    addLine(line) {
        line ??= new AbilityLine("> choose");
        this.lines.push(line);
        this.lineDisplayOptions.push(DISPLAY_LINE_FULL);
        //
        this.updateDNA();
    }
    removeLine(index = this.lines.length - 1) {
        this.lines.splice(index, 1);
        //
        this.updateDNA();
    }
    moveLine(fromIndex, toIndex) {
        fromIndex = clamp(fromIndex, 0, this.lines.length - 1);
        toIndex = clamp(toIndex, 0, this.lines.length - 1);
        //
        let swap = this.lines[fromIndex];
        this.lines[fromIndex] = this.lines[toIndex];
        this.lines[toIndex] = swap;
        //
        this.updateDNA();
    }

    get FullText() {
        let sentenceStart = true;
        let reminders = {};
        let text = `*${this.name}* — ` +
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
                    case DISPLAY_LINE_KEYWORD_WITH_REMINDER: {
                        let name = `*${capitalizeFirstLetters(atom.name.trim())}`;
                        let reminder = atom.text.trim();
                        Object.entries(atom.params).forEach(([key, value], j) => {
                            let number = this.params[i]?.[j];
                            if (isNumber(number)) {
                                name += ` ${number}`;
                            }
                            reminder = reminder.replaceAll(`{${key}}`, number);
                        })
                        name += "*";
                        reminders[name] = reminder;
                        segment = name;
                    } break;
                    case DISPLAY_LINE_KEYWORD_ONLY: {
                        let name = `*${atom.name.trim()}`;
                        let reminder = atom.text.trim();
                        Object.entries(atom.params).forEach(([key, value], j) => {
                            let number = this.params[i]?.[j];
                            if (isNumber(number)) {
                                name += ` ${number}`;
                            }
                        })
                        name += "*";
                        segment = name;
                    } break;
                }
                let j = 0;
                //console.log("params", this.params);
                for (const [key, value] of Object.entries(atom.params)) {
                    //  console.log("key,value", key, value);
                    switch (this.lineDisplayOptions[i]) {
                        case DISPLAY_LINE_FULL:
                            segment = segment.replaceAll(`{${key}}`, this.params[i]?.[j]);
                            break;
                        case DISPLAY_LINE_KEYWORD_WITH_REMINDER:
                            // segment = [segment, ...this.params[i].filter(v => isNumber(v))].join(" ");
                            break;
                        case DISPLAY_LINE_KEYWORD_ONLY:
                            // segment = [segment, ...this.params[i].filter(v => isNumber(v))].join(" ");
                            break;
                    }
                    j++;
                }
                if (sentenceStart) {
                    let match = segment.match(/[a-zA-Z0-9\-]/);
                    if (match) {
                        segment = capitalizeFirstLetters(segment, false, match.index + 1);
                        sentenceStart = false;
                    }
                    else if (segment) {
                        console.error("segment doesnt match!", segment);
                    }
                }
                let sentenceEnd = true;//TODO: make this check current and next line
                if (sentenceEnd) {
                    segment += (this.colonIndex == i) ? ":" : (this.colonIndex > i) ? "," : ".";
                    sentenceStart = true;
                }
                return segment;
            })
                .concat(
                    Object.entries(reminders).map(([key, value]) => {
                        return `_(${capitalizeFirstLetters(key)}: ${capitalizeFirstLetters(value, false)})_`;
                    })
                )
                .flat(Infinity)
                .join(" ");
        return text;
    }
    get FullTextHtml() {
        return this.FullText
            .replaceAll(/\*([^\*]*)\*/g, "<span class='b'>$1</span>")
            .replaceAll(/\_([^\_]*)\_/g, "<span class='i'>$1</span>");
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

export function inflateAbility(ability) {
    Object.setPrototypeOf(ability, Ability.prototype);
    ability.init();
}
