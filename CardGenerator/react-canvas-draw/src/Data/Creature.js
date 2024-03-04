"use strict";

import BiomeModifier from "./BiomeModifier";

class Creature {
    constructor() {
        this.name = "";
        this.species = "";
        this.tags = [];

        this.imageURL = undefined;

        this.basePower = 1;
        this.biomeModifiers = [];

        this.ability = "";//test
        this.abilityCost = 0;//test
        this.abilities = [];
        this.flavorText = "";

        //Card Info
        this.id = "";
        this.variant = "01/01";
        this.editorVersion = "0.001";
        this.creationDate = new Date().toISOString().slice(0, 10);
    }

    setTags(tags) {
        this.tags = tags.split(/,| /)//split on comma or space
            .map(t => t.trim())
            .filter(t => t);
    }

    getBiomeModifier(biome) {
        return this.biomeModifiers.find(bm => bm.biome == biome)?.modifier ?? 0;
    }

    addBiomeModifier(biome, mod) {
        let bm = new BiomeModifier(biome, mod);
        this.biomeModifiers.push(bm);
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
        cost += Math.ceil(this.abilityCost);//test
        cost += Math.max(0, this.abilities.sum(a => a.cost));
        //
        cost = Math.round(cost);
        cost = Math.max(cost, this.basePower);
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
