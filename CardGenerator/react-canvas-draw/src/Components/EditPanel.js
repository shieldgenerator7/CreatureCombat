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

            {/* Biome Modifiers */}
            Biome Modifiers
            {
                card.biomeModifiers.map((bm, i) => {
                    return (<div className='fieldLine' key={"divBM_" + i}>
                        {/* Biome */}
                        <input type="text" onChange={(e) => {
                            bm.biome = e.target.value;
                            updateCard(card);
                        }}
                            value={bm.biome}></input>
                        {/* Modifier */}
                        <input type="number" onChange={(e) => {
                            bm.modifier = e.target.value * 1;
                            updateCard(card);
                        }}
                            value={bm.modifier}></input>
                        {/* Remove Button */}
                        <button onClick={() => {
                            card.biomeModifiers.splice(i, 1);
                            updateCard(card);
                        }}>X</button>
                    </div>);
                })
            }
            {/* Add Button */}
            {card.biomeModifiers.length < 5 && (
                <button className='action' onClick={() => {
                    card.addBiomeModifier("", 0);
                    updateCard(card);
                }}>Add Biome Modifier</button>
            )}

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
            <div className='lowvisibilitylabel'>Paste Box</div>
            <textarea className="field multiline lowvisibility" onChange={(e) => {
                //2024-03-03: setup to work with a specific Excel spreadsheet i have
                let txt = e.target.value;
                if (!txt) { return; }
                console.log("TXT PASTE STRING ON CHANGE");
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
