"use strict";

import { between, isNumber } from "../../Utility/Utility";
import { biomeList } from "../BiomeModifier";
import Ability from "./Ability";
import AbilityAtom from "./AbilityAtom";
import { LINETYPE_COST, LINETYPE_EFFECT, LINETYPE_REQUIREMENT, LINETYPE_TRIGGER, TYPE_PARAM_BIOME, TYPE_PARAM_BIOMEMOD, TYPE_PARAM_CREATURE, TYPE_PARAM_LAND, TYPE_PARAM_LOCATION, TYPE_PARAM_TYPE, TYPE_PARAM_NUMBER_WHOLE, TYPE_PARAM_TEAM, TYPE_PARAM_STRING, TYPE_PARAM_NUMBER_FRACTION } from "./AbilityConstants";
import AbilityToken from "./AbilityToken";

const topList = [
    "custom",
    "custom-cost",
    "custom-trigger",
    "custom-requirement",
    "custom-effect",
    "none",
    "choose",
];
const lineTypeOrder = [
    LINETYPE_COST,
    LINETYPE_TRIGGER,
    LINETYPE_REQUIREMENT,
    LINETYPE_EFFECT,
];
function sortFunc(_a, _b) {
    if (_a.name == "choose") {
        return -1;
    }
    if (_b.name == "choose") {
        return 1;
    }
    if (_a.type != _b.type) {
        return (lineTypeOrder.indexOf(_a.type) - lineTypeOrder.indexOf(_b.type));
    }
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
        "attack-type-enemy",
        "Choose a type. Deal X damage to all enemy Creatures of that type.",
        (x) => x * 1.5
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
        "absorb",
        "If this Creature would take damage, it heals that amount instead.",
        (x) => 10
    ),
    new AbilityAtom(
        "ward-any",
        "Target Creature has Ward X.",
        (x) => x * 1.1
    ),
].sort(sortFunc);

export const abilityRequirements = [
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
        "targeter-type-share",
        "The targeter must share at least X types with this Creature.",
        (x, c) => c / Math.max(1, x + 1),
        "tr-TX?"
    ),
].sort(sortFunc);




export const abilityTokens = [
    new AbilityToken(
        TYPE_PARAM_CREATURE,
        undefined,
        [
            "target",
            "all",
            "self",
            "nonself",
            "triggering",
            "that",
        ],
        TYPE_PARAM_TEAM
    ),
    new AbilityToken(
        TYPE_PARAM_TEAM,
        undefined,
        [
            "team-all",
            "ally",
            "enemy",
            "neutral",
            "target",
            "that",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_LAND,
        undefined,
        [
            "target",
            "all",
            "this",
            "that",
            "scouted",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_BIOME,
        undefined,
        [
            "target",
            "all",
            "none",
            "that",
            "specific",
            "scouted",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_BIOMEMOD,
        undefined,
        [
            "target",
            "all",
            "none",
            "that",
            "specific",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_LOCATION,
        undefined,
        [
            "target",
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
        1,
        (x) => isNumber(x)
    ),
    new AbilityToken(
        TYPE_PARAM_NUMBER_FRACTION,
        0.1,
        (x) => isNumber(x) && between(x, 0, 1)
    ),
    new AbilityToken(
        TYPE_PARAM_TYPE,
        undefined,
        [
            "target",
            "all",
            "none",
            "that",
            "specific",
        ]
    ),
    new AbilityToken(
        TYPE_PARAM_STRING,
        "text"
    ),
    new AbilityToken(
        "specific-biome",
        undefined,
        biomeList
    )
];
abilityTokens
    .filter(token => token.subtokenname)
    .forEach(token => {
        let subtoken = abilityTokens.find(t => t.name == token.subtokenname);
        token.init(subtoken);
    });

export const abilityAtoms = [

    //custom / choose
    new AbilityAtom(
        "choose",
        "",
        LINETYPE_EFFECT,
        {},
        {
            keywordable: false,
        }
    ),
    new AbilityAtom(
        "custom-cost",
        "{line}",
        LINETYPE_COST,
        {
            line: TYPE_PARAM_STRING,
            discount: TYPE_PARAM_NUMBER_WHOLE,
            discountFactor: TYPE_PARAM_NUMBER_WHOLE,
        },
        {
            keywordable: false,
        }
    ),
    new AbilityAtom(
        "custom-trigger",
        "{line}",
        LINETYPE_TRIGGER,
        {
            line: TYPE_PARAM_STRING,
            discount: TYPE_PARAM_NUMBER_WHOLE,
            discountFactor: TYPE_PARAM_NUMBER_WHOLE,
        },
        {
            keywordable: false,
        }
    ),
    new AbilityAtom(
        "custom-requirement",
        "{line}",
        LINETYPE_REQUIREMENT,
        {
            line: TYPE_PARAM_STRING,
            discount: TYPE_PARAM_NUMBER_WHOLE,
            discountFactor: TYPE_PARAM_NUMBER_WHOLE,
        },
        {
            keywordable: false,
        }
    ),
    new AbilityAtom(
        "custom-effect",
        "{line}",
        LINETYPE_EFFECT,
        {
            line: TYPE_PARAM_STRING,
            cost: TYPE_PARAM_NUMBER_WHOLE,
        },
        {
            keywordable: false,
        }
    ),

    //costs
    new AbilityAtom(
        "exhaust",
        "reduce this Creature's base power by {cost}",
        LINETYPE_COST,
        {
            cost: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "rest",
        "add {rest} rest counters to this Creature",
        LINETYPE_COST,
        {
            rest: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "discard",
        "discard {count} cards from your hand",
        LINETYPE_COST,
        {
            count: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "sacrifice",
        "remove {count} of your Creatures from battle",
        LINETYPE_COST,
        {
            count: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),

    //triggers
    new AbilityAtom(
        "ambush",
        "when an enemy Creature is played",
        LINETYPE_TRIGGER,
        {}
    ),
    new AbilityAtom(
        "greeting",
        "when an ally Creature is played",
        LINETYPE_TRIGGER,
        {}
    ),
    new AbilityAtom(
        "battlecry",
        "when this Creature is played",
        LINETYPE_TRIGGER,
        {}
    ),

    //requirements
    new AbilityAtom(
        "home",
        "this Creature must be in a home biome",
        LINETYPE_REQUIREMENT,
        {}
    ),
    new AbilityAtom(
        "once",
        "this ability may only {actionWord} once per battle",
        LINETYPE_REQUIREMENT,
        {
            actionWord: ["activate", "trigger"],
        }
    ),
    new AbilityAtom(
        "channel",
        "if this Creature takes damage before this ability effect resolves, the effect is canceled",
        LINETYPE_REQUIREMENT,
        {}
    ),
    new AbilityAtom(
        "social",
        "this Creature must have {count} allies that share a type with it",
        LINETYPE_REQUIREMENT,
        {
            count: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "symbiotic",
        "target Creature must share {homes} home biomes with this Creature",
        LINETYPE_REQUIREMENT,
        {
            homes: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "slow",
        "this ability cannot be used to react to another ability",
        LINETYPE_REQUIREMENT,
        {}
    ),

    //effects
    new AbilityAtom(
        "attack",
        "deal {damage} damage to {target} Creature",
        LINETYPE_EFFECT,
        {
            damage: TYPE_PARAM_NUMBER_WHOLE,
            target: TYPE_PARAM_CREATURE,
        }
    ),
    new AbilityAtom(
        "block",
        "reduce incoming damage by {block}",
        LINETYPE_EFFECT,
        {
            block: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "move",
        "move {target} Creature from {from} to {to}",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_CREATURE,
            from: [TYPE_PARAM_LAND, TYPE_PARAM_LOCATION],
            to: [TYPE_PARAM_LAND, TYPE_PARAM_LOCATION],
        }
    ),
    new AbilityAtom(
        "scout",
        "reveal the top {distance} Lands from the Land deck, choose one to be the scouted Land, place it faceup on top, and put the others on the bottom in any order",
        LINETYPE_EFFECT,
        {
            distance: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "land-biome-add",
        "{target} Land gains the {biome} biome",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_LAND,
            biome: TYPE_PARAM_BIOME,
        },
        {
            keywordable: false,
        }
    ),
    new AbilityAtom(
        "land-biome-remove",
        "{target} Land loses the {biome} biome",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_LAND,
            biome: TYPE_PARAM_BIOME,
        },
        {
            keywordable: false,
        }
    ),
    new AbilityAtom(
        "powerup",
        "gain {power} bonus power",
        LINETYPE_EFFECT,
        {
            power: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "recovery",
        "when you use a Land card to recover this creature, remove an additional {rest} Rest counters from it",
        LINETYPE_EFFECT,
        {
            rest: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "stress",
        "add {rest} Rest counters to {target} Creature",
        LINETYPE_EFFECT,
        {
            rest: TYPE_PARAM_NUMBER_WHOLE,
            target: TYPE_PARAM_CREATURE,
        }
    ),
    new AbilityAtom(
        "negate-biomemod",
        "negate {target} Creature's {biomeMod} biome modifier",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_CREATURE,
            biomeMod: TYPE_PARAM_BIOMEMOD,
        },
        {
            keywordable: false,
        }
    ),
    new AbilityAtom(
        "reveal",
        "reveal {target} Creature",
        LINETYPE_EFFECT,
        {
            target: TYPE_PARAM_CREATURE,
        }
    ),
    new AbilityAtom(
        "ward",
        "when an enemy Creature targets this Creature, they must pay Exhaust {cost}, or else their ability is cancelled",
        LINETYPE_EFFECT,
        {
            cost: TYPE_PARAM_NUMBER_WHOLE,
        }
    ),
    new AbilityAtom(
        "block-any",
        "{target} Creature gains *Block {block}*",
        LINETYPE_EFFECT,
        {
            block: TYPE_PARAM_NUMBER_WHOLE,
            target: TYPE_PARAM_CREATURE,
        }
    ),
    new AbilityAtom(
        "ward-any",
        "{target} Creature gains *Ward {ward}*",
        LINETYPE_EFFECT,
        {
            ward: TYPE_PARAM_NUMBER_WHOLE,
            target: TYPE_PARAM_CREATURE,
        }
    ),
].sort(sortFunc);
abilityAtoms
    .filter(atom => Object.entries(atom.params).length > 0)
    .forEach(atom => {
        Object.entries(atom.params).forEach(([key, value]) => {
            let tokenNames = [value].flat(Infinity);
            tokenNames.forEach(tokenName => {
                let token = abilityTokens.find(t => t.name == tokenName);
                if (!token) { return; }//it's ok, there could be non-tokens in the list
                if (token.subtokenname) {
                    atom.params[token.subtokenname] = token.subtokenname;
                }
            });
        });
    });

export function findAtom(atomName, atomType, loose= false) {
    let atom = abilityAtoms.find(a => a.name == atomName && (!atomType || a.type == atomType));
    if (atom) {
        return atom;
    }
    if (loose) {
        let split = atomName.split("-");
        atomName = split[0];
        atom = abilityAtoms.find(a => a.name == atomName && (!atomType || a.type == atomType));
        if (atom) {
            return atom;
        }
    }
    return undefined;
}
export function findToken(tokenName) {
    if (Array.isArray(tokenName)) {
        return tokenName.map(n => findToken(n)).flat(Infinity);
    }
    return abilityTokens.find(t => t.name == tokenName);
}
