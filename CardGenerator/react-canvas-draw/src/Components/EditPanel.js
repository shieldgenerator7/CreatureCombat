"use strict"

import React from 'react';
import { UploadFromFilePicker } from '../Utility/Upload';
import { FIT_WHOLE, FIT_WIDTH, FIT_HEIGHT, FIT_FILL } from '../Data/Creature';
import { biomeList } from '../Data/BiomeModifier';
import { abilityCosts, abilityEffects, abilityRequirements } from '../Data/AbilityData';
import { makeUserFacing } from '../Utility/Utility';
import Counter from './Counter';
import AbilityPanel from './AbilityPanel';
import { costDisplay, costSpec } from '../Data/CostSpec';

function EditPanel({ card, setCard, updateCard, openPanel }) {
    return (
        <div className="editPanel">

            {/* Header */}
            <div>{card.getNameText(true)} {costDisplay(costSpec.getTotalCost(card), false, true, false)}</div>

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
            Base Power {costDisplay(costSpec.basePowerFunc(card.basePower))}
            <Counter
                value={card.basePower}
                setValue={(v) => {
                    card.basePower = v;
                    updateCard(card);
                }}></Counter>

            {/* Rest Count */}
            Rest Count {costDisplay(costSpec.restFunc(card.rest), true, false)}
            <div className='info'>
                Show Reminder Text
                <input type="checkbox" checked={card.showReminderText}
                    onChange={() => {
                        card.showReminderText = !card.showReminderText;
                        updateCard(card);
                    }}
                />
            </div>
            <Counter
                value={card.rest}
                setValue={(v) => {
                    card.rest = v;
                    updateCard(card);
                }}
            ></Counter>

            {/* Biome Modifiers */}
            Biome Modifiers {costDisplay(costSpec.biomeModifierAllFunc(card.biomeModifiers), true)}
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
                        <Counter
                            value={bm.modifier}
                            setValue={(v) => {
                                bm.modifier = v;
                                updateCard(card);
                            }}
                            allowNegative={true}
                            inline={true}
                        ></Counter>

                        {/* Biome Modifier Point Cost */}
                        {costDisplay(costSpec.biomeModifierFunc(bm.modifier), true)}

                        {/* Remove Button */}
                        <button className="ex" onClick={() => {
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
            Abilities {costDisplay(costSpec.abilityAllFunc(card.abilities))}
            {
                card.abilities.map((ability, i) => {
                    return (
                        <div className='info'>{ability.name} {costDisplay(costSpec.abilityFunc(ability))}</div>
                        // <AbilityPanel
                        //     key={`_ability_${i}`}
                        //     ability={ability}
                        //     updateAbility={(a) => {
                        //         card.abilities[i] = a;
                        //         card.abilities = card.abilities.filter(a => a);
                        //         updateCard(card);
                        //     }}
                        // ></AbilityPanel>
                    );
                })
            }
            <div>
                <button className='action' onClick={(e) => {
                    openPanel("ability", true);
                }}>Edit Abilities</button>
            </div>
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
                            <button className="ex" onClick={() => {
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
                    let cardName = `${card.getNameText(false, true, costSpec) || "card"}`.trim().replaceAll(" ", "");
                    link.download = `${cardName}.card`;

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
