"use strict";

import { arrayMax, arraySort, getLines } from "../Utility/Utility";
import { costSpec } from "./CostSpec";
import DrawLayer, {
    DRAWLAYER_BOX,
    DRAWLAYER_BOX_ROUND,
    DRAWLAYER_CIRCLE,
    DRAWLAYER_IMAGE,
    DRAWLAYER_LAYERS,
    DRAWLAYER_TEXT,
} from "./DrawLayer";
import Vector2, { VECTOR2_ZERO } from "./Vector2";
import ui_bonus_src from "../Images/ui_bonus.png";
import ui_penalty_src from "../Images/ui_penalty.png";
import ui_rest_src from "../Images/ui_rest.png";
import ui_cost_src from "../Images/ui_cost.png";
import { FIT_WHOLE } from "./Creature";

let UI_BONUS;
let UI_PENALTY;
let UI_REST;
let UI_COST;

export function generateCardSkin(width, height, margin, padding) {

    loadUIImages();

    const rowheight = height / 17;
    const marginWidth = width - margin * 2;
    const markersY = [
        margin + rowheight * 2.4,
        margin + rowheight * 3.4,
        margin + rowheight * 12.4,
        margin + rowheight * 15.4,
    ];

    const boxX = 150;
    const boxWidth = width - boxX * 2 + 50;
    const boxHeight = 100;

    const rest_size = 3.5;
    const cost_size = 5.5;

    let cardSkin = [
        //black
        new DrawLayer(
            DRAWLAYER_BOX,
            "black",
            VECTOR2_ZERO,
            new Vector2(width, height),
        ),
        //background
        new DrawLayer(
            DRAWLAYER_BOX,
            "white",
            new Vector2(margin, margin),
            new Vector2(marginWidth, height - margin * 2),
            (card) => card.colors[0],
        ),
        //image
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(margin, margin),
            new Vector2(marginWidth, height - margin * 2),
            (card) => card.imgPortrait,
        ),
        //cost bg
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(width - (margin * cost_size), height - (margin * cost_size) - 69),
            new Vector2(margin * cost_size, margin * cost_size),
            (card) => UI_COST,
            undefined,
            (card) => FIT_WHOLE
        ),
        //type bg
        new DrawLayer(
            DRAWLAYER_BOX_ROUND,
            "#dbd69e",
            new Vector2(boxX, margin * 1.5),
            new Vector2(boxWidth, boxHeight),
            (card) => card.colors[1],
        ),
        //card info bg
        new DrawLayer(
            DRAWLAYER_BOX,
            "black",
            new Vector2(margin, markersY[3]),
            new Vector2(marginWidth, rowheight * 2),
        ),
        //base power circle
        new DrawLayer(
            DRAWLAYER_CIRCLE,
            "grey",
            new Vector2(margin + 60, margin + 60),
            new Vector2(rowheight * 0.8, rowheight * 0.8),
            (card) => card.colors[2],
        ),
        //rest value circle
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(margin, height - (margin*rest_size) - 70),
            new Vector2(margin*rest_size, margin*rest_size),
            (card) => UI_REST,            
            undefined,
            (card) => FIT_WHOLE
        ),

        //
        // TEXT
        //

        //name
        new DrawLayer(
            DRAWLAYER_TEXT,
            "black",
            new Vector2(margin, margin + rowheight * 0.3),
            new Vector2(marginWidth, rowheight * 0.7),
            (card) => card.name?.trim(),
            (card) => card.colors[3],
            (card) => {
                return {
                    padding: 0,
                    padding_left: 15,
                };
            },
        ),
        //species
        new DrawLayer(
            DRAWLAYER_TEXT,
            "black",
            new Vector2(boxX, margin),
            new Vector2(boxWidth, boxHeight * 0.7),
            (card) => card.species?.trim(),
            (card) => card.colors[3],
            (card) => {
                return {
                    padding: 15,
                    padding_left: 15,
                };
            },
        ),

        //tags
        new DrawLayer(
            DRAWLAYER_TEXT,
            "black",
            new Vector2(boxX, markersY[0] - 75 - 25),
            new Vector2(boxWidth, boxHeight * 0.9),
            (card) =>
                card.tags
                    .map((t) => t.trim())
                    .filter((t) => t)
                    .join(" • "),
            (card) => card.colors[4],
            (card) => {
                return {
                    padding: 18,
                    padding_left: 15,
                };
            },
        ),

        //cost
        new DrawLayer(
            DRAWLAYER_TEXT,
            "black",
            new Vector2(margin - 10, markersY[3] - 75),
            new Vector2(marginWidth, rowheight * 0.7),
            (card) => costSpec.getTotalCost(card),
            (card) => card.colors[3],
            (card) => {
                return {
                    text_align: "right",
                    padding: 0,
                    padding_left: 15,
                    padding_right: 15,
                };
            },
        ),

        //rest count
        new DrawLayer(
            DRAWLAYER_TEXT,
            "white",
            new Vector2(
                margin + rowheight * (0.17 + 0.15),
                markersY[3] - rowheight * 1.25,
            ),
            new Vector2(rowheight * 1, rowheight * 0.7),
            (card) => card.getRestValue(),
            (card) => card.colors[5],
            (card) => {
                return {
                    text_align: "center",
                    padding: 0,
                };
            },
        ),

        //flavor text
        new DrawLayer(
            DRAWLAYER_TEXT,
            "white",
            new Vector2(boxX, markersY[3] - rowheight * 1.5),
            new Vector2(boxWidth, boxHeight),
            (card) => "_" + card.flavorText.trim() + "_",
            (card) => card.colors[5],
            (card) => {
                return {
                    text_align: "left",
                    max_text_height: rowheight * 0.38,
                    padding: 15,
                };
            },
        ),

        //abilities
        new DrawLayer(
            DRAWLAYER_LAYERS,
            undefined,
            undefined,
            undefined,
            (card) =>
                card.abilities.map((ability, i) => {
                    const startX = boxX;
                    const bmHeight = boxHeight + margin * 0.5;
                    const startY =
                        height -
                        card.abilities.length * bmHeight +
                        bmHeight * i -
                        140;
                    const textOffset = 70;

                    return [
                        //Box
                        new DrawLayer(
                            DRAWLAYER_BOX_ROUND,
                            "white",
                            new Vector2(startX, startY),
                            new Vector2(boxWidth, boxHeight),
                            (card) => card.colors[1],
                        ),
                        //Ability text
                        new DrawLayer(
                            DRAWLAYER_TEXT,
                            "white",
                            new Vector2(startX + textOffset, startY),
                            new Vector2(boxWidth, boxHeight),
                            (card) => ability.FullText,
                            (card) => card.colors[4],
                            (card) => {
                                return {
                                    text_align: "left",
                                    max_text_height: rowheight * 0.38,
                                    padding: 10,
                                };
                            },
                        ),
                    ];
                }),
        ),

        //base power
        new DrawLayer(
            DRAWLAYER_TEXT,
            "white",
            new Vector2(margin + rowheight * 0.17 + 10, margin * 1.4 + 10),
            new Vector2(rowheight * 1.28, rowheight * 0.9),
            (card) => card.basePower,
            (card) => card.colors[5],
            (card) => {
                return {
                    text_align: "center",
                    padding: 0,
                };
            },
        ),

        // Biome Modifiers
        new DrawLayer(
            DRAWLAYER_LAYERS,
            undefined,
            undefined,
            undefined,
            (card) =>
                arraySort(
                    [...card.biomeModifiers],
                    (bm) => bm.modifier * -1,
                ).map((bm, i) => {
                    const startX = margin;
                    const startY = -740;
                    const bmWidth = rowheight * 1.5;
                    const bmHeight = rowheight * 1.5;
                    const areaSize = rowheight * 1.4;
                    const areaSizeHalf = areaSize / 2;
                    const boxLessAmount = 7;
                    return [
                        new DrawLayer(
                            DRAWLAYER_IMAGE,
                            undefined,
                            new Vector2(
                                startX,
                                startY +
                                    bmHeight * i +
                                    markersY[3] -
                                    (50 - boxLessAmount) -
                                    areaSizeHalf-margin*0.1,
                            ),
                            new Vector2(areaSize+margin*0.7, areaSize),
                            (card) => (bm.modifier >= 0)?UI_BONUS:UI_PENALTY,
                            undefined,
                            (card) => FIT_WHOLE
                        ),
                        //Biome
                        new DrawLayer(
                            DRAWLAYER_TEXT,
                            "white",
                            new Vector2(
                                startX,
                                startY +
                                    bmHeight * i +
                                    markersY[3] -
                                    47 -
                                    areaSizeHalf,
                            ),
                            new Vector2(areaSize, areaSizeHalf),
                            (card) => bm.biome,
                            (card) => card.colors[5],
                            (card) => {
                                return {
                                    text_align: "center",
                                    padding: rowheight * 0.1,
                                    max_text_height: rowheight * 0.25,
                                };
                            },
                        ),
                        new DrawLayer(
                            DRAWLAYER_TEXT,
                            "white",
                            new Vector2(
                                startX + (areaSize - areaSize * 0.75) / 2,
                                startY +
                                    bmHeight * i +
                                    markersY[3] -
                                    rowheight * 0.93,
                            ),
                            new Vector2(areaSize * 0.75, areaSize * 0.4),
                            (card) =>
                                `${bm.modifier > 0 ? "+" : ""}${bm.modifier}`,
                            (card) => card.colors[5],
                            (card) => {
                                return {
                                    text_align: "center",
                                    padding: 0, //rowheight * 0.1,
                                };
                            },
                        ),
                    ];
                }),
        ),
    ];
    return cardSkin;
}

function loadUIImages() {

    UI_BONUS = new Image();
    UI_BONUS.src = ui_bonus_src;

    UI_PENALTY = new Image();
    UI_PENALTY.src = ui_penalty_src;
    
    UI_REST = new Image();
    UI_REST.src = ui_rest_src;

    UI_COST = new Image();
    UI_COST.src = ui_cost_src;
}
