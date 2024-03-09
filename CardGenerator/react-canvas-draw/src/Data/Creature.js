"use strict";

import { arraySum } from "../Utility/Utility";
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

        //temp
        this.count = 1;//TODO: move this somewhere else
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
        cost += Math.max(0, Math.ceil(this.basePower)) * 2;
        //Biome Modifiers
        cost += Math.ceil(arraySum(
                Object.keys(this.biomeModifiers)
                    .map(bm => this.biomeModifiers[bm].modifier)
            )
            / 2);
        //Abilities
        cost += Math.ceil(this.abilityCost);//test
        cost += Math.max(0, arraySum(this.abilities,a => a.cost));
        //
        cost = Math.round(cost);
        cost = Math.max(cost, this.basePower);
        //
        return cost;
    }

    getFinalCost() {
        let total = this.getTotalCost();
        let discount = total / 10;
        return Math.ceil(total - discount);
    }

    getStarCount() {
        let total = this.getTotalCost();
        return Math.ceil(Math.sqrt(total * 0.75));
    }
}

export default Creature;

export function inflateCreature(creature) {
    Object.setPrototypeOf(creature, Creature.prototype);
    creature.biomeModifiers.forEach(bm => {
        Object.setPrototypeOf(bm, BiomeModifier.prototype);
    });
}
