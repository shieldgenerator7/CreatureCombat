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

            {/* Species */}
            <input type="text" onChange={(e) => {
                card.species = e.target.value;
                updateCard(card);
            }}
                value={card.species}></input>

            {/* Species */}
            <input type="text" onChange={(e) => {
                let tags = "" + e.target.value;
                card.tags = tags.split(", ");
                updateCard(card);
            }}
                value={card.tags.join(", ")}></input>

            {/* Base Power */}
            <input type="text" onChange={(e) => {
                card.basePower = e.target.value*1;
                updateCard(card);
            }}
                value={card.basePower}></input>

            {/* Ability TEST */}
            <input type="text" onChange={(e) => {
                card.ability = e.target.value;
                updateCard(card);
            }}
                value={card.ability}></input>

            {/* Flavor Text */}
            <input type="text" onChange={(e) => {
                card.flavorText = e.target.value;
                updateCard(card);
            }}
            value={card.flavorText}></input>
        </div>
    );
}

export default EditPanel;
