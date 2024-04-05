"use strict";

import { arraySum } from "../Utility/Utility";
import AbilityCost from "./Ability/AbilityCost";
import { LINETYPE_EFFECT, TYPE_PARAM_TEAM } from "./AbilityConstants";
import { abilityAtoms } from "./AbilityData";
import Table from "./Table";

/**
 * Stores data needed to calculate the point cost of a card
 */
class CostSpec {
    constructor() {

        this.basePowerFunc = (v) => v * 2;
        this.biomeModifierFunc = (v) => v / 2;

        this.costDict = defaultCostDict();

        this.restFunc = (v) => {
            if (v <= 0) { return 0; }
            const restSqr = Math.pow(v, 2);
            return -(Math.min(restSqr, v * 5) + Math.max(1, restSqr * 0.1));
        }

        this.abilityPointCostFactor = 3;

        this.abilityFunc = (a) => {
            let cost = 0;
            for (let i = a.lines.length - 1; i >= 0; i--) {
                let line = a.lines[i];
                let atom = line.atom;
                if (!atom) {
                    console.error("cant find atom", line.atomName, atom);
                    continue;
                }
                if (atom.type == LINETYPE_EFFECT) {
                    cost += this.getCost(atom.name, line.params) * this.abilityPointCostFactor;
                }
                else {
                    cost = this.getDiscount(atom.name, cost, line.params);
                }
            }
            return cost;
        }

        this.discountFunc = (c) => c / 10;

        this.totalCost = (card) => {
            let cost = 0;

            //Base Power
            cost += Math.max(0, this.basePowerFunc(card.basePower));

            //Biome Modifiers
            cost += arraySum(
                card.biomeModifiers,
                bm => this.biomeModifierFunc(bm.modifier)
            );

            //Abilities
            cost += arraySum(
                card.abilities,
                a => Math.max(0, this.abilityFunc(a))
            );

            //Rest
            cost += this.restFunc(card.rest);

            //Discount
            cost += -this.discountFunc(cost);

            //Finalize
            cost = Math.round(cost);
            cost = Math.max(cost, card.basePower);

            //
            return cost;
        }
    }

    getTotalCost(card) {
        return this.totalCost(card);
    }
    getStarCount(card) {
        let total = this.getTotalCost(card);
        return Math.ceil(Math.sqrt(total * 0.75));
    }

    getCost(name, ...params) {
        let ac = this.costDict[name];
        return ac.getCost(params);
    }
    getDiscount(name, cost, ...params) {
        let ac = this.costDict[name];
        return ac.getDiscount(cost, params);
    }
}
export default CostSpec;
export const costSpec = new CostSpec();

function defaultCostDict() {
    let costDict = {

        //costs
        "exhaust": new AbilityCost(
            (args, table, cost) => cost - args.cost
        ),
        "rest": new AbilityCost(
            (args, table, cost) => cost * 1 / (args.rest + 1)
        ),

        //triggers
        "ambush": new AbilityCost(
            (args, table, cost) => cost * 0.1
        ),
        "greeting": new AbilityCost(
            (args, table, cost) => cost * 0.1
        ),
        "battlecry": new AbilityCost(
            (args, table, cost) => cost * 0.1
        ),

        //requirements
        "home": new AbilityCost(
            (args, table, cost) => cost * 0.25
        ),
        "once": new AbilityCost(
            (args, table, cost) => cost * 0.3
        ),
        "channel": new AbilityCost(
            (args, table, cost) => cost * 0.3
        ),
        "social": new AbilityCost(
            (args, table, cost) => cost - (args.count * 0.35)
        ),

        //effects
        "attack": new AbilityCost(
            (args, table) => {
                let damage = args.damage;
                let team = args[TYPE_PARAM_TEAM];
                let target = args.target;
                //calc per 1 use
                //assume 3v3
                let targetMx = table.get(team, target);
                return damage * targetMx;
            },
            new Table(
                [
                    "all-teams",
                    "ally",
                    "enemy",
                    "neutral",
                    "target-team",
                    "that-team",
                ],
                [
                    "target",
                    "all",
                    "self",
                    "nonself",
                    "triggering",
                    "that",
                ],
                [
                    [1, 1, -1, 1.5, 1, 1],
                    [-1, -3, -1, -2, -1, -1],
                    [1, 3, undefined, 3, 1, 1],
                    [1, 1, -1, 1, 1, 1],
                    [1, 3, -1, 3, 1, 1],
                    [1, 3, -1, 3, 1, 1],
                ]
            ),
        ),
        "block": new AbilityCost(
            (args) => args.block
        ),
        "move": new AbilityCost(
            (args, table) => {
                let team = args[TYPE_PARAM_TEAM];
                let target = args.target;
                //calc per 1 use
                //assume 3v3
                let targetMx = table.get(team, target);
                return 10 * targetMx;
            },
            new Table(
                [
                    "all-teams",
                    "ally",
                    "enemy",
                    "neutral",
                    "target-team",
                    "that-team",
                ],
                [
                    "target",
                    "all",
                    "self",
                    "nonself",
                    "triggering",
                    "that",
                ],
                [
                    [1, 1, -1, 1.5, 1, 1],
                    [-1, -3, -1, -2, -1, -1],
                    [1, 3, undefined, 3, 1, 1],
                    [1, 1, -1, 1, 1, 1],
                    [1, 3, -1, 3, 1, 1],
                    [1, 3, -1, 3, 1, 1],
                ]
            ),
        ),
        "scout": new AbilityCost(
            (args) => Math.max(1, args.distance - 1) * 2
        ),
        "land-biome-add": new AbilityCost(
            (args, table) => {
                let target = args.target;
                let biome = args.biome;
                //calc per 1 use
                //assume 3v3
                let targetMx = table.get(biome, target);
                return 10 * targetMx;
            },
            new Table(
                [
                    "target",
                    "all",
                    "none",
                    "that",
                    "specific",
                    "scouted",
                ],
                [
                    "target",
                    "all",
                    "this",
                    "that",
                    "scouted",
                ],
                [
                    [1, 3, 1, 1, undefined],
                    [3, 5, 2, 3, undefined],
                    [0, 0, 0, 0, undefined],
                    [1, 3, 1, 1, undefined],
                    [2, 5, 2, 2, undefined],
                    [0.5, 1.5, 0.5, 0.5, undefined],
                ]
            )
        ),
        "land-biome-remove": new AbilityCost(
            (args, table) => {
                let target = args.target;
                let biome = args.biome;
                //calc per 1 use
                //assume 3v3
                let targetMx = table.get(biome, target);
                return 10 * targetMx;
            },
            new Table(
                [
                    "target",
                    "all",
                    "none",
                    "that",
                    "specific",
                    "scouted",
                ],
                [
                    "target",
                    "all",
                    "this",
                    "that",
                    "scouted",
                ],
                [
                    [1, 3, 1, 1, undefined],
                    [3, 5, 2, 3, undefined],
                    [0, 0, 0, 0, undefined],
                    [1, 3, 1, 1, undefined],
                    [2, 5, 2, 2, undefined],
                    [0.5, 1.5, 0.5, 0.5, undefined],
                ]
            )
        ),
    }
    Object.entries(costDict).forEach(([key, value]) => {
        let atom = abilityAtoms.find(a => a.name == key);
        value.init(atom);
    });
    return costDict;
}
