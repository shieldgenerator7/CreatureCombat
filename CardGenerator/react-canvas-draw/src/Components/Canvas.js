"use strict";
import { arraySort, getDateString, getLines } from '../Utility/Utility';

//2024-03-02: copied from https://www.dhiwise.com/post/designing-stunning-artwork-with-react-canvas-draw
import React, { useRef, useEffect } from 'react';
import { VERSION } from '../Version';

const RESOLUTION = 300;
const width = 2.5 * RESOLUTION;
const height = 3.5 * RESOLUTION;

function Canvas({ card, autoDownload }) {

    const canvasRef = useRef(null);

    const updateCanvas = (img) => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        // card = makeCardTest();

        // Back Boxes
        const bufferBase = 0.1 * RESOLUTION;
        const textRow = 0.25 * RESOLUTION;
        const textAreaY = 2.4 * RESOLUTION;
        const textAreaH = 1 * RESOLUTION;
        let boxes = [
            // border
            { c: 'black', x: 0, y: 0, w: width, h: height },
            // base
            { c: card.colors[0], x: 0 + bufferBase, y: 0 + bufferBase, w: width - bufferBase * 2, h: height - bufferBase * 2 },
        ];
        boxes.forEach(box => {
            context.fillStyle = box.c;
            context.fillRect(box.x, box.y, box.w, box.h);
        });

        // images
        if (img) {
            context.drawImage(
                img,
                0 + bufferBase,
                textRow * 2.75 + bufferBase,
                width - bufferBase * 2,
                1.615 * RESOLUTION
            );
        }

        //Front Boxes
        boxes = [
            //type
            { c: card.colors[1], x: 0 + bufferBase, y: textRow * 2 + bufferBase, w: width - bufferBase * 2, h: textRow * .75 },
            //text border
            { c: 'black', x: 0, y: textAreaY, w: width, h: textAreaH },
            //text area
            { c: card.colors[1], x: 0 + bufferBase, y: textAreaY + bufferBase / 2, w: width - bufferBase * 2, h: textAreaH - bufferBase },
            //card info
            { c: 'black', x: 0, y: height - bufferBase * 2, w: width, h: bufferBase * 2 },
        ];
        boxes.forEach(box => {
            context.fillStyle = box.c;
            context.fillRect(box.x, box.y, box.w, box.h);
        });

        //Circles
        context.beginPath();
        context.arc(
            bufferBase * 5.5 * 0.5,
            height - bufferBase * 4.2,
            50,
            0,
            2 * Math.PI
        );
        context.fillStyle = card.colors[2];
        context.fill();
        //Ability Cost (TEST)
        // context.beginPath();
        // context.arc(
        //     bufferBase * 8.35,
        //     textRow * 10.4,
        //     15,
        //     0,
        //     2 * Math.PI
        // );
        // context.fillStyle = 'grey';
        // context.fill();

        // text

        context.fillStyle = card.colors[3];
        let fontSize;
        //Name
        if (card.name) {
            fontSize = 2.5 / 4;
            context.font = `${textRow * fontSize}px Arial`;
            context.fillText(
                card.name,
                bufferBase * 6 / 4,
                textRow * 1 + bufferBase - ((textRow - fontSize) * 0.3)
            );
        }
        else {
            // fontSize = 1.5 / 4;
            // context.fillStyle = 'lightgrey';
            // context.font = `italic ${textRow * fontSize}px Arial`;
            // context.fillText(
            //     "[card name goes here]",
            //     bufferBase * 6 / 4,
            //     textRow * 1 + bufferBase - ((textRow - fontSize) * 0.4)
            // );
        }
        //Species
        fontSize = 7 / 8;
        context.fillStyle = card.colors[3];
        context.font = `${textRow * fontSize}px Arial`;
        context.fillText(
            card.species,
            bufferBase * 6 / 4,
            textRow * 2 + bufferBase - ((textRow - fontSize) * 0.3)
        );
        //Tags
        fontSize = 0.35;
        context.fillStyle = card.colors[4];
        context.font = `${textRow * fontSize}px Arial`;
        context.fillText(
            card.tags.map(t => t).join(" • "),
            bufferBase * 6 / 4,
            textRow * 2.5 + bufferBase
        );
        //Cost
        fontSize = 0.5;
        context.fillStyle = card.colors[3];
        context.font = `${textRow * fontSize}px Arial`;
        context.fillText(
            card.getFinalCost(),
            width - bufferBase * 2 - fontSize * 70,
            textRow * 1 + bufferBase - ((textRow - fontSize) * 0.3)
        );
        //Star Count
        context.fillStyle = card.colors[3];
        fontSize = 0.5;
        context.font = `${textRow * fontSize}px Arial`;
        let starCount = card.getStarCount();
        context.fillText(
            "★ ".repeat(starCount),
            width - bufferBase * 2 - fontSize * 70 * starCount,
            textRow * 2 + bufferBase - ((textRow - fontSize) * 0.3)
        );
        //Ability
        context.fillStyle = card.colors[4];
        fontSize = 0.3;
        context.font = `${textRow * fontSize}px Arial`;
        let abilityStartY = textRow * 10.5;
        const MAX_WIDTH_TEXT = width - bufferBase * 4;
        let abilityLines = card.abilities
            .map(ability => ability.FullText)
            .map(text => getLines(context, text, MAX_WIDTH_TEXT))
            .flat();
        const LINEHEIGHT = 0.1 * RESOLUTION;
        abilityLines.forEach((line, i) => {
            context.fillText(
                line,
                0 + bufferBase * 2,
                abilityStartY + LINEHEIGHT * i
            );
        });
        //Ability Cost (TEST)
        // context.fillStyle = 'white';
        // fontSize = 0.3;
        // context.font = `${textRow * fontSize}px Arial`;
        // context.fillText(
        //     "-1",
        //     0 + bufferBase * 8,
        //     textRow * 10.5
        // );
        //Flavor Text
        context.fillStyle = card.colors[4];
        fontSize = 0.3;
        context.font = `italic ${textRow * fontSize}px Arial`;
        let flavorStartY = Math.max(
            abilityStartY + (abilityLines.length * LINEHEIGHT),
            textRow * 11.2
        );
        let flavorLines = getLines(context, card.flavorText.trim(), MAX_WIDTH_TEXT);
        flavorLines.forEach((line, i) => {
            context.fillText(
                line,
                0 + bufferBase * 2,
                flavorStartY + LINEHEIGHT * i
            );
        })
        //
        //Base Power
        context.fillStyle = card.colors[5];
        fontSize = 0.5;
        context.font = `${textRow * fontSize}px Arial`;
        context.fillText(
            card.basePower,
            0 + bufferBase * 2.5,
            height - bufferBase * 2.5 - fontSize * 70
        );
        //Biome Modifiers
        context.fillStyle = card.colors[4];
        fontSize = 0.35;
        context.font = `${textRow * fontSize}px Arial`;
        let bmStartY = height - bufferBase * 3.5 - fontSize * 70;
        let bmLineHeight = 0.1 * RESOLUTION;
        let bmStartX = 0 + bufferBase * 4.7;
        let bmBufferX = width * 0.15;
        let bmModOffset = bmBufferX * 0.15;
        let bmList = [...card.biomeModifiers];
        arraySort(bmList, (bm) => bm.modifier * -1);
        bmList.forEach((bm, i) => {
            let drawX = bmStartX + bmBufferX * i;
            context.fillText(
                bm.biome?.trim() || `[biome ${i + 1}]`,
                drawX,
                bmStartY
            );
            context.fillText(
                ((bm.modifier > 0) ? "+" : "") + bm.modifier,
                drawX + bmModOffset,
                bmStartY + bmLineHeight
            )
        });
        //Card Info
        let creditsX = 0 + bufferBase * 2.9;
        let creditsY = height - bufferBase * 1.4;
        context.fillStyle = 'white';
        fontSize = 0.2;
        context.font = `${textRow * fontSize}px Arial`;
        context.fillText(
            "Id: " + card.id,
            creditsX,
            creditsY
        );
        context.fillText(
            "Variant: " + card.variant,
            creditsX + bufferBase * 6,
            creditsY
        );
        const oneOrBoth = (saved, current, extra = "") => {
            let str = `${extra}${saved}`;
            if (saved != current) {
                str += ` - ${extra}${current}`;
            }
            return str;
        }
        let dateString = oneOrBoth(card.creationDate, getDateString());
        context.fillText(
            `Creation Date: ${dateString}`,
            creditsX + bufferBase * 12,
            creditsY
        );
        let versionString = oneOrBoth(card.editorVersion, VERSION, "v");
        context.fillText(
            `www.creaturecombat.io           ${versionString}`,
            creditsX + bufferBase * 0.2,
            creditsY + bufferBase / 2
        );
    }

    const saveImage = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        let cardName = `${card.name || card.species || "card"}`.trim().replaceAll(" ", "");
        link.download = `${cardName}_${card.getFinalCost()}pts.png`;
        link.click();
    };

    useEffect(() => {
        if (card.imageURL) {
            let creatureImage = new Image();
            creatureImage.src = card.imageURL;
            creatureImage.onload = () => {
                updateCanvas(creatureImage);
                // console.log("useffect autoDownload (img)", autoDownload);
                if (autoDownload) {
                    saveImage();
                }
            }

        }
        else {
            updateCanvas();
            // console.log("useffect autoDownload (no img)", autoDownload);
            if (autoDownload) {
                saveImage();
            }
        }
    }, [card, autoDownload]);

    const makeCardTest = () => {
        card.name = ""; //"Willus";
        card.species = "Leftop";
        card.basePower = 5;
        card.addBiomeModifier("Forest", 2);
        card.addBiomeModifier("Jungle", 2);
        card.tags = [
            "insect",
            "flying",
            "light",
            "poison",
        ];
        card.ability = "SHIELD LASER:  -1 : Reduce incoming damage by 5."
        card.flavorText = "Although solitary, these giant insects are quite formidable."

        //Card Info
        card.id = "#1256201516";
        card.variant = "01/01";
        card.editorVersion = "0.001";
        card.creationDate = "2024-03-02";
        return card;
    }

    return (
        <div className='cardPanel'>
            <canvas ref={canvasRef} className='cvsCard' />
            <button className='action' onClick={saveImage}>
                Save Image
            </button>
        </div>
    );
}

export default Canvas;
