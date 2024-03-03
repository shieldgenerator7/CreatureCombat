"use strict"

import React, { useRef, useEffect } from 'react';

function EditPanel({ card , setCard, updateCard}) {//
    return (
        <div className="editPanel">
            {/* Name */}
            Name
            <input type="text" className="field" onChange={(e) => {
                card.name = e.target.value;
                updateCard(card);
            }}
                value={card.name}></input>

            {/* Species */}
            Species
            <input type="text" className="field" onChange={(e) => {
                card.species = e.target.value;
                updateCard(card);
            }}
                value={card.species}></input>

            {/* Tags */}
            Type
            <input type="text" className="field" onChange={(e) => {
                let tags = "" + e.target.value;
                card.tags = tags.split(", ");
                updateCard(card);
            }}
                value={card.tags.join(", ")}></input>

            {/* Base Power */}
            Base Power
            <input type="text" className="field" onChange={(e) => {
                card.basePower = e.target.value * 1;
                updateCard(card);
            }}
                value={card.basePower}></input>

            {/* Ability TEST */}
            Ability
            <textarea className="field multiline" onChange={(e) => {
                card.ability = e.target.value;
                updateCard(card);
            }}
                rows="5"
                value={card.ability}
            ></textarea>

            {/* Flavor Text */}
            Flavor Text
            <textarea className="field multiline" onChange={(e) => {
                card.flavorText = e.target.value;
                updateCard(card);
            }}
                rows="5"
                value={card.flavorText}
            ></textarea>
        </div>
    );
}

export default EditPanel;
