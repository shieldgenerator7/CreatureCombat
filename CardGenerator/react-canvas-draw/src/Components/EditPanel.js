"use strict"

import React from 'react';
import { UploadFromFilePicker } from '../Utility/Upload';
import { FIT_WHOLE, FIT_WIDTH, FIT_HEIGHT, FIT_FILL } from '../Data/Creature';
import { biomeList } from '../Data/BiomeModifier';
import { abilityCosts, abilityEffects, abilityRequirements } from '../Data/AbilityData';
import { makeUserFacing } from '../Utility/Utility';
import Counter from './Counter';
import AbilityPanel from './AbilityPanel';
import { costSpec } from '../Data/CostSpec';

function EditPanel({ card, setCard, updateCard}) {
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
            <Counter
                value={card.basePower}
                setValue={(v) => {
                    card.basePower = v;
                    updateCard(card);
                }}></Counter>

            {/* Rest Count */}
            Rest Count
            <Counter
                value={card.rest}
                setValue={(v) => {
                    card.rest = v;
                    updateCard(card);
                }}></Counter>

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
                        <Counter
                            value={bm.modifier}
                            setValue={(v) => {
                                bm.modifier = v;
                                updateCard(card);
                            }}
                            allowNegative={true}
                            inline={true}
                        ></Counter>
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
                                    <Counter
                                        value={ability.requirementX}
                                        setValue={(v) => {
                                            ability.requirementX = v;
                                            updateCard(card);
                                        }}
                                        inline={true}
                                    ></Counter>
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
                                    <Counter
                                        value={ability.costX}
                                        setValue={(v) => {
                                            ability.costX = v;
                                            updateCard(card);
                                        }}
                                        inline={true}
                                    ></Counter>
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
                                    <Counter
                                        value={ability.effectX}
                                        setValue={(v) => {
                                            ability.effectX = v;
                                            updateCard(card);
                                        }}
                                        inline={true}
                                    ></Counter>
                                )}
                            </div>
                            {ability.effectName == "custom" && (<>
                                <div>
                                    <span>Effect Point Cost</span>
                                    <Counter
                                        value={ability.effectCost}
                                        setValue={(v) => {
                                            ability.effectCost = v;
                                            updateCard(card);
                                        }}
                                        inline={true}
                                    ></Counter>
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
