"use strict";

import React from 'react';
import { clamp, isNumber } from "../Utility/Utility";

function Counter({ value, setValue, allowNegative = false, inline = false, max = 99 }) {
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
        if (max) {
            newValue = clamp(newValue, -max, max);
        }
        setValue(newValue);
    };
    //
    return (
        <div className={`counter ${(inline) ? "inline" : ""}`}>
            <input type="text" inputMode="numeric" onChange={(e) => {
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
