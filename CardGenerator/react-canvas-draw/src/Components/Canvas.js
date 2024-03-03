"use strict";

//2024-03-02: copied from https://www.dhiwise.com/post/designing-stunning-artwork-with-react-canvas-draw
import React, { useRef, useEffect } from 'react';

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Start drawing
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
      <canvas ref={canvasRef} />
      <button onClick={saveImage}>Save Image</button>
    </div>
  );
}

export default Canvas;
