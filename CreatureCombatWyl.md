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
-   Arriving [creature] – a creature is the arriving creature when it is played from a hand to a landmark. This word is used in abilities that react to a creature arriving, such as with the **Greeting** and **Ambush** keyword triggers
-   Army – a pile of creatures from which you may construct a hand for a landmark. It is not ordered and you may look at its contents at any time. You keep this hidden from the other players.
-   Bad Value – a value that players typically don’t want on their creatures, i.e. they want the value to be 0.
-   Big – having a high base power
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
-   Keyword – common ability text shortened to a single word
-   Landmark – a card that is a location where creatures are played to and has one or more terrains
-   Moment – when a creature takes an action, it creates a window of time in which other creatures can react. This is called a moment. Triggerable abilities can only trigger during a moment.
-   Play – to play a creature, move it from your hand to the landmark tied to that hand
-   Power – a creature’s might
-   Power Total– a creature’s power used for fighting and battling, which is equal to the sum of its base power, terrain mods, and bonus power value. A downed creature’s power total is always 0.
-   Resolve – carry out the effect of the current processed ability in the moment.
-   Rest Zone – where your creatures go after the battle is over. When a creature is done resting, it returns to your army.
-   Selected creature – a creature from any team that was previously selected.  
    EX: “Give a creature +1. Shield 1 the selected creature.”
-   Shielded – a creature with Shield value of 1 or more is shielded
-   Small – having a low base power
-   Targeted – a hostile creature that was previously selected.  
    EX: “Take -1 from a hostile creature. Make the targeted creature fight a friendly creature.”
-   Terrain – a part of a landmark that creatures may have modifiers for
-   Terrain Bonus – a positive terrain mod
-   Terrain Mod – an additional amount of power a creature gets for being in a certain terrain. Positive for a favored terrain, negative for a difficult terrain. Default is 0 if the terrain is not listed on the creature
-   Terrain Penalty – a negative terrain mod
-   Transform into – add a Creature type to a Creature
-   Transform out of – remove a Creature type from a Creature
-   Travel Zone – creatures can move here to be temporarily outside the game. When a new landmark is revealed, you may move any of your creatures in the Travel Zone to the new landmark.
-   Trigger – to activate an ability when its condition is met
-   Triggering creature – an ability that contains this word uses it to refer to the creature that took the action that triggered the ability
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
-   Exile – Travel Zone
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

Here’s a list of some keywords in the game. Complex keywords are ones that contain other keywords.

Strategy rock paper scissors (complex):

-   Flanking – Fight, Finale: Gain bonus power equal to the number of opposing creatures without Flanking, plus the number of opposing creatures with Ranged, briefly.
-   Flying – Fight, Finale: Gain bonus power equal to the number of opposing creatures without Flying, plus the number of opposing creatures with Flanking, briefly.
-   Ranged – Fight, Finale: Gain bonus power equal to the number of opposing creatures without Ranged, plus the number of opposing creatures with Flying, briefly.

Requirements:

-   Home – This creature must be at a home landmark
-   Once – This ability must not have been activated yet during this battle
-   Powerful X – This creature must have at least X power total in order to activate this ability
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
-   Retreat – Target creature returns to its hand.
-   Scout X – Look at the top X cards from the Landmark deck, choose 1 as the scouted land, put it faceup on top, and put the rest on the bottom in any order
-   Shield X – Target creature increases its shield value by X (default 1)
-   Stun X – Target creature increases its stun value by X (default 1)
-   Ward X – As an additional cost to target this creature, a hostile creature increases its exhaust value by X (default 1)

Standard:

-   Channel – If this creature takes damage before this ability resolves, this ability is canceled
-   Indigenous – This creature may start the battle at the landmark, without triggering on-arrival. This only applies if the landmark is a home for the creature.

Ability Speed:

-   Super Fast – This ability may jump ahead of a Fast ability.
-   Fast – This ability may jump ahead of a normal-speed ability.
-   Slow – This ability can’t jump ahead of a normal-speed ability.
-   Super Slow – This ability can’t jump ahead of a Slow ability.

# References

Mark Rosewater’s 20 fav MtG mechanics  
<https://youtu.be/_YvqTR0Zvno?t=3481>

Kohdok’s guide to TCG instructions: pieces needed  
<https://youtu.be/w6nbElJLud8?t=1044>

PidgiPotato says blocking should be a mechanic, not a keyword  
<https://youtu.be/JnsM-Rc02kI>
