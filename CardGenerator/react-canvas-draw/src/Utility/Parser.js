"use strict";

import Creature from "../Data/Creature";

export function parsePasteFromExcel(pasteString) {
    let pasteSplit = pasteString.split("\n");
    let cardList = pasteSplit
        .map(str => parseCreatureTabLine(str))
        .filter(card => card);
    return cardList;
}

function parseCreatureTabLine(creatureTabLine) {
    //2024-03-03: setup to work with a specific Excel spreadsheet i have

    if (!creatureTabLine) { return; }

    let card = new Creature();
    let fields = creatureTabLine.split("	").map(f => f.trim());
    const valid = (index) => fields[index] != undefined && fields[index] != "";

    //Species
    card.species = fields[0];

    //Tags
    if (valid(1)) {
        card.setTags(fields[1]);
    }

    //Base Power
    if (valid(5)) {
        card.basePower = fields[5];
    }

    //Biome Modifiers
    card.biomeModifiers = [];
    for (let i = 6; i < 16; i += 2) {
        if (valid(i) && valid(i + 1)) {
            let biomeName = fields[i];
            let biomeModifier = fields[i + 1] * 1;
            card.addBiomeModifier(biomeName, biomeModifier);
        }
    }

    //Abilities
    if (valid(16)) {
        let aname = fields[16] ?? "Ability";
        let acost = fields[17] ?? 0;
        let areq = fields[18] ?? "-0";
        let areqsec = (areq) ? `[${areq}]:` : "---";
        let atext = fields[19] ?? "Deal 0 damage to target creature."
        card.ability = `${aname}   ${areqsec} ${atext}`;
        card.abilityCost = acost;
    }

    //
    return card;
}
