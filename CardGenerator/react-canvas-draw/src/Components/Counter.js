"use strict";

function Counter({ value, setValue, allowNegative = false }) {
    return (
        <div>
            <input type="number" className="field" onChange={(e) => {
                let newValue = e.target.value * 1;
                if (!allowNegative) {
                    newValue = Math.max(0, newValue);
                }
                setValue(newValue);
            }}
                value={value.toString()}></input>
        </div>
    );
}
export default Counter;
