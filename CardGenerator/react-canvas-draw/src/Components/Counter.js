"use strict";

function Counter({ value, setValue, allowNegative = false }) {
    //
    const set = (v) => {
        let newValue = v;
        if (!allowNegative) {
            newValue = Math.max(0, newValue);
        }
        setValue(newValue);
    };
    return (
        <div>
            <input type="text" inputMode="numeric" className="counter" onChange={(e) => {
                let v = e.target.value * 1;
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
