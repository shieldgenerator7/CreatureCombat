"use strict"

import React, { useRef, useEffect } from 'react';

function EditPanel({ card , setCard, updateCard}) {//
    return (
        <div>
            {/* Name */}
            <input type="text" onChange={(e) => {
                card.name = e.target.value;
                updateCard(card);
            }}
            value={card.name}></input>
        </div>
    );
}

export default EditPanel;
