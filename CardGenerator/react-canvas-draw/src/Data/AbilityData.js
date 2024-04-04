"use strict";

import { isNumber } from "../Utility/Utility";
import AbilityAtom2 from "./Ability/AbilityAtom";
import AbilityAtom from "./AbilityAtom";
import { LINETYPE_COST, LINETYPE_EFFECT, LINETYPE_REQUIREMENT, LINETYPE_TRIGGER, TYPE_PARAM_BIOME, TYPE_PARAM_BIOMEMOD, TYPE_PARAM_CREATURE, TYPE_PARAM_LAND, TYPE_PARAM_LOCATION, TYPE_PARAM_TYPE, TYPE_PARAM_NUMBER_WHOLE, TYPE_PARAM_TEAM } from "./AbilityConstants";
import AbilityToken from "./AbilityToken";

const topList = [
    "custom",
    "none",
];
function sortFunc(_a, _b) {
    let a = _a.name;
    let b = _b.name;
    const topA = topList.includes(a);
    const topB = topList.includes(b);
    if (topA && !topB) {
        return -1;
    }
    if (!topA && topB) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

export const abilityEffects = [
    new AbilityAtom(
        "custom",
        "",
        (x) => x
    ),
    new AbilityAtom(
        "attack",
        "Deal X damage to target Creature.",
        (x) => x
    ),
    new AbilityAtom(
        "block",
        "Reduce all incoming damage to target Creature by X.",
        (x) => x * 0.5
    ),
    new AbilityAtom(
        "move-self",
        "Move this Creature to another Land.",
        (x) => 10
    ),
    new AbilityAtom(
        "attack-all-nonself",
        "Deal X damage to all other Creatures.",
        (x) => x
    ),
    new AbilityAtom(//danger: exploitable! esp when only paired with exhaust cost
        "powerup",
        "Gain +X Base Power.",
        (x) => x
    ),
    new AbilityAtom(
        "scout",
        "Look at the top X cards of the Land deck, choose 1, and place the others on the bottom of the Land deck in any order. Place the scouted Land on top of the Land deck.",
        (x) => x + 2
    ),
    new AbilityAtom(
        "change-biome",
        "Scout X. You may place the scouted Land on top of the current Land. That Land determines the biome for this battle. At the end of the round, shuffle that Land into the Land deck.",
        (x) => x + 2
    ),
    new AbilityAtom(
        "attack-type-enemy",
        "Choose a type. Deal X damage to all enemy Creatures of that type.",
        (x) => x * 1.5
    ),
    new AbilityAtom(
        "recovery",
        "When you use a Land card to recover this Creature, remove X Rest counters instead of 1.",
        (x) => x - 1
    ),
    new AbilityAtom(
        "rest",
        "Add X Rest counters to target Creature.",
        (x) => x - 1
    ),
    new AbilityAtom(
        "negate-biomemod",
        "Negate target Creature's biome modifier.",
        (x) => 2
    ),
    new AbilityAtom(
        "move-off",
        "Move target Creature to its owner's Ready pile.",
        (x) => 5
    ),
    new AbilityAtom(//danger: exploitable! esp when only paired with exhaust cost
        "attack-lifesteal",
        "Deal X damage to target Creature. Heal for the damage done.",
        (x) => x * 2
    ),
    new AbilityAtom(
        "duplicate",
        "Create a duplicate of target Creature until the end of the round. At the end of the round, add X Rest counters to that Creature.",
        (x) => 5 - x * 1.5
    ),
    new AbilityAtom(
        "move-on-ally",
        "Move target Creature from your Ready pile to this Land.",
        (x) => 5 - x * 1.5
    ),
    new AbilityAtom(
        "attack-all-enemy",
        "Deal X damage to all enemy Creatures.",
        (x) => x * 2
    ),
    new AbilityAtom(
        "rest-all",
        "Add X Rest counters to all Creatures.",
        (x) => x
    ),
    new AbilityAtom(
        "reveal",
        "Reveal this Creature. Reveal target Creature.",
        (x) => 2
    ),
    new AbilityAtom(
        "absorb",
        "If this Creature would take damage, it heals that amount instead.",
        (x) => 10
    ),
    new AbilityAtom(
        "ward",
        "When an enemy Creature targets this Creature, they must pay Exhaust X, or else their ability has no effect on it.",
        (x) => x * 1.1
    ),
    new AbilityAtom(
        "ward-any",
        "Target Creature has Ward X.",
        (x) => x * 1.1
    ),
].sort(sortFunc);

export const abilityCosts = [
    new AbilityAtom(
        "none",
        "There is no cost to this ability",
        (x, c) => c,
        ""
    ),
    new AbilityAtom(
        "exhaust",
        "Reduce this Creature's Base Power by X",
        (x, c) => c - x,
        "-X"
    ),
    new AbilityAtom(
        "rest",
        "Add X Rest counters to this Creature.",
        (x, c) => c / Math.max(1, x + 1),
        "+XR"
    )
].sort(sortFunc);

export const abilityRequirements = [
    new AbilityAtom(
        "none",
        "There is no requirement to this ability",
        (x, c) => c,
        ""
    ),
    new AbilityAtom(
        "home",
        "This Creature must be in a home biome.",
        (x, c) => c * 0.5,
        "H?"
    ),
    new AbilityAtom(
        "type-count",
        "This Creature must have at least X allies that share a type with it, including itself.",
        (x, c) => c - (x * 0.2),
        "TX?"
    ),
    new AbilityAtom(
        "target-rest-count",
        "Target Creature must have at least X Rest counters on it.",
        (x, c) => c - x * 2,
        "RX?"
    ),
    new AbilityAtom(
        "target-type-share",
        "Target Creature must share at least X types with this Creature.",
        (x, c) => c / Math.max(1, x + 1),
        "t-TX?"
    ),
    new AbilityAtom(
        "channel",
        "If this Creature takes any amount of damage between activating this ability and completing it, its ability effect is canceled.",
        (x, c) => c * 0.5,
        "C"
    ),
    new AbilityAtom(
        "targeter-type-share",
        "The targeter must share at least X types with this Creature.",
        (x, c) => c / Math.max(1, x + 1),
        "tr-TX?"
    ),
    new AbilityAtom(
        "once-per-battle",
        "This ability can only be used once per battle.",
        (x, c) => c / Math.max(1, 3),
        "O."
    ),
].sort(sortFunc);




export const abilityTokens = [
    new AbilityToken(
        TYPE_PARAM_CREATURE,
        [
            "any",
            "all",
            "self",
            "nonself",
            "triggering",
            "that",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_TEAM,
        [
            "team-all",
            "ally",
            "enemy",
            "neutral",
            "any",
            "that",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_LAND,
        [
            "any",
            "all",
            "this",
            "that",
            "scouted",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_BIOME,
        [
            "any",
            "all",
            "none",
            "that",
            "specific",
            "scouted",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_BIOMEMOD,
        [
            "any",
            "all",
            "none",
            "that",
            "specific",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_LOCATION,
        [
            "any",
            "all",
            "land",
            "ready",
            "deploy",
            "returning",
            "resting",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_NUMBER_WHOLE,
        (x) => isNumber(x)
    ),
    new AbilityToken(
        TYPE_PARAM_TYPE,
        [
            "any",
            "all",
            "none",
            "that",
            "specific",
        ]
    ),
];

export const abilityAtoms = [

    //costs
    new AbilityAtom2(
        "exhaust",
        "reduce this Creature's base power by {cost}",
        LINETYPE_COST,
        {
            cost: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom2(
        "rest",
        "add {rest} rest counters to this Creature",
        LINETYPE_COST,
        {
            rest: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),

    //triggers
    new AbilityAtom2(
        "ambush",
        "when an enemy Creature is played",
        LINETYPE_TRIGGER,
        {}
    ),
    new AbilityAtom2(
        "greeting",
        "when an ally Creature is played",
        LINETYPE_TRIGGER,
        {}
    ),
    new AbilityAtom2(
        "battlecry",
        "when this Creature is played",
        LINETYPE_TRIGGER,
        {}
    ),

    //requirements
    new AbilityAtom2(
        "home",
        "this Creature must be in a home biome",
        LINETYPE_REQUIREMENT,
        {}
    ),
    new AbilityAtom2(
        "once",
        "this ability may only {actionWord} once per battle",
        LINETYPE_REQUIREMENT,
        {
            actionWord: ["activate", "trigger"],
        }
    ),
    new AbilityAtom2(
        "channel",
        "if this Creature takes damage before this ability effect resolves, the effect is canceled",
        LINETYPE_REQUIREMENT,
        {}
    ),
    new AbilityAtom2(
        "social",
        "this Creature must have {count} allies that share a type with it",
        LINETYPE_REQUIREMENT,
        {
            count: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),

    //effects
    new AbilityAtom2(
        "attack",
        "deal {damage} damage to {target}",
        LINETYPE_EFFECT,
        {
            damage: TYPE_PARAM_NUMBER_WHOLE,
            target: TYPE_PARAM_CREATURE,
        }
    ),
    new AbilityAtom2(
        "block",
        "reduce incoming damage by {block}",
        LINETYPE_EFFECT,
        {
            block: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom2(
        "move",
        "move {target} from {from} to {to}",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_CREATURE,
            from: [TYPE_PARAM_LAND, TYPE_PARAM_LOCATION],
            to: [TYPE_PARAM_LAND, TYPE_PARAM_LOCATION],
        }
    ),
    new AbilityAtom2(
        "scout",
        "reveal the top {distance} Lands from the Land deck, choose one to be the scouted Land, put the others on the top and/or bottom of the Land deck in any order, then place the scouted Land faceup on top",
        LINETYPE_EFFECT,
        {
            distance: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom2(
        "land-biome-add",
        "{target} Land gains the {biome} biome",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_LAND,
            biome: TYPE_PARAM_BIOME,
        }
    ),
    new AbilityAtom2(
        "land-biome-remove",
        "{target} Land loses the {biome} biome",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_LAND,
            biome: TYPE_PARAM_BIOME,
        }
    ),
];
