"use strict";

import { getLines } from "../Utility/Utility";
import DrawLayer, { DRAWLAYER_BOX, DRAWLAYER_CIRCLE, DRAWLAYER_IMAGE, DRAWLAYER_TEXT } from "./DrawLayer";
import Vector2, { VECTOR2_ZERO } from "./Vector2";

export function generateCardSkin(width, height, margin, padding) {
    const rowheight = height / 17;
    const marginWidth = width - margin * 2;
    const markersY = [
        margin + rowheight * 2.4,
        margin + rowheight * 3.4,
        margin + rowheight * 10.4,
        margin + rowheight * 15.4,
    ];
    let cardSkin = [
        //black
        new DrawLayer(
            DRAWLAYER_BOX,
            'black',
            VECTOR2_ZERO,
            new Vector2(width, height),
        ),
        //background
        new DrawLayer(
            DRAWLAYER_BOX,
            'white',
            new Vector2(margin, margin),
            new Vector2(marginWidth, height - margin * 2),
            (card) => card.colors[0]
        ),
        //image
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(margin, markersY[1]),
            new Vector2(marginWidth, markersY[2] - markersY[1]),
            (card) => card.imgPortrait
        ),
        //background
        new DrawLayer(
            DRAWLAYER_BOX,
            'white',
            new Vector2(margin, margin),
            new Vector2(marginWidth, markersY[1] - margin),
            (card) => card.colors[0]
        ),
        //type bg
        new DrawLayer(
            DRAWLAYER_BOX,
            '#dbd69e',
            new Vector2(margin, markersY[0]),
            new Vector2(marginWidth, markersY[1] - markersY[0]),
            (card) => card.colors[1]
        ),
        //text area bg
        new DrawLayer(
            DRAWLAYER_BOX,
            '#dbd69e',
            new Vector2(margin, markersY[2]),
            new Vector2(marginWidth, markersY[3] - markersY[2]),
            (card) => card.colors[1]
        ),
        //text border
        new DrawLayer(
            DRAWLAYER_BOX,
            'black',
            new Vector2(margin, markersY[2]),
            new Vector2(marginWidth, rowheight * 0.2)
        ),
        //card info bg
        new DrawLayer(
            DRAWLAYER_BOX,
            'black',
            new Vector2(margin, markersY[3]),
            new Vector2(marginWidth, rowheight * 2)
        ),
        //base power circle
        new DrawLayer(
            DRAWLAYER_CIRCLE,
            'grey',
            new Vector2(margin + 50, markersY[3] - 50),
            new Vector2(rowheight * .75, rowheight * .75),
            (card) => card.colors[2]
        ),

        //
        // TEXT
        //

        //name
        new DrawLayer(
            DRAWLAYER_TEXT,
            'black',
            new Vector2(margin, margin + rowheight * 0.3),
            new Vector2(marginWidth, rowheight * 0.7),
            (card) => card.name?.trim(),
            (card) => card.colors[3],
            (card) => {
                return {
                    padding: 0,
                    padding_left: 15,
                }
            },
        ),
        //species
        new DrawLayer(
            DRAWLAYER_TEXT,
            'black',
            new Vector2(margin, margin + rowheight * 0.9),
            new Vector2(marginWidth, rowheight * 1.5),
            (card) => card.species?.trim(),
            (card) => card.colors[3],
            (card) => {
                return {
                    padding: 15,
                    padding_left: 15,
                }
            },
        ),
        //tags
        new DrawLayer(
            DRAWLAYER_TEXT,
            'black',
            new Vector2(margin, markersY[0] - rowheight * 0.15),
            new Vector2(marginWidth, markersY[1] - markersY[0]),
            (card) => card.tags.map(t => t.trim()).join(" • "),
            (card) => card.colors[4],
            (card) => {
                return {
                    padding: 18,
                    padding_left: 15,
                }
            },
        ),
        //cost
        new DrawLayer(
            DRAWLAYER_TEXT,
            'black',
            new Vector2(margin, margin + rowheight * 0.3),
            new Vector2(marginWidth, rowheight * 0.7),
            (card) => card.getFinalCost(),
            (card) => card.colors[3],
            (card) => {
                return {
                    text_align: "right",
                    padding: 0,
                    padding_left: 15,
                    padding_right: 15,
                }
            },
        ),
        //star count
        new DrawLayer(
            DRAWLAYER_TEXT,
            'black',
            new Vector2(margin, margin + rowheight * 0.8),
            new Vector2(marginWidth, rowheight * 1.5),
            (card) => "★ ".repeat(card.getStarCount()).trim(),
            (card) => card.colors[3],
            (card) => {
                return {
                    text_align: "right",
                    padding: 25,
                    padding_left: 15,
                    padding_right: 15,
                }
            },
        ),
        //rest count, abilities, flavor text
        // new DrawLayer(
        //     DRAWLAYER_BOX,
        //     'white',
        //     new Vector2(margin, markersY[2] + rowheight * 0.2),
        //     new Vector2(marginWidth, rowheight * 3.2),
        //     (card) => card.colors[0]
        // ),
        new DrawLayer(
            DRAWLAYER_TEXT,
            'white',
            new Vector2(margin, markersY[2] + rowheight * 0.2),
            new Vector2(marginWidth, rowheight * 3.2),
            (card) => {
                let remindersSeen = [];
                let showReminders = card.showReminderText;
                let restLine = card.getRestText(card.showReminderText);
                let flavorLine = `_${card.flavorText.trim()}_`;
                let abilityLines;
                abilityLines = card.abilities
                    .map(ability => {
                        let reqsym = ability.RequirementSymbol;
                        if (showReminders && reqsym && !remindersSeen.includes(reqsym)) {
                            remindersSeen.push(reqsym);
                            return ability.FullTextWithReminders;
                        }
                        return ability.FullText;
                    });
                return [
                    restLine,
                    abilityLines,
                    flavorLine
                ]
                    .flat(Infinity)
                    .filter(l => l)
                    .join("\n \n");
            },
            (card) => card.colors[4],
            (card) => {
                return {
                    text_align: "left",
                    max_text_height: rowheight * 0.38,
                    padding: 15,
                }
            },
        ),
        //base power
        // new DrawLayer(
        //     DRAWLAYER_BOX,
        //     'white',
        //     new Vector2(margin + rowheight * 0.17, markersY[3] - rowheight * 1.45),
        //     new Vector2(rowheight * 1.28, rowheight * 1.28),
        //     (card) => card.colors[1],
        // ),
        new DrawLayer(
            DRAWLAYER_TEXT,
            'white',
            new Vector2(margin + rowheight * 0.17, markersY[3] - rowheight * 1.4),
            new Vector2(rowheight * 1.28, rowheight * 0.9),
            (card) => card.basePower,
            (card) => card.colors[5],
            (card) => {
                return {
                    text_align: "center",
                    padding: 0,
                }
            },
        ),
    ];
    return cardSkin;
}
