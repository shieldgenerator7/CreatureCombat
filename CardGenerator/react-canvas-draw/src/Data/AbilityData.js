"use strict";

import AbilityAtom from "./AbilityAtom";

const abilityEffects = [
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
        "Move this Creature to another land.",
        (x) => 10
    ),
    new AbilityAtom(
        "attack-all-nonself",
        "Deal X damage to all other Creatures.",
        (x) => x
    ),
    new AbilityAtom(//danger: exploitable! esp when only paired with exhaust cost
        "powerup",
        "Gain X Base Power.",
        (x) => x
    ),
    new AbilityAtom(
        "change-biome",
        "Look at the top X cards of the land deck, and choose 1 to place on top of the current land. That land determines the biome for this battle. At the end of the round, shuffle that land into the land deck.",
        (x) => x + 2
    ),
    new AbilityAtom(
        "attack-type-enemy",
        "Choose a type. Deal X damage to all enemy Creatures of that type.",
        (x) => x * 1.5
    ),
    new AbilityAtom(
        "recovery",
        "When you use a land card to recover this creature, remove X Rest counters instead of 1.",
        (x) => x - 1
    ),
    new AbilityAtom(
        "rest",
        "Add X Rest counters to target Creature.",
        (x) => x - 1
    ),
    new AbilityAtom(
        "negate-biomemod",
        "Negate target Creature's biome bonus.",
        (x) => 2
    ),
    new AbilityAtom(
        "bounce",
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
        "Summon a duplicate of target creature until the end of the round. At the end of the round, add X Rest counters to that creature.",
        (x) => 5 - x * 1.5
    ),
    new AbilityAtom(
        "move-from-ready-to-land",
        "Move target creature from your Ready pile to this land.",
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
        "Reveal this creature. Reveal target creature.",
        (x) => 2
    ),
    new AbilityAtom(
        "absorb",
        "If this creature would take damage, it heals that amount instead.",
        (x) => 10
    ),
    new AbilityAtom(
        "ward",
        "When an enemy creature targets this creature, they must pay Exhaust X, or else their ability has no effect on this creature.",
        (x) => x * 0.3
    ),
    new AbilityAtom(
        "ward-any",
        "Target creature has Ward X.",
        (x) => x * 0.3
    ),
];

const abilityCosts = [
    new AbilityAtom(
        "exhaust",
        "Reduce this creature's Base Power by X",
        (x, c) => c - x
    ),
    new AbilityAtom(
        "rest",
        "Add X Rest counters to this creature.",
        (x, c) => c / (x + 1)
    )
];

const abilityRequirements = [
    new AbilityAtom(
        "home",
        "This creature must be in a home biome.",
        (x, c) => c * 0.5
    ),
    new AbilityAtom(
        "type-count",
        "This creature must have at least X allies that share a type with it, including itself.",
        (x, c) => c - (x * 0.2)
    ),
    new AbilityAtom(
        "target-rest-count",
        "Target creature must have at least X Rest counters on it.",
        (x, c) => c - x * 2
    ),
    new AbilityAtom(
        "target-type-share",
        "Target creature must share at least X types with this creature.",
        (x, c) => c / (x + 1)
    ),
    new AbilityAtom(
        "channel",
        "If this creature takes any amount of damage between activating this ability and completing it, its ability effect is canceled.",
        (x, c) => c * 0.5
    ),
    new AbilityAtom(
        "targeter-type-share",
        "The targeter must share at least X types with this creature.",
        (x, c) => c / (x + 1)
    )
]
