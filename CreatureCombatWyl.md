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

## Player Actions

On each player’s turn, they have 1 action, and they can use it to do any of the following:

-   Play a Creature
-   Activate a creature’s ability
-   Fight a creature
-   Resolve the battle

At each landmark, each player places creatures to be their “hand”. To play a creature, move a creature from your hand to the landmark.

You can activate a creature’s ability, if all conditions are met, and if you pay any costs associated with it.

Fight a creature: Your creature and another creature fight. The creatures with the highest power deal damage to the other creatures without the highest power. The damage dealt is equal to the highest creature’s base power. If the highest power is double the second highest power, the damage is doubled. This action is slow.

Resolving the battle means tallying up the total power of all creatures for each player, and the player with the highest total power wins the landmark. This action is super slow.

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

Each player has a hand, which contains all creatures deployed to that landmark but who haven’t arrived yet. When a player plays that creature, that creature arrives at the landmark. This zone is part of the battle zone.

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

## Focus

In the Wyl lore, each creature has a differently shaped focus that lets them more easily cast certain types of magic. Each type of magic has an optimal shape for casting, and each focus shape has a name and a symbol associated with it. The name of the shape and/or the symbol can appear on an ability as a tag, allowing special interactions with abilities that use a certain focus.

For example, there will be no creature ability that says “cancel target creature ability”, but there could be “cancel target creature ability using [specific focus type]”

## Abilities

Each creature can have abilities. An ability can be activated manually on a player’s turn, starting a moment. An ability can also be triggered by another ability, an action, or the start of a moment. A triggerable ability can still be activated manually, despite specifying a trigger. This is a departure from MtG passives and triggered abilities. “Activated” includes “activated manually” or “triggered”. “Activated” means adding the ability to the queue. “Resolve” means to actually carry out the abilty’s effects.

An ability can have one or more triggers. When the specified event happens, you may choose to activate the ability. This is optional. If it has more than one trigger, only one triggering event has to happen to trigger it.

Some abilities say things such as “arriving” and “triggering” creature. Abilities that say this can still be manually activated, but there will be no arriving or triggering creature, so that part of the ability won’t do anything.

Some abilities have requirements, which must be satisfied in order for the ability to be resolved. If the ability has at least 1 unsatisfied requirement when it comes up in the queue, then it is canceled. Note that this means you can activate an ability that doesn’t meet the requirements, and if the requirements are met by the time the ability is to resolve, then the ability resolves. This also means an ability that doesn’t meet the requirements can still trigger other abilities.

An ability can have costs. These costs must be paid to activate the ability, even if the ability is triggered.

Abilities are all activatable. There are no passive abilities in this game.

Complex keywords. Some keywords are complex to make up for the lack of passives in this game. If a keyword has an activatable component to it, then it is only accessible through the specified trigger. For example, Flying only triggers when the battle resolves. You may not activate this effect manually.

General note for triggering events: abilities can be triggered by other abilities, player actions, and moments starting in the same zone as the creature. Creatures cannot interact with creatures in other zones. Moments can only happen in the battle zone. Special rare abilities that can be activated in the rest zone don’t trigger anything, because they don’t make a moment. Abilities can only be activated inside a moment (except the special rare resting zone abilities). For clarification, the following each create a moment: battle beginning, battle resolving, battle ending. The individual steps of the rest process do not create moments.

## Moments

Each player’s turn is a “moment”. Its like a turn in DnD, it’s a very small amount of time in which a lot can happen. It’s also similar to a stack in MtG, but it works differently.

When a player takes an action on their turn, it starts a moment. Each player may trigger any applicable abilities of their creatures or an applicable triggering ability of the landmark creature. When an ability is triggered, it is put at the back of the queue. The triggered ability can trigger even more abilities, and multiple abilities can trigger from the same triggering ability.

Once no more abilities are being triggered, then the queue resolves, from the start to the end.

Ability ordering: A triggered ability can go before its triggering ability, if the triggered ability’s speed is greater than the speed of the triggering ability. If several creatures trigger their ability from the same triggering ability, first order them by the ability’s speed, then by player turn order, with the current player’s triggered abilities going first.

One ability per creature per moment: Each creature can only be in the queue once per moment, even if several abilities could trigger it, and even if the creature has multiple abilities that could trigger.

Creature arrival: abilities can trigger when a creature arrives. If the creature has a battlecry ability, it activates right after it arrives, regardless of the speed of the ability. If the speed matters, it changes when the arrival happens too.

Adjoined action and triggered ability: When a creature reacts to its own action (such as with arriving and Battlecry, fighting and Fight), the action and the trigger are adjoined, mean they happen right after the other. First, the action happens, and then the ability happens, with no other ability from other creatures in between. If the speed of the action and the speed of the ability are different, use the speed of the ability.

## Speeds

Abilities and actions have a speed that determine where they get placed in the queue. Note that “interrupt” just means “go before it” and does not necessarily mean that the interrupted ability gets canceled.

-   Super fast – rare, used for effects that can’t be interrupted.
-   Fast – happens before the triggering ability. Used to make abilities meant to interrupt other creature’s abilities
-   Medium – this is the default. When an ability or action doesn’t say what speed it is, it goes at this speed.
-   Slow – other abilities can interrupt it. Used for giant massive game changing abilities.
-   Super slow – rare, used for effects that need to go after slow abilities, like resolving the battle.

# Keyword Glossary

Here’s a list of some keywords in the game. Im sure I have a list of these somewhere else too. Complex keywords are ones that contain other keywords.

Strategy rock paper scissors (complex):

-   Flanking – Fight, Finale: Gain temp bonus power equal to the number of opposing creatures without Flanking, plus the number of opposing creatures with Ranged.
-   Flying – Fight, Finale: Gain temp bonus power equal to the number of opposing creatures without Flying, plus the number of opposing creatures with Flanking
-   Ranged – Fight, Finale: Gain temp bonus power equal to the number of opposing creatures without Ranged, plus the number of opposing creatures with Flying

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
-   Brawl – When two or more creatures fight, trigger this ability
-   Dawn – When the battle begins, trigger this ability
-   Deathrattle – When this creature has damage counters equal to its total power, trigger this ability
-   Dusk – When the battle ends, trigger this ability
-   Fight – When this creature fights one or more other creatures
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
-   Temp X – (Complex) Target creature gains X temp bonus power. At the end of the moment, remove this temp bonus power
-   Ward X – When an enemy creature targets this creature, it gains X exhaustion counters (default 1)

Standard:

-   Channel – If this creature takes damage before this ability resolves, this ability is canceled
-   Landmark – This creature is all biome types for which it has a biome bonus (positive biome mod)
-   Native (Indigenous) – This creature starts the battle at the landmark, without triggering on-arrival.

Ability Speed:

-   Fast – This is the fastest ability speed. When this ability is triggered, it may go before its triggering ability, unless that triggering ability also is Fast (you decide).
-   (Medium) – This is the default speed. Abilities without Fast or Slow are this speed
-   Slow – This is the slowest ability speed. When this ability triggers another ability, that triggered ability may go before this ability, unless they also are Slow (the player of the triggered ability decides).

# Design

This section is for the card designers. I tried to make an app that allows complete customization of a card, including auto-adding a creature’s cost and star count, but its way to complex to do accurately and allow complete freedom. So for now, I’m closing the design to only dedicated card designers, and then hopefully will have some avenue for community-created cards to be made official.

## Philosophy

1.  Reduce game state that needs to be memorized
2.  Make comboing easy and fun
3.  Reduce frustrating mechanics

One: You don’t want players to have to remember several abilities everytime they do something. Abilities like “other creatures you control get +X/+X” are easy to forget when youre looking at the other creature and not the creature with this ability. Passives are a problem for this reason, they require the player to remember they exist. For that reason, passives are removed, and to do something similar, you have to explicitly define triggers and game state updates. For example, “Battlecry, Once: Power X all creatures you control.” paired with “Greeting: Power X arriving creature.” fills that gap quite nicely, while being optional triggered abilities. Note that the wording makes it a trigger-only ability: “arriving” is not the same as “target”.

Two: I like combo decks, and I dislike when my combos are interrupted with things like counterspell. Also, I hate having to randomly draw my pieces. Figuring out the whole library thing is an extra hurdle on top of figuring out the combo that I don’t want to deal with, because it severely limits what combos are viable. So now, you make a hand manually with cards you choose. I think the queue system also makes comboing more fun, tho I haven’t tested it yet.

Three: nothings more frustrating than having your creatures killed all the time. So in this game, theres no graveyard. Its like pokemon. Your creatures don’t die, they get exhausted. Also, there’s going to be design restrictions around things like canceling abilities. Plus, abilities can usually be activated more than once in a battle, so its not so bad if your super awesome battle gets canceled. Maybe, hopefully.

## Rules

### Creature

**Name**: Each creature has a pet name and a species name. The pet name is what this instance of this creature is called, as if it were someone’s pet. Ex: “Spot”. The species name is what this creature is called if you saw a random one out in the wild. Ex: “cat”, “wolf”, “deer”. The pet name is for the player of that instance of the card to write on the card to mark that instance as distinct from the other instances. The species name is to help identify that creature so others players know generally what that card is capable of.

**Points**: The card cost is how many points it costs to put this creature in a player’s deck. The cost is auto-calculated by the creature’s base power and biome mods. It is up to you, the designer, to increase the cost for the creature’s abilities. This number is the main way that you balance a card.

**Star count**: The star count is just a summary of the cost.

**Tags**: The tags are for identifying groups this creature fits into. Ex: a tiger is a feline.

-   You can add as many tags as you want.
-   Please be careful to add existing tags instead of inventing new ones.
-   Note that tags have no mechanical function by default. They are there so abilities can use them to do stuff or target creatures with certain tags. Ex: Social cares that other creatures have the same tag, and abilities can say things like “damage all Plant creatures”.
-   Tags should describe what the creature *is*, not what the creature *does*. Ex: A falcon is a Bird, but it is not a Flying, because that’s not a thing. There’s a keyword Flying instead.

**Art**: Each creature has art for it. The art has its own set of rules.

**Rest value**: This is how many Exhaustion counters to put on a creature after a battle ends. This is another main way for you to balance a card. If you don’t explicitly write this here, the creature’s default rest value is its base power.

**Ability**: Each creature can have about 1-3 abilities. Abilities are optional. Abilities have their own set of rules.

**Flavor text**: Ideally this flavor text tells or hints at part of the story involving this creature, or a specific instance of the creature in the lore. Ex: a deer creature might tell a snippet of Bambi’s story. The story should be set in-universe in the game’s lore. Or, it can just be a description or a quote or something. This one is really up to you.

**Base Power**: This is how much power the creature has no matter what biome it’s in. This is functionally both its attack and defense value. As well as how much “hp” it has. And also its Rest “cost”, if no rest value is explicitly set. It is recommended to set this first to get a sense of the cards power, then balance the card by adjusting the point cost and rest value at the end.

**Biome Mods** (Modifiers): When a creature is in a biome listed here, it gains a biome mod to its power. Ex: when Adir Doe is in a forest, her power is 7, because her base power is 2 and her Forest biome mod is +5. Biome mods with a positive value are called a “biome bonus” and with a negative value its called a “biome penalty”.

-   Creatures usually have about 3-5 biome mods
-   Biome mods are less costly than base power in the power budget
-   Biome mods effectively modify a creature’s attack
-   There’s no colors in this game like in MtG, but this is this game’s equivalent
-   Keep in mind that the biome mods are listed in order from highest to lowest
-   The first biome mod in the list is that creature’s home biome. This is important if the creature is used as a landmark

### Art

Creature art for a card should follow these rules.

The art should depict the creature in its natural habitat, preferably its home biome.

The art should show the creature’s whole body within the frame, and it should not be obscured by the environment, or at most lightly obscured. We want to see what the creature looks like.

There shouldn’t be other creatures in the pic, unless those are essential to the creature the art is for.

If the creature has an ability, the card may show the creature using that ability. Preferably it would not show the target of the ability if its another creature of a different species, but it may if necessary.

Showing multiple of the same creature is ok. Ex: itd be weird if you just saw 1 ant.

Each creature that has a magical ability has a focus that lets them use magic. The art should show the focus glowing that is used by an ability. Ex: a deer using a transformation magic ability should show its antlers glowing. Note that some creatures have more than one focus, and that each focus used by an ability on the card should be glowing. So in effect, a person could look at the drawing of the creature and generally tell what kind of magic its ability is going to use.

## Cards

Each card should have a front and a back. The back should always be the creature combat logo, or whatever the standard back design is. The following is prohibited, due to logistical headaches for publication and player experience:

-   Transforming cards that use the backside of the card as the other form
-   Combining cards that combine with another separate card to create one big card
-   Split cards that have two cards printed on them sideways side by side
-   Cards that rotate 180 degrees to have a different effect
-   Cards that flip to have different stats or abilities
-   Cards that rotate to change its stats or abilities

Most of these ideas come from MtG and are ways that they added an element of surprise, novelty, and flexibility to cards. The main way to do this in this game is to have an effect that switches out the current creature with a creature from your army and/or side board. If we have a side board. It can name a specific card if it needs to. I’m aware this might create problems for booster packs where you get one half and not the other. That’s a problem to solve for a different day. Mostly I don’t want to deal with logistical headaches from card layouts.

# References

Mark Rosewater’s 20 fav MtG mechanics  
<https://youtu.be/_YvqTR0Zvno?t=3481>
