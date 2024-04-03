"use strict";

/**
 * A keyword
 */
class AbilityToken{
    constructor(name, options, defaultOption) {
        this.name = name;
        this.options = options;
        this.defaultOption = defaultOption ?? options[0];
    }
}
export default AbilityToken;
