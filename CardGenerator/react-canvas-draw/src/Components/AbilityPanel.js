"use strict";

import { abilityAtoms, abilityTokens } from "../Data/AbilityData";
import SearchSelect from "./SearchSelect";
import { LINETYPE_EFFECT, TYPE_PARAM_NUMBER_WHOLE } from "../Data/AbilityConstants";
import Counter from "./Counter";
import { DISPLAY_LINE_KEYWORD_ONLY, DISPLAY_LINE_FULL, DISPLAY_LINE_KEYWORD_WITH_REMINDER } from "../Data/Ability/Ability";
import AbilityLine from "../Data/AbilityLine";
import { costDisplay, costSpec } from "../Data/CostSpec";
import { capitalizeFirstLetters } from "../Utility/Utility";
import AbilityAtomOption from "./AbilityAtomOption";

function AbilityPanel({ ability, updateAbility }) {
    return ability && (<div className="abilityArea">
        {/* Ability Name */}
        {ability.name || "Ability Name"} {costDisplay(costSpec.abilityFunc(ability))}

        {/* Remove Button */}
        <button onClick={() => {
            updateAbility(undefined);
        }}>X</button>

        {/* Name Input */}
        <input type="text" className="field" onChange={(e) => {
            ability.name = e.target.value;
            updateAbility(ability);
        }}
            value={ability.name}
        >
        </input>

        {/* Ability Lines */}
        {ability.lines.map((line, i) => {
            return (<div key={`_ability_line_${i}`}>
                {/* <Select className="abilityAtomSelect"
                    defaultValue={line.atomName}
                    options={abilityAtoms.map(a => {
                        return { value: a.name, label: a.name };
                    })}
                    styles={{
                        control: (base, state) => ({
                            color: "white",
                            "background-color": "#303030",
                        }),
                    }}

                ></Select> */}
                {line.atomName == "choose" &&
                    <SearchSelect
                        option={line.atomName}
                        options={abilityAtoms.map(a => a.name)}
                        setOption={(o) => {
                            line.setAtom(o);
                            ability.updateDNA();
                            updateAbility(ability);
                        }}
                    ></SearchSelect>
                }
                {line.atomName != "choose" && (<span>{capitalizeFirstLetters(line.atomName, true)}:</span>)}
                {

                    Object.entries(line.atom?.params ?? {}).map(([key, value], j) => {
                        let keyLabel = `${key?.replaceAll("_", "")}`;
                        let option;
                        let optionList;
                        if (value == TYPE_PARAM_NUMBER_WHOLE) {
                            option = line.params[j] ?? 0;
                        }
                        else {
                            optionList = [value]
                                .flat(Infinity)
                                .map(v => abilityTokens.find(token => token.name == v)?.options ?? v)
                                .flat(Infinity)
                                .filter(o => o);
                            option = line.params[j] ?? optionList[0];
                        }
                        return (
                            <AbilityAtomOption
                                optionName={keyLabel}
                                type={value}
                                option={option}
                                optionList={optionList}
                                setOption={(o) => {
                                    line.params[j] = o;
                                    ability.params[i] ??= [];
                                    ability.params[i][j] = o;
                                    ability.updateDNA();
                                    updateAbility(ability);
                                }}
                            ></AbilityAtomOption>
                        );
                    })
                }
                <AbilityAtomOption
                    optionName={"detail"}
                    type={"display"}
                    option={ability.lineDisplayOptions[i]}
                    optionList={[DISPLAY_LINE_FULL, DISPLAY_LINE_KEYWORD_WITH_REMINDER, DISPLAY_LINE_KEYWORD_ONLY]}
                    setOption={(o) => {
                        ability.lineDisplayOptions[i] = o;
                        updateAbility(ability);
                    }}
                ></AbilityAtomOption>

                {/* Line Point Cost */}
                {costDisplay(line.cachedCost, line.type != LINETYPE_EFFECT, line.type == LINETYPE_EFFECT)}

                {/* Remove Button */}
                <button onClick={() => {
                    ability.removeLine(i);
                    updateAbility(ability);
                }}>X</button>
                {/* {line.getString()} */}
            </div>);
        })}
        {/* Add Button */}
        <button className='action' onClick={() => {
            ability.addLine();//use default new line
            updateAbility(ability);
        }}>Add Ability Line</button>

    </div >);
}
export default AbilityPanel;
