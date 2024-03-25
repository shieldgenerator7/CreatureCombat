"use strict";

import { abilityCosts, abilityEffects, abilityRequirements } from "./AbilityData";

const ABILITY_POINTCOST_FACTOR = 3;

class Ability {
    constructor() {
        this.name = "";
        this.costX = 1;//how much it costs to activate this ability
        this.costName = "exhaust";
        this.requirementX = 1;
        this.requirementName = "channel";
        this.effectX = 5;
        this.effectName = "attack";

        // custom abilities
        this.pointCost = undefined;//how much it costs to include this ability (for custom abilities)
        this.costReqText = "";//what it costs to play this ability (for custom abilities)
        this.effectText = "";//what this ability does (for custom abilities)
        this.effectCost = 10;//how much it costs to include this effect (for custom abilities)
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
        if (this.costReqText && ["none", "custom"].includes(this.requirementName)) {
            return this.costReqText;
        }
        return this.abilityRequirement
            ?.getText(this.requirementX)
            ?? "";
    }
    get EffectText() {
        if (this.effectText && this.effectName == "custom") {
            return this.effectText;
        }
        return this.abilityEffect
            ?.getText(this.effectX)
            ?? "";
    }

    get CostSymbol() {
        return this.abilityCost
            ?.getSymbol(this.costX)
            ?? "";
    }
    get RequirementSymbol() {
        if (this.costReqText && ["none", "custom"].includes(this.requirementName)) {
            return this.costReqText;
        }
        return this.abilityRequirement
            ?.getSymbol(this.requirementX)
            ?? "";
    }

    get FullText() {
        let reqsym = this.RequirementSymbol;
        let reqstr = (reqsym) ? ` (${reqsym})` : "";
        return `${this.name}   ${this.CostSymbol}${reqstr}: ${this.EffectText}`;
    }

    get FullTextWithReminders() {
        let fulltext = this.FullText;
        let reqsym = this.RequirementSymbol;
        if (reqsym) {
            fulltext += ` (${reqsym}: ${this.RequirementText})`;
        }
        return fulltext.trim();
    }

    get TotalCost() {
        if (this.pointCost >= 0) {
            return this.pointCost;
        }
        let effectCost = (this.EffectCost || 0) * ABILITY_POINTCOST_FACTOR;
        let reqCost = this.applyRequirementDiscount(effectCost) || effectCost;
        let costCost = this.applyCostDiscount(reqCost) || reqCost;
        return costCost;
    }

    get EffectCost() {
        if (this.effectName == "custom") {
            return Math.max(0, this.effectCost ?? 10);
        }
        return Math.max(0, this.abilityEffect
            ?.getCost(this.effectX)
            ?? 10
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
