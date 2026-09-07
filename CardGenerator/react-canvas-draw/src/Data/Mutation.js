import { arraySum } from "../Utility/Utility";


/** The creature has mutations that change stats and abilities 
 * Mutations are randomly selected and applied, changing a card's stats when it gets created
 * Each printed creature will be unique because of mutations
*/
export class Mutation{
    constructor(change, weight) {
        this.weight = weight ?? 1;//higher weight increases liklihood of happening
        this.change = change ?? "";//instruction on what to change

        //the change instruction language
        // first part: what gets changed
        // second part: what the change is
        // 
        // if blank, no mutation
        /*

        === Biome Mod ===
        TTT #01 +1      //increase biomemod in position 1 (the first one) by 1
        TTT #02 -3      //decrease biomemod in position 2 (the second one) by 3
        TTT Forest +2   //increase biomemod Forest by 2. this creates it if it doesnt already exist
        TTT #03 =1      //set biomemod in position 3 to 1
        TTT Plain =2    //set biomemod Plain to 2. this creates it if it doesnt already exist

        When adjusting a biomemod by position, the instruction is ignored if it doesnt exist
        When adjusting a biomemod by name, the instruction creates the biomemod if it doesnt exist


        === Base Power ===
        POWR +1         //increase base power by 1
        POWR -2         //decrease base power by 2
        POWR =3         //set base power to 3

        Base power must be at least 1. Printed base power is not allowed to be 0 or less.


        === Rest Cost ===
        REST +1         //increase rest cost by 1
        REST -2         //decrease rest cost by 2
        REST =3         //set rest cost to 3


        === Ability ===
        Creatures start with no abilities. Mutations add them
        The ability must be defined on the creature
        
        ABLTY [ability name]    //give this creature the ability with [ability name]
        ABLTY "Disguise Young"  //give this creature the ability "Disguise Young"
        ABLTY #01               //give this creature the ability at position 0 (the first ability in the list of possible abilities)
        
        ABLTY [ability name] TRGR [trigger name]    //give the ability the trigger. the creature must have the specified ability. triggers cant be duplicated
        ABLTY "Disguise Young" TRGR Battlecry       //give the ability "Disguise Young" the trigger Battlecry
        ABLTY "Hide Young" VAL +1                   //increase the number value used in "Hide Young" effect by 1
        ABLTY "Hide Young" VAL -2                   //decrease the number value used in "Hide Young" effect by 2
        ABLTY "Hide Young" VAL =3                   //set the number value used in "Hide Young" effect to 3

        */

    }
}

/** Returns a structure of mutations for defaults */
export function createDefaultMutations() {
    return [
        //POOL 1
        [
            new Mutation("", 50),
            new Mutation("", 50),
            new Mutation("", 50),
            new Mutation("", 50),
            new Mutation("", 50),
            new Mutation("TTT #01 +1", 10),
            new Mutation("TTT #01 -1", 10),
            new Mutation("TTT #01 +2", 5),
            new Mutation("TTT #01 -2", 5),
            new Mutation("TTT #01 +3", 2),
            new Mutation("TTT #01 -3", 2),
            new Mutation("TTT #01 +4", 1),
            new Mutation("TTT #01 -4", 1),
            new Mutation("TTT #01 +5", 1),
            new Mutation("TTT #01 -5", 1),
            new Mutation("TTT #02 +1", 10),
            new Mutation("TTT #02 -1", 10),
            new Mutation("TTT #02 +2", 5),
            new Mutation("TTT #02 -2", 5),
            new Mutation("TTT #02 +3", 2),
            new Mutation("TTT #02 -3", 2),
            new Mutation("TTT #02 +4", 1),
            new Mutation("TTT #02 -4", 1),
            new Mutation("TTT #02 +5", 1),
            new Mutation("TTT #02 -5", 1),
            new Mutation("TTT #03 +1", 10),
            new Mutation("TTT #03 -1", 10),
            new Mutation("TTT #03 +2", 5),
            new Mutation("TTT #03 -2", 5),
            new Mutation("TTT #03 +3", 2),
            new Mutation("TTT #03 -3", 2),
            new Mutation("TTT #03 +4", 1),
            new Mutation("TTT #03 -4", 1),
            new Mutation("TTT #03 +5", 1),
            new Mutation("TTT #03 -5", 1),
            new Mutation("TTT #04 +1", 10),
            new Mutation("TTT #04 -1", 10),
            new Mutation("TTT #04 +2", 5),
            new Mutation("TTT #04 -2", 5),
            new Mutation("TTT #04 +3", 2),
            new Mutation("TTT #04 -3", 2),
            new Mutation("TTT #04 +4", 1),
            new Mutation("TTT #04 -4", 1),
            new Mutation("TTT #04 +5", 1),
            new Mutation("TTT #04 -5", 1),
            new Mutation("TTT #05 +1", 10),
            new Mutation("TTT #05 -1", 10),
            new Mutation("TTT #05 +2", 5),
            new Mutation("TTT #05 -2", 5),
            new Mutation("TTT #05 +3", 2),
            new Mutation("TTT #05 -3", 2),
            new Mutation("TTT #05 +4", 1),
            new Mutation("TTT #05 -4", 1),
            new Mutation("TTT #05 +5", 1),
            new Mutation("TTT #05 -5", 1),
        ]
    ]
}

export function randomize(card, mutations) {
    for (let pool of mutations) {
        const total = arraySum(pool, (m) => m.weight);
        let mutationCount = 1;
        for (let i = 0; i < mutationCount; i++) {
            let index = Math.random() * total;
            for (let m of pool) {
                index -= m.weight;
                if (index <= 0) {
                    processMutation(card, m.change);
                    break;
                }
            }
        }
    }
}

function processMutation(card, change) {
    let split = change.split(" ");
    switch (split[0]) {
        case "TTT":
            if (/^\#[0-9][0-9]$/.test(split[1])) {//ex: #01
                let index = split[1].substr(1) * 1;
                let value = split[2].substr(1) * 1;
                let bm = card.biomeModifiers[index];
                if (!bm) {
                    break;
                }
                switch (split[2][0]) {//get the operator from ex: +3
                    case "+": bm.modifier += value; break;
                    case "-": bm.modifier -= value; break;
                    case "=": bm.modifier = value; break;
                    default: console.error("Unknown mutation change TTT operator:", split[2][0]);
                }
            }
            break;
        default:
            console.error("Unknown mutation change instruction:", split[0]);
    }
}
