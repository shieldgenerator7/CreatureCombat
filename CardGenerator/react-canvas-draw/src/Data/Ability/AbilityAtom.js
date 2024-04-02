"use strict";

/**
 * A line that describes ability behaviour
 * Ex: Cost, Trigger, Requirement, Effect
 */
class AbilityAtom {
    constructor(name, text, type, params) {
        this.name = name;
        this.text = text;
        this.type = type;
        this.params = params;
    }


}
export default AbilityAtom;
