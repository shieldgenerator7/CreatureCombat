"use strict"

import React, { useRef, useEffect } from 'react';
import { UploadFromFilePicker } from '../Utility/Upload';
import Creature, { FIT_WHOLE, FIT_WIDTH, FIT_HEIGHT, FIT_FILL } from '../Data/Creature';
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
            <div>
                <input type="number" className="field" onChange={(e) => {
                    card.basePower = Math.max(0, e.target.value * 1);
                    updateCard(card);
                }}
                    value={card.basePower.toString()}></input>
            </div>

            {/* Rest Count */}
            Rest Count
            <div>
                <input type="number" className="field" onChange={(e) => {
                    card.rest = Math.max(0, e.target.value * 1);
                    updateCard(card);
                }}
                    value={card.rest.toString()}></input>
            </div>

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
                            value={bm.modifier.toString()}></input>
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
            <div className='info'>
                Show Reminder Text
                <input type="checkbox" checked={card.showReminderText}
                    onChange={() => {
                        card.showReminderText = !card.showReminderText;
                        updateCard(card);
                    }}
                />
            </div>
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
                                        ability.requirementX = Math.max(0, e.target.value * 1);
                                        updateCard(card);
                                    }}
                                        value={ability.requirementX.toString()}
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
                                        ability.costX = Math.max(0, e.target.value * 1);
                                        updateCard(card);
                                    }}
                                        value={ability.costX.toString()}
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
                                        ability.effectX = Math.max(0, e.target.value * 1);
                                        updateCard(card);
                                    }}
                                        value={ability.effectX.toString()}
                                    ></input>
                                )}
                            </div>
                            {ability.effectName == "custom" && (<>
                                <div>
                                    <span>Effect Point Cost</span>
                                    <input type="number" className='field' title='Effect Point Cost' onChange={(e) => {
                                        ability.effectCost = Math.max(0, e.target.value * 1);
                                        updateCard(card);
                                    }}
                                        value={ability.effectCost.toString()}
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
            {
                !card.imageURL && (<>
                    <div className='info'>Recommended: 690x483</div>
                    <button className="action" onClick={() => {
                        UploadFromFilePicker("image/*", false, (imageURL, filename) => {
                            card.imageURL = imageURL;
                            card.imageFileName = filename;
                            if (card.imageURL) {
                                let creatureImage = new Image();
                                creatureImage.src = card.imageURL;
                                creatureImage.onload = () => {
                                    card.imgPortrait = creatureImage;
                                    updateCard(card);
                                }
                            }
                            else {
                                updateCard(card);
                            }
                        });
                    }}>Upload</button>
                </>)
            }
            {
                card.imageURL && (
                    <div>
                        <div className='info'>
                            {card.imageFileName ?? "Portrait"}
                            {/* Remove Button */}
                            <button onClick={() => {
                                card.imageURL = undefined;
                                card.imageFileName = undefined;
                                card.imgPortrait = undefined;
                                updateCard(card);
                            }}>X</button>
                        </div>
                        <div className='info'>Portrait Fit
                            <select onChange={(e) => {
                                let value = e.target.value * 1;
                                card.imageFit = value;
                                updateCard(card);
                            }}
                                value={card.imageFit}>
                                <option value={FIT_WHOLE}>Whole</option>
                                <option value={FIT_FILL}>Fill</option>
                                <option value={FIT_WIDTH}>Width</option>
                                <option value={FIT_HEIGHT}>Height</option>
                            </select>
                        </div>
                    </div>
                )
            }

            {/* Text Color */}
            Text Color
            <div>
                {
                    card.colors
                        .filter((c, i) => i >= 3)
                        .map((color, i) => (<span key={"tc_" + i}>
                            {i + 1}
                            <input type="color" value={color ?? "#FFFFFF"} onChange={(e) => {
                                card.colors[i + 3] = e.target.value;
                                updateCard(card);
                            }}></input>
                        </span>))
                }
            </div>

            {/* Background Color */}
            Background Color
            <div>
                {
                    card.colors
                        .filter((c, i) => i < 3)
                        .map((color, i) => (< span key={"bgc_" + i}>
                            {i + 1}
                            <input type="color" value={color ?? "#FFFFFF"} onChange={(e) => {
                                card.colors[i] = e.target.value;
                                updateCard(card);
                            }}></input>
                        </span>))
                }
            </div>

            {/* Download Button */}
            Download File
            <div>
                <button className='action' onClick={(e) => {
                    const json = JSON.stringify(card);



                    const link = document.createElement('a');
                    let cardName = `${card.name || card.species || "card"}`.trim().replaceAll(" ", "");
                    link.download = `${cardName}_${card.getFinalCost()}pts.card`;

                    //2024-03-17: copied from https://stackoverflow.com/a/30800715/2336212
                    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
                    // var dlAnchorElem = document.getElementById('downloadAnchorElem');
                    // dlAnchorElem.setAttribute("href", dataStr);
                    link.href = dataStr;
                    // dlAnchorElem.setAttribute("download", "scene.json");
                    // dlAnchorElem.click();
                    link.click();
                }}>
                    Download .card File
                </button>
            </div>
        </div>
    );
}

export default EditPanel;
