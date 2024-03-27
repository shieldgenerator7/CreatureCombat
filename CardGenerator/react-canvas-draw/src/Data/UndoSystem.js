"use strict";

class UndoSystem {
    /**
     * Create an undo system
     * @param {() => *} recordFunc Gets called in recordUndo(), should return an object to save
     * @param {string} stringify What to pass into the stringify param for JSON
     * @param {(obj: *) => void} retrieveFunc Gets called in undo() and redo(), should accept an object to load
     */
    constructor(recordFunc, stringify, retrieveFunc) {
        this.recordFunc = recordFunc;
        this.stateList = [];
        this.stringify = stringify;
        this.index = -1;
        this.retrieveFunc = retrieveFunc;
    }

    recordUndo() {
        let obj = this.recordFunc();
        let json = JSON.stringify(obj, this.stringify);
        this.index++;
        this.stateList[index] = json;
        //remove any states after this index
        this.stateList.length = index + 1;
    }

    undo() {
        this._goToState(this.index - 1);
    }

    redo() {
        this._goToState(this.index + 1);
    }

    _goToState(index) {
        this.index = Math.clamp(index, 0, this.stateList.length - 1);
        this.retrieveFunc(JSON.parse(this.stateList[this.index]))
    }
}
