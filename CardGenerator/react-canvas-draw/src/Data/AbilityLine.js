"use strict";

import { LINETYPE_COST, LINETYPE_EFFECT, LINETYPE_REQUIREMENT, LINETYPE_TRIGGER } from "./AbilityConstants";
import { abilityAtoms } from "./AbilityData";


/**
 * A single line of code of an ability
 * Multiple AbilityLines come together to form an ability
 */
class AbilityLine {
    constructor(line) {

        //ex: > attack: 3, any, any
        this.line = line.trim().toLowerCase();
        let tokens = line.split(" ").map(t => t.trim()).filter(t => t);

        //determine type of line
        this.type = "";
        let firstChar = tokens[0];
        switch (firstChar) {
            case "$": this.type = LINETYPE_COST; break;
            case "!": this.type = LINETYPE_TRIGGER; break;
            case "?": this.type = LINETYPE_REQUIREMENT; break;
            case ">": this.type = LINETYPE_EFFECT; break;
        }

        //determine which atom
        this.atomName = tokens[1]?.match(/[a-zA-Z\-]+/)[0] ?? "attack";
        this.atom = abilityAtoms.find(atom => atom.name == this.atomName && atom.type == this.type);
        if (!this.atom) {
            console.error("unable to find atom!", this.atomName, this.atom);
            return;
        }

        //load in params
        this.params = tokens.slice(2)
            .map(token => token
                ?.match(/[a-zA-Z0-9]+/)[0]
                ?.trim()
            )
            .filter(token => token);

    }
}
export default AbilityLine;
