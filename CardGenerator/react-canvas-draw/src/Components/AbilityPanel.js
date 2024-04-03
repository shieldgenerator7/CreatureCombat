"use strict";

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
            return (<div>{line.getString()}</div>);
        })}
    </div>);
}
export default AbilityPanel;
