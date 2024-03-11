"use strict";

import { abilityCosts, abilityEffects, abilityRequirements } from "./AbilityData";

class Ability {
    constructor() {
        this.name = "";
        this.pointCost = undefined;//how much it costs to include this ability
        this.costX = 0;//how much it costs to activate this ability
        this.costName = "";
        this.requirementX = 0;
        this.requirementName = "";
        this.effectX = 1;
        this.effectName = "";
        this.effectText = "";//for custom abilities
    }


    get abilityCost() {
        return abilityCosts
            .find(fx => fx.name == this.costName);
    }
    get abilityRequirement() {
        return abilityRequirements
            .find(fx => fx.name == this.requirementName);
    }
    get abilityEffect() {
        return abilityEffects
            .find(fx => fx.name == this.effectName);
    }

    get CostText() {
        return this.abilityCost
            ?.getText(this.costX)
            ?? "";
    }
    get RequirementText() {
        return this.abilityRequirement
            ?.getText(this.requirementX)
            ?? "";
    }
    get EffectText() {
        if (this.effectText) {
            return this.effectText;
        }
        return this.abilityEffect
            ?.getText(this.effectX)
            ?? "";
    }

    get FullText() {
        return `${this.name}   ${this.CostText} (${this.RequirementText}): ${this.EffectText}`;
    }

    get TotalCost() {
        if (this.pointCost >= 0) {
            return this.pointCost;
        }
        let effectCost = this.EffectCost || 0;
        let reqCost = this.applyRequirementDiscount(effectCost) || effectCost;
        let costCost = this.applyCostDiscount(reqCost) || reqCost;
        return costCost;
    }

    get EffectCost() {
        return Math.max(0, this.abilityEffect
            .getCost(this.effectX)
        );
    }

    applyRequirementDiscount(cost) {
        return this.cleanse(this.abilityRequirement
            ?.getCost(this.requirementX, cost)
            ?? cost
        );
    }

    applyCostDiscount(cost) {
        return this.cleanse(this.abilityCost
            ?.getCost(this.costX, cost)
            ?? cost
        );
    }

    cleanse(cost) {
        return Math.ceil(Math.max(0, cost));
    }
}
export default Ability;
