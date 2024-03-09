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
        "Gain X Base Power.",
        (x) => x
    ),
    new AbilityAtom(
        "change-biome",
        "Look at the top X cards of the Land deck, and choose 1 to place on top of the current Land. That Land determines the biome for this battle. At the end of the round, shuffle that Land into the Land deck.",
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
        "Create a duplicate of target Creature until the end of the round. At the end of the round, add X Rest counters to that Creature.",
        (x) => 5 - x * 1.5
    ),
    new AbilityAtom(
        "move-from-ready-to-Land",
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
        (x) => x * 0.3
    ),
    new AbilityAtom(
        "ward-any",
        "Target Creature has Ward X.",
        (x) => x * 0.3
    ),
];

const abilityCosts = [
    new AbilityAtom(
        "exhaust",
        "Reduce this Creature's Base Power by X",
        (x, c) => c - x
    ),
    new AbilityAtom(
        "rest",
        "Add X Rest counters to this Creature.",
        (x, c) => c / (x + 1)
    )
];

const abilityRequirements = [
    new AbilityAtom(
        "home",
        "This Creature must be in a home biome.",
        (x, c) => c * 0.5
    ),
    new AbilityAtom(
        "type-count",
        "This Creature must have at least X allies that share a type with it, including itself.",
        (x, c) => c - (x * 0.2)
    ),
    new AbilityAtom(
        "target-rest-count",
        "Target Creature must have at least X Rest counters on it.",
        (x, c) => c - x * 2
    ),
    new AbilityAtom(
        "target-type-share",
        "Target Creature must share at least X types with this Creature.",
        (x, c) => c / (x + 1)
    ),
    new AbilityAtom(
        "channel",
        "If this Creature takes any amount of damage between activating this ability and completing it, its ability effect is canceled.",
        (x, c) => c * 0.5
    ),
    new AbilityAtom(
        "targeter-type-share",
        "The targeter must share at least X types with this Creature.",
        (x, c) => c / (x + 1)
    )
]
