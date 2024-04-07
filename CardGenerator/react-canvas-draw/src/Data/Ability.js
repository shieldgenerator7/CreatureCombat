"use strict";

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
}
export default Ability;
