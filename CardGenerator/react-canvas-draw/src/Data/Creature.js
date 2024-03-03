"use strict";

import BiomeModifier from "./BiomeModifier";

class Creature {
    constructor() {
        this.name = "";
        this.species = "";
        this.tags = [];

        this.imageURL = undefined;

        this.basePower = 1;
        this.biomeModifiers = {};

        this.abilities = [];
        this.flavorText = "";
    }

    getBiomeModifier(biome) {
        return this.biomeModifiers[biome]?.modifier ?? 0;
    }

    addBiomeModifier(biome, mod) {
        let bm = new BiomeModifier(biome, mod);
        this.biomeModifiers[biome] = bm;
    }

    getTotalPower(biome) {
        return this.basePower + this.getBiomeModifier(biome);
    }

    getTotalCost() {
        let cost = 0;
        //Base Power
        cost += Math.max(0, this.basePower) * 2;
        //Biome Modifiers
        cost += Object.keys(this.biomeModifiers)
            .map(bm => this.biomeModifiers[bm].modifier)
            .sum()
            / 2;
        //Abilities
        cost += Math.max(0, this.abilities.sum(a => a.cost));
        //TEST
        if (this.ability) { cost++; }
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
        return Math.ceil(Math.sqrt(total * 0.75));
    }
}

export default Creature;
