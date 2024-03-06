"use strict"

import React, { useRef, useEffect } from 'react';
import { UploadFromFilePicker } from '../Utility/Upload';
import Creature from '../Data/Creature';

function EditPanel({ card, setCard, updateCard, pasteString, setPasteString }) {
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
                card.setTags(tags);
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
            <input type="number" className="field" onChange={(e) => {
                card.abilityCost = e.target.value;
                updateCard(card);
            }}
                value={card.abilityCost}
            ></input>
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

            {/* Card Art */}
            Card Art
            <button className="action" onClick={() => {
                console.log("upload");
                UploadFromFilePicker(card, () => updateCard(card));
            }}>Upload</button>
            {card.imageFileName && card.imageFileName}

            {/* Paste Box */}
            Paste Box
            <textarea className="field multiline" onChange={(e) => {
                //2024-03-03: setup to work with a specific Excel spreadsheet i have
                let txt = e.target.value;
                if (!txt) { return; }
                setPasteString(txt);
            }}
                rows="3"
                placeholder="Paste new creature data here (from spreadsheet)"
                value={pasteString}
            ></textarea>
        </div>
    );
}

export default EditPanel;
