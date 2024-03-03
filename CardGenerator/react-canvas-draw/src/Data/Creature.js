"use strict";

class Creature {
    constructor() {
        this.name = "";
        this.species = "";

        this.imageURL = undefined;

        this.basePower = 1;
        this.biomeModifiers = {};

        this.abilities = [];
    }

    getBiomeModifier(biome) {
        return this.biomeModifiers[biome]?.modifier ?? 0;
    }

    getTotalPower(biome) {
        return this.basePower + this.getBiomeModifier(biome);
    }

    getTotalCost() {
        let cost = 0;
        //Base Power
        cost += Math.max(0, this.basePower) * 2;
        //Biome Modifiers
        cost += this.biomeModifiers.sum(bm => bm.modifier) / 2;
        //Abilities
        cost += Math.max(0, this.abilities.sum(a => a.cost));
        //
        cost = Math.round(cost);
        //
        return cost;
    }

    getFinalCost() {
        let total = this.getTotalCost();
        let discount = total / 10;
        return total - discount;
    }

    getStarCount() {
        let total = this.getTotalCost();
        return Math.sqrt(total * 0.75);
    }
}

export default Creature;
