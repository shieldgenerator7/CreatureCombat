"use strict";

import { capitalizeFirstLetters, clamp, isNumber } from "../../Utility/Utility";
import { LINETYPE_COST, LINETYPE_EFFECT, LINETYPE_REQUIREMENT } from "../AbilityConstants";
import { abilityAtoms, findAtom } from "../AbilityData";
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
        this._updateLine(this.lines.length, line, line.params, DISPLAY_LINE_FULL);
        //
        this.updateDNA();
    }
    removeLine(index = this.lines.length - 1) {
        this.lines.splice(index, 1);
        this.params.splice(index, 1);
        this.lineDisplayOptions.splice(index, 1);
        //
        this.updateDNA();
    }
    moveLine(fromIndex, toIndex) {
        fromIndex = clamp(fromIndex, 0, this.lines.length - 1);
        toIndex = clamp(toIndex, 0, this.lines.length - 1);
        //
        let swap = "swap";
        this._updateLine(swap, this.lines[fromIndex], this.params[fromIndex], this.lineDisplayOptions[fromIndex]);
        this._updateLine(fromIndex, this.lines[toIndex], this.params[toIndex], this.lineDisplayOptions[toIndex]);
        this._updateLine(toIndex, this.lines[swap], this.params[swap], this.lineDisplayOptions[swap]);
        // _updateLine(swap, undefined, undefined, undefined);
        delete this.lines[swap];
        delete this.params[swap];
        delete this.lineDisplayOptions[swap];
        //
        this.updateDNA();
    }
    _updateLine(index, line, params, displayOptions) {
        this.lines[index] = line;
        this.params[index] = params;
        this.lineDisplayOptions[index] = displayOptions;
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
                            let param = this.params[i]?.[j] ?? line.params[j];
                            let number = param;
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
                            let param = this.params[i]?.[j] ?? line.params[j];
                            let number = param;
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
                    let param = this.params[i]?.[j] ?? line.params[j];
                    //  console.log("key,value", key, value);
                    switch (this.lineDisplayOptions[i]) {
                        case DISPLAY_LINE_FULL:
                            segment = segment.replaceAll(`{${key}}`, param);
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
export function backwardsCompatifyAbility(ability) {

    //Change: ability refactor
    if (ability.costName) {
        let atom = findAtom(ability.costName, LINETYPE_COST, true);
        let extras = (ability.costName == atom.name) ? undefined : ability.costName.split("-").slice(1);
        let line = new AbilityLine(
            (atom)
                ? `$ ${atom.name}: ${ability.costX}${(extras)?", "+extras.join(", "):""}`
                : `$ custom-cost: "${ability.costName}", ${ability.costX}`
        );
        ability.addLine(line);
        ability.costName = undefined;
        ability.costX = undefined;
    }
    if (ability.requirementName) {
        let atom = findAtom(ability.requirementName, LINETYPE_REQUIREMENT, true);
        let extras = (ability.requirementName == atom.name) ? undefined : ability.requirementName.split("-").slice(1);
        let line = new AbilityLine(
            (atom)
                ? `? ${atom.name}: ${ability.requirementX}${(extras)?", "+extras.join(", "):""}`
                : `? custom-requirement: "${ability.requirementName}", ${ability.requirementX}`
        );
        ability.addLine(line);
        ability.requirementName = undefined;
        ability.requirementX = undefined;
    }
    if (ability.effectName) {
        let atom = findAtom(ability.effectName, LINETYPE_EFFECT, true);
        let extras = (ability.effectName == atom.name) ? undefined : ability.effectName.split("-").slice(1);
        let line = new AbilityLine(
            (atom)
                ? `> ${atom.name}: ${ability.effectX}${(extras)?", "+extras.join(", "):""}`
                : `> custom-effect: "${ability.effectName}", ${ability.effectX}`
        );
        ability.addLine(line);
        ability.effectName = undefined;
        ability.effectX = undefined;
    }
    if (ability.effectText) {
        let line = new AbilityLine(`> custom-effect: "${ability.effectText}", ${ability.effectCost}`);
        ability.addLine(line);
        ability.effectText = undefined;
        ability.effectCost = undefined;
    }
    ability.updateDNA();
    ability.init();
    ability.lines.forEach((l, i) => {
        ability.params[i] = l.params ?? [];
    })

}
