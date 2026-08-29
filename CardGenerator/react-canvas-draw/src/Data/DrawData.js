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
import { FIT_FILL, FIT_WHOLE } from "./Creature";
import symbol_magic_deter_src from "../Images/symbol_deter.png";
import symbol_magic_fohlo_src from "../Images/symbol_fohlo.png";
import symbol_magic_firok_src from "../Images/symbol_firok.png";
import symbol_magic_asama_src from "../Images/symbol_asama.png";
import symbol_magic_irfig_src from "../Images/symbol_irfig.png";
import symbol_magic_garda_src from "../Images/symbol_garda.png";

let UI_BONUS;
let UI_PENALTY;
let UI_REST;
let UI_COST;
let SYMBOL_MAGIC_DETER = "deter";
let SYMBOL_MAGIC_FOHLO = "fohlo";
let SYMBOL_MAGIC_FIROK = "firok";
let SYMBOL_MAGIC_ASAMA = "asama";
let SYMBOL_MAGIC_IRFIG = "irfig";
let SYMBOL_MAGIC_GARDA = "garda";
export let SYMBOL_LIST = [
    SYMBOL_MAGIC_DETER,
    SYMBOL_MAGIC_FOHLO,
    SYMBOL_MAGIC_FIROK,
    SYMBOL_MAGIC_ASAMA,
    SYMBOL_MAGIC_IRFIG,
    SYMBOL_MAGIC_GARDA,
];
let SYMBOL_SRC_LIST = [
    symbol_magic_deter_src,
    symbol_magic_fohlo_src,
    symbol_magic_firok_src,
    symbol_magic_asama_src,
    symbol_magic_irfig_src,
    symbol_magic_garda_src,
];
let SYMBOL_MAP;
const SYMBOL_COLOR = "#00D0FF";

/**
 * 
 * @param {*} width card width (px)
 * @param {*} height card height (px)
 * @param {*} margin card margin (px), this is filled with black space
 * @param {*} padding how much space (px) to leave between margin and card features
 * @returns 
 */
export function generateCardSkin(width, height, margin, padding, textSize) {

    loadUIImages();

    console.log("width", width, "height", height, "margin", margin, "padding",padding,"textsize",textSize);

    const infopaneheight = margin * 2;
    const marginWidth = width - margin * 2;
    const marginHeight = height - margin - infopaneheight;//extra margin for info lines at bottom
    const columnX = [
        margin + padding,//base power, bonuses, pet name, rest
        margin + marginWidth * 0.175,//name, types, abilities
        margin + marginWidth * 0.9,//point cost, flavor text
    ];
    const wallRightX = margin + marginWidth * 1;
    const rowY = [
        margin + padding,//top of name plate, base power circle
        margin + marginHeight * 0.14,//biome bonus
        margin + marginHeight * 0.9,//rest, point cost
    ];
    const floorY = margin + marginHeight * 1;

    const boxX = columnX[1];
    const boxWidth = columnX[2] - columnX[1];
    const boxHeight = 100;

    const power_size = Math.min(columnX[1] - columnX[0]-padding/2,rowY[1]-rowY[0]-5);
    const rest_size = Math.min(columnX[1] - columnX[0]-10,floorY - rowY[2]);
    const cost_size = Math.min(wallRightX - columnX[2] + 20,floorY - rowY[2] + 20);
    console.log("rest", rest_size, "cost", cost_size);

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
            new Vector2(marginWidth, marginHeight),
            (card) => card.colors[0],
        ),
        //image
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(margin, margin),
            new Vector2(marginWidth, marginHeight),
            (card) => card.imgPortrait,
            undefined,
            (card) => {
                return {
                    imageFit: card.imageFit,
                    offset: card.imageOffset.clone(),
                    scale: card.imageScale || 1,
                };
            },
        ),
        //cost bg
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(columnX[2]-19, floorY - cost_size),
            new Vector2(cost_size, cost_size),
            (card) => UI_COST,
            undefined,
            (card) => FIT_WHOLE
        ),
        //type bg
        new DrawLayer(
            DRAWLAYER_BOX_ROUND,
            "#dbd69e",
            new Vector2(boxX, rowY[0]),
            new Vector2(boxWidth, boxHeight),
            (card) => card.colors[1],
        ),
        //base power circle
        new DrawLayer(
            DRAWLAYER_CIRCLE,
            "grey",
            new Vector2(columnX[0]+power_size/2, rowY[0]+power_size/2),
            new Vector2(power_size/2, power_size/2),
            (card) => card.colors[2],
        ),
        //rest value circle
        new DrawLayer(
            DRAWLAYER_IMAGE,
            undefined,
            new Vector2(columnX[0], rowY[2]),
            new Vector2(rest_size, rest_size),
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
            new Vector2(columnX[1], rowY[1]),
            new Vector2([columnX[2] - columnX[1]], textSize),
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
            new Vector2(boxX, rowY[0]+5),
            new Vector2(boxWidth, boxHeight * 0.4),
            (card) => card.species?.trim(),
            (card) => card.colors[3],
            (card) => {
                return {
                    padding: 0,
                    padding_left: 15,
                };
            },
        ),

        //tags
        new DrawLayer(
            DRAWLAYER_TEXT,
            "black",
            new Vector2(boxX, rowY[0]+33),
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
            new Vector2(wallRightX-cost_size/2, floorY-cost_size/2),
            new Vector2(cost_size/2, cost_size/2),
            (card) => costSpec.getTotalCost(card),
            (card) => card.colors[3],
            (card) => {
                return {
                    text_align: "center",
                    padding: 0,
                    padding_left: 0,
                    padding_right: 0,
                    max_text_height: textSize,
                };
            },
        ),

        //rest count
        new DrawLayer(
            DRAWLAYER_TEXT,
            "white",
            new Vector2(
                columnX[0],
                rowY[2]+rest_size * 0.3,
            ),
            new Vector2(rest_size, rest_size),
            (card) => card.getRestValue(),
            (card) => card.colors[5],
            (card) => {
                return {
                    text_align: "center",
                    padding: 0,
                    max_text_height: 35,
                };
            },
        ),

        //flavor text
        new DrawLayer(
            DRAWLAYER_TEXT,
            "white",
            new Vector2(boxX, rowY[2]+10),
            new Vector2(boxWidth, floorY - rowY[2]),
            (card) => "_" + card.flavorText.trim() + "_",
            (card) => card.colors[5],
            (card) => {
                return {
                    text_align: "left",
                    max_text_height: 20,
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
                    const bmHeight = boxHeight + textSize * 0.7;
                    const startY =
                        height -
                        card.abilities.length * bmHeight +
                        bmHeight * i -
                        130;
                    const textOffset = 70;
                    const symbol_x = 14;
                    const symbol_width = textSize * 1.75;

                    const abilityLines = ability.TextByLineWithFormat;
                    const lineYs = [];
                    let lastSize = 0;
                    const buffer = 5;
                    let textHeight = 0;
                    for (i in abilityLines) {
                        let arr = abilityLines[i];
                        if (i == 0) {
                            lineYs[i] = 0;
                        }
                        else {
                            lineYs[i] = lineYs[i - 1] + lastSize + buffer;
                            textHeight += buffer;
                        }
                        lastSize = arr[1];
                        textHeight += arr[1];
                    }
                    
                    const minBoxHeight = 80;
                    let abilityBoxHeight = Math.max(textHeight + 35, minBoxHeight);

                    return [
                        //Box
                        new DrawLayer(
                            DRAWLAYER_BOX_ROUND,
                            "white",
                            new Vector2(startX, startY),
                            new Vector2(boxWidth, abilityBoxHeight),
                            (card) => card.colors[1],
                        ),
                        //Magic Genus Symbol
                        new DrawLayer(
                            DRAWLAYER_IMAGE,
                            undefined,
                            new Vector2(startX+symbol_x, startY+15),
                            new Vector2(symbol_width, symbol_width),
                            (card) => SYMBOL_MAP[ability.magicGenus],
                        ),
                        //Ability text
                        ...ability.TextByLineWithFormat.map((arr,i)=>
                        new DrawLayer(
                            DRAWLAYER_TEXT,
                            "white",
                            new Vector2(startX + textOffset, startY + lineYs[i]),
                            new Vector2(boxWidth - textOffset, boxHeight),
                            (card) => arr[0],
                            (card) => arr[2],
                            (card) => {
                                return {
                                    text_align: "left",
                                    max_text_height: arr[1],
                                    padding: 10,
                                };
                            },
                            )
                        ),
                    ];
                }),
        ),

        //base power
        new DrawLayer(
            DRAWLAYER_TEXT,
            "white",
            new Vector2(columnX[0], rowY[0]),
            new Vector2(power_size, power_size*0.75),
            (card) => card.basePower,
            (card) => card.colors[5],
            (card) => {
                return {
                    text_align: "center",
                    padding: 10,
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
                    const textX = columnX[0];
                    const startY = rowY[1];
                    const textSizeBiome = textSize * 1.2;
                    const textSizeMod = textSize * 1.25;
                    const room = textSize*0.7;
                    const bmHeight = textSizeBiome + textSizeMod + room;
                    const areaWidth = columnX[1] - margin;
                    const areaWidthText = Math.min(areaWidth - (textX - startX) - textSize*0.5,300);
                    const color = (bm.modifier >= 0) ? "white" : "#FFB2B2";
                    const boxBuffer = textSize * 0.1;
                    const rowheight = bmHeight + boxBuffer;
                    return [
                        //back
                        new DrawLayer(
                            DRAWLAYER_IMAGE,
                            undefined,
                            new Vector2(
                                startX,
                                startY + rowheight * i - boxBuffer,
                            ),
                            new Vector2(areaWidth, bmHeight),
                            (card) => (bm.modifier >= 0)?UI_BONUS:UI_PENALTY,
                            undefined,
                            (card) => FIT_FILL
                        ),
                        //Biome
                        new DrawLayer(
                            DRAWLAYER_TEXT,
                            "white",
                            new Vector2(
                                textX,
                                startY + rowheight * i - boxBuffer,
                            ),
                            new Vector2(areaWidthText, textSizeBiome),
                            (card) => bm.biome,
                            (card) => color,
                            (card) => {
                                return {
                                    text_align: "left",
                                    padding: textSize * 0.2,
                                    max_text_height: textSizeBiome,
                                };
                            },
                        ),
                        //Modifier
                        new DrawLayer(
                            DRAWLAYER_TEXT,
                            "white",
                            new Vector2(
                                textX,
                                startY + rowheight * i - boxBuffer + textSizeMod,
                            ),
                            new Vector2(areaWidthText, textSizeMod),
                            (card) =>
                                `${bm.modifier > 0 ? "+" : ""}${bm.modifier}`,
                            (card) => color,
                            (card) => {
                                return {
                                    text_align: "left",
                                    padding_left: textSize * 0.2,
                                    max_text_height: textSizeMod,
                                };
                            },
                        ),
                    ];
                }),
        ),

        //Info pane
        new DrawLayer(
            DRAWLAYER_BOX,
            "black",
            new Vector2(0, height - infopaneheight),
            new Vector2(width, infopaneheight),
        )
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

    //2026-08-21: ref: https://stackoverflow.com/a/10652568/2336212
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    SYMBOL_MAP = {};
    for (let i in SYMBOL_LIST) {
        let symbol = SYMBOL_LIST[i];
        let img = new Image();
        img.src = SYMBOL_SRC_LIST[i];
        img.onload = () => {
            let c_src = colorSprite(img, SYMBOL_COLOR, canvas, ctx);
            img.src = c_src;
            img.onload = () => { };
        }
        SYMBOL_MAP[symbol] = img;
    }

}

//2026-08-21: TODO: move this function to utility
function colorSprite(image, color, c, ctx) {
    //2026-08-21: copied from https://stackoverflow.com/a/45710008/2336212
    //ref: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
    //ref: https://stackoverflow.com/a/10257830/2336212

    //clear the canvas    
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, c.width, c.height);

    // draw image
    ctx.drawImage(image, 0, 0);

    // set composite mode
    ctx.globalCompositeOperation = "source-in";

    // draw color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, c.width, c.height);    

    return c.toDataURL();
}
