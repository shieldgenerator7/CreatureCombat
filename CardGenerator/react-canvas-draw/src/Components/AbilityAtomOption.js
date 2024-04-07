"use strict";

import { TYPE_PARAM_NUMBER_WHOLE } from "../Data/AbilityConstants";
import Counter from "./Counter";
import SearchSelect from "./SearchSelect";

function AbilityAtomOption({ optionName, type, option, optionList, setOption }) {
    let keyName = `_ability_line_${optionName}`;
    return (
        <span className="abilityAtomOption bufferOnRight">
            <div>{`${optionName}:`}</div>
            <div>
                {type == TYPE_PARAM_NUMBER_WHOLE && (
                    <Counter
                        key={keyName}
                        value={option ?? 0}
                        setValue={(v) => setOption(v)}
                        inline={true}
                    ></Counter>
                )}
                {type != TYPE_PARAM_NUMBER_WHOLE && (
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
