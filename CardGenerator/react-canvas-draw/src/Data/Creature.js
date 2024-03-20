"use strict";

import { arraySum, getDateString, isImage } from "../Utility/Utility";
import { VERSION } from "../Version";
import Ability from "./Ability";
import BiomeModifier, { biomeList } from "./BiomeModifier";

export const FIT_WHOLE = 0;
export const FIT_FILL = 1;
export const FIT_WIDTH = 2;
export const FIT_HEIGHT = 3;

class Creature {
    constructor() {
        this.name = "";
        this.species = "";
        this.tags = [];

        this.imageURL = undefined;
        this.imageFit = FIT_WHOLE;

        this.colors = [
            "#FFFFFF",//white
            "#dbd69e",//tan
            "#808080",//grey
            "#000000",//black
            "#000000",//black
            "#FFFFFF",//white
        ];

        this.basePower = 1;
        this.biomeModifiers = [];

        this.abilities = [];
        this.flavorText = "";

        //Card Info
        this.id = "";
        this.variant = "01/01";
        this.editorVersion = VERSION;
        this.creationDate = getDateString();

        //temp
        this.count = 1;//TODO: move this somewhere else
    }

    setTags(tags) {
        this.tags = tags.split(/,| /)//split on comma or space
            .map((t, i, arr) => (i < arr.length - 1) ? t.trim() : t)
            .filter((t, i, arr) => t || i == arr.length - 1);
    }

    hasBiome(biome) {
        return this.biomeModifiers.some(bm => bm.biome == biome);
    }

    getBiomeModifier(biome) {
        return this.biomeModifiers.find(bm => bm.biome == biome)?.modifier ?? 0;
    }

    addBiomeModifier(biome, mod) {
        if (!biome) {
            biome = biomeList.find(bm => !this.hasBiome(bm));
        }
        let bm = new BiomeModifier(biome, mod);
        this.biomeModifiers.push(bm);
    }

    addAbility(ability) {
        ability ??= new Ability();
        this.abilities.push(ability);
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
        cost += Math.ceil(this.abilityCost || 0);//test
        cost += Math.max(0, arraySum(this.abilities, a => (a.TotalCost || 0)));
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

export function inflateCreature(creature, updateCard) {
    Object.setPrototypeOf(creature, Creature.prototype);
    creature.biomeModifiers.forEach(bm => {
        Object.setPrototypeOf(bm, BiomeModifier.prototype);
    });
    creature.abilities.forEach(ability => {
        Object.setPrototypeOf(ability, Ability.prototype);
    });

    //Portrait
    if (creature.imageURL && !isImage(creature.imgPortrait)) {
        let creatureImage = new Image();
        creatureImage.src = creature.imageURL;
        creatureImage.onload = () => {
            creature.imgPortrait = creatureImage;
            updateCard?.(creature);
        }
    }
}

export function backwardsCompatifyCreature(creature) {

    //Change: add colors[]
    creature.colors ??= [
        "#FFFFFF",//white
        "#dbd69e",//tan
        "#808080",//grey
        "#000000",//black
        "#000000",//black
        "#FFFFFF",//white
    ];

    //Change: add imageFit
    creature.imageFit ??= FIT_WHOLE;
}
