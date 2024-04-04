"use strict";

import Creature from "../Creature";
import Table from "../Table";
import Ability from "./Ability";
import AbilityAtom2 from "./AbilityAtom";

class AbilityCost{
    /**
     *
     * @param {(c: Creature, a: Ability, t: Table, p: object) => number} costFunc
     * @param {number[]} [table=[[1,1][1,1]]]
     */
    constructor(costFunc, table=[[1,1][1,1]]) {
        this.table = table;
        this.costFunc = costFunc;
    }
    init(atom) {
        this.atom = atom;
    }

    getCost(card, ability, ...params) {
        let args = this._getArgs(params);
        return this.costFunc(card, ability, table, args);
    }

    _getArgs(...params) {
        let obj = {};
        Object.entries(this.atom.params).forEach(([key, value],i) => {
            obj[key] = params[i];
        });
        return obj;
    }
}
export default AbilityCost;
