"use strict";

import { arraySum, getDateString, isImage } from "../Utility/Utility";
import { VERSION } from "../Version";
import Ability, {  inflateAbility } from "./Ability/Ability";
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
            "#D7D7D7",//top bg
            "#717171",//ability bg
            "#000000",//power bg
            "#000000",//top text
            "#FFFFFF",//ability text
            "#FFFFFF",//power text
        ];

        this.basePower = 1;
        this.biomeModifiers = [];

        this.rest = 1;

        this.abilities = [];
        this.showReminderText = true;
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

    getNameText(display, points, costSpec) {
        const connector = (display) ? ", " : "_";
        const pointStr = "";
        if (points) {
            let finalCost = costSpec.getTotalCost(this);
            finalCost += (finalCost != 1) ? "pts" : "pt";
            pointStr = (display)
                ? ` (${finalCost})`
                : `_${finalCost}`;
        }
        let nameStr;
        if (this.name && this.species) {
            nameStr = `${this.species}${connector}${this.name}`;
        }
        else if (this.name) {
            nameStr = `${this.name}`;
        }
        else if (this.species) {
            nameStr = `${this.species}`;
        }
        else {
            nameStr = "";
        }
        return `${nameStr}${pointStr}`;
    }

    getRestText(reminder = true) {
        if (!(this.rest > 0)) { return undefined; }
        let text = `*Rest ${this.rest}* `;
        if (reminder) {
            text += `_(After battling, put ${this.rest} Rest counters on this Creature)_`;
        }
        return text;
    }

    getTotalPower(biome) {
        return this.basePower + this.getBiomeModifier(biome);
    }

    getTotalCost() {
        console.error("DONT CALL THIS METHOD (call costSpec.getTotalCost() instead)");
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
        //Rest
        if (this.rest > 0) {
            const restSqr = Math.pow(this.rest, 2);
            cost += -(Math.min(restSqr, this.rest * 5) + Math.max(1, restSqr * 0.1));
            // cost *= 0.75 + 0.25 * (1 / ((this.rest-1) || 1));
        }
        //
        cost = Math.round(cost);
        cost = Math.max(cost, this.basePower);
        //
        return cost;
    }

    getFinalCost() {
        console.error("DONT CALL THIS METHOD (call costSpec.getTotalCost() instead)");
        let total = this.getTotalCost();
        let discount = total / 10;
        return Math.ceil(total - discount);
    }

    getStarCount() {
        console.error("DONT CALL THIS METHOD (call costSpec.getStarCount() instead)");
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
    creature.abilities = creature.abilities.filter(a => a);
    creature.abilities.forEach(ability => {
        inflateAbility(ability);
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
        "#D7D7D7",//top bg
        "#717171",//ability bg
        "#000000",//power bg
        "#000000",//top text
        "#FFFFFF",//ability text
        "#FFFFFF",//power text
    ];

    //Change: add imageFit
    creature.imageFit ??= FIT_WHOLE;

    //Change: add rest
    creature.rest ??= 0;

    //Change: add showReminderText
    creature.showReminderText ??= true;

}
