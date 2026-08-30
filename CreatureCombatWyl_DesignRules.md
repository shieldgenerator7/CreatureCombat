**Design**

This section is for the card designers. I tried to make an app that allows complete customization of a card, including auto-adding a creature’s cost and star count, but its way to complex to do accurately and allow complete freedom. So for now, I’m closing the design to only dedicated card designers, and then hopefully will have some avenue for community-created cards to be made official.

**Philosophy**

WARNING: This section is a bit misnamed, and doesn’t represent the core goals of the design. Rather, it is a list of some guiding principles.

1.  Reduce game state that needs to be memorized
2.  Make comboing easy and fun
3.  Reduce frustrating mechanics

One: You don’t want players to have to remember several abilities everytime they do something. Abilities like “other creatures you control get +X/+X” are easy to forget when youre looking at the other creature and not the creature with this ability. Passives are a problem for this reason, they require the player to remember they exist. For that reason, passives should be reduced, and to do something similar, you have to explicitly define triggers and game state updates. For example, “Battlecry, Once: Power X all creatures you control.” paired with “Greeting: Power X arriving creature.” fills that gap quite nicely, while being optional triggered abilities. Note that the wording makes it a trigger-only ability: “arriving” is not the same as “target”.

Two: I like combo decks, and I dislike when my combos are interrupted with things like counterspell. The problem is that a single counterspell counters everything in the game. If each counterspell only countered one or two things, then it’s ok. Also, I hate having to randomly draw my pieces. Figuring out the whole library thing is an extra hurdle on top of figuring out the combo that I don’t want to deal with, because it severely limits what combos are viable. So now, you make a hand manually with cards you choose. I think the queue system also makes comboing more fun, tho I haven’t tested it yet.

Three: nothings more frustrating than having your creatures killed all the time. So in this game, theres no graveyard. Its like pokemon. Your creatures don’t die, they get wounded. Also, there’s going to be design restrictions around things like canceling abilities. Plus, abilities can usually be activated more than once in a battle, so its not so bad if your super awesome ability gets canceled. Maybe, hopefully.

**Language**

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

**Rules**

**Creature**

**Name**: Each creature has a pet name and a species name.

-   The pet name is what this instance of this creature is called, as if it were someone’s pet.
    -   Ex: “Spot”.
    -   *The pet name is for the player of that instance of the card to write on the card to mark that instance as distinct from the other instances.*
-   The species name is what this creature is called if you saw a random one out in the wild.
    -   Ex: “cat”, “wolf”, “deer”.
    -   A species can be represented by multiple different cards.
    -   *The species name is to help identify that creature so others players know generally what that card is capable of.*

**Points**: The card cost is how many points it costs to put this creature in a player’s deck. The cost is auto-calculated by the creature’s base power and terrain mods. It is up to you, the designer, to increase the cost for the creature’s abilities. This number is the main way that you balance a card.

-   No point cost should evenly divide into 100.
    -   5 and 2 are ok tho.
    -   *This is to prevent players from running 5 copies of the same 20pt card or 2 copies of the same 50pt card, or 1 copy of a 100pt card. With 5 19pt cards, they have 5pts left over.*

**Tags**: The tags are for identifying groups this creature fits into. Ex: a tiger is a felid.

-   You can add as many tags as you want.
-   Please be careful to add existing tags instead of inventing new ones, except for the taxonomy rules below.
-   Note that tags have no mechanical function by default. They are there so abilities can use them to do stuff or target creatures with certain tags.
    -   Ex: Social cares that other creatures have the same tag, and abilities can say things like “damage all Plant creatures”.
-   Tags should describe what the creature *is*, not what the creature *does*.
    -   Ex: A falcon is an Aves (Bird), but it is not a Flying.
    -   “Flying” is a keyword, NOT a tag.
-   Use the taxonomy family name and class name for it.
    -   Instead of “Deer” say “Cervid Mammal”, instead of “cat” say “Felid Mammal”, “Canid Mammal” for dogs, etc.
    -   Here’s some google searches for you to find the word you need. Be careful tho, it might give you the wrong answer. The right answer typically ends in “-id”, or “-idae", which is easily shortened to “-id”
        -   “taxonomy family [animal]”
        -   “taxonomy class [animal]”
        -   “word for member of the [animal] family”
        -   “biological family name for [animal]”
    -   Use the “-id” version, instead of the “-ine” or “-idae" versions.
        -   *The “-id” version implies the creature is like it, but not necessarily meets the whole criteria. Which makes sense, because these creatures are from another planet.*
    -   Note that these rules might make for a lot of types.
        -   For example: Cervids, Bovids, Equids, and Caprids are all hooved animals, but they would be separated into these different types.
    -   *This might seem less intuitive than just saying “Deer” or “Horse”, but I want to get across that these creatures are NOT the same ones we have on Earth, they just look similar. Thus, the “-id” part of the type.*
    -   Also note that this rule probably requires you to use a real-life creature as a reference.
    -   It’s ok to use this taxonomy rule to make a new tag if its for a kind of creature that hasn’t been introduced into the game yet

**Art**: Each creature has art for it. The art has its own set of rules.

**Rest cost**: This is how much the creature increases its exhaust value after a battle ends. This is another main way for you to balance a card. If you don’t explicitly write this here, the creature’s default rest cost is its base power.

**Ability**: Each creature can have about 1-3 abilities. Abilities are optional. Abilities have their own set of rules.

**Flavor text**: Ideally this flavor text tells or hints at part of the story involving this creature, or a specific instance of the creature in the lore.

-   Ex: a deer creature might tell a snippet of Bambi’s story.
-   The story should be set in-universe in the game’s lore.
-   It can just be a description or a quote or something.

**Base Power**: This is how much power the creature has no matter what terrain it’s in. This is functionally both its attack and defense value. As well as how much “hp” it has. And also its rest cost, if no rest cost is explicitly set.

-   It is recommended to set this first to get a sense of the cards power, then balance the card by adjusting the point cost and rest cost at the end.

**Terrain Mods** (Modifiers): When a creature is in a terrain listed in this section, it gains a terrain mod to its power total.

-   Ex: when Adir Doe is in a forest, her power is 7, because her base power is 2 and her Forest terrain mod is +5.
-   Terrain mods with a positive value are called a “terrain bonus” and with a negative value its called a “terrain penalty”.
-   Creatures usually have about 3-5 terrain mods
-   Terrain mods are less costly than base power in the power budget
-   Terrain mods effectively modify a creature’s attack
-   Keep in mind that the terrain mods are listed in order from highest to lowest, not alphabetically
-   *There’s no colors in this game like in MtG, but this is this game’s equivalent*

**Art**

Creature art for a card should follow these rules.

-   The art should depict the creature in its natural habitat, preferably in its favored terrain.
-   The art should show the creature’s whole body within the frame, and it should not be obscured by the environment, or at most lightly obscured.
    -   *We want to see what the creature looks like.*
-   There shouldn’t be other creatures in the pic, unless those are essential to the creature the art is for.
    -   *It’s hard to know which creature the card is about if there’s more than one*
-   If the creature has an ability, the card may show the creature using that ability.
    -   Preferably it would not show the target of the ability if its another creature of a different species, but it may if necessary.
    -   The focus body part for that ability should be glowing while the ability is being used
    -   Ideally, the art would have a base image and a glow overlay that can be turned on/off
-   Showing multiple of the same creature is ok.
    -   Ex: itd be weird if you just saw 1 ant.
-   Each creature that has a magical ability has a focus that lets them use magic. The art should show the focus glowing that is used by an ability.
    -   Ex: a deer using a transformation magic ability should show its antlers glowing.
    -   Note that some creatures have more than one focus, and that each focus used by an ability on the card should be glowing.
        -   *So in effect, a person could look at the drawing of the creature and generally tell what kind of magic its ability is going to use.*

**Cards**

Each card should have a front and a back. The back should always be the creature combat logo, or whatever the standard back design is. The following is prohibited, due to logistical headaches for publication and player experience:

-   Transforming cards that use the backside of the card as the other form
-   Combining cards that combine with another separate card to create one big card
-   Split cards that have two cards printed on them sideways side by side
-   Cards that rotate 180 degrees to have a different effect
-   Cards that flip to have different stats or abilities
-   Cards that rotate to change its stats or abilities

*Most of these ideas come from MtG and are ways that they added an element of surprise, novelty, and flexibility to cards.* The main way to do this in this game is to have an effect that switches out the current creature with a creature from your army and/or side board. If we have a side board. It can name a specific card if it needs to*. I’m aware this might create problems for booster packs where you get one half and not the other. That’s a problem to solve for a different day. Mostly I don’t want to deal with logistical headaches from card layouts.*

**Abilities**

Here are the rules for the abilities, and some restrictions on what they can or cant do. Note that the guide language for the abilities is in the language section, this section is a guide for the design of the abilities.

-   Abilities can only effect creatures in the same zone.
    -   Creatures at the landmark can only effect other creatures at the same landmark
    -   Creatures in the hand at the landmark can be effected by creatures at the landmark
    -   The exception to this rule is deploy, which lets you move a creature from your army to your hand.
-   Abilities can’t be passives that need updated constantly
    -   Its recommended to have them trigger when important
        -   EX: instead of “friendly creatures have +1”, say “Fight, Finale: Give friendly creatures +1, briefly”
-   Abilities can be passives with clear triggers and clear one-off effects
    -   EX: “Passive: Whenever a friendly creature uses a magic ability, increase my Shield value by 1.”
    -   Any player may remind about a passive, and it must be processed when reminded about it.
    -   *It’s optional-ish, bc I don’t want to have “illegal gamestates” like in MtG when players forget a trigger. Here, its optional, so it doesn’t matter that much*
    -   Passives are for abilities that happens naturally without the creature consciously deciding to do it. For example, a poison frog’s poison skin deals damage when touched or attacked. The frog doesn’t have to activate it.
    -   Actives (with or without triggers) are things that the creature has to consciously do. EX: attack, cast a magic spell, etc
    -   Passives happen instantly after their trigger occurs.
    -   Passives cannot be reacted to
    -   Usually passives only modify/”target” the creature’s self. Usually, targeting other friendly creatures and/or hostile creatures requires an activatable ability.
    -   Passives don’t have costs.
    -   Passives don’t have a magic genus, thus no magic symbol
    -   Passives cant be canceled
        -   But they can be suppressed (maybe)
-   Triggered abilities can be activated without the trigger once on a player’s turn. So separate the trigger from the effect.
-   Requirements are only checked when an ability is about to be resolved. Which means it can be activated without meeting the requirement, but if the requirement is met before it is checked, the ability can resolve
-   Costs are state changes a player must make in order to activate a creature’s ability. This is a good way to balance a powerful ability.
    -   If the cost can’t be paid, the ability does not activate, and nothing is spent for that ability
        -   If the ability has multiple costs, and all but one cant be paid, the others don’t get spent if the ability doesn’t activate. Reminder that “activate” is not the same thing as “resolve”
-   Abilities can use magic as a basis
    -   Magic abilities use mana as a cost. Mana comes from the landmark and is a shared resource pool.
    -   A creature can use a magic ability even when downed
    -   Most abilities are magic
    -   Magic abilities have a magic symbol to show what magic genus it is classified under.
-   Abilities can be physical as a basis
    -   EX: attack, move, dodge, travel, communicate
    -   These abilities usually have no mana cost or other costs
        -   Thus can be used even when the landmark runs out of mana
    -   Physical abilities can’t be used if the creature is downed
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

**Landmark**

Landmarks typically have 3 terrains.

A landmark can have an ability that any player can activate. Still, it can only be activated once per moment.

A landmark has a mana pool which creatures may spend to activate abilities. This usually doesn’t refill, or refills only slowly. So you can adjust this value to effect how long a battle will last here. Lots of mana usually means longer battles.

In addition, a landmark can have a mana refill amount, which is how much mana refills in the pool at the start of each player’s turn. This is another lever that can used to effect the length of battles.

## Guide

Here’s a guide on how to create a creature.

1.  Start with the general concept
    1.  Pick a name. This step can optionally be done at any time later
    2.  Set the base power (usually 1-5)
    3.  Set the biome modifiers (usually 3 bonus, 2 penalty)
    4.  Make 3-5 activatable abilities for the creature (Each instance will usually only have 2 of them)
        1.  Set the ability effect
        2.  Add a trigger (optional, this makes it more powerful)
        3.  Add a requirement (optional, this makes it more situational)
        4.  If it’s a magic ability,
            1.  add a mana cost
            2.  Choose a magic genus for the ability, based on what the effect does
        5.  Add costs (optional, this balances the ability)
        6.  Name the ability
        7.  Adjust the point cost of the ability (added to the overall point cost of the card)
    5.  Balance the card
        1.  Adjust the rest cost (it defaults to base power)
        2.  Adjust the point cost
