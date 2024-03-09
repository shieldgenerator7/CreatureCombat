"use strict";

class Ability{
    constructor() {
        this.name = "";
        this.pointCost = undefined;//how much it costs to include this ability
        this.costX = 0;//how much it costs to activate this ability
        this.costType = "";
        this.requirementX = 0;
        this.requirementType = "";
        this.effectX = 1;
        this.effect = "";
    }

    getTotalCost() {
        if (this.pointCost >= 0) {
            return this.pointCost;
        }

    }

    getEffectCost() {
        switch (this.effect) {

        }
    }
}
