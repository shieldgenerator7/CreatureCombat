"use strict";

//2024-03-02: copied from https://www.dhiwise.com/post/designing-stunning-artwork-with-react-canvas-draw
import React, { useRef, useEffect } from 'react';
import { RESOLUTION, renderCard } from '../Utility/Render';
import { generateCardSkin } from '../Data/DrawData';
import { costDisplay, costSpec } from '../Data/CostSpec';
import { downloadFile } from '../Utility/Download';
import { FIT_FILL, FIT_HEIGHT, FIT_WHOLE, FIT_WIDTH } from '../Data/Creature';

const width = 2.5 * RESOLUTION;
const height = 3.5 * RESOLUTION;
const drawData = generateCardSkin(width, height, 0.1 * RESOLUTION, 0.04 * RESOLUTION, 0.1 * RESOLUTION);

function Canvas({ card, useBaseCard, generateCard, autoDownload }) {

    const canvasRef = useRef(null);

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        renderCard(card, canvas, drawData);
    };

    const saveImage = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        let cardName = `${card.getNameText(false, true, costSpec) || "card"}`.trim().replaceAll(" ", "");
        link.download = `${cardName}.png`;
        link.click();
    };

    useEffect(() => {
        updateCanvas();
    }, [card]);

    return (
        <div className='cardPanel'>
            {/* Canvas */}
            <canvas ref={canvasRef} className='cvsCard' />
            {/* Base Card Button */}
            <button className='action' onClick={useBaseCard}>
                Base Card
            </button>
            {/* Generate Button */}
            <button className='action' onClick={generateCard}>
                Generate Card
            </button>
            {/* Save Image Button */}
            <button className='action' onClick={saveImage}>
                Save Image
            </button>
            {/* Download Card Button */}
            <button className='action' onClick={(e) => {
                let cardName = `${card.getNameText(false, true, costSpec) || "card"}`.trim().replaceAll(" ", "");
                downloadFile(card, cardName, "card");
            }}>
                Download .card File
            </button>
            <div className='info'>
                <p>{card.getNameText(true) || `[${[card.tags[0], "creature"].filter(a => a).join(" ")}]`} {costDisplay(costSpec.getTotalCost(card), false, true, false)}</p>
                <p>Type: {card.tags.join(", ")}</p>
                <p>Base Power: {card.basePower} {costDisplay(costSpec.basePowerFunc(card.basePower))}</p>
                <p>Rest Cost: {card.rest} {costDisplay(costSpec.restFunc(card.rest), true, false)}</p>
                <p>Biome Modifiers: {card.biomeModifiers.filter(bm=>bm.modifier != 0).length} {costDisplay(costSpec.biomeModifierAllFunc(card.biomeModifiers, card.basePower), true)}</p>
                <p>Abilities: {card.abilities.length} {costDisplay(costSpec.abilityAllFunc(card.abilities))}</p>
                <p>Flavor Text: {card.flavorText}</p>
                <p>Art: {card.imageFileName ?? "Portrait"}</p>
                <p>Art settings: fit {["whole", "fill", "width", "height"][card.imageFit]}, ({(card.imageOffset.x > 0) ? "+" : ""}{card.imageOffset.x}, {(card.imageOffset.y > 0) ? "+" : ""}{card.imageOffset.y}), x{ card.imageScale}</p>
                {/* {FullTextHtml} */}
            </div>
        </div>
    );
}

export default Canvas;
