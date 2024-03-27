"use strict";

import { isNumber } from "../Utility/Utility";

function Counter({ value, setValue, allowNegative = false }) {
    //
    function valueAcceptable(v) {
        //
        if (isNumber(v)) { return true; }
        if (isNaN(v)) { return false; }
        //
        const regex = /[0-9]*/;
        return [...v].map(c => {
            return regex.test(c)
        }).every(c => c);
    }
    //
    const set = (v) => {
        let newValue = v ?? 0;
        if (!allowNegative) {
            newValue = Math.max(0, newValue);
        }
        setValue(newValue);
    };
    //
    return (
        <div>
            <input type="text" inputMode="numeric" className="counter" onChange={(e) => {
                let v = e.target.value * 1;
                if (!valueAcceptable(v)) { return; }
                set(v);
            }}
                value={`${value}`}></input>
            <button
                onClick={(e) => {
                    set(value + 1);
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    set(value - 1);
                }}
            >
                + -
            </button>
        </div>
    );
}
export default Counter;
