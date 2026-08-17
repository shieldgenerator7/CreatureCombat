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

# Dictionary

Here’s what these non-keywords words mean.

-   A [creature] – Select a creature.  
    EX: “Give a creature +1” means select a creature and increase its bonus power value by 1.
-   Activate – use a creature’s ability. Triggering a creature’s ability as a reaction counts as activating it. Activating an ability adds it to the moment, or creates a new moment if it’s the first activated ability on a player’s turn.
-   Arrive – a creature arrives when it is played from a hand to the landmark
-   Army – a pile of creatures from which you may construct a hand for a landmark. It is not ordered and you may look at its contents at any time. You keep this hidden from the other players.
-   Bad Value – a value that players typically don’t want on their creatures, i.e. they want the value to be 0.
-   Big – having a high base power
-   Terrain – a part of a landmark that creatures may have modifiers for
-   Terrain Bonus – a positive terrain mod
-   Terrain Mod – an additional amount of power a creature gets for being in a certain terrain. Positive for a home terrain, negative for a foreign terrain. Default is 0 if the terrain is not listed on the creature
-   Terrain Penalty – a negative terrain mod
-   Bonus Power – the part of the creature’s power that gets added via card effects, and does not come from the creature’s base power or terrain mods.
-   Briefly – until the moment ends
-   Cancel – cause an ability in the moment to not resolve when it becomes the current processed ability.
-   Chosen – a friendly creature that was previously selected.  
    EX: “Give a friendly creature +1. Let the chosen creature fight a hostile creature.”
-   Claim – take control of a landmark. Claiming landmarks gets you closer to winning the game.
-   Creature – a card that has a power level and can contribute to the total power at a landmark. All cards are creatures.
-   Deploy – move a creature from your army to a hand at a landmark
-   Down – to increase a creature’s Damage value to or past its base power
-   Downed - a creature is downed while its Damage value is equal to or greater than its base power.
-   Difficult Terrain – a terrain on which a creature has a negative terrain mod for
-   Favored Terrain – a terrain on which a creature has a positive terrain mod for
-   Friendly – creatures on the same team are friendly
-   Good Value – a value that players typically want on their creatures, the higher the better
-   Hand – a collection of cards that you keep hidden from other players at the table. You play creatures from your hand to the landmark. Each hand is tied to a specific landmark.
-   Heal – decrease a creature’s Damage value
-   Healthy – a creature with a Damage value of 0 is healthy
-   Home – a landmark at which a creature has at least one terrain bonus for and no terrain penalties
-   Hostile – creatures on the enemy team are hostile
-   Landmark – a card that is a location where creatures are played to and has one or more terrains
-   Moment – when a creature takes an action, it creates a window of time in which other creatures can react. This is called a moment. Triggerable abilities can only trigger during a moment.
-   Play – to play a creature, move it from your hand to the landmark tied to that hand
-   Power – a creature’s total power.
-   Resolve – carry out the effect of the current processed ability in the moment.
-   Rest Zone – where your creatures go after the battle is over. When a creature is done resting, it returns to your army.
-   Shielded – a creature with Shield value of 1 or more is shielded
-   Small – having a low base power
-   Targeted – a hostile creature that was previously selected.  
    EX: “Take -1 from a hostile creature. Make the targeted creature fight a friendly creature.”
-   Total Power – a creature’s power, which is equal to its base power, terrain mods, bonus power, and temp bonus power. If a creature’s base power is 0, its total power is 0.
-   Trigger – to activate an ability when its condition is met
-   Value – a variable that is used to change the game state. Commonly tracked with counters. Values cannot go below 0. Values default to 0.
-   Wounded – a creature is wounded while its Damage value is 1 or more.

# MtG Dictionary

Words used in MtG and their WCC equivalent.

-   Artifact - creature
-   Battle – landmark
-   Counter - cancel
-   Creature – creature
-   Draw - deploy
-   Enchantment - creature
-   “Enters the battlefield” – arrives
-   Exile – no equivalent
-   Graveyard – downed
-   Hand – hand
-   Instant – creature with a fast Battlecry ability
-   Land – landmark, landmark mana
-   Library - army
-   Life total – no equivalent
-   Mana – mana
-   Mill – no equivalent
-   Phase – no equivalent?
-   Planeswalker - creature
-   Shuffle – no equivalent for army, shuffle for landmark deck
-   Sorcery – creature with a slow Battlecry ability or an ability with no trigger at all
-   Stack – moment / queue
-   Step – no equivalent?
-   Tap – tap
-   Target – a
-   “you control” – friendly
-   “you don’t control” - hostile

# Keyword Glossary

Here’s a list of some keywords in the game. Im sure I have a list of these somewhere else too. Complex keywords are ones that contain other keywords.

Strategy rock paper scissors (complex):

-   Flanking – Fight, Finale: Gain temp bonus power equal to the number of opposing creatures without Flanking, plus the number of opposing creatures with Ranged.
-   Flying – Fight, Finale: Gain temp bonus power equal to the number of opposing creatures without Flying, plus the number of opposing creatures with Flanking
-   Ranged – Fight, Finale: Gain temp bonus power equal to the number of opposing creatures without Ranged, plus the number of opposing creatures with Flying

Requirements:

-   Home – This creature must be at a home landmark
-   Once – This ability must not have been activated yet during this battle
-   Powerful X – This creature must have at least X total power in order to activate this ability
-   Social X – This creature must have X allies that share a type with it (including itself)
-   Symbiotic – The target creature of this ability must share a favored terrain with this creature

Ability triggers:

-   Ambush – When an enemy creature arrives, trigger this ability
-   Battlecry – When this creature arrives, trigger this ability
-   Block – When an enemy ability targets another ally creature, trigger this ability
-   Brawl – When two or more creatures fight, trigger this ability
-   Dawn – When the battle begins, trigger this ability
-   Deathrattle – When this creature has a damage value equal to its base power, trigger this ability
-   Dusk – When the battle ends, trigger this ability
-   Fight – When this creature fights one or more other creatures
-   Finale – When the battle is resolved, trigger this ability. Resolving a battle happens at super slow speed.
-   Greeting – When another ally creature arrives, trigger this ability
-   Instigate – When this creature takes the fight action
-   Intercept – When an enemy ability targets another enemy creature, trigger this ability
-   Retaliate – When this creature’s damage value increases, trigger this ability
-   Watcher – When another creature arrives (possibly with conditions), trigger this ability

Ability costs:

-   Rest X – When this ability is activated, this creature increases its exhaust value by X
-   Harvest X – Use X landmarks that you’ve claimed. Landmarks renew at the start of each round

Ability actions:

-   Cancel [magic genera] – Target activated ability of [magic genera] type doesn’t resolve.
-   Damage X – Target creature increases its damage value by X (default 1)
-   Deploy – Move a friendly creature from your army to your current hand
-   Fear – Return a hostile creature to their hand.
-   Heal X – Target creature decreases its damage value by X (default 1)
-   Power X – Target creature increases its bonus power value by X (default 1)
-   Scout X – Look at the top X cards from the Landmark deck, choose 1 as the scouted land, put it faceup on top, and put the rest on the bottom in any order
-   Shield X – Target creature increases its shield value by X (default 1)
-   Stun X – Target creature increases its stun value by X (default 1)
-   Temp X – (Complex) Target creature gains X temp bonus power. At the end of the moment, remove this temp bonus power
-   Ward X – As an additional cost to target this creature, a hostile creature increases its exhaust value by X (default 1)

Standard:

-   Channel – If this creature takes damage before this ability resolves, this ability is canceled
-   Native (Indigenous) – This creature starts the battle at the landmark, without triggering on-arrival.

Ability Speed:

-   Super Fast – This ability may jump ahead of a Fast ability.
-   Fast – This ability may jump ahead of a normal-speed ability.
-   Slow – This ability can’t jump ahead of a normal-speed ability.
-   Super Slow – This ability can’t jump ahead of a Slow ability.

# Design

This section is for the card designers. I tried to make an app that allows complete customization of a card, including auto-adding a creature’s cost and star count, but its way to complex to do accurately and allow complete freedom. So for now, I’m closing the design to only dedicated card designers, and then hopefully will have some avenue for community-created cards to be made official.

## Philosophy

WARNING: This section is a bit misnamed, and doesn’t represent the core goals of the design. Rather, it is a list of some guiding principles.

1.  Reduce game state that needs to be memorized
2.  Make comboing easy and fun
3.  Reduce frustrating mechanics

One: You don’t want players to have to remember several abilities everytime they do something. Abilities like “other creatures you control get +X/+X” are easy to forget when youre looking at the other creature and not the creature with this ability. Passives are a problem for this reason, they require the player to remember they exist. For that reason, passives are removed, and to do something similar, you have to explicitly define triggers and game state updates. For example, “Battlecry, Once: Power X all creatures you control.” paired with “Greeting: Power X arriving creature.” fills that gap quite nicely, while being optional triggered abilities. Note that the wording makes it a trigger-only ability: “arriving” is not the same as “target”.

Two: I like combo decks, and I dislike when my combos are interrupted with things like counterspell. Also, I hate having to randomly draw my pieces. Figuring out the whole library thing is an extra hurdle on top of figuring out the combo that I don’t want to deal with, because it severely limits what combos are viable. So now, you make a hand manually with cards you choose. I think the queue system also makes comboing more fun, tho I haven’t tested it yet.

Three: nothings more frustrating than having your creatures killed all the time. So in this game, theres no graveyard. Its like pokemon. Your creatures don’t die, they get exhausted. Also, there’s going to be design restrictions around things like canceling abilities. Plus, abilities can usually be activated more than once in a battle, so its not so bad if your super awesome ability gets canceled. Maybe, hopefully.

## Language

How we talk about the creatures matters, including the diction, grammar construction, and perspective.

In MtG, you are a powerful mage summoning creatures to your aid. But in this game, you as a player do not exist in-game. In Pokemon, youre the trainer, but in this game, you are the observer. You “observe” what the creatures do, by showing what they do by moving for them. You don’t control them, you merely update the board state based on what they would do. The language should reflect that.

Here’s some constructions in MtG and how they would be constructed in WCC:

-   “creature you control” -\> “friendly creature”
-   “creature you don’t control" -\> "hostile creature"
-   “target creature” -\> “a creature”
-   “that creature” -\> “the creature”, “chosen creature” (friendly), “targeted creature” (hostile)

Target one of your creatures: “a friendly creature”

Target an opponent’s creature: “a hostile creature”

Refer to a previously targeted friendly creature: “the chosen creature”

Refer to a previously targeted hostile creature: “the targeted creature”

Creature abilities should be phrased as a command, instead of a statement. The command word should always be the first word.  
NO: “This creature gives a friendly creature +1”  
NO: “A friendly creature gets +1”  
YES: “Give a friendly creature +1”  
MtG Translation: “Target creature you control gets +X/+X”

To have a temporary effect, add “briefly” at the end of an ability. This means it lasts until the moment ends.  
“Give a friendly creature +1, briefly”  
In MtG, they say things like “until end of turn”

Creatures ARE types, DO/CAN DO abilities, DO/CAN DO keywords, HAVE values, and are NAMED

-   “Transform a friendly creature into an Adir”
    -   “Target creature you control becomes an Elk in addition to its other types”
-   “Give a friendly creature +1. If the chosen creature is an Adir, give it +2 instead.”
    -   “Target creature gets +1/+1. If that creature is an Elk, give it +2/+2 instead.”
-   “Let friendly Adir creatures do: ‘Fight: Get +2’”
    -   “Elk creatures you control have ‘When this creature fights another creature, this creature gets +2/+2’”
-   “Let a friendly creature do Flying, briefly”
    -   “Target creature you control has Flying until end of turn”
-   “If a friendly creature has a shield value of 2, give the chosen creature +2”
    -   “If target creature you control has 2 or more shield counters, that creature gets +2/+2”

Don’t refer to ways of tracking game state, just refer to the game state. Don’t say “shield counters”, just say “shield value”.

Sentence construction. MtG sometimes writes in third-person present, as if it’s a novel. “Target creature gets +1/+1” for example. Id say most effects are commands, like “Put a +1/+1 counter on target creature” or “Add G”. WCC effects should always be commands. To that end, when describing something another creature should do, use “let” to say what a friendly creature does, and “make” to say what a hostile creature does. Ex: “Give a friendly creature +1. Take -1 from a hostile creature. Let the chosen creature untap. Make the targeted creature tap.”

## Rules

### Creature

**Name**: Each creature has a pet name and a species name. The pet name is what this instance of this creature is called, as if it were someone’s pet. Ex: “Spot”. The species name is what this creature is called if you saw a random one out in the wild. Ex: “cat”, “wolf”, “deer”. The pet name is for the player of that instance of the card to write on the card to mark that instance as distinct from the other instances. The species name is to help identify that creature so others players know generally what that card is capable of. A species can be represented by multiple different cards.

**Points**: The card cost is how many points it costs to put this creature in a player’s deck. The cost is auto-calculated by the creature’s base power and terrain mods. It is up to you, the designer, to increase the cost for the creature’s abilities. This number is the main way that you balance a card.

-   No point cost should evenly divide into 100. 5 and 2 are ok tho. This is to prevent players from running 5 copies of the same 20pt card or 2 copies of the same 50pt card, or 1 copy of a 100pt card. I mean, they still can, but then they will have a deck with a total point cost of less than 100, which is suboptimal. I might rescind this rule in the future, but for now I think this is a good rule.

**Star count**: The star count is just a summary of the cost.

**Tags**: The tags are for identifying groups this creature fits into. Ex: a tiger is a feline.

-   You can add as many tags as you want.
-   Please be careful to add existing tags instead of inventing new ones.
-   Note that tags have no mechanical function by default. They are there so abilities can use them to do stuff or target creatures with certain tags. Ex: Social cares that other creatures have the same tag, and abilities can say things like “damage all Plant creatures”.
-   Tags should describe what the creature *is*, not what the creature *does*. Ex: A falcon is a Bird, but it is not a Flying, because that’s not a thing. There’s a keyword Flying instead.

**Art**: Each creature has art for it. The art has its own set of rules.

**Rest cost**: This is how much the creature increases its exhaust value after a battle ends. This is another main way for you to balance a card. If you don’t explicitly write this here, the creature’s default rest cost is its base power.

**Ability**: Each creature can have about 1-3 abilities. Abilities are optional. Abilities have their own set of rules.

**Flavor text**: Ideally this flavor text tells or hints at part of the story involving this creature, or a specific instance of the creature in the lore. Ex: a deer creature might tell a snippet of Bambi’s story. The story should be set in-universe in the game’s lore. Or, it can just be a description or a quote or something. This one is really up to you.

**Base Power**: This is how much power the creature has no matter what terrain it’s in. This is functionally both its attack and defense value. As well as how much “hp” it has. And also its rest cost, if no rest cost is explicitly set. It is recommended to set this first to get a sense of the cards power, then balance the card by adjusting the point cost and rest cost at the end.

**Terrain Mods** (Modifiers): When a creature is in a terrain listed in this section, it gains a terrain mod to its power total. Ex: when Adir Doe is in a forest, her power is 7, because her base power is 2 and her Forest terrain mod is +5. Terrain mods with a positive value are called a “terrain bonus” and with a negative value its called a “terrain penalty”.

-   Creatures usually have about 3-5 terrain mods
-   Terrain mods are less costly than base power in the power budget
-   Terrain mods effectively modify a creature’s attack
-   There’s no colors in this game like in MtG, but this is this game’s equivalent
-   Keep in mind that the terrain mods are listed in order from highest to lowest, not alphabetically

### Art

Creature art for a card should follow these rules.

The art should depict the creature in its natural habitat, preferably in its favored terrain.

The art should show the creature’s whole body within the frame, and it should not be obscured by the environment, or at most lightly obscured. We want to see what the creature looks like.

There shouldn’t be other creatures in the pic, unless those are essential to the creature the art is for.

If the creature has an ability, the card may show the creature using that ability. Preferably it would not show the target of the ability if its another creature of a different species, but it may if necessary.

Showing multiple of the same creature is ok. Ex: itd be weird if you just saw 1 ant.

Each creature that has a magical ability has a focus that lets them use magic. The art should show the focus glowing that is used by an ability. Ex: a deer using a transformation magic ability should show its antlers glowing. Note that some creatures have more than one focus, and that each focus used by an ability on the card should be glowing. So in effect, a person could look at the drawing of the creature and generally tell what kind of magic its ability is going to use.

### Cards

Each card should have a front and a back. The back should always be the creature combat logo, or whatever the standard back design is. The following is prohibited, due to logistical headaches for publication and player experience:

-   Transforming cards that use the backside of the card as the other form
-   Combining cards that combine with another separate card to create one big card
-   Split cards that have two cards printed on them sideways side by side
-   Cards that rotate 180 degrees to have a different effect
-   Cards that flip to have different stats or abilities
-   Cards that rotate to change its stats or abilities

Most of these ideas come from MtG and are ways that they added an element of surprise, novelty, and flexibility to cards. The main way to do this in this game is to have an effect that switches out the current creature with a creature from your army and/or side board. If we have a side board. It can name a specific card if it needs to. I’m aware this might create problems for booster packs where you get one half and not the other. That’s a problem to solve for a different day. Mostly I don’t want to deal with logistical headaches from card layouts.

### Abilities

Here are the rules for the abilities, and some restrictions on what they can or cant do. Note that the guide language for the abilities is in the language section, this section is a guide for the design of the abilities.

-   Abilities can only effect creatures in the same zone.
    -   Creatures at the landmark can only effect other creatures at the same landmark
    -   Creatures in the hand at the landmark are fair game
    -   The exception to this rule is deploy, which lets you move a creature from your army to your hand.
-   Abilities can’t be passives that need updated constantly
    -   Its recommended to have them trigger when important  
        EX: instead of “friendly creatures have +1”, say “Fight, Finale: Give friendly creatures +1, briefly”
-   Triggered abilities can be activated without the trigger once on a player’s turn. So separate the trigger from the effect.
-   Requirements are only checked when an ability is about to be resolved. Which means it can be activated without meeting the requirement, but if the requirement is met before it is checked, the ability can resolve
-   Abilities can’t have an effect that permanently changes the physical card in anyway (no “draw on this card” or “rip this card” effects)
-   Abilities can check to see if the creature has a pet name (which is a permanent change to the card), and if that pet name matches the pet name on other creatures (used for transformation effects)
-   Abilities can modify any value.
-   Abilities cannot modify a creature’s base power. Instead, for attack, increase a creature’s bonus power; for defense, increase a creature’s shield value.
-   Abilities can refer to a specific card by species name, although it is discouraged. It’s better to refer to a creature’s type
-   Abilities can refer to a creature’s type
-   “Replacement effects” are banned because they make for messy rules. This includes things like “When a creature would take damage, they heal for that amount instead.” Instead, write something like “Give a creature protection from damage, briefly. The selected creature gains an ability: ‘When I receive damage, I heal for the damage received.’, briefly.”
-   Ability speed notes (note that “interrupt” just means go before, it does not mean cancel):
    -   Super fast – rare, used for effects that can’t be interrupted.
    -   Fast – happens before the triggering ability. Used to make abilities meant to interrupt other creature’s abilities
    -   Medium – this is the default. When an ability or action doesn’t say what speed it is, it goes at this speed.
    -   Slow – other abilities can interrupt it. Used for giant massive game changing abilities.
    -   Super slow – rare, used for effects that need to go after slow abilities, like resolving the battle.

### Landmark

Landmarks typically have 3 terrains.

A landmark can have an ability that any player can activate. Still, it can only be activated once per moment.

A landmark has a mana pool which creatures may spend to activate abilities. This usually doesn’t refill, or refills only slowly. So you can adjust this value to effect how long a battle will last here. Lots of mana usually means longer battles.

In addition, a landmark can have a mana refill amount, which is how much mana refills in the pool at the start of each player’s turn. This is another lever that can used to effect the length of battles.

# References

Mark Rosewater’s 20 fav MtG mechanics  
<https://youtu.be/_YvqTR0Zvno?t=3481>

Kohdok’s guide to TCG instructions: pieces needed  
<https://youtu.be/w6nbElJLud8?t=1044>
