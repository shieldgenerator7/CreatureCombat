"use strict";

import { arraySum } from "../Utility/Utility";
import AbilityCost from "./Ability/AbilityCost";
import { abilityAtoms, abilityCosts, abilityEffects, abilityRequirements } from "./AbilityData";

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
            0,
            (c, a, args) => {
                let damage = args.damage;
                let team = args.team;
                let target = args.target;
                //calc per 1 use
                //assume 3v3
                let targetMx = 1;
                switch (target) {
                    case "any": break;
                    case "all": targetMx = 1; break;
                    case "self": targetMx = -1; break;
                    case "nonself": break;
                    case "triggering": break;
                    case "that": break;
                }

            }
        )
    }
    Object.entries(costDict).forEach(([key, value]) => {
        let atom = abilityAtoms.find(a => a.name == key);
        value.init(atom);
    });
    return costDict;
}
