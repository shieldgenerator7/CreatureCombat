"use strict";

import { capitalizeFirstLetters, clamp, isNumber } from "../../Utility/Utility";
import { LINETYPE_TRIGGER, LINETYPE_COST, LINETYPE_EFFECT, LINETYPE_REQUIREMENT, TYPE_PARAM_NUMBER_FRACTION, TYPE_PARAM_NUMBER_WHOLE, TYPE_PARAM_STRING } from "./AbilityConstants";
import { abilityAtoms, findAtom, findToken, stringReplacements } from "./AbilityData";
import AbilityLine from "./AbilityLine";

const stringifyAbility = [
    "name",
    "codeText",
    "params",
];

export const DISPLAY_LINE_FULL = "full";
export const DISPLAY_LINE_KEYWORD_WITH_REMINDER = "reminder";
export const DISPLAY_LINE_KEYWORD_ONLY = "keyword";

class Ability {
    constructor(name, codeText, params) {
        this.name = name ?? "";
        this.magicGenus = "";
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
        });
        this.colonIndex = this.lines.indexOf(this.lines.find(l => l.type == LINETYPE_EFFECT)) - 1;
        this.lineDisplayOptions ??= [];
        this.lines.forEach((l, i) => {
            this.lineDisplayOptions[i] ??= DISPLAY_LINE_FULL;
        });
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
        let text = `*${this.name}*\n` +
            this.lines.map((line, i, arr) => {
                let reminder = this.getLineReminder(line, this.params[i], this.lineDisplayOptions[i]);
                if (reminder){
                    let name = this.getLineName(line, this.params[i]);
                    reminders[name] = reminder;
                }
                let segment = this.getLineProcessed(line, this.params[i], this.lineDisplayOptions[i], sentenceStart);
                let sentenceEnd = segment?.length > 0;//TODO: make this check current and next line
                if (sentenceEnd) {
                    segment += (this.colonIndex == i) ? ":" : (this.colonIndex > i) ? "," : ".";
                    sentenceStart = true;
                }
                const lineType = line.atom.type;
                const lineNextType = arr[i+1]?.atom.type;

                if (line.atom.type != LINETYPE_EFFECT && lineNextType && lineType != lineNextType){
                    segment += "\n";
                }
                
                return segment;
            })
                .concat(
                    Object.entries(reminders).map(([key, value]) => {
                        return `_(*${key}*: ${capitalizeFirstLetters(value, false)})_`;
                    })
                )
                .flat(Infinity)
                .join(" ");
        return text;
    }
    get FullTextHtml() {
        return this.FullText
            //bold
            .replaceAll(/\*([^\*]*)\*/g, "<span class='b'>$1</span>")
            //italics
            .replaceAll(/\_([^\_]*)\_/g, "<span class='i'>$1</span>");
    }
    //**
    // Returns an array, where each element is [content, size, color]
    // Atom types in order: trigger, cost, requirement, effect
    //  */
    get TextByLineWithFormat() {
        let processedLines = this.lines.map((line, i) => [
            this.getLineProcessed(line, this.params[i], this.lineDisplayOptions[i]),
            12,
            this.getLineFormat(line, this.params[i]),
        ]);
        return [
            //name
            [this.name, 15, "white"],
            ...processedLines,
        ]
    }

    getLineProcessed(line, params=[], lineDisplayOption = DISPLAY_LINE_FULL, capitalize = true){
        //2026-08-23: copied from get FullText()
                let atom = line.atom;
                if (!atom) {
                    return `[Unknown atom: "${line.atomName}"]`;
                }
                let segment = "";
                const linename = this.getLineName(line, params);
                switch (lineDisplayOption) {
                    case DISPLAY_LINE_FULL:
                        segment = atom.text.trim();
                        break;
                    case DISPLAY_LINE_KEYWORD_WITH_REMINDER:
                    case DISPLAY_LINE_KEYWORD_ONLY: {
                        segment = `*${linename}*`;
                    } break;
                }
                let j = 0;
                //console.log("params", this.params);
                for (const [key, value] of Object.entries(atom.params)) {
                    let param = params[j] ?? line.params[j];
                    let tokens = [findToken(value)].flat(Infinity);
                    let subtoken = tokens.map(v => v?.subtoken)?.[0]?.name;
                    if (subtoken) {
                        segment = segment.replaceAll(`{${key}}`, `{${key}} {${subtoken}}`);
                    }
                    //  console.log("key,value", key, value);
                    switch (lineDisplayOption) {
                        case DISPLAY_LINE_FULL:
                            segment = segment.replaceAll(`{${key}}`, param);
                            break;
                        case DISPLAY_LINE_KEYWORD_WITH_REMINDER:
                            // segment = [segment, ...params.filter(v => isNumber(v))].join(" ");
                            break;
                        case DISPLAY_LINE_KEYWORD_ONLY:
                            // segment = [segment, ...params.filter(v => isNumber(v))].join(" ");
                            break;
                    }
                    j++;
                }
                //specific
                let specificJ = Object.entries(atom.params).length;
                if (line.params.some(p => p == "specific") || line.params[specificJ]) {
                    segment = segment.replaceAll("specific", line.params[specificJ]);
                }
                //replacement strings
                stringReplacements.forEach(rep => {
                    segment = rep.processString(segment);
                });
        
        if (capitalize) {
            let match = segment.match(/[a-zA-Z0-9\-]/);
            if (match) {
                segment = capitalizeFirstLetters(segment, false, match.index + 1);
            }
            else if (segment) {
                console.error("segment doesnt match!", segment);
            }
        }
        
        //symbol
        const symbol = this.getLineSymbol(line);
        if (symbol) {
            segment = `${symbol} ${segment}`;
        }

                return segment;
    }
    getLineReminder(line, params=[], lineDisplayOption = DISPLAY_LINE_FULL){
        //2026-08-23: copied from getLineProcessed()
                let atom = line.atom;
                if (!atom) {
                    return `[Unknown atom: "${line.atomName}"]`;
                }
                switch (lineDisplayOption) {
                    case DISPLAY_LINE_FULL:
                        return undefined;
                        break;
                    case DISPLAY_LINE_KEYWORD_WITH_REMINDER: {
                        let reminder = atom.text.trim();
                        Object.entries(atom.params).forEach(([key, value], j) => {
                            let param = params[j] ?? line.params[j];
                            let number = param;
                            reminder = reminder.replaceAll(`{${key}}`, number);
                        });
                        return reminder;
                    } break;
                    case DISPLAY_LINE_KEYWORD_ONLY: {
                        return undefined;
                    } break;
                }
    }
    getLineName(line, params=[]){
          //2026-08-23: copied from get getLineProcessed()
                let atom = line.atom;
                if (!atom) {
                    return `[Unknown atom: "${line.atomName}"]`;
                }                
                let name = `${capitalizeFirstLetters(atom.name.trim())}`;
                        Object.entries(atom.params).forEach(([key, value], j) => {
                            let param = params[j] ?? line.params[j];
                            let number = param;
                            if (isNumber(number)) {
                                name += ` ${number}`;
                            }
                        });
                return name;
    }
    getLineSymbol(line) {
         switch (line.type) {
            case LINETYPE_TRIGGER: return "🗲";
            case LINETYPE_COST: return undefined;
            case LINETYPE_REQUIREMENT: return undefined;
            case LINETYPE_EFFECT: return undefined;
            default: return undefined;
        }
    }
    getLineFormat(line, params = []) {
        switch (line.type) {
            case LINETYPE_TRIGGER: return "yellow";
            case LINETYPE_COST: return "#FF00CC";
            case LINETYPE_REQUIREMENT: return "#44BB34";
            case LINETYPE_EFFECT: return "white";
            default: return "white";
        }
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
    const lineBCFunc = (typeName, atomName, typeConst, symbol) => {
        const keyX = `${typeName}X`;
        const keyName = `${typeName}Name`;
        if (atomName && !["none", "custom"].includes(atomName)) {
            let atom = findAtom(atomName, typeConst, true);
            let extras = (!atom || atomName == atom.name) ? undefined : atomName.split("-").slice(1);
            let line = new AbilityLine(
                (atom)
                    ? `${symbol} ${atom.name}: ${ability[keyX]}${(extras) ? ", " + extras.join(", ") : ""}`
                    : `${symbol} custom-${typeName}: "${ability[keyName]}", ${ability[keyX]}`
            );
            ability.addLine(line);
            ability[keyName] = undefined;
            ability[keyX] = undefined;
        }
    };
    lineBCFunc("cost", ability.costName, LINETYPE_COST, "$");
    lineBCFunc("requirement", ability.requirementName, LINETYPE_REQUIREMENT, "?");
    lineBCFunc("effect", ability.effectName, LINETYPE_EFFECT, ">");

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
    });

    //Change: token rename
    const tokenExclude = [
        TYPE_PARAM_NUMBER_FRACTION,
        TYPE_PARAM_NUMBER_WHOLE,
        TYPE_PARAM_STRING,
    ];
    const tokenReplaceFunc = (arr, tokenTypeArr) => {
        return arr.map((p, i) => {
            let tokenType = tokenTypeArr[i];
            let foundToken = findToken(tokenType);
            if (!foundToken) { return p; }
            if (foundToken.length === 0) { return p; }
            if (foundToken.some?.(t => !t)) { return p; }
            if (tokenExclude.includes(tokenType)) { return p; }
            if (p == "team-all") { return "all-team"; }
            if (p.includes("-")) { return p; }

            return `${p}${tokenType}`.replaceAll("_", "-");
        });
    };
    ability.lines.forEach((l, i) => {
        let paramValues = l.atom.paramValues;
        l.params = tokenReplaceFunc(l.params, paramValues);
        ability.params[i] = tokenReplaceFunc(ability.params[i], paramValues);
    });

}
