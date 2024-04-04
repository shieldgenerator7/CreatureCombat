"use strict";

/**
 * A keyword
 */
class AbilityToken{
    constructor(name, options, subtokenname="") {
        this.name = name;
        this.options = options;
        this.defaultOption = options[0];
        this.subtokenname = subtokenname;
    }
    init(subtoken) {
        this.subtoken = subtoken;
    }
}
export default AbilityToken;
