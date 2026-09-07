"use strict";

export const biomeList = [
    "Cloud",
    "Desert",
    "Forest",
    "Jungle",
    "Lake",
    "Mountain",
    "Ocean",
    "Plain",
    "Swamp",
    "Tundra",
    "Volcano",
    "Wasteland",
];

export const BIOME_MOD_NEUTRAL = "neutral";
export const BIOME_MOD_BONUS = "bonus";
export const BIOME_MOD_PENALTY = "penalty";

class BiomeModifier {
    constructor(biome, modifier) {
        this.biome = biome;
        this.modifier = modifier;

        this.init();
    }

    init() {
        this._type = (this.modifier > 0) ? BIOME_MOD_BONUS : (this.modifier < 0) ? BIOME_MOD_PENALTY : BIOME_MOD_NEUTRAL;
    }
}

export default BiomeModifier;
