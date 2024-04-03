"use strict";

import { useState } from "react";

function SearchSelect({ options, option, setOption }) {
    let searchStr = "";
    let setSearchStr = (str) => searchStr = str;
    [searchStr, setSearchStr] = useState();

    return (
        <select value={option}
            onChange={(e) => {
                let option = e.target.value;
                setOption(option);
            }}
        >
            {options
                .filter(o => !searchStr || o.includes(searchStr))
                .map(o => {
                    return (
                        <option value={o} key={o}>{o}</option>
                    );
                })
            }
        </select>
    );
}
export default SearchSelect;
