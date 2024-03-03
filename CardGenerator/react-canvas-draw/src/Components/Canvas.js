"use strict";

//2024-03-02: copied from https://www.dhiwise.com/post/designing-stunning-artwork-with-react-canvas-draw
import React, { useRef, useEffect } from 'react';

const RESOLUTION = 300;
const width = 2.5 * RESOLUTION;
const height = 3.5 * RESOLUTION;

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    let card = makeCardTest();

    const bufferBase = 0.1 * RESOLUTION;
    const textRow = 0.25 * RESOLUTION;
    const textAreaY = 2.4 * RESOLUTION;
    const textAreaH = 1 * RESOLUTION;
    let boxes = [
      // border
      { c: 'black', x: 0, y: 0, w: width, h: height },
      // base
      { c: 'white', x: 0 + bufferBase, y: 0 + bufferBase, w: width - bufferBase * 2, h: height - bufferBase * 2 },
      //type
      { c: '#dbd69e', x: 0 + bufferBase, y: textRow * 2 + bufferBase, w: width - bufferBase * 2, h: textRow },
      //text border
      { c: 'black', x: 0, y: textAreaY, w: width, h: textAreaH },
      //text area
      { c: '#dbd69e', x: 0 + bufferBase, y: textAreaY + bufferBase / 2, w: width - bufferBase * 2, h: textAreaH - bufferBase },
      //card info
      { c: 'black', x: 0, y: height - bufferBase * 2, w: width, h: bufferBase * 2 },
    ];
    boxes.forEach(box => {
      context.fillStyle = box.c;
      context.fillRect(box.x, box.y, box.w, box.h);
    });
    // context.beginPath();
    // context.arc(100, 100, 50, 0, 2 * Math.PI);
    // context.fillStyle = 'red';
    // context.fill();
  }, []);

  const saveImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'canvas.png';
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef}
        style={{ width: "500px", height: "700px", display: "block" }}
      />
      <button onClick={saveImage}>Save Image</button>
    </div>
  );
}

export default Canvas;
