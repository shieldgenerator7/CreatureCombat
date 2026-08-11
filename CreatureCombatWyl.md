# Wyl Creature Combat

I originally made the Wyl Magic System for DnD, but I realized that its more of a lore thing than a thing specific to TTRPGs. And I can use it in Creature Combat.

So in the last iteration of Creature Combat, each creature has a base power and gains bonus power based on the land its played on. It has abilities to that you can just activate. Theres no mana costs. So it seems weird to combine this with Wyl, right?

But that’s where the lore comes in, with the different shaped focus and how the focus glows. It adds a visual design language to the creatures that give them a unique identity that they didn’t have before.

Plus, you can add tags to each creature based on what kind of focus it uses for the ability on its card. That solves a problem I was thinking about earlier. In MtG, they have all these card types: Creature, Land, Enchantment, Artifact, Instant, Sorcery. But in CC, theres only one card type: Creature. This means there’s a lot less concepts to interact with in a card’s ability text. But theres tags. So in CC, an “Enchantment” would just be a creature with a special tag. Here’s other relations (I removed Land type from CC in favor of making it a special kind of creature):

-   Creature – Creature
-   Enchantment – Creature with “Enchantment” tag (or other specific tag, works like creature tags)
-   Artifact – Creature with “Artifact” tag (or other specific tag, works like creature tags)
-   Instant – Creature with interrupt battlecry ability, w/ or w/o trigger condition
-   Sorcery – Creature with battlecry ability
-   Land – Creature with Landmark ability

Battlecry: When this creature arrives (enter the battlefield), it triggers this ability

Landmark – While this creature is the landmark, it is a land of all types it has positive bonuses for. (and each creature here gets bonuses for all those types) Landmarks may also have to be unique. Also, it may have an ability that any player may activate. Rule: the landmark has to be a creature of some type, not just a geographical feature.

One thing I dislike about the MtG rules is that triggered abilities MUST be triggered, or its an illegal game state. In CC, the trigger abilities are all optional. Furthermore, triggers are NOT conditions, meaning you can activate a triggerable ability even if it wasn’t triggered. Triggers are still important tho, because they allow you to activate an ability on an opponent’s turn.

Theres no stack in this game, at least not like in MtG.

On each player’s turn, they have 1 action, and they can use it to do any of the following:

-   Play a Creature
-   Activate a creature’s ability
-   Resolve the battle

At each landmark, each player places creatures to be their “hand”. To play a creature, move a creature from your hand to the landmark.

You can activate a creature’s ability, if all conditions are met, and if you pay any costs associated with it.

Resolving the battle means tallying up the total power of all creatures for each player, and the player with the highest total power wins the landmark.

# Player Guide

## Goal

Claim the most landmarks by the end of the game. The game ends when all landmarks have been claimed.

## Setup

Shuffle all landmarks into one big pile. Each player brings their own creature deck (called their “army”) that meets the criteria. (see deckbuilding). Players do not need to shuffle their army.

## Round

At the start of each round, Place a landmark in the center of the table.

Players secretly pull creatures from their army to deploy to the landmark.

Once all players have pulled creatures, all pulled creatures get deployed to the landmark, getting placed in the player’s hand.

Each player places Native creatures face up at the landmark (this doesn’t trigger battlecry or watcher effects).

The player who pulled the least amount of creatures chooses if they want to go first or not.

Players take their turns in order, play continues to the player on the left (clockwise).

When a player resolves the battle, all players total up their creatures’ combined power. The player with the highest total power wins the battle, and claims the landmark.

Each player processes their resting creatures:

1.  Your creatures in the battle zone and creatures in your hand each gain exhaustion counters equal to their Rest value (default value is its star count)
2.  Your creatures in the battle zone and your creatures in a hand each go to your resting zone.
3.  Creatures in your resting zone lose an exhaustion counter.
4.  Creatures in your resting zone with no exhaustion counters return to your army.

The round ends.

If there are no more landmarks left, the player who claimed the most landmarks wins the game.

## Zones

There are 3 zones:

-   Army (each player)
-   Battle (only 1)
-   Hand (each player)
-   Resting (each player)

Each player has an army zone, which has every creature that a player can deploy to a landmark.

The battle zone includes the current landmark and all creatures at that landmark.

Each player has a hand, which contains all creatures deployed to that landmark but who haven’t arrived yet. When a player plays that creature, that creature arrives at the landmark.

Each player has a Rest zone, where their creatures go to rest between battles.

Whenever a creature gets put in your hand or your army, it loses all counters.

## Counters

Counters are markers you put on creatures to indicate a change in state. Counters stack.

Common counters:

-   Exhaustion counters. After battling, each creature gets exhaustion counters. While a creature has exhaustion counters, it cant be added to your army. Each resting creature loses an exhaustion counter at the end of each round.
-   Power counters. Each one increases your creature’s bonus power by 1.
-   Damage counters. Each one decreases your creature’s bonus power by 1. If a creature has damage equal to or greater than their base power, they don’t contribute their power to the combined total.
-   Stun counters. If a creature has any stun counters, it is stunned: its abilities cant be resolved. At the start of each player’s turn, they remove a stun counter from each of their creatures.
-   Shield counters. If a creature would gain a damage counter, instead remove a shield counter. Adding a shield counter doesn’t remove existing damage counters.

## Tags vs Keywords

Tags are descriptors used to specify what kind of creature it is, and allow players to determine which creatures are alike by the tags they share. Tags have no meaning by themselves. Some creatures may care about certain tags, and have special interactions with creatures that have certain tags. You can find the tags listed below the creature’s species name.

Keywords have meaning and mechanics behind them. Each keyword does something different. In addition, some creatures care about certain keywords and may have special interactions with creatures that have certain keywords. You can find keywords within the creature’s ability text.

## Abilities

Each creature can have abilities. An ability can be activated manually on a player’s turn, starting a moment. An ability can also be triggered by another ability, an action, or the start of a moment. A triggerable ability can still be activated manually, despite specifying a trigger. This is a departure from MtG passives and triggered abilities. “Activated” includes “activated manually” or “triggered”. “Activated” means adding the ability to the queue. “Resolve” means to actually carry out the abilty’s effects.

Some abilities have requirements, which must be satisfied in order for the ability to be resolved. If the ability has at least 1 unsatisfied requirement when it comes up in the queue, then it is canceled. Note that this means you can activate an ability that doesn’t meet the requirements, and if the requirements are met by the time the ability is to resolve, then the ability resolves.

An ability can have costs. These costs must be paid to activate the ability, even if the ability is triggered.

Abilities are all activatable. There are no passive abilities in this game.

Complex keywords. Some keywords are complex to make up for the lack of passives in this game. If a keyword has an activatable component to it, then it is only accessible through the specified trigger. For example, Flying only triggers when the battle resolves. You may not activate this effect manually.

## Moments

Each player’s turn is a “moment”. Its like a turn in DnD, it’s a very small amount of time in which a lot can happen. It’s also similar to a stack in MtG, but it works differently.

When a player takes an action on their turn, it starts a moment. Each player may trigger any applicable abilities of their creatures or an applicable triggering ability of the landmark creature. When an ability is triggered, it is put at the back of the queue. The triggered ability can trigger even more abilities, and multiple abilities can trigger from the same triggering ability.

Once no more abilities are being triggered, then the queue resolves, from the start to the end.

Ability ordering: A triggered ability can go before its triggering ability, if the triggered ability’s speed is greater than the speed of the triggering ability. If several creatures trigger their ability from the same triggering ability, first order them by the ability’s speed, then by player turn order, with the current player’s triggered abilities going first.

One ability per creature per moment: Each creature can only be in the queue once per moment, even if several abilities could trigger it, and even if the creature has multiple abilities that could trigger.

Creature arrival: abilities can trigger when a creature arrives. If the creature has a battlecry ability, it activates right after it arrives, regardless of the speed of the ability. If the speed matters, it changes when the arrival happens too.

## Speeds

Abilities and actions have a speed that determine where they get placed in the queue. Note that “interrupt” just means “go before it” and does not necessarily mean that the interrupted ability gets canceled.

-   Super fast – rare, used for effects that can’t be interrupted. For example, Battlecry is super fast because it needs to happen right after the creature enters.
-   Fast – happens before the triggering ability. Used to make abilities meant to interrupt other creature’s abilities
-   Medium – this is the default. When an ability or action doesn’t say what speed it is, it goes at this speed.
-   Slow – other abilities can interrupt it. Used for giant massive game changing abilities.
-   Super slow – rare, used for effects that need to go after slow abilities, like resolving the battle.

# Keyword Glossary

Here’s a list of some keywords in the game. Im sure I have a list of these somewhere else too. Complex keywords are ones that contain other keywords.

Strategy rock paper scissors (complex):

-   Flanking – Finale: Gain bonus power equal to the number of opposing creatures without Flanking, plus the number of opposing creatures with Ranged
-   Flying – Finale: Gain bonus power equal to the number of opposing creatures without Flying, plus the number of opposing creatures with Flanking
-   Ranged – Finale: Gain bonus power equal to the number of opposing creatures without Ranged, plus the number of opposing creatures with Flying

Requirements:

-   Home – This creature must be in a home biome (a biome in which it has a biome bonus)
-   Once – This ability must not have been activated yet during this battle
-   Powerful X – This creature must have at least X total power in order to activate this ability
-   Social X – This creature must have X allies that share a type with it (including itself)
-   Symbiotic – The target creature of this ability must share a home biome with this creature

Ability triggers:

-   Ambush – When an enemy creature arrives, trigger this ability
-   Battlecry – When this creature arrives, trigger this ability
-   Block – When an enemy ability targets another ally creature, trigger this ability
-   Dawn – When the battle begins, trigger this ability
-   Deathrattle – When this creature has damage counters equal to its total power, trigger this ability
-   Dusk – When the battle ends, trigger this ability
-   Finale – When the battle is resolved, trigger this ability. Resolving a battle happens at super slow speed.
-   Greeting – When another ally creature arrives, trigger this ability
-   Intercept – When an enemy ability targets another enemy creature, trigger this ability
-   Retaliate – When this creature gains damage counters, trigger this ability
-   Watcher – When another creature arrives (possibly with conditions), trigger this ability

Ability costs:

-   Rest X – When this ability is activated, this creature gains X exhaust counters
-   Harvest X – Use X landmarks that you’ve claimed. Landmarks renew at the start of each round

Ability actions:

-   Damage X – Target creature gains X damage counters (default 1)
-   Heal X – Target creature loses X damage counters (default 1)
-   Power X – Target creature gains X power counters (default 1)
-   Scout X – Look at the top X cards from the Landmark deck, choose 1 as the scouted land, put it faceup on top, and put the rest on the bottom in any order
-   Shield X – Target creature gains X shield counters (default 1)
-   Stun X – Target creature gains X stun counters (default 1)
-   Ward X – When an enemy creature targets this creature, it gains X exhaustion counters (default 1)

Standard:

-   Channel – If this creature takes damage before this ability resolves, this ability is canceled
-   Landmark – This creature is all biome types for which it has a biome bonus (positive biome mod)
-   Native (Indigenous) – This creature starts the battle at the landmark, without triggering on-arrival.

Ability Speed:

-   Fast – This is the fastest ability speed. When this ability is triggered, it may go before its triggering ability, unless that triggering ability also is Fast (you decide).
-   (Medium) – This is the default speed. Abilities without Fast or Slow are this speed
-   Slow – This is the slowest ability speed. When this ability triggers another ability, that triggered ability may go before this ability, unless they also are Slow (the player of the triggered ability decides).
