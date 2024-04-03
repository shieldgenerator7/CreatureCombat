"use strict";

function AbilityPanel({ ability, setAbility, updateAbility}) {
    return (<div className="abilityArea">
        Ability Name
        <input type="text" className="field" onChange={(e) => {
            ability.name = e.target.value;
            updateAbility(ability);
        }}
            value={ability.name}
        >

        </input>
    </div>);
}
export default AbilityPanel;
