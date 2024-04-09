"use strict";

import { TYPE_PARAM_NUMBER_WHOLE, TYPE_PARAM_STRING } from "../Data/AbilityConstants";
import Counter from "./Counter";
import SearchSelect from "./SearchSelect";

function AbilityAtomOption({ optionName, type, option, optionList, setOption }) {
    let keyName = `_ability_line_${optionName}`;
    let useCounter = type == TYPE_PARAM_NUMBER_WHOLE;
    let useText = type == TYPE_PARAM_STRING;
    let useSelect = !useCounter && !useText;
    return (
        <span className="abilityAtomOption bufferOnRight">
            <div>{`${optionName}:`}</div>
            <div>
                {useCounter && (
                    <Counter
                        key={keyName}
                        value={option ?? 0}
                        setValue={(v) => setOption(v)}
                        inline={true}
                    ></Counter>
                )}
                {useText && (
                    <input
                        className="field inline multiline"
                        value={option ?? ""}
                        onChange={(e) => {
                            let txt = e.target.value;
                            setOption(txt);
                        }}
                    ></input>
                )}
                {useSelect && (
                    <SearchSelect
                        key={keyName}
                        option={option ?? optionList[0]}
                        options={optionList}
                        setOption={(o) => setOption(o)}
                    ></SearchSelect>
                )}
            </div>
        </span>
    );
}
export default AbilityAtomOption;
