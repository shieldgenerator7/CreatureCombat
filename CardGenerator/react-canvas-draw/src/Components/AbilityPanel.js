"use strict";

import Select from "react-select";
import { abilityAtoms, abilityTokens } from "../Data/AbilityData";
import SearchSelect from "./SearchSelect";
import { TYPE_PARAM_NUMBER_WHOLE } from "../Data/AbilityConstants";
import Counter from "./Counter";

function AbilityPanel({ ability, setAbility, updateAbility }) {
    return (<div className="abilityArea">
        {/* Ability Name */}
        Ability Name
        <input type="text" className="field" onChange={(e) => {
            ability.name = e.target.value;
            updateAbility(ability);
        }}
            value={ability.name}
        >
        </input>
        {ability.lines.map((line, i) => {
            return (<div>
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
                <SearchSelect
                    option={line.atomName}
                    options={abilityAtoms.map(a => a.name)}
                    setOption={(o) => {
                        line.setAtom(o);
                        ability.updateDNA();
                        updateAbility(ability);
                    }}
                ></SearchSelect>
                {

                    Object.entries(line.atom?.params).map(([key, value], j) => {
                        // return `${key}: ${value} (${j}: ${line.params[i]?.[j]})`;


                        //Number
                        if (value == TYPE_PARAM_NUMBER_WHOLE) {
                            return (
                                <Counter
                                    value={line.params[j] ?? 0}
                                    setValue={(v) => {
                                        line.params[j] = v;
                                        ability.params[i] ??= [];
                                        ability.params[i][j] = v;
                                        ability.updateDNA();
                                        updateAbility(ability);
                                    }}
                                    inline={true}
                                ></Counter>
                            )
                        }

                        //Option List
                        // let token = abilityTokens.find(token => token.name == value);
                        // if (!token) {
                        //     console.error("unable to find token!", value);
                        //     return (<>value</>);
                        // }
                        let optionList = [value]
                            .flat(Infinity)
                            .map(v => abilityTokens.find(token => token.name == v)?.options ?? v)
                            .flat(Infinity)
                            .filter(o => o);
                        let defaultOption = optionList[0];
                        return (<SearchSelect
                            option={line.params[j] ?? defaultOption}
                            options={optionList}
                            setOption={(o) => {
                                line.params[j] = o;
                                ability.params[i] ??= [];
                                ability.params[i][j] = o;
                                ability.updateDNA();
                                updateAbility(ability);
                            }}
                        ></SearchSelect>)
                    })
                    //  console.log("key,value", key, value);
                    // segment = segment.replaceAll(`{${key}}`, line.params[i]?.[j]);

                }
                {/* {line.atom.type != TYPE_PARAM_NUMBER_WHOLE &&
                   (<input type="text" onChange={(e) => {
                    ability.params = e.target.value;
                    updateAbility(ability);
                }}
                    value={ability.name}
                >
                </input>)

                } */}
                {line.getString()}
            </div>);
        })}
    </div>);
}
export default AbilityPanel;
