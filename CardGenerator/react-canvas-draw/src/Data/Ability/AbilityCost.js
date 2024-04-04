"use strict";

import Creature from "../Creature";
import Ability from "./Ability";
import AbilityAtom2 from "./AbilityAtom";

class AbilityCost{
    /**
     *
     * @param {number} baseCost
     * @param {(c: Creature, a: Ability, p: object) => number} costFunc
     */
    constructor(baseCost, costFunc) {
        this.atom = undefined;
        this.baseCost = baseCost;
        this.costFunc = costFunc;
    }
    init(atom) {
        this.atom = atom;
        this.params = atom.params;
    }

    getCost(card, ability, ...params) {
        let args = this._getArgs(params);
        return this.costFunc(card, ability, args);
    }

    _getArgs(...params) {
        let obj = {};
        Object.entries(this.params).forEach(([key, value],i) => {
            obj[key] = params[i];
        });
        return obj;
    }
}
export default AbilityCost;
