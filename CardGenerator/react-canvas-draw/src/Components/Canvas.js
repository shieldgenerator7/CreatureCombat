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

    // Start drawing
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.beginPath();
    context.arc(100, 100, 50, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
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
        style={{ width: "250px", height: "350px", display: "block" }}
      />
      <button onClick={saveImage}>Save Image</button>
    </div>
  );
}

export default Canvas;
