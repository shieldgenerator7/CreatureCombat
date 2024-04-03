"use strict";

import Select from "react-select";
import { abilityAtoms } from "../Data/AbilityData";
import SearchSelect from "./SearchSelect";

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
                {line.getString()}
            </div>);
        })}
    </div>);
}
export default AbilityPanel;
