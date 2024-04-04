"use strict";

import { arraySum } from "../Utility/Utility";
import AbilityCost from "./Ability/AbilityCost";
import { TYPE_PARAM_TEAM } from "./AbilityConstants";
import { abilityAtoms, abilityCosts, abilityEffects, abilityRequirements } from "./AbilityData";
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

        this.abilityReqFunc = (n, v, c) => {
            return abilityRequirements.find(a => a.name == n)?.getCost(v, c) ?? 0;
        }
        this.abilityCostFunc = (n, v, c) => {
            return abilityCosts.find(a => a.name == n)?.getCost(v, c) ?? 0;
        }
        this.abilityEffectFunc = (n, v) => {
            return (abilityEffects.find(a => a.name == n)?.getCost(v) ?? 0) * this.abilityPointCostFactor;
        }
        this.abilityFunc = (a) => {
            let effectCost = this.abilityEffectXFunc(a.effectName, a.effectX);
            let reqCost = this.abilityReqFunc(a.requirementName, effectCost) || effectCost;
            let costCost = this.abilityCostFunc(a.costName, reqCost) || reqCost;
            return costCost;
        }

        this.discountFunc = (c) => {
            return -(c / 10);
        }

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
            cost += this.discountFunc(cost);

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
}
export default CostSpec;

function defaultCostDict() {
    let costDict = {
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
    }
    Object.entries(costDict).forEach(([key, value]) => {
        let atom = abilityAtoms.find(a => a.name == key);
        value.init(atom);
    });
    return costDict;
}
