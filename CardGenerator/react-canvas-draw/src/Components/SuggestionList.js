"use strict";

function SuggestionList({ suggestionList, onSuggestionTaken, maxShown = 5 }) {
    let list = suggestionList;
    if (list.length > maxShown) {
        list = list.slice(0, maxShown);
    }
    return (
        <>
            {
                list.map(suggestion => (
                    <button className="action notwide" onClick={(e) => onSuggestionTaken(suggestion)}>
                        {suggestion}
                    </button>
                ))
            }
        </>
    );
}
export default SuggestionList;
