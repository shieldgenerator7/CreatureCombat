"use strict";

//2024-03-02: copied from https://www.dhiwise.com/post/designing-stunning-artwork-with-react-canvas-draw
import React, { useRef, useEffect } from 'react';
import { RESOLUTION, renderCard } from '../Utility/Render';
import { generateCardSkin } from '../Data/DrawData';

const width = 2.5 * RESOLUTION;
const height = 3.5 * RESOLUTION;
const drawData = generateCardSkin(width, height, 0.1 * RESOLUTION, 0.1 * RESOLUTION);

function Canvas({ card, autoDownload }) {

    const canvasRef = useRef(null);

    const updateCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        renderCard(card, canvas, drawData);
    }

    const saveImage = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        let cardName = `${card.getNameText(false, true) || "card"}`.trim().replaceAll(" ", "");
        link.download = `${cardName}.png`;
        link.click();
    };

    useEffect(() => {
        updateCanvas();
    }, [card]);

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
