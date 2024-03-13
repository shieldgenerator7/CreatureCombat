"use strict"

import React, { useRef, useEffect } from 'react';
import { UploadFromFilePicker } from '../Utility/Upload';
import Creature from '../Data/Creature';
import { biomeList } from '../Data/BiomeModifier';
import { abilityCosts, abilityEffects, abilityRequirements } from '../Data/AbilityData';
import { capitalizeFirstLetters, makeUserFacing } from '../Utility/Utility';

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
                    const biomeFunc = (e) => {
                        bm.biome = e.target.value;
                        updateCard(card);
                    }
                    return (<div className='fieldLine' key={"divBM_" + i}>
                        {/* Biome */}
                        <select className="sltBiome" value={bm.biome} onChange={biomeFunc}>
                            {
                                biomeList
                                    .filter(b => !card.hasBiome(b) || bm.biome == b)
                                    .map(b => (
                                        <option value={b} key={b}>{b}</option>
                                    ))
                            }
                        </select>
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

            {/* Abilities */}
            Ability
            {
                card.abilities.map((ability, i) => {
                    const reqFunc = (e) => {
                        let req = e.target.value;
                        ability.requirementName = req;
                        updateCard(card);
                    };
                    const costFunc = (e) => {
                        let cost = e.target.value;
                        ability.costName = cost;
                        updateCard(card);
                    };
                    const effectFunc = (e) => {
                        let effect = e.target.value;
                        ability.effectName = effect;
                        updateCard(card);
                    };
                    const reqHasNumber = ability.abilityRequirement?.symbol.includes("X");
                    const costHasNumber = ability.abilityCost?.symbol.includes("X");
                    const effectHasNumber = ability.abilityEffect?.text.includes("X");

                    const abilityName = ability.name.trim();

                    return (
                        <div className='abilityArea' key={`ability_${i}`}>
                            {/* Ability Header */}
                            <div>
                                {`${abilityName || `Ability ${i + 1}`} (${ability.TotalCost}pts)`}
                                {/* Remove Button */}
                                <button onClick={() => {
                                    card.abilities.splice(i, 1);
                                    updateCard(card);
                                }}>X</button>
                            </div>
                            {/* Ability Name */}
                            <div>
                                <span>Name</span>
                                <input type="text" onChange={(e) => {
                                    ability.name = e.target.value;
                                    updateCard(card);
                                }}
                                    value={ability.name}
                                ></input>
                            </div>
                            {/* Ability Requirement */}
                            <div>
                                <span>Req</span>
                                <select value={ability.requirementName} onChange={reqFunc}>
                                    {
                                        abilityRequirements
                                            .map(r => r.name)
                                            // .filter(r => !ability.hasRequirement(r) || bm.biome == b)
                                            .map(r => (
                                                <option value={r} key={r}>{makeUserFacing(r)}</option>
                                            ))
                                    }
                                </select>
                                {reqHasNumber && (
                                    <input type="number" onChange={(e) => {
                                        ability.requirementX = e.target.value * 1;
                                        updateCard(card);
                                    }}
                                        value={ability.requirementX}
                                    ></input>
                                )}
                            </div>
                            {/* Ability Cost */}
                            <div>
                                <span>Cost</span>
                                <select value={ability.costName} onChange={costFunc}>
                                    {
                                        abilityCosts
                                            .map(c => c.name)
                                            // .filter(r => !ability.hasCost(c) || bm.biome == b)
                                            .map(c => (
                                                <option value={c} key={c}>{makeUserFacing(c)}</option>
                                            ))
                                    }
                                </select>
                                {costHasNumber && (
                                    <input type="number" onChange={(e) => {
                                        ability.costX = e.target.value * 1;
                                        updateCard(card);
                                    }}
                                        value={ability.costX}
                                    ></input>
                                )}
                            </div>
                            {/* Ability Effect */}
                            <div>
                                <span>Effect</span>
                                <select value={ability.effectName} onChange={effectFunc}>
                                    {
                                        abilityEffects
                                            .map(f => f.name)
                                            // .filter(r => !ability.hasCost(f) || bm.biome == b)
                                            .map(f => (
                                                <option value={f} key={f}>{makeUserFacing(f)}</option>
                                            ))
                                    }
                                </select>
                                {effectHasNumber && (
                                    <input type="number" onChange={(e) => {
                                        ability.effectX = e.target.value * 1;
                                        updateCard(card);
                                    }}
                                        value={ability.effectX}
                                    ></input>
                                )}
                            </div>
                            {ability.effectName == "custom" && (<>
                                <div>
                                    <span>Effect Point Cost</span>
                                    <input type="number" className='field' title='Effect Point Cost' onChange={(e) => {
                                        ability.effectCost = e.target.value * 1;
                                        updateCard(card);
                                    }}
                                        value={ability.effectCost}
                                    ></input>
                                </div>
                                <div>
                                    <span>Effect</span>
                                    <textarea className="field multiline" onChange={(e) => {
                                        ability.effectText = e.target.value;
                                        updateCard(card);
                                    }}
                                        rows="5"
                                        value={ability.effectText}
                                    ></textarea>
                                </div>
                            </>)}
                        </div>
                    );
                })
            }
            {/* Add Button */}
            {card.abilities.length < 2 && (
                <button className='action' onClick={() => {
                    card.addAbility();
                    updateCard(card);
                }}>Add Ability</button>
            )}

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

            {/* Count */}
            Count
            <input type="text" className="field" onChange={(e) => {
                card.count = e.target.value * 1;
                updateCard(card);
            }}
                value={card.count}></input>

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
