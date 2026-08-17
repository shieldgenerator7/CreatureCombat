# Wyl Creature Combat New Player Guide

# Goal

Claim the most landmarks by the end of the game. The game ends when all landmarks have been claimed.

# Pieces

To play a game of Wyl Creature Combat, each player will need:

-   A deck of creatures totaling 100pts. See Deck Rules below.
-   A deck of 5 unique landmarks. See Deck Rules below.
-   A way to keep track of values. Dice, paper clips, poker chips, pen & paper, a notes app, etc work well for this
-   A way to hide your initial hand. Holding your deck under the table, a manila folder, some type of divider, etc works well for this
-   A way to keep track of creatures’ cooldowns. Dice as mentioned above work for this too, but a custom playmat with cooldown tracking zones is recommended

Additionally, collectively you will need:

-   A hard flat surface to play on. A table works well for this
-   A method to determine who goes first. Dice, rock paper scissors, “youngest goes first”, etc work well for this
-   A way to remember who’s turn it is. Just remembering it works well for this, but you can also use a stuffed animal to pass around

# Setup

Shuffle all landmarks into one big pile. Each player sets their creature deck (called their “army”) on the table, and turn a named creature face up on top of it.

# Round

At the start of each round, take the top card off the landmark deck and place it face up in the center of the table.

Players secretly pull creatures from their army to later deploy to the landmark.

Once all players have pulled creatures, all pulled creatures get deployed to the landmark, getting placed in the player’s hand.

Randomly determine who goes first. For fairness, you can let a player who hasn’t gone first recently or the player with the least amount of landmarks go first.

On a player’s turn, they may play a creature, activate a creature’s ability, fight a creature, or resolve the battle. Each of these options starts a moment, in which other players can react to their action.

Ater a player takes their turn, play continues to the player on their left (clockwise).

When a player spends their turn to resolve the battle, all players total up their creatures’ combined power. The player with the highest total power wins the battle, and claims the landmark. If there are no landmarks left, the player who claimed the most landmarks wins the game. If there is a tie, the tied player who most recently claimed a landmark wins.

Each player processes their resting creatures:

1.  Your creatures in the battle zone and creatures in your hand each increase their exhaustion value by their Rest cost (default value is its base power)
2.  Your creatures in the battle zone and your creatures in a hand each move to your resting zone.
3.  Creatures in your resting zone decrease their exhaustion value by 1.
4.  Creatures in your resting zone with an exhaustion value of 0 or less return to your army.

The round ends.

# Zones

There are 3 zones:

-   Army (each player)
-   Battle (only 1)
    -   Hand (each player)
-   Resting (each player)

Each player has an army zone, which has every creature that a player can deploy to a landmark.

The battle zone includes the current landmark and all creatures at that landmark.

Each player has a hand, which contains all creatures deployed to that landmark but who haven’t arrived yet. When a player plays that creature, that creature arrives at the landmark. This zone is part of the battle zone.

Each player has a Rest zone, where their creatures go to rest between battles.

Whenever a creature gets put in your hand or your army, all of its values reset to 0.

# Values

Values show the state of a creature. Some values are printed on the card, like the Rest value. Many other values are not printed on the card, such as bonus power. These are called “state values”. By default, all state values are 0. Most state values serve a specific function and have mechanics tied to them, but that is not a requirement. State values can only be positive, ranging from 0 to positive infinity. Some state values are beneficial, like bonus power. These are called “good values”. Some state values are harmful, like damage. These are called “bad values”.

Often these are tracked with physical counters, much like +1/+1 counters in MtG.

Common values:

-   Exhaustion value. After battling, each creature’s exhaustion value increases. While a creature’s exhaustion value is greater than 0, it cant be added to your army. A resting creature’s exhaustion value decreases by 1 at the end of each round.
-   Bonus Power value. This is added to a creature’s base power and biome mods to get their total power. Note that total power isn’t a value, because it is calculated, not tracked.
-   Damage value. This represents the amount of damage this creature has taken. This is subtracted from a creature’s power base/mods/values to get their total power. If a creature’s damage value is equal to or greater than their base power, they are “wounded”. A wounded creature doesn’t contribute their power to the combined total in the finale, and can’t join fights.
-   Stun value. If a creature’s stun value is 1 or more, they are stunned: their abilities cant be resolved. At the end of each player’s turn, each friendly creature decreases its stun value by 1.
-   Shield value. While a creature has a shield value of 1 or more, if a creature’s damage value would increase by 1, instead decrease its shield value by 1. Increasing the shield value doesn’t decrease the existing damage value.

# Tags vs Keywords

Tags are descriptors used to specify what kind of creature it is, and allow players to determine which creatures are alike by the tags they share. Tags have no meaning by themselves. Some creatures may care about certain tags, and have special interactions with creatures that have certain tags. You can find the tags listed below the creature’s species name.

Keywords have meaning and mechanics behind them. Each keyword does something different. In addition, some creatures care about certain keywords and may have special interactions with creatures that have certain keywords. You can find keywords within the creature’s ability text.

# Focus

In the Wyl lore, each creature has a differently shaped focus that lets them more easily cast certain types of magic. Each type of magic has an optimal shape for casting, and each focus shape has a name and a symbol associated with it. The name of the shape and/or the symbol can appear on an ability as a tag, allowing special interactions with abilities that use a certain focus.

For example, there will be no creature ability that says “cancel target creature ability”, but there could be “cancel target creature ability using [specific focus type]”

# Abilities

Each creature can have abilities. An ability can be activated manually on a player’s turn or triggered by another event. An ability with a trigger can be activated manually, and triggering an ability when its event happens is optional.

If an ability has a cost, it must be paid in full to activate it.

If an ability has a requirement, that requirement must be met for the ability to resolve. An ability with unmet requirements can still be activated, but its requirements must be met by the time it gets processed by the queue.

All abilities are activatable, there are no passive abilities.

Some keywords are entire abilities. These can only be activated when their trigger occurs.

# Moments

A moment is a small period of time in which a lot can happen. Player actions and creature abilities all happen inside a moment.

As a player action, a player can:

-   Play (a creature from their hand to the landmark)
-   Activate (a creature ability)
-   Fight (a hostile creature with a friendly creature)
-   Resolve (the battle)

When a player takes the first action on their turn, it starts a moment. This can trigger abilities of creatures, who can then activate those abilities. And those abilities can trigger other abilities, and so on. When no more creatures are activating their abilities, the moment starts to resolve. Each creature can activate an ability only once per moment.

The moment has a queue system that determines the order of the abilities. The abilities are generally ordered by the order they were activated, but an ability can skip ahead in order under certain conditions.

When an ability is triggered, it goes in the queue right behind the action that triggered it. However, the reacting creature (the creature with the triggered ability) may decide to act right before the acting creature (the creature of the action) if any of these conditions are met:

-   The reacting creature has a lower base power than the acting creature
-   The triggered ability has a faster speed than the action
-   Both creatures are friendly to each other
-   It’s the reacting creature’s turn, or the reacting creature will have its turn sooner than the acting creature

As a reaction, a player may play a creature with a Battlecry ability. The played creature’s arrival and Battlecry ability activation happen together, at the speed of the Battlecry ability.

When a player action triggers the ability of the acting creature, the action and the reaction happen at the same time, with no other creature’s ability in between. This is called adjoined actions, and they use the speed of the ability, if their speeds are different.

## Example

When reacting to an ability that is itself reacting to another ability, the second reaction goes in the queue relative to the ability it is reacting to.

Here, he have an Adir Doe and Hexantler Buck against an Embird and a third player with a Fyrorage, and it’s the Embird’s turn.

|   | **What each creature does**                                                 | **Queue**                   |
|---|-----------------------------------------------------------------------------|-----------------------------|
| 1 | Embird targets Adir Doe with Flame Spit                                     | Embird                      |
| 2 | Hexantler Buck chooses Adir Doe with Shielding at fast speed                | Hexantler, Embird           |
| 3 | Fyrorage reacts to Hexantler by amplifying Embird’s damage, at normal speed | Hexantler, Fyrorage, Embird |

1\. Embird targets Adir Doe with Flame Spit

Queue: Embird

2\. Then Hexantler Buck chooses Adir Doe with Shielding. Shielding would go behind Embird’s Flame Spit, but because Shielding has a fast speed and Flame Spit has a normal speed, Shielding goes before Flame Spit.

Queue: Hexantler, Embird

3\. Then a third player’s Fyrorage reacts to Hexantler by amplifying Embird’s damage, at normal speed.

Queue: Hexantler, Fyrorage, Embird

Fyrorage has higher base power than Embird, so if Fyrorage reacted to Embird, it would go after. Which is pointless, because it wants to damage boost before the damage is dealt. But Fyrorage reacted to Hexantler, which reacted to Embird and went before it, so Fyrorage gets to go before Embird, but after Hexantler.

# Speeds

Abilities and actions have a speed that may allow them to jump ahead in the queue. From fastest to slowest, the speeds are Super Fast, Fast, Normal, Slow, Super Slow. A reacting ability that has a speed faster than the ability it reacts to may go before it in the queue. If an ability does not specify a speed, it is always Normal speed.

# Deck Rules

When you make your own creature deck, here are the rules it must follow:

-   The total point cost of creatures in it must be 100 or less. The point cost is displayed on the bottom right corner of each creature.
-   You may have any number of copies of a creature
-   At least one creature in the deck must be named. A named creature is one that has a name written in its pet name field
-   That’s it

When you make your own landmark deck, here are the rules it must follow:

-   It must contain exactly 5 landmark cards
-   You may only have 1 copy of each landmark in your deck
-   Landmarks may share the same terrains
